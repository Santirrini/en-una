import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AllRestaurant, dataPersonal } from "../../redux/action";
import { Box, Button } from "@mui/material";

export default function Cards({ filteredRestaurants }) {
  return (
    <>
      <Box sx={{ p: 2 }} data-oid="dg.o5kw">
        <div className={styles.cards_container} data-oid="aaxvnqe">
          {filteredRestaurants?.map((data) => {
            const firstRestaurant = data?.restaurants?.[0];
            if (!firstRestaurant) return null;

            return (
              <Link
                key={firstRestaurant.id}
                to={`/detalles/restaurante/${firstRestaurant.id}`}
                data-oid="3e.s72p"
              >
                <Card className={styles.card} data-oid="fx_8w4d">
                  <CardMedia
                    component="img"
                    image={
                      firstRestaurant.imageFile?.[0] || "default-image-url.jpg"
                    }
                    alt={firstRestaurant.name}
                    className={styles.imgCard}
                    data-oid="o4apu2n"
                  />

                  <CardContent className={styles.text_logo} data-oid="kty7a5c">
                    <div data-oid="bm:9xa-">
                      <img
                        src={firstRestaurant.logo}
                        alt="Logo"
                        className={styles.logo_card}
                        data-oid="250oqve"
                      />
                    </div>
                    <div data-oid="suq84_g">
                      <strong data-oid="10g:jjg">{firstRestaurant.name}</strong>
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
