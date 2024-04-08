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
import PostProducts from './components/PostProducts/PostProducts';
import Order from './pages/Order';
import DeletePostPage from './pages/DeletePostPage';
import Myrestaurant from "./pages/MyRestaurant";





function App() {


  return (
    <div >
        <BrowserRouter>
          <Routes>
          <Route path='/administrar' element={<Admin/>}>
            <Route index element={<PostProducts/>}/>
            <Route path='publicar-mi-restaurante' element={<PostProducts/>}/>
            <Route path='pedidos' element={<Order/>}/>
            <Route path='publicaciones' element={<DeletePostPage/>}/>
            <Route path='mi-restaurante' element={<Myrestaurant/>}/>

          </Route>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/restaurantes" element={<Restaurant />} />
            <Route path="/detalles/restaurante" element={<DetailsRestaurant />} />
            <Route path="/carrito" element={<CarsFood />} />
            <Route path="/menu/restaurante" element={<MenuFood />} />
            <Route path="/perfil" element={<Perfil />} />
            
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
