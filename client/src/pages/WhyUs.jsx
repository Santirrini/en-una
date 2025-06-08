import React, { useEffect, useState } from "react";
import WhyUsComponent from "../components/WhyUs/WhyUs";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import HeaderMobile from "../components/Header/Header";

export default function WhyUs() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, []);
  return (
    <div data-oid="cwox9ac">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        data-oid="vhq:og2"
      >
        <CircularProgress color="inherit" data-oid="w73g3pi" />
      </Backdrop>
      <div data-oid="zxejdq_">
        <HeaderMobile data-oid="vs5u13o" />
      </div>
      <div data-oid="fojpg3y">
        <Navbar data-oid="feimjhe" />
      </div>
      <div data-oid=".uh73rc">
        <WhyUsComponent data-oid="tfxne-e" />
      </div>
      <div data-oid="dx1ieqe">
        <ButtonWhatsapp data-oid="q22b4n2" />
      </div>
      <div data-oid="4ir-hus">
        <Footer data-oid="tf_b15p" />
      </div>
    </div>
  );
}
