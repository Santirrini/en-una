const { Restaurant } = require('../db');

module.exports = {
    FilterCategory: async (req, res) => {
    const { category } = req.params;
    try {
      const filtercategory = await Restaurant.findAll({
           where: category
      });

      if (!filtercategory) {
        console.log('No se encontro ningun restaurante');
        return res.status(404).send({ success: false, message: 'No se encontro ningun restaurante' });
      }

      console.log('Todos los restaurantes filtrados');
      res.status(200).send({ success: true, data: filtercategory });
    } catch (error) {
      console.error('Error al mostrar los restaurantes filtrados:', error);
      res.status(500).json({ error: 'Error al mostrar los restaurantes filtrados' });
    }
  },
};
