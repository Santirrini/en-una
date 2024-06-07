import React, { useEffect, useState } from "react";

import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
/* import FeaturedCarousel from "../components/Fea"; */

import Footer from "../components/Footer/Footer";
import Cards from "../components/Card/Card";
import Navbar from "../components/Navbar/Navbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Home() {
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
        <Navbar />
      </div>
    {/*     <div>
        <FeaturedCarousel />
      </div>  */}
      <div>
        <Cards />
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
