import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailRestaurant } from "../../redux/action";
import DeleteIcon from "@mui/icons-material/Delete";

import { Result } from "antd";
import MenuDestacad from "./MenuDestacad";
import Piqueos from "./Piqueos";
import Entradas from "./Entradas";
import Segundos from "./Segundos";
import Bebidas from "./Bebidas";
import Postres from "./Postres";
import styles from "./MenuFood.module.css";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function MenuFood() {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const restaurantdetails = useSelector(
    (state) => state.restaurantdetails.data
  );
  const userId = useSelector((state) => state.userId);
  const [cartItems, setCartItems] = useState([]);
  const [reservation, setReservation] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const toggleSummary = () => {
    setShowSummary(!showSummary);
  };

  useEffect(() => {
    dispatch(DetailRestaurant(restaurantId));
  }, [dispatch, restaurantId]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    setCartItems(cart);
  }, []);

  useEffect(() => {
    const form = JSON.parse(localStorage.getItem(`form_${userId}`)) || {};
    setReservation(form);
  }, []);

  const handleRemove = (index) => {
    const newCartItems = cartItems.filter(
      (_, itemIndex) => itemIndex !== index
    );
    setCartItems(newCartItems);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(newCartItems));
  };

  const handleIncreaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity += 1;
    setCartItems(newCartItems);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(newCartItems));
  };

  const handleDecreaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1;
      setCartItems(newCartItems);
      localStorage.setItem(`cart_${userId}`, JSON.stringify(newCartItems));
    }
  };

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div>
      {restaurantdetails?.Menus.length === 0 ? (
        <Result title="No hay menús publicados" />
      ) : (
        <div>
          <h1 className={styles.text}>NUESTRA CARTA</h1>

          <div>
            <MenuDestacad
              setCartItems={setCartItems}
              setShowSummary={setShowSummary}
            />
          </div>
          <div>
            <Piqueos
              setCartItems={setCartItems}
              setShowSummary={setShowSummary}
            />
          </div>
          <div>
            <Entradas
              setCartItems={setCartItems}
              setShowSummary={setShowSummary}
            />
          </div>
          <div>
            <Segundos
              setCartItems={setCartItems}
              setShowSummary={setShowSummary}
            />
          </div>
          <div>
            <Bebidas
              setCartItems={setCartItems}
              setShowSummary={setShowSummary}
            />
          </div>
          <div>
            <Postres
              setCartItems={setCartItems}
              setShowSummary={setShowSummary}
            />
          </div>
          {cartItems.length > 0 && (
            <div className={styles.btn_reservation}>
              <Button
                onClick={toggleSummary}
                sx={{
                  display: "flex",
                  backgroundColor: "#500075",
                  color: "white",
                  ":hover": { backgroundColor: "#500075" },
                }}
              >
                {showSummary ? "Ocultar Resumen" : "Mostrar Resumen"}
              </Button>
            </div>
          )}
          {showSummary && cartItems.length > 0 ? (
            <div className={styles.form_container}>
              <div className={styles.title_cars}>Resumen de la reserva</div>

              <div className={styles.form_container_box}>
              <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Restaurante: {reservation[0] && reservation[0].formData.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Local: {reservation[0] && reservation[0].formData.location}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Fecha: {reservation[0]?.formData.date}
                </Typography>

                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Hora: {reservation[0]?.formData.hours}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Personas: {reservation[0]?.formData.peoples}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Zona: {reservation[0]?.formData.area}
                </Typography>
              </div>
              <div className={styles.menucar_container}>
                <div className={styles.menucar_food}>
                  {cartItems.map((item, index) => (
                    <Card className={styles.menucar_box} key={index}>
                      {item?.imageFile && item.imageFile[0] && (
                        <CardMedia
                          component="img"
                          className={styles.card_media}
                          image={item.imageFile[0]}
                          alt="Live from space album cover"
                        />
                      )}
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Typography
                            component="div"
                            variant="h5"
                            className={styles.title_food}
                          >
                            {item?.name}
                          </Typography>
                          <div className={styles.quantity_price}>
                            <Typography
                              variant="subtitle1"
                              color="text.secondary"
                              component="div"
                            >
                              cantidad: {item.quantity}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="text.secondary"
                              component="div"
                            >
                              S/
                              {parseFloat(item.price * item.quantity).toFixed(
                                2
                              )}
                            </Typography>
                          </div>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.2em",
                              }}
                            >
                              <div
                                onClick={() => handleDecreaseQuantity(index)}
                                className={styles.btn_decrease_increment}
                              >
                                -
                              </div>
                              <div className={styles.btn_decrease_increment}>
                                {item.quantity}
                              </div>
                              <div
                                onClick={() => handleIncreaseQuantity(index)}
                                className={styles.btn_decrease_increment}
                              >
                                +
                              </div>
                              <div
                                onClick={() => handleRemove(index)}
                                className={styles.btn_delete}
                              >
                                <DeleteIcon
                                  sx={{
                                    color: "white",
                                    marginLeft: "0.1em",
                                  }}
                                />
                              </div>
                            </Box>
                          </Box>
                        </CardContent>
                      </Box>
                    </Card>
                  ))}
                </div>
              </div>
              <div className={styles.prices_btn}>
                <div>
                  <strong>Total: </strong>s/{getTotal().toFixed(2)}
                </div>
                <div className={styles.payment_button}>
                  <Link to={`/carrito`}>
                    <Button
                      sx={{
                        display: "flex",
                        backgroundColor: "#500075",
                        width: "100%",
                        color: "white",
                        ":hover": { backgroundColor: "#500075" },
                      }}
                    >
                      Confirmar reserva
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
