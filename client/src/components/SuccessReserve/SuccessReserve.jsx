import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
const SuccessReserve = () => (
  <Result
    status="success"
    title="Reservación exitosa"
    subTitle="Reservación realizada exitosamente."
    extra={[
      <Link to='/'>
      <Button  style={{backgroundColor: '#500075', borderColor: "#500075", color: "white"}} >
      Volver al inicio
      </Button>,
      </Link>
    ]}
  />
);
export default SuccessReserve;