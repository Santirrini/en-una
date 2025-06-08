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
import CloseIcon from "@mui/icons-material/Close"; // Asegúrate de importar el ícono de cierre
import IconButton from "@mui/material/IconButton"; // Asegúrate de importar el IconButton
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

export default function Promociones({
  setCartItems,
  setShowSummary,
  setQuantities,
  quantities,
}) {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const restaurantdetails = useSelector(
    (state) => state.restaurantdetails.data,
  );
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.userId);

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
    setQuantities((prevQuantities) => {
      const newQuantity = Math.max(0, (prevQuantities[id] || 0) + amount);

      // Actualizar el carrito al cambiar la cantidad
      const productInMenu = restaurantdetails.Menus.find(
        (menu) => menu.id === id,
      );
      updateCart(productInMenu, newQuantity);

      return { ...prevQuantities, [id]: newQuantity };
    });
  };

  const updateCart = (product, newQuantity) => {
    const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

    // Si la cantidad es mayor a 0, agregar o actualizar el producto en el carrito
    if (newQuantity > 0) {
      let updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (item) => item.id === product.id,
      );

      if (productIndex >= 0) {
        // Si el producto ya está en el carrito, actualizar la cantidad
        updatedCart[productIndex].quantity = newQuantity;
      } else {
        // Si el producto no está en el carrito, agregarlo
        updatedCart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          details: product.details,
          quantity: newQuantity,
          imageFile: product.imageFile,
          restaurantId: product.restaurantId,
        });
      }

      // Guardar el carrito actualizado en localStorage
      localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    } else {
      // Si la cantidad es 0, eliminar el producto del carrito
      const updatedCart = cart.filter((item) => item.id !== product.id);
      localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    }
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
  const limitarName = (texto) => {
    const limite = window.innerWidth <= 768 ? 20 : 20; // 10 caracteres en pantallas pequeñas, 30 en pantallas grandes
    if (texto.length > limite) {
      return texto.slice(0, limite) + "...";
    }
    return texto;
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

  const piqueos = restaurantdetails?.Menus.filter(
    (menu) => menu.category.includes("Promociones") && menu.stock === true,
  );

  return (
    <div data-oid="scg:s_y">
      {piqueos?.length > 0 ? (
        <div className={styles.menufood_container} data-oid="z:fkr_j">
          <div className={styles.container_bg_none} data-oid="u9pg1ki">
            <h1 className={styles.title_Carrusel2} data-oid="99fr.fn">
              Promociones
            </h1>
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
                  arrow: `splide__arrow ${styles.customArrow2}`,
                  prev: `splide__arrow--prev ${styles.customPrev2}`,
                  next: `splide__arrow--next ${styles.customNext2}`,
                },
              }}
              data-oid="5axsjx1"
            >
              {piqueos.map((data) => (
                <SplideSlide key={data.id} data-oid=":yq235j">
                  <Card className={styles.card} data-oid="ap7:07h">
                    <CardMedia
                      component="img"
                      className={styles.img_menu}
                      image={data.imageFile[0]}
                      alt={data.name}
                      onClick={() =>
                        handleOpen(data.imageFile, data.name, data.details)
                      }
                      data-oid="v.2h-0."
                    />

                    <Box
                      sx={{ display: "flex", flexDirection: "column" }}
                      data-oid="pmnmaw6"
                    >
                      <CardContent sx={{ flex: "1 0 auto" }} data-oid="0uh4xpb">
                        <Typography
                          component="div"
                          variant="h5"
                          data-oid="kb9gl6a"
                        >
                          {limitarName(data.name)}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          data-oid=".k0td7r"
                        >
                          {limitarTexto(data.details)}
                        </Typography>
                        <div
                          className={styles.price_quantity}
                          data-oid="a:74.69"
                        >
                          <Typography
                            component="div"
                            variant="h6"
                            sx={{ fontWeight: "bold" }}
                            data-oid=".9d7w8_"
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
                            data-oid="jd4wga8"
                          >
                            <Button
                              sx={{
                                color: "#000",
                                border: "1px solid orange",
                                ":hover": { border: "1px solid orange" },
                              }}
                              onClick={() => handleQuantityChange(data.id, -1)}
                              data-oid="kiymokb"
                            >
                              -
                            </Button>
                            <Typography data-oid="bvprjnx">
                              {quantities[data.id] || 0}
                            </Typography>
                            <Button
                              sx={{
                                color: "#000",
                                border: "1px solid orange",
                                ":hover": { border: "1px solid orange" },
                              }}
                              onClick={() => handleQuantityChange(data.id, 1)}
                              data-oid="6:68cto"
                            >
                              +
                            </Button>
                          </Box>
                        </div>
                      </CardContent>
                      {/*     <Box
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
                    </Box> */}
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
            data-oid="tklp69g"
          >
            <Box sx={modalStyle} data-oid="blhnf3r">
              {/* Botón de cierre */}
              <IconButton
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  color: "text.primary",
                  zIndex: 1, // Asegura que el ícono esté por encima de otros elementos
                }}
                data-oid="k045ez."
              >
                <CloseIcon data-oid="uwggajt" />
              </IconButton>

              <Splide
                options={{
                  type: "loop",
                  perPage: 1,
                  pagination: false,
                  arrows: true,
                  height: "400px", // Ajusta la altura del contenedor
                  cover: true, // Asegura que la imagen cubra todo el contenedor
                }}
                data-oid="a9d7-vy"
              >
                {selectedImages.map((image, index) => (
                  <SplideSlide key={index} data-oid="chrmdzf">
                    <img
                      src={image}
                      alt={selectedName}
                      style={{
                        width: "100%", // Hace que la imagen ocupe todo el ancho
                        height: "100%", // Hace que la imagen ocupe toda la altura
                        objectFit: "cover", // Hace que la imagen se ajuste sin distorsionarse, recortando si es necesario
                      }}
                      data-oid="rk_9sce"
                    />
                  </SplideSlide>
                ))}
              </Splide>

              <Typography
                id="modal-title"
                variant="h6"
                component="h2"
                sx={{
                  p: 2,
                  textAlign: "center",
                  fontSize: {
                    xs: "1.2rem", // Pantallas pequeñas
                    sm: "1.5rem", // Pantallas medianas
                    md: "1.8rem", // Pantallas grandes
                  },
                  wordWrap: "break-word", // Permite el ajuste de palabra cuando se alcanza el borde
                  overflow: "visible", // Hace que el texto se muestre completamente
                  width: "100%", // Asegura que el texto ocupe todo el ancho disponible
                  boxSizing: "border-box", // Asegura que el padding no afecte el tamaño del contenedor
                }}
                data-oid="ucdci75"
              >
                {selectedName}
              </Typography>

              <Typography
                id="modal-description"
                sx={{
                  p: 2,
                  textAlign: "center",
                  fontSize: {
                    xs: "0.9rem", // Pantallas pequeñas
                    sm: "1rem", // Pantallas medianas
                    md: "1.2rem", // Pantallas grandes
                  },
                  wordWrap: "break-word", // Permite el ajuste de palabra cuando se alcanza el borde
                  overflow: "visible", // Hace que el texto se muestre completamente
                  width: "100%", // Asegura que el texto ocupe todo el ancho disponible
                  boxSizing: "border-box", // Asegura que el padding no afecte el tamaño del contenedor
                }}
                data-oid="-zimr:c"
              >
                {selectedDetails}
              </Typography>
            </Box>
          </Modal>
        </div>
      ) : null}
    </div>
  );
}
