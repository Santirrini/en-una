import React, { useEffect, useState } from "react";
import LoginComponent from '../components/Login/Login'
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";


export default function Login() {
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
            <div>
                <LoginComponent/>
            </div>
            <div>
        <ButtonWhatsapp />
      </div>
      <div>
        <Footer />
      </div>
        </div>
    )
}