require('dotenv').config();
const { Orders} = require('../db');
const axios = require('axios')

  // Production 'https://api-m.sandbox.paypal.com'
module.exports = {
    captureOrder: async (req, res) => {
      const { token } = req.query
    try {
  
        const response = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
            auth: {
                username: process.env.PAYPAL_API_CLIENT, // Usar CLIENT en lugar de PAYPAL_API_CLIENT
                password: process.env.PAYPAL_API_SECRET    // Usar SECRET en lugar de PAYPAL_API_SECRET
            }
          } )
      
          console.log(response.data.purchase_units[0].shipping.address);
       const order = await Orders.create({
            name: response.data.payment_source.paypal.name.given_name,
             lastName: response.data.payment_source.paypal.name.surname,
              email:response.data.payment_source.paypal.email_address, 
              address_line_1: response.data.purchase_units[0].shipping.address.address_line_1,
              admin_area_2: response.data.purchase_units[0].shipping.address.admin_area_2,
              admin_area_1: response.data.purchase_units[0].shipping.address.admin_area_1,
              postal_code: response.data.purchase_units[0].shipping.address.postal_code,
              country_code: response.data.purchase_units[0].shipping.address.country_code,





           })  
          return res.send(order)

    } catch (error) {
      console.error('Error al pagar', error);
      res.status(500).json({ error: 'Error al pagar' });
    }
  }
};
