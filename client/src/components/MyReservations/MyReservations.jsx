import * as React from "react";
import {
  dataPersonal,
  DetailRestaurant,
  DetailsReservation,
} from "../../redux/action";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Result } from "antd";
import { Link, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./MyReservations.module.css";

export default function MyReservations() {
  const { reservationId } = useParams();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const token = useSelector((state) => state.token);
  const datapersonal = useSelector(
    (state) => state.datapersonal.successPayments
  );
  const detailsReservation = useSelector(
    (state) => state.detailsReservation.data
  );

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch, token]);

  React.useEffect(() => {
    dispatch(DetailsReservation(reservationId));
  }, [dispatch, reservationId]);
  const getTotal = () => {
    return detailsReservation?.orders?.order
      ?.reduce(
        (total, item) => total + (parseFloat(item.price * item.quantity) || 0),
        0
      )
      .toFixed(2);
  };
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
          {datapersonal?.length < 1 ? (
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
              <h1 className={styles.text}>Detalle de la reserva</h1>
              <div className={styles.form_container}>

              

                  <div>
                    <strong>Restaurante:</strong> {detailsReservation?.orders?.Restaurant?.name}
                  </div>
                {detailsReservation?.orders?.location ? (
                  <div>
                    <strong>Local:</strong> {detailsReservation?.orders?.location}
                  </div>
                ) : null}

                {detailsReservation?.orders?.date ? (
                  <div>
                    <strong>Fecha:</strong> {detailsReservation?.orders?.date}
                  </div>
                ) : null}
                {detailsReservation?.orders?.hours ? (
                  <div>
                    <strong>Hora: </strong>
                    {detailsReservation?.orders?.hours}
                  </div>
                ) : null}
                {detailsReservation?.orders?.peoples ? (
                  <div>
                    <strong>Personas:</strong>{" "}
                    {detailsReservation?.orders?.peoples}
                  </div>
                ) : null}
                     {detailsReservation?.orders?.area ? (
                  <div>
                    <strong>Zona:</strong>{" "}
                    {detailsReservation?.orders?.area}
                  </div>
                ) : null}
                
              </div>
              <div className={styles.menufood_container}>
                {detailsReservation?.orders?.order?.map((item, index) => (
                  <Card className={styles.menufood_box} key={index}>
                    <CardMedia
                      component="img"
                      className={styles.card_media}
                      image={item.imageFile[0]}
                      alt="Menu"
                    />
                                              <CardContent sx={{ width: "100%" }}>

                                              <Typography
                            component="div"
                            variant="h5"
                            className={styles.name_product}
                          >
                        {limitarTitle(item?.name)}

                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          {limitarTexto(item?.details)}
                        </Typography>
                        <div className={styles.quantity_price}>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Cantidad: {item.quantity}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            <strong>

                            S/{parseFloat(item.price * item.quantity).toFixed(2)}
                            </strong>
                          </Typography>
                        </div>
                      </CardContent>
                  </Card>
                ))}
              </div>

              {detailsReservation?.orders?.observation && (

                <div className={styles.label_textarea}>
                  <strong>
                    <label htmlFor="">Observaciones (opcional)</label>
                  </strong>
                  <textarea
                    name=""
                    id=""
                    cols="10"
                    placeholder="Alergias a alimentos, intolerancias a alimentos, especificaciones en el pedido, etc..."
                    value={detailsReservation?.orders?.observation}
                    
                    rows={5}
                    className={styles.textarea}
                    ></textarea>
                </div>
                  )}


              <div className={styles.total}>

                <strong>Total: </strong>S/{getTotal()}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
