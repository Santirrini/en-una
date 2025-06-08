import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import PoliticPrivateRestaurantComponent from "../components/PoliticPrivateRestaurant/PoliticPrivateRestaurant";
import HeaderMobile from "../components/Header/Header";

export default function PoliticPrivateRestaurant() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, []);
  return (
    <div data-oid="tczs408">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        data-oid="jsqdecy"
      >
        <CircularProgress color="inherit" data-oid="k43oqy6" />
      </Backdrop>
      <div data-oid="s69l1xy">
        <HeaderMobile data-oid=":2z85.n" />
      </div>
      <div data-oid="07uo467">
        <Navbar data-oid="_buk_9o" />
      </div>
      <div data-oid="-3h3.5l">
        <PoliticPrivateRestaurantComponent data-oid="-mfnrqw" />
      </div>
      <div data-oid="ir.nq95">
        <ButtonWhatsapp data-oid="7bh_j::" />
      </div>
      <div data-oid="rpm__0i">
        <Footer data-oid="fk3t_qn" />
      </div>
    </div>
  );
}
