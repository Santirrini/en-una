const { Orders } = require('../db');

module.exports = {
    detailsOrder: async (req, res) => {
        const {orderId} = req.params;
    try {
  
        const order = await Orders.findByPk(orderId);

        console.log('Una orden');

        res.status(200).json(order)


    } catch (error) {
      console.error('error al obtener una orden:', error);
      res.status(500).json({ error: 'error al obtener una orden' });
    }
  }
};
