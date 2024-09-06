const { User } = require('../db');

module.exports = {
    UpdatePersonalRestaurant: async (req, res) => {
    const {  name, lastName, email,genre, date, phone, userId} = req.body;



    try {
      const user = await User.findByPk(userId);

      if (!user) {
        console.log('Usuario no encontrado')
        return res.status(404).json({ succes: false, message: 'Usuario no encontrado' });
      }

      await user.update({  name, lastName, email,genre, date, phone});
      
      res.status(200).send({success: true, message:'Estado actualizado'});
      console.log('Estado actualizado')
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
