import * as React from "react";
import { dataPersonal, DetailRestaurant } from "../../redux/action";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";

import styles from "./MyReservationsRestaurant.module.css";
import { Result } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "2em",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  height: "2.5em",
  border: "1px solid gray",
  background: "white",
  display: "flex",
  alignItems: "center",
  width: "100% !important",
  marginLeft: 0,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "40% !important",
    marginTop: "25px",
  },
  [theme.breakpoints.up("md")]: {
    width: "40% !important",
    marginTop: "25px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "40% !important",
    marginTop: "25px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  position: "relative",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  color: "orange",
}));

export default function MyReservationsRestaurant() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const datapersonal = useSelector(
    (state) => state.datapersonal?.successPayments || []
  );
  console.log(datapersonal)
  const [searchTerm, setSearchTerm] = React.useState("");
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  React.useEffect(() => {
    if (token) {
      dispatch(dataPersonal(token));
      dispatch(DetailRestaurant(token));
    }
  }, [dispatch, token]);
  const limitarTitle = (texto) => {
    const limite =
      window.innerWidth <= 768
        ? 13
        : window.innerWidth <= 1024
        ? 18
        : window.innerWidth <= 1440
        ? 45
        : 30; // 10 caracteres en pantallas pequeñas, 30 en pantallas grandes
    if (texto.length > limite) {
      return texto.slice(0, limite) + "...";
    }
    return texto;
  };
  const limitarTexto = (texto) => {
    const limite =
      window.innerWidth <= 768
        ? 2
        : window.innerWidth <= 1024
        ? 18
        : window.innerWidth <= 1440
        ? 45
        : 50;
    return texto.length > limite ? texto.slice(0, limite) + "..." : texto;
  };

  // Filtrar los restaurantes según el término de búsqueda
  const filteredRestaurants = datapersonal?.filter((row) =>
    row.orders?.Restaurant?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

const getTotal = () => {
  return filteredRestaurants.map((data) => {
    // Verifica si data.orders existe y contiene el arreglo order
    if (Array.isArray(data.orders.order)) {
      // Calcula el total para esta orden
      const total = data.orders.order.reduce((subtotal, item) => {
        return subtotal + (item.price * item.quantity);
      }, 0); // 0 es el valor inicial para la suma
      return total; // Retorna el total de esta orden
    }
    return 0; // Retorna 0 si no hay 'orders' o 'order' no es un array
  });
};


const total = getTotal();

  return (
    <div>
      {!token ? (
        <div >
          <Result
            title="Iniciar Sesión"
            subTitle="Por favor inicie sesión para ver los menús guardados en el carrito."
            extra={
              <Link to="/iniciar-sesión">
                <Button
                  sx={{
                    background: "#500075",
                    ":hover": { background: "#500075" },
                  }}
                  variant="contained"
                >
                  Iniciar Sesión
                </Button>
              </Link>
            }
          />
        </div>
      ) : (
        <>
          {datapersonal.length < 1 ? (
            <div style={{marginTop: "5em"}}>
              <Result
                title="No hay menús guardados en el carrito"
                subTitle="Por favor, ingrese a los restaurantes para ver los menús y hacer las reservaciones."
                extra={
                  <Link to="/">
                    <Button
                      sx={{
                        background: "#500075",
                        ":hover": { background: "#500075" },
                      }}
                      variant="contained"
                    >
                      Ver restaurantes
                    </Button>
                  </Link>
                }
              />
            </div>
          ) : (
            <div className={styles.carsfood_container}>
              <h1 className={styles.text}>Mis Reservas</h1>

              <div className={styles.search_container}>
                <Search className="input-container">
                  <input
                    placeholder="Buscar..."
                    className={styles.search}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                </Search>
              </div>

              {/* Mostrar mensaje si no hay coincidencias */}
              {filteredRestaurants.length === 0 ? (
                <Typography variant="h6" sx={{ marginTop: 2, textAlign: "center" }}>
                  No se encontraron restaurantes.
                </Typography>
              ) : (
                <div className={styles.menufood_container}>
                  {filteredRestaurants.map((item, index) => (
                    <Link to={`/mis-reservaciones/${item.id}`} key={index}>
                      <Card className={styles.menufood_box}>
                        <CardMedia
                          component="img"
                          className={styles.card_media}
                          image={item.orders?.Restaurant?.imageFile?.[0] || "ruta/a/imagen/default.jpg"}
                          alt={item.orders?.Restaurant?.name}
                        />
                          <CardContent sx={{ width: "100%" }}>
                            <Typography component="div" variant="h5">
                              {limitarTitle(item.orders?.Restaurant?.name)}
                            </Typography>
                            <Typography component="div" variant="h6">
                            {item.orders?.date}

                            </Typography>
                            <Typography
                              variant="subtitle1"
                              color="text.secondary"
                              component="div"
                            >
                              <strong>Descripción de la reserva:</strong>{" "}
                              {limitarTexto(item.orders?.Restaurant?.details)}
                            </Typography>
                            
                      
                            
                              <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Cantidad de personas: {item.orders?.peoples}
                          </Typography>
                              <div className={styles.quantity_price}>

                              <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                              >
                                <strong>  
                                
                                S/{total[index].toFixed(2)}
                                </strong>
                              </Typography>
                        </div>

                          </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

