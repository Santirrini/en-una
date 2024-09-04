import React, { useEffect, useState } from "react";
import styles from "./DetailsRestaurant.module.css";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DetailRestaurant } from "../../redux/action";
import { Image } from "antd";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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
import { useLocation } from 'react-router-dom';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function DetailsRestaurant() {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const restaurantdetails = useSelector(
    (state) => state.restaurantdetails.data
  );

  const position = [51.505, -0.09];
  const [formData, setFormData] = useState({
    date: "",
    hours: "",
    peoples: "",
    local: "",
    area: "",
  });
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    dispatch(DetailRestaurant(restaurantId));
  }, [dispatch, restaurantId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleContinue = () => {
    // Verificar si todos los campos tienen un valor
    /*     if (formData.date && formData.hours && formData.peoples && formData.local) { */
    const updatedCart = [...items, { formData }];
    localStorage.setItem("form", JSON.stringify(updatedCart));
    navigate(`/menu/restaurante/${restaurantId}`);
    /*    } else {
      setError(true);
    } */
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
          </h1>
          <h1 className={styles.text_box}>
            {restaurantdetails && restaurantdetails.address},{" "}
            {restaurantdetails && restaurantdetails.address_optional
              ? restaurantdetails.address_optional
              : null}
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
                      <div key={index} >
                        {data.cerrado ? "" : `${data.dia},`}
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
            <label htmlFor="local" className={styles.title}>
              Local
            </label>
            <select
              name="local"
              value={formData.local}
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
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="h-[2.75rem] outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
              min={today}
              required
            />
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
              Personas
            </label>
            <input
    type="number"
    id="peoples"
    name="peoples"
    value={formData.peoples || ''}
    min={1}
    max={restaurantdetails?.maximum_person_per_table || 10}
    onChange={(e) => {
      // Convierte el valor ingresado a número
      const value = Number(e.target.value);

      // Obtén el valor máximo permitido
      const max = restaurantdetails?.maximum_person_per_table || 10;

      // Asegúrate de que el valor esté dentro del rango permitido
      if (!isNaN(value) && (value === '' || (value >= 1 && value <= max))) {
        setFormData({ ...formData, peoples: value });
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
        <MapContainer center={position} zoom={13} className={styles.maps}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className={styles.form_container}>
        <h2>Detalle de la reserva:</h2>
        {formData.local ? (
          <div>
            <strong>Local:</strong> {formData.local}
          </div>
        ) : null}

        {formData.date ? (
          <div>
            <strong>Fecha:</strong> {formData.date}
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
