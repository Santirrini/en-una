import React, { useEffect, useState } from 'react';
import { GetTokenSession } from '../../js/getTokenSession';
import { getDataOrderDynamic } from '../../js/util';
import { useDispatch, useSelector } from "react-redux";
import { dataPersonal } from "../../redux/action";
import styles from "./CarsFood.module.css";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const {transactionId, orderNumber} = getDataOrderDynamic();
const TRANSACTION_ID = transactionId;
const MERCHANT_CODE = '4001834';
const PUBLIC_KEY = 'VErethUtraQuxas57wuMuquprADrAHAb';
const ORDER_AMOUNT = '1.99';
const ORDER_CURRENCY = 'PEN';
const ORDER_NUMBER = orderNumber;

const FormIzipay = ({handleReserve, loading}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const datapersonal = useSelector((state) => state.datapersonal);
  const [isReadyToPay, setIsReadyToPay] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [token, setToken] = useState(null);
  const tokenUser = useSelector((state) => state.token);  
  const userId = useSelector((state) => state.userId);
  const orderId = useSelector((state) => state.orderId);

  





  React.useEffect(() => {
    dispatch(dataPersonal(tokenUser));
  }, [dispatch, tokenUser]);
  useEffect(() => {
    const checkIzipayAvailability = setInterval(() => {
      if (window.Izipay) {
        clearInterval(checkIzipayAvailability);
        initializePayment();
      }
    }, 100);

    return () => clearInterval(checkIzipayAvailability);
  }, [token]);


  const initializePayment = () => {
    handleReserve();

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
      // Realizar la consulta al backend después del pago

      if (response.message === 'OK') {

    
        axios.post('https://en-una-production.up.railway.app/api/order-success', {
          name: datapersonal.name,
          lastName: datapersonal.lastName,
          email: datapersonal.email,
          phone: datapersonal.lastName,
          observation: "asdasdwadasdasdasdasd",
          orderId: orderId.data,
          userId: userId
        })
          .then((data) => {
            console.log('Respuesta del backend:', data);
          })
          .catch((error) => {
            console.error('Error al consultar el pago en el backend:', error);
          });
        
        
          navigate("/reserva-exitosa")
      }


    };
    
    try {
      const izi = new window.Izipay({
        publicKey: iziConfig?.publicKey,
        config: iziConfig?.config,
      });

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
      <Button id="btnPayNow" className={styles.btn_login} disabled={!isReadyToPay} onClick={handleLoadForm}>
                    {loading ? (
                      <CircularProgress
                        size={25}
                        thickness={5}
                        sx={{ color: "#fff" }}
                      />
                    ) : (
                      isReadyToPay ?  "Reservar" : 'Cargando...'
                     
                    )}
                  </Button>
    {/*   <pre id="payment-message">{paymentMessage}</pre> */}

      <div id="your-iframe-payment"></div> {/* Contenedor donde se cargará el formulario de pago */}
    </div>
  );
};

export default FormIzipay;
