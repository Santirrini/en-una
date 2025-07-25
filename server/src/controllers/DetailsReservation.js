const { SuccessPayment, Order, Restaurant } = require('../db');

module.exports = {
  DetailsReservation: async (req, res) => {
    const { reservationtId } = req.params;
    try {
      const orderReservation = await SuccessPayment.findByPk(reservationtId, {
        include: [
          {
            model: Order,
            as: 'orders', // Alias correcto para la asociación entre SuccessPayment y Order
            include: [
              {
                model: Restaurant,  // Incluir el modelo Restaurant
              },
            ],
          },
        ],
      });
      

      if (!orderReservation) {
        console.log('No se encontraron reservaciones para este restaurante');
        return res.status(404).send({ success: false, message: 'No se encontraron reservaciones para este restaurante' });
      }

      console.log('Detalle de las reservaciones');
      res.status(200).send({ success: true, data: orderReservation });
    } catch (error) {
      console.error('Error al mostrar los detalles de las reservaciones:', error);
      res.status(500).json({ error: 'Error al mostrar los detalles de las reservaciones' });
    }
  },
};
