const { Form } = require('../db'); // Asegúrate de que tu modelo Menu tenga un campo para las categorías
require('dotenv').config();
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
    FormPetition: async (req, res) => {
 const {ruc, reason_social, busines_name, legal_representative, legal_representative_dni, legal_manager, local_address, phone_contact, local_phone, email_contract, status } = req.body
      try {










        const emailContent = `
    <html>
  <body style="background-color: #f3f3f3; display: grid; justify-content: center; max-width: 100%;">
    <div style="background-color: #fff; border: 8px solid #bd24bd; padding: 2em; width: 600px; max-width: 100%; margin: 0 auto; font-family: Arial, Helvetica, sans-serif;">
      <div style="margin: 0 auto; text-align: center;">
        <img src="https://www.enunaapp.com/static/media/Logo.b202fc3baefbdd16a4ec.png" alt="Logo de la empresa" style="display: block; max-width: 150px; margin: 0 auto;">
      </div>
      <p style="color: black; text-align: center; font-size: 18px; margin-top: 20px;"><strong>Formulario enviado exitosamente.</strong></p>
      <p style="color: black; text-align: center; font-size: 16px;">Espere mientras verificamos sus datos. Una vez validados, podrá completar su registro.</p>
      <p style="color: black; text-align: center; font-size: 16px;">Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. Estamos aquí para ayudarte.</p>
      <p style="color: black; text-align: center; font-size: 16px;">Gracias por unirte a EN UNA. ¡Esperamos que disfrutes de nuestra plataforma!</p>
      <p style="color: black; text-align: center; font-size: 16px;">¡Buen provecho!</p>
    </div>
  </body>
</html>
      `;

      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email_contract,
        subject: '¡Bienvenido a nuestra plataforma!',
        html: emailContent,
      });



        const formRegister = await Form.create({
            ruc, reason_social, busines_name, legal_representative, legal_representative_dni, legal_manager, local_address, phone_contact, local_phone, email_contract, status: "pendiente"
        })
            console.log("Formulario enviado correctamente")
            res.status(200).send({ success: true, data: formRegister });
      
      } catch (error) {
        console.error('Error al enviar formulario de petición de registro:', error);
        res.status(500).send({ success: false, error: 'Error al enviar formulario de petición de registro' });
      }
  }
};
