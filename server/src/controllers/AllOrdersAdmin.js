const { SuccessPayment, Order } = require('../db');

module.exports = {
    AllOrdersAdmin: async (req, res) => {
   
    
    try {
      const orders = await SuccessPayment.findAll({
        include: {
          model: Order,
          as: 'orders',
        }
      });

      console.log(`Todas las órdenes para de los restaurantes restaurante`);

      res.status(200).json(orders);
    } catch (error) {
      console.error('Error al obtener todas las órdenes:', error);
      res.status(500).json({ error: 'Error al obtener todas las órdenes' });
    }
  }
};
