import React, { useEffect, useState } from "react";
import ConfirmSendEmail from "../components/ConfirmSendEmail/ConfirmSendEmail";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import HeaderMobile from "../components/Header/Header";

export default function ResetSendEmail() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, []);
  return (
    <div data-oid="tas9sy7">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        data-oid="7mzh3b."
      >
        <CircularProgress color="inherit" data-oid="g6i95zs" />
      </Backdrop>
      <div data-oid="5.5j764">
        <HeaderMobile data-oid="47:xt-j" />
      </div>
      <div data-oid="uqpfi41">
        <Navbar data-oid="5y_ukoo" />
      </div>
      <div data-oid="9_1axug">
        <ConfirmSendEmail data-oid="hb0-9qw" />
      </div>
      <div data-oid="3cnvl7q">
        <ButtonWhatsapp data-oid="4ji6y_i" />
      </div>
      <div data-oid="8gwm3oa">
        <Footer data-oid="z.b:j1-" />
      </div>
    </div>
  );
}
