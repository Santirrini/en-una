require('dotenv').config();
const { User } = require('../db');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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
  requestPasswordReset: async (req, res) => {
    const { email } = req.body;
    if (!email) {
      console.log("Correo electrónico no válido")
      return res.status(400).send({ message: 'Correo electrónico no válido' });
    }
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
      console.log("Usuario no encontrado")

        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const token = jwt.sign({ id: user.id }, process.env.RESET_PASSWORD_SECRET, { expiresIn: '1h' });
      const resetLink = `https://elarisneakers.com/restablacer-contraseña/${token}`;
      
      const emailContent = `
        <html>
        <body style="background-color: #f3f3f3; display: grid; justify-content: center; max-width: 100%;">
          <div style="background-color: #fff; border: 8px solid #bd24bd; padding: 2em; width: 600px; max-width: 100%; margin: 0 auto; font-family: Arial, Helvetica, sans-serif;">
            <div style="margin: 0 auto; text-align: center;">
              <img src="https://elarisneakers.com/static/media/Logo.b202fc3baefbdd16a4ec.png" alt="Logo de la empresa" style="display: block; max-width: 150px; margin: 0 auto;">
            </div>
            <p style="color: black;">Hola ${user.name},</p>
            <p style="color: black;">Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para restablecerla:</p>
            <p style="color: black;"><a href="${resetLink}">Restablecer mi contraseña</a></p>
            <p style="color: black;">Si no solicitaste este correo, por favor ignóralo.</p>
            <p style="color: black;">Saludos,</p>
            <p style="color: black;">El equipo de [Nombre de tu empresa o sitio web]</p>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Restablecimiento de contraseña',
        html: emailContent,
      });
 console.log("Se ha enviado un enlace de restablecimiento a tu correo electrónico")
      return res.send({ message: 'Se ha enviado un enlace de restablecimiento a tu correo electrónico' });

    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Error en el servidor' });
    }
  },
};
