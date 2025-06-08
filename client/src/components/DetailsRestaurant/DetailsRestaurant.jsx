import React, { useEffect, useState, useRef } from "react";
import styles from "./DetailsRestaurant.module.css";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DetailRestaurant, dataPersonal } from "../../redux/action";
import { Image } from "antd";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import BabyChangingStationOutlinedIcon from "@mui/icons-material/BabyChangingStationOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import NavbarDetails from "../Navbar/NavbarDetails";
import Navbar from "../Navbar/Navbar";
import "antd/dist/reset.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import WifiIcon from "@mui/icons-material/Wifi";
import PetsIcon from "@mui/icons-material/Pets";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import WheelchairPickupIcon from "@mui/icons-material/WheelchairPickup";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import { LuSalad } from "react-icons/lu";
import CarRentalIcon from "@mui/icons-material/CarRental";
import Tooltip from "@mui/material/Tooltip";
import { useLocation } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es"; // Importa la configuración en español
import "react-datepicker/dist/react-datepicker.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";

const libraries = ["places"];
registerLocale("es", es);
setDefaultLocale("es");

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Coordenadas iniciales centradas en Perú
const defaultCenter = {
  lat: -12.0464,
  lng: -77.0428,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function DetailsRestaurant() {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const restaurantdetails = useSelector(
    (state) => state.restaurantdetails.data,
  );
  const token = useSelector((state) => state.token);

  const datapersonal = useSelector((state) => state.datapersonal);

  const [currentLocation, setCurrentLocation] = useState(null); // Para guardar la ubicación actual del usuario
  const autocompleteRef = useRef(null); // Referencia para el Autocomplete
  const [center, setCenter] = useState(defaultCenter); // Coordenadas del mapa
  const orderId = useSelector((state) => state.orderId);

  const userId = useSelector((state) => state.userId);
  const position = [51.505, -0.09];
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    hours: "",
    peoples: "",
    location: "",
    area: "",
  });
  const [error, setError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [cart, setCart] = useState(null);
  const [userCart, setUserCart] = useState(null);

  const [loadingLocation, setLoadingLocation] = useState(true);

  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!restaurantdetails?.codeId) return;

    const fetchData = async () => {
      setLoadingLocation(true);
      setLocation(null);
      setFormData((prev) => ({ ...prev, location: "" })); // 🔁 Resetea

      try {
        const res = await axios.get(
          `https://en-una-production.up.railway.app/api/code/${restaurantdetails.codeId}`,
        );
        setLocation(res.data.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoadingLocation(false);
      }
    };

    fetchData();
  }, [restaurantdetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Encuentra el restaurante que coincide con el nombre local seleccionado
    const selectedRestaurant = location?.restaurants?.find(
      (data) => data.local === value,
    );

    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Guarda el local en el estado
    }));

    if (name === "location" && value) {
      window.location.href = `/detalles/restaurante/${selectedRestaurant?.id}`;
    }
  };

  useEffect(() => {
    dispatch(dataPersonal(token));
  }, [token, dispatch]);
  React.useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    const form = JSON.parse(localStorage.getItem(`form_${userId}`)) || {};

    setCart(cartData);
    setUserCart(form);
  }, []);
  useEffect(() => {
    try {
      dispatch(DetailRestaurant(restaurantId));
    } catch (error) {
      console.log("Error al obtener el detalle:", error);
    }
  }, [restaurantId]);

  useEffect(() => {
    setFormData({
      name: restaurantdetails?.name || "",
      location: restaurantdetails?.local || "",
    });
  }, [restaurantdetails]);

  const handleContinue = () => {
    // Verificar si hay algo en el carrito, y abrir el modal si es necesario
    if (cart && cart.length > 0) {
      setOpen(true);
      return; // Si hay algo en el carrito, abrir el modal y detener la ejecución
    }

    // Si no es personal o no hay token, redirigir al login
    if (datapersonal.role !== "personal" || token === undefined) {
      navigate(`/iniciar-sesión`);
      return;
    }

    // Si todos los campos están completos, guardar en localStorage y navegar
    if (
      formData.date &&
      formData.hours &&
      formData.peoples &&
      formData.location &&
      formData.area
    ) {
      const updatedCart = [{ formData }];
      localStorage.setItem(`form_${userId}`, JSON.stringify(updatedCart));
      navigate(`/menu/restaurante/${restaurantId}`);
    } else {
      // Si los campos no están completos, mostrar error
      setError(true);
    }
  };

  const handleRemoveAll = () => {
    // Elimina los datos del LocalStorage
    localStorage.removeItem(`cart_${userId}`);
    localStorage.removeItem(`form_${userId}`);
    localStorage.removeItem("orderId"); // Se elimina correctamente sin argumento extra
    localStorage.removeItem("paymentResponse");

    setCart(null);
    setUserCart(null);
    setOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Obtener todos los horarios de todos los días
  const obtenerTodosHorarios = () => {
    if (!restaurantdetails || !restaurantdetails.horarios) return [];

    let todosHorarios = [];

    // Recorremos todos los horarios
    restaurantdetails.horarios.forEach((horario) => {
      if (!horario.cerrado) {
        // Generar horarios en intervalos de 30 minutos
        const horarios = generarHorarios(horario.inicio, horario.fin, 30);

        // Filtrar los horarios según las reservas
        const horariosFiltrados = horarios.filter((hora) => {
          // Filtrar las órdenes que coinciden con la hora actual
          const ordenesEnHora = restaurantdetails.Orders.filter(
            (order) => order.hours === hora,
          );

          // Calcular el total de personas en esa hora
          const totalPeople = ordenesEnHora.reduce((sum, order) => {
            return sum + (order.people || 0); // Asegúrate de que "people" sea un número válido
          }, 0);

          // Compara el total de personas con el máximo por mesa
          return totalPeople < restaurantdetails.maximum_per_table;
        });

        // Agregar los horarios filtrados al resultado final
        todosHorarios.push(...horariosFiltrados);
      }
    });

    return [...new Set(todosHorarios)].sort((a, b) => {
      const [ha, ma] = a.split(":").map(Number);
      const [hb, mb] = b.split(":").map(Number);
      return ha * 60 + ma - (hb * 60 + mb);
    });
  };

  const generarHorarios = (inicio, fin, intervaloMinutos) => {
    let horarios = [];
    let [horaInicio, minutoInicio] = inicio.split(":").map(Number);
    let [horaFin, minutoFin] = fin.split(":").map(Number);

    let fechaInicio = new Date(0, 0, 0, horaInicio, minutoInicio);
    let fechaFin = new Date(0, 0, 0, horaFin, minutoFin);

    while (fechaInicio <= fechaFin) {
      let horas = fechaInicio.getHours().toString().padStart(2, "0");
      let minutos = fechaInicio.getMinutes().toString().padStart(2, "0");
      horarios.push(`${horas}:${minutos}`);
      fechaInicio.setMinutes(fechaInicio.getMinutes() + intervaloMinutos);
    }

    return horarios;
  };
  const horarios = obtenerTodosHorarios();
  const today = new Date().toISOString().split("T")[0];
  const formatDate = (date) => {
    // Verifica si la fecha es válida antes de formatear
    if (!date) return ""; // Retorna vacío si la fecha es nula
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Sumar 1 porque getMonth() empieza desde 0
    const day = String(date.getDate()).padStart(2, "0"); // Formatea el día
    return `${day}/${month}/${year}`; // Retorna la fecha en el formato dd/mm/yyyy
  };

  const isBeforeToday = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Asegúrate de que solo estás comparando las fechas, no las horas.
    return date < today; // Retorna true si la fecha es anterior a hoy.
  };

  const isBeforeTomorrow = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    return selectedDate < tomorrow; // Retorna true si la fecha es hoy o antes
  };

  const isClosedDate = (date) => {
    // Crear una nueva fecha para asegurarte de que está en la zona horaria local
    const localDate = new Date(
      date.toLocaleString("en-US", { timeZone: "America/Mexico_City" }),
    );

    const dayOfWeek = localDate.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    const horario = restaurantdetails.horarios[dayOfWeek]; // Obtener horario del día seleccionado
    return horario?.cerrado === true; // Retorna true si está cerrado
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); // Actualiza el estado de la fecha seleccionada
    setFormData((prevData) => ({
      ...prevData,
      date: formatDate(date), // Actualiza la fecha en formData en el formato deseado
    }));
  };
  const handleViewReservation = () => {
    navigate("/carrito");
  };

  useEffect(() => {
    if (restaurantdetails && restaurantdetails.address) {
      // Función para geocodificar la dirección usando la API de Google Maps
      const geocodeAddress = async (address) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
          if (status === "OK" && results[0]) {
            const location = results[0].geometry.location;
            const newCenter = {
              lat: location.lat(),
              lng: location.lng(),
            };
            setCenter(newCenter); // Actualizamos el centro del mapa con las coordenadas obtenidas
          } else {
            console.error("No se pudo geocodificar la dirección:", status);
            alert(
              "No se pudo encontrar la ubicación de la dirección proporcionada.",
            );
          }
        });
      };

      // Geocodifica la dirección cuando está disponible
      geocodeAddress(restaurantdetails.address);
    }
  }, [restaurantdetails]);

  return (
    <>
      <div className={styles.food_container} data-oid="a2i6ihs">
        <div className={styles.food_box} data-oid="pvd3g79">
          <div className={styles.none_mobile} data-oid="ul7:izx">
            <NavbarDetails data-oid="ax1.dwm" />
          </div>
          <div className={styles.none_desktop} data-oid=":7bg9zz">
            <Navbar data-oid="2c.k-13" />
          </div>

          <div className={styles.details_box} data-oid="4dj75f4">
            <div className={styles.img_container} data-oid="-z62uo0">
              <div className={styles.text_container_title} data-oid="9bb24us">
                <span data-oid="juxek6.">
                  {restaurantdetails && restaurantdetails.name}
                </span>

                <img
                  src={restaurantdetails && restaurantdetails.logo}
                  alt=""
                  className={styles.logo}
                  data-oid="pipugvb"
                />
              </div>

              <h1 className={styles.text_box} data-oid="-aoy-uw">
                {restaurantdetails && restaurantdetails.address}
              </h1>
              <div className={styles.containerInfo} data-oid="h89tahr">
                <div data-oid="iwfkbc9">
                  <Image.PreviewGroup
                    className={styles.custom_preview_group}
                    items={restaurantdetails?.imageFile}
                    data-oid="080mx2:"
                  >
                    <Image
                      src={restaurantdetails && restaurantdetails.imageFile[0]}
                      alt="Foto del restaurante"
                      className={styles.img_details}
                      loading="lazy"
                      data-oid="9mz-077"
                    />
                  </Image.PreviewGroup>
                </div>
                <div className={styles.descriptionText} data-oid="tb3hq97">
                  <h1 className={styles.text_container} data-oid="i9os4f2">
                    Descripción del restaurante
                  </h1>
                  <div className={styles.text_p} data-oid="9nohppd">
                    {/*        {isExpanded ? details : `${details.substring(0, maxLength)}...`} */}

                    {restaurantdetails && restaurantdetails.details}
                  </div>
                  <br data-oid="8dld8p4" />

                  <span data-oid="fe7g03l">
                    <h1 className={styles.text_container} data-oid="yqcf6wj">
                      {" "}
                      Horario de atención
                    </h1>
                    <div className={styles.day_atention} data-oid="2q::-_q">
                      {restaurantdetails &&
                        restaurantdetails.horarios.map((data) => (
                          <div
                            key={`${data.dia}-${data.inicio}`}
                            className={styles.hoursdetails}
                            data-oid="z6uqvoq"
                          >
                            {!data.cerrado && (
                              <div
                                className={styles.texthours}
                                data-oid="k2.vgg4"
                              >
                                <span data-oid="dseb88n">{data.dia}:</span>
                                <span data-oid="jwqbsy7">{`${data.inicio} - ${data.fin}`}</span>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </span>

                  <br data-oid="jcttq:r" />

                  <br data-oid="9as6n:4" />
                  <span data-oid="tb--:b1">
                    <h1 className={styles.text_container} data-oid="-r.jti5">
                      Contactos
                    </h1>

                    <span id={styles.email_phone} data-oid="-_lmu1x">
                      <strong data-oid="l3pfzzk">Correo electrónico: </strong>

                      {restaurantdetails && restaurantdetails.email}
                    </span>
                  </span>
                  <br data-oid="_dyo173" />
                  <span id={styles.email_phone} data-oid="bnbkkj5">
                    <strong data-oid="9m3b-u-">Teléfono: </strong>
                    {restaurantdetails && restaurantdetails.phone}
                  </span>

                  <br data-oid="30l:yrx" />
                  <div className={styles.footer_container} data-oid="81u3t:2">
                    <div className={styles.footer_social} data-oid="tilwzy2">
                      <a
                        href={restaurantdetails && restaurantdetails.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-oid="if6d-ur"
                      >
                        <FaSquareFacebook
                          className={styles.footer_icon}
                          data-oid="zi:ahep"
                        />
                      </a>
                      <a
                        href={restaurantdetails && restaurantdetails.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-oid="hi5plas"
                      >
                        <FaInstagram
                          className={styles.footer_icon}
                          data-oid="97npnrg"
                        />
                      </a>

                      <a
                        href={restaurantdetails && restaurantdetails.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-oid="6pwna-4"
                      >
                        <FaTiktok
                          className={styles.footer_icon}
                          data-oid="s6muob_"
                        />
                      </a>

                      <a
                        href={restaurantdetails && restaurantdetails.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-oid="p1hmycr"
                      >
                        <IoLogoYoutube
                          className={styles.footer_icon}
                          data-oid="c.gf:2f"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
        <hr data-oid="yawad1c" />
        <br data-oid="ofv_tvy" />
        <div className={styles.description_aditional} data-oid="7cu0a1q">
          <form className={styles.select_container} data-oid="9ld8m51">
            <div data-oid="1856l_j">
              <label
                htmlFor="location"
                className={styles.title}
                data-oid="fd8a30l"
              >
                Local
              </label>
              <div className={styles.selectContainer} data-oid="-1ihrjr">
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={styles.selectLocation}
                  required
                  data-oid="a.e1t4."
                >
                  <option value="" data-oid="mtl1p-7">
                    Seleccionar
                  </option>

                  {loadingLocation ? (
                    <option disabled data-oid="14u.hrq">
                      Cargando...
                    </option>
                  ) : (
                    location?.restaurants
                      ?.slice() // crea una copia para no mutar el estado original
                      .sort((a, b) => a.local.localeCompare(b.local)) // ordena por 'local'
                      .map((data, index) => (
                        <option
                          key={`${data.id}-${index}`}
                          value={data.local}
                          data-oid="2twjocd"
                        >
                          {data.local}
                        </option>
                      ))
                  )}
                </select>
              </div>
            </div>

            <div data-oid="utig7:m">
              <label htmlFor="date" className={styles.title} data-oid="sprfe6q">
                Fecha
              </label>
              <div data-oid="a4zndoj">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  value={formData.date}
                  filterDate={(date) =>
                    !isClosedDate(date) && !isBeforeTomorrow(date)
                  }
                  placeholderText="Selecciona una fecha"
                  className={`h-[2.75rem] outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.date}`}
                  locale="es" // Establece el idioma en español
                  dateFormat="dd/MM/yyyy" // Formato correcto: 03/08/2025
                  minDate={today} // min en lugar de minDate no funciona correctamente
                  data-oid="25vvs:l"
                />
              </div>
            </div>

            <div data-oid="ruj7.c1">
              <label
                htmlFor="hours"
                className={styles.title}
                data-oid="9gcdm4r"
              >
                Hora
              </label>

              <select
                name="hours"
                value={formData.hours}
                onChange={handleChange}
                className="h-[2.75rem] outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all "
                required
                data-oid="s:eg2p5"
              >
                <option value="" data-oid="x8od5k4">
                  Seleccionar hora
                </option>
                {horarios.map((horario) => (
                  <option key={horario} value={horario} data-oid="b93vx8f">
                    {horario}
                  </option>
                ))}
              </select>
            </div>

            <div data-oid="r9rs.wi">
              <label
                htmlFor="peoples"
                className={styles.title}
                data-oid="b3rmbv1"
              >
                Personas (Maximo por mesa indicado por restaurante{" "}
                {restaurantdetails?.maximum_person_per_table})
              </label>
              <input
                type="number"
                value={formData.peoples || ""}
                onChange={(e) => {
                  const value = e.target.value;

                  // Obtén el valor máximo permitido
                  const max = restaurantdetails?.maximum_person_per_table || 10;

                  // Permitir valores vacíos o números válidos dentro del rango
                  if (
                    value === "" ||
                    (!isNaN(Number(value)) &&
                      Number(value) >= 1 &&
                      Number(value) <= max)
                  ) {
                    setFormData({
                      ...formData,
                      peoples: value === "" ? "" : Number(value),
                    });
                  }
                }}
                className="h-[2.75rem] outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
                required
                data-oid="x6k_ns."
              />
            </div>
            <div data-oid="_rivbi.">
              <label htmlFor="area" className={styles.title} data-oid=".-gh2fu">
                Zona
              </label>

              <select
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="h-[2.75rem] outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
                required
                data-oid="nx5yfy:"
              >
                <option value="" data-oid="gll9.d0">
                  Seleccionar zona
                </option>
                {restaurantdetails?.area &&
                  restaurantdetails?.area?.map((zone) => (
                    <>
                      <option key={zone} value={zone} data-oid="8ukhrv-">
                        {zone}
                      </option>
                    </>
                  ))}
              </select>
            </div>
          </form>
          <div className={styles.additional} data-oid="f67ym5d">
            <div className={styles.container_icons} data-oid="qg9f5yl">
              <RestaurantOutlinedIcon
                className={styles.icons_restaurant}
                data-oid="2u_f2hz"
              />

              <div data-oid="jr.lemo">
                <label htmlFor="" className={styles.title} data-oid="q:6vrqg">
                  Tipo de comida
                </label>
                <br data-oid="vxldq24" />
                <span className={styles.subtitle} data-oid="hs5qji_">
                  {restaurantdetails?.type_of_meals}
                </span>
              </div>
            </div>
            {restaurantdetails?.average_price ? (
              <div className={styles.container_icons} data-oid="c8x3uvc">
                <AccountBalanceWalletOutlinedIcon
                  className={styles.icons}
                  data-oid="mrco6xy"
                />

                <div data-oid="d42750h">
                  <label htmlFor="" className={styles.title} data-oid="4k18b6n">
                    Precio promedio
                  </label>
                  <br data-oid="0w6toc:" />
                  <span className={styles.subtitle} data-oid="7_hsli1">
                    S/{restaurantdetails?.average_price}
                  </span>
                </div>
              </div>
            ) : null}

            <div className={styles.container_icons} data-oid="n:vqw::">
              <LocalAtmOutlinedIcon
                className={styles.icons}
                data-oid="p-adx_3"
              />

              <div data-oid="kkjb5ml">
                <label htmlFor="" className={styles.title} data-oid="yog72.4">
                  Monto minimo por persona
                </label>
                <br data-oid="iwx58p_" />
                <span className={styles.subtitle} data-oid="mwr_j:x">
                  S/{restaurantdetails?.minimum_consumption}
                </span>
              </div>
            </div>

            <div className={styles.container_icons} data-oid="r177s1m">
              <VolunteerActivismOutlinedIcon
                className={styles.icons}
                data-oid="kve:mgg"
              />

              <div data-oid="b.cis-s">
                <label htmlFor="" className={styles.title} data-oid="rdvgxvi">
                  Servicios adicionales
                </label>
                <br data-oid="o-86w_2" />
                <div className={styles.icons_additional} data-oid="_d:31fr">
                  {restaurantdetails?.additional_services.map((s) => (
                    <div data-oid="22zpkvc">
                      <div data-oid="phzom7i">
                        {s.includes("Wifi") ? (
                          <Tooltip
                            title="Wifi"
                            placement="bottom"
                            data-oid="xxfcr_e"
                          >
                            <WifiIcon
                              className={styles.icons}
                              data-oid="dtutt7y"
                            />{" "}
                          </Tooltip>
                        ) : null}
                      </div>
                      <div data-oid="092k02w">
                        {s.includes("Pet friendly") ? (
                          <Tooltip
                            title="Pet friendly"
                            placement="bottom"
                            data-oid="4g8f-tp"
                          >
                            <PetsIcon
                              className={styles.icons}
                              data-oid="_cdy8u6"
                            />{" "}
                          </Tooltip>
                        ) : null}
                      </div>
                      <div data-oid="b11zbp8">
                        {s.includes("Estacionamiento") ? (
                          <Tooltip
                            title="Estacionamiento"
                            placement="bottom"
                            data-oid="p0s1et-"
                          >
                            {" "}
                            <LocalParkingIcon
                              className={styles.icons}
                              data-oid="_tvfmyx"
                            />{" "}
                          </Tooltip>
                        ) : null}
                      </div>
                      <div data-oid="_-nlr.0">
                        {s.includes("Rampa discapacitados") ? (
                          <Tooltip
                            title="Rampa para discapacitados"
                            placement="bottom"
                            data-oid="1vtz-uo"
                          >
                            <WheelchairPickupIcon
                              className={styles.icons}
                              data-oid="2bn_uhy"
                            />{" "}
                          </Tooltip>
                        ) : null}
                      </div>
                      <div data-oid="2_i30z3">
                        {s.includes("Aire acondicionado") ? (
                          <Tooltip
                            title="Aire acondicionado"
                            placement="bottom"
                            data-oid="7n:bb4-"
                          >
                            <AcUnitIcon
                              className={styles.icons}
                              data-oid="poi1btx"
                            />{" "}
                          </Tooltip>
                        ) : null}
                      </div>
                      <div data-oid="2.qoe7x">
                        {s.includes("Silla para bebés") ? (
                          <Tooltip
                            title="Silla para bebés"
                            placement="bottom"
                            data-oid="f7mg14q"
                          >
                            {" "}
                            <ChildCareIcon
                              className={styles.icons}
                              data-oid="pks7oyi"
                            />{" "}
                          </Tooltip>
                        ) : null}
                      </div>
                      <div data-oid="li97egy">
                        {s.includes("Cambiador para bebés") ? (
                          <Tooltip
                            title="Cambiador para bebés"
                            placement="bottom"
                            data-oid="m8_5-23"
                          >
                            {" "}
                            <BabyChangingStationOutlinedIcon
                              className={styles.icons}
                              data-oid="kjqv03q"
                            />{" "}
                          </Tooltip>
                        ) : null}
                      </div>
                      <div data-oid="n-_jchi">
                        {s.includes("Comida vegetariana") ? (
                          <Tooltip
                            title="Comida vegetariana"
                            placement="bottom"
                            data-oid="bbmg2qs"
                          >
                            {" "}
                            <LuSalad
                              className={styles.icons}
                              data-oid="cb5y_.7"
                            />{" "}
                          </Tooltip>
                        ) : null}
                      </div>
                      <div data-oid="k6.3pf2">
                        {s.includes("Valet Parking") ? (
                          <Tooltip
                            title="Valet Parking"
                            placement="bottom"
                            data-oid="wh3m59g"
                          >
                            <CarRentalIcon
                              className={styles.icons}
                              data-oid="vdh36ek"
                            />{" "}
                          </Tooltip>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <LoadScript
            googleMapsApiKey="AIzaSyBMqv1fgtsDEQQgm4kmLBRtZI7zu-wSldA" // Reemplaza con tu clave API
            libraries={libraries} // Necesario para usar Autocomplete
            data-oid="bunqgld"
          >
            <GoogleMap
              mapContainerClassName={styles.maps}
              center={center}
              zoom={12}
              data-oid="emfieo:"
            >
              {/* Marcador en la ubicación seleccionada */}
              {restaurantdetails && restaurantdetails.address && (
                <Marker position={center} data-oid="tse26_l" />
              )}
            </GoogleMap>
          </LoadScript>
        </div>
        <>
          <div className={styles.form_container} data-oid="illo_cj">
            <h2 data-oid="62:kfh.">Detalle de la reserva:</h2>

            <div data-oid="5qhio5_">
              <strong data-oid="jajyba8">Restaurante:</strong> {formData.name}
            </div>
            {formData.location ? (
              <div data-oid="f169r:k">
                <strong data-oid="g6nvhdt">Local:</strong> {formData.location}
              </div>
            ) : null}

            {formData.date ? (
              <div data-oid="5ka1.iw">
                <strong data-oid="pnbp6z_">Fecha de reserva:</strong>{" "}
                {formData.date}
              </div>
            ) : null}
            {formData.hours ? (
              <div data-oid="4.qr3.k">
                <strong data-oid="zzd01s:">Hora: </strong>
                {formData.hours}
              </div>
            ) : null}
            {formData.peoples ? (
              <div data-oid="bj8qhto">
                <strong data-oid="c48r3es">Personas:</strong> {formData.peoples}
              </div>
            ) : null}
            {formData.area ? (
              <div data-oid="yg45ckh">
                <strong data-oid="xmgil:i">Zona:</strong> {formData.area}
              </div>
            ) : null}
          </div>
          {error ? (
            <p
              className="text-red-500 text-sm mt-2"
              style={{ textAlign: "center" }}
              data-oid="gam.ekf"
            >
              Completar todos los campos
            </p>
          ) : null}
          <div className={styles.btn_container} data-oid=":n6quii">
            <Button
              className={styles.btn_login}
              onClick={handleContinue}
              data-oid="h28liki"
            >
              Continuar
            </Button>
          </div>
        </>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          data-oid="zl0hv16"
        >
          <Box sx={style} data-oid="3:oc3ll">
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              data-oid="ya3j7s7"
            >
              Tienes una reserva pendiente
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              data-oid="a2yj-of"
            >
              <Button
                variant="contained"
                color="error"
                onClick={handleRemoveAll}
                data-oid=":lc6rrn"
              >
                Eliminar reserva
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleViewReservation}
                data-oid="bmdtoy-"
              >
                Ver reserva
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
}
