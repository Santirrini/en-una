import React, { useEffect, useState } from "react";
import RestaurantComponent from "../components/Restaurant/Restaurant";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import HeaderMobile from "../components/Header/Header";

export default function Restaurant() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, []);
  return (
    <div data-oid="-x1acs1">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        data-oid="rhx-4za"
      >
        <CircularProgress color="inherit" data-oid="y.rm5.1" />
      </Backdrop>
      <div data-oid="qog3zq9">
        <HeaderMobile data-oid="8n5ylvp" />
      </div>
      <div data-oid="jpazu7v">
        <Navbar data-oid="t-y:.1h" />
      </div>
      <div data-oid="iajlqf.">
        <RestaurantComponent data-oid="bud8w1d" />
      </div>
      <div data-oid="2mm_bc6">
        <ButtonWhatsapp data-oid="h33b-_." />
      </div>
      <div data-oid="avg-t2y">
        <Footer data-oid="y52:lxm" />
      </div>
    </div>
  );
}
