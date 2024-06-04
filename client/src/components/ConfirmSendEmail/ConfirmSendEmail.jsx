import React from 'react';
import { Button, Result } from 'antd';
import styles  from './ConfirmSendEmail.module.css';
const ConfirmSendEmail = () => (
  <Result
   className={styles.confirm_send_email}
    status="success"
    title="Correo enviado para restablecer la contraseña"
    subTitle="Hemos enviado un correo electrónico a la dirección proporcionada con instrucciones para restablecer tu contraseña. Por favor, revisa tu bandeja de entrada y sigue los pasos indicados en el correo. Si no encuentras el correo en tu bandeja de entrada, verifica tu carpeta de spam o correo no deseado."
    
/*     extra={[
      <Button type="primary" key="console">
        Go Console
      </Button>,
      <Button key="buy">Buy Again</Button>,
    ]} */
  />
);
export default ConfirmSendEmail;
