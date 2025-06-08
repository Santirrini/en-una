import React, { useEffect, useState } from "react";
import ConfirmSendEmail from "../components/ConfirmSendEmail/ConfirmSendEmail";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import UpdatePasswordComponent from "../components/UpdatePassword/UpdatePassword";
import HeaderMobile from "../components/Header/Header";

export default function UpdatePassword() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, []);
  return (
    <div data-oid=".snjbbd">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        data-oid="v2rxhyk"
      >
        <CircularProgress color="inherit" data-oid="l__io_." />
      </Backdrop>
      <div data-oid="g6o_osg">
        <HeaderMobile data-oid="6h8k6yo" />
      </div>
      <div data-oid="7hg2w6_">
        <Navbar data-oid="780b_-i" />
      </div>
      <div data-oid="ycx8e88">
        <UpdatePasswordComponent data-oid="k9vs2pf" />
      </div>

      <div data-oid="o-.fwry">
        <Footer data-oid="-mj124h" />
      </div>
    </div>
  );
}
