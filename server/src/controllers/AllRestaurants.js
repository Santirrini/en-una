const { Restaurant, Order, Menu, Code } = require('../db');

module.exports = {
  AllRestaurant: async (req, res) => {
    try {
      // Obtener todos los restaurantes con sus relaciones
      const restaurants = await Restaurant.findAll({
        include: [
          { model: Menu },
          { model: Order }
        ]
      });

      // Agrupar restaurantes por Code
      const groupedRestaurants = {};
      restaurants.forEach(restaurant => {
        const code = restaurant.Code; // Suponiendo que `Code` es un atributo del modelo `Restaurant`
        if (!groupedRestaurants[code]) {
          groupedRestaurants[code] = {
            mainRestaurant: restaurant, // Guardamos solo uno como principal
            relatedRestaurants: [] // Lista de restaurantes con el mismo Code
          };
        } else {
          groupedRestaurants[code].relatedRestaurants.push(restaurant);
        }
      });

      console.log('Restaurantes agrupados por Code');

      res.status(200).json({
        success: true,
        data: Object.values(groupedRestaurants) // Convertir en un array para la respuesta
      });

    } catch (error) {
      console.error('Error al obtener los restaurantes:', error);
      res.status(500).json({ error: 'Error al obtener los restaurantes' });
    }
  }
};
