import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import MenuFoodComponent from "../components/MenuFood/MenuFood";
import Footer from "../components/Footer/Footer";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import HeaderMobile from "../components/Header/Header";

export default function MenuFood() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, []);
  return (
    <div data-oid="h_w55e:">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        data-oid=":d9f1h_"
      >
        <CircularProgress color="inherit" data-oid="ci.19zi" />
      </Backdrop>
      <div data-oid="aquluoy">
        <HeaderMobile data-oid="0oipcq2" />
      </div>
      <div data-oid="zf4uwi2">
        <Navbar data-oid=":d_voqf" />
      </div>
      <div data-oid="8m3jnf3">
        <MenuFoodComponent data-oid="3aspdlb" />
      </div>
      {/*    <div>
               <ButtonWhatsapp />
             </div> */}
      <div data-oid="761cbq7">
        <Footer data-oid="98b4gg_" />
      </div>
    </div>
  );
}
