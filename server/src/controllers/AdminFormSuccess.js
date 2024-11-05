require('dotenv').config();
const { User, Code, Restaurant } = require('../db');

module.exports = {
  AdminFormSuccess: async (req, res) => {
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
