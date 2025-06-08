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
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import axios from "axios";
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
    <animated.div ref={ref} style={style} {...other} data-oid="b9yh_ci">
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
  const [scroll, setScroll] = React.useState("body");

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const [data, setData] = useState({
    avatar: "",
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

  console.log(data);
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
          `https://en-una-production.up.railway.app/api/code/${data.code}`,
        );
        setData((prevData) => ({
          ...prevData, // Mantén otros valores del estado
          name: res.data.data?.name, // Actualiza el nombre recibido del backend
          avatar: res.data.data?.Restaurant.logo,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
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
            component.types.includes("country"),
          );

          // Filtrar todos los departamentos/estados (administrative_area_level_1)
          const departments = addressComponents.filter((component) =>
            component.types.includes("administrative_area_level_1"),
          );

          // Filtrar todas las provincias (administrative_area_level_1)
          const provinces = addressComponents.filter((component) =>
            component.types.includes("administrative_area_level_1"),
          );

          // Filtrar todos los distritos (administrative_area_level_2)
          const districts = addressComponents.filter((component) =>
            component.types.includes("administrative_area_level_2"),
          );

          // Filtrar todas las localidades/ciudades (locality)
          const localities = addressComponents.filter((component) =>
            component.types.includes("locality"),
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
      <div className={styles.register_container} data-oid="9sszve4">
        <div
          className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
          data-oid="j21o48a"
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-sm" data-oid="7_f-kvn">
            <Avatar
              src={data.avatar || undefined}
              alt="Remy Sharp"
              className={styles.logo}
              data-oid="bp.h1g0"
            />

            <h2
              className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ${styles.textTitle}`}
              data-oid="nmrskts"
            >
              Crear usuario
            </h2>

            <h2
              className={`mt-10 text-center  font-bold leading-9 tracking-tight text-gray-900 ${styles.textSubTitle}`}
              data-oid="rx4:8al"
            >
              Bienvenido a EnUna
            </h2>
          </div>

          <div
            className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
            data-oid="rwu8v7u"
          >
            <form
              className="space-y-6"
              onSubmit={handleSubmit}
              data-oid="qwabr3y"
            >
              <div data-oid="umvlg20">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium leading-6 text-gray-900"
                  data-oid="0cn2le4"
                >
                  Tipo de cuenta
                </label>
                <div className="mt-2" data-oid="l_lpkr3">
                  <select
                    id="role"
                    name="role"
                    type="text"
                    onChange={handleChange}
                    autoComplete="name"
                    required
                    className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                    data-oid="87:tojp"
                  >
                    <option value="" data-oid="fh--bat">
                      Seleccione un tipo de cuenta
                    </option>

                    <option value="personal" data-oid="w358erp">
                      personal
                    </option>
                    <option value="restaurante" data-oid="8c7ygq:">
                      restaurante
                    </option>
                  </select>
                </div>
              </div>
              {data.role === "personal" || data.role === "" ? (
                <>
                  <div data-oid="w1q:611">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                      data-oid="0tl_qrl"
                    >
                      Nombre
                    </label>
                    <div className="mt-2" data-oid="xmca741">
                      <input
                        placeholder="Escribe tu nombre"
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        onChange={handleChange}
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                        data-oid="a3oekcj"
                      />
                    </div>
                  </div>

                  <div data-oid="jnrs_4e">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                      data-oid="-_d1u98"
                    >
                      Apellidos
                    </label>
                    <div className="mt-2" data-oid="zmnexs:">
                      <input
                        placeholder="Escribe tu apellido"
                        id="lastName"
                        name="lastName"
                        type="text"
                        onChange={handleChange}
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                        data-oid="01qe24l"
                      />
                    </div>
                  </div>

                  <div data-oid="wcceznz">
                    <label
                      htmlFor="genre"
                      className="block text-sm font-medium leading-6 text-gray-900"
                      data-oid="8fqlk1l"
                    >
                      Género
                    </label>
                    <div className="mt-2" data-oid="4iq:x-y">
                      <select
                        id="genre"
                        name="genre"
                        type="text"
                        onChange={handleChange}
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                        data-oid="volr2p5"
                      >
                        <option value="" data-oid="36a9lua">
                          Seleccione tu genero
                        </option>

                        <option value="Masculino" data-oid="--qfc9u">
                          Masculino
                        </option>
                        <option value="Femenino" data-oid="xm_qs:f">
                          Femenino
                        </option>
                        <option
                          value="Prefiero no contestar"
                          data-oid="sqdx2tt"
                        >
                          Prefiero no contestar
                        </option>
                      </select>
                    </div>
                  </div>

                  <div data-oid="hk8-tzf">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium leading-6 text-gray-900"
                      data-oid="o48ynd1"
                    >
                      Fecha de nacimiento
                    </label>
                    <div className="mt-2" data-oid="ohx558m">
                      <input
                        id="date"
                        name="date"
                        type="date"
                        onChange={handleChange}
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                        data-oid="l_v63ht"
                      />
                    </div>
                  </div>
                  <div data-oid="ldoiu-j">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                      data-oid="v.1cvme"
                    >
                      Correo
                    </label>
                    <div className="mt-2" data-oid="3qh9o-9">
                      <input
                        placeholder="Correo electrónico"
                        id="email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        autoComplete="email"
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                        data-oid="58ul04f"
                      />
                    </div>
                  </div>
                  <div data-oid="l0rv:f_">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                      data-oid="rdrjys_"
                    >
                      País
                    </label>
                    <div className="mt-2" data-oid=".oeyct_">
                      <LoadScript
                        googleMapsApiKey="AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA" // Reemplaza con tu clave API
                        libraries={["places"]} // Necesario para usar Autocomplete
                        data-oid="-bl_r2c"
                      >
                        <Autocomplete
                          onLoad={(autocomplete) =>
                            (autocompleteRef.current = autocomplete)
                          }
                          onPlaceChanged={onPlaceChanged}
                          data-oid="58pjzlr"
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
                            data-oid="8y9ynz_"
                          />
                        </Autocomplete>
                      </LoadScript>
                    </div>
                  </div>
                  <div data-oid="kmw6w_5">
                    <label
                      htmlFor="departament"
                      className="block text-sm font-medium leading-6 text-gray-900"
                      data-oid="d28sm0u"
                    >
                      Departamento
                    </label>

                    <div className="mt-2" data-oid="jdvnlii">
                      <LoadScript
                        googleMapsApiKey="AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA" // Reemplaza con tu clave API
                        libraries={["places"]} // Necesario para usar Autocomplete
                        data-oid="-xd8tnd"
                      >
                        <Autocomplete
                          onLoad={(autocomplete) =>
                            (autocompleteRef.current = autocomplete)
                          }
                          onPlaceChanged={onPlaceChanged}
                          data-oid="9a2xulh"
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
                            data-oid="f6wju9y"
                          />
                        </Autocomplete>
                      </LoadScript>
                    </div>
                  </div>
                  <div data-oid="9ogyhuw">
                    <label
                      htmlFor="province"
                      className="block text-sm font-medium leading-6 text-gray-900"
                      data-oid="zag7:6c"
                    >
                      Provincia
                    </label>
                    <div className="mt-2" data-oid="98jjoug">
                      <LoadScript
                        googleMapsApiKey="AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA" // Reemplaza con tu clave API
                        libraries={["places"]} // Necesario para usar Autocomplete
                        data-oid="wjbwclv"
                      >
                        <Autocomplete
                          onLoad={(autocomplete) =>
                            (autocompleteRef.current = autocomplete)
                          }
                          onPlaceChanged={onPlaceChanged}
                          data-oid="m749gv5"
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
                            data-oid="psjul.z"
                          />
                        </Autocomplete>
                      </LoadScript>
                    </div>
                  </div>
                  <div data-oid="0bua1p2">
                    <label
                      htmlFor="district"
                      className="block text-sm font-medium leading-6 text-gray-900"
                      data-oid="0jgq_sv"
                    >
                      Distrito
                    </label>
                    <div className="mt-2" data-oid="yxqj9o2">
                      <LoadScript
                        googleMapsApiKey="AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA" // Reemplaza con tu clave API
                        libraries={["places"]} // Necesario para usar Autocomplete
                        data-oid="bj46ujm"
                      >
                        <Autocomplete
                          onLoad={(autocomplete) =>
                            (autocompleteRef.current = autocomplete)
                          }
                          onPlaceChanged={onPlaceChanged}
                          data-oid="bhjbwk3"
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
                            data-oid="x_qqy63"
                          />
                        </Autocomplete>
                      </LoadScript>
                    </div>
                  </div>
                  <div data-oid="mqdp6rh">
                    <div
                      className="flex items-center justify-between"
                      data-oid="ze0w1yo"
                    >
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                        data-oid="4-pnvip"
                      >
                        Telefóno
                      </label>
                      <div className="text-sm" data-oid="pqp0cm7">
                        <a
                          href="#"
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                          data-oid="wxbe0vh"
                        >
                          {/* Forgot password? */}
                        </a>
                      </div>
                    </div>
                    <div className="mt-2" data-oid="s:8v04i">
                      <input
                        id="phone"
                        name="phone"
                        type="phone"
                        placeholder="Ingresa tu número de telefóno"
                        autoComplete="phone"
                        onChange={handleChange}
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                        data-oid="vov4.mj"
                      />
                    </div>
                  </div>

                  <div data-oid="5hzmyp9">
                    <div
                      className="flex items-center justify-between"
                      data-oid="l1ly--h"
                    >
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                        data-oid="kfl0vg8"
                      >
                        Contraseña
                      </label>
                      <div className="text-sm" data-oid="skp3io0">
                        <a
                          href="#"
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                          data-oid="5n2v5xp"
                        >
                          {/* Forgot password? */}
                        </a>
                      </div>
                    </div>
                    <div className="mt-2 relative" data-oid="gmt3aaq">
                      <input
                        placeholder="**********"
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                        data-oid="bwh3rkh"
                      />

                      <div
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                        data-oid=":f30rek"
                      >
                        {showPassword ? (
                          <EyeTwoTone
                            style={{ color: "#500075" }}
                            data-oid="n7lq7qu"
                          />
                        ) : (
                          <EyeInvisibleOutlined data-oid=".q_m0am" />
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
                      data-oid="3uuy0u8"
                    >
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        onChange={handleChange}
                        className={styles.input}
                        required
                        data-oid="8-xwkvk"
                      />

                      <label htmlFor="" data-oid="j7w6fz3">
                        Aceptar terminos y condiciones{" "}
                        <Link
                          to="/términos-y-condiciones"
                          className={styles.term_register}
                          data-oid="4pz0i9m"
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
                  <div className={styles.codeInput} data-oid="qg5hjoe">
                    <div className="mt-2" data-oid="ll-:ten">
                      <label
                        htmlFor="razon_social"
                        className="block text-sm font-medium leading-6 text-gray-900"
                        data-oid="jrgw:7q"
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
                        data-oid="5ij1ny."
                      />
                    </div>
                    <div className={styles.modalText} data-oid="o48dp5:">
                      <h2 onClick={handleOpenForm("body")} data-oid="k727-cx">
                        No tengo el código.
                      </h2>
                    </div>
                  </div>
                  <div data-oid="m:hxzbr">
                    <label
                      htmlFor="razon_social"
                      className="block text-sm font-medium leading-6 text-gray-900"
                      data-oid="h-cfg1b"
                    >
                      Razón Social
                    </label>
                    <div className="mt-2" data-oid="3jxm9lk">
                      <input
                        placeholder="Escribe tu razón social"
                        id="razon_social"
                        name="razon_social"
                        type="text"
                        onChange={handleChange}
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                        data-oid="5ohyqt1"
                      />
                    </div>
                  </div>

                  <div data-oid="2aj28ux">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                      data-oid="_17ogoc"
                    >
                      Nombre comercial
                    </label>
                    <div className="mt-2" data-oid="5jxshvs">
                      <input
                        placeholder="Escribe tu nombre comercial"
                        id="name"
                        name="name"
                        type="name"
                        value={data.name}
                        onChange={handleChange}
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                        data-oid="6vu8u_x"
                      />
                    </div>
                  </div>
                  <div data-oid="zyh_k.w">
                    <div
                      className="flex items-center justify-between"
                      data-oid="y0tcsmh"
                    >
                      <label
                        htmlFor="ruc"
                        className="block text-sm font-medium leading-6 text-gray-900"
                        data-oid="3gvbg94"
                      >
                        RUC
                      </label>
                      <div className="text-sm" data-oid="5hizoue">
                        <a
                          href="#"
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                          data-oid="gr..:vi"
                        >
                          {/* Forgot password? */}
                        </a>
                      </div>
                    </div>
                    <div className="mt-2" data-oid="wsrif66">
                      <input
                        id="ruc"
                        name="ruc"
                        type="ruc"
                        placeholder="Ingresa tu RUC"
                        autoComplete="ruc"
                        onChange={handleChange}
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                        data-oid="z9o8gzq"
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

                  <div data-oid="7e-hscs">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                      data-oid="cx538o0"
                    >
                      Correo
                    </label>
                    <div className="mt-2" data-oid="1l0h11t">
                      <input
                        placeholder="Correo electrónico"
                        id="email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        autoComplete="email"
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                        data-oid="u1-lwej"
                      />
                    </div>
                  </div>

                  <div data-oid="j2l6r5k">
                    <div
                      className="flex items-center justify-between"
                      data-oid="s1t-wxq"
                    >
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                        data-oid="i166qed"
                      >
                        Telefóno
                      </label>
                      <div className="text-sm" data-oid="c4.p6p-">
                        <a
                          href="#"
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                          data-oid="_yu5du."
                        >
                          {/* Forgot password? */}
                        </a>
                      </div>
                    </div>
                    <div className="mt-2" data-oid=".m:inql">
                      <input
                        id="phone"
                        name="phone"
                        type="phone"
                        placeholder="Ingresa tu número de telefóno"
                        autoComplete="phone"
                        onChange={handleChange}
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                        data-oid="8is7tzg"
                      />
                    </div>
                  </div>
                  <div data-oid="iuzde81">
                    <label
                      htmlFor="contact_person"
                      className="block text-sm font-medium leading-6 text-gray-900"
                      data-oid="ft532x6"
                    >
                      Persona de contacto
                    </label>
                    <div className="mt-2" data-oid="8x_.95.">
                      <input
                        placeholder="Persona de contacto"
                        id="contact_person"
                        name="contact_person"
                        type="text"
                        onChange={handleChange}
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                        data-oid="42kmgt5"
                      />
                    </div>
                  </div>

                  <div data-oid="82ptb:j">
                    <label
                      htmlFor="position"
                      className="block text-sm font-medium leading-6 text-gray-900"
                      data-oid="-f_v7px"
                    >
                      Cargo
                    </label>
                    <div className="mt-2" data-oid="wmys7u-">
                      <input
                        placeholder="Cargo"
                        id="position"
                        name="position"
                        type="text"
                        onChange={handleChange}
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                        data-oid="ksjfi02"
                      />
                    </div>
                  </div>
                  <div data-oid="lw059gi">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                      data-oid="vazz2_8"
                    >
                      País
                    </label>
                    <div className="mt-2" data-oid="evlxnw7">
                      <LoadScript
                        googleMapsApiKey="AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA" // Reemplaza con tu clave API
                        libraries={["places"]} // Necesario para usar Autocomplete
                        data-oid="sm-g:g7"
                      >
                        <Autocomplete
                          onLoad={(autocomplete) =>
                            (autocompleteRef.current = autocomplete)
                          }
                          onPlaceChanged={onPlaceChanged}
                          data-oid="2a.2p68"
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
                            data-oid="aladx-r"
                          />
                        </Autocomplete>
                      </LoadScript>
                    </div>
                  </div>
                  <div data-oid="61t3-k5">
                    <label
                      htmlFor="departament"
                      className="block text-sm font-medium leading-6 text-gray-900"
                      data-oid="0ybza1n"
                    >
                      Departamento
                    </label>

                    <div className="mt-2" data-oid=":ht2ji3">
                      <LoadScript
                        googleMapsApiKey="AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA" // Reemplaza con tu clave API
                        libraries={["places"]} // Necesario para usar Autocomplete
                        data-oid="krxqv8a"
                      >
                        <Autocomplete
                          onLoad={(autocomplete) =>
                            (autocompleteRef.current = autocomplete)
                          }
                          onPlaceChanged={onPlaceChanged}
                          data-oid="cb0vcvg"
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
                            data-oid="ojy909o"
                          />
                        </Autocomplete>
                      </LoadScript>
                    </div>
                  </div>
                  <div data-oid="nykfco5">
                    <label
                      htmlFor="province"
                      className="block text-sm font-medium leading-6 text-gray-900"
                      data-oid="0zm8jg:"
                    >
                      Provincia
                    </label>
                    <div className="mt-2" data-oid="9jg2dq4">
                      <LoadScript
                        googleMapsApiKey="AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA" // Reemplaza con tu clave API
                        libraries={["places"]} // Necesario para usar Autocomplete
                        data-oid="m51jnv_"
                      >
                        <Autocomplete
                          onLoad={(autocomplete) =>
                            (autocompleteRef.current = autocomplete)
                          }
                          onPlaceChanged={onPlaceChanged}
                          data-oid="d17ktuv"
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
                            data-oid="vz6tby3"
                          />
                        </Autocomplete>
                      </LoadScript>
                    </div>
                  </div>
                  <div data-oid="geo8:ns">
                    <label
                      htmlFor="district"
                      className="block text-sm font-medium leading-6 text-gray-900"
                      data-oid="8s-jmt8"
                    >
                      Distrito
                    </label>
                    <div className="mt-2" data-oid=":d08bod">
                      <LoadScript
                        googleMapsApiKey="AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA" // Reemplaza con tu clave API
                        libraries={["places"]} // Necesario para usar Autocomplete
                        data-oid="eoa6bn:"
                      >
                        <Autocomplete
                          onLoad={(autocomplete) =>
                            (autocompleteRef.current = autocomplete)
                          }
                          onPlaceChanged={onPlaceChanged}
                          data-oid="5_52qs:"
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
                            data-oid="iofjg8f"
                          />
                        </Autocomplete>
                      </LoadScript>
                    </div>
                  </div>

                  <div data-oid="r2k2f8p">
                    <div
                      className="flex items-center justify-between"
                      data-oid="3gopc2f"
                    >
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                        data-oid="1me10pg"
                      >
                        Contraseña
                      </label>
                      <div className="text-sm" data-oid="w:vy3o:">
                        <a
                          href="#"
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                          data-oid="7d9-3a:"
                        >
                          {/* Forgot password? */}
                        </a>
                      </div>
                    </div>
                    <div className="mt-2" data-oid="dcgetn6">
                      <input
                        placeholder="**********"
                        id="password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                        className={`outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.input}`}
                        data-oid="4-5x929"
                      />
                    </div>
                  </div>
                </>
              ) : null}
              <div data-oid="5ka3gdm">
                <button
                  type="submit"
                  className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${styles.btn_success}`}
                  data-oid="t:fyh7m"
                >
                  {loadingSuccess ? (
                    <CircularProgress
                      size={25}
                      thickness={5}
                      sx={{ color: "#fff" }}
                      data-oid="g9_v5n0"
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

            <p
              className="mt-10 text-center text-sm text-gray-500"
              data-oid="sj::0lk"
            >
              Si tiene una cuenta, haga click{" "}
              <Link
                to="/iniciar-sesión"
                className={`font-semibold leading-6 text-indigo-600 hover:text-indigo-500 `}
                data-oid="h1iirp2"
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
        data-oid="fhrnpw:"
      >
        <DialogContent dividers={scroll === "paper"} data-oid="hs754is">
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            data-oid="iubaa-3"
          >
            <FormModal
              setOpenForm={setOpenForm}
              setOpenAlert={setOpenAlert}
              data-oid="3y5572o"
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        data-oid="g2qk62v"
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
          data-oid="uefl0oa"
        >
          Formulario completado exitosamente.
        </Alert>
      </Snackbar>
    </>
  );
}
