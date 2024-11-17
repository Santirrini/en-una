const { Restaurant, Order, Menu, SuccessPayment } = require('../db');

module.exports = {
  AllRestaurant: async (req, res) => {
    try {
      // Buscar todos los restaurantes, incluyendo sus menús y órdenes relacionadas
      const restaurants = await Restaurant.findAll({
        include: [
          { model: Menu }, // Incluye los menús del restaurante
          { 
            model: Order, 
            as: 'orders', 
            include: [
              { 
                model: SuccessPayment, 
                as: 'successPayments' // Incluye pagos exitosos relacionados
              }
            ]
          }
        ]
      });

      if (!restaurants || restaurants.length === 0) {
        console.log('No se encontraron restaurantes');
        return res.status(404).json({ success: false, message: 'No se encontraron restaurantes' });
      }

      console.log(`Se encontraron ${restaurants.length} restaurantes`);
      res.status(200).json({ success: true, data: restaurants });
    } catch (error) {
      console.error('Error al obtener los restaurantes:', error.message);
      res.status(500).json({ success: false, error: 'Error al obtener los restaurantes' });
    }
  }
};
