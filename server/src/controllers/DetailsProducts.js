const { Products } = require('../db');

module.exports = {
  DetailsProducts: async (req, res) => {
    const { productId } = req.params;
    try {
      const products = await Products.findByPk(productId);
      if (!products) {
        console.log('El producto no existe');
        return res.status(400).send({ message: 'El producto no existe' });
      }

      console.log('Detalle del producto');
      res.status(200).send(products);
    } catch (error) {
      console.error('Error al Mostrar todos los productos:', error);
      res.status(500).json({ error: 'Error al Mostrar todos los productos' });
    }
  }
};
