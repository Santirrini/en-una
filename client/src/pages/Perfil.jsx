import React, { useEffect, useState } from "react";
import PerfilComponent from "../components/Perfil/Perfil";
import Navbar from "../components/Navbar/Navbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import Footer from "../components/Footer/Footer";
import HeaderMobile from "../components/Header/Header";

export default function Perfil() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, []);
  return (
    <div data-oid="g8oz4q2">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        data-oid="xrv4b5l"
      >
        <CircularProgress color="inherit" data-oid="yasjnqd" />
      </Backdrop>
      <div data-oid="jjnj1w6">
        <HeaderMobile data-oid="_g:m5bu" />
      </div>
      <div data-oid="7j7-uep">
        <Navbar data-oid="89q2ml8" />
      </div>
      <div data-oid="mthyg:z">
        <PerfilComponent data-oid=".-_:0gk" />
      </div>
      <div data-oid="r1_2lqx">
        <ButtonWhatsapp data-oid=":bjfmv6" />
      </div>
      <div data-oid="-.5nicm">
        <Footer data-oid="a38218g" />
      </div>
    </div>
  );
}
