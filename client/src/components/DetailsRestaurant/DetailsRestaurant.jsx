import styles from "./DetailsRestaurant.module.css";
import Button from "@mui/material/Button";

export default function DetailsRestaurant() {
  return (
    <div className={styles.food_container}>
      <div className={styles.food_box}>
        <div className={styles.img_container}>
          <img
            src="https://www.comedera.com/wp-content/uploads/2022/06/jalea-mixta.jpg"
            alt=""
          />
        </div>
        <div>
          <h1 className={styles.text_container}>Comida</h1>
          <h1 className={styles.text_box}>Dirección</h1>
          <p className={styles.text_p}>
            asdasdasdasdasdsasdasdasdawdasd asd asdasdasd asdasd asdasdsad
            asdasdasd asdasd asdasd
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
        <Button className={styles.btn_login}>Continuar</Button>
      </div>
    </div>
  );
}
