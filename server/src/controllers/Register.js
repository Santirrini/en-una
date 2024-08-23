require('dotenv').config();
const { User, Restaurant } = require('../db');
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
  Register: async (req, res) => {
    const { name, razon_social, ruc, contact_person, position, address, lastName, genre, date, country, province, district, user, password, email, phone, role, restaurantId } = req.body;

    try {
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        console.log('El usuario ya existe');
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const backgroundColor = getRandomColor();
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
      /* const emailContent = `
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
               <img src="https://elarisneakers.com/static/media/Logo.b202fc3baefbdd16a4ec.png" alt="Logo de la empresa" style="display: block; max-width: 150px; margin: 0 auto;">
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
         }); */

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
        address,
        district,
        user,
        email,
        password: hashedPassword,
        phone,
        role,
        backgroundColor,
        restaurantId, // Asigna el restaurante al usuario
      });

      // Obtener los detalles del restaurante relacionado
      const userWithRestaurant = await User.findByPk(newUser.id, {
        include: [Restaurant],
      });

      const tokenPayload = { id: newUser.id, role: newUser.role };
      const token = jwt.sign(tokenPayload, process.env.FIRMA_TOKEN);

      console.log('Usuario creado correctamente');

      return res.json({ token, user: userWithRestaurant }); // Devuelve el usuario con los detalles del restaurante
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};



/* 
 <body style="text-align: center;  background: rgb(253, 251, 251); padding: 2em">
        <div style="display: inline-block; text-align: left; padding: 1em; background: white;  width: 90%" >
          <div style="margin: 0 auto; text-align: center;">
            <img src="https://elarisneakers.com/static/media/Logo.b202fc3baefbdd16a4ec.png" alt="Logo de la empresa" style="display: block; max-width: 150px; margin: 0 auto;">
          </div>
    
          <p style="color: black;">Estimado/a ${name} ,</p>
          <p style="color: black;">Estamos encantados de confirmar de su Cuenta X POWER TRADE está creada que ahora puede comenzar su próspero viaje comercial con X POWER TRADE utilizando sus credenciales de Cuenta X POWER TRADE a continuación</p>
          <p style="color: black;">Email: ${email} </p>
          <p style="color: black;">Contraseña: ${password} </p>
          <p style="color: black;">Moneda: USD </p>
          <p><strong>*Para proteger su cuenta, no comparta sus credenciales con nadie.</strong></p>
          <p>¡Agregar fondos a su cuenta nunca ha sido tan facil ¡Haga click en el botón de abajo e inicie sesión! </p>
          <p><a href="https://xpowertrade.com/auth/login"><button style="padding: 1em;  background: rgb(0, 172, 240); color: white; cursor: pointer;margin: 0 auto; text-align: center;">¡INICIAR SESIÓN!</button></a></p>
          
    
       
        </div>
      </body> */