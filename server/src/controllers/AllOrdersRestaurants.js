const { SuccessPayment, Order } = require('../db');

module.exports = {
    AllOrdersRestaurants: async (req, res) => {

  
    
    try {
      const orders = await SuccessPayment.findAll();

      console.log(`Todas las órdenes`);

      res.status(200).json(orders);
    } catch (error) {
      console.error('Error al obtener todas las órdenes:', error);
      res.status(500).json({ error: 'Error al obtener todas las órdenes' });
    }
  }
};
