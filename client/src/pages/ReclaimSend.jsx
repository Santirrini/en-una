import React, { useEffect, useState } from "react";
import ReclaimSendComponent from "../components/ReclaimSend/ReclaimSend";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import HeaderMobile from "../components/Header/Header";

export default function ReclaimSend() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, []);
  return (
    <div data-oid=".4z17e6">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        data-oid="fkrm7nl"
      >
        <CircularProgress color="inherit" data-oid="g4dwt:t" />
      </Backdrop>

      <div data-oid="vy.2r:f">
        <ReclaimSendComponent data-oid="hxlpk8b" />
      </div>
    </div>
  );
}
