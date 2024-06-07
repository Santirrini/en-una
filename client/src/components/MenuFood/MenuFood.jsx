import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailRestaurant } from "../../redux/action";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./MenuFood.module.css";
import { Result } from "antd";

export default function MenuFood() {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const restaurantdetails = useSelector(
    (state) => state.restaurantdetails.data
  );
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1); // Estado para la cantidad seleccionada

  useEffect(() => {
    dispatch(DetailRestaurant(restaurantId));
  }, [dispatch, restaurantId]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length > 0 && cart[0].restaurantId !== product.restaurantId) {
      alert("Solo puedes agregar menús del mismo restaurante al carrito.");
      return;
    }

    let updatedCart = [...cart];
    let found = false;
    updatedCart.forEach((item) => {
      if (item.name === product.name) {
        item.quantity += quantity; // Incrementar la cantidad seleccionada
        found = true;
      }
    });

    if (!found) {
      updatedCart.push({
        name: product.name,
        price: product.price,
        quantity: quantity, // Usar la cantidad seleccionada
        imageFile: product.imageFile,
        restaurantId: product.restaurantId,
      });
    }

    setCartItems([...updatedCart]);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Guardar en localStorage
  };

  return (
    <div>
      {restaurantdetails?.Menus.length === 0 ? (
        <div>
          <Result title="No hay menús publicados" />
        </div>
      ) : (
        <>
          <h1 className={styles.text}>Menu</h1>
          <div className={styles.menufood_container}>
            {restaurantdetails?.Menus.map((data) => (
              <Card className={styles.menufood_box} key={data.id}>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={data.imageFile[0]}
                  alt="Live from space album cover"
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      {data.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      ${data.price}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      pl: 1,
                      pb: 1,
                      justifyContent: "center",
                      gap: "1em",
                    }}
                  >
                    <Button
                      sx={{ display: "flex", flex: 1 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <TextField
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value)))
                      }
                      inputProps={{ min: 1 }}
                      variant="outlined"
                      size="small"
                      sx={{ width: 50, textAlign: "center" }}
                    />
                    <Button
                      sx={{ display: "flex", flex: 1 }}
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                    <Button
                      sx={{ display: "flex", flex: 2 }}
                      onClick={() => addToCart(data)}
                    >
                      AGREGAR AL CARRITO
                    </Button>
                  </Box>
                </Box>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
