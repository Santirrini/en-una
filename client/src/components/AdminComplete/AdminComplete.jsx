import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Navbar from "./NavbarAdmin";
import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import styles from "./AdminComplete.module.css";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

export default function AdminComplete() {
  const location = useLocation();
  const role = useSelector((state) => state.role);
  const theme = useTheme();

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <>
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
                  color:
                    location.pathname ===
                    "/panel/administrativo/formularios-de-registros"
                      ? "#fff"
                      : "#500075",
                  backgroundColor:
                    location.pathname ===
                    "/panel/administrativo/formularios-de-registros"
                      ? "#500075"
                      : "transparent",
                  ":hover": {
                    border: "2px solid #500075",
                    color: "#fff",
                    backgroundColor: "#500075",
                  },
                  ":focus": { backgroundColor: "#500075", color: "#fff" },
                  padding: "10px 20px", // Tamaño base
                  fontSize: "10px", // Tamaño base
                  [theme.breakpoints.down("lg")]: {
                    padding: "8px 16px", // Tamaño reducido
                    fontSize: "0.875rem", // Tamaño reducido
                  },
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
                  color:
                    location.pathname ===
                    "/panel/administrativo/usuarios-registrados"
                      ? "#fff"
                      : "#500075",
                  backgroundColor:
                    location.pathname ===
                    "/panel/administrativo/usuarios-registrados"
                      ? "#500075"
                      : "transparent",
                  ":hover": {
                    border: "2px solid #500075",
                    color: "#fff",
                    backgroundColor: "#500075",
                  },
                  ":focus": { backgroundColor: "#500075", color: "#fff" },
                  padding: "10px 20px",
                  fontSize: "10px",
                  [theme.breakpoints.down("lg")]: {
                    padding: "8px 16px",
                    fontSize: "10px",
                  },
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
                  color:
                    location.pathname ===
                    "/panel/administrativo/restaurantes-registrados"
                      ? "#fff"
                      : "#500075",
                  backgroundColor:
                    location.pathname ===
                    "/panel/administrativo/restaurantes-registrados"
                      ? "#500075"
                      : "transparent",
                  ":hover": {
                    border: "2px solid #500075",
                    color: "#fff",
                    backgroundColor: "#500075",
                  },
                  ":focus": { backgroundColor: "#500075", color: "#fff" },
                  padding: "10px 20px",
                  fontSize: "10px",

                  [theme.breakpoints.down("lg")]: {
                    padding: "8px 16px",
                    fontSize: "0.875rem",
                  },
                }}
              >
                Restaurantes registrados
              </Button>
            </Link>
            <Link to="pedidos">
              <Button
                variant="outlined"
                sx={{
                  border: "2px solid #500075",
                  color:
                    location.pathname === "/panel/administrativo/pedidos"
                      ? "#fff"
                      : "#500075",
                  backgroundColor:
                    location.pathname === "/panel/administrativo/pedidos"
                      ? "#500075"
                      : "transparent",
                  ":hover": {
                    border: "2px solid #500075",
                    color: "#fff",
                    backgroundColor: "#500075",
                  },
                  ":focus": { backgroundColor: "#500075", color: "#fff" },
                  padding: "10px 20px",
                  fontSize: "10px",
                  
                  [theme.breakpoints.down("lg")]: {
                    padding: "8px 16px",
                    fontSize: "0.875rem",
                  },
                }}
              >
                Pedidos
              </Button>
            </Link>
            <Link to="publicar-carrusel">
              <Button
                variant="outlined"
                sx={{
                  border: "2px solid #500075",
                  color:
                    location.pathname ===
                    "/panel/administrativo/publicar-carrusel"
                      ? "#fff"
                      : "#500075",
                  backgroundColor:
                    location.pathname ===
                    "/panel/administrativo/publicar-carrusel"
                      ? "#500075"
                      : "transparent",
                  ":hover": {
                    border: "2px solid #500075",
                    color: "#fff",
                    backgroundColor: "#500075",
                  },
                  ":focus": { backgroundColor: "#500075", color: "#fff" },
                  padding: "10px 20px",
                  fontSize: "10px",

                  [theme.breakpoints.down("lg")]: {
                    padding: "8px 16px",
                    fontSize: "0.875rem",
                  },
                }}
              >
                Publicar carrusel
              </Button>
            </Link>
            <Link to="destacar-restaurante">
              <Button
                variant="outlined"
                sx={{
                  border: "2px solid #500075",
                  color:
                    location.pathname ===
                    "/panel/administrativo/destacar-restaurante"
                      ? "#fff"
                      : "#500075",
                  backgroundColor:
                    location.pathname ===
                    "/panel/administrativo/destacar-restaurante"
                      ? "#500075"
                      : "transparent",
                  ":hover": {
                    border: "2px solid #500075",
                    color: "#fff",
                    backgroundColor: "#500075",
                  },
                  ":focus": { backgroundColor: "#500075", color: "#fff" },
                  padding: "10px 20px",
                  fontSize: "10px",

                  [theme.breakpoints.down("lg")]: {
                    padding: "8px 16px",
                    fontSize: "0.875rem",
                  },
                }}
              >
                Destacar restaurante
              </Button>
            </Link>
          </Stack>
        </div>
        <div>
          <Outlet />
        </div>
      </>
      <div>
        <Footer />
      </div>
    </div>
  );
}
