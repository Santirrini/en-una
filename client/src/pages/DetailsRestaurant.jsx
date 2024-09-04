import React, { useEffect, useState } from "react";
import DetailsRestaurantComponents from "../components/DetailsRestaurant/DetailsRestaurant";
import NavbarDetails from "../components/Navbar/NavbarDetails";
import Footer from "../components/Footer/Footer";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import HeaderMobile from "../components/Header/Header";

export default function DetailsRestaurant() {
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
        <DetailsRestaurantComponents />
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
