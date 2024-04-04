const { Products } = require('../db');

module.exports = {
  AllProducts: async (req, res) => {
    try {
  
        const products = await Products.findAll({
        order: [['createdAt', 'ASC']], // 'ASC' para obtener en orden ascendente (por fecha de creación)

        });
        if (products.length > 0) {
          res.status(200).send(products);
        } else {
          res.status(404).send({
            message: 'No existen los productos'
          });
        }
        console.log('Todos los productos');

     

    } catch (error) {
      console.error('Error al Mostrar todos los productos:', error);
      res.status(500).json({ error: 'Error al Mostrar todos los productos' });
    }
  }
};
