import * as React from "react";

import Box from "@mui/material/Box";
import styles from "./OrderProducts.module.css";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  AllOrder,
  dataPersonal,
  OrderDratails,
} from "../../redux/action";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxWidth: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function OrderProducts() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = React.useState("");
  const allOrders = useSelector((state) => state.allOrders);
  const orderDetails = useSelector((state) => state.orderDetails.data);

  const token = useSelector((state) => state.token);
  const datapersonal = useSelector((state) => state.datapersonal);
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = (orderId) => {
    dispatch(OrderDratails(orderId));

    setOpen(orderId);
  };
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    dispatch(AllOrder(datapersonal.Restaurant?.id));
  }, [dispatch, datapersonal]);
  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch, token]);
/*   const handleDeleteOrder = (productId) => {
    try {
      dispatch(deleteOrder(productId));
    } catch (error) {
      console.error(error);
    } finally {
      window.location.reload();
    }
  }; */
  return (
    <>
      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <Box sx={{ display: "flex", justifyContent: "center", gap: "2em" }}>
          <div className={styles.search}>
            <TextField
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              label="Buscar por nombre..."
            />
          </div>
        </Box>

        <div className={styles.boletin_container}>
          <table className={styles.boletin_table}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Ver pedido</th>
              </tr>
            </thead>
            <tbody>
              {allOrders &&
                allOrders
                  .filter(
                    (row) =>
                      row.name &&
                      row.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((row) => (
                    <tr key={row.id}>
                      <td>
                        <a href={`/orden/${row.id}`} target="__blank">
                          {row.name} {row.lastName}
                        </a>
                      </td>

                      <td>{row.email}</td>
                      <td>{row.phone}</td>

                      <td>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#500075",
                            ":hover": { backgroundColor: "#500075" },
                          }}
                          onClick={() => handleOpen(row.orderId)}
                        >
                          Ver
                        </Button>{" "}
                      </td>

                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            Detalles del ciente
                          </Typography>
                          <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                          >
                            <strong>Nombre:</strong> {row.name}
                            <br />
                            <strong>Email:</strong> {row.email}
                            <br />
                            <strong>Telefóno:</strong>{" "}
                            {row.phone}
                          </Typography>
                          <br />
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            Detalles de la reserva
                          </Typography>
                          <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                          >
                            <strong>Fecha:</strong> {orderDetails?.date}
                            <br />
                            <strong>Horario:</strong> {orderDetails?.hours}
                            <br />
                            <strong>Cantidad de personas:</strong>{" "}
                            {orderDetails?.peoples}
                            <br />
                            <strong>Localidad:</strong> {orderDetails?.location}
                            <br />
                          </Typography>
                          <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                          >
                         {orderDetails?.order.map((data) => (
<div>

                           <strong>Comida:</strong> {data.name}, {" "}
                           <strong>Precio:</strong> ${data.price}, {" "}
                           <strong>Cantidad:</strong> {data.quantity}, {" "}
                           <br />

</div>
                          ))} 
                            <br />
                            <br />
                            <br />
                          </Typography>
                        </Box>
                      </Modal>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
