const { SuccessPayment, Order } = require('../db');

module.exports = {
  OrderDetails: async (req, res) => {
        const {orderId} = req.params;
    try {
  
        const order = await SuccessPayment.findByPk(orderId, {
          include: {
            model: Order,
            as: 'orders',
          }
        });

        if (!order) {
          
        console.log('No hay ordenes');

        res.status(404).send( {success: false, message: "No hay ordenes"})
        } else {
          console.log('Una orden');

          res.status(200).send( {success: true, data: order})
        }

   


    } catch (error) {
      console.error('error al obtener una orden:', error);
      res.status(500).json({ error: 'error al obtener una orden' });
    }
  }
};
