import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Navbar from "./Navbar";
import { Link, Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import {useSelector, useDispatch } from "react-redux";
import {dataPersonal} from '../../redux/action';
import { Result } from "antd";

export default function PanelRestaurant() {

  const role = useSelector((state) => state.role);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      {role === "restaurante" ? (
<>
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
</>

      ): (       <div>
        <Result
          status="403"
          title="403"
          subTitle="Acceso denegado"
          extra={
            <Link to="/">
              <Button
                sx={{
                  background: "#500075",
                  ":hover": { background: "#500075", border: "none" },
                }}
                variant="contained"
              >
                Volver 
              </Button>
            </Link>
          }
        />
      </div>)}
      <div>
        <Footer />
      </div>
    </div>
  );
}
