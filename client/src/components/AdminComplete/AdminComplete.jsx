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
    <div data-oid="-o9nvds">
      <div data-oid="a497qby">
        <Navbar data-oid="u_wluor" />
      </div>
      <>
        <div className={styles.buttonAdmin} data-oid="c37iwr-">
          <Stack
            spacing={2}
            direction="row"
            sx={{
              margin: "5em auto",
              display: "flex",
              justifyContent: "center",
            }}
            data-oid="7pj359m"
          >
            <Link to="formularios-de-registros" data-oid="_:v:0o.">
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
                data-oid="ljzwif4"
              >
                Formularios de registros
              </Button>
            </Link>
            <Link to="usuarios-registrados" data-oid="ugb_ev0">
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
                data-oid="t__ex6p"
              >
                Usuarios registrados
              </Button>
            </Link>
            <Link to="restaurantes-registrados" data-oid="4u9-crl">
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
                data-oid="98twoqg"
              >
                Restaurantes registrados
              </Button>
            </Link>
            <Link to="pedidos" data-oid="n0izgn_">
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
                data-oid="2yzn7_r"
              >
                Pedidos
              </Button>
            </Link>
            <Link to="publicar-carrusel" data-oid="3_o9z69">
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
                data-oid="__syppd"
              >
                Publicar carrusel
              </Button>
            </Link>
            <Link to="destacar-restaurante" data-oid="c8gk.-g">
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
                data-oid="jjohari"
              >
                Destacar restaurante
              </Button>
            </Link>
          </Stack>
        </div>
        <div data-oid="5w45f1.">
          <Outlet data-oid="v5225ms" />
        </div>
      </>
      <div data-oid="rb2ckcg">
        <Footer data-oid="dok5qyx" />
      </div>
    </div>
  );
}
