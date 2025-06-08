import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import CarsFoodComponent from "../components/CarsFood/CarsFood";
import Footer from "../components/Footer/Footer";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import HeaderMobile from "../components/Header/Header";

export default function CarsFood() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, []);
  return (
    <div data-oid="p9_dpt1">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        data-oid="lc76eut"
      >
        <CircularProgress color="inherit" data-oid="bkuo7j5" />
      </Backdrop>
      <div data-oid="xa8.v5-">
        <HeaderMobile data-oid="x-debcu" />
      </div>
      <div data-oid="w63n9py">
        <Navbar data-oid="yvykdo0" />
      </div>
      <div data-oid="1s4ar4m">
        <CarsFoodComponent data-oid="dqnwce2" />
      </div>
      <div data-oid="sx85n8x">
        <ButtonWhatsapp data-oid="a1b0.y4" />
      </div>
      <div data-oid="_uif_lr">
        <Footer data-oid="z9xyejt" />
      </div>
    </div>
  );
}
