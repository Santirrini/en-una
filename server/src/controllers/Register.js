const { User, Restaurant, Code } = require('../db'); // Incluye tu modelo Code
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

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
      name,
      razon_social,
      ruc,
      contact_person,
      position,
      departament,
      address,
      lastName,
      genre,
      email_additional,
      date,
      country,
      province,
      district,
      password,
      email,
      phone,
      role,
      restaurantId,
      code,
    } = req.body;

    try {
      let validCode = null;
      let finalName = name; // Usaremos esta variable para almacenar el nombre final

      if (role === 'restaurante') {
        // Verificar si el código existe
        validCode = await Code.findOne({ where: { code } });
        if (validCode) {
          // Si el código existe, tomar el nombre asociado al código
          finalName = validCode.name || name; // Si el código tiene un nombre, úsalo; si no, usa el nombre ingresado
        } else {
          return res.status(400).json({ status: 400, message: 'Código de registro inválido' });
        }
      }

      const userStatus = role === 'restaurante' ? 'pendiente' : 'activo';

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(404).json({ status: 404, message: 'El usuario ya existe' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const backgroundColor = getRandomColor();
      const capitalizedName = finalName.charAt(0).toUpperCase() + finalName.slice(1);

      // Generar token para verificación de correo
      const verificationToken = jwt.sign({ email }, process.env.FIRMA_TOKEN);
      const verificationUrl = `${process.env.BASE_URL}/verificar?token=${verificationToken}`;

      // Contenido del correo
      const emailContent = `
        <html>
        <body style="background-color: #f3f3f3; display: grid; justify-content: center; max-width: 100%;">
          <div style="background-color: #fff; border: 8px solid #bd24bd; padding: 2em; width: 600px; max-width: 100%; margin: 0 auto; font-family: Arial, Helvetica, sans-serif;">
            <div style="margin: 0 auto; text-align: center;">
              <img src="https://www.enunaapp.com/static/media/Logo.b202fc3baefbdd16a4ec.png" alt="Logo de la empresa" style="display: block; max-width: 150px; margin: 0 auto;">
            </div>
            <p style="color: black;">¡Hola ${capitalizedName}!</p>
            <p style="color: black;"><strong>Tu cuenta ha sido creada exitosamente.</strong></p>
            <p style="color: black;">Bienvenido a EN UNA! Nos complace que te hayas registrado y formes parte de nuestra comunidad.</p>
            <p style="color: black;">Para comenzar, solo necesitas verificar tu dirección de correo electrónico haciendo clic en el siguiente enlace:</p>
            <p style="text-align: center;">
              <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #bd24bd; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Verificar mi correo electrónico</a>
            </p>
            <p style="color: black;">Si el enlace anterior no funciona, copia y pega la siguiente URL en tu navegador:</p>
            <p style="word-break: break-word; color: black;"><a href="${verificationUrl}" style="color: #bd24bd;">${verificationUrl}</a></p>
            <p style="color: black;">Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. Estamos aquí para ayudarte.</p>
            <p style="color: black;">Gracias por unirte a EN UNA. ¡Esperamos que disfrutes de nuestra plataforma!</p>
            <p style="color: black;">¡Buen provecho!</p>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: '¡Bienvenido a nuestra plataforma!',
        html: emailContent,
      });

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
        status: userStatus,
        codeId: validCode ? validCode.id : null,
        restaurantId,
      });

      const userWithRestaurant = await User.findByPk(newUser.id, {
        include: [Restaurant],
      });

      const tokenPayload = { userId: newUser.id, role };
      const token = jwt.sign(tokenPayload, process.env.FIRMA_TOKEN);

      return res.json({ token, user: userWithRestaurant });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};

