import React from "react";
import { Result } from "antd";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./ConfirmUpdatePassword.module.css";

const ConfirmUpdatePassword = () => (
  <Result
    className={styles.confirm_send_email}
    status="success"
    title="Contraseña actualizada exitosamente"
    subTitle="Tu contraseña ha sido actualizada correctamente. Ahora puedes iniciar sesión con tu nueva contraseña."
    extra={[
      <Link to="/iniciar-sesión" data-oid="v2v3lan">
        <Button
          variant="contained"
          key="login"
          sx={{ background: "#500075", ":hover": { background: "#500075" } }}
          data-oid="ragc3v8"
        >
          Iniciar sesión
        </Button>
        ,
      </Link>,
    ]}
    data-oid="gx6to8e"
  />
);

export default ConfirmUpdatePassword;
