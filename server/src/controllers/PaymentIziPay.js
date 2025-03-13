require('dotenv').config();



 module.exports = {
    PaymentIziPay: async (req, res) => {
  
      try {
     
      } catch (error) {
        console.error('Error en el pago:', error.response?.data || error.message);
        res.status(500).json({ error: 'Error al procesar el pago' });
      }
    }
  }