import React, { useEffect, useState } from "react";
import MyReservationsRestaurantComponents from "../components/MyReservationsRestaurant/MyReservationsRestaurant";
import Backdrop from "@mui/material/Backdrop";
import Navbar from "../components/Navbar/Navbar";
import CircularProgress from "@mui/material/CircularProgress";

export default function MyReservationsRestaurant() {
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
        <MyReservationsRestaurantComponents />
      </div>
    </div>
  );
}
