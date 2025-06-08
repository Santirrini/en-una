import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import PoliticPrivate from "../components/PoliticPrivate/PoliticPrivate";
import HeaderMobile from "../components/Header/Header";

export default function PolicityPrivacity() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, []);
  return (
    <div data-oid="m-z1pr0">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        data-oid="kvom:_m"
      >
        <CircularProgress color="inherit" data-oid="r-aizrh" />
      </Backdrop>
      <div data-oid="pktkr2.">
        <HeaderMobile data-oid="anr8gk-" />
      </div>
      <div data-oid="ekj2:r4">
        <Navbar data-oid="2om4n9j" />
      </div>
      <div data-oid="hs0j02f">
        <PoliticPrivate data-oid="lpre.qh" />
      </div>
      <div data-oid="s00b5wk">
        <ButtonWhatsapp data-oid="411uaq3" />
      </div>
      <div data-oid="bpy:1.3">
        <Footer data-oid="uqfs41-" />
      </div>
    </div>
  );
}
