import * as React from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import { RegisterUser } from "../../redux/action";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import Backdrop from "@mui/material/Backdrop";
import PropTypes from "prop-types";
import { useSpring, animated } from "@react-spring/web";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import FormModal from "./FormModal";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import axios from 'axios'
const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const autocompleteRef = useRef(null); // Referencia para el Autocomplete
  const [openForm, setOpenForm] = useState(false);
    const [scroll, setScroll] = React.useState("body")
  
     const [state, setState] = React.useState({
       open: false,
       vertical: 'top',
       horizontal: 'center',
     });
     const { vertical, horizontal, open } = state;
   
     const handleClick = (newState) => () => {
       setState({ ...newState, open: true });
     };
   

  const [data, setData] = useState({
    name: "",
    code: "",

    lastName: "",
    razon_social: "",
    ruc: "",
    contact_person: "",
    position: "",
    address: "",

    genre: "",
    date: "",
    country: "",

    departament: "",
    province: "",
    district: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });
  const [openAlert, setOpenAlert] = React.useState(false);

  const [loadingSuccess, setLoadingSuccess] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [messageApiError, contextHolderError] = message.useMessage();
  const [messageApiErrorCode, contextHolderErrorCode] = message.useMessage();
  const handleOpenForm = (scrollType) => () => {
    setOpenForm(true);
    setScroll(scrollType);
  };
  const handleCloseForm = () => {
    setOpenForm(false);
  };
  const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
      if (openForm) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [openForm]);
  const Success = () => {
    messageApi.open({
      type: "success",
      content: "Registrado correctamente",
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://en-una-production.up.railway.app/api/code/${data.code}`
        );
        setData((prevData) => ({
          ...prevData, // Mantén otros valores del estado
          name: res.data.name, // Actualiza el nombre recibido del backend
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (data.code) {
      fetchData();
    }
  }, [data.code]);
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSuccess(true);
    try {
      const registers = await dispatch(RegisterUser(data));

      console.log("Respuesta completa:", registers); // Verificar la estructura de 'registers'

      // Revisa si `registers` tiene el código HTTP directamente o en una subestructura
      if (registers) {
        Success();
        setTimeout(() => {
          navigate("/registro-completado");
        }, 2000);
      }
    } catch (error) {
      if (error.response.status === 400) {
        console.log("Error:", error.response.status);
        message.warning("Código inválido");
      }
      if (error.response.status === 404) {
        console.log("Error:", error.response.status);
        message.error("El email ya esta registrado");
      }
    } finally {
      setLoadingSuccess(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value, // Actualiza dinámicamente el campo correspondiente
    }));
  };
  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();

      if (place?.geometry) {
        const addressComponents = place.address_components;
        if (addressComponents) {
          // Extraer el país (country)
          const country = addressComponents.find((component) =>
            component.types.includes("country")
          );

          // Filtrar todos los departamentos/estados (administrative_area_level_1)
          const departments = addressComponents.filter((component) =>
            component.types.includes("administrative_area_level_1")
          );

          // Filtrar todas las provincias (administrative_area_level_1)
          const provinces = addressComponents.filter((component) =>
            component.types.includes("administrative_area_level_1")
          );

          // Filtrar todos los distritos (administrative_area_level_2)
          const districts = addressComponents.filter((component) =>
            component.types.includes("administrative_area_level_2")
          );

          // Filtrar todas las localidades/ciudades (locality)
          const localities = addressComponents.filter((component) =>
            component.types.includes("locality")
          );

          // Actualizar el estado con las listas de componentes
          setData({
            ...data,
            country: country ? country.long_name : "",
            departments: departments.map((dep) => dep.long_name), // Múltiples departamentos
            provinces: provinces.map((prov) => prov.long_name), // Múltiples provincias
            districts: districts.map((dist) => dist.long_name), // Múltiples distritos
            localities: localities.map((loc) => loc.long_name), // Múltiples localidades
            address: place.formatted_address, // Dirección completa
          });
        } else {
          console.error("No se pudo obtener los componentes de la dirección.");
        }
      } else {
        console.error("No se pudo obtener la información de geometría.");
      }
    }
  };

  return (
    <>
      <div className={styles.register_container}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Avatar alt="Remy Sharp" className={styles.logo} />
            <h2
              className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ${styles.textTitle}`}
            >
              Crear usuario
            </h2>

            <h2
              className={`mt-10 text-center  font-bold leading-9 tracking-tight text-gray-900 ${styles.textSubTitle}`}
            >
              Bienvenido a EnUna
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tipo de cuenta
                </label>
                <div className="mt-2">
                  <select
                    id="role"
                    name="role"
                    type="text"
                    onChange={handleChange}
                    autoComplete="name"
                    required
                    className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                  >
                    <option value="">Seleccione un tipo de cuenta</option>

                    <option value="personal">personal</option>
                    <option value="restaurante">restaurante</option>
                  </select>
                </div>
              </div>
              {data.role === "personal" || data.role === "" ? (
                <>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Nombre
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder="Escribe tu nombre"
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        onChange={handleChange}
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Apellidos
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder="Escribe tu apellido"
                        id="lastName"
                        name="lastName"
                        type="text"
                        onChange={handleChange}
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="genre"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Género
                    </label>
                    <div className="mt-2">
                      <select
                        id="genre"
                        name="genre"
                        type="text"
                        onChange={handleChange}
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                      >
                        <option value="">Seleccione tu genero</option>

                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Prefiero no contestar">
                          Prefiero no contestar
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Fecha de nacimiento
                    </label>
                    <div className="mt-2">
                      <input
                        id="date"
                        name="date"
                        type="date"
                        onChange={handleChange}
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Correo
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder="Correo electrónico"
                        id="email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        autoComplete="email"
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      País
                    </label>
                    <div className="mt-2">
                      <LoadScript
                        googleMapsApiKey="AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA" // Reemplaza con tu clave API
                        libraries={["places"]} // Necesario para usar Autocomplete
                      >
                        <Autocomplete
                          onLoad={(autocomplete) =>
                            (autocompleteRef.current = autocomplete)
                          }
                          onPlaceChanged={onPlaceChanged}
                        >
                          <input
                            placeholder="País"
                            id="country"
                            name="country"
                            autoComplete={false}
                            type="text"
                            onChange={handleChange}
                            required
                            className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                          />
                        </Autocomplete>
                      </LoadScript>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="departament"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Departamento
                    </label>

                    <div className="mt-2">
                      <LoadScript
                        googleMapsApiKey="AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA" // Reemplaza con tu clave API
                        libraries={["places"]} // Necesario para usar Autocomplete
                      >
                        <Autocomplete
                          onLoad={(autocomplete) =>
                            (autocompleteRef.current = autocomplete)
                          }
                          onPlaceChanged={onPlaceChanged}
                        >
                          <input
                            placeholder="Departamento"
                            id="departament"
                            autoComplete={false}
                            name="departament"
                            type="text"
                            value={data.departament}
                            onChange={handleChange}
                            required
                            className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                          />
                        </Autocomplete>
                      </LoadScript>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="province"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Provincia
                    </label>
                    <div className="mt-2">
                      <LoadScript
                        googleMapsApiKey="AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA" // Reemplaza con tu clave API
                        libraries={["places"]} // Necesario para usar Autocomplete
                      >
                        <Autocomplete
                          onLoad={(autocomplete) =>
                            (autocompleteRef.current = autocomplete)
                          }
                          onPlaceChanged={onPlaceChanged}
                        >
                          <input
                            placeholder="provincia"
                            id="province"
                            name="province"
                            type="text"
                            autoComplete={false}
                            onChange={handleChange}
                            required
                            className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                          />
                        </Autocomplete>
                      </LoadScript>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="district"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Distrito
                    </label>
                    <div className="mt-2">
                      <LoadScript
                        googleMapsApiKey="AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA" // Reemplaza con tu clave API
                        libraries={["places"]} // Necesario para usar Autocomplete
                      >
                        <Autocomplete
                          onLoad={(autocomplete) =>
                            (autocompleteRef.current = autocomplete)
                          }
                          onPlaceChanged={onPlaceChanged}
                        >
                          <input
                            placeholder="Distrito"
                            id="district"
                            name="district"
                            type="text"
                            autoComplete={false}
                            onChange={handleChange}
                            required
                            className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                          />
                        </Autocomplete>
                      </LoadScript>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Telefóno
                      </label>
                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                          {/* Forgot password? */}
                        </a>
                      </div>
                    </div>
                    <div className="mt-2">
                      <input
                        id="phone"
                        name="phone"
                        type="phone"
                        placeholder="Ingresa tu número de telefóno"
                        autoComplete="phone"
                        onChange={handleChange}
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Contraseña
                      </label>
                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                          {/* Forgot password? */}
                        </a>
                      </div>
                    </div>
                    <div className="mt-2 relative" >
                      <input
                        placeholder="**********"
                        id="password"
                        name="password"
                                               type={showPassword ? "text" : "password"}

                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                      />
                             <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"

                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeTwoTone style={{ color: "#500075" }} />
                  ) : (
                    <EyeInvisibleOutlined />
                  )}
                </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "1em",
                        marginTop: "1em",
                        fontSize: "13px",
                      }}
                    >
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        onChange={handleChange}
                        className={styles.input}
                        required
                      />
                      <label htmlFor="">
                        Aceptar terminos y condiciones{" "}
                        <Link
                          to="/términos-y-condiciones"
                          className={styles.term_register}
                        >
                          Terminos y condiciones
                        </Link>
                      </label>
                    </div>
                  </div>
                </>
              ) : null}

              {data.role === "restaurante" ? (
                <>
                  <div className={styles.codeInput}>
                    <div className="mt-2">
                      <label
                        htmlFor="razon_social"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Código asignado
                      </label>
                      <input
                        placeholder="Código asignado"
                        id="code"
                        name="code"
                        type="number"
                        value={data.code}
                        onChange={handleChange}
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                      />
                    </div>
                    <div className={styles.modalText}>
                      <h2 onClick={handleOpenForm("body")}>No tengo el código.</h2>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="razon_social"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Razón Social
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder="Escribe tu razón social"
                        id="razon_social"
                        name="razon_social"
                        type="text"
                        onChange={handleChange}
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Nombre comercial
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder="Escribe tu nombre comercial"
                        id="name"
                        name="name"
                        type="name"
                        value={data.name}
                        onChange={handleChange}
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="ruc"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        RUC
                      </label>
                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                          {/* Forgot password? */}
                        </a>
                      </div>
                    </div>
                    <div className="mt-2">
                      <input
                        id="ruc"
                        name="ruc"
                        type="ruc"
                        placeholder="Ingresa tu RUC"
                        autoComplete="ruc"
                        onChange={handleChange}
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                      />
                    </div>
                  </div>
                  {/*   <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Dirección
                  </label>
                  <div className="mt-2">
                    <input
                      placeholder="Correo electrónico"
                      id="address"
                      name="address"
                      type="emaaddressil"
                      onChange={handleChange}
                      autoComplete="address"
                      required
                      className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    />
                  </div>
                </div> */}

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Correo
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder="Correo electrónico"
                        id="email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        autoComplete="email"
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Telefóno
                      </label>
                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                          {/* Forgot password? */}
                        </a>
                      </div>
                    </div>
                    <div className="mt-2">
                      <input
                        id="phone"
                        name="phone"
                        type="phone"
                        placeholder="Ingresa tu número de telefóno"
                        autoComplete="phone"
                        onChange={handleChange}
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="contact_person"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Persona de contacto
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder="Persona de contacto"
                        id="contact_person"
                        name="contact_person"
                        type="text"
                        onChange={handleChange}
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="position"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Cargo
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder="Cargo"
                        id="position"
                        name="position"
                        type="text"
                        onChange={handleChange}
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      País
                    </label>
                    <div className="mt-2">
                      <LoadScript
                        googleMapsApiKey="AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA" // Reemplaza con tu clave API
                        libraries={["places"]} // Necesario para usar Autocomplete
                      >
                        <Autocomplete
                          onLoad={(autocomplete) =>
                            (autocompleteRef.current = autocomplete)
                          }
                          onPlaceChanged={onPlaceChanged}
                        >
                          <input
                            placeholder="País"
                            id="country"
                            name="country"
                            type="country"
                            onChange={handleChange}
                            autoComplete={false}
                            required
                            className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                          />
                        </Autocomplete>
                      </LoadScript>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="departament"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Departamento
                    </label>

                    <div className="mt-2">
                      <LoadScript
                        googleMapsApiKey="AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA" // Reemplaza con tu clave API
                        libraries={["places"]} // Necesario para usar Autocomplete
                      >
                        <Autocomplete
                          onLoad={(autocomplete) =>
                            (autocompleteRef.current = autocomplete)
                          }
                          onPlaceChanged={onPlaceChanged}
                        >
                          <input
                            placeholder="Departamento"
                            id="departament"
                            name="departament"
                            type="text"
                            autoComplete={false}
                            value={data.departament}
                            onChange={handleChange}
                            required
                            className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                          />
                        </Autocomplete>
                      </LoadScript>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="province"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Provincia
                    </label>
                    <div className="mt-2">
                      <LoadScript
                        googleMapsApiKey="AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA" // Reemplaza con tu clave API
                        libraries={["places"]} // Necesario para usar Autocomplete
                      >
                        <Autocomplete
                          onLoad={(autocomplete) =>
                            (autocompleteRef.current = autocomplete)
                          }
                          onPlaceChanged={onPlaceChanged}
                        >
                          <input
                            placeholder="Provincia"
                            id="province"
                            name="province"
                            type="province"
                            autoComplete={false}
                            onChange={handleChange}
                            required
                            className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                          />
                        </Autocomplete>
                      </LoadScript>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="district"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Distrito
                    </label>
                    <div className="mt-2">
                      <LoadScript
                        googleMapsApiKey="AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA" // Reemplaza con tu clave API
                        libraries={["places"]} // Necesario para usar Autocomplete
                      >
                        <Autocomplete
                          onLoad={(autocomplete) =>
                            (autocompleteRef.current = autocomplete)
                          }
                          onPlaceChanged={onPlaceChanged}
                        >
                          <input
                            placeholder="Distrito"
                            id="district"
                            name="district"
                            autoComplete={false}
                            type="text"
                            onChange={handleChange}
                            required
                            className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                          />
                        </Autocomplete>
                      </LoadScript>
                    </div>
                  </div>

                  <div>

                    
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Contraseña
                      </label>
                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                          {/* Forgot password? */}
                        </a>
                      </div>
                    </div>
                    <div className="mt-2">
                      <input
                        placeholder="**********"
                        id="password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                      />
                    </div>
                  </div>
                </>
              ) : null}
              <div>
                <button
                  type="submit"
                  className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${styles.btn_success}`}
                >
                  {loadingSuccess ? (
                    <CircularProgress
                      size={25}
                      thickness={5}
                      sx={{ color: "#fff" }}
                    />
                  ) : (
                    "Registrarse"
                  )}
                </button>
              </div>
              {contextHolder}
              {contextHolderError}
              {contextHolderErrorCode}
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Si tiene una cuenta, haga click{" "}
              <Link
                to="/iniciar-sesión"
                className={`font-semibold leading-6 text-indigo-600 hover:text-indigo-500 `}
              >
                aquí
              </Link>
            </p>
          </div>
        </div>
      </div>



      <Dialog
        open={openForm}
        onClose={handleCloseForm}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
               <FormModal setOpenForm={setOpenForm} setOpenAlert={setOpenAlert} />

          </DialogContentText>
        </DialogContent>
   
      </Dialog>
     
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Formulario completado exitosamente.
        </Alert>
      </Snackbar>
    </>
  );
}
