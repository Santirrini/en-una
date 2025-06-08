import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import TermsConditionsComponent from "../components/TermsConditions/TermsConditions";
import HeaderMobile from "../components/Header/Header";

export default function TermsConditions() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, []);
  return (
    <div data-oid="yv16qh-">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        data-oid="cx3hycp"
      >
        <CircularProgress color="inherit" data-oid="sip5usf" />
      </Backdrop>
      <div data-oid="x3t6ih-">
        <HeaderMobile data-oid="zujby8o" />
      </div>
      <div data-oid="pltdani">
        <Navbar data-oid="75dft_8" />
      </div>
      <div data-oid="4x_9of.">
        <TermsConditionsComponent data-oid="ngy10be" />
      </div>
      <div data-oid="ts.te-:">
        <ButtonWhatsapp data-oid="svcj4z_" />
      </div>
      <div data-oid="k018ir6">
        <Footer data-oid="wlimm5l" />
      </div>
    </div>
  );
}
