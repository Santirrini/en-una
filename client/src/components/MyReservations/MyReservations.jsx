import * as React from "react";
import { dataPersonal, OrderDratails } from "../../redux/action";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import styles from "./MyReservations.module.css";
import { Result } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function MyReservations() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);
  const datapersonal = useSelector(
    (state) => state.datapersonal.successPayments
  );

  console.log(datapersonal && datapersonal.map((data) => data.orders));
  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch, token]);

  /* React.useEffect(() => {
  dispatch(OrderDratails("30049ca5-bd98-400a-8fdd-b0e49bd07656"))
}, [dispatch]); */

  return (
    <div>
      <>
        {!token ? (
          <div>
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
            {datapersonal?.length < 1 ? (
              <div>
                <Result
                  title="No hay reservaciones realizadas"
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
                <h1 className={styles.text}>Reservaciones</h1>
                <div className={styles.menufood_container}>
                  {datapersonal &&
                    datapersonal.map(
                      (item, index) =>
                        item.orders &&
                        item.orders.order.map((data) => (
                          <Card key={index} className={styles.menufood_box}>
                            <CardMedia
                              component="img"
                              sx={{ width: 151, height: 151 }}
                              image={data.imageFile && data.imageFile[0]}
                              alt="Menus"
                            />
                            <Box
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              <CardContent sx={{ flex: "1 0 auto" }}>
                                <Typography component="div" variant="h5">
                                  {data.name}
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  color="text.secondary"
                                  component="div"
                                >
                                  $
                                  {parseFloat(data.price) *
                                    parseFloat(data.quantity)}
                                </Typography>
                                <Typography component="div" variant="h6">
                                  Localidad:{" "}
                                  {item.orders && item.orders.location}
                                </Typography>
                                <Typography component="div" variant="h6">
                                  Fecha reservado:{" "}
                                  {item.orders && item.orders.date}
                                </Typography>
                                <Typography component="div" variant="h6">
                                  Hora: {item.orders && item.orders.hours}
                                </Typography>
                                <Typography component="div" variant="h6">
                                  Cantidad de personas:{" "}
                                  {item.orders && item.orders.peoples}
                                </Typography>
                              </CardContent>
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
                                {/* Otros componentes pueden ir aquí */}
                              </Box>
                            </Box>
                          </Card>
                        ))
                    )}
                </div>

           
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
}
