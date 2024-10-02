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
import DeleteIcon from "@mui/icons-material/Delete";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import Modal from "@mui/material/Modal";
import UpdateMenu from "./UpdateMenu";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  maxWidth: "100%",
  maxHeight: "80vh", // Limita la altura máxima del modal
  overflowY: "auto", // Permite el scroll vertical si el contenido excede la altura
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: 4, // Agrega algo de padding si es necesario
};
export default function Segundos({ setCartItems }) {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const restaurantdetails = useSelector(
    (state) => state.restaurantdetails.data
  );
  const [quantities, setQuantities] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [selectedDetails, setSelectedDetails] = useState("");
  const [selectedPrices, setSelectedPrices] = useState("");
  const [selectedMenuId, setSelectedMenuId] = useState("");
  const [selectedStock, setSelecteStock] = useState("");


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
      [id]: Math.max(0, (prevQuantities[id] || 0) + amount),
    }));
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length > 0 && cart[0].restaurantId !== product.restaurantId) {
      alert("Solo puedes agregar menús del mismo restaurante al carrito.");
      return;
    }

    const quantity = quantities[product.id] || 0;

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
        details: product.details,

        imageFile: product.imageFile,
        restaurantId: product.restaurantId,
      });
    }

    setCartItems([...updatedCart]);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleOpen = (images, name, details, price, category, stock, menuId) => {
    setSelectedImages(images);
    setSelectedName(name);
    setSelectedDetails(details);
    setSelectedPrices(price);
    setSelectedCategory(category);
    setSelectedMenuId(menuId);
    setSelecteStock(stock)
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const limitarName = (texto) => {
    const limite = window.innerWidth <= 768 ? 20 : 20; // 10 caracteres en pantallas pequeñas, 30 en pantallas grandes
    if (texto.length > limite) {
      return texto.slice(0, limite) + "...";
    }
    return texto;
  };
  const limitarTexto = (texto) => {
    const limite = window.innerWidth <= 768 ? 25 : 30; // 10 caracteres en pantallas pequeñas, 30 en pantallas grandes
    if (texto.length > limite) {
      return texto.slice(0, limite) + "...";
    }
    return texto;
  };
  const segundos = restaurantdetails?.Menus.filter((menu) =>
    menu.category.includes("Segundos")
  );

  return (
    <div>
      {segundos?.length > 0 ? (
        <div>
          <div className={styles.container_bg_none}>
            <div className={styles.title_Carrusel2}>
              <h1>Segundos</h1>
            </div>
            <Splide
              options={{
                perPage: 4, // Número de cards por página en pantallas grandes
                perMove: 1,
                pagination: false,
                autoplay: true,
                pauseOnHover: true,
                arrows: true,
                /* direction: 'ttb', */ // Cambia la dirección del carrusel a vertical
                breakpoints: {
                  768: {
                    perPage: 1, // Número de cards por página en pantallas menores o iguales a 768px
                  },
                  1440: {
                    perPage: 3, // Número de cards por página en pantallas menores o iguales a 768px
                  },
                  1024: {
                    perPage: 2, // Número de cards por página en pantallas menores o iguales a 768px
                  },
                },
                classes: {
                  arrow: `splide__arrow ${styles.customArrow3}`,
                  prev: `splide__arrow--prev ${styles.customPrev3}`,
                  next: `splide__arrow--next ${styles.customNext3}`,
                },
              }}
            >
              {restaurantdetails?.Menus.filter((menu) =>
                menu.category.includes("Segundos")
              ).map((data) => (
                <>
                  <SplideSlide key={data.id}>
                    <Card className={styles.card2} key={data.id}>
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
                            {limitarName(data.name)}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            {limitarTexto(data.details, 30)}{" "}
                            {/* Limita a 50 caracteres */}
                          </Typography>
                          <div className={styles.price_quantity}>
                            <Typography
                              component="div"
                              variant="h6"
                              sx={{ fontWeight: "bold" }}
                            >
                              S/{data.price}
                            </Typography>
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
                              display: "flex",
                              flex: 2,
                              backgroundColor: "#500075",
                              color: "white",
                              ":hover": { backgroundColor: "#500075" },
                            }}
                            onClick={() =>
                              handleOpen(
                                data.imageFile,
                                data.name,
                                data.details,
                                data.price,
                                data.category,
                                data.stock,
                                data.id,
                              )
                            }
                          >
                            EDITAR
                          </Button>
                        </Box>
                      </Box>
                    </Card>
                  </SplideSlide>
                </>
              ))}
            </Splide>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
            <UpdateMenu
                selectedDetails={selectedDetails}
                selectedName={selectedName}
                selectedImages={selectedImages}
                selectedPrices={selectedPrices}
                selectedCategory={selectedCategory}
                handleClose={handleClose}
                selectedMenuId={selectedMenuId}
                selectedStock={selectedStock}
              />
            </Box>
          </Modal>
        </div>
      ) : null}
    </div>
  );
}
