import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DetailRestaurant } from "../../redux/action";
import DeleteIcon from "@mui/icons-material/Delete";

import { Result } from "antd";
import MenuDestacad from "./MenuDestacad";
import Piqueos from "./Piqueos";
import Entradas from "./Entradas";
import Segundos from "./Segundos";
import Bebidas from "./Bebidas";
import Postres from "./Postres";
import Promociones from "./Promociones";


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
import Ensaladas from "./Ensaladas";

export default function MenuFood() {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const restaurantdetails = useSelector(
    (state) => state.restaurantdetails.data
  );
  const [quantities, setQuantities] = useState({});

  const userId = useSelector((state) => state.userId);
  const [cartItems, setCartItems] = useState([]);
  const [reservation, setReservation] = useState({});
  const [showSummary, setShowSummary] = useState(true);
  const buttonRef = useRef(null); // Referencia al botón
  const contentRef = useRef(null); // Referencia al botón


  
  const toggleSummary = () => {
    setShowSummary(!showSummary);
  };

  const toggleSummaryFalse = () => {
    setShowSummary(false);
  };

  const toggleSummaryTrue = () => {
    setShowSummary(true);
  };

  useEffect(() => {
    dispatch(DetailRestaurant(restaurantId));
  }, [dispatch, restaurantId]);


  useEffect(() => {
    // Leer el carrito de localStorage usando el userId y sincronizar las cantidades en el menú
    const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    setCartItems(cart);

    // Sincronizar las cantidades de los productos en el menú
    const initialQuantities = {};
    cart.forEach((item) => {
      initialQuantities[item.id] = item.quantity;
    });
    setQuantities(initialQuantities);
  }, [setCartItems, userId]);


  const handleQuantityChange = (id, amount) => {
    // Actualizar la cantidad en el estado local
    setQuantities((prevQuantities) => {
      const newQuantity = Math.max(0, (prevQuantities[id] || 0) + amount);
      return { ...prevQuantities, [id]: newQuantity };
    });

    // Actualizar la cantidad en el carrito
    updateCart(id, amount);
  };

  const handleRemove = (index) => {
    const removedItem = cartItems[index];
    const newCartItems = cartItems.filter(
      (_, itemIndex) => itemIndex !== index
    );
    setCartItems(newCartItems);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(newCartItems));
  
    // Establecer la cantidad en 0 para el producto eliminado
    if (removedItem?.id) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [removedItem.id]: 0,
      }));
    }
  };
  
  const updateCart = (productId, amount) => {
    // Obtener el carrito actual de localStorage
    const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

    // Buscar si el producto ya está en el carrito
    let updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + amount };
      }
      return item;
    });

    // Si el producto no está en el carrito, agregarlo si la cantidad es mayor a 0
    const productInMenu = restaurantdetails.Menus.find((menu) => menu.id === productId);
    const newQuantity = quantities[productId] + amount;
    if (newQuantity > 0 && !cart.some((item) => item.id === productId)) {
      updatedCart.push({
        id: productInMenu.id,
        name: productInMenu.name,
        price: productInMenu.price,
        details: productInMenu.details,
        quantity: newQuantity,
        imageFile: productInMenu.imageFile,
        restaurantId: productInMenu.restaurantId,
      });
    }

    // Eliminar productos con cantidad 0
    updatedCart = updatedCart.filter((item) => item.quantity > 0);

    // Actualizar localStorage y el estado del carrito
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };
  useEffect(() => {
    const form = JSON.parse(localStorage.getItem(`form_${userId}`)) || {};
    setReservation(form);
  }, []);





  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleContinue = () => {
    const test =  cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const consumitionPeoples =  reservation[0]?.formData?.peoples * restaurantdetails.minimum_consumption ;
    if (test >=  consumitionPeoples ) {
      navigate("/carrito")
    } else{
      alert("Debes consumir al menos S/" + consumitionPeoples)
    }
  }

  const limitarName = (texto) => {
    const limite = window.innerWidth <= 768 ? 14 : 18; // 10 caracteres en pantallas pequeñas, 30 en pantallas grandes
    if (texto.length > limite) {
      return texto.slice(0, limite) + "...";
    }
    return texto;
  };
  return (
    <div>
      {restaurantdetails?.Menus.length === 0 ? (
        <Result title="No hay menús publicados" />
      ) : (
        <div>
          <h1 className={styles.text}>NUESTRA CARTA</h1>

            <MenuDestacad
              setCartItems={setCartItems}
              setShowSummary={setShowSummary}
              setQuantities={setQuantities}
              quantities={quantities}
              toggleSummaryFalse={toggleSummaryFalse}
              toggleSummaryTrue={toggleSummaryTrue}
              buttonRef={buttonRef}
              contentRef={contentRef}
            />

            <Promociones
              setCartItems={setCartItems}
              setShowSummary={setShowSummary}
              setQuantities={setQuantities}
              quantities={quantities}
              
            />
            <Piqueos
              setCartItems={setCartItems}
              setShowSummary={setShowSummary}
              setQuantities={setQuantities}
              quantities={quantities}
            />

            <Ensaladas
              setCartItems={setCartItems}
              setShowSummary={setShowSummary}
              setQuantities={setQuantities}
              quantities={quantities}
            />
            <Entradas
              setCartItems={setCartItems}
              setShowSummary={setShowSummary}
              setQuantities={setQuantities}
              quantities={quantities}
            />
            <Segundos
              setCartItems={setCartItems}
              setShowSummary={setShowSummary}
              setQuantities={setQuantities}
              quantities={quantities}
            />
            <Bebidas
              setCartItems={setCartItems}
              setShowSummary={setShowSummary}
              setQuantities={setQuantities}
              quantities={quantities}
            />
            <Postres
              setCartItems={setCartItems}
              setShowSummary={setShowSummary}
              setQuantities={setQuantities}
              quantities={quantities}
            />
          {cartItems.length > 0 && showSummary === false ? (
            <div className={styles.btn_reservation}>
              <Button
              ref={buttonRef}
                onClick={toggleSummary}
                className={styles.carddesplegable}
             
              >
                {showSummary ? "Ocultar Resumen" : "Mostrar Resumen"}
              </Button>
            </div>
          ): null}
          {showSummary && cartItems.length > 0 ? (
            <div className={styles.form_container}  ref={contentRef}>
              <div className={styles.title_cars}>Resumen de la reserva</div>

              <div className={styles.form_container_box}>
              <Typography
                  variant="subtitle1"
                  color="black"
                  component="div"
                >
                  Restaurante: <span style={{fontWeight: "bold"}}> {reservation[0] && reservation[0].formData.name}</span>
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="black"
                  component="div"
                >
                  Local: {reservation[0] && reservation[0].formData.location}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="black"
                  component="div"
                >
                  Fecha: {reservation[0]?.formData.date}
                </Typography>

                <Typography
                  variant="subtitle1"
                  color="black"
                  component="div"
                >
                  Hora: {reservation[0]?.formData.hours}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="black"
                  component="div"
                >
                  Personas: {reservation[0]?.formData.peoples}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="black"
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
                            {limitarName(item?.name)}
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
                                onClick={() => handleQuantityChange(item.id, -1)}
                                className={styles.btn_decrease_increment}
                              >
                                -
                              </div>
                              <div className={styles.btn_decrease_increment}>
                                {item.quantity}
                              </div>
                              <div
                                onClick={() => handleQuantityChange(item.id, 1)}
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
              <div >
                <div>
                  <strong>Total: </strong>S/{getTotal().toFixed(2)}
                </div>
                <div className={styles.payment_button}>
                  <div>

                    <Button
                      sx={{
                        display: "flex",
                        backgroundColor: "#500075",
                        width: "100%",
                        color: "white",
                        ":hover": { backgroundColor: "#500075" },
                      }}
                      onClick={handleContinue}
                      >
                      Confirmar reserva
                    </Button>
                    </div>

                    <div>

                    <Button
                       sx={{
                        display: "flex",
                        backgroundColor: "#FFFF89",
                        width: "100%",
                        color: "#500075",
                        fontWeight: "bold",
                        ":hover": { backgroundColor: "#FFFF89" },
                      }}
                                 className={styles.carddesplegablecard}

                      onClick={toggleSummary}
                      >
                      Ocultar Resumen
                    </Button>
                    
                      </div>
                 
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
