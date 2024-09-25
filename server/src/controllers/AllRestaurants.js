const { Restaurant, User, Menu } = require('../db');
module.exports = {
  AllRestaurant: async (req, res) => {
    try {
  
        const restaurants = await Restaurant.findAll({
          include: [
            { model: Menu }
          ]
        });

        console.log('Todos los restaurantes');

        res.status(200).send({success: true, data: restaurants})


    } catch (error) {
      console.error('error al obtener Todas las ordenes:', error);
      res.status(500).json({ error: 'error al obtener Todas las ordenes' });
    }
  }
};
