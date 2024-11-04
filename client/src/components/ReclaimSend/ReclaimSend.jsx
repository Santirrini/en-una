import React from "react";
import { Button, Result } from "antd";
import styles from "./ReclaimSend.module.css";
import { Link } from "react-router-dom";
const ReclaimSend = () => (
  <div className={styles.confirm_send_email}>
    <Result
      status="success"
      title="Reclamo enviado correctamente"
      subTitle="El reclamo se envio correctamente espere a ser contactado por algunos de nuestros supervisores."

          extra={[<Link to="/">
    <Button type="primary" key="console" className={styles.btn} >
    Volver al inicio
    </Button>,
          </Link>
    ]} 
    />
  </div>
);
export default ReclaimSend;
