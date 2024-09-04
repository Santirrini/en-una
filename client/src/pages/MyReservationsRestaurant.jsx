import React, { useEffect, useState } from "react";
import MyReservationsRestaurantComponents from "../components/MyReservationsRestaurant/MyReservationsRestaurant";
import Backdrop from "@mui/material/Backdrop";
import Navbar from "../components/Navbar/Navbar";
import CircularProgress from "@mui/material/CircularProgress";
import HeaderMobile from "../components/Header/Header";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import Footer from "../components/Footer/Footer";

export default function MyReservationsRestaurant() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, []);
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
        <HeaderMobile/>
      </div>
      <div>
        <Navbar />
      </div>
      <div>
        <MyReservationsRestaurantComponents />
      </div>
      <div>
        <ButtonWhatsapp />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
