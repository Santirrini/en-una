import React, { useEffect, useState } from "react";
import FrequentQuestionsComponents from "../components/FrequentQuestions/FrequentQuestions";

import Navbar from "../components/Navbar/Navbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";
import Footer from "../components/Footer/Footer";
import HeaderMobile from "../components/Header/Header";

export default function FrequentQuestions() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, []);
  return (
    <div data-oid="y6e514t">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        data-oid="26ie4.r"
      >
        <CircularProgress color="inherit" data-oid="uwu52br" />
      </Backdrop>
      <div data-oid="a_qwru.">
        <HeaderMobile data-oid="ieqv93d" />
      </div>
      <div data-oid="lnccel9">
        <Navbar data-oid="-_0uki7" />
      </div>
      <div data-oid="y28rmzy">
        <FrequentQuestionsComponents data-oid=".j_4_jj" />
      </div>
      <div data-oid="gcmgtcb">
        <ButtonWhatsapp data-oid="89dwgqu" />
      </div>
      <div data-oid="y0m.-89">
        <Footer data-oid="j:c:l4t" />
      </div>
    </div>
  );
}
