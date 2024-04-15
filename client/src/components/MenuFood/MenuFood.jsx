import Card from "@mui/material/Card";
import styles from "./MenuFood.module.css";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { DetailRestaurant } from '../../redux/action';
import React, {useEffect} from 'react'


export default function MenuFood() {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
const restaurantdetails = useSelector(state => state.restaurantdetails.data);
console.log(restaurantdetails?.Menus);
useEffect(() => {
  dispatch(DetailRestaurant(restaurantId))
}, [dispatch, restaurantId]);
  return (
    <>
      <h1 className={styles.text}>Menu</h1>
      <div className={styles.menufood_container}>
        {restaurantdetails?.Menus.map((data) => (

        <Card className={styles.menufood_box}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image="https://www.comedera.com/wp-content/uploads/2022/06/jalea-mixta.jpg"
            alt="Live from space album cover"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {data.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                ${data.price}
              </Typography>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                pl: 1,
                pb: 1,
                justifyContent: "center",
                gap: "1em",
              }}
            >
              <Button sx={{ display: "flex", flex: 2 }}>
                AGREGAR AL CARRITO
              </Button>
            </Box>
          </Box>
        </Card>
        ))}

      </div>
    </>
  );
}
