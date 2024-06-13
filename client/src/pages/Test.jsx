/* 
import * as React from "react";
import { dataPersonal, DetailRestaurant } from "../../redux/action";
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

  console.log(datapersonal?.map(d=> d.orders))
  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch, token]);
  React.useEffect(() => {
    dispatch(DetailRestaurant(token));
  }, [dispatch, token]);

  /* React.useEffect(() => {
  dispatch(OrderDratails("30049ca5-bd98-400a-8fdd-b0e49bd07656"))
}, [dispatch]); 

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
                        <Card
                        sx={{
                          maxWidth: 345,
                          width: 500,
                          ":hover": { boxShadow: "3px 5px 5px #cacaca" },
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={item.orders.Restaurant.imageFile[0]}
                          alt={item.orders.Restaurant.imageFile[0]}
                          sx={{ height: 200 }}
                        />
      
                        <CardContent>
                          <Typography
                            sx={{ textAlign: "center", textDecoration: "none" }}
                          >
                            <img
                              src={require("../../Images/Logo.png")}
                              alt="Logo"
                              className={styles.logo_card}
                            />
                         {item.orders.Restaurant.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              textAlign: "center",
                              textDecoration: "none",
                            }}
                          >
                            {item.orders.Restaurant.address},{" "}
                            {item.orders.Restaurant.address_optional ? item.orders.Restaurant.address_optional : null}
                          </Typography>
                        </CardContent>
                      </Card>
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
*/