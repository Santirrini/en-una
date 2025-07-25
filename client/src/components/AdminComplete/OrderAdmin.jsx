import * as React from "react";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { dataPersonal, OrderDetails } from "../../redux/action";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Importa el adaptador de Day.js
import dayjs from "dayjs";
import styles from "./AdminComplete.module.css";
import axios from "axios";
import { Button, Box, Typography } from "@mui/material";
import printJS from "print-js";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import "dayjs/locale/es";

dayjs.locale("es");
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
  const [allOrders, setAllOrders] = React.useState();
  const orderDetails = useSelector((state) => state.orderDetails.data);
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [orderStatus, setOrderStatus] = React.useState({});
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [sortOption, setSortOption] = React.useState("name");
  console.log(allOrders);

  const handleOpen = (orderId) => {
    dispatch(OrderDetails(orderId));
    setOpen(orderId);
  };
  const handleCalendarNull = () => {
    setFromDate(null);
    setToDate(null);
    setSortOption("name");
  };
  const handleClose = () => setOpen(false);

  const handleStatusChange = (orderId, status) => {
    setOrderStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: status,
    }));
  };

  const AllOrder = async () => {
    try {
      const response = await axios.get(
        "https://en-una-production.up.railway.app/api/orders",
      );

      setAllOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    AllOrder();
  }, []);

  const filteredOrders = React.useMemo(() => {
    if (!allOrders) return []; // Aseguramos que allOrders exista

    return allOrders.filter((order) => {
      const orderDate = dayjs(order.orders?.date); // Aseguramos que orders y date existen
      const isAfterFromDate = fromDate
        ? orderDate.isSameOrAfter(dayjs(fromDate).startOf("day"))
        : true;
      const isBeforeToDate = toDate
        ? orderDate.isSameOrBefore(dayjs(toDate).endOf("day"))
        : true;
      const matchesSearchTerm = order.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return isAfterFromDate && isBeforeToDate && matchesSearchTerm;
    });
  }, [allOrders, fromDate, toDate, searchTerm]);

  const sortedOrders = React.useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
      switch (sortOption) {
        case "hours":
          const timeToMinutes = (time) => {
            if (!time) return 0;
            const [hours, minutes] = time.split(":").map(Number);
            return hours * 60 + minutes;
          };
          return (
            timeToMinutes(a.orders?.hours) - timeToMinutes(b.orders?.hours)
          );

        case "peoples":
          return (
            parseInt(a.orders?.peoples || 0, 10) -
            parseInt(b.orders?.peoples || 0, 10)
          );

        case "name":
          const nameA = a.name?.toLowerCase() || "";
          const nameB = b.name?.toLowerCase() || "";
          return nameA.localeCompare(nameB);

        case "status":
          const statusA = a.status?.toLowerCase() || "";
          const statusB = b.status?.toLowerCase() || "";
          return statusA.localeCompare(statusB);

        case "date":
          const parseDate = (date) => {
            if (!date) return dayjs(0); // Fecha mínima si no hay valor
            return dayjs(date, "DD/MM/YYYY");
          };
          const dateA = parseDate(a.orders?.date || null);
          const dateB = parseDate(b.orders?.date || null);
          return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;

        case "date_payment":
          const paymentDateA = a.date_payment
            ? dayjs(a.date_payment)
            : dayjs(0);
          const paymentDateB = b.date_payment
            ? dayjs(b.date_payment)
            : dayjs(0);
          return paymentDateA.isBefore(paymentDateB)
            ? -1
            : paymentDateA.isAfter(paymentDateB)
              ? 1
              : 0;

        default:
          return 0;
      }
    });
  }, [filteredOrders, sortOption]);

  const handlePrint = (orderDetails) => {
    // Calcular el total basado en los elementos de la orden
    const items = orderDetails?.orders.order || [
      { quantity: 1, name: "Producto", price: 0.0 },
    ];

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const ticketData = {
      customerName: `${orderDetails?.name} ${orderDetails?.lastName}` || "",
      orderDate: orderDetails?.date || new Date().toLocaleDateString(),
      orderTime: orderDetails?.hours || new Date().toLocaleTimeString(),
      area: orderDetails?.orders.area || "",

      items: items,

      observation: orderDetails?.observation || "",

      total: total,
    };

    const printContent = `
      <html>
        <head>
          <title>Imprimir Ticket</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              width: 58mm; /* Ancho típico para impresoras de 58mm */
              height: 100%;
            }
            #print-content {
              width: 100%;
              padding: 10px;
              border: 1px solid #000;
              box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
              background: #fff;
              font-size: 12px; /* Tamaño de fuente reducido para tickets más pequeños */
            }
            h1 {
              font-size: 14px;
              text-align: center;
              margin: 0;
              padding: 0;
            }
            p {
              margin: 3px 0;
              font-size: 12px;
            }
            h3 {
              font-size: 12px;
              margin: 5px 0;
            }
            @media print {
              body {
                margin: 0;
              }
              #print-content {
                width: 58mm; /* Asegura que el contenido se ajuste al ancho del ticket */
                margin: 0;
                padding: 0;
                border: none;
                box-shadow: none;
              }
            }
          </style>
        </head>
        <body>
          <div id="print-content">
            <h1>Ticket de Compra</h1>
            <p><strong>Cliente:</strong> ${ticketData.customerName}</p>
            <p><strong>Fecha:</strong> ${ticketData.orderDate}</p>
            <p><strong>Hora:</strong> ${ticketData.orderTime}</p>
            <p><strong>Zona:</strong> ${ticketData.area}</p>
    <br>
            <h3>Detalle del Pedido:</h3>
            ${ticketData.items
              .map(
                (item) => `
              <p>${item.quantity} x ${item.name} - S/ ${parseFloat(
                item.price * item.quantity,
              ).toFixed(2)}</p>
            `,
              )
              .join("")}
            <p><strong>Observación:</strong> ${ticketData.observation}</p>

            <p><strong>Total:</strong> S/ ${parseFloat(
              ticketData.total,
            ).toFixed(2)} </p>
          </div>
        </body>
      </html>
    `;

    printJS({
      printable: printContent,
      type: "raw-html",
      style: `
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          width: 58mm; /* Ancho típico para impresoras de 58mm */
          height: 100%;
        }
        #print-content {
          width: 100%;
          padding: 10px;
          border: 1px solid #000;
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
          background: #fff;
          font-size: 12px; /* Tamaño de fuente reducido para tickets más pequeños */
        }
        h1 {
          font-size: 14px;
          text-align: center;
          margin: 0;
          padding: 0;
        }
        p {
          margin: 3px 0;
          font-size: 12px;
        }
        h3 {
          font-size: 12px;
          margin: 5px 0;
        }
      `,
    });
  };

  const handlePrintClick = () => {
    handlePrint(orderDetails);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} data-oid="j9n1dv5">
      <div className={styles.search_container} data-oid="dsjqz6o">
        <Search className="input-container" data-oid="ze-kxwc">
          <input
            placeholder="Buscar por nombre..."
            className={styles.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-oid="n8z89wd"
          />

          <SearchIconWrapper data-oid="f6-g3h_">
            <SearchIcon data-oid="ew7zf84" />
          </SearchIconWrapper>
        </Search>
      </div>

      <div className={styles.order_for_container} data-oid="jeb2hnm">
        <div className={styles.container_btnReset} data-oid="i2cs7yg">
          <Button
            variant="contained"
            onClick={handleCalendarNull}
            sx={{
              backgroundColor: "#500075",
              height: "4em",
              ":hover": {
                backgroundColor: "#500075",
              },
            }}
            data-oid="r6anigo"
          >
            Ver todo
          </Button>
        </div>
        <div data-oid="g06f4vk">
          <label htmlFor="" data-oid="br8zssi">
            <h4 data-oid=":_fnyb8">Fecha</h4>
          </label>
          <div className={styles.calendar} data-oid="_u3mayw">
            <DatePicker
              label="Desde"
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
              format="DD-MM-YYYY"
              data-oid="qiqeo_5"
            />

            <DatePicker
              label="Hasta"
              value={toDate}
              onChange={(newValue) => setToDate(newValue)}
              format="DD-MM-YYYY"
              data-oid="owmvvha"
            />
          </div>
        </div>
        <div data-oid="9ka8yhd">
          <h4 data-oid="g20o9mw">Ordenar pedido por:</h4>
          <div data-oid="g8mhs36">
            <select
              name="area"
              className={styles.order}
              required
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              data-oid="yyjgj4l"
            >
              <option value="name" data-oid="j:lpc8_">
                Nombre
              </option>
              <option value="hours" data-oid="a9qg7hu">
                Hora
              </option>
              <option value="peoples" data-oid="16kcn_0">
                Nro de personas
              </option>
              <option value="date" data-oid="9kg:g.a">
                Fecha
              </option>

              <option value="status" data-oid="r1eeqvb">
                Estado
              </option>
            </select>
          </div>
        </div>
      </div>
      <div
        className="isolate bg-white px-6 py-1 sm:py-1 lg:px-8"
        data-oid="ofz.kb-"
      >
        <div className={styles.boletin_container} data-oid="zmd-pie">
          <table className={styles.boletin_table} data-oid="la9s20d">
            <thead data-oid="hx.kqq3">
              <tr data-oid=":g6ho2v">
                <th data-oid="0xylw81">Fecha </th>
                <th data-oid="p7.fe4f">Nombre del comercio</th>
                <th data-oid="1e.4ag4">Local</th>

                <th data-oid="km.1v-5">Fecha de reserva</th>

                <th data-oid="akb6yj6">Hora</th>
                <th data-oid="hvdze6r">N* Persona</th>
                <th data-oid="d0h.lu6">Zona</th>
                <th data-oid="-aywt45">Nombre</th>
                <th data-oid="tz0mght">Telefono</th>
                <th data-oid="5ngs:z0">Correo</th>
                <th data-oid="6xfn:l1">Pedido</th>
                <th data-oid=":nznb-3">Estado</th>
              </tr>
            </thead>
            <tbody data-oid="9-2dyn9">
              {sortedOrders &&
                sortedOrders.map((data, index) => (
                  <tr key={index} data-oid="gjme.zb">
                    <td data-oid="jih8_r6">{data.date_payment}</td>

                    <td data-oid="17pu63e">{data.orders.Restaurant.name}</td>

                    <td data-oid="_rl3l7p">{data.orders.location}</td>
                    <td data-oid="4odpi5g">{data.orders.date}</td>

                    <td data-oid="fyboev_">{data.orders.hours}</td>
                    <td data-oid="wqzp5nl">{data.orders.peoples}</td>
                    <td data-oid="oe3n4w.">{data.orders.area}</td>

                    <td data-oid="j0u29my">{`${data.name} ${data.lastName}`}</td>
                    <td data-oid="8codfmd">{data.phone}</td>
                    <td data-oid="8aicoe4">{data.email}</td>
                    <td
                      className={styles.view_details}
                      onClick={() => handleOpen(data.id)}
                      data-oid="4wpoh.q"
                    >
                      Ver detalles
                    </td>
                    <td data-oid="yoqqooh">
                      <select
                        value={orderStatus[data.orders.id] || "Pendiente"}
                        onChange={(e) =>
                          handleStatusChange(data.orders.id, e.target.value)
                        }
                        className={
                          orderStatus[data.orders.id] === "Atendido"
                            ? styles.selectAtendido
                            : styles.selectPendiente
                        }
                        data-oid=":apgigt"
                      >
                        <option value="Pendiente" data-oid="d9vnl5.">
                          Pendiente
                        </option>
                        <option value="Atendido" data-oid="ibdaqb7">
                          Atendido
                        </option>
                      </select>
                    </td>
                    <Modal
                      open={open === data.id}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      data-oid="mszu645"
                    >
                      <Box sx={style} data-oid="jsejd03">
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
                          data-oid="y-3fpk9"
                        >
                          Detalle del pedido
                        </Typography>
                        <Typography
                          id="modal-modal-description"
                          sx={{ mt: 2, padding: 1, textAlign: "left" }}
                          data-oid="8datsp8"
                        >
                          {orderDetails?.orders?.order.map((orderData) => {
                            return (
                              <div
                                key={orderData.product?.id}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  placeItems: "center",
                                  margin: 0, // Eliminamos cualquier margen
                                  padding: 0, // Eliminamos cualquier padding adicional
                                }}
                                data-oid="jb13svg"
                              >
                                <p style={{ margin: 0 }} data-oid="q13ddcz">
                                  {orderData.quantity} {orderData.name}
                                </p>
                                <p style={{ margin: 0 }} data-oid="xffp00z">
                                  S/
                                  {parseFloat(
                                    orderData.price * orderData.quantity,
                                  ).toFixed(2)}
                                </p>
                              </div>
                            );
                          })}
                          {orderDetails?.observation ? (
                            <div
                              style={{ marginTop: "8px" }}
                              data-oid="s.:upoo"
                            >
                              <strong data-oid="_ecklft">Observación: </strong>
                              {orderDetails?.observation}
                            </div>
                          ) : null}
                        </Typography>
                        <Typography
                          id="modal-modal-description"
                          sx={{ mt: 2, padding: 1, textAlign: "center" }}
                          data-oid="vzhd230"
                        >
                          <div data-oid="xtsy0mo">
                            <h4 style={{ margin: 0 }} data-oid="r5r879a">
                              Total: S/
                              {parseFloat(
                                orderDetails?.orders?.order.reduce(
                                  (total, item) =>
                                    total + item.price * item.quantity,
                                  0,
                                ),
                              ).toFixed(2)}
                            </h4>
                          </div>
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            width: "50%",
                            margin: "auto",
                            gap: "1em",
                            paddingBottom: "1em",
                          }}
                          data-oid="jxvpsxy"
                        >
                          <Button
                            variant="outlined"
                            sx={{
                              border: "2px solid #500075",
                              color: "#500075",
                              ":hover": {
                                border: "2px solid #500075",
                                color: "#fff",
                                backgroundColor: "#500075",
                              },
                            }}
                            onClick={handlePrintClick}
                            data-oid="-f15q66"
                          >
                            Imprimir Ticket
                          </Button>
                          <Button
                            variant="outlined"
                            sx={{
                              border: "2px solid #500075",
                              backgroundColor: "#500075",
                              color: "#fff",
                              ":hover": {
                                border: "2px solid #500075",
                                color: "#fff",
                                backgroundColor: "#500075",
                              },
                            }}
                            onClick={handleClose}
                            data-oid="ij1pvts"
                          >
                            salir
                          </Button>
                        </Box>
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
