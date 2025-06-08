import * as React from "react";
import {
  PaymentReserve,
  dataPersonal,
  DetailRestaurant,
} from "../../redux/action";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./CarsFood.module.css";
import { Result } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormIzipay from "./FormIzipay";
import SuccessReserve from "../SuccessReserve/SuccessReserve";

export default function CarsFood() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [items, setItems] = React.useState([]);
  const [formData, setFormData] = React.useState({});
  const [quantity, setQuantity] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.userId);
  const orderId = useSelector((state) => state.orderId);

  const [reserve, setReserve] = React.useState({
    name: "",
    lastName: "",
    area: "",
    location: "",
    date: "",
    hours: "",
    peoples: "",
    observation: "",
    order: [],
    restaurantId: "",
  });
  React.useEffect(() => {
    dispatch(DetailRestaurant(items.id));
  }, [dispatch, items.id]);
  React.useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    const quantities = {};
    cartData.forEach((item, index) => {
      quantities[index] = item.quantity || 1;
    });
    setQuantity(quantities);
  }, []);

  React.useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    const updatedCartData = cartData.map((item) => ({
      ...item,
      basePrice: item.basePrice || item.price,
      quantity: item.quantity || 1,
      price: item.price || item.basePrice,
    }));
    setItems(updatedCartData);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCartData));

    const quantities = {};
    updatedCartData.forEach((item, index) => {
      quantities[index] = item.quantity || 1;
    });
    setQuantity(quantities);

    const form = JSON.parse(localStorage.getItem(`form_${userId}`)) || {};
    setFormData(form);
    setReserve({
      area: form[0]?.formData.area || "",
      location: form[0]?.formData.location || "",
      date: form[0]?.formData.date || "",
      hours: form[0]?.formData.hours || "",
      peoples: form[0]?.formData.peoples || "",
      order: updatedCartData.map((item) => ({
        id: item.id,
        name: item.name,
        price: parseFloat(item.basePrice),
        quantity: item.quantity || 1,
        restaurantId: item.restaurantId,
        imageFile: item.imageFile,
        details: item.details,
      })),
      restaurantId:
        updatedCartData.length > 0 ? updatedCartData[0].restaurantId : "",
    });
  }, []);
  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch, token]);
  React.useEffect(() => {
    const form = JSON.parse(localStorage.getItem(`form_${userId}`)) || {};
    setFormData(form);
  }, []);

  const updateReserve = (updatedItems) => {
    setReserve({
      ...reserve,
      order: updatedItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: parseFloat(item.basePrice),
        quantity: item.quantity,
        restaurantId: item.restaurantId,
        imageFile: item.imageFile,
        details: item.details,
      })),
    });
  };

  const handleIncreaseQuantity = (index) => {
    const newCartItems = [...items];
    newCartItems[index].quantity = (newCartItems[index].quantity || 1) + 1;
    setItems(newCartItems);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(newCartItems));
    updateReserve(newCartItems);
    setQuantity({ ...quantity, [index]: newCartItems[index].quantity });
  };

  const handleDecreaseQuantity = (index) => {
    const newCartItems = [...items];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1;
      setItems(newCartItems);
      localStorage.setItem(`cart_${userId}`, JSON.stringify(newCartItems));
      updateReserve(newCartItems);
      setQuantity({ ...quantity, [index]: newCartItems[index].quantity });
    }
  };

  const handleRemove = (index) => {
    const newItems = items.filter((_, itemIndex) => itemIndex !== index);
    setItems(newItems);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(newItems));

    const newQuantity = { ...quantity };
    delete newQuantity[index];
    setQuantity(newQuantity);

    if (newItems.length === 0) {
      localStorage.removeItem(`cart_${userId}`);
      setFormData({});
    } else {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(newItems));
    }
    updateReserve(newItems);
  };

  const handleReserve = async () => {
    setLoading(true);
    try {
      const newOrderId = await dispatch(PaymentReserve(token, reserve));
      return newOrderId; // 🔥 ahora tienes el ID de la orden
    } catch (error) {
      alert("error en el sistema");
      console.error("Error al realizar la reserva:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTotal = () => {
    return items
      .reduce(
        (total, item) => total + (parseFloat(item.price * item.quantity) || 0),
        0,
      )
      .toFixed(2);
  };

  const limitarTitle = (texto) => {
    const limite =
      window.innerWidth <= 768
        ? 28
        : window.innerWidth <= 1024
          ? 28
          : window.innerWidth <= 1440
            ? 28
            : 28; // 10 caracteres en pantallas pequeñas, 30 en pantallas grandes
    if (texto.length > limite) {
      return texto.slice(0, limite) + "...";
    }
    return texto;
  };
  const limitarTexto = (texto) => {
    const limite =
      window.innerWidth <= 768
        ? 60
        : window.innerWidth <= 1024
          ? 18
          : window.innerWidth <= 1440
            ? 30
            : 50; // 10 caracteres en pantallas pequeñas, 30 en pantallas grandes
    if (texto.length > limite) {
      return texto.slice(0, limite) + "...";
    }
    return texto;
  };

  const handleRemoveAll = () => {
    localStorage.removeItem(`cart_${userId}`);
    localStorage.removeItem(`form_${userId}`);
    localStorage.removeItem("orderId", orderId);
    navigate("/"); // Regresa a la página anterior
  };

  return (
    <div data-oid="nqyg47c">
      <>
        {!token ? (
          <div data-oid="p-.y45e">
            <Result
              title="Iniciar Sesión"
              subTitle="Por favor inicie sesión para ver los menús guardados en el carrito."
              extra={
                <Link to="/iniciar-sesión" data-oid="8oo9ujd">
                  <Button
                    sx={{
                      background: "#500075",
                      ":hover": { background: "#500075" },
                    }}
                    variant="contained"
                    data-oid="h25-zx1"
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
              }
              data-oid="ni96js9"
            />
          </div>
        ) : (
          <>
            {items.length > 0 ? (
              <div className={styles.carsfood_container} data-oid="t-8.yfi">
                <h1 className={styles.text} data-oid="cyk-lgx">
                  Detalle de la reserva
                </h1>
                <div className={styles.form_container} data-oid="q6ss1l7">
                  <div data-oid="bgnrp67">
                    <strong data-oid="cua6ynb">Restaurante:</strong>{" "}
                    {formData[0].formData?.name}
                  </div>
                  {formData[0].formData?.location ? (
                    <div data-oid="llgxk4r">
                      <strong data-oid="4evuc6a">Local:</strong>{" "}
                      {formData[0].formData?.location}
                    </div>
                  ) : null}

                  {formData[0].formData?.date ? (
                    <div data-oid="q6wx9pw">
                      <strong data-oid="zcw1-d1">Fecha:</strong>{" "}
                      {formData[0].formData?.date}
                    </div>
                  ) : null}
                  {formData[0].formData?.hours ? (
                    <div data-oid="w0iz_z8">
                      <strong data-oid="w7j1dca">Hora: </strong>
                      {formData[0].formData?.hours}
                    </div>
                  ) : null}
                  {formData[0].formData?.peoples ? (
                    <div data-oid="9k7xbkh">
                      <strong data-oid="bsexp15">Personas:</strong>{" "}
                      {formData[0].formData?.peoples}
                    </div>
                  ) : null}
                  {formData[0].formData?.area ? (
                    <div data-oid="kihu-d_">
                      <strong data-oid="7m5r26l">Zona:</strong>{" "}
                      {formData[0].formData?.area}
                    </div>
                  ) : null}
                </div>
                <div className={styles.container_complete} data-oid="6_gghb4">
                  <div className={styles.menufood_container} data-oid="sa20kt0">
                    {items.map((item, index) => (
                      <>
                        <Card
                          className={styles.menufood_box}
                          key={index}
                          data-oid="yemcnbs"
                        >
                          {item?.imageFile && item.imageFile[0] && (
                            <CardMedia
                              component="img"
                              className={styles.card_media}
                              image={item.imageFile[0]}
                              alt="Menu"
                              data-oid=":u9i:i3"
                            />
                          )}

                          <CardContent
                            sx={{ width: "100%" }}
                            data-oid="_t.:wjy"
                          >
                            <Typography
                              variant="subtitle1"
                              component="h4"
                              className={styles.name_product}
                              data-oid="qen:3zv"
                            >
                              {limitarTitle(item?.name)}
                            </Typography>

                            {/* Asegura que item.details ocupe todo el ancho */}
                            <Typography
                              variant="subtitle1"
                              color="text.secondary"
                              component="div"
                              className={styles.details_product}
                              data-oid="9x:_foq"
                            >
                              {limitarTexto(item?.details)}
                            </Typography>

                            <Box className={styles.button} data-oid="ll9.3jz">
                              <div
                                onClick={() => handleDecreaseQuantity(index)}
                                className={styles.btn_decrease_increment}
                                data-oid="oy_5yp9"
                              >
                                -
                              </div>
                              <div
                                className={styles.btn_decrease_increment}
                                data-oid="_e-at.w"
                              >
                                {item.quantity}
                              </div>
                              <div
                                onClick={() => handleIncreaseQuantity(index)}
                                className={styles.btn_decrease_increment}
                                data-oid="qke-_d3"
                              >
                                +
                              </div>
                              <div
                                onClick={() => handleRemove(index)}
                                className={styles.btn_delete}
                                data-oid="t9ku27x"
                              >
                                <DeleteIcon
                                  sx={{ color: "white" }}
                                  data-oid="i7n97x9"
                                />
                              </div>
                            </Box>

                            <Typography
                              variant="subtitle1"
                              color="text.secondary"
                              component="div"
                              className={styles.text_Cantidad}
                              data-oid="tq-jdh."
                            >
                              Cantidad: {item.quantity}
                            </Typography>
                          </CardContent>

                          <div
                            className={styles.quantity_price}
                            data-oid="8fuaut1"
                          >
                            <Typography
                              variant="subtitle1"
                              color="text.secondary"
                              component="div"
                              data-oid="8ijcdq8"
                            >
                              <strong data-oid="cvq9g2-">
                                S/
                                {parseFloat(
                                  item.basePrice * item.quantity,
                                ).toFixed(2)}
                              </strong>
                            </Typography>
                          </div>
                        </Card>
                      </>
                    ))}
                  </div>

                  <div className={styles.label_textarea} data-oid="hfm9g1a">
                    <strong data-oid="fw_11l4">
                      <label htmlFor="" data-oid="u3s:a.v">
                        Observaciones (opcional)
                      </label>
                    </strong>
                    <textarea
                      name=""
                      id=""
                      cols="10"
                      placeholder="Alergias a alimentos, intolerancias a alimentos, especificaciones en el pedido, etc..."
                      value={reserve.observation}
                      onChange={(e) => {
                        setReserve({ ...reserve, observation: e.target.value });
                      }}
                      rows={5}
                      className={styles.textarea}
                      data-oid="wepyr-x"
                    ></textarea>
                  </div>
                </div>
                <div className={styles.btn_container} data-oid="911usbi">
                  <div data-oid="zh-eyxw">
                    <strong data-oid="7t3e064">Total: </strong>S/{getTotal()}
                  </div>

                  <FormIzipay
                    getTotal={getTotal}
                    handleReserve={handleReserve}
                    loading={loading}
                    orderId={orderId}
                    data-oid="x3u3iy6"
                  />

                  <Button
                    className={styles.btn_clean}
                    onClick={handleRemoveAll}
                    data-oid=":z5bax7"
                  >
                    Limpiar
                  </Button>
                </div>
              </div>
            ) : (
              <div data-oid="vyag48_">
                <Result
                  title="No hay menús guardados en el carrito"
                  subTitle="Por favor, ingrese a los restaurantes para ver los menús y hacer las reservaciones."
                  extra={
                    <Link to="/" data-oid="2jpl.cs">
                      <Button
                        sx={{
                          background: "#500075",
                          ":hover": { background: "#500075" },
                        }}
                        variant="contained"
                        data-oid="ft1axi0"
                      >
                        Ver restaurantes
                      </Button>
                    </Link>
                  }
                  data-oid="lluyzkn"
                />
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
}
