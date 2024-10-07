require('dotenv').config();
const { Claims, Restaurant } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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
    Claim: async (req, res) => {
    const { name_complete, dni, address, phone, email, identify_contract, description, monto_claim, application, description_problem, expected_solution, date, hour, name_tutor, address_tutor, phone_tutor,email_tutor  } = req.body;

    try {
    
   
        const emailContent = `
        <html>
        <body style="background-color: #f3f3f3; display: grid; justify-content: center; max-width: 100%;">
            <div style="background-color: #fff; border: 8px solid #bd24bd; padding: 2em; width: 600px; max-width: 100%; margin: 0 auto; font-family: Arial, Helvetica, sans-serif;">
                <div style="margin: 0 auto; text-align: center;">
                    <img src="https://elarisneakers.com/static/media/Logo.b202fc3baefbdd16a4ec.png" alt="Logo de la empresa" style="display: block; max-width: 150px; margin: 0 auto;">
                </div>
                <p style="color: black;">¡Hola ${name_complete}!</p>
                <p style="color: black;">¡Gracias por enviar tu reclamo! Aquí tienes los detalles:</p>
                <p style="color: black;"><strong>Nombre completo:</strong> ${name_complete}</p>
                <p style="color: black;"><strong>DNI:</strong> ${dni}</p>
                <p style="color: black;"><strong>Dirección:</strong> ${address}</p>
                <p style="color: black;"><strong>Teléfono:</strong> ${phone}</p>
                <p style="color: black;"><strong>Correo electrónico:</strong> ${email}</p>
                <p style="color: black;"><strong>Contrato identificado:</strong> ${identify_contract}</p>
                <p style="color: black;"><strong>Descripción:</strong> ${description}</p>
                <p style="color: black;"><strong>Monto del reclamo:</strong> ${monto_claim}</p>
                <p style="color: black;"><strong>Aplicación:</strong> ${application}</p>
                <p style="color: black;"><strong>Descripción del problema:</strong> ${description_problem}</p>
                <p style="color: black;"><strong>Solución esperada:</strong> ${expected_solution}</p>
                <p style="color: black;"><strong>Fecha:</strong> ${date}</p>
                <p style="color: black;"><strong>Hora:</strong> ${hour}</p
                {${name_tutor} ? (
            <p style="color: black;"><strong>Nombre del tutor:</strong> ${name_tutor}</p>
        ) : null}
                {${address_tutor} ? (

            <p style="color: black;"><strong>Dirección del tutor:</strong> ${address_tutor}</p>
        ) : null}
                {${phone_tutor} ? (

            <p style="color: black;"><strong>Teléfono del tutor:</strong> ${phone_tutor}</p>
        ) : null}
                {${email_tutor} ? (

            <p style="color: black;"><strong>Correo electrónico del tutor:</strong> ${email_tutor}</p>
        ) : null}

                <p style="color: black;">Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos.</p>
                <p style="color: black;">¡Gracias por tu reclamo!</p>
                <p style="color: black;">Saludos cordiales,</p>
                <p style="color: black;">El equipo de EN UNA</p>
            </div>
        </body>
        </html>
    `;

      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Confirmación de Reclamo',
        html: emailContent,
      });

      const newUser = await Claims.create({
        name_complete, dni, address, phone, email, identify_contract, description, monto_claim, application, description_problem, expected_solution, date, hour, name_tutor, address_tutor, phone_tutor,email_tutor 
      });

    
      const Myemail = `
      <html>
      <body style="background-color: #f3f3f3; display: grid; justify-content: center; max-width: 100%;">
          <div style="background-color: #fff; border: 8px solid #bd24bd; padding: 2em; width: 600px; max-width: 100%; margin: 0 auto; font-family: Arial, Helvetica, sans-serif;">
              <div style="margin: 0 auto; text-align: center;">
                  <img src="https://elarisneakers.com/static/media/Logo.b202fc3baefbdd16a4ec.png" alt="Logo de la empresa" style="display: block; max-width: 150px; margin: 0 auto;">
              </div>
              <p style="color: black;">Hay un reclamo! Aquí tienes los detalles:</p>
              <p style="color: black;"><strong>Nombre completo:</strong> ${name_complete}</p>
              <p style="color: black;"><strong>DNI:</strong> ${dni}</p>
              <p style="color: black;"><strong>Dirección:</strong> ${address}</p>
              <p style="color: black;"><strong>Teléfono:</strong> ${phone}</p>
              <p style="color: black;"><strong>Correo electrónico:</strong> ${email}</p>
              <p style="color: black;"><strong>Contrato identificado:</strong> ${identify_contract}</p>
              <p style="color: black;"><strong>Descripción:</strong> ${description}</p>
              <p style="color: black;"><strong>Monto del reclamo:</strong> ${monto_claim}</p>
              <p style="color: black;"><strong>Aplicación:</strong> ${application}</p>
              <p style="color: black;"><strong>Descripción del problema:</strong> ${description_problem}</p>
              <p style="color: black;"><strong>Solución esperada:</strong> ${expected_solution}</p>
              <p style="color: black;"><strong>Fecha:</strong> ${date}</p>
              <p style="color: black;"><strong>Hora:</strong> ${hour}</p
              {${name_tutor} ? (
          <p style="color: black;"><strong>Nombre del tutor:</strong> ${name_tutor}</p>
      ) : null}
              {${address_tutor} ? (

          <p style="color: black;"><strong>Dirección del tutor:</strong> ${address_tutor}</p>
      ) : null}
              {${phone_tutor} ? (

          <p style="color: black;"><strong>Teléfono del tutor:</strong> ${phone_tutor}</p>
      ) : null}
              {${email_tutor} ? (

          <p style="color: black;"><strong>Correo electrónico del tutor:</strong> ${email_tutor}</p>
      ) : null}

          </div>
      </body>
      </html>
  `;

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: 'Reclamo',
      html: Myemail,
    });

      console.log('Reclamo enviado');

      return res.send({ sucess: true, message: "Reclamo enviado correctamente"}); // Devuelve el usuario con los detalles del restaurante
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};


