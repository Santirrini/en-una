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
    (state) => state.restaurantdetails.data,
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
      (_, itemIndex) => itemIndex !== index,
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
    const productInMenu = restaurantdetails.Menus.find(
      (menu) => menu.id === productId,
    );
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
      0,
    );
  };

  const handleContinue = () => {
    const test = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    const consumitionPeoples =
      reservation[0]?.formData?.peoples * restaurantdetails.minimum_consumption;
    if (test >= consumitionPeoples) {
      navigate("/carrito");
    } else {
      alert("Debes consumir al menos S/" + consumitionPeoples);
    }
  };

  const limitarName = (texto) => {
    const limite = window.innerWidth <= 768 ? 14 : 18; // 10 caracteres en pantallas pequeñas, 30 en pantallas grandes
    if (texto.length > limite) {
      return texto.slice(0, limite) + "...";
    }
    return texto;
  };
  return (
    <div data-oid="hwvj91b">
      {restaurantdetails?.Menus.length === 0 ? (
        <Result title="No hay menús publicados" data-oid="qhpl5pc" />
      ) : (
        <div data-oid="rls50le">
          <h1 className={styles.text} data-oid=":7lk7.i">
            NUESTRA CARTA
          </h1>

          <MenuDestacad
            setCartItems={setCartItems}
            setShowSummary={setShowSummary}
            setQuantities={setQuantities}
            quantities={quantities}
            toggleSummaryFalse={toggleSummaryFalse}
            toggleSummaryTrue={toggleSummaryTrue}
            buttonRef={buttonRef}
            contentRef={contentRef}
            data-oid="ipns8j3"
          />

          <Promociones
            setCartItems={setCartItems}
            setShowSummary={setShowSummary}
            setQuantities={setQuantities}
            quantities={quantities}
            data-oid="js9hf42"
          />

          <Piqueos
            setCartItems={setCartItems}
            setShowSummary={setShowSummary}
            setQuantities={setQuantities}
            quantities={quantities}
            data-oid="bratx2z"
          />

          <Ensaladas
            setCartItems={setCartItems}
            setShowSummary={setShowSummary}
            setQuantities={setQuantities}
            quantities={quantities}
            data-oid="ncotviy"
          />

          <Entradas
            setCartItems={setCartItems}
            setShowSummary={setShowSummary}
            setQuantities={setQuantities}
            quantities={quantities}
            data-oid="5mjxrav"
          />

          <Segundos
            setCartItems={setCartItems}
            setShowSummary={setShowSummary}
            setQuantities={setQuantities}
            quantities={quantities}
            data-oid="8rh-:20"
          />

          <Bebidas
            setCartItems={setCartItems}
            setShowSummary={setShowSummary}
            setQuantities={setQuantities}
            quantities={quantities}
            data-oid="4t6ahav"
          />

          <Postres
            setCartItems={setCartItems}
            setShowSummary={setShowSummary}
            setQuantities={setQuantities}
            quantities={quantities}
            data-oid=".:0-yyi"
          />

          {cartItems.length > 0 && showSummary === false ? (
            <div className={styles.btn_reservation} data-oid="kgnjj6-">
              <Button
                ref={buttonRef}
                onClick={toggleSummary}
                className={styles.carddesplegable}
                data-oid="r_jki90"
              >
                {showSummary ? "Ocultar Resumen" : "Mostrar Resumen"}
              </Button>
            </div>
          ) : null}
          {showSummary && cartItems.length > 0 ? (
            <div
              className={styles.form_container}
              ref={contentRef}
              data-oid="hm8ijti"
            >
              <div className={styles.title_cars} data-oid="ud39_7:">
                Resumen de la reserva
              </div>

              <div className={styles.form_container_box} data-oid="ytc3e2v">
                <Typography
                  variant="subtitle1"
                  color="black"
                  component="div"
                  data-oid="nvzladg"
                >
                  Restaurante:{" "}
                  <span style={{ fontWeight: "bold" }} data-oid="th2yfpq">
                    {" "}
                    {reservation[0] && reservation[0].formData.name}
                  </span>
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="black"
                  component="div"
                  data-oid="8drndy3"
                >
                  Local: {reservation[0] && reservation[0].formData.location}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="black"
                  component="div"
                  data-oid="1k6khtz"
                >
                  Fecha: {reservation[0]?.formData.date}
                </Typography>

                <Typography
                  variant="subtitle1"
                  color="black"
                  component="div"
                  data-oid="w.:.rbk"
                >
                  Hora: {reservation[0]?.formData.hours}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="black"
                  component="div"
                  data-oid=":ddxgy0"
                >
                  Personas: {reservation[0]?.formData.peoples}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="black"
                  component="div"
                  data-oid="jtchhfy"
                >
                  Zona: {reservation[0]?.formData.area}
                </Typography>
              </div>
              <div className={styles.menucar_container} data-oid="8.cpafs">
                <div className={styles.menucar_food} data-oid="4:1f7eb">
                  {cartItems.map((item, index) => (
                    <Card
                      className={styles.menucar_box}
                      key={index}
                      data-oid="4pkvapx"
                    >
                      {item?.imageFile && item.imageFile[0] && (
                        <CardMedia
                          component="img"
                          className={styles.card_media}
                          image={item.imageFile[0]}
                          alt="Live from space album cover"
                          data-oid="1-m.m87"
                        />
                      )}
                      <Box
                        sx={{ display: "flex", flexDirection: "column" }}
                        data-oid="oombi1m"
                      >
                        <CardContent
                          sx={{ flex: "1 0 auto" }}
                          data-oid="855s9y7"
                        >
                          <Typography
                            component="div"
                            variant="h5"
                            className={styles.title_food}
                            data-oid="-glsrck"
                          >
                            {limitarName(item?.name)}
                          </Typography>
                          <div
                            className={styles.quantity_price}
                            data-oid="_obhz3h"
                          >
                            <Typography
                              variant="subtitle1"
                              color="text.secondary"
                              component="div"
                              data-oid="jyxfiph"
                            >
                              cantidad: {item.quantity}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="text.secondary"
                              component="div"
                              data-oid="rhmgf57"
                            >
                              S/
                              {parseFloat(item.price * item.quantity).toFixed(
                                2,
                              )}
                            </Typography>
                          </div>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                            data-oid="6.059_g"
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.2em",
                              }}
                              data-oid="6xpcq:k"
                            >
                              <div
                                onClick={() =>
                                  handleQuantityChange(item.id, -1)
                                }
                                className={styles.btn_decrease_increment}
                                data-oid="oxmroqv"
                              >
                                -
                              </div>
                              <div
                                className={styles.btn_decrease_increment}
                                data-oid="-6asl7i"
                              >
                                {item.quantity}
                              </div>
                              <div
                                onClick={() => handleQuantityChange(item.id, 1)}
                                className={styles.btn_decrease_increment}
                                data-oid="6li8:z9"
                              >
                                +
                              </div>
                              <div
                                onClick={() => handleRemove(index)}
                                className={styles.btn_delete}
                                data-oid="ie9i_oo"
                              >
                                <DeleteIcon
                                  sx={{
                                    color: "white",
                                    marginLeft: "0.1em",
                                  }}
                                  data-oid="e-9n-rm"
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
              <div data-oid="yulkyy0">
                <div data-oid="qrjx1wz">
                  <strong data-oid="v1h39l2">Total: </strong>S/
                  {getTotal().toFixed(2)}
                </div>
                <div className={styles.payment_button} data-oid="517uhht">
                  <div data-oid="pcq3.e5">
                    <Button
                      sx={{
                        display: "flex",
                        backgroundColor: "#500075",
                        width: "100%",
                        color: "white",
                        ":hover": { backgroundColor: "#500075" },
                      }}
                      onClick={handleContinue}
                      data-oid="-cmg8-k"
                    >
                      Confirmar reserva
                    </Button>
                  </div>

                  <div data-oid="jy8dew.">
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
                      data-oid="nimwatd"
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
