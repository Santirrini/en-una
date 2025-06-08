import React, { useEffect, useState } from "react";
import RegisterComponets from "../components/Register/Register";
import Footer from "../components/Footer/Footer";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../components/Navbar/Navbar";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";

import HeaderMobile from "../components/Header/Header";

export default function Register() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, []);

  return (
    <div data-oid="_x0misc">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        data-oid="jg68_nt"
      >
        <CircularProgress color="inherit" data-oid="lmu9h13" />
      </Backdrop>
      <div data-oid="gu1m0bk">
        <HeaderMobile data-oid="-wdk1tp" />
      </div>
      <div data-oid="ohatemj">
        <Navbar data-oid="zippl3x" />
      </div>
      <div data-oid="1yipdys">
        <RegisterComponets data-oid="7rndlrq" />
      </div>
      <div data-oid="0au3e29">
        <ButtonWhatsapp data-oid="zoug2.d" />
      </div>
      <div data-oid="1im2rfh">
        <Footer data-oid="pjo6kdf" />
      </div>
    </div>
  );
}
