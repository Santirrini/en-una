import React, { useEffect, useState } from "react";
import ConfirmSendEmail from '../components/ConfirmSendEmail/ConfirmSendEmail';
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
                <UpdatePasswordComponent/>
            </div>
    
      <div>
        <Footer />
      </div>
        </div>
    )
}