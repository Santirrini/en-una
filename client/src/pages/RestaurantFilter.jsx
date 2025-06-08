import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import Footer from "../components/Footer/Footer";
import RestaurantFilterComponent from "../components/RestaurantFilter/RestaurantFilter";
import NavbarDetails from "../components/Navbar/NavbarDetails";
import HeaderMobile from "../components/Header/Header";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const RestaurantFilter = () => {
  const { pathname } = useLocation();

  const [open, setOpen] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, []);

  return (
    <div data-oid="gld4i3n">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        data-oid="qcdh_lq"
      >
        <CircularProgress color="inherit" data-oid="p7d4a0g" />
      </Backdrop>
      <HeaderMobile data-oid="2pktba:" />

      <NavbarDetails data-oid=".a1vn7b" />
      <RestaurantFilterComponent data-oid="j3yfq-8" />

      <ButtonWhatsapp data-oid="lzpx.4b" />

      <Footer data-oid="arvfj:p" />
    </div>
  );
};

export default RestaurantFilter;
