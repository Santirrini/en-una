const { Products } = require('../db');

module.exports = {
  UpdateProduct: async (req, res) => {
    const { productId } = req.params;
    const { product, details, price, price_send } = req.body;

    try {
      const products = await Products.findByPk(productId);

    if (!products) {
        return res.status(200).send({ message: 'no se encontro la publicacion' });
      }

      // Update the product
      await products.update({ product, details, price, price_send });
    console.log('actualizado correctamente');
      res.status(200).send({ message: 'actualizado correctamente' }); 

    } catch (error) {
      console.error('error al actualizar:', error);
      res.status(500).json({ error: 'error al actualizar' });
    }
  }
};