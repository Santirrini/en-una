import React, { useEffect, useState } from 'react';
import { GetTokenSession } from '../js/getTokenSession';
import { getDataOrderDynamic } from '../js/util';
const {transactionId, orderNumber} = getDataOrderDynamic();
const TRANSACTION_ID = transactionId;
const MERCHANT_CODE = '4001834';
const PUBLIC_KEY = 'VErethUtraQuxas57wuMuquprADrAHAb';
const ORDER_AMOUNT = '1.99';
const ORDER_CURRENCY = 'PEN';
const ORDER_NUMBER = orderNumber;
const PaymentPage = () => {
  const [isReadyToPay, setIsReadyToPay] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [token, setToken] = useState(null);


  // Datos de la transacción

  useEffect(() => {
    // Asegurarse de que Izipay esté disponible
    const checkIzipayAvailability = setInterval(() => {
      if (window.Izipay) {
        clearInterval(checkIzipayAvailability);
        initializePayment();
      }
    }, 100);

    return () => clearInterval(checkIzipayAvailability);
  }, []);

  const initializePayment = () => {
    // Obteniendo transactionId y orderNumber dinámicamente

    // Datos del comercio


    // Obtener el token de sesión para inicializar el formulario de pago
    GetTokenSession(TRANSACTION_ID, {
      requestSource: 'ECOMMERCE',
      merchantCode: MERCHANT_CODE,
      orderNumber: ORDER_NUMBER,
      publicKey: PUBLIC_KEY,
      amount: ORDER_AMOUNT,
    }).then((authorization) => {
      const { response: { token = undefined } } = authorization;

      if (token) {
        setToken(token);
        setIsReadyToPay(true);
      }
    });
  };

  const handleLoadForm = () => {
    if (!token) return;
  
    // Asegúrate de que el orderNumber se obtenga correctamente en ambos lugares
    console.log("Order number al obtener el token:", orderNumber); // Verifica que sea el mismo
  
    const iziConfig = {
      publicKey: PUBLIC_KEY,
      config: {
          transactionId: TRANSACTION_ID,
          action: 'pay',
          merchantCode: MERCHANT_CODE,
          order: {
              orderNumber: ORDER_NUMBER,
              currency: ORDER_CURRENCY,
              amount: ORDER_AMOUNT,
              processType: 'AT',
              merchantBuyerId: 'mc1768',
              dateTimeTransaction: '1670258741603000', //currentTimeUnix
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
              container: '#your-iframe-payment',
          },
          urlRedirect:'https://server.punto-web.com/comercio/creceivedemo.asp?p=h1',
          appearance: {
              logo: 'https://demo-izipay.azureedge.net/test/img/millasb.svg',
          },
      }
    }


  
    const callbackResponsePayment = (response) => {
      setPaymentMessage(JSON.stringify(response, null, 2));
    };
  
    console.log("Request data:", iziConfig);  
    try {
      const izi = new window.Izipay({
        publicKey: iziConfig?.publicKey,
        config: iziConfig?.config,
      });
  
      // Verifica que el valor de token y orderNumber esté correcto
      console.log("Token usado para la autorización:", token);
      console.log("Formulario de pago cargado...");
  
      izi?.LoadForm({
        authorization: token,
        keyRSA: 'RSA',
        callbackResponse: callbackResponsePayment,
      });
  
    } catch (error) {
      console.error('Error al cargar el formulario de pago:', error);
    }
  };
  
  
  
  return (
    <div>
      <h1>Realizar Pago</h1>
      <button
        id="btnPayNow"
        className="buttonPay"
        type="button"
        disabled={!isReadyToPay}
        onClick={handleLoadForm}
      >
        {isReadyToPay ? 'Pay Now PEN 1.99' : 'Cargando...'}
      </button>

      <pre id="payment-message">{paymentMessage}</pre>

      <div id="your-iframe-payment"></div> {/* Contenedor donde se cargará el formulario de pago */}
    </div>
  );
};

export default PaymentPage;
