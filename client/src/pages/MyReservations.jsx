import React, { useEffect, useState } from "react";
import MyReservationsComponent from "../components/MyReservations/MyReservations";
import Footer from "../components/Footer/Footer";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../components/Navbar/Navbar";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import HeaderMobile from "../components/Header/Header";

export default function MyReservations() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, []);
  return (
    <div data-oid="8y6j4s_">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        data-oid="ft59yke"
      >
        <CircularProgress color="inherit" data-oid="hnta6lw" />
      </Backdrop>
      <div data-oid="_twttup">
        <HeaderMobile data-oid="g044nnw" />
      </div>
      <div data-oid="3bmhmp_">
        <Navbar data-oid="yl8a.7b" />
      </div>
      <div data-oid="73:d15v">
        <MyReservationsComponent data-oid="vk2vspf" />
      </div>
      <div data-oid="ci91ytc">
        <ButtonWhatsapp data-oid="m4533nz" />
      </div>
      <div data-oid="qbyttjt">
        <Footer data-oid="45fud8j" />
      </div>
    </div>
  );
}
