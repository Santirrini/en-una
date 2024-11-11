const { User, Restaurant, Order } = require('../db');

module.exports = {
  AllUsers: async (req, res) => {
    try {

      const users = await User.findAll({
        include: {
          model: Restaurant
        }
    
        
      });

      console.log('Todos los usuarios');

      res.status(200).send(users)


    } catch (error) {
      console.error('Error al Mostrar todos los usuarios:', error);
      res.status(500).json({ error: 'Error al Mostrar todos los usuarios' });
    }
  }
};
