import React, { useEffect, useState } from "react";
import ContactUs from "../components/ContactUs/ContactUs";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import HeaderMobile from "../components/Header/Header";

export default function Contact() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, []);
  return (
    <div data-oid="w.sn5kj">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        data-oid="mui-xab"
      >
        <CircularProgress color="inherit" data-oid="9qqkcrz" />
      </Backdrop>
      <div data-oid="cf2umoa">
        <HeaderMobile data-oid="05dh_yx" />
      </div>
      <div data-oid="c521qqp">
        <Navbar data-oid="3ozwovw" />
      </div>
      <div data-oid="shjiexn">
        <ContactUs data-oid="a-us3mh" />
      </div>
      <div data-oid="h6wvsi6">
        <ButtonWhatsapp data-oid="22q233:" />
      </div>
      <div data-oid="c80eer:">
        <Footer data-oid="evv2tv4" />
      </div>
    </div>
  );
}
