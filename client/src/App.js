import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Restaurant from "./pages/Restaurant";
import DetailsRestaurant from "./pages/DetailsRestaurant";
import CarsFood from "./pages/CarsFood";
import MenuFood from "./pages/MenuFood";
import Perfil from "./pages/Perfil";
import Admin from './pages/Admin';
import PostProducts from './components/PostRestaurant/PostRestaurant';
import Order from './pages/Order';
import DeletePostPage from './pages/DeletePostPage';
import Myrestaurant from "./pages/MyRestaurant";
import PostMenus from "./pages/PostMenus";
import Contact from "./pages/Contact";
import ResetAccount from "./pages/ResetAccount";
import ResetSendEmail from "./pages/ResetSendEmail";
import UpdatePassword from "./pages/UpdatePassword";
import WhyUs from "./pages/WhyUs";
import PolicityPrivacity from "./pages/PolicityPrivacity";
import TermsConditions from "./pages/TermsConditions";
import ConfirmUpdatePassword from "./pages/ConfirmUpdatePassword";
import MyReservations from "./pages/MyReservations";
import FrequentQuestions from "./pages/FrequentQuestions";
import MyReservationsRestaurant from "./pages/MyReservationsRestaurant";
import PanelRestaurant from "./pages/PanelRestaurant";
import PostRestaurant from "./pages/PostRestaurant";

import EditMenu from './pages/EditMenu';

import React, { useState } from 'react';
import SuccessReserve from "./pages/SuccessReserve";
import PoliticPrivateRestaurant from "./pages/PoliticPrivateRestaurant";
import ReclamoForm from "./pages/ReclamoForm";
import ComplaintBook from "./pages/ComplaintBook";
import ReclaimSend from "./pages/ReclaimSend";
import AdminComplete from './pages/Admin'
import TableUsers from "./components/AdminComplete/TableUsers";
import TableRestaurant from "./components/AdminComplete/TableRestaurant";
import TableFormPetition from "./components/AdminComplete/TableFormPetition";
import PostCarousel from "./components/AdminComplete/PostCarousel";
import OrderAdmin from "./components/AdminComplete/OrderAdmin";
import AllOrders from "./components/AdminComplete/AllOrders";

import SelectDestac from "./components/AdminComplete/SelectDestac";
import EmailVerification from "./pages/EmailVerification";
import MessageRegister from "./pages/MessageRegister";










function App() {

  const [disabled, setDisabled] = useState(false);

  return (
    <div >
      <BrowserRouter>
        <Routes>
  <Route path="/administrar" element={<Admin />}>
    <Route index element={<PostProducts />} />
    <Route path="publicar-mi-restaurante" element={<PostProducts />} />
    <Route path="publicar-mi-menu" element={<PostMenus />} />
    <Route path="pedidos" element={<Order />} />
    <Route path="publicaciones" element={<DeletePostPage />} />
    <Route path="mi-restaurante" element={<Myrestaurant />} />
  </Route>



          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/iniciar-sesión" element={<Login />} />
          <Route path="/registrarse" element={<Register />} />
          <Route path="/restaurantes" element={<Restaurant />} />
          <Route path="/detalles/restaurante/:restaurantId" element={<DetailsRestaurant />} />
          <Route path="/carrito" element={<CarsFood />  } />
          <Route path="/menu/restaurante/:restaurantId" element={<MenuFood />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/contactanos" element={<Contact />} />
          <Route path="/politica-de-privacidad" element={<PolicityPrivacity />} />
          <Route path="/politica-de-privacidad-restaurante" element={<PoliticPrivateRestaurant />} />

          <Route path="/sobre-nosotros" element={<WhyUs />} />
          <Route path="/recuperar-cuenta" element={<ResetAccount />} />
          <Route path="/email-enviado" element={<ResetSendEmail />} />
          <Route path="/contraseña-actualizada" element={<ConfirmUpdatePassword />} />

          <Route path="/restablacer-contraseña/:token" element={<UpdatePassword />} />
          <Route path="/términos-y-condiciones" element={<TermsConditions />} />
          <Route path="/mis-reservaciones/:reservationId" element={<MyReservations />} />
          <Route path="/mis-reservaciones" element={<MyReservationsRestaurant />} />

          <Route path="/preguntas-frecuentes" element={<FrequentQuestions />} />
          <Route path="/menús-reservados" element={<CarsFood />} />
          <Route path="/reserva-exitosa" element={<SuccessReserve />} />
          <Route path="/libro-de-quejas" element={<ComplaintBook />} />
          <Route path="/reclamación" element={<ReclamoForm />} />
          <Route path="/reclamo-enviado" element={<ReclaimSend />} />
          <Route path="/verificar" element={<EmailVerification />} />
          <Route path="/registro-completado" element={<MessageRegister />} />




          



          <Route path='/panel' element={<PanelRestaurant />}>
            <Route index element={<PostRestaurant />} />
            <Route path='publicar-restaurante' element={<PostRestaurant />} />
            <Route path='publicar-menu' element={<PostMenus />} />
            <Route path='editar-menu/:restaurantId' element={<EditMenu />} />

            <Route path='pedidos' element={<Order />} />


          </Route>



   




          <Route path='/panel/administrativo' element={<AdminComplete />}>
            <Route index element={<TableFormPetition />} />
        
            <Route path='formularios-de-registros' element={<TableFormPetition />} />
            <Route path='usuarios-registrados' element={<TableUsers />} />

            <Route path='restaurantes-registrados' element={<TableRestaurant />} />
            <Route path='publicar-carrusel' element={<PostCarousel />} />

            <Route path='destacar-restaurante' element={<SelectDestac />} />

            <Route path='pedidos' element={<OrderAdmin />} />
            <Route path='detalles/:restaurantId' element={<AllOrders />} />

            



          </Route>
          


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
