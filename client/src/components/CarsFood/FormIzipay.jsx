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
import SuccessReserve from '../SuccessReserve/SuccessReserve';


const FormIzipay = ({ handleReserve, loading, getTotal }) => {
  const [isReadyToPay, setIsReadyToPay] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState({});
  const [token, setToken] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const datapersonal = useSelector((state) => state.datapersonal);
  const tokenUser = useSelector((state) => state.token);  
  const userId = useSelector((state) => state.userId);
  const orderId = useSelector((state) => state.orderId);
    const [transaction, setTransaction] = React.useState({});

  const updateOrderData = () => {
    const { transactionId, orderNumber } = getDataOrderDynamic();
    setTransactionId(transactionId);
    setOrderNumber(orderNumber);
  };

  useEffect(() => {
    dispatch(dataPersonal(tokenUser));
  }, [dispatch, tokenUser]);

  useEffect(() => {
    updateOrderData(); // Obtén los datos de la orden al montar el componente
  }, []);

  useEffect(() => {
    if (transactionId && orderNumber) {
      initializePayment();
    }
  }, [transactionId, orderNumber]);

  const initializePayment = () => {
    console.log("Inicializando pago con TRANSACTION_ID:", transactionId);
    GetTokenSession(transactionId, {
      requestSource: 'ECOMMERCE',
      merchantCode: '4004353',
      orderNumber: orderNumber,
      publicKey: 'VErethUtraQuxas57wuMuquprADrAHAb',
      amount: getTotal(),
    }).then((authorization) => {
      console.log("Respuesta de GetTokenSession:", authorization);

      if (authorization?.response?.token) {
        setToken(authorization.response.token);
        setIsReadyToPay(true);

        console.log("Nuevo token generado:", authorization.response.token);
      } else {
        console.error("No se recibió un token válido:", authorization);
      }
    }).catch(error => {
      console.error("Error al obtener el token de sesión:", error);
    });
  };

  const handleLoadForm = async () => {
    handleReserve();

    if (!token) {
      console.error("Token no disponible, esperando...");
      return;
    }

    const currentTimeUnix = Math.floor(Date.now() / 1000);

    try {
      const iziConfig = {
        publicKey: 'VErethUtraQuxas57wuMuquprADrAHAb',
        config: {
          transactionId: transactionId,
          action: 'pay',
          merchantCode: '4004353',
          order: {
            orderNumber: orderNumber,
            currency: 'PEN',
            amount: getTotal(),
            processType: 'AT',
            merchantBuyerId: 'mc1768',
            dateTimeTransaction: currentTimeUnix,
          },
          card: {
            brand: '',
            pan: '',
          },
          billing: {
            firstName: datapersonal?.name,
            lastName: datapersonal?.lastName,
            email: datapersonal?.email,
            phoneNumber: '989339999',
            street: 'Lima Perú',
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
          urlRedirect: 'https://server.punto-web.com/comercio/creceivedemo.asp?p=h1',
          appearance: {
            logo: 'https://demo-izipay.azureedge.net/test/img/millasb.svg',
          },
        },
      };
      const callbackResponsePayment = (response) => {
        console.log(response)
        setTransaction(response)

        localStorage.setItem('paymentResponse', JSON.stringify(response)); // ✅ Convertir a JSON

          if ( response && response.code === '00') {
            axios.post('https://en-una-production.up.railway.app/api/order-success', {
              name: datapersonal.name,
              lastName: datapersonal.lastName,
              email: datapersonal.email,
              phone: datapersonal.lastName,
              observation: "asdasdwadasdasdasdasd",
              orderId: orderId.data,
              userId: userId,
              ticketIzipay: response
            }).then((data) => {
              console.log('Respuesta del backend:', data);
            }).catch((error) => {
              console.error('Error al consultar el pago en el backend:', error);
            });
            navigate("/reserva-exitosa");
          }
  
      };

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
      <Button
        id="btnPayNow"
        className={styles.btn_login}
        disabled={!isReadyToPay}
        onClick={() => {
          updateOrderData(); // Actualiza los datos de la orden al hacer clic
          handleLoadForm();
        }}
      >
        {loading ? (
          <CircularProgress
            size={25}
            thickness={5}
            sx={{ color: "#fff" }}
          />
        ) : (
          isReadyToPay ? "Reservar" : 'Cargando...'
        )}
      </Button>

      <div id="your-iframe-payment"></div> {/* Contenedor donde se cargará el formulario de pago */}
    </div>
  );
};

export default FormIzipay;
