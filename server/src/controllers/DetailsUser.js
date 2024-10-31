const { User } = require('../db');

module.exports = {
    DetailsUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const userDetail = await User.findByPk(userId);

      if (!userDetail) {
        console.log('No se encontro ningun usuario');
        return res.status(404).send({ success: false, message: 'No se encontro ningun usuario' });
      }

      console.log('Detalle del usuario');
      res.status(200).send({ success: true, data: userDetail });
    } catch (error) {
      console.error('Error al mostrar los detalles del usuario:', error);
      res.status(500).json({ error: 'Error al mostrar los detalles del usuario' });
    }
  },
};
