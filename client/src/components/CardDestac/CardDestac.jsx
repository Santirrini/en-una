import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from './CardDestac.module.css'
const FeaturedCarousel = () => {
  return (
    <div className={styles.container_destac}>
      <div className={styles.box_destacado}>

   <h1 className={styles.text}>
    Lo mas destacados
   </h1>
    <Splide
      options={{
        type: 'slide',
        perPage: 4,
        perMove: 1,
        gap: '1rem',
        pagination: false,
        autoplay: true,
        pauseOnHover: true,
      }}
      >
      <SplideSlide>
      <Card sx={{ maxWidth: 345,height: 400}}>
        <CardMedia
          component="img"
          height="194"
          image="https://www.comedera.com/wp-content/uploads/2022/06/jalea-mixta.jpg"
          alt="Paella dish"
          />
        <CardContent>
          <Typography sx={{ textAlign: "center" }}>Peruana</Typography>
        </CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", paddingBottom: "2em" }}
          >
          Criollas y mariscos
        </Typography>
      </Card>
      </SplideSlide>
      <SplideSlide>
      <Card sx={{ maxWidth: 345,height: 400}}>
        <CardMedia
          component="img"
          height="194"
          image="https://www.comedera.com/wp-content/uploads/2022/06/jalea-mixta.jpg"
          alt="Paella dish"
          />
        <CardContent>
          <Typography sx={{ textAlign: "center" }}>Peruana</Typography>
        </CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", paddingBottom: "2em" }}
          >
          Criollas y mariscos
        </Typography>
      </Card>
      </SplideSlide>
      <SplideSlide>
      <Card sx={{ maxWidth: 345,height: 400}}>
        <CardMedia
          component="img"
          height="194"
          image="https://www.comedera.com/wp-content/uploads/2022/06/jalea-mixta.jpg"
          alt="Paella dish"
          />
        <CardContent>
          <Typography sx={{ textAlign: "center" }}>Peruana</Typography>
        </CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", paddingBottom: "2em" }}
          >
          Criollas y mariscos
        </Typography>
      </Card>
      </SplideSlide>
      <SplideSlide>
      <Card sx={{ maxWidth: 345,height: 400}}>
        <CardMedia
          component="img"
          height="194"
          image="https://www.comedera.com/wp-content/uploads/2022/06/jalea-mixta.jpg"
          alt="Paella dish"
          />
        <CardContent>
          <Typography sx={{ textAlign: "center" }}>Peruana</Typography>
        </CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", paddingBottom: "2em" }}
          >
          Criollas y mariscos
        </Typography>
      </Card>
      </SplideSlide>
      <SplideSlide>
      <Card sx={{ maxWidth: 345,height: 400}}>
        <CardMedia
          component="img"
          height="194"
          image="https://www.comedera.com/wp-content/uploads/2022/06/jalea-mixta.jpg"
          alt="Paella dish"
          />
        <CardContent>
          <Typography sx={{ textAlign: "center" }}>Peruana</Typography>
        </CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", paddingBottom: "2em" }}
          >
          Criollas y mariscos
        </Typography>
      </Card>
      </SplideSlide>
      <SplideSlide>
      <Card sx={{ maxWidth: 345,height: 400}}>
        <CardMedia
          component="img"
          height="194"
          image="https://www.comedera.com/wp-content/uploads/2022/06/jalea-mixta.jpg"
          alt="Paella dish"
          />
        <CardContent>
          <Typography sx={{ textAlign: "center" }}>Peruana</Typography>
        </CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", paddingBottom: "2em" }}
          >
          Criollas y mariscos
        </Typography>
      </Card>
      </SplideSlide>
      <SplideSlide>
      <Card sx={{ maxWidth: 345,height: 400}}>
        <CardMedia
          component="img"
          height="194"
          image="https://www.comedera.com/wp-content/uploads/2022/06/jalea-mixta.jpg"
          alt="Paella dish"
          />
        <CardContent>
          <Typography sx={{ textAlign: "center" }}>Peruana</Typography>
        </CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", paddingBottom: "2em" }}
          >
          Criollas y mariscos
        </Typography>
      </Card>
      </SplideSlide>
    </Splide>
    </div>

          </div>
  );
};

export default FeaturedCarousel;
