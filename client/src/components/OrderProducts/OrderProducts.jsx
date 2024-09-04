import * as React from "react";
import styles from "./OrderProducts.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { AllOrder, dataPersonal, OrderDetails } from "../../redux/action";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Importa el adaptador de Day.js
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

// Configura dayjs con los plugins necesarios
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "2em",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  height: "2.5em",
  border: "1px solid #500075",
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
  color: "#500075",
}));

export default function OrderProducts() {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.allOrders);
  const orderDetails = useSelector((state) => state.orderDetails.data);
  const token = useSelector((state) => state.token);
  const datapersonal = useSelector((state) => state.datapersonal);

  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [orderStatus, setOrderStatus] = React.useState({});
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [sortOption, setSortOption] = React.useState("hours");

  const handleOpen = (orderId) => {
    dispatch(OrderDetails(orderId));
    setOpen(orderId);
  };

  const handleClose = () => setOpen(false);

  const handleStatusChange = (orderId, status) => {
    setOrderStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: status,
    }));
  };

  React.useEffect(() => {
    dispatch(AllOrder(datapersonal.Restaurant?.id));
  }, [dispatch, datapersonal]);

  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch, token]);

  const filteredOrders = React.useMemo(() => {
    return allOrders
      .filter((order) => {
        const orderDate = dayjs(order.orders.date);
        const isAfterFromDate = fromDate ? orderDate.isSameOrAfter(dayjs(fromDate).startOf("day")) : true;
        const isBeforeToDate = toDate ? orderDate.isSameOrBefore(dayjs(toDate).endOf("day")) : true;
        const matchesSearchTerm = order.name.toLowerCase().includes(searchTerm.toLowerCase());
        return isAfterFromDate && isBeforeToDate && matchesSearchTerm;
      });
  }, [allOrders, fromDate, toDate, searchTerm]);

  const sortedOrders = React.useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
      switch (sortOption) {
        case "hours":
          return a.orders.hours.localeCompare(b.orders.hours);
        case "peoples":
          return parseInt(a.orders.peoples) - parseInt(b.orders.peoples);
        case "name":
          return a.name.localeCompare(b.name);
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });
  }, [filteredOrders, sortOption]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={styles.search_container}>
        <Search className="input-container">
          <input
            placeholder="Buscar por nombre..."
            className={styles.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        </Search>
      </div>
      <div className={styles.order_for_container}>
        <div>
          <label htmlFor="">

          <h4>Fecha</h4>
          </label>
          <div className={styles.calendar} >
            <DatePicker
              label="Desde"
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
              format="YYYY-MM-DD"
            />
            <DatePicker
              label="Hasta"
              value={toDate}
              onChange={(newValue) => setToDate(newValue)}
              format="YYYY-MM-DD"
            />
          </div>
        </div>
        <div>
          <h4>Ordenar pedido por:</h4>
          <div>
            <select
              name="area"
              className={ styles.order}
              required
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="hours">Hora</option>
              <option value="peoples">Nro de personas</option>
              <option value="name">Nombre</option>
              <option value="status">Estado</option>
            </select>
          </div>
        </div>
      </div>
      <div className="isolate bg-white px-6 py-1 sm:py-1 lg:px-8">
        <div className={styles.boletin_container}>
          <table className={styles.boletin_table}>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>N* Persona</th>
                <th>Nombre</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Pedido</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {sortedOrders.map((data, index) => (
                <tr key={index}>
                  <td>{data.orders.date}</td>
                  <td>{data.orders.hours}</td>
                  <td>{data.orders.peoples}</td>
                  <td>{`${data.name} ${data.lastName}`}</td>
                  <td>{data.phone}</td>
                  <td>{data.email}</td>
                  <td onClick={() => handleOpen(data.orders.id)}>Ver detalles</td>
                  <td>
                    <select
                      value={orderStatus[data.orders.id] || "Pendiente"}
                      onChange={(e) => handleStatusChange(data.orders.id, e.target.value)}
                      className={
                        orderStatus[data.orders.id] === "Atendido"
                          ? styles.selectAtendido
                          : styles.selectPendiente
                      }
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Atendido">Atendido</option>
                    </select>
                  </td>
                  <Modal
                    open={open === data.orders.id}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                          backgroundColor: "#500075",
                          color: "#fff",
                          padding: 1,
                          textAlign: "center",
                        }}
                      >
                        Detalle del pedido
                      </Typography>
                      <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2, padding: 1, textAlign: "center" }}
                      >
                        {orderDetails?.order.map((orderData) => {
                          return (
                            <div key={orderData.product.id}>
                              <p>{orderData.product.name}</p>
                              <p>Precio: {orderData.product.price}€</p>
                              <p>Cantidad: {orderData.quantity}</p>
                            </div>
                          );
                        })}
                      </Typography>
                    </Box>
                  </Modal>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LocalizationProvider>
  );
}
