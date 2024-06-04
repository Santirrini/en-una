import React, { useEffect, useState } from "react";
import styles from "./DetailsRestaurant.module.css";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DetailRestaurant } from "../../redux/action";
import { Image } from "antd";

export default function DetailsRestaurant() {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const restaurantdetails = useSelector(
    (state) => state.restaurantdetails.data
  );
  console.log(restaurantdetails);

  const [formData, setFormData] = useState({
    date: "",
    hours: "",
    peoples: "",
    location: "",
    open: "",
  });
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

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
    if (
      formData.date &&
      formData.hours &&
      formData.peoples &&
      formData.location
    ) {
      const updatedCart = [...items, { formData }];
      localStorage.setItem("form", JSON.stringify(updatedCart));
      navigate(`/menu/restaurante/${restaurantId}`);
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.food_container}>
      <div className={styles.food_box}>
        <div>
          <Image.PreviewGroup items={restaurantdetails?.imageFile}>
            <Image
              src={restaurantdetails && restaurantdetails.imageFile[0]}
              alt="Foto del restaurante"
              style={{ maxWidth: "100%", width: 600 }}
            />
          </Image.PreviewGroup>
        </div>
        <div>
          <h1 className={styles.text_container}>
            {restaurantdetails && restaurantdetails.name}
          </h1>
          <h1 className={styles.text_box}>
            {restaurantdetails && restaurantdetails.address},{" "}
            {restaurantdetails && restaurantdetails.address_optional
              ? restaurantdetails.address_optional
              : null}
          </h1>
          <span>
            <strong>Correo electrónico: </strong>
            {restaurantdetails && restaurantdetails.email}
          </span>
          <br />
          <span>
            <strong>Teléfono: </strong>
            {restaurantdetails && restaurantdetails.phone}
          </span>
          <br />
          <p className={styles.text_p}>
            {restaurantdetails && restaurantdetails.details}
          </p>

            {restaurantdetails && restaurantdetails.horarios.map( (data) => (

              
              <p className={styles.text_p}>
                {data.dia}: {data.inicio} - {data.fin}
          </p>
              )
          )}
        </div>
      </div>
      <br />
      <hr />
      <br />

      <form className={styles.select_container}>
        <label htmlFor="location">Local</label>
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="h-[2.75rem] outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
          required
        >
          <option value="">Seleccionar la local</option>
          <option value="80">80</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="300">300</option>
        </select>

        <label htmlFor="date">Fecha</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="h-[2.75rem] outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
          required
        />

        <label htmlFor="hours">Hora</label>
        <select
          name="hours"
          value={formData.hours}
          onChange={handleChange}
          className="h-[2.75rem] outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
          required
        >
          <option value="">Seleccionar horario</option>
              <option value="00:00">00:00</option>
              <option value="00:30">0:30</option>
              <option value="01:00">01:00</option>
              <option value="01:30">01:30</option>
              <option value="02:00">01:30</option>
              <option value="02:30">02:30</option>
              <option value="03:00">03:00</option>
              <option value="03:30">03:30</option>
              <option value="04:00">04:00</option>
              <option value="04:30">04:30</option>
              <option value="05:00">05:00</option>
              <option value="05:30">05:30</option>
              <option value="06:00">06:00</option>
              <option value="06:30">06:30</option>
              <option value="07:00">07:00</option>
              <option value="07:30">07:30</option>
              <option value="08:00">08:00</option>
              <option value="08:30">08:30</option>
              <option value="09:00">09:00</option>
              <option value="09:30">09:30</option>
              <option value="10:00">09:30</option>
              <option value="10:30">10:30</option>
              <option value="11:00">11:00</option>
              <option value="11:30">11:30</option>
              <option value="12:00">12:00</option>
              <option value="12:30">12:30</option>
              <option value="13:00">13:00</option>
              <option value="13:30">13:30</option>
              <option value="14:00">14:00</option>
              <option value="14:30">14:30</option>
              <option value="15:00">15:00</option>
              <option value="15:30">15:30</option>
              <option value="16:00">16:00</option>
              <option value="16:30">16:30</option>
              <option value="17:00">17:00</option>
              <option value="17:30">17:30</option>
              <option value="18:00">18:00</option>
              <option value="18:30">18:30</option>
              <option value="19:00">19:00</option>
              <option value="19:30">19:30</option>
              <option value="20:00">20:00</option>
              <option value="20:30">20:30</option>
              <option value="21:00">21:00</option>
              <option value="21:30">21:30</option>
              <option value="22:00">22:00</option>
              <option value="22:30">22:30</option>
              <option value="23:00">23:00</option>
              <option value="23:30">23:30</option>

        </select>

        <label htmlFor="peoples">Personas</label>
        <select
          name="peoples"
          value={formData.peoples}
          onChange={handleChange}
          className="h-[2.75rem] outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
          required
        >
          <option value="">Seleccionar la cantidad de personas</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">1</option>
          <option value="10">2</option>
          <option value="11">3</option>
          <option value="12">4</option>
          <option value="13">5</option>
          <option value="14">6</option>
          <option value="15">7</option>
          <option value="16">8</option>
          <option value="17">1</option>
          <option value="18">2</option>
          <option value="19">3</option>
          <option value="20">4</option>
          <option value="21">5</option>
          <option value="22">6</option>
          <option value="23">7</option>
          <option value="24">8</option>
          <option value="25">1</option>
          <option value="26">2</option>
          <option value="27">3</option>
          <option value="28">4</option>
          <option value="29">5</option>
          <option value="30">6</option>
          <option value="31">7</option>
          <option value="32">8</option>
        </select>
      </form>
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
