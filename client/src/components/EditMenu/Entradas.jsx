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
export default function Entradas() {
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
  const limitarTexto = (texto) => {
    const limite = window.innerWidth <= 768 ? 25 : 30; // 10 caracteres en pantallas pequeñas, 30 en pantallas grandes
    if (texto.length > limite) {
      return texto.slice(0, limite) + "...";
    }
    return texto;
  };
  const entradas = restaurantdetails?.Menus.filter((menu) =>
    menu.category.includes("Entradas/Sopas"),
  );

  return (
    <div data-oid="28lxwr5">
      {entradas?.length > 0 ? (
        <div data-oid="x8.3:s-">
          <div className={styles.container_bg_none} data-oid="::x0_5c">
            <div className={styles.title_Carrusel2} data-oid="7ja6w19">
              <h1 data-oid="iuw1-x1">Entradas</h1>
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
              data-oid="1p72lzj"
            >
              {restaurantdetails?.Menus.filter((menu) =>
                menu.category.includes("Entradas/Sopas"),
              ).map((data) => (
                <>
                  <SplideSlide key={data.id} data-oid="_a-furb">
                    <Card
                      className={styles.card}
                      key={data.id}
                      data-oid="s5mknin"
                    >
                      <CardMedia
                        component="img"
                        className={styles.img_menu}
                        image={data.imageFile[0]}
                        alt={data.name}
                        onClick={() =>
                          handleOpen(data.imageFile, data.name, data.details)
                        }
                        data-oid="m5zk_nd"
                      />

                      <Box
                        sx={{ display: "flex", flexDirection: "column" }}
                        data-oid="0pfp1o_"
                      >
                        <CardContent
                          sx={{ flex: "1 0 auto" }}
                          data-oid="ds4l-1j"
                        >
                          <Typography
                            component="div"
                            variant="h5"
                            data-oid="s-:ntw2"
                          >
                            {limitarName(data.name)}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                            data-oid="97.p0b6"
                          >
                            {limitarTexto(data.details)}{" "}
                            {/* Limita a 50 caracteres */}
                          </Typography>
                          <div
                            className={styles.price_quantity}
                            data-oid="4wqdpui"
                          >
                            <Typography
                              component="div"
                              variant="h6"
                              sx={{ fontWeight: "bold" }}
                              data-oid="854mn7t"
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
                          data-oid="4b:c.7e"
                        >
                          <Button
                            sx={{
                              display: "flex",
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
                            data-oid="x08i:21"
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
            data-oid="um4_:9e"
          >
            <Box sx={modalStyle} data-oid="e_p:2j4">
              <UpdateMenu
                selectedDetails={selectedDetails}
                selectedName={selectedName}
                selectedImages={selectedImages}
                selectedPrices={selectedPrices}
                selectedCategory={selectedCategory}
                handleClose={handleClose}
                selectedMenuId={selectedMenuId}
                selectedStock={selectedStock}
                data-oid="uy60gzx"
              />
            </Box>
          </Modal>
        </div>
      ) : null}
    </div>
  );
}
