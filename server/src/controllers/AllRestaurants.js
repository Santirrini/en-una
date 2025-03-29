const { Restaurant, Order, Menu, Code } = require('../db');

module.exports = {
  AllRestaurant: async (req, res) => {
    try {
      // Obtener todos los restaurantes con sus relaciones
      const restaurants = await Restaurant.findAll({
        include: [
          { model: Menu },
          { model: Order },
          { model: Code } // Para traer información del código asociado
        ]
      });

      // Agrupar restaurantes por CodeId
      const groupedRestaurants = {};
      restaurants.forEach(restaurant => {
        const codeId = restaurant.CodeId; // Suponiendo que `CodeId` es la FK en `Restaurant`
        
        if (!groupedRestaurants[codeId]) {
          groupedRestaurants[codeId] = {
            mainRestaurant: restaurant, // Guardamos solo uno como principal
            locations: [] // Lista de otras localidades
          };
        } else {
          groupedRestaurants[codeId].locations.push(restaurant);
        }
      });

      console.log('Restaurantes agrupados por CodeId');

      res.status(200).json({
        success: true,
        data: Object.values(groupedRestaurants) // Convertimos en array para la respuesta
      });

    } catch (error) {
      console.error('Error al obtener los restaurantes:', error);
      res.status(500).json({ error: 'Error al obtener los restaurantes' });
    }
  }
};
