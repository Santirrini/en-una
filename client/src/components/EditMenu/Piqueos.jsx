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
export default function Piqueos() {
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

  const piqueos = restaurantdetails?.Menus.filter((menu) =>
    menu.category.includes("Piqueos"),
  );

  return (
    <div data-oid="vezen-r">
      {piqueos?.length > 0 ? (
        <div data-oid="33s._-y">
          <div className={styles.container_bg_none} data-oid="5sre9uw">
            <div className={styles.title_Carrusel2} data-oid="aqdq4qz">
              <h1 data-oid="qfv.bmw">Piqueos</h1>
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
              data-oid="a4f1mvk"
            >
              {restaurantdetails?.Menus.filter((menu) =>
                menu.category.includes("Piqueos"),
              ).map((data) => (
                <>
                  <SplideSlide key={data.id} data-oid="_4i09qp">
                    <Card
                      className={styles.card}
                      key={data.id}
                      data-oid="ay75swj"
                    >
                      <CardMedia
                        component="img"
                        className={styles.img_menu}
                        image={data.imageFile[0]}
                        alt={data.name}
                        onClick={() =>
                          handleOpen(data.imageFile, data.name, data.details)
                        }
                        data-oid="775:oho"
                      />

                      <Box
                        sx={{ display: "flex", flexDirection: "column" }}
                        data-oid="17a9m:w"
                      >
                        <CardContent
                          sx={{ flex: "1 0 auto" }}
                          data-oid="70syso-"
                        >
                          <Typography
                            component="div"
                            variant="h5"
                            data-oid="ziabt4p"
                          >
                            {limitarName(data.name)}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                            data-oid="b4dk54k"
                          >
                            {limitarTexto(data.details)}{" "}
                            {/* Limita a 50 caracteres */}
                          </Typography>

                          <div
                            className={styles.price_quantity}
                            data-oid="wp4t4tt"
                          >
                            <Typography
                              component="div"
                              variant="h6"
                              sx={{ fontWeight: "bold" }}
                              data-oid="c8jkvbt"
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
                          data-oid="-1eil8l"
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
                            data-oid="-f7rx11"
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
            data-oid="v75x7:5"
          >
            <Box sx={modalStyle} data-oid="1nx6yd1">
              <UpdateMenu
                selectedDetails={selectedDetails}
                selectedName={selectedName}
                selectedImages={selectedImages}
                selectedPrices={selectedPrices}
                selectedCategory={selectedCategory}
                handleClose={handleClose}
                selectedMenuId={selectedMenuId}
                selectedStock={selectedStock}
                data-oid="n0fyz47"
              />
            </Box>
          </Modal>
        </div>
      ) : null}
    </div>
  );
}
