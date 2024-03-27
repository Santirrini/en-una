import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import styles from './App.module.css'






function App() {


  return (
    <div className={styles.container_web}>
      <div>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />}/>
   
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
