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
    <div className={styles.container_reset}>
      <div className={styles.title_resetaccount}>
        <h1>Introduce tu correo electrónico </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <ThemeProvider theme={theme}>
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
            />
          </ThemeProvider>
        </div>

        {error && (
          <Typography color="error">
            {" "}
            {error === "Request failed with status code 404"
              ? "Usuario no encontrado"
              : "error en el sistema"}
          </Typography>
        )}

        <div className={styles.btnContainer}>
          <Link to="/iniciar-sesión">
            <Button
              size="small"
              variant="contained"
              sx={{ background: "gray", ":hover": { background: "gray" } }}
            
        
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
          >
            {loading ? (
              <CircularProgress
                size={25}
                thickness={5}
                sx={{ color: "#fff" }}
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
