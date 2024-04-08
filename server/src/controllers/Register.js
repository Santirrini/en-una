const { User } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

module.exports = {
  Register: async (req, res) => {
    const { name, password, email, phone, role, restaurantId } = req.body;

    try {
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        console.log('El usuario ya existe');
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const backgroundColor = getRandomColor();
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

      const newUser = await User.create({
        name: capitalizedName,
        email,
        password: hashedPassword,
        phone,
        role,
        backgroundColor,
        restaurantId, // Asigna el restaurante al usuario
      });

      // Obtener los detalles del restaurante relacionado
      const userWithRestaurant = await User.findByPk(newUser.id, {
        include: [Restaurant],
      });

      const tokenPayload = { id: newUser.id, role: newUser.role };
      const token = jwt.sign(tokenPayload, process.env.FIRMA_TOKEN);

      console.log('Usuario creado correctamente');

      return res.json({ token, user: userWithRestaurant }); // Devuelve el usuario con los detalles del restaurante
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
