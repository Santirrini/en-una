require('dotenv').config();
const nodemailer = require('nodemailer');
const { SuccessPayment, Order } = require('../db');

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
  OrderSuccess: async (req, res) => {
    const {
      name,
      lastName,
      email,
      phone,
      observation,
      userId,
      ticketIzipay,
      orderId,
    } = req.body;

    try {

      const formatDate = (date) => {
        if (isNaN(date.getTime())) {
          throw new Error("Fecha inválida");
        }
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

      const today = new Date();
      if (isNaN(today.getTime())) {
        throw new Error("Fecha no válida");
      }

      const successPayment = await SuccessPayment.create({
        name,
        lastName,
        email,
        phone,
        observation,
        date_payment: formatDate(today),
        ticketIzipay,
        status: 'Pendiente',
        orderId,
        userId,
      });
      console.log('Orden guardada en la base de datos:', successPayment);

      // Contenido del correo actualizado
      const emailContent = `
      <html>
        <body style="background-color: #f3f3f3; display: grid; justify-content: center; max-width: 100%;">
          <div style="background-color: #fff; border: 8px solid #bd24bd; padding: 2em; width: 600px; max-width: 100%; margin: 0 auto; font-family: Arial, Helvetica, sans-serif;">
            <div style="margin: 0 auto; text-align: center;">
              <img src="https://www.enunaapp.com/static/media/Logo.b202fc3baefbdd16a4ec.png" alt="Logo de la empresa" style="display: block; max-width: 150px; margin: 0 auto;">
            </div>
            <h2 style="color: #bd24bd;">¡Hiciste una reserva a través de En Una!</h2>
            <p style="color: black;">Muchas gracias por utilizar nuestra plataforma, ${name}.</p>
            <p style="color: black;">Puedes ver tus reservas haciendo clic en el siguiente botón:</p>
            <div style="text-align: center; margin: 2em 0;">
              <a href="https://www.enunaapp.com/mis-reservaciones" target="_blank" style="background-color: #bd24bd; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Ver Reservas</a>
            </div>
            <p style="color: black;">¡Gracias por confiar en <strong>EN UNA</strong>!</p>
          </div>
        </body>
      </html>
      `;

      // Enviar el correo
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: '¡Gracias por tu reserva en En Una!',
        html: emailContent,
      });
      console.log('Mensaje de reserva exitosa, enviada al email');

      res.status(200).json({ message: 'Orden registrada y correo enviado con éxito.' });
    } catch (error) {
      console.error('Error al procesar la orden:', error);
      res.status(500).json({ error: 'Error al registrar la orden o enviar el correo.' });
    }
  }
};
