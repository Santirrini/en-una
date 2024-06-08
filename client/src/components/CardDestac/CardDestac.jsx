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
        <h1 className={styles.text}>Lo mas destacados</h1>
        <Splide
          options={{
            type: "loop",
            perPage: 4,
            perMove: 1,
            pagination: false,
            autoplay: true,
            pauseOnHover: true,
          }}
        >

          <SplideSlide >
          <div  className={styles.splides} >
            <Card
              sx={{
                maxWidth: 345,
                ":hover": { boxShadow: "3px 5px 5px #cacaca", cursor: 'pointer' },
              }}
            >
              <CardMedia
                component="img"
                height="194"
                image="https://www.comedera.com/wp-content/uploads/2022/06/jalea-mixta.jpg"
                alt="Paella dish"
                sx={{ height: 200 }}
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
                  </div>
          </SplideSlide>
         
        </Splide>
      </div>
    </div>
  );
};

export default FeaturedCarousel;
