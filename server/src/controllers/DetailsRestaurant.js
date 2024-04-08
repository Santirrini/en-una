const { Restaurant, User } = require('../db');

module.exports = {
  DetailsRestaurant: async (req, res) => {
    const { restaurantId } = req.params;
    try {
      const restaurant = await Restaurant.findByPk(restaurantId, {
        include: [{
          model: User
        }]
      });
      if (!restaurant) {
        console.log('El restaurante no existe');
        return res.status(404).send({ success: false, message: 'El restaurante no existe' });
      }

      console.log('Detalle del restaurante');
      res.status(200).send({ success: true, data: restaurant });
    } catch (error) {
      console.error('Error al mostrar los detalles de mi restaurante:', error);
      res.status(500).json({ error: 'Error al mostrar los detalles de mi restaurante' });
    }
  }
};
