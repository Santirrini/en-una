const { OPENPAY_API_KEY, OPENPAY_MERCHANT_ID } = process.env;
const OpenPay = require('./lib/openpay');
const openpay = new OpenPay(OPENPAY_MERCHANT_ID, OPENPAY_API_KEY, 'pe', false);
const jwt = require('jsonwebtoken');
const { Order, Restaurant } = require("../db");

module.exports = {
  Payment: async (req, res) => {
    const { items, restaurantId } = req.body;
    const { authorization } = req.headers;
    
    jwt.verify(authorization, process.env.FIRMA_TOKEN, async (err, decoded) => {
      if (err) {
        return res.sendStatus(401);
      }

      try {
        // Crear el pedido
        const order = await Order.create({ items: items, restaurantId: restaurantId });

        // Obtener la información del restaurante
        const restaurant = await Restaurant.findByPk(restaurantId);

        // Simular el envío de una notificación al restaurante
        console.log(`Nuevo pedido recibido en el restaurante ${restaurant.name}: ${JSON.stringify(order)}`);

        // Resto del código para el procesamiento de pago con OpenPay...
        
      } catch (error) {
        console.error('Error al procesar el pago:', error);
        return res.status(500).send('Error al procesar el pago');
      }
    });
  }
};
