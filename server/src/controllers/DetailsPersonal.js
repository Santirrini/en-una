const jwt = require('jsonwebtoken');
const { User, Restaurant, Menu } = require('../db');

module.exports = {
  DetailsPersonal: async (req, res) => {
    const { authorization } = req.headers;

    try {
      if (!authorization) {
        console.log('No se proporcionó un token de autorización');
        return res.status(400).json({ message: 'No se proporcionó un token de autorización' });
      }

      const payload = jwt.verify(authorization, process.env.FIRMA_TOKEN);

      const user = await User.findOne({ 
        where: { id: payload.id },
        include: [{
          model: Restaurant,
          include: Menu // Incluye los menús asociados al restaurante
        }]
      });

      if (!user) {
        console.log('Usuario no encontrado');
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      return res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  }
};
