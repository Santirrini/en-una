import React, { useEffect, useState } from "react";
import FrequentQuestionsComponents from '../components/FrequentQuestions/FrequentQuestions';

import Navbar from "../components/Navbar/Navbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import Footer from "../components/Footer/Footer";

export default function FrequentQuestions() {
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
                <FrequentQuestionsComponents/>
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