import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import styles from './App.module.css'
import Test from "./pages/Test"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Restaurant from "./pages/Restaurant";






function App() {


  return (
    <div className={styles.container_web}>
      <div>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/test" element={<Test />}/>
              <Route path="/auth/login" element={<Login />}/>
              <Route path="/auth/register" element={<Register />}/>
              <Route path="/restaurantes" element={<Restaurant />}/>




   
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
