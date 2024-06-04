require('dotenv').config();
const { OPENPAY_API_KEY, OPENPAY_MERCHANT_ID } = process.env;
const OpenPay = require('./lib/openpay');
const openpay = new OpenPay(OPENPAY_MERCHANT_ID, OPENPAY_API_KEY, 'pe', false);

const { SuccessPayment, Order } = require('../db');

module.exports = {
  WebHooksEvent: async (req, res) => {
    const event = req.body;

    console.log('Webhook recibido:', event);

    if (event.type === 'charge.succeeded') {
      const transaction = event.transaction;
      const { order_id, customer,metadata } = transaction;

      // Verifica y guarda la orden en la base de datos
      try {
        const { name, email, phone_number } = customer; // Ajusta según tu estructura
        const { additional_info_1} = metadata; // Ajusta según tu estructura

        // Busca la orden relacionada
        const order = await Order.findOne({ where: { id: order_id } });
        
        if (!order) {
          return res.status(404).send('Order not found');
        }

        const successPayment = await SuccessPayment.create({
          order_id,
          name,
          email,
          phone: phone_number,
          orderId: order.id,
          userId: additional_info_1
        });

        console.log('Orden guardada en la base de datos:', successPayment);
      } catch (error) {
        console.error('Error al guardar la orden en la base de datos:', error);
      }
    }

    res.status(200).send('Evento recibido');

  }
};
