import * as React from "react";
import { PaymentReserve } from "../../redux/action";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./CarsFood.module.css";
import { Result } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function CarsFood() {
  const dispatch = useDispatch();
  const [items, setItems] = React.useState([]);
  const [formData, setFormData] = React.useState({});
  const [quantity, setQuantity] = React.useState({});
  const [reserve, setReserve] = React.useState({
    local: "",
    date: "",
    hours: "",
    peoples: "",
    order: [],
    restaurantId: "",
  });
  const paymentData = useSelector((state) => state.paymentData);
  const token = useSelector((state) => state.token);
  React.useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCartData = cartData.map((item) => ({
      ...item,
      basePrice: item.basePrice || item.price,
      quantity: item.quantity || 1,
      price: item.price || item.basePrice,
    }));
    setItems(updatedCartData);
    localStorage.setItem("cart", JSON.stringify(updatedCartData));

    const quantities = {};
    updatedCartData.forEach((item, index) => {
      quantities[index] = item.quantity || 1;
    });
    setQuantity(quantities);

    const form = JSON.parse(localStorage.getItem("form")) || {};
    setFormData(form);
    setReserve({
      local: form[0]?.formData.local || "",
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
  
  const form = JSON.parse(localStorage.getItem("form")) || {};
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

  const handleIncrease = (index) => {
    const newQuantity = { ...quantity, [index]: (quantity[index] || 1) + 1 };
    setQuantity(newQuantity);

    const updatedItems = [...items];
    updatedItems[index].quantity = newQuantity[index];
    updatedItems[index].price =
      parseFloat(updatedItems[index].basePrice) * newQuantity[index];
    setItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    updateReserve(updatedItems);
  };

  const handleDecrease = (index) => {
    const newQuantity = {
      ...quantity,
      [index]: Math.max((quantity[index] || 1) - 1, 1),
    };
    setQuantity(newQuantity);

    const updatedItems = [...items];
    updatedItems[index].quantity = newQuantity[index];
    updatedItems[index].price =
      parseFloat(updatedItems[index].basePrice) * newQuantity[index];
    setItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    updateReserve(updatedItems);
  };

  const handleRemove = (index) => {
    const newItems = items.filter((_, itemIndex) => itemIndex !== index);
    setItems(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems));

    const newQuantity = { ...quantity };
    delete newQuantity[index];
    setQuantity(newQuantity);

    if (newItems.length === 0) {
      localStorage.removeItem("cart");
      setFormData({});
    } else {
      localStorage.setItem("cart", JSON.stringify(newItems));
    }
    updateReserve(newItems);
  };

  const handleReserve = async () => {
    try {
      dispatch(PaymentReserve(token, reserve));
    } catch (error) {
      alert("error en el sistema");
      console.error("Error al realizar la reserva:", error);
    }
  };
  React.useEffect(() => {
    if (paymentData) {
      window.location.href = paymentData.data && paymentData.data;
    }
  }, [paymentData]);
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
      ): (

    <>

      {items.length < 1 ? (
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
          <h1 className={styles.text}>Carrito</h1>
          <div className={styles.menufood_container}>
            {items.map((item, index) => (
              <Card className={styles.menufood_box} key={index}>
                {item?.imageFile && item.imageFile[0] && (
                  <CardMedia
                    component="img"
                    sx={{ width: 151, height: 151 }}
                    image={item.imageFile[0]}
                    alt="Live from space album cover"
                  />
                )}
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
                      ${parseFloat(item.price).toFixed(2)}
                    </Typography>
                  </CardContent>
                  <Box
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
                    <Button
                      sx={{ display: "flex", flex: 2, color: "#500075 " }}
                      onClick={() => handleRemove(index)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Box>
                </Box>
              </Card>
            ))}
          </div>

          <div className={styles.form_container}>
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
          </div>

          <div className={styles.btn_container}>
            <Button className={styles.btn_login} onClick={handleReserve}>
              Reservar
            </Button>
          </div>
        </div>
      )}
    </>
    )}

      </>

    </div>
  );
}
