import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Restaurant from "./pages/Restaurant";
import DetailsRestaurant from "./pages/DetailsRestaurant";
import MenuFood from "./pages/MenuFood";






function App() {


  return (
    <div >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/restaurantes" element={<Restaurant />} />
            <Route path="/detalles/restaurante" element={<DetailsRestaurant />} />
            <Route path="/menu/restaurante" element={<MenuFood />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
