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
    <div data-oid="d:2mz9u">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        data-oid="nzltcmz"
      >
        <CircularProgress color="inherit" data-oid="2:1_avj" />
      </Backdrop>
      <div data-oid="pzyhbhc">
        <HeaderMobile data-oid="yfjuneq" />
      </div>
      <div data-oid="v93btk3">
        <Navbar data-oid="q21:2bv" />
      </div>
      <div data-oid="bxk1cf3">
        <MyReservationsRestaurantComponents data-oid="6l9-405" />
      </div>
      <div data-oid="w249jq8">
        <ButtonWhatsapp data-oid="ecq6f4o" />
      </div>
      <div data-oid="m.716mc">
        <Footer data-oid="thr5rff" />
      </div>
    </div>
  );
}
