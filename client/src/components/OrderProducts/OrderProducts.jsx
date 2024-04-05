import * as React from "react";

import Box from "@mui/material/Box";
import styles from "./OrderProducts.module.css";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { AllOrder, deleteOrder } from "../../redux/action";
import Button from '@mui/material/Button';

export default function OrderProducts() {
  const dispatch = useDispatch();
  const [data, setData] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [generationSearchTerm, setGenerationSearchTerm] = React.useState("");
 const allOrders = useSelector(state => state.allOrders);
console.log(allOrders);
  React.useEffect(() => {
    dispatch(AllOrder());
  }, [dispatch]);


  const handleDeleteOrder= (productId) => {
    try {
      dispatch(deleteOrder(productId)); 
      
    } catch (error) {
      console.error(error);
    } finally {
window.location.reload()
    }
  };
  return (
    <>
      <div className={styles.OrderProducts_container}>
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
                <th>Talle</th>
                <th>Precio total</th>

                <th>-</th>

              </tr>
            </thead>
            <tbody>
              {allOrders &&
                allOrders
                  .filter((row) =>
                    row.name && row.name.toLowerCase().includes(searchTerm.toLowerCase())
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

                      <td>{row.size}</td>
                      <td>{row.price_total}</td>
                      <td>
            <Button variant="contained" sx={{backgroundColor: 'red', ':hover': {backgroundColor: 'red'}}} onClick={() => handleDeleteOrder(row.id)}>Eliminar</Button> {/* Botón para eliminar un producto */}

                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
