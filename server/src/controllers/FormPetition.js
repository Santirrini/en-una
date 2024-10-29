const { Form } = require('../db'); // Asegúrate de que tu modelo Menu tenga un campo para las categorías
require('dotenv').config();


module.exports = {
    FormPetition: async (req, res) => {
 const {ruc, reason_social, busines_name, legal_representative, legal_representative_dni, legal_manager, local_address, phone_contact, local_phone, email, email_contract } = req.body
      try {
        const formRegister = await Form.create({
            ruc, reason_social, busines_name, legal_representative, legal_representative_dni, legal_manager, local_address, phone_contact, local_phone, email, email_contract 
        })
            console.log("Formulario enviado correctamente")
            res.status(200).send({ success: true, message: 'Formulario enviado correctamente' });
      
      } catch (error) {
        console.error('Error al enviar formulario de petición de registro:', error);
        res.status(500).send({ success: false, error: 'Error al enviar formulario de petición de registro' });
      }
  }
};
