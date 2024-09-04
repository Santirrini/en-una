import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataPersonal, UpdatePersonal } from "../../redux/action";
import { Button } from "@mui/material";
import { Result } from "antd";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "./Perfil.module.css";
import CircularProgress from "@mui/material/CircularProgress";

const theme = createTheme({
  palette: {
    primary: {
      main: "#500075", // Color primario que usarás
    },
  },
});

export default function Perfil() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const datapersonal = useSelector((state) => state.datapersonal);
  const token = useSelector((state) => state.token);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    userId: "",
    name: "",
    lastName: "",
    genre: "",
    date: "",
    phone: "",
    email: "",
  });
  useEffect(() => {
    dispatch(dataPersonal(token));
  }, [token, dispatch]);

  const handleDisabled = () => {
    setDisabled(true);
  };

  useEffect(() => {
    setData({
      ...data,

      userId: datapersonal.id || "",
      name: datapersonal.name || "",
      lastName: datapersonal.lastName || "",
      genre: datapersonal.genre || "",
      date: datapersonal.date || "",
      phone: datapersonal.phone || "",
      email: datapersonal.email || "",
    });
  }, [datapersonal]);
  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      dispatch(UpdatePersonal(data));
    } catch (error) {
      console.error("Error al actualizar mis datos:", error);
      
    } finally {
      setLoading(false);
      navigate('/')

    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className={styles.perfil_container}>
      {!token ? (
        <div>
          <Result
            status="403"
            title="403"
            subTitle="Lo siento, necesitas iniciar sesión para ver esta página."
            extra={
              <Link to="/iniciar-sesión">
                <Button
                  sx={{
                    background: "#500075",
                    ":hover": { background: "#500075" },
                  }}
                  variant="contained"
                >
                  Iniciar sesión
                </Button>
              </Link>
            }
          />
        </div>
      ) : (
        <form action="" onSubmit={handleUpdate}>
          <div className={styles.input_container}>
            <div className={styles.title_perfil}>
              <h1>Información personal</h1>
            </div>
            <ThemeProvider theme={theme}>
              <TextField
                disabled={!disabled}
                id="outlined-basic"
                label="Nombres"
                variant="outlined"
                className={styles.input}
                name="name"
                value={data.name}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: { style: { color: "#500075" } }, // Cambia el color del texto aquí
                }}
              />
              <TextField
                disabled={!disabled}
                id="outlined-basic"
                label="Apellidos"
                variant="outlined"
                sx={{ width: "100%" }}
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: { style: { color: "#500075" } }, // Cambia el color del texto aquí
                }}
              />
              <TextField
                disabled={!disabled}
                id="outlined-basic"
                label="Género"
                variant="outlined"
                className={styles.input}
                name="genre"
                value={data.genre}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: { style: { color: "#500075" } }, // Cambia el color del texto aquí
                }}
              />
              <TextField
                disabled={!disabled}
                type="date"
                id="outlined-basic"
                label="DD/MM/AA"
                variant="outlined"
                className={styles.input}
                name="date"
                value={data.date}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: { style: { color: "#500075" } }, // Cambia el color del texto aquí
                }}
              />
              <TextField
                disabled={!disabled}
                id="outlined-basic"
                label="Teléfono"
                variant="outlined"
                className={styles.input}
                name="phone"
                value={data.phone}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: { style: { color: "#500075" } }, // Cambia el color del texto aquí
                }}
              />
              <TextField
                disabled={!disabled}
                id="outlined-basic"
                label="Correo"
                variant="outlined"
                className={styles.input}
                name="email"
                value={data.email}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: { style: { color: "#500075" } }, // Cambia el color del texto aquí
                }}
              />
            </ThemeProvider>

            <div className={styles.btn_container}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#500075",
                  margin: "auto",
                  border: "none",
                  ":hover": {
                    backgroundColor: "#500075",
                  },
                }}
                onClick={handleDisabled}
              >
                Editar información
              </Button>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#500075",
                  margin: "auto",
                  border: "none",
                  ":hover": {
                    backgroundColor: "#500075",
                  },
                }}
                disabled={!disabled}
              >

{loading ? (
                  <CircularProgress
                    size={25}
                    thickness={5}
                    sx={{ color: "#fff" }}
                  />
                ) : (
                  "Guardar y salir"
                )}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
