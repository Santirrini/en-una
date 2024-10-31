const { Form } = require('../db');

module.exports = {
    DetailsForm: async (req, res) => {
    const { formId } = req.params;
    try {
      const FormDetail = await Form.findByPk(formId);

      if (!FormDetail) {
        console.log('No se encontro la petición de registro');
        return res.status(404).send({ success: false, message: 'No se encontro la petición de registro' });
      }

      console.log('Detalle del formulario');
      res.status(200).send({ success: true, data: FormDetail });
    } catch (error) {
      console.error('Error al mostrar la petición de registro:', error);
      res.status(500).json({ error: 'Error al mostrar la petición de registro' });
    }
  },
};
