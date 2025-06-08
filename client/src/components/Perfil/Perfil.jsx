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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
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
  console.log(datapersonal);
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
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className={styles.perfil_container} data-oid=":xc1z6_">
      {!token ? (
        <div data-oid="l-_mguv">
          <Result
            status="403"
            title="403"
            subTitle="Lo siento, necesitas iniciar sesión para ver esta página."
            extra={
              <Link to="/iniciar-sesión" data-oid="ql7pdt4">
                <Button
                  sx={{
                    background: "#500075",
                    ":hover": { background: "#500075" },
                  }}
                  variant="contained"
                  data-oid="9q5z-x5"
                >
                  Iniciar sesión
                </Button>
              </Link>
            }
            data-oid="ho6cfkn"
          />
        </div>
      ) : (
        <form action="" onSubmit={handleUpdate} data-oid="984jr8z">
          {datapersonal.role === "personal" ? (
            <div className={styles.input_container} data-oid="q.d.gjw">
              <div className={styles.title_perfil} data-oid="9swacn9">
                <h1 data-oid="yji92ux">Información personal</h1>
              </div>
              <ThemeProvider theme={theme} data-oid="q91vj-o">
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
                  data-oid="hc7ilgq"
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
                  data-oid="ra9.5e9"
                />

                <Box sx={{ minWidth: 120 }} data-oid="0ccxyix">
                  <FormControl fullWidth data-oid="dzdy4-h">
                    <InputLabel
                      id="demo-simple-select-label"
                      data-oid="rgae4_t"
                    >
                      Género
                    </InputLabel>
                    <Select
                      disabled={!disabled}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={data.genre}
                      name="genre"
                      label="Genéro"
                      onChange={handleChange}
                      data-oid="9_vo0a0"
                    >
                      <MenuItem value="Masculino" data-oid="mpy:vzg">
                        Masculino
                      </MenuItem>
                      <MenuItem value="Femenino" data-oid="2.nprk7">
                        Femenino
                      </MenuItem>
                      <MenuItem
                        value="Prefiero no contestar"
                        data-oid="d.dijew"
                      >
                        Prefiero no contestar
                      </MenuItem>
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
                  data-oid="p74v8p:"
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
                  data-oid="a-wevfl"
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
                  data-oid="d2kq:fo"
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
                  data-oid="jpsczj2"
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
                  data-oid="v3b_w7q"
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
                  data-oid="veb-qb2"
                />

                <div className={styles.updatePassword} data-oid="p.u_quf">
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
                    data-oid="42b48kl"
                  />

                  <UpdatePassword
                    datapersonal={datapersonal}
                    disabled={disabled}
                    data-oid="rhu9.n2"
                  />
                </div>
              </ThemeProvider>
            </div>
          ) : (
            <div className={styles.input_container} data-oid="jy9bmpv">
              <div className={styles.title_perfil} data-oid="e0yjwq-">
                <h1 data-oid="tevp81-">Información comercial</h1>
              </div>
              <ThemeProvider theme={theme} data-oid="8k0uq7g">
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
                  data-oid="gk3twtu"
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
                  data-oid="lln-qtm"
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
                  data-oid="cpzsnnz"
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
                  data-oid="1ao3zib"
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
                  data-oid="2puhoty"
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
                  data-oid=":qwgp7l"
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
                  data-oid="f6_rwb0"
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
                  data-oid="65:6ai4"
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
                  data-oid="bke8puy"
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
                  data-oid="csluxjq"
                />

                <div className={styles.updatePassword} data-oid="9ptvo_u">
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
                    data-oid="hmwty-s"
                  />

                  <UpdatePassword
                    datapersonal={datapersonal}
                    disabled={disabled}
                    data-oid="eu_wbr9"
                  />
                </div>
              </ThemeProvider>
            </div>
          )}
          <div className={styles.btn_container} data-oid="7loqk7n">
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
              data-oid="7i842ai"
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
              data-oid="dcjd-m3"
            >
              {loading ? (
                <CircularProgress
                  size={25}
                  thickness={5}
                  sx={{ color: "#fff" }}
                  data-oid="ot6p487"
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
