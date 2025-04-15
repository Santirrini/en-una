

require('dotenv').config();
const { OPENPAY_API_KEY, OPENPAY_MERCHANT_ID } = process.env;
const OpenPay = require('./lib/openpay');
const openpay = new OpenPay(OPENPAY_MERCHANT_ID, OPENPAY_API_KEY, 'pe', false);
const jwt = require('jsonwebtoken');
const { Order } = require("../db");

module.exports = {
    Payment: async (req, res) => {
    const { location, date, hours, area, peoples, order, observation, restaurantId } = req.body;
    const { authorization } = req.headers;

    jwt.verify(authorization, process.env.FIRMA_TOKEN, async (err, decoded) => {
      if (err) {
        return res.sendStatus(401);
      }

      try {
        // Validar que `order` es un arreglo
        if (!Array.isArray(order)) {
          return res.status(400).send({ success: false, message: 'El campo "order" debe ser un arreglo' });
        }

        // Crear la orden en la base de datos y obtener el UUID generado
        const orders = await Order.create({ location, date, hours, area, peoples, observation, order, restaurantId, userId: decoded.id });

            res.status(200).send({ success: true, data:  orders });

      } catch (error) {
        console.error('Error al guardar la orden en el modelo Order:', error);
        return res.status(500).send('Error al guardar la orden en el modelo Order');
      }
    });
  }
};
