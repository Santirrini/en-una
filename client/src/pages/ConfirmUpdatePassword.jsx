import React, { useEffect, useState } from "react";
import ConfirmUpdatePasswordComponent from "../components/ConfirmUpdatePassword/ConfirmUpdatePassword";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import HeaderMobile from "../components/Header/Header";

export default function ConfirmUpdatePassword() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, []);
  return (
    <div data-oid="3ssbne.">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        data-oid="0jcd1as"
      >
        <CircularProgress color="inherit" data-oid="4rpotiu" />
      </Backdrop>
      <div data-oid="pw:.-9a">
        <HeaderMobile data-oid="ihls4wg" />
      </div>
      <div data-oid="7qq9u4j">
        <Navbar data-oid="2l:e_99" />
      </div>
      <div data-oid="i9.8iro">
        <ConfirmUpdatePasswordComponent data-oid="e2bm:fg" />
      </div>
      <div data-oid="j.f8yxh">
        <ButtonWhatsapp data-oid="txa1_no" />
      </div>
      <div data-oid="5iy:.4d">
        <Footer data-oid="7p8_jfn" />
      </div>
    </div>
  );
}
