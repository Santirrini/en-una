require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  socketTimeout: 15000, // tiempo de espeamoríoasuntora en milisegundos
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  ContactUs: async (req, res) => {
    const { name, email, affair, message, } = req.body;

    // Validar que se haya proporcionado un correo electrónico
    if (!email || !email.trim()) {
      return res.status(400).json({ message: 'Dirección de correo electrónico no válida' });
    }

    // Validar que el correo electrónico tenga un formato válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Dirección de correo electrónico no válida' });
    }

    try {
      const emailContent = `
      <html>
      <body>
          <p style="color: black;">Nombre: ${name},</p>
     
          <p style="color: black;">Email: ${email},</p>
          <p style="color: black;">${message},</p>

      </body>
      </html>
      `;

      const sendEmail = await transporter.sendMail({
        from:  process.env.EMAIL,
        to:  process.env.EMAIL,
        subject: affair,
        html: emailContent,

      });



      console.log('Correo enviado correctamente');
      return res.status(200).send({ success: true, data: sendEmail });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
