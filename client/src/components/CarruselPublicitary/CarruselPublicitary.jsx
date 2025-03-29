import React, { useEffect, useState } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
import styles from "./CarruselPublicitary.module.css";
import axios from "axios";

const CarruselPublicitary = () => {
  const [Carrusels, setCarrusels] = useState([]);
  
  const allCarrusel = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/carousels");
      setCarrusels(response.data.data);
    } catch (error) {
      console.error("Error al obtener carruseles:", error);
    }
  };

  useEffect(() => {
    allCarrusel();
  }, []);

  useEffect(() => {
    if (Carrusels.length > 0) {
      const splide = new Splide(".splide", {
        type: "loop",
        rewind: true,
        pagination: false,
        autoplay: true,
        pauseOnHover: true,
        arrows: true,
        classes: {
          arrow: `splide__arrow ${styles.customPrevArrow}`,
          prev: `splide__arrow--prev ${styles.customPrevArrow}`,
          next: `splide__arrow--next ${styles.customNextArrow}`,
        },
      });

      splide.mount();

      return () => {
        splide.destroy();
      };
    }
  }, [Carrusels]); // Ejecuta este efecto solo cuando Carrusels cambia

  return (
    <div className={`splide ${styles.container_destac}`}>
      <div className="splide__track">
        <ul className="splide__list">
          {Carrusels.map((carousel, index) => (
            <li key={index} className="splide__slide">
              <img
                src={carousel.imageCarousel}
                alt={`Slide ${index + 1}`}
                className={styles.fullscreenImage}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarruselPublicitary;
