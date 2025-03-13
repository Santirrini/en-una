require('dotenv').config();
const { GetTokenSession } = require('./getTokenSession');
const { getDataOrderDynamic } = require('./util');

// Configuración de los datos del comercio
const MERCHANT_CODE = process.env.MERCHANT_CODE || '4001834'; // Utiliza dotenv para el merchant code
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'VErethUtraQuxas57wuMuquprADrAHAb'; // Utiliza dotenv para la public key

module.exports = {
  Pay: async (req, res) => {
    try {
      // Generación de datos dinámicos de la transacción
      const { transactionId, orderNumber } = getDataOrderDynamic();
      const ORDER_AMOUNT = req.body.amount || '1.99'; // Cantidad del pedido, recibida del cuerpo de la solicitud
      const ORDER_CURRENCY = 'PEN'; // Moneda del pedido

      // Obtener el token de sesión utilizando GetTokenSession
      const authorization = await GetTokenSession(transactionId, {
        requestSource: 'ECOMMERCE',
        merchantCode: MERCHANT_CODE,
        orderNumber: orderNumber,
        publicKey: PUBLIC_KEY,
        amount: ORDER_AMOUNT,
      });

      const { response: { token = undefined } } = authorization;

      if (token) {
        // Configuración del pago con los datos obtenidos
        const iziConfig = {
          publicKey: PUBLIC_KEY,
          config: {
            transactionId: transactionId,
            action: 'pay',
            merchantCode: MERCHANT_CODE,
            order: {
              orderNumber: orderNumber,
              currency: ORDER_CURRENCY,
              amount: ORDER_AMOUNT,
              processType: 'AT',
              merchantBuyerId: 'mc1768',
              dateTimeTransaction: Date.now().toString(), // Tiempo actual en Unix
            },
            card: {
              brand: '',
              pan: '',
            },
            billing: {
              firstName: 'Darwin',
              lastName: 'Paniagua',
              email: 'demo@izipay.pe',
              phoneNumber: '989339999',
              street: 'calle el demo',
              city: 'lima',
              state: 'lima',
              country: 'PE',
              postalCode: '00001',
              document: '12345678',
              documentType: 'DNI',
            },
            render: {
              typeForm: 'pop-up',
              container: '#your-iframe-payment', // Asegúrate de que este ID sea el correcto en tu HTML
            },
            urlRedirect: 'https://server.punto-web.com/comercio/creceivedemo.asp?p=h1',
            appearance: {
              logo: 'https://demo-izipay.azureedge.net/test/img/millasb.svg',
            },
          },
        };

        // Aquí puedes enviar la respuesta con los datos de pago
        res.status(200).json({
          message: 'Pago preparado correctamente',
          iziConfig,
        });
      } else {
        // Si no se obtiene el token, manejar el error
        res.status(400).json({
          error: 'No se pudo obtener el token de sesión',
        });
      }
    } catch (error) {
      // Manejo de errores
      console.error('Error en el pago:', error.response?.data || error.message);
      res.status(500).json({ error: 'Error al procesar el pago' });
    }
  },
};
