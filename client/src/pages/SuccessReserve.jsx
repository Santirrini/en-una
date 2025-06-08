import React, { useEffect, useState } from "react";
import SuccessReserveComponent from "../components/SuccessReserve/SuccessReserve";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

export default function SuccessReserve() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, []);
  return (
    <div data-oid="_6bn9ie">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        data-oid="twpmxdp"
      >
        <CircularProgress color="inherit" data-oid="oc..tew" />
      </Backdrop>
      <SuccessReserveComponent data-oid="knsetni" />
    </div>
  );
}
