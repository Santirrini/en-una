require('dotenv').config();

const { OPENPAY_API_KEY, OPENPAY_MERCHANT_ID } = process.env;
const OpenPay = require('./lib/openpay');
const openpay = new OpenPay(OPENPAY_MERCHANT_ID, OPENPAY_API_KEY, 'pe', false);
module.exports = {
  Webhooks: async (req, res) => {


    try {
      openpay.webhooks.get("wx6rq4ydty7ehva0u5vs", function(error, webhook) {
        if (error) {
          console.error('Error al obtener el webhook:', error);
          return res.status(500).send(error);
        } else {
          console.log('Webhook obtenido:', webhook);
          return res.status(200).send(webhook);
        }
      });
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      return res.status(500).send('Error al procesar el pago');
    }
  }
};
