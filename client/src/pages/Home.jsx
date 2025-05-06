import React, { useEffect, useState } from "react";

import ButtonWhatsapp from "../components/ButtonWhatsaapp/ButtonWhatsaapp";

import Footer from "../components/Footer/Footer";
import Cards from "../components/Card/Card";
import Navbar from "../components/Navbar/Navbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CarruselPublicitary from "../components/CarruselPublicitary/CarruselPublicitary";
import CardDestac from "../components/CardDestac/CardDestac";
import HeaderMobile from "../components/Header/Header";
import CategorySelector from "../components/CategorySelector/CategorySelector";
import { useDispatch, useSelector } from "react-redux";
import { AllRestaurant, dataPersonal } from "../redux/action";


export default function Home() {
    const dispatch = useDispatch();
    const allrestaurant = useSelector((state) => state.allrestaurant.data);
    const token = useSelector((state) => state.token);
      const [selectedType, setSelectedType] = React.useState(null);
    
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, []);

    React.useEffect(() => {
      dispatch(AllRestaurant());
    }, [dispatch]);
  
    React.useEffect(() => {
      dispatch(dataPersonal(token));
    }, [dispatch, token]);
    // Obtener todos los "type_of_meals" únicos
    const mealTypes = [
      ...new Set(
        allrestaurant?.map((r) => r.restaurants?.[0]?.type_of_meals).filter(Boolean)
      ),
    ];
  
    // Aplicar el filtro por tipo de comida
    const filteredRestaurants = selectedType
      ? allrestaurant.filter(
          (r) => r.restaurants?.[0]?.type_of_meals === selectedType
        )
      : allrestaurant;
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        <HeaderMobile/>
        <Navbar />
        <CarruselPublicitary />
        <CategorySelector filteredRestaurants={filteredRestaurants} mealTypes={mealTypes} setSelectedType={setSelectedType} selectedType={selectedType}/>
        <CardDestac/>
        <Cards filteredRestaurants={filteredRestaurants} mealTypes={mealTypes} setSelectedType={setSelectedType} selectedType={selectedType} />
      
        <ButtonWhatsapp />
     
        <Footer />
    </div>
  );
}
