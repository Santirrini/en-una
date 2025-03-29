const { Restaurant, User, Menu, Order, Code } = require('../db');

module.exports = {
    DetailsCodes: async (req, res) => {
    const { codeId } = req.params;
    try {
      const restaurant = await Code.findByPk(codeId, {
        include: {
            model: Restaurant,
            as: 'restaurants',
            include: [
                { model: User },
                { model: Menu },
                { model: Order }
      
              ]
        }
      
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
