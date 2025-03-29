import * as React from "react";
import { Result } from "antd";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import styles from "./AdminComplete.module.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Cards() {
  // Verifica que `allrestaurant` sea un array y proporciona un valor por defecto
  const allrestaurant = useSelector((state) => state.allrestaurant?.data || []);
  const [restaurants, setRestaurants] = React.useState(allrestaurant);
console.log(restaurants)
  React.useEffect(() => {
    setRestaurants(allrestaurant);
  }, [allrestaurant]);

  const handleToggleCategory = async (restaurantId, currentCategory) => {
    try {
      const newCategory = currentCategory === "destacado" ? "-" : "destacado";
      await axios.put("http://localhost:3001/api/restaurant-destac", {
        restaurantId,
        newCategory
      });
      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((restaurant) =>
          restaurant.id === restaurantId
            ? { ...restaurant, category: newCategory }
            : restaurant
        )
      );
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    }
  };

  return (
    <>
      {restaurants?.length === 0 ? (
        <div>
          <Result title="No hay restaurantes publicados" />
        </div>
      ) : (
        <div>
          <div className={styles.cards_container}>
            {restaurants.map((data) => (
              <div key={data.id} className={styles.card_wrapper}>
                <Link to={`/detalles/restaurante/${data.id}`}>
                  <Card className={styles.card}>
                    <CardMedia
                      component="img"
                      image={data.imageFile[0]}
                      alt={data.imageFile[0]}
                      sx={{ height: 200 }}
                    />
                    <CardContent className={styles.text_logo}>
                      <div>
                        <img
                          src={data.logo}
                          alt="Logo"
                          className={styles.logo_card}
                        />
                      </div>
                      <div>
                        <strong>{data.name}</strong>
                        <div>{data.address}</div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleToggleCategory(data.id, data.category)}
                  sx={{backgroundColor: data.category === "destacado" ? "#AF0000FF": "#500075", ":hover": { backgroundColor: data.category === "destacado" ? "#D20404FF": "#640192FF"}}}
                >
                  {data.category === "destacado" ? "Remover Destacado" : "Destacar"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
