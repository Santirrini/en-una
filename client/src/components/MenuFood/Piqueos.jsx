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
import DeleteIcon from "@mui/icons-material/Delete";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import Modal from "@mui/material/Modal";


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
export default function Piqueos({setCartItems, setShowSummary}) {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const restaurantdetails = useSelector(
    (state) => state.restaurantdetails.data
  );
  const [quantities, setQuantities] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedName, setSelectedName] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState([]);

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
        details: product.details,

        quantity: quantity,
        imageFile: product.imageFile,
        restaurantId: product.restaurantId,
      });
    }

    setCartItems([...updatedCart]);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setShowSummary(true)
  
  };

 
  const handleOpen = (images, name, details) => {
    setSelectedImages(images);
    setSelectedName(name);
    setSelectedDetails(details);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  // Función para limitar el texto
  const limitarTexto = (texto) => {
    const limite = window.innerWidth <= 768 ? 25 : 30; // 10 caracteres en pantallas pequeñas, 30 en pantallas grandes
    if (texto.length > limite) {
      return texto.slice(0, limite) + "...";
    }
    return texto;
  };
  const piqueos = restaurantdetails?.Menus.filter(menu => menu.category.includes("Piqueos"))

  return (
    <div>
        {piqueos?.length > 0 ? (
   
        <div >
          <div className={styles.container_bg_none}>
            <div className={styles.title_Carrusel2}>
              <h1>Piqueos</h1>
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
                  arrow: `splide__arrow ${styles.customArrow2}`,
                  prev: `splide__arrow--prev ${styles.customPrev2}`,
                  next: `splide__arrow--next ${styles.customNext2}`,
                },
              }}
            >
                  {restaurantdetails?.Menus.filter(menu =>
                menu.category.includes("Piqueos")
              ).map((data) => (
                <>
                  <SplideSlide key={data.id}>
                    <Card className={styles.card} key={data.id}>
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
                        <CardContent sx={{ flex: "1 0 auto" }} >
                          <Typography component="div" variant="h5">
                            {data.name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                                                     {limitarTexto(data.details)}

                          </Typography>
                          <div className={styles.price_quantity}>

                          <Typography component="div" variant="h6" sx={{fontWeight: "bold"}}>
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

                          <Button
                            sx={{
                              color: "#000",
                              border: "1px solid orange",

                              ":hover": { border: "1px solid orange" },
                            }}
                            onChange={(e) =>
                              setQuantities((prevQuantities) => ({
                                ...prevQuantities,
                                [data.id]: Math.max(
                                  1,
                                  parseInt(e.target.value)
                                ),
                              }))
                            }
                          >
                            {quantities[data.id] || 0}
                          </Button>

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
                              display: "flex",
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
              <Splide
                options={{
                  perPage: 1,
                  perMove: 1,
                  pagination: false,
                  autoplay: true,
                  pauseOnHover: true,
                  arrows: true,
                }}
              >
                {selectedImages.map((img, index) => (
                  <SplideSlide key={index}>
                    <img src={img} alt="menu"  className={styles.img_carrusel}/>
                  </SplideSlide>
                ))}
              </Splide>
              <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign:'center', paddingBottom: "0.5em"}} >
                {selectedName}
              </Typography>
              <Typography id="modal-modal-description" sx={{textAlign:'center', paddingBottom: "1em"}} >
                {selectedDetails}
              </Typography>
            </Box>
          </Modal>
        </div>
                   ):null}

    </div>
  );
}
