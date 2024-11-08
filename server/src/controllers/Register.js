const { User, Restaurant, Code } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Generar un color aleatorio
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  Register: async (req, res) => {
    const { 
      name, razon_social, ruc, contact_person, position, departament, address, 
      lastName, genre, email_additional, date, country, province, district, 
      password, email, phone, role, restaurantId, code 
    } = req.body;

    try {
      // Validar el código de registro solo si el rol es "restaurante"
      if (role === "restaurante") {
        const validCode = await Code.findOne({ where: { code } });
        if (!validCode) {
          return res.status(400).json({ message: 'Código de registro inválido' });
        }
      }

      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      // Encriptar la contraseña
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const backgroundColor = getRandomColor();
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

      // Contenido del correo de bienvenida
      const emailContent = `
        <html>
        <body style="background-color: #f3f3f3; display: grid; justify-content: center; max-width: 100%;">
          <div style="background-color: #fff; border: 8px solid #bd24bd; padding: 2em; width: 600px; max-width: 100%; margin: 0 auto; font-family: Arial, Helvetica, sans-serif;">
            <div style="margin: 0 auto; text-align: center;">
              <img src="https://www.enunaapp.com/static/media/Logo.b202fc3baefbdd16a4ec.png" alt="Logo de la empresa" style="display: block; max-width: 150px; margin: 0 auto;">
            </div>
            <p style="color: black;">¡Hola ${capitalizedName}!</p>
            <p style="color: black;">¡Bienvenido a nuestra plataforma! Nos complace que te hayas registrado y formes parte de nuestra comunidad.</p>
            <p style="color: black;"><strong>Tu cuenta ha sido creada exitosamente.</strong></p>
            <p style="color: black;">Para comenzar, solo necesitas verificar tu dirección de correo electrónico haciendo clic en el siguiente enlace:</p>
            <p style="color: black;"><a href="URL_DE_VERIFICACION" style="color: #bd24bd;">Verificar mi correo electrónico</a></p>
            <p style="color: black;">Si el enlace anterior no funciona, copia y pega la siguiente URL en tu navegador:</p>
            <p style="color: black;">URL_DE_VERIFICACION</p>
            <p style="color: black;">Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. Estamos aquí para ayudarte.</p>
            <p style="color: black;">Gracias por unirte a nosotros. ¡Esperamos que disfrutes de nuestra plataforma!</p>
            <p style="color: black;">Saludos cordiales,</p>
            <p style="color: black;">El equipo de EnUnaApp</p>
          </div>
        </body>
        </html>
      `;

      // Enviar correo solo si el rol es "personal"
      if (role === "personal") {
        await transporter.sendMail({
          from: process.env.EMAIL,
          to: email,
          subject: '¡Bienvenido a nuestra plataforma!',
          html: emailContent,
        });
      }

      // Crear el nuevo usuario
      const newUser = await User.create({
        name: capitalizedName,
        lastName,
        genre,
        date,
        razon_social,
        ruc,
        contact_person,
        position,
        country,
        province,
        departament,
        address,
        district,
        email,
        email_additional,
        password: hashedPassword,
        backgroundColor,
        phone,
        role,
        codeId: role === "restaurante" ? validCode.id : null, // Asigna el código solo si el rol es "restaurante"
        restaurantId, // Asigna el restaurante al usuario
      });

      // Asociar el usuario con el restaurante, si aplica
      const userWithRestaurant = await User.findByPk(newUser.id, {
        include: role === "restaurante" ? [Restaurant] : [],
      });

      // Crear y firmar el token de autenticación
      const tokenPayload = { id: newUser.id, role };
      const token = jwt.sign(tokenPayload, process.env.FIRMA_TOKEN);

      return res.json({ token, role: userWithRestaurant });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
