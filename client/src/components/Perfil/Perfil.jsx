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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import UpdatePassword from "./UpdatePassword";

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
  console.log(datapersonal)
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
    email_additional: "",

    razon_social: "",
    ruc: "",
    contact_person: "",
    position: "",
    address: "",
    country: "",
    province: "",
    district: "",
    password: "",


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
      email_additional: datapersonal.email_additional || "",
      razon_social: datapersonal.razon_social || "",
      ruc: datapersonal.ruc || "",
      contact_person: datapersonal.contact_person || "",
      position: datapersonal.position || "",
      address: datapersonal.address || "",
      country: datapersonal.country || "",
      province: datapersonal.province || "",
      district: datapersonal.district || "",
      password: datapersonal.password || "",

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
          {datapersonal.role === "personal" ? (

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
         


<Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Género</InputLabel>
        <Select
                disabled={!disabled}

          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={data.genre}
         name="genre"
          label="Genéro"
          onChange={handleChange}
        >
       <MenuItem value="Masculino">Masculino</MenuItem>
  <MenuItem value="Femenino">Femenino</MenuItem>
  <MenuItem value="Prefiero no contestar">Prefiero no contestar</MenuItem>
        </Select>
      </FormControl>
    </Box>
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

<TextField
                disabled={!disabled}
                id="outlined-basic"
                label="País"
                variant="outlined"
                className={styles.input}
                name="country"
                value={data.country}
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
                label="Provincia"
                variant="outlined"
                className={styles.input}
                name="province"
                value={data.province}
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
                label="Distrito"
                variant="outlined"
                className={styles.input}
                name="district"
                value={data.district}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: { style: { color: "#500075" } }, // Cambia el color del texto aquí
                }}
              />
   <div className={styles.updatePassword}>

<TextField
               disabled={!disabled}
               id="outlined-basic"
               label="Contraseña"
               variant="outlined"
               sx={{ width: "100%" }}
               name="password"
               value={"*****************"}

               onChange={handleChange}
               InputLabelProps={{
                 shrink: true,
               }}
               InputProps={{
                 inputProps: { style: { color: "#500075" } }, // Cambia el color del texto aquí
               }}
               />

                
                <UpdatePassword datapersonal={datapersonal} disabled={disabled} />
               </div>

            </ThemeProvider>

       
          </div>
          ): (
            <div className={styles.input_container}>
            <div className={styles.title_perfil}>
              <h1>Información comercial</h1>
            </div>
            <ThemeProvider theme={theme}>
              <TextField
                disabled={!disabled}
                id="outlined-basic"
                label="Nombre comercial"
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
                label="Razón social"
                variant="outlined"
                sx={{ width: "100%" }}
                name="razon_social"
                value={data.razon_social}
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
                label="RUC"
                variant="outlined"
                sx={{ width: "100%" }}
                name="ruc"
                value={data.ruc}
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
                label="Correo adicional"
                variant="outlined"
                sx={{ width: "100%" }}
                name="email_additional"
                value={data.email_additional}
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
                label="Telefóno"
                variant="outlined"
                sx={{ width: "100%" }}
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
                label="Persona de contacto"
                variant="outlined"
                sx={{ width: "100%" }}
                name="contact_person"
                value={data.contact_person}
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
                label="Cargo"
                variant="outlined"
                sx={{ width: "100%" }}
                name="position"
                value={data.position}
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
                label="País"
                variant="outlined"
                sx={{ width: "100%" }}
                name="country"
                value={data.country}
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
                label="Provincia"
                variant="outlined"
                sx={{ width: "100%" }}
                name="province"
                value={data.province}
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
                label="Distrito"
                variant="outlined"
                sx={{ width: "100%" }}
                name="district"
                value={data.district}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: { style: { color: "#500075" } }, // Cambia el color del texto aquí
                }}
              />
              <div className={styles.updatePassword}>

 <TextField
                disabled={!disabled}
                id="outlined-basic"
                label="Contraseña"
                variant="outlined"
                sx={{ width: "100%" }}
                name="password"
                value={data.password}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: { style: { color: "#500075" } }, // Cambia el color del texto aquí
                }}
                />

              <UpdatePassword datapersonal={datapersonal} disabled={disabled}/>
                </div>

            </ThemeProvider>

       
          </div>
          )}
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
        </form>
      )}
    </div>
  );
}
