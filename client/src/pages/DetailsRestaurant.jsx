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
    }, 2000);
  }, []);
  return (
    <div data-oid="2-smp6c">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        data-oid="qn3f2tt"
      >
        <CircularProgress color="inherit" data-oid="h9nnl8." />
      </Backdrop>
      <div data-oid=".:age_k">
        <HeaderMobile data-oid="5st529x" />
      </div>
      <div data-oid="t_8r3mt">
        <DetailsRestaurantComponents data-oid="upcdarr" />
      </div>
      <div data-oid="50tua4i">
        <ButtonWhatsapp data-oid="xlu0vfl" />
      </div>
      <div data-oid="2iwodwk">
        <Footer data-oid="35f91.3" />
      </div>
    </div>
  );
}
