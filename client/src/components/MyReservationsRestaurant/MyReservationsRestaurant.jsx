import * as React from "react";
import { dataPersonal, DetailRestaurant } from "../../redux/action";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import styles from "./MyReservationsRestaurant.module.css";
import { Result } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


export default function MyReservationsRestaurant() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);
  const datapersonal = useSelector(
    (state) => state.datapersonal.successPayments
  );
  console.log(datapersonal?.map(d=> d.orders))
  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch, token]);
  React.useEffect(() => {
    dispatch(DetailRestaurant(token));
  }, [dispatch, token]);

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
                <h1 className={styles.text}>Restaurantes reservados</h1>
                <div className={styles.menufood_container}>
                  {datapersonal?.map((item, index) => (
                    item.orders &&  item.orders.order.map((row) => (
<Link to={`/mis-reservaciones/${item.id}`}>
                    <Card className={styles.menufood_box} key={index}>
                        <CardMedia
                          component="img"
                          sx={{ height: 200, width: 200, maxWidth: "100%" }}
                          image={row.imageFile[0]}
                          alt="Live from space album cover"
                        />
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Typography component="div" variant="h5">
                            {row?.name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            ${parseFloat(row.price * row.quantity).toFixed(2)}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            Cantidad: {row.quantity}
                     
                          </Typography>
                        </CardContent>

                        {/*      <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            pl: 1,
                            pb: 1,
                            justifyContent: "center",
                            }}
                            >
                            <ButtonGroup sx={{ display: "flex", gap: "1em" }}>
                            <Button
                            aria-label="decrease"
                            onClick={() => handleDecrease(index)}
                            sx={{
                              color: "#500075",
                              border: "1px solid #500075",
                              ":hover": { border: "1px solid #500075" },
                              }}
                              >
                              <RemoveIcon fontSize="small" />
                              </Button>
                              <Typography>{quantity[index] || 1}</Typography>
                              <Button
                              aria-label="increase"
                              onClick={() => handleIncrease(index)}
                              sx={{
                                color: "#500075",
                                border: "1px solid #500075",
                                ":hover": { border: "1px solid #500075" },
                              }}
                              >
                              <AddIcon fontSize="small" />
                              </Button>
                              </ButtonGroup>
                              
                              </Box> */}
                      </Box>
                    </Card>

</Link>
                    ))

                  ))}
                </div>

              {/*   <div className={styles.form_container}>
                  <h2>Resumen de la reserva:</h2>
                  <p>
                    <strong>Local:</strong>{" "}
                    {formData[0].formData && formData[0].formData.local}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {formData[0]?.formData.date}
                  </p>
                  <p>
                    <strong>Hora: </strong>
                    {formData[0]?.formData.hours}
                  </p>
                  <p>
                    <strong>Personas:</strong> {formData[0]?.formData.peoples}
                  </p>

                  <p>
                    <strong>Total:</strong> ${calculateTotal()}
                  </p>
                </div> */}

      
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
}
