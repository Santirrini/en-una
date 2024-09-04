import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ResetPassword } from "../../redux/action";
import styles from "./UpdatePassword.module.css";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const message = useSelector((state) => state.message);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Activa el indicador de carga

    setTimeout(async () => {
      try {
        if (newPassword === confirmPassword) {
          dispatch(ResetPassword(token, newPassword));
          navigate("/contraseña-actualizada");
        } else {
          setError("Las contraseñas no coinciden");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Desactiva el indicador de carga al finalizar
      }
    }, 3000);
  };

  return (
    <div className={styles.update_container}>
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
          Restablecer Contraseña
        </h2>
        <form
          className="mt-4 text-lg leading-8 text-gray-600"
          onSubmit={handleSubmit}
        >
          <label>
            Nueva Contraseña:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.input}
              required
            />
          </label>
          <label>
            Confirmar Nueva Contraseña:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
              required
            />
          </label>
          {error && <p>{error}</p>}

          <br />
          <br />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1em",
            }}
          >
            <Button
              type="submit"
              sx={{
                background: "#500075",
                color: "#ffff",
                ":hover": { background: "#500075" },
              }}
            >
              {loading ? (
                <CircularProgress
                  size={25}
                  thickness={5}
                  sx={{ color: "#fff" }}
                />
              ) : (
                "Restablecer Contraseña"
              )}
            </Button>
            <Link to="/iniciar-sesión">
              <Button
                type="submit"
                sx={{
                  background: "gray",
                  color: "#ffff",
                  ":hover": { background: "gray" },
                }}
              >
                Cancelar
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
