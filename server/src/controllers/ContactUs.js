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

      const emailUser = `
      <html>
      <body style="background-color: #f3f3f3; display: grid; justify-content: center; max-width: 100%;">
        <div style="background-color: #fff; border: 8px solid #bd24bd; padding: 2em; width: 600px; max-width: 100%; margin: 0 auto; font-family: Arial, Helvetica, sans-serif;">
          <div style="margin: 0 auto; text-align: center;">
            <img src="https://www.enunaapp.com/static/media/Logo.b202fc3baefbdd16a4ec.png" alt="Logo de la empresa" style="display: block; max-width: 150px; margin: 0 auto;">
          </div>
          <p style="color: black;">¡Hola ${name}!</p>
          <p style="color: black;"><strong>Hemos recibido tu mensaje.</strong></p>
          <p style="color: black;">Gracias por ponerte en contacto con nosotros. Nuestro equipo ha recibido tu mensaje y te responderemos lo antes posible.</p>
          <p style="color: black;">Si tu consulta es urgente, puedes comunicarte con nuestro soporte a través de nuestro correo oficial.</p>
          <p style="color: black;">Mientras tanto, te invitamos a seguir explorando nuestra plataforma.</p>
          <p style="color: black;">Si no enviaste este mensaje, puedes ignorar este correo.</p>
          <p style="color: black;">¡Gracias por confiar en EN UNA!</p>
        </div>
      </body>
      </html>
    `;

await transporter.sendMail({
  from: process.env.EMAIL,
  to: email,
  subject: 'Hemos recibido tu mensaje',
  html: emailUser,
});


      console.log('Correo enviado correctamente');
      return res.status(200).send({ success: true, data: sendEmail });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
