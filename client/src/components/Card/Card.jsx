import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AllRestaurant, dataPersonal } from "../../redux/action";
import { Box, Button } from "@mui/material";

export default function Cards({filteredRestaurants,}) {

  return (
    <>
      <Box sx={{ p: 2 }}>
    

        <div className={styles.cards_container}>
          {filteredRestaurants?.map((data) => {
            const firstRestaurant = data?.restaurants?.[0];
            if (!firstRestaurant) return null;

            return (
              <Link
                key={firstRestaurant.id}
                to={`/detalles/restaurante/${firstRestaurant.id}`}
              >
                <Card className={styles.card}>
                  <CardMedia
                    component="img"
                    image={
                      firstRestaurant.imageFile?.[0] ||
                      "default-image-url.jpg"
                    }
                    alt={firstRestaurant.name}
                    className={styles.imgCard}
                  />
                  <CardContent className={styles.text_logo}>
                    <div>
                      <img
                        src={firstRestaurant.logo}
                        alt="Logo"
                        className={styles.logo_card}
                      />
                    </div>
                    <div>
                      <strong>{firstRestaurant.name}</strong>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </Box>
    </>
  );
}
