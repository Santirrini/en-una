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
import Modal from "@mui/material/Modal";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import styles from "./MenuFood.module.css";
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

export default function MenuDestacad() {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const restaurantdetails = useSelector(
    (state) => state.restaurantdetails.data,
  );
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
  }, [restaurantId, dispatch]);

  const handleOpen = (
    images,
    name,
    details,
    price,
    category,
    stock,
    menuId,
  ) => {
    setSelectedImages(images);
    setSelectedName(name);
    setSelectedDetails(details);
    setSelectedPrices(price);
    setSelectedCategory(category);
    setSelectedMenuId(menuId);
    setSelecteStock(stock);
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
  // Función para limitar el texto
  const limitarTexto = (texto) => {
    const limite = window.innerWidth <= 768 ? 25 : 30; // 10 caracteres en pantallas pequeñas, 30 en pantallas grandes
    if (texto.length > limite) {
      return texto.slice(0, limite) + "...";
    }
    return texto;
  };

  const destacados = restaurantdetails?.Menus.filter((menu) =>
    menu.category.includes("Destacados"),
  );

  return (
    <div data-oid="kp0bczb">
      {destacados?.length > 0 ? (
        <div className={styles.menufood_container} data-oid="n9ogzs.">
          <div className={styles.container_bg} data-oid="st2v6m8">
            <h1 className={styles.title_Carrusel} data-oid="oh3s06b">
              Destacados
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
                  arrow: `splide__arrow ${styles.customArrow}`,
                  prev: `splide__arrow--prev ${styles.customPrev}`,
                  next: `splide__arrow--next ${styles.customNext}`,
                },
              }}
              data-oid="fb-5wah"
            >
              {restaurantdetails?.Menus.filter((menu) =>
                menu.category.includes("Destacados"),
              ).map((data) => (
                <SplideSlide key={data.id} data-oid="yynyfys">
                  <Card className={styles.card} data-oid="bpgm8e7">
                    <CardMedia
                      component="img"
                      className={styles.img_menu}
                      image={data.imageFile[0]}
                      alt={data.name}
                      data-oid="fuwtosv"
                    />

                    <Box
                      sx={{ display: "flex", flexDirection: "column" }}
                      data-oid=":sih6.z"
                    >
                      <CardContent sx={{ flex: "1 0 auto" }} data-oid="xlc85g6">
                        <Typography
                          component="div"
                          variant="h5"
                          data-oid="l_lxt3h"
                        >
                          {limitarName(data.name)}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          data-oid="7uaxf5x"
                        >
                          {limitarTexto(data.details)}
                        </Typography>
                        <div
                          className={styles.price_quantity}
                          data-oid="dtpm93c"
                        >
                          <Typography
                            component="div"
                            variant="h6"
                            sx={{ fontWeight: "bold" }}
                            data-oid="o4vb7s6"
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
                        data-oid="ak419dg"
                      >
                        <Button
                          sx={{
                            flex: 2,
                            backgroundColor: "orange",
                            color: "white",
                            ":hover": { backgroundColor: "orange" },
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
                          data-oid="xpk2-pa"
                        >
                          EDITAR
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
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            data-oid="h5jpi94"
          >
            <Box sx={modalStyle} data-oid="ws1xi4h">
              <UpdateMenu
                selectedDetails={selectedDetails}
                selectedName={selectedName}
                selectedImages={selectedImages}
                selectedPrices={selectedPrices}
                selectedCategory={selectedCategory}
                handleClose={handleClose}
                selectedMenuId={selectedMenuId}
                selectedStock={selectedStock}
                data-oid="jnxngz8"
              />
            </Box>
          </Modal>
        </div>
      ) : null}
    </div>
  );
}
