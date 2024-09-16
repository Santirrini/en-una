const { User } = require('../db');

module.exports = {
    UpdatePersonal: async (req, res) => {
    const {  name, lastName, email,genre, date, phone, razon_social, email_additional, ruc, contact_person, position, address, country, province, district, userId} = req.body;



    try {
      const user = await User.findByPk(userId);

      if (!user) {
        console.log('Usuario no encontrado')
        return res.status(404).json({ succes: false, message: 'Usuario no encontrado' });
      }

      await user.update({ name, lastName, email,genre, date, phone, razon_social, email_additional, ruc, contact_person, position, address, country, province, district,});
      
      res.status(200).send({success: true, message:'Estado actualizado'});
      console.log('Estado actualizado')
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
