require('dotenv').config();
const { Code, Restaurant, User, Form } = require('../db');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize'); // Agrega esta línea
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
  AdminFormSuccess: async (req, res) => {
    const { email, business_name } = req.body; // Ya no se incluye restaurantIds

    try {
      // Buscar el formulario por el nombre de negocio
      const form = await Form.findOne({
        where: { busines_name: business_name }, // Asegúrate de que business_name sea correcto
      });

      if (!form) {
        return res.status(404).json({ message: 'Formulario no encontrado' });
      }
      await form.update({ status: 'activo' });
      
      // Buscar si ya existe un usuario con el mismo nombre de negocio
      const existingUser = await User.findOne({
        where: { name: { [Op.iLike]: business_name } },
        include: [{ model: Code }],
      });

      let code;

      if (existingUser) {
        if (existingUser.codeId) {
          const existingCode = await Code.findByPk(existingUser.codeId);
          if (existingCode) {
            code = existingCode.code; // Reutilizar el código existente
          }
        }
      }

      if (!code) {
        let isUnique = false;
        while (!isUnique) {
          code = Math.floor(1000 + Math.random() * 9000); // Generar código entre 1000 y 9999
          const existingCode = await Code.findOne({ where: { code } });
          isUnique = !existingCode;
        }

        // Crear un nuevo código
        const newCode = await Code.create({ code });

        // Asociar el código al usuario, si ya existe
        if (existingUser) {
          await existingUser.update({ codeId: newCode.id });
        }
      }

      // Contenido del correo electrónico
      const emailContent = `
      <html>
        <body style="background-color: #f3f3f3; display: grid; justify-content: center; align-items: center; max-width: 100%;">
          <div style="background-color: #fff; border: 8px solid #bd24bd; padding: 2em; width: 600px; max-width: 100%; margin: 0 auto; font-family: Arial, Helvetica, sans-serif;">
            <div style="margin: 0 auto; text-align: center">
              <img src="https://www.enunaapp.com/static/media/Logo.b202fc3baefbdd16a4ec.png" alt="Logo de la empresa" style="display: block; max-width: 150px; margin: 0 auto" />
            </div>
            <h2 style="color: black; text-align: center">FELICITACIONES</h2>

            <h3 style="color: black; text-align: center">¡Tu formulario fue aprobado por el equipo de EN UNA!</h3>

            
            <p style="color: black;">Cuando regreses a EN UNA realiza los siguientes pasos:</p>
            <p style="color: black;">1. Da click en el botón INICIAR SESIÓN.</p>
            <p style="color: black;">2. Da click en "aquí" en esta sección: Si no tiene una cuenta, haga <a href="https://www.enunaapp.com/registrarse" target="_blank">click </a> </p>
            <p style="color: black;">3. Selecciona en Tipo de Cuenta la opción "Restaurante":</p>
            <p style="color: black; ">4.Ingresa el siguiente código en esta sección: Código asignado</p>
          
          
            <h1 style="color: black; text-align: center">${code}</h1>


            <p style="color: black; "> ¡Listo! Con estos primeros pasos, puedes terminar de llenar tu formulario de Creación de Usuario y ser un socio más dentro de nuestra plataforma.</p>

           
            <div style="margin: 0 auto; text-align: center; margin-bottom: 2em">
              <a href="https://www.enunaapp.com/registrarse" target="_blank" style="color: white; text-align: center; background-color: #bd24bd; border: none; padding: 15px; border-radius: 3px; font-size: 20px; text-decoration: none;"> Regresar a En Una</a>
            </div>
            <p style="color: black">Una vez completado, seleccione el tipo de cuenta en <strong>Restaurante</strong> y complete el formulario.</p>
          </div>
        </body>
      </html>
    `;


      // Enviar el correo
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: '¡Solicitud aprobada!',
        html: emailContent,
      });

      console.log('Formulario de registro confirmado con éxito');
      res.status(201).json({
        message: 'Formulario de registro confirmado con éxito',
        code,
      });
    } catch (error) {
      console.error('Error en AdminFormSuccess:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
