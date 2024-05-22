require('dotenv').config();
const bcrypt = require('bcrypt');
const { User } = require('../db');
const jwt = require('jsonwebtoken');
module.exports = {
  resetPassword: async (req, res) => {
    const { token  } = req.params;

    const { newPassword } = req.body;


    try {
      const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
      const user = await User.findByPk(decoded.id);

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      user.password = hashedPassword;
      await user.save();

      console.log('Contraseña restablecida correctamente');
      return res.json({ message: 'Contraseña restablecida correctamente' });

    } catch (error) {
      console.error(error);
      if (error.name === 'TokenExpiredError') {
        return res.status(400).json({ message: 'El enlace ha expirado' });
      }
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
