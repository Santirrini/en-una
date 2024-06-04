import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import PostProducts from './components/PostProducts/PostRestaurant';
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





function App() {


  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/administrar' element={<Admin />}>
            <Route index element={<PostProducts />} />
            <Route path='publicar-mi-restaurante' element={<PostProducts />} />

            <Route path='publicar-mi-menu' element={<PostMenus />} />
            <Route path='pedidos' element={<Order />} />
            <Route path='publicaciones' element={<DeletePostPage />} />
            <Route path='mi-restaurante' element={<Myrestaurant />} />

          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/iniciar-sesión" element={<Login />} />
          <Route path="/registrarse" element={<Register />} />
          <Route path="/restaurantes" element={<Restaurant />} />
          <Route path="/detalles/restaurante/:restaurantId" element={<DetailsRestaurant />} />
          <Route path="/carrito" element={<CarsFood />} />
          <Route path="/menu/restaurante/:restaurantId" element={<MenuFood />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/contactanos" element={<Contact />} />
          <Route path="/politica-de-privacidad" element={<PolicityPrivacity />} />
          <Route path="/sobre-nosotros" element={<WhyUs />} />
          <Route path="/recuperar-cuenta" element={<ResetAccount />} />
          <Route path="/email-enviado" element={<ResetSendEmail />} />
          <Route path="/contraseña-actualizada" element={<ConfirmUpdatePassword />} />

          <Route path="/restablacer-contraseña/:token" element={<UpdatePassword />} />
          <Route path="/términos-y-condiciones" element={<TermsConditions />} />
          <Route path="/mis-reservaciones" element={<MyReservations />} />





        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
