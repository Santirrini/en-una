import React, { useEffect, useState } from "react";
import ResetAccountComponent from "../components/ResetAccount/ResetAccount";
import Footer from "../components/Footer/Footer";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../components/Navbar/Navbar";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import HeaderMobile from "../components/Header/Header";

export default function ResetAccount() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, []);

  return (
    <div data-oid="py3.rwe">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        data-oid="6cxs1vf"
      >
        <CircularProgress color="inherit" data-oid="npepfwp" />
      </Backdrop>
      <div data-oid="4b5.sod">
        <HeaderMobile data-oid="dvw1.l1" />
      </div>
      <div data-oid="-8u:eue">
        <Navbar data-oid=":i9301h" />
      </div>
      <div data-oid="11jui-3">
        <ResetAccountComponent data-oid="0xxovbv" />
      </div>
      <div data-oid="48a8::4">
        <ButtonWhatsapp data-oid="o6o-3mr" />
      </div>
      <div data-oid="g8g2-uc">
        <Footer data-oid="h4hrzgz" />
      </div>
    </div>
  );
}
