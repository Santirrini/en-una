import * as React from "react";
import { dataPersonal, DetailRestaurant, DetailsReservation } from "../../redux/action";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import styles from "./MyReservations.module.css";
import { Result } from "antd";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


export default function MyReservations() {
const {reservationId} =  useParams();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);
  const datapersonal = useSelector(
    (state) => state.datapersonal.successPayments
  );
  const detailsReservation = useSelector(
    (state) => state.detailsReservation.data
  );
  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch, token]);


  React.useEffect(() => {
    dispatch(DetailsReservation(reservationId));
  }, [dispatch, reservationId]);

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
                <h1 className={styles.text}>Reservaciones</h1>
                <div className={styles.menufood_container}>
                  {detailsReservation.orders && detailsReservation.orders.order.map((item, index) => (

                    <Card className={styles.menufood_box} key={index}>
                        <CardMedia
                          component="img"
                          sx={{ maxWidth: "100%", width: 150 }}
                          image={item.imageFile[0]}
                          alt="Live from space album cover"
                        />
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Typography component="div" variant="h5">
                            {item?.name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            ${parseFloat(item.price * item.quantity).toFixed(2)}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Cantidad: {item.quantity}
                     
                          </Typography>
                        </CardContent>

                      
                      </Box>
                    </Card>

                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
}
