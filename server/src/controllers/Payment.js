require('dotenv').config();

const { OPENPAY_API_KEY, OPENPAY_MERCHANT_ID } = process.env;
const OpenPay = require('openpay');
const openpay = new OpenPay(OPENPAY_MERCHANT_ID, OPENPAY_API_KEY, {
  language: 'es_PE',
  country: 'pe',
  sandbox: true
});

module.exports = {
  Payment: async (req, res) => {
    try {
      const { sourceId, amount, description, orderId } = req.body;
      if (!sourceId || !amount || !description || !orderId) {
        return res.status(400).send('Missing required fields');
      }

      const chargeData = {
        method: 'card',
        source_id: sourceId,
        amount,
        description,
        order_id: orderId
      };

      const charge = await new Promise((resolve, reject) => {
        openpay.charges.create(chargeData, (error, charge) => {
          if (error) {
            reject(error);
          } else {
            resolve(charge);
          }
        });
      });

      res.status(200).send(charge.redirect_url);
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      res.status(500).send('Error al procesar el pago');
    }
  }
};