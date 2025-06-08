import * as React from "react";
import styles from "./OrderProducts.module.css";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { AllOrder, dataPersonal, OrderDetails } from "../../redux/action";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Importa el adaptador de Day.js
import dayjs from "dayjs";
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
  const allOrders = useSelector((state) => state.allOrders);
  const orderDetails = useSelector((state) => state.orderDetails.data);
  console.log(orderDetails);
  const token = useSelector((state) => state.token);
  const datapersonal = useSelector((state) => state.datapersonal);
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [orderStatus, setOrderStatus] = React.useState({});
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [sortOption, setSortOption] = React.useState("name");
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

  React.useEffect(() => {
    dispatch(AllOrder(datapersonal.Restaurant?.id));
  }, [dispatch, datapersonal]);

  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch, token]);

  const filteredOrders = React.useMemo(() => {
    return allOrders.filter((order) => {
      const orderDate = dayjs(order.orders.date);
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
    <LocalizationProvider dateAdapter={AdapterDayjs} data-oid="tba27ci">
      <div className={styles.search_container} data-oid="u_id5sb">
        <Search className="input-container" data-oid="8gq2q9m">
          <input
            placeholder="Buscar por nombre..."
            className={styles.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-oid="11wsi7q"
          />

          <SearchIconWrapper data-oid="i-hnbrm">
            <SearchIcon data-oid="_m:tuop" />
          </SearchIconWrapper>
        </Search>
      </div>

      <div className={styles.order_for_container} data-oid="8_ew9np">
        <div className={styles.container_btnReset} data-oid="9mry77i">
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
            data-oid="1ixk_kv"
          >
            Ver todo
          </Button>
        </div>
        <div data-oid="7su17sn">
          <label htmlFor="" data-oid="18vs_fp">
            <h4 data-oid="s2tqtlf">Fecha</h4>
          </label>
          <div className={styles.calendar} data-oid="kzggch.">
            <DatePicker
              label="Desde"
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
              format="DD-MM-YYYY"
              data-oid="98-vm1d"
            />

            <DatePicker
              label="Hasta"
              value={toDate}
              onChange={(newValue) => setToDate(newValue)}
              format="DD-MM-YYYY"
              data-oid="3imwtb:"
            />
          </div>
        </div>
        <div data-oid="n_o5w0m">
          <h4 data-oid="testv7o">Ordenar pedido por:</h4>
          <div data-oid="ckxh2zd">
            <select
              name="area"
              className={styles.order}
              required
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              data-oid="59i4:vq"
            >
              <option value="name" data-oid="e6e8vf5">
                Nombre
              </option>
              <option value="hours" data-oid="kgj4hf4">
                Hora
              </option>
              <option value="peoples" data-oid="74je5pg">
                Nro de personas
              </option>
              <option value="date" data-oid="-.ozxqs">
                Fecha
              </option>

              <option value="status" data-oid="-:qr50p">
                Estado
              </option>
            </select>
          </div>
        </div>
      </div>
      <div
        className="isolate bg-white px-6 py-1 sm:py-1 lg:px-8"
        data-oid="iy0ui.3"
      >
        <div className={styles.boletin_container} data-oid="dnpsn9y">
          <table className={styles.boletin_table} data-oid=":mlnmg3">
            <thead data-oid="t82m-cy">
              <tr data-oid="hx6uuc9">
                <th data-oid="iwug_pu">Fecha de reserva</th>
                <th data-oid="1k3s7ch">Hora</th>
                <th data-oid="wyxr3z9">N* Persona</th>
                <th data-oid="p:ci99r">Zona</th>
                <th data-oid="..2d7rp">Nombre</th>
                <th data-oid="0n0shd5">Telefono</th>
                <th data-oid="_:teazy">Correo</th>
                <th data-oid="0cwo2fu">Pedido</th>
                <th data-oid="uc0oaw0">Estado</th>
              </tr>
            </thead>
            <tbody data-oid="833sd44">
              {sortedOrders.map((data, index) => (
                <tr key={index} data-oid="n3wu077">
                  <td data-oid="-.c3rhc">{data.orders.date}</td>
                  <td data-oid="u57lm-k">{data.orders.hours}</td>
                  <td data-oid="yq.s0iy">{data.orders.peoples}</td>
                  <td data-oid="9k26dph">{data.orders.area}</td>

                  <td data-oid="d-ybvtw">{`${data.name} ${data.lastName}`}</td>
                  <td data-oid="dao4iap">{data.phone}</td>
                  <td data-oid="2zm-tc6">{data.email}</td>
                  <td
                    className={styles.view_details}
                    onClick={() => handleOpen(data.id)}
                    data-oid="pcdcxrt"
                  >
                    Ver detalles
                  </td>
                  <td data-oid="l:.gdcy">
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
                      data-oid="k0:jrs3"
                    >
                      <option value="Pendiente" data-oid="0_tyrfs">
                        Pendiente
                      </option>
                      <option value="Atendido" data-oid=":891rq9">
                        Atendido
                      </option>
                    </select>
                  </td>
                  <Modal
                    open={open === data.id}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    data-oid="c.pqqc1"
                  >
                    <Box sx={style} data-oid="z2tb.ez">
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
                        data-oid="h0b_.ei"
                      >
                        Detalle del pedido
                      </Typography>
                      <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2, padding: 1, textAlign: "left" }}
                        data-oid="ju0k-t2"
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
                              data-oid="ptoqf13"
                            >
                              <p style={{ margin: 0 }} data-oid="ud50ydd">
                                {orderData.quantity} {orderData.name}
                              </p>
                              <p style={{ margin: 0 }} data-oid="myl_4nq">
                                S/
                                {parseFloat(
                                  orderData.price * orderData.quantity,
                                ).toFixed(2)}
                              </p>
                            </div>
                          );
                        })}
                        {orderDetails?.observation ? (
                          <div style={{ marginTop: "8px" }} data-oid="4ebzuyq">
                            <strong data-oid="-l.euze">Observación: </strong>
                            {orderDetails?.observation}
                          </div>
                        ) : null}
                      </Typography>
                      <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2, padding: 1, textAlign: "center" }}
                        data-oid="hu:1g-i"
                      >
                        <div data-oid="9ir.a1d">
                          <h4 style={{ margin: 0 }} data-oid="ubk9:x3">
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
                        data-oid="cyi982:"
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
                          data-oid="wwhj85v"
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
                          data-oid="d-:ldvn"
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
