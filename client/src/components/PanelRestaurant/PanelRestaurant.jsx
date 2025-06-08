import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Navbar from "./Navbar";
import { Link, Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import { Result } from "antd";

export default function PanelRestaurant() {
  const role = useSelector((state) => state.role);
  const token = useSelector((state) => state.token);

  // Si aún no se ha cargado la información, mostramos un loader
  if (token === undefined || role === undefined) {
    return <div data-oid="vkqu81.">Cargando...</div>;
  }

  return (
    <div data-oid="xdga52g">
      <Navbar data-oid="ikwhf32" />
      <div data-oid="2engq6.">
        <Stack
          spacing={2}
          direction="row"
          sx={{
            margin: "5em auto",
            display: "flex",
            justifyContent: "center",
          }}
          data-oid="szhvbdo"
        >
          <Link to="publicar-restaurante" data-oid="43avpfj">
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
              data-oid=".pkxh6e"
            >
              Publicar mi restaurante
            </Button>
          </Link>
          <Link to="publicar-menu" data-oid="n4.hu_w">
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
              data-oid="h:n14v9"
            >
              Publicar Mi Carta/Menu
            </Button>
          </Link>
          <Link to="pedidos" data-oid=".da.oc9">
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
              data-oid="fk2sac6"
            >
              Ver pedidos
            </Button>
          </Link>
        </Stack>
      </div>

      <div data-oid="7w7v1oz">
        <Outlet data-oid="_g.o.4t" />
      </div>

      <Footer data-oid="nzyrql4" />
    </div>
  );
}
