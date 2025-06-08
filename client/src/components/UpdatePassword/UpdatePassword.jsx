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
    <div className={styles.update_container} data-oid="pel-yyr">
      <div className="mx-auto max-w-2xl" data-oid="3adizfp">
        <h2
          className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center"
          data-oid="78zh81e"
        >
          Restablecer Contraseña
        </h2>
        <form
          className="mt-4 text-lg leading-8 text-gray-600"
          onSubmit={handleSubmit}
          data-oid="-u5p8lv"
        >
          <label data-oid="0tcaihe">
            Nueva Contraseña:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.input}
              required
              data-oid="0_eksf9"
            />
          </label>
          <label data-oid="5t.cx5v">
            Confirmar Nueva Contraseña:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
              required
              data-oid="yr:v0-h"
            />
          </label>
          {error && <p data-oid="4xp:6k5">{error}</p>}

          <br data-oid="_qbcfg8" />
          <br data-oid="jzuep_0" />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1em",
            }}
            data-oid="7b8gi0d"
          >
            <Button
              type="submit"
              sx={{
                background: "#500075",
                color: "#ffff",
                ":hover": { background: "#500075" },
              }}
              data-oid="8wu53p9"
            >
              {loading ? (
                <CircularProgress
                  size={25}
                  thickness={5}
                  sx={{ color: "#fff" }}
                  data-oid="y-fo8uz"
                />
              ) : (
                "Restablecer Contraseña"
              )}
            </Button>
            <Link to="/iniciar-sesión" data-oid="p78hjai">
              <Button
                type="submit"
                sx={{
                  background: "gray",
                  color: "#ffff",
                  ":hover": { background: "gray" },
                }}
                data-oid="y7bs3pc"
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
