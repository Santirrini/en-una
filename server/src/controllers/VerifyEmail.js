const jwt = require('jsonwebtoken');
const { User } = require('../db');

module.exports = {
  VerifyEmail: async (req, res) => {
    const { token } = req.query;

    try {
      // Verificar token
      const decoded = jwt.verify(token, process.env.FIRMA_TOKEN);
      const { email } = decoded;

      // Buscar el usuario y actualizar su estado
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      if (user.status === 'activo') {
        return res.status(400).json({ message: 'El usuario ya está verificado' });
      }

      user.status = 'activo';
      await user.save();

      return res.json({ message: 'Correo verificado exitosamente' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Token inválido o expirado' });
    }
  },
};
