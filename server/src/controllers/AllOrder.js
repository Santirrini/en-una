const { SuccessPayment, Order } = require('../db');

module.exports = {
  AllOrder: async (req, res) => {
    const { restaurantId } = req.query;

    if (!restaurantId) {
      return res.status(400).json({ error: 'restaurantId es requerido' });
    }
    
    try {
      const orders = await SuccessPayment.findAll({
        include: {
          model: Order,
          as: 'order',
          where: { restaurantId } // Filtro por restaurantId
        }
      });

      console.log(`Todas las órdenes para el restaurante con ID ${restaurantId}`);

      res.status(200).json(orders);
    } catch (error) {
      console.error('Error al obtener todas las órdenes:', error);
      res.status(500).json({ error: 'Error al obtener todas las órdenes' });
    }
  }
};
