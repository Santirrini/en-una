import React, { useEffect, useState, useRef } from "react";
import styles from "./DetailsRestaurant.module.css";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DetailRestaurant } from "../../redux/action";
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
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es"; // Importa la configuración en español
import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es);
setDefaultLocale("es");

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
const containerStyle = {
  width: "345px",
  height: "345px",
  maxWidth: "100%",
};

// Coordenadas iniciales centradas en Perú
const defaultCenter = {
  lat: -12.0464,
  lng: -77.0428,
};
export default function DetailsRestaurant() {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const restaurantdetails = useSelector(
    (state) => state.restaurantdetails.data
  );
  const [currentLocation, setCurrentLocation] = useState(null); // Para guardar la ubicación actual del usuario
  const autocompleteRef = useRef(null); // Referencia para el Autocomplete
  const [center, setCenter] = useState(defaultCenter); // Coordenadas del mapa

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
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    dispatch(DetailRestaurant(restaurantId));
  }, [dispatch, restaurantId]);

  useEffect(() => {
    setFormData({
      name: restaurantdetails?.name,
    });
  }, [restaurantdetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleContinue = () => {
    // Verificar si todos los campos tienen un valor
    if (
      formData.date &&
      formData.hours &&
      formData.peoples &&
      formData.location &&
      formData.area
    ) {
      const updatedCart = [...items, { formData }];
      localStorage.setItem(`form_${userId}`, JSON.stringify(updatedCart));
      navigate(`/menu/restaurante/${restaurantId}`);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Obtener todos los horarios de todos los días
  const obtenerTodosHorarios = () => {
    if (!restaurantdetails || !restaurantdetails.horarios) return [];

    let todosHorarios = [];

    restaurantdetails.horarios.forEach((horario) => {
      if (!horario.cerrado) {
        const horarios = generarHorarios(horario.inicio, horario.fin, 30); // Cambiado a 30 minutos
        todosHorarios = todosHorarios.concat(horarios);
      }
    });

    return todosHorarios;
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
    if (!date) return ''; // Retorna vacío si la fecha es nula
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Sumar 1 porque getMonth() empieza desde 0
    const day = String(date.getDate()).padStart(2, '0'); // Formatea el día
    return `${day}/${month}/${year}`; // Retorna la fecha en el formato dd/mm/yyyy
  };
  const isBeforeToday = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Asegúrate de que solo estás comparando las fechas, no las horas.
    return date < today; // Retorna true si la fecha es anterior a hoy.
  };
  
  const isClosedDate = (date) => {
    // Crear una nueva fecha para asegurarte de que está en la zona horaria local
    const localDate = new Date(date.toLocaleString("en-US", {timeZone: "America/Mexico_City"}));
    
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
              "No se pudo encontrar la ubicación de la dirección proporcionada."
            );
          }
        });
      };

      // Geocodifica la dirección cuando está disponible
      geocodeAddress(restaurantdetails.address);
    }
  }, [restaurantdetails]);
  return (
    <div className={styles.food_container}>
      <div className={styles.food_box}>
        <div className={styles.none_mobile}>
          <NavbarDetails />
        </div>
        <div className={styles.none_desktop}>
          <Navbar />
        </div>

        <div className={styles.details_box}>
          <h1 className={styles.text_container}>
            {restaurantdetails && restaurantdetails.name}

            <img
              src={restaurantdetails && restaurantdetails.logo}
              alt=""
              className={styles.logo}
            />
          </h1>

          <h1 className={styles.text_box}>
            {restaurantdetails && restaurantdetails.address}
          </h1>
          <div className={styles.contact}>
            <div className={styles.img_container}>
              <Image.PreviewGroup
                className="custom-preview-group"
                items={restaurantdetails?.imageFile}
              >
                <Image
                  src={restaurantdetails && restaurantdetails.imageFile[0]}
                  alt="Foto del restaurante"
                  className={styles.img_details}
                />
              </Image.PreviewGroup>
            </div>
            <div>
              <span>
                <h1 className={styles.text_container}>
                  Descripción del restaurante
                </h1>
                <div className={styles.text_p}>
                  {/*        {isExpanded ? details : `${details.substring(0, maxLength)}...`} */}

                  {restaurantdetails && restaurantdetails.details}
                </div>
              </span>
              <br />

              <span>
                <h1 className={styles.text_container}> Horario de atención</h1>
                <div className={styles.day_atention}>
                  {restaurantdetails &&
                    restaurantdetails.horarios.map((data, index) => (
                      <div key={index}>
                        {data.cerrado
                          ? ""
                          : `${data.dia}: ${data.inicio} - ${data.fin}`}
                      </div>
                    ))}
                </div>
              </span>

              <br />

              <br />
              <span>
                <h1 className={styles.text_container}>Contactos</h1>

                <span id={styles.email_phone}>
                  <strong>Correo electrónico: </strong>

                  {restaurantdetails && restaurantdetails.email}
                </span>
              </span>
              <br />
              <span id={styles.email_phone}>
                <strong>Teléfono: </strong>
                {restaurantdetails && restaurantdetails.phone}
              </span>
              {/*    <div>
                {restaurantdetails &&
                  restaurantdetails.horarios.map((data) => (
                    <p className={styles.text_p}>
                      {data.dia}: {data.inicio}{" "}
                      {data.cerrado === true ? "Cerrado" : "-"} {data.fin}
                    </p>
                  ))}
              </div> */}
              <br />
              <div className={styles.footer_container}>
                <div className={styles.footer_social}>
                  <a
                    href={restaurantdetails && restaurantdetails.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaSquareFacebook className={styles.footer_icon} />
                  </a>
                  <a
                    href={restaurantdetails && restaurantdetails.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className={styles.footer_icon} />
                  </a>

                  <a
                    href={restaurantdetails && restaurantdetails.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTiktok className={styles.footer_icon} />
                  </a>

                  <a
                    href={restaurantdetails && restaurantdetails.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IoLogoYoutube className={styles.footer_icon} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
      <hr />
      <br />
      <div className={styles.description_aditional}>
        <form className={styles.select_container}>
          <div>
            <label htmlFor="location" className={styles.title}>
              Local
            </label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="h-[2.75rem] outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${}"
              required
            >
              <option value="">Seleccionar</option>
              <option value={restaurantdetails && restaurantdetails.local}>
                {restaurantdetails && restaurantdetails.local}
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="date" className={styles.title}>
              Fecha
            </label>
            <div>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                filterDate={(date) => !isClosedDate(date) && !isBeforeToday(date)}
                placeholderText="Selecciona una fecha"
                className={`h-[2.75rem] outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all ${styles.date}`}
                locale="es" // Establece el idioma en español
                min={today}
              />
            </div>
          </div>

          <div>
            <label htmlFor="hours" className={styles.title}>
              Hora
            </label>

            <select
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              className="h-[2.75rem] outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
              required
            >
              <option value="">Seleccionar hora</option>
              {horarios.map((horario, index) => (
                <option key={index} value={horario}>
                  {horario}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="peoples" className={styles.title}>
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
            />
          </div>
          <div>
            <label htmlFor="area" className={styles.title}>
              Zona
            </label>

            <select
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="h-[2.75rem] outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
              required
            >
              <option value="">Seleccionar zona</option>
              {restaurantdetails?.area &&
                restaurantdetails?.area?.map((zone, index) => (
                  <>
                    <option key={index} value={zone}>
                      {zone}
                    </option>
                  </>
                ))}
            </select>
          </div>
        </form>
        <div className={styles.additional}>
          <div className={styles.container_icons}>
            <RestaurantOutlinedIcon className={styles.icons_restaurant} />
            <div>
              <label htmlFor="" className={styles.title}>
                Tipo de comida
              </label>
              <br />
              <span className={styles.subtitle}>
                {restaurantdetails?.type_of_meals}
              </span>
            </div>
          </div>
          {restaurantdetails?.average_price ? (
            <div className={styles.container_icons}>
              <AccountBalanceWalletOutlinedIcon className={styles.icons} />
              <div>
                <label htmlFor="" className={styles.title}>
                  Precio promedio
                </label>
                <br />
                <span className={styles.subtitle}>
                  S/{restaurantdetails?.average_price}
                </span>
              </div>
            </div>
          ) : null}

          <div className={styles.container_icons}>
            <LocalAtmOutlinedIcon className={styles.icons} />
            <div>
              <label htmlFor="" className={styles.title}>
                Monto minimo por persona
              </label>
              <br />
              <span className={styles.subtitle}>
                S/{restaurantdetails?.minimum_consumption}
              </span>
            </div>
          </div>

          <div className={styles.container_icons}>
            <VolunteerActivismOutlinedIcon className={styles.icons} />
            <div>
              <label htmlFor="" className={styles.title}>
                Servicios adicionales
              </label>
              <br />
              <div className={styles.icons_additional}>
                {restaurantdetails?.additional_services.map((s, index) => (
                  <div>
                    <div key={index}>
                      {s.includes("Wifi") ? (
                        <Tooltip title="Wifi" placement="bottom">
                          <WifiIcon className={styles.icons} />{" "}
                        </Tooltip>
                      ) : null}
                    </div>
                    <div key={index}>
                      {s.includes("Pet friendly") ? (
                        <Tooltip title="Pet friendly" placement="bottom">
                          <PetsIcon className={styles.icons} />{" "}
                        </Tooltip>
                      ) : null}
                    </div>
                    <div key={index}>
                      {s.includes("Estacionamiento") ? (
                        <Tooltip title="Estacionamiento" placement="bottom">
                          {" "}
                          <LocalParkingIcon className={styles.icons} />{" "}
                        </Tooltip>
                      ) : null}
                    </div>
                    <div key={index}>
                      {s.includes("Rampa discapacitados") ? (
                        <Tooltip
                          title="Rampa para discapacitados"
                          placement="bottom"
                        >
                          <WheelchairPickupIcon className={styles.icons} />{" "}
                        </Tooltip>
                      ) : null}
                    </div>
                    <div key={index}>
                      {s.includes("Aire acondicionado") ? (
                        <Tooltip title="Aire acondicionado" placement="bottom">
                          <AcUnitIcon className={styles.icons} />{" "}
                        </Tooltip>
                      ) : null}
                    </div>
                    <div key={index}>
                      {s.includes("Silla para bebés") ? (
                        <Tooltip title="Silla para bebés" placement="bottom">
                          {" "}
                          <ChildCareIcon className={styles.icons} />{" "}
                        </Tooltip>
                      ) : null}
                    </div>
                    <div key={index}>
                      {s.includes("Cambiador para bebés") ? (
                        <Tooltip
                          title="Cambiador para bebés"
                          placement="bottom"
                        >
                          {" "}
                          <BabyChangingStationOutlinedIcon
                            className={styles.icons}
                          />{" "}
                        </Tooltip>
                      ) : null}
                    </div>
                    <div key={index}>
                      {s.includes("Comida vegetariana") ? (
                        <Tooltip title="Comida vegetariana" placement="bottom">
                          {" "}
                          <LuSalad className={styles.icons} />{" "}
                        </Tooltip>
                      ) : null}
                    </div>
                    <div key={index}>
                      {s.includes("Valet Parking") ? (
                        <Tooltip title="Valet Parking" placement="bottom">
                          <CarRentalIcon className={styles.icons} />{" "}
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
          libraries={["places"]} // Necesario para usar Autocomplete
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
          >
            {/* Marcador en la ubicación seleccionada */}
            {restaurantdetails && restaurantdetails.address && (
              <Marker position={center} />
            )}
          </GoogleMap>
        </LoadScript>
        {/*  <MapContainer center={position} zoom={13} className={styles.maps}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer> */}
      </div>

      <div className={styles.form_container}>
        <h2>Detalle de la reserva:</h2>

        <div>
          <strong>Restaurante:</strong> {formData.name}
        </div>
        {formData.location ? (
          <div>
            <strong>Local:</strong> {formData.location}
          </div>
        ) : null}

        {formData.date ? (
          <div>
            <strong>Fecha de reserva:</strong> {formData.date}
          </div>
        ) : null}
        {formData.hours ? (
          <div>
            <strong>Hora: </strong>
            {formData.hours}
          </div>
        ) : null}
        {formData.peoples ? (
          <div>
            <strong>Personas:</strong> {formData.peoples}
          </div>
        ) : null}
        {formData.area ? (
          <div>
            <strong>Zona:</strong> {formData.area}
          </div>
        ) : null}
      </div>
      {error ? (
        <p
          className="text-red-500 text-sm mt-2"
          style={{ textAlign: "center" }}
        >
          Completar todos los campos
        </p>
      ) : null}
      <div className={styles.btn_container}>
        <Button className={styles.btn_login} onClick={handleContinue}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
