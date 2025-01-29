import React, { useEffect, useState } from 'react';
import styles from './AdminComplete.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { DetailRestaurant, DetailUser } from '../../redux/action';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const OrdersList = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // Estado para almacenar el pedido seleccionado

  const handleClose = () => setOpen(false);
  const restaurantdetails = useSelector((state) => state.restaurantdetails?.data);
  const detailuser = useSelector((state) => state.detailuser?.data);
  const handleOpen = (order, userId) => {
    setSelectedOrder(order);
    dispatch(DetailUser(userId))
    setOpen(true);
  };
  useEffect(() => {
    if (restaurantId) {
      dispatch(DetailRestaurant(restaurantId));
    }
  }, [dispatch, restaurantId]);




  return (
    <div className={styles.ordersContainer}>
      <h2 className={styles.title}>Pedidos Realizados</h2>
      <div className={styles.ordersGrid}>
        {restaurantdetails && restaurantdetails.Orders.map((order, index) => {
          // Calcular el total de cada pedido
          const totalOrderPrice = order.order.reduce((total, item) => total + item.price * item.quantity, 0);

          return (
            <div key={index} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <h3>Pedido #{order.id}</h3>
                <p><strong>Cliente:</strong> {order.customerName}</p>
              </div>
              <div className={styles.orderDetails}>
                <p><strong>Fecha:</strong> {order.date}</p>
                <p><strong>Hora:</strong> {order.hours}</p>
                <p><strong>Estado:</strong> {order.status}</p>
                <p><strong>Total:</strong> ${totalOrderPrice.toFixed(2)}</p>
              </div>
              <button onClick={() => handleOpen(order, order.userId)} className={styles.detailsButton}>Ver Detalles</button>
            </div>
          );
        })}

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
        <Fade in={open}>
      <Box sx={style}>
        {selectedOrder ? (
          <>
            <Typography 
              id="transition-modal-title" 
              variant="h5" 
              component="h2" 
              color="primary" 
              fontWeight="bold"
              gutterBottom
              textAlign="center"
              sx={{color: "#000"}}
            >
              Detalles del Pedido #{selectedOrder.id}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <p><strong>Cliente:</strong> {detailuser && `${detailuser.name} ${detailuser.lastName}`}</p>
              <p><strong>Fecha:</strong> {selectedOrder.date}</p>
              <p><strong>Hora:</strong> {selectedOrder.hours}</p>
              <p><strong>Cantidad de personas:</strong> {selectedOrder.peoples}</p>
              <p><strong>Zona:</strong> {selectedOrder.area}</p>

              <p><strong>Estado:</strong> {selectedOrder.status}</p>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" fontWeight="medium" color="secondary" gutterBottom
              sx={{color: "#000"}}
              
              >
                <strong>

                Detalles del Pedido:
                </strong>
              </Typography>
              <ul style={{ paddingLeft: '20px', listStyleType: 'none', lineHeight: '1.8' }}>
                {selectedOrder.order.map((item, index) => (
                  <li key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{item.name}</span>
                    <span>S/{item.price} x {item.quantity} = <strong>S/{(item.price * item.quantity).toFixed(2)}</strong></span>
                  </li>
                ))}
              </ul>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" textAlign="right" color="primary" fontWeight="bold" 
              sx={{color: "#000"}}
              
              >
                Total del Pedido: S/{selectedOrder.order.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
              </Typography>
            </Typography>
          </>
        ) : (
          <Typography textAlign="center">Loading...</Typography>
        )}
      </Box>
    </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default OrdersList;
