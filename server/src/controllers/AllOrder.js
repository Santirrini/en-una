const { Orders } = require('../db');

module.exports = {
  AllOrder: async (req, res) => {
    try {
  
        const orders = await Orders.findAll();

        console.log('Todas los ordenes');

        res.status(200).json(orders)


    } catch (error) {
      console.error('error al obtener Todas las ordenes:', error);
      res.status(500).json({ error: 'error al obtener Todas las ordenes' });
    }
  }
};
