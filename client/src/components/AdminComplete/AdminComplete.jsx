import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Navbar from "./NavbarAdmin";
import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import styles from "./AdminComplete.module.css";

export default function AdminComplete() {
  const location = useLocation();

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className={styles.buttonAdmin}>
        <Stack
          spacing={2}
          direction="row"
          sx={{
            margin: "5em auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
                 <Link to="formularios-de-registros">
            <Button
              variant="outlined"
              sx={{
                border: "2px solid #500075",
                color: location.pathname === "/panel/administrativo/formularios-de-registros" ? "#fff" : "#500075",
                backgroundColor: location.pathname === "/panel/administrativo/formularios-de-registros" ? "#500075" : "transparent",
                ":hover": {
                  border: "2px solid #500075",
                  color: "#fff",
                  backgroundColor: "#500075",
                },
                ":focus": { backgroundColor: "#500075", color: "#fff" },
              }}
            >
              Formularios de registros
            </Button>
          </Link>
          <Link to="usuarios-registrados">
            <Button
              variant="outlined"
              sx={{
                border: "2px solid #500075",
                color: location.pathname === "/panel/administrativo/usuarios-registrados" ? "#fff" : "#500075",
                backgroundColor: location.pathname === "/panel/administrativo/usuarios-registrados" ? "#500075" : "transparent",
                ":hover": {
                  border: "2px solid #500075",
                  color: "#fff",
                  backgroundColor: "#500075",
                },
                ":focus": { backgroundColor: "#500075", color: "#fff" },
              }}
            >
              Usuarios registrados
            </Button>
          </Link>
          <Link to="restaurantes-registrados">
            <Button
              variant="outlined"
              sx={{
                border: "2px solid #500075",
                color: location.pathname === "/panel/administrativo/restaurantes-registrados" ? "#fff" : "#500075",
                backgroundColor: location.pathname === "/panel/administrativo/restaurantes-registrados" ? "#500075" : "transparent",
                ":hover": {
                  border: "2px solid #500075",
                  color: "#fff",
                  backgroundColor: "#500075",
                },
                ":focus": { backgroundColor: "#500075", color: "#fff" },
              }}
            >
              Restaurantes registrados
            </Button>
          </Link>
   
        </Stack>
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
