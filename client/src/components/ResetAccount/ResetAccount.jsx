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

const ResetAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const emailSent = useSelector(state => state.emailSent);
  const error = useSelector(state => state.error);
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
      navigate("/email-enviado")
    }
  }, [emailSent]);

  return (
    <Card sx={{ maxWidth: "90%", width: 500, margin: "auto", padding: "1em" }}>
      <Typography gutterBottom variant="h5" component="div">
        Recupera tu cuenta
      </Typography>
      <hr />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ paddingBottom: "1em" }}
        >
          Introduce tu correo electrónico para buscar tu cuenta.
        </Typography>

        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Correo electrónico"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>



        {error && <Typography color="error"> {error === "Request failed with status code 404" ? "Usuario no encontrado" : "error en el sistema" }</Typography>}
        <hr />
         
          <CardActions>
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
          </CardActions>
        </form>

      </CardContent>
    </Card>
  );
};

export default ResetAccount;
