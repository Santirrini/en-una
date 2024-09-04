import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { DetailRestaurant } from "../../redux/action";
import DeleteIcon from "@mui/icons-material/Delete";

import { Result } from "antd";
import MenuDestacad from "./MenuDestacad";
import Piqueos from "./Piqueos";
import Entradas from "./Entradas";
import Segundos from "./Segundos";
import Bebidas from "./Bebidas";
import Postres from "./Postres";
import styles from "./MenuFood.module.css";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


export default function MenuFood() {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const restaurantdetails = useSelector(
    (state) => state.restaurantdetails.data
  );
  const [cartItems, setCartItems] = useState([]);
  const [reservation, setReservation] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const toggleSummary = () => {
    setShowSummary(!showSummary);
  };
  useEffect(() => {
    dispatch(DetailRestaurant(restaurantId));
  }, [dispatch, restaurantId]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  useEffect(() => {
    const form = JSON.parse(localStorage.getItem("form")) || {};
    setReservation(form);
  }, []);

  const handleRemove = (index) => {
    const newCartItems = cartItems.filter(
      (_, itemIndex) => itemIndex !== index
    );
    setCartItems(newCartItems);
    localStorage.setItem("cart", JSON.stringify(newCartItems));
  };

  const handleIncreaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity += 1;
    setCartItems(newCartItems);
    localStorage.setItem("cart", JSON.stringify(newCartItems));
  };

  const handleDecreaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1;
      setCartItems(newCartItems);
      localStorage.setItem("cart", JSON.stringify(newCartItems));
    }
  };

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div>
      {restaurantdetails?.Menus.length === 0 ? (
        <Result title="No hay menús publicados" />
      ) : (
        <div>
          <h1 className={styles.text}>NUESTRA CARTA</h1>

          <div>
            <MenuDestacad setCartItems={setCartItems} />
          </div>
          <div>
            <Piqueos setCartItems={setCartItems} />
          </div>
          <div>
            <Entradas setCartItems={setCartItems} />
          </div>
          <div>
            <Segundos setCartItems={setCartItems} />
          </div>
          <div>
            <Bebidas setCartItems={setCartItems} />
          </div>
          <div>
            <Postres setCartItems={setCartItems} />
          </div>
      
        
        </div>
      )}
    </div>
  );
}
