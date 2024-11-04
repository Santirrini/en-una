import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Navbar from "./Navbar";
import { Link, Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function PanelRestaurant() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Stack
          spacing={2}
          direction="row"
          sx={{
            margin: "5em auto",
            display: "flex",
            justifyContent: " center",
          }}
        >
          <Link to="publicar-restaurante">
            <Button
              variant="outlined"
              sx={{
                border: "2px solid #500075",
                color: "#500075",
                ":hover": {
                  border: "2px solid #500075",
                  color: "#fff",
                  backgroundColor: "#500075",
                },
                ":focus": { backgroundColor: "#500075", color: "#fff" },
              }}
            >
              Publicar mi restaurante
            </Button>
          </Link>
          <Link to="publicar-menu">
            <Button
              variant="outlined"
              sx={{
                border: "2px solid #500075",
                color: "#500075",
                ":hover": {
                  border: "2px solid #500075",
                  color: "#fff",
                  backgroundColor: "#500075",
                },
                ":focus": { backgroundColor: "#500075", color: "#fff" },
              }}
            >
              Publicar Mi Carta/Menu
            </Button>
          </Link>
          <Link to="pedidos">
            <Button
              variant="outlined"
              sx={{
                border: "2px solid #500075",
                color: "#500075",
                ":hover": {
                  border: "2px solid #500075",
                  color: "#fff",
                  backgroundColor: "#500075",
                },
                ":focus": { backgroundColor: "#500075", color: "#fff" },
              }}
            >
              Ver pedidos
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
