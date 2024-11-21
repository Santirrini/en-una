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
    const { email, restaurantIds, business_name } = req.body;  // Cambié 'name' por 'business_name'

    try {
      // Buscar el formulario por el nombre de negocio
      const form = await Form.findOne({
        where: { busines_name: business_name },  // Buscamos el formulario por business_name
      });

      if (!form) {
        return res.status(404).json({ message: 'Formulario no encontrado' });
      }

      // Buscar si ya existe un usuario con el mismo nombre de negocio
      const existingUser = await User.findOne({
        where: { name: { [Op.iLike]: business_name } },  // Compara business_name con el campo name de User
        include: [{ model: Code }],
      });

      let code;

      if (existingUser) {
        // Si el nombre de negocio es igual al nombre de usuario y ya existe un código asociado
        if (existingUser.codeId) {
          const existingCode = await Code.findByPk(existingUser.codeId);
          if (existingCode) {
            code = existingCode.code;  // Reutiliza el código existente
          }
        }
      }

      // Si no existe un código o el usuario no tiene un código, generar uno nuevo
      if (!code) {
        let isUnique = false;
        while (!isUnique) {
          code = Math.floor(1000 + Math.random() * 9000); // Número entre 1000 y 9999
          const existingCode = await Code.findOne({ where: { code } });
          isUnique = !existingCode; // Código único si no existe en la DB
        }

        // Crear el nuevo código en la base de datos
        const newCode = await Code.create({ code });

        // Si ya existe el usuario, asociar el nuevo código a ese usuario
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
              <h3 style="color: black; text-align: center">¡Tu formulario fue aprobado por el equipo de EN UNA!</h3>
              <p style="color: black; text-align: center">Continúe registrándose en GitHub ingresando el código a continuación:</p>
              <h1 style="color: black; text-align: center">${code}</h1>
              <div style="margin: 0 auto; text-align: center; margin-bottom: 2em">
                <a href="https://www.enunaapp.com/registrarse" target="_blank" style="color: white; text-align: center; background-color: #bd24bd; border: none; padding: 15px; border-radius: 3px; font-size: 20px; text-decoration: none;">Abrir en una</a>
              </div>
              <p style="color: black">Una vez completado, seleccione el tipo de cuenta en <strong>Restaurante</strong> y complete el formulario.</p>
            </div>
          </body>
        </html>
      `;

      // Enviar correo electrónico si es necesario
    await transporter.sendMail({
          from: process.env.EMAIL,
          to: email,
          subject: '¡Solicitud aprobada!',
          html: emailContent,
      });
 
      // Relacionar restaurantes con el código generado si se proporcionaron restaurantIds
      if (restaurantIds && restaurantIds.length) {
        for (const restaurantId of restaurantIds) {
          const restaurant = await Restaurant.findByPk(restaurantId);
          if (restaurant) {
            await restaurant.update({ codeId: code.id });
          }
        }
      }

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
