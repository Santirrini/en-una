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
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
        <HeaderMobile/>
      </div>
      <div>
        <Navbar />
      </div>
      <div>
        <ResetAccountComponent />
      </div>
      <div>
        <ButtonWhatsapp />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
