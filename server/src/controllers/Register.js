const { User, Restaurant, Code } = require('../db'); // Asegúrate de incluir tu modelo Code
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
    const { name, razon_social, ruc, contact_person, position,departament, address, lastName, genre, email_additional, date, country, province, district, password, email, phone, role,  restaurantId,  code } = req.body;

    try {
      // Verificar si el código es válido
     const validCode = await Code.findOne({ where: { code } });
      if (!validCode) {
        return res.status(400).json({ message: 'Código de registro inválido' });
      }  

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const backgroundColor = getRandomColor();
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

      const emailContent = `
          <html>
         <body    style="
         background-color: #f3f3f3;
         display: grid;
         justify-content: center;
         max-width: 100%;
       ">
           <div     style="
           background-color: #fff;
           border: 8px solid #bd24bd;
           padding: 2em;
           width: 600px;
           max-width: 100%;
           margin: 0 auto;
           font-family: Arial, Helvetica, sans-serif;
         " >
             <div style="margin: 0 auto; text-align: center;">
               <img src="https://www.enunaapp.com/static/media/Logo.b202fc3baefbdd16a4ec.png" alt="Logo de la empresa" style="display: block; max-width: 150px; margin: 0 auto;">
             </div>
       
             <p style="color: black;">¡Hola [Nombre]!</p>
             <p style="color: black;">¡Bienvenido a [Nombre de tu empresa o sitio web]! Nos complace que te hayas registrado y formes parte de nuestra comunidad.</p>
             <p style="color: black;">Aquí tienes algunos detalles importantes:</p>
             <p style="color: black;"> <strong>Tu cuenta ha sido creada exitosamente.</strong> </p>
             <p style="color: black;">Para comenzar, solo necesitas verificar tu dirección de correo electrónico haciendo clic en el siguiente enlace:</p>
             
             <p style="color: black;">[Verificar mi correo electrónico]</p>
             <p style="color: black;">Si el enlace anterior no funciona, copia y pega la siguiente URL en tu navegador:</p>
             <p style="color: black;">[URL de verificación]</p>
             <p style="color: black;">Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. Estamos aquí para ayudarte.</p>
       
             <p style="color: black;">Gracias por unirte a nosotros. ¡Esperamos que disfrutes de nuestra plataforma!</p>
             <p style="color: black;">Saludos cordiales,</p>
             <p style="color: black;">El equipo de [Nombre de tu empresa o sitio web]</p>
       
             
             
       
          
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
        codeId: validCode ? validCode.id : null, // Asigna el código al usuario si existe

        restaurantId, // Asigna el restaurante al usuario
      });

      const userWithRestaurant = await User.findByPk(newUser.id, {
        include: [Restaurant],
      });

      const tokenPayload = { userId: newUser.id, role }; // Asegúrate de asignar el rol correcto
      const token = jwt.sign(tokenPayload, process.env.FIRMA_TOKEN);

      return res.json({ token, user: userWithRestaurant });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
