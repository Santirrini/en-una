import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailRestaurant, dataPersonal } from "../../redux/action";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Result } from "antd";

import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import styles from "./MenuFood.module.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxWidth: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

export default function MenuDestacad({ setCartItems, setShowSummary }) {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const restaurantdetails = useSelector(
    (state) => state.restaurantdetails.data
  );
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.userId);


  const [quantities, setQuantities] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedName, setSelectedName] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState([]);

  useEffect(() => {
    dispatch(DetailRestaurant(restaurantId));
  }, [dispatch, restaurantId]);

  useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch, token]);

  useEffect(() => {

    // Leer el carrito de localStorage usando el userId
    const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    setCartItems(cart);
  }, [setCartItems, userId ]);

  const handleQuantityChange = (id, amount) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(0, (prevQuantities[id] || 0) + amount),
    }));
  };

  const addToCart = (product) => {

    // Obtener carrito de localStorage o inicializarlo si está vacío
    const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

    // Validar si el carrito ya tiene productos de otro restaurante
    if (cart.length > 0 && cart[0].restaurantId !== product.restaurantId) {
      alert("Solo puedes agregar menús del mismo restaurante al carrito.");
      return;
    }

    // Obtener la cantidad de productos seleccionada (asegurarse que sea al menos 1)
    const quantity = quantities[product.id] || 0;
    if (quantity <= 0) {
      alert("Por favor, selecciona una cantidad válida.");
      return;
    }

    // Copiar el carrito para actualizarlo
    let updatedCart = [...cart];
    let found = false;

    // Buscar si el producto ya está en el carrito
    updatedCart.forEach((item) => {
      if (item.id === product.id) {
        item.quantity += quantity; // Incrementar la cantidad
        found = true;
      }
    });

    // Si el producto no estaba en el carrito, agregarlo
    if (!found) {
      updatedCart.push({
        id: product.id, // Identificador único
        name: product.name,
        price: product.price,
        details: product.details,
        quantity: quantity, // Cantidad seleccionada
        imageFile: product.imageFile,
        restaurantId: product.restaurantId,
      });
    }

    // Actualizar el estado del carrito y guardarlo en localStorage
    setCartItems([...updatedCart]);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));

    // Mostrar resumen de compra
    setShowSummary(true);
  };

  const handleOpen = (images, name, details) => {
    setSelectedImages(images);
    setSelectedName(name);
    setSelectedDetails(details);
    setOpen(true);
  };

  // Función para limitar el texto
  const limitarTexto = (texto) => {
    const limite = window.innerWidth <= 768 ? 25 : 30; // 10 caracteres en pantallas pequeñas, 30 en pantallas grandes
    if (texto.length > limite) {
      return texto.slice(0, limite) + "...";
    }
    return texto;
  };

  const handleClose = () => setOpen(false);


  // Filtrar los menús destacados según el ID del usuario
  const destacados = restaurantdetails?.Menus.filter((menu) =>
    menu.category.includes("Destacados")
  ) // Suponiendo que los menús tienen un campo userId

  return (
    <div>
      {destacados?.length > 0 ? (
        <div className={styles.menufood_container}>
          <div className={styles.container_bg}>
            <h1 className={styles.title_Carrusel}>Destacados</h1>
            <Splide
              options={{
                perPage: 4,
                perMove: 1,
                pagination: false,
                autoplay: true,
                pauseOnHover: true,
                arrows: true,
                breakpoints: {
                  768: { perPage: 1 },
                  1024: { perPage: 2 },
                  1440: { perPage: 3 },
                },
                classes: {
                  arrow: `splide__arrow ${styles.customArrow}`,
                  prev: `splide__arrow--prev ${styles.customPrev}`,
                  next: `splide__arrow--next ${styles.customNext}`,
                },
              }}
            >
              {destacados.map((data) => (
                <SplideSlide key={data.id}>
                  <Card className={styles.card}>
                    <CardMedia
                      component="img"
                      className={styles.img_menu}
                      image={data.imageFile[0]}
                      alt={data.name}
                      onClick={() =>
                        handleOpen(data.imageFile, data.name, data.details)
                      }
                    />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h5">
                          {data.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          {limitarTexto(data.details)}
                        </Typography>
                        <div className={styles.price_quantity}>
                          <Typography
                            component="div"
                            variant="h6"
                            sx={{ fontWeight: "bold" }}
                          >
                            S/{data.price}
                          </Typography>
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
                                color: "#000",
                                border: "1px solid orange",
                                ":hover": { border: "1px solid orange" },
                              }}
                              onClick={() => handleQuantityChange(data.id, -1)}
                            >
                              -
                            </Button>
                            <Typography>{quantities[data.id] || 0}</Typography>
                            <Button
                              sx={{
                                color: "#000",
                                border: "1px solid orange",
                                ":hover": { border: "1px solid orange" },
                              }}
                              onClick={() => handleQuantityChange(data.id, 1)}
                            >
                              +
                            </Button>
                          </Box>
                        </div>
                      </CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          marginLeft: "1em",
                          marginRight: "1em",
                          paddingBottom: "1em",
                        }}
                      >
                        <Button
                          sx={{
                            flex: 2,
                            backgroundColor: "orange",
                            color: "white",
                            ":hover": { backgroundColor: "orange" },
                          }}
                          onClick={() => addToCart(data)}
                        >
                          AGREGAR AL CARRITO
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                </SplideSlide>
              ))}
            </Splide>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box sx={modalStyle}>
              <Splide
                options={{
                  type: "loop",
                  perPage: 1,
                  pagination: false,
                  arrows: true,
                  height: "500px",
                  cover: true,
                }}
              >
                {selectedImages.map((image, index) => (
                  <SplideSlide key={index}>
                    <img
                      src={image}
                      alt={selectedName}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </SplideSlide>
                ))}
              </Splide>
              <Typography
                id="modal-title"
                variant="h6"
                component="h2"
                sx={{ p: 2, textAlign: "center" }}
              >
                {selectedName}
              </Typography>
              <Typography
                id="modal-description"
                sx={{ p: 2, textAlign: "center" }}
              >
                {selectedDetails}
              </Typography>
            </Box>
          </Modal>
        </div>
      ) : (
        <Result
          status="404"
          title="404"
          subTitle="Lo sentimos, no se han encontrado productos destacados."
        />
      )}
    </div>
  );
}
