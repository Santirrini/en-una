require('dotenv').config();

const { OPENPAY_API_KEY, OPENPAY_MERCHANT_ID } = process.env;
const OpenPay = require('../lib/openpay');
const openpay = new OpenPay(OPENPAY_MERCHANT_ID, OPENPAY_API_KEY, 'pe', true);
openpay.setProductionReady(false);

module.exports = {
  Payment: async (req, res) => {
    try {
      const chargeRequest = {
        'method': 'card',
        'currency': "PEN",
        'amount': 111,
        'description': 'Cargo desde terminal virtual de 111',
        'customer': {
          'name': 'Mario',
          'last_name': 'Benedetti Farrugia',
          'phone_number': '1111111111',
          'email': 'mario_benedetti@miempresa.co'
        },
        'send_email': false,
        'confirm': false,
        'redirect_url': 'http://www.openpay.co/index.html'
      }
      openpay.charges.create(chargeRequest, (error, charge) => {
        if (error) {
          console.log(error)
          res.status(404).send(error)
        } else {
          console.log(charge);
          res.status(200).json(charge)

        }
      }
      );

    } catch (error) {
      console.error('Error al procesar el pago:', error);
      res.status(500).send('Error al procesar el pago');
    }
  }
};
