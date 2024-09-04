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
        <CarsFoodComponent />
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
