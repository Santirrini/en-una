import {useEffect} from 'react';
import styles from "./DetailsRestaurant.module.css";
import Button from "@mui/material/Button";
import {useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { DetailRestaurant } from '../../redux/action';


export default function DetailsRestaurant() {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
const restaurantdetails = useSelector(state => state.restaurantdetails.data);

useEffect(() => {
  dispatch(DetailRestaurant(restaurantId))
}, [dispatch, restaurantId]);
  
  return (
    <div className={styles.food_container}>
      <div className={styles.food_box}>
        <div className={styles.img_container}>
          <img
            src={restaurantdetails && restaurantdetails.imageFile[0]}
            alt="Foto del restaurante"
          />
        </div>
        <div>
          <h1 className={styles.text_container}> {restaurantdetails && restaurantdetails.name}</h1>
          <h1 className={styles.text_box}>{restaurantdetails && restaurantdetails.address}, { restaurantdetails &&  restaurantdetails.address_optional ? restaurantdetails.address_optional : null} </h1>
          
           <span><strong>Correo electrónico: </strong>{restaurantdetails && restaurantdetails.email}</span>
          <br />
           <span><strong>Telefóno: </strong>{restaurantdetails && restaurantdetails.phone}</span>

           <br />
         
          <p className={styles.text_p}>
        {restaurantdetails && restaurantdetails.details}
          </p>
        </div>
      </div>
      <div className={styles.select_container}>
        <label htmlFor="">Fecha</label>
        <input
          type="date"
          className="h-[2.75rem] outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
        />

        <label htmlFor="">Hora</label>

        <select
          name=""
          id=""
          className="h-[2.75rem] outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
        >
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
        </select>
        <label htmlFor="">Personas</label>

        <select
          name=""
          id=""
          className="h-[2.75rem] outline-none border border-gray-300 rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all"
        >
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
        </select>
      </div>
      <div className={styles.btn_container}>
      <Link to={`/menu/restaurante/${restaurantId}`}>

        <Button className={styles.btn_login}>Continuar</Button>
      </Link>
      </div>
    </div>
  );
}
