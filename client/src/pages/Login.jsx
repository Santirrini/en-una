import React, { useEffect, useState } from "react";
import LoginComponent from "../components/Login/Login";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import HeaderMobile from "../components/Header/Header";

export default function Login() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, []);
  return (
    <div data-oid="909ozzm">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        data-oid="jq7vepj"
      >
        <CircularProgress color="inherit" data-oid="_h3f3po" />
      </Backdrop>
      <div data-oid="1xqkyi_">
        <HeaderMobile data-oid=":i_ig4z" />
      </div>
      <div data-oid="mv8jcdj">
        <Navbar data-oid="5zm-mu4" />
      </div>
      <div data-oid="gnhcqrn">
        <LoginComponent data-oid="gpd-v:l" />
      </div>
      <div data-oid="q10st3z">
        <ButtonWhatsapp data-oid="hb24vp." />
      </div>
      <div data-oid="kct3x.y">
        <Footer data-oid="iniypke" />
      </div>
    </div>
  );
}
