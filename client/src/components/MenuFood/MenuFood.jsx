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
import { Link } from "react-router-dom";


export default function MenuFood() {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const restaurantdetails = useSelector(
    (state) => state.restaurantdetails.data
  );
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({}); // Estado para las cantidades de cada ítem

  useEffect(() => {
    dispatch(DetailRestaurant(restaurantId));
  }, [dispatch, restaurantId]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleQuantityChange = (id, amount) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(1, (prevQuantities[id] || 1) + amount),
    }));
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length > 0 && cart[0].restaurantId !== product.restaurantId) {
      alert("Solo puedes agregar menús del mismo restaurante al carrito.");
      return;
    }

    const quantity = quantities[product.id] || 1; // Usar la cantidad específica para este producto

    let updatedCart = [...cart];
    let found = false;
    updatedCart.forEach((item) => {
      if (item.name === product.name) {
        item.quantity += quantity;
        found = true;
      }
    });

    if (!found) {
      updatedCart.push({
        name: product.name,
        price: product.price,
        quantity: quantity,
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
                  sx={{ maxWidth: "100%", width: 300, height: 151 }}
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
                             sx={{
                              color: "#500075",
                              border: "1px solid #500075",
                              ":hover": { border: "1px solid #500075" },
                              
                            }}
                      onClick={() => handleQuantityChange(data.id, -1)}
                   
                   >
                      -
                    </Button>
                    <TextField
                      type="number"
                      value={quantities[data.id] || 1}
                      onChange={(e) =>
                        setQuantities((prevQuantities) => ({
                          ...prevQuantities,
                          [data.id]: Math.max(1, parseInt(e.target.value)),
                        }))
                      }
                      inputProps={{ min: 1 }}
                      variant="outlined"
                      size="small"
                      sx={{ width: 50, textAlign: "center",  color: "#500075",
                        outline: "none",   }}
                        disabled
                    />
                    <Button
                            sx={{
                              color: "#500075",
                              border: "1px solid #500075",
                              ":hover": { border: "1px solid #500075" },
                            }}
                      onClick={() => handleQuantityChange(data.id, 1)}
                    >
                      +
                    </Button>
                  </Box>
                    <Button
                      sx={{ display: "flex", flex: 2, backgroundColor: "#500075", color: "white", ":hover": {backgroundColor: "#500075"} }}
                      onClick={() => addToCart(data)}
                    >
                      AGREGAR AL CARRITO
                    </Button>
                </Box>
              </Card>
            ))}
          </div>
          <div className={styles.btn_container}>
            <Link to= "/carrito">
            <Button className={styles.btn_login} >
            IR AL CARRITO
            </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
