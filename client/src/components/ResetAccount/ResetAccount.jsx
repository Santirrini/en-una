import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import { SendEmailPassword } from "../../redux/action";
import styles from "./ResetAccount.module.css";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#500075", // Color primario que usarás
    },
  },
});
const ResetAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const emailSent = useSelector((state) => state.emailSent);
  const error = useSelector((state) => state.error);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      try {
        await dispatch(SendEmailPassword(email));
      } catch (error) {
        console.error("Error al enviar el correo:", error);
      } finally {
        setLoading(false);
      }
    }, 3000);
  };
  React.useEffect(() => {
    if (emailSent) {
      navigate("/email-enviado");
    }
  }, [emailSent]);

  return (
    <div className={styles.container_reset} data-oid="r_a:uyo">
      <div className={styles.title_resetaccount} data-oid="gxjv09e">
        <h1 data-oid=":5s7_ts">Introduce tu correo electrónico </h1>
      </div>

      <form onSubmit={handleSubmit} data-oid="-9azf_g">
        <div data-oid="j37e_9h">
          <ThemeProvider theme={theme} data-oid="m36i036">
            <TextField
              type="email"
              className={styles.input}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: { style: { color: "#500075" } }, // Cambia el color del texto aquí
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-oid="9_f7nxc"
            />
          </ThemeProvider>
        </div>

        {error && (
          <Typography color="error" data-oid="-_.wfj6">
            {" "}
            {error === "Request failed with status code 404"
              ? "Usuario no encontrado"
              : "error en el sistema"}
          </Typography>
        )}

        <div className={styles.btnContainer} data-oid="tsstg9t">
          <Link to="/iniciar-sesión" data-oid="70jfdvu">
            <Button
              size="small"
              variant="contained"
              sx={{ background: "gray", ":hover": { background: "gray" } }}
              data-oid="22zz_gp"
            >
              Cancelar
            </Button>
          </Link>
          <Button
            size="small"
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{
              backgroundColor: "#500075",
              border: "none",
              ":hover": {
                backgroundColor: "#500075",
              },
            }}
            data-oid="f7q:jz0"
          >
            {loading ? (
              <CircularProgress
                size={25}
                thickness={5}
                sx={{ color: "#fff" }}
                data-oid="by32tnz"
              />
            ) : (
              "Enviar"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetAccount;
