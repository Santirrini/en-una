import React, { useEffect, useState } from 'react';
import { Card, Typography, Descriptions, Button } from 'antd';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const SuccessReserve = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userId);
 const [ transaction, setTransaction ] = useState()
  const handleRemoveAll = () => {
    localStorage.removeItem(`cart_${userId}`);
    localStorage.removeItem(`form_${userId}`);
    localStorage.removeItem('orderId');
    navigate("/");
  };

  console.log(transaction)
  useEffect(() => {
    const storedResponse = localStorage.getItem('paymentResponse');
const paymentResponse = storedResponse ? JSON.parse(storedResponse) : null;
    setTransaction(paymentResponse)
  }, [])
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      flexWrap: 'wrap' // Se adapta en pantallas pequeñas
    }}>
      <Card style={{ 
        width: '100%', 
        maxWidth: '600px', // Evita que sea más ancho en móviles
        padding: '20px', 
        borderRadius: '10px',
        margin: '10px' // Añade espacio en los lados en móviles
      }}>
        {/* Logo de Izipay */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src={require("../../Images/Logo.png")} alt="EnUna Logo" style={{width: "150px", maxWidth: '100%', height: 'auto', margin: "auto" }} />
        </div>

        {/* Título y descripción */}
        <Title level={3} style={{ textAlign: 'center', color: '#500075' }}>
          Reserva exitosa
        </Title>
        <Text style={{ display: 'block', textAlign: 'center', marginBottom: '20px' }}>
          Completaste con éxito el proceso de reserva por <b>{transaction?.response?.order[0]?.amount} /S</b> {/* al comercio <b>{transaction?.merchant || "PRUEBAS 3DS"}</b> */}.
        </Text>

        {/* Detalles de pago */}
        <Descriptions title="Detalles del pago" bordered column={1}>
          <Descriptions.Item label="Número de pedido">{transaction?.transactionId }</Descriptions.Item>
          <Descriptions.Item label="Código de autorización">{transaction?.response?.order[0]?.codeAuth}</Descriptions.Item>
          <Descriptions.Item label="Método de pago">{transaction?.response?.payMethod === 'CARD' ? 'Tarjeta' : transaction?.response?.payMethod }</Descriptions.Item>
          <Descriptions.Item label="Marca">{transaction?.response?.card?.brand === 'VS' ? "VISA" : transaction?.response?.card?.brand }</Descriptions.Item>
          <Descriptions.Item label="Número de tarjeta">{transaction?.response?.card?.pan}</Descriptions.Item>
        </Descriptions>

        {/* Botón para regresar */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button 
            onClick={handleRemoveAll} 
            style={{ 
              backgroundColor: '#500075', 
              borderColor: "#500075", 
              color: "white", 
              width: '100%',
              maxWidth: '300px' // Limita el tamaño en pantallas grandes
            }}
          >
            Volver al inicio
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SuccessReserve;
