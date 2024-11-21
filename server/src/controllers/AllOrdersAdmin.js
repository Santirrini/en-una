const { SuccessPayment, Order, Restaurant } = require('../db');

module.exports = {
    AllOrdersAdmin: async (req, res) => {
   
    
    try {
      const successPayments = await SuccessPayment.findAll({
        include: [
          {
            model: Order,
            as: 'orders', // Alias configurado en la relación
            include: [
              {
                model: Restaurant,
                as: 'restaurant', // Alias configurado en la relación
              },
            ],
          },
        ],
      });
      

      console.log(`Todas las órdenes para de los restaurantes restaurante`);

      res.status(200).json(successPayments);
    } catch (error) {
      console.error('Error al obtener todas las órdenes:', error);
      res.status(500).json({ error: 'Error al obtener todas las órdenes' });
    }
  }
};
