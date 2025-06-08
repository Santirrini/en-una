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
    (state) => state.restaurantdetails.data,
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
      (_, itemIndex) => itemIndex !== index,
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
      0,
    );
  };

  return (
    <div data-oid="mosneds">
      {restaurantdetails?.Menus.length === 0 ? (
        <Result title="No hay menús publicados" data-oid="1yukl3r" />
      ) : (
        <div data-oid="r:-_stl">
          <h1 className={styles.text} data-oid="91rwdj5">
            NUESTRA CARTA
          </h1>

          <div data-oid="ypw12wd">
            <MenuDestacad setCartItems={setCartItems} data-oid="1p8gewn" />
          </div>
          <div data-oid="s9t-nxt">
            <Piqueos setCartItems={setCartItems} data-oid="essvzed" />
          </div>
          <div data-oid="bdu:0em">
            <Entradas setCartItems={setCartItems} data-oid="7xj1c:g" />
          </div>
          <div data-oid="mhnra79">
            <Segundos setCartItems={setCartItems} data-oid="8z.l-v-" />
          </div>
          <div data-oid="t2pj2y-">
            <Bebidas setCartItems={setCartItems} data-oid="ip96-g-" />
          </div>
          <div data-oid="7y2twnw">
            <Postres setCartItems={setCartItems} data-oid="ypqk3n_" />
          </div>
        </div>
      )}
    </div>
  );
}
