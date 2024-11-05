require('dotenv').config();
const { User, Code, Restaurant } = require('../db');
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
  AdminFormSuccess: async (req, res) => {
    const {email} = req.body
    try {
      // Generar un código único de 4 dígitos
      let code;
      let isUnique = false;

      while (!isUnique) {
        code = Math.floor(1000 + Math.random() * 9000); // Genera un número entre 1000 y 9999
        const existingCode = await Code.findOne({ where: { code } });
        if (!existingCode) {
          isUnique = true; // Si el código es único, salir del bucle
        }
      }
      const emailContent = `
  <html>
  <body
    style="
      background-color: #f3f3f3;
      display: grid;
      justify-content: center;
      max-width: 100%;
    "
  >
    <div
      style="
        background-color: #fff;
        border: 8px solid #bd24bd;
        padding: 2em;
        width: 600px;
        max-width: 100%;
        margin: 0 auto;
        font-family: Arial, Helvetica, sans-serif;
      "
    >
      <div style="margin: 0 auto; text-align: center">
        <img
          src="https://www.enunaapp.com/static/media/Logo.b202fc3baefbdd16a4ec.png"
          alt="Logo de la empresa"
          style="display: block; max-width: 150px; margin: 0 auto"
        />
      </div>

      <h3 style="color: black; text-align: center">
        !Tu formulario fue aprobada por el equipo de EN UNA!
      </h3>
      <p style="color: black; text-align: center">
        Continúe registrándose en GitHub ingresando el código a continuación:
      </p>

      <h1 style="color: black; text-align: center">45651321</h1>
      <div style="margin: auto; display: flex; justify-content: center">
        <a href="https://www.enunaapp.com/registrarse" target="_blank">
          <button
            style="
              color: white;
              text-align: center;
              background-color: #bd24bd;
              border: none;
              padding: 15px;
              border-radius: 3px;
              font-size: 20px;
              cursor: pointer;
            "
          >
            Abrir en una
          </button>
        </a>
      </div>
      <p style="color: black">
        Una vez completado, seleccione el tipo de cuenta en
        <strong>Restaurante</strong> y complete el formulario.
      </p>
    </div>
  </body>
</html>
  `;
await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: '¡Solicitud aprobada!',
    html: emailContent,
  });
      // Crear el nuevo código en la base de datos
      const newCode = await Code.create({
        code, // Almacena el código único generado
      });

      // Relacionar restaurantes (supongamos que tienes un array de IDs de restaurantes)
      const restaurantIds = req.body.restaurantIds; // Los IDs deben venir del cuerpo de la solicitud
      if (restaurantIds && restaurantIds.length) {
        await Promise.all(restaurantIds.map(async (restaurantId) => {
          const restaurant = await Restaurant.findByPk(restaurantId);
          if (restaurant) {
            await restaurant.update({ codeId: newCode.id });
          }
        }));
      }

      console.log('Formulario de registro confirmado con éxito');
      res.status(201).json({ message: 'Formulario de registro confirmado con éxito', code: newCode });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
