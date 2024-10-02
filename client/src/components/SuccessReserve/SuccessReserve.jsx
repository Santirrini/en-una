import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const SuccessReserve = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center', // Centra horizontalmente
    alignItems: 'center', // Centra verticalmente
    height: '100vh' // Ocupa toda la pantalla para centrar el contenido
  }}>
    <Result
      status="success"
      title={<span style={{ fontSize: '2rem' }}>Reservación exitosa</span>} // Ajusta el tamaño del texto
      subTitle={<span style={{ fontSize: '1.5rem' }}>Reservación realizada exitosamente.</span>} // Ajusta el subtítulo
      extra={[
        <Link to='/'>
          <Button style={{ backgroundColor: '#500075', borderColor: "#500075", color: "white",   }}>
            Volver al inicio
          </Button>
        </Link>
      ]}
    />
  </div>
);

export default SuccessReserve;
