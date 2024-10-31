const { Form } = require('../db');
module.exports = {
    AllForm: async (req, res) => {
    try {
  
        const All = await Form.findAll();

        console.log('Todos los formularios');

        res.status(200).send({success: true, data: All})


    } catch (error) {
      console.error('error al obtener Todas las ordenes:', error);
      res.status(500).json({ error: 'error al obtener Todas las ordenes' });
    }
  }
};
