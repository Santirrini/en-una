import React, { useEffect } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
import styles from "./CarruselPublicitary.module.css";

const CarruselPublicitary = () => {
  useEffect(() => {
    const splide = new Splide(".splide", {
      type  : 'fade',
  rewind: true,
      pagination: false, // Cambiado a false ya que tu CSS maneja la paginación
      autoplay: true,
      pauseOnHover: true,
      arrows: true,

      classes: {
        arrow: `splide__arrow ${styles.customPrevArrow}`,
        prev: `splide__arrow--prev ${styles.customPrevArrow }`,
        next: `splide__arrow--next ${styles.customNextArrow }`,
      },
    });

    splide.mount();

    return () => {
      splide.destroy();
    };
  }, []);

  return (
    <div className={`splide ${styles.container_destac}`}>
      <div className="splide__track">
        <ul className="splide__list">
          <li className="splide__slide">
            <img
              src="https://www.comedera.com/wp-content/uploads/2022/06/jalea-mixta.jpg"
              alt="Slide 1"
              className={styles.fullscreenImage}
            />
          </li>
          <li className="splide__slide">
            <img
              src={require("../../Images/como-distribuir-un-restaurante.jpg")}
              alt="Slide 2"
              className={styles.fullscreenImage}
            />
          </li>
          <li className="splide__slide">
            <img
              src={require("../../Images/foto-simon-bosch.jpg")}
              alt="Slide 3"
              className={styles.fullscreenImage}
            />
          </li>
        </ul>
      </div>

   
    </div>
  );
};

export default CarruselPublicitary;
