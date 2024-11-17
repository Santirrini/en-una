  const { Restaurant, Order, Menu, SuccessPayment} = require('../db');
module.exports = {
  AllRestaurant: async (req, res) => {
    try {
      const order = await SuccessPayment.findAll({
        include: {
          model: Order,
          as: 'orders',
        }
      });
  
        const restaurants = await Restaurant.findAll({
          include: [
            { model: Menu },
            { model: order }
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
