require('dotenv').config();
const { User } = require('../db');

module.exports = {
  AdminFormSuccess: async (req, res) => {
    try {
      // Generar un código único de 4 dígitos
      let code;
      let isUnique = false;

      while (!isUnique) {
        code = Math.floor(1000 + Math.random() * 9000); // Genera un número entre 1000 y 9999
        const existingUser = await User.findOne({ where: { code } });
        if (!existingUser) {
          isUnique = true; // Si el código es único, salir del bucle
        }
      }

      // Crear el nuevo usuario en la base de datos
      const newUser = await User.create({
        code, // Almacena el código único generado
      });
  console.log('Formulario de registro confirmado con éxito')
      res.status(201).json({ message: 'Formulario de registro confirmado con éxito', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
