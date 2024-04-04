require('dotenv').config();
const { Products, Orders } = require('../db');
const axios = require('axios');



module.exports = {
  createOrder: async (req, res) => {
    const { productId } = req.params;
    try {
 

      const product = await Products.findByPk(productId)

      const order = {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: product.price
          }
        }],
        
        application_context: {
          brand_name: 'vipmonnoal.com',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: 'http://localhost:3001/capture-order',
          cancel_url: 'http://localhost:3001/cancel-order',
        }
      };

      const params = new URLSearchParams();
      params.append('grant_type', 'client_credentials');

      const { data: { access_token } } = await axios.post(`${process.env.PAYPAL_API}/v1/oauth2/token`, params, {
        auth: {
          username: process.env.PAYPAL_API_CLIENT,
          password: process.env.PAYPAL_API_SECRET
        }
      });

      const response = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders`, order, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      // Crear la orden solo si el estado del pago está completado

      console.log(response.data);
      res.json(response.data);
    } catch (error) {
      console.error('Error al pagar', error);
      res.status(500).json({ error: error.message });
    }
  }
};
