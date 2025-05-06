import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from "./CardDestac.module.css";
import { useSelector, useDispatch } from "react-redux";
import { AllRestaurant } from '../../redux/action';
import {Link} from 'react-router-dom';

const FeaturedCarousel = () => {
  const dispatch = useDispatch();
  const allrestaurant = useSelector((state) => state.allrestaurant?.data || []);
  
  const destac = allrestaurant.map((data) => data.restaurants.filter((info) => info.category === "destacado" ) )

  const ids = destac.map((data) => data?.map((info) => info?.id));
  
  React.useEffect(() => {
    dispatch(AllRestaurant());
  }, []);
  return (
    <>
      {destac?.length === 0 ? (
        <div></div>
      ): (


    <div className={styles.container_destac}>
      <div className={styles.box_destacado}>
        <h1 className={styles.text}>Destacados</h1>


        <Splide
          options={{
            type: "loop",
            perPage: 4, // Número de cards por página en pantallas grandes
            perMove: 1,
            pagination: false,
            autoplay: true,
            pauseOnHover: true,
            arrows: true,
            /* direction: 'ttb', */ // Cambia la dirección del carrusel a vertical
            breakpoints: {
              768: {
                perPage: 1, // Número de cards por página en pantallas menores o iguales a 768px
              },
              1440: {
                perPage: 3, // Número de cards por página en pantallas menores o iguales a 768px
              },
              
              1024: {
                perPage: 2, // Número de cards por página en pantallas menores o iguales a 768px
              },

              
            },
            classes: {
              arrow: `splide__arrow ${styles.customArrow}`,
              prev: `splide__arrow--prev ${styles.customPrev}`,
              next: `splide__arrow--next ${styles.customNext}`,
            },
          }}
          >
        {destac && destac.map((data, index) => (
 data?.map((info) => (

          <SplideSlide>
            <Link to={`/detalles/restaurante/${info.id}`}>
            <Card className={styles.card}>
              <CardMedia
                component="img"
                image={info?.imageFile[0] && info?.imageFile[0]}
                alt={info?.name}
                className={styles.img_destac}
                

                />
              <CardContent>
                <Typography
                  sx={{ textAlign: "center", textDecoration: "none" }}
                  >
                  <img
                    src={info.logo}
                    alt="Logo"
                    className={styles.logo_card}
                    />
                 {info.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center", textDecoration: "none" }}
                  >
                  {info.type_of_meals}
                </Typography>
              </CardContent>
            </Card>
            </Link>

          </SplideSlide>
 ))
        ))}

        </Splide>

      </div>
    </div>
      )}

                  </>
  );
};

export default FeaturedCarousel;
