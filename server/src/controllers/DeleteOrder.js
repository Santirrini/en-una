const { Orders } = require('../db');

module.exports = {
    DeleteOrder: async (req, res) => {
    const { orderId } = req.params;

    try {
      // Verificar si la publicación existe
      const order = await Orders.findByPk(orderId);

      if (!order) {
        console.log('Orden no encontrada');
        return res.status(404).json({ message: 'Orden no encontrada' });
      }

      // Eliminar la publicación
      await order.destroy();
      console.log('Orden eliminada exitosamente');
      res.status(200).json({ message: 'Orden eliminada exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  },
};
