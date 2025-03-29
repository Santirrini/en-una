const { Code, Restaurant, Order, Menu } = require('../db');

module.exports = {
  AllCodes: async (req, res) => {

    try {
      const restaurants = await Code.findAll({
        include: {
          model: Restaurant,
          as: 'restaurants',
          include: [
            { model: Menu },
            { model: Order }
          ]
        }
      });

      console.log('Todos los restaurantes');

      res.status(200).send({success: true, data: restaurants})

    } catch (error) {
      console.error('Error al obtener todas los restaurantes:', error);
      res.status(500).json({ error: 'Error al obtener todas los restaurantes' });
    }
  }
};
