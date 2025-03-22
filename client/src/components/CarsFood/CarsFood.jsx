import * as React from "react";
import { PaymentReserve, dataPersonal, DetailRestaurant } from "../../redux/action";
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
    await dispatch(PaymentReserve(token, reserve));
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
        ? 13
        : 20; // 10 caracteres en pantallas pequeñas, 30 en pantallas grandes
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
        : 70; // 10 caracteres en pantallas pequeñas, 30 en pantallas grandes
    if (texto.length > limite) {
      return texto.slice(0, limite) + "...";
    }
    return texto;
  };

  const handleRemoveAll = () => {
    localStorage.removeItem(`cart_${userId}`);
    localStorage.removeItem(`form_${userId}`);
    localStorage.removeItem('orderId', orderId);
    navigate("/"); // Regresa a la página anterior
  };

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
            {items.length > 0 ? (
              <div className={styles.carsfood_container}>
                <h1 className={styles.text}>Detalle de la reserva</h1>
                <div className={styles.form_container}>
                  <div>
                    <strong>Restaurante:</strong> {formData[0].formData?.name}
                  </div>
                  {formData[0].formData?.location ? (
                    <div>
                      <strong>Local:</strong> {formData[0].formData?.location}
                    </div>
                  ) : null}

                  {formData[0].formData?.date ? (
                    <div>
                      <strong>Fecha:</strong> {formData[0].formData?.date}
                    </div>
                  ) : null}
                  {formData[0].formData?.hours ? (
                    <div>
                      <strong>Hora: </strong>
                      {formData[0].formData?.hours}
                    </div>
                  ) : null}
                  {formData[0].formData?.peoples ? (
                    <div>
                      <strong>Personas:</strong> {formData[0].formData?.peoples}
                    </div>
                  ) : null}
                  {formData[0].formData?.area ? (
                    <div>
                      <strong>Zona:</strong> {formData[0].formData?.area}
                    </div>
                  ) : null}
                </div>
<div className={styles.container_complete}>

                <div className={styles.menufood_container}>
                  {items.map((item, index) => (
                    <>
                      <Card className={styles.menufood_box} key={index}>
                        {item?.imageFile && item.imageFile[0] && (
                          <CardMedia
                            component="img"
                            className={styles.card_media}
                            image={item.imageFile[0]}
                            alt="Menu"
                          />

                        )}

                        <CardContent sx={{ width: "100%" }}>
                          <Typography
                            component="div"
                            variant="h5"
                            className={styles.name_product}
                          >
                            {limitarTitle(item?.name)}
                          </Typography>

                          {/* Asegura que item.details ocupe todo el ancho */}
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                            className={styles.details_product}
                          >
                            {limitarTexto(item?.details)}
                          </Typography>

                          <Box
                         
                            className={styles.button}
                          >
                            <div
                              onClick={() => handleDecreaseQuantity(index)}
                              className={styles.btn_decrease_increment}
                            >
                              -
                            </div>
                            <div className={styles.btn_decrease_increment}>
                              {item.quantity}
                            </div>
                            <div
                              onClick={() => handleIncreaseQuantity(index)}
                              className={styles.btn_decrease_increment}
                            >
                              +
                            </div>
                            <div
                              onClick={() => handleRemove(index)}
                              className={styles.btn_delete}
                            >
                              <DeleteIcon sx={{ color: "white" }} />
                            </div>
                          </Box>

                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                            className= {styles.text_Cantidad}
                          >
                            Cantidad: {item.quantity}
                          </Typography>
                        </CardContent>

                        <div className={styles.quantity_price}>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            <strong>
                              S/
                              {parseFloat(
                                item.basePrice * item.quantity
                              ).toFixed(2)}
                            </strong>
                          </Typography>
                        </div>
                      </Card>
                    </>
                  ))}
                </div>

                <div  className={styles.label_textarea}>
                  <strong>
                    <label htmlFor="">Observaciones (opcional)</label>
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
                    
                  ></textarea>
                </div>
                </div>
                <div className={styles.btn_container}>
                  <div>
                    <strong>Total: </strong>S/{getTotal()}
                  </div>
              
                  <FormIzipay getTotal={getTotal} handleReserve={handleReserve} loading={loading} orderId={orderId} />

                  <Button
                    className={styles.btn_clean}
                    onClick={handleRemoveAll}
                  >
                    Limpiar
                  </Button>
                </div>
              </div>
            ) : (
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
            )}
          </>
        )}
      </>
 
    </div>
  );
}
