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
    (state) => state.datapersonal.successPayments,
  );
  const detailsReservation = useSelector(
    (state) => state.detailsReservation.data,
  );
  console.log(detailsReservation);
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
        0,
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
    <div data-oid="1zo:dwb">
      {!token ? (
        <div data-oid="_m-ipvd">
          <Result
            title="Iniciar Sesión"
            subTitle="Por favor inicie sesión para ver los menús guardados en el carrito."
            extra={
              <Link to="/iniciar-sesión" data-oid="j:-ymag">
                <Button
                  sx={{
                    background: "#500075",
                    ":hover": { background: "#500075" },
                  }}
                  variant="contained"
                  data-oid="kras1ap"
                >
                  Iniciar Sesión
                </Button>
              </Link>
            }
            data-oid="sjtmjgx"
          />
        </div>
      ) : (
        <>
          {datapersonal?.length < 1 ? (
            <div style={{ marginTop: "5em" }} data-oid="yo-lbnr">
              <Result
                title="No hay menús guardados en el carrito"
                subTitle="Por favor, ingrese a los restaurantes para ver los menús y hacer las reservaciones."
                extra={
                  <Link to="/" data-oid="kwlu9lm">
                    <Button
                      sx={{
                        background: "#500075",
                        ":hover": { background: "#500075" },
                      }}
                      variant="contained"
                      data-oid="4e0b2ot"
                    >
                      Ver restaurantes
                    </Button>
                  </Link>
                }
                data-oid="d74nk:b"
              />
            </div>
          ) : (
            <div className={styles.carsfood_container} data-oid="0c-tbtv">
              <h1 className={styles.text} data-oid="e0fvkvb">
                Detalle de la reserva
              </h1>
              <div className={styles.form_container} data-oid="5f37.wt">
                <div data-oid="-_eiz7u">
                  <strong data-oid="b.-gma3">Restaurante:</strong>{" "}
                  {detailsReservation?.orders?.Restaurant?.name}
                </div>
                {detailsReservation?.orders?.location ? (
                  <div data-oid="7p5n03d">
                    <strong data-oid="jeen8we">Local:</strong>{" "}
                    {detailsReservation?.orders?.location}
                  </div>
                ) : null}

                {detailsReservation?.orders?.date ? (
                  <div data-oid="u9:j4dt">
                    <strong data-oid=".wqp:st">Fecha:</strong>{" "}
                    {detailsReservation?.orders?.date}
                  </div>
                ) : null}
                {detailsReservation?.orders?.hours ? (
                  <div data-oid="r8.wka8">
                    <strong data-oid="n:q:8jc">Hora: </strong>
                    {detailsReservation?.orders?.hours}
                  </div>
                ) : null}
                {detailsReservation?.orders?.peoples ? (
                  <div data-oid="ebk4koe">
                    <strong data-oid="snwltc2">Personas:</strong>{" "}
                    {detailsReservation?.orders?.peoples}
                  </div>
                ) : null}
                {detailsReservation?.orders?.area ? (
                  <div data-oid="21fx5_6">
                    <strong data-oid="0le7s54">Zona:</strong>{" "}
                    {detailsReservation?.orders?.area}
                  </div>
                ) : null}
              </div>
              <div className={styles.menufood_container} data-oid="5bu.o2a">
                {detailsReservation?.orders?.order?.map((item, index) => (
                  <Card
                    className={styles.menufood_box}
                    key={index}
                    data-oid="v:djm7w"
                  >
                    <CardMedia
                      component="img"
                      className={styles.card_media}
                      image={item.imageFile[0]}
                      alt="Menu"
                      data-oid="ew3kztb"
                    />

                    <CardContent sx={{ width: "100%" }} data-oid="8x70u9x">
                      <Typography
                        component="div"
                        variant="h5"
                        className={styles.name_product}
                        data-oid="01xk8:q"
                      >
                        {limitarTitle(item?.name)}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        data-oid="go49:up"
                      >
                        {limitarTexto(item?.details)}
                      </Typography>
                      <div className={styles.quantity_price} data-oid="9wrxpnv">
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          data-oid="zehpglz"
                        >
                          Cantidad: {item.quantity}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          data-oid="3m498rj"
                        >
                          <strong data-oid="-s7towp">
                            S/
                            {parseFloat(item.price * item.quantity).toFixed(2)}
                          </strong>
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {detailsReservation?.orders?.observation && (
                <div className={styles.label_textarea} data-oid="-oedd83">
                  <strong data-oid="ty.wqsf">
                    <label htmlFor="" data-oid="-ych50-">
                      Observaciones (opcional)
                    </label>
                  </strong>
                  <textarea
                    name=""
                    id=""
                    cols="10"
                    placeholder="Alergias a alimentos, intolerancias a alimentos, especificaciones en el pedido, etc..."
                    value={detailsReservation?.orders?.observation}
                    rows={5}
                    className={styles.textarea}
                    data-oid="h-0ogps"
                  ></textarea>
                </div>
              )}

              <div className={styles.total} data-oid=".7r:gwd">
                <strong data-oid="2:xl5wi">Total: </strong>S/{getTotal()}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
