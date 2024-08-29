require('dotenv').config();
const { OPENPAY_API_KEY, OPENPAY_MERCHANT_ID } = process.env;
const OpenPay = require('./lib/openpay');
const openpay = new OpenPay(OPENPAY_MERCHANT_ID, OPENPAY_API_KEY, 'pe', false);
const jwt = require('jsonwebtoken');
const { Order } = require("../db");

module.exports = {
  Payment: async (req, res) => {
    const { location, date, hours,area, peoples, order, observation,  restaurantId } = req.body;
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
        const orders = await Order.create({ location, date, hours, area, peoples,observation, order, restaurantId, userId: decoded.id });
        const orderId = orders.id;  // UUID generado por la base de datos


        const name = decoded.name;
        const lastName = decoded.lastName;

        const email = decoded.email;
        const phone = decoded.phone;

        const totalAmount = order.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);

        const newCharge = {
          method: 'card',
          amount: totalAmount,
          currency: 'PEN',
          description: `Reservar`,
          order_id: orderId,  // Utilizar el UUID generado por la base de datos
          customer: {
            name: name,
            lastName: lastName,
            email: email,
            phone_number: phone,
          },
          send_email: false,
          confirm: false,
          redirect_url: 'https://www.enunaapp.com',
          metadata: {
            additional_info_1: decoded.id,

            custom_field: observation
          }
        };
        

        openpay.charges.create(newCharge, function (error, body) {
          if (error) {
            console.error("Error:", error);
            res.status(500).send({ success: false, message: 'Error al procesar el pago' });
          } else {
            console.log("Respuesta:", body);
            res.status(200).send({ success: true, data: body.payment_method.url });
          }
        });

      } catch (error) {
        console.error('Error al procesar el pago:', error);
        return res.status(500).send('Error al procesar el pago');
      }
    });
  }
};
