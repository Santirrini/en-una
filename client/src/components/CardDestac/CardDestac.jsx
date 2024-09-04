import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from "./CardDestac.module.css";
const FeaturedCarousel = () => {
  return (
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
          <SplideSlide>
            <Card className={styles.card}>
              <CardMedia
                component="img"
                image="https://www.comedera.com/wp-content/uploads/2022/06/jalea-mixta.jpg"
                alt="Paella dish"
                className={styles.img_destac}


              />
              <CardContent>
                <Typography
                  sx={{ textAlign: "center", textDecoration: "none" }}
                >
                  <img
                    src={require("../../Images/Logo.png")}
                    alt="Logo"
                    className={styles.logo_card}
                  />
                  Burguer
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center", textDecoration: "none" }}
                >
                  Hamburguesa
                </Typography>
              </CardContent>
            </Card>
          </SplideSlide>

          <SplideSlide>
            <Card className={styles.card}>
              <CardMedia
                component="img"
                height="194"
                image={require("../../Images/como-distribuir-un-restaurante.jpg")}
                alt="Paella dish"
                className={styles.img_destac}

              />
              <CardContent>
                <Typography
                  sx={{ textAlign: "center", textDecoration: "none" }}
                >
                  <img
                    src={require("../../Images/como-distribuir-un-restaurante.jpg")}
                    alt="Logo"
                    className={styles.logo_card}
                  />
                  Moni
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center", textDecoration: "none" }}
                >
                  Pizzeria
                </Typography>
              </CardContent>
            </Card>
          </SplideSlide>

          <SplideSlide>
            <Card className={styles.card}>
              <CardMedia
                component="img"
                height="194"
                image={require("../../Images/foto-simon-bosch.jpg")}
                alt="Paella dish"
                className={styles.img_destac}

              />
              <CardContent>
                <Typography
                  sx={{ textAlign: "center", textDecoration: "none" }}
                >
                  <img
                    src={require("../../Images/foto-simon-bosch.jpg")}
                    alt="Logo"
                    className={styles.logo_card}
                  />
                  Peruana
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center", textDecoration: "none" }}
                >
                  Criollas y mariscos
                </Typography>
              </CardContent>
            </Card>
          </SplideSlide>
        </Splide>
      </div>
    </div>
  );
};

export default FeaturedCarousel;
