import React from "react";
import { Button, Result } from "antd";
import styles from "./ReclaimSend.module.css";
import { Link } from "react-router-dom";
const ReclaimSend = () => (
  <div className={styles.confirm_send_email} data-oid="2qe8k5c">
    <Result
      status="success"
      title="Reclamo enviado correctamente"
      subTitle="El reclamo se envio correctamente espere a ser contactado por algunos de nuestros supervisores."
      extra={[
        <Link to="/" data-oid="6a:hs_i">
          <Button
            type="primary"
            key="console"
            className={styles.btn}
            data-oid="jm0cjao"
          >
            Volver al inicio
          </Button>
          ,
        </Link>,
      ]}
      data-oid="d59gg_b"
    />
  </div>
);

export default ReclaimSend;
