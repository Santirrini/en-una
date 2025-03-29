import * as React from "react";
import { Result } from "antd";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AllRestaurant, dataPersonal } from "../../redux/action";

export default function Cards() {
  const dispatch = useDispatch();
  const allrestaurant = useSelector((state) => state.allrestaurant.data);
  const token = useSelector((state) => state.token);

  React.useEffect(() => {
    dispatch(AllRestaurant());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch, token]);

  return (
    <>
      <div>
        <div className={styles.cards_container}>
          {allrestaurant?.map((data) => {
            const firstRestaurant = data?.restaurants?.[0]; // Obtiene solo el primer restaurante
            if (!firstRestaurant) return null; // Si no hay restaurante, no renderiza nada

            return (
              <Link key={firstRestaurant.id} to={`/detalles/restaurante/${firstRestaurant.id}`}>
                <Card className={styles.card}>
                  <CardMedia
                    component="img"
                    image={firstRestaurant.imageFile?.[0] || "default-image-url.jpg"}
                    alt={firstRestaurant.imageFile?.[0] || "No Image"}
                    sx={{ height: 200 }}
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
                      <div>
                        <strong>{firstRestaurant.name}</strong>
                      </div>
                      {firstRestaurant.address}{" "}
                      {firstRestaurant.address_optional ? firstRestaurant.address_optional : null}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
