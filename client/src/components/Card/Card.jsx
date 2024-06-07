import * as React from "react";
import { Result } from "antd";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AllRestaurant, dataPersonal } from "../../redux/action";
import Avatar from "@mui/material/Avatar";

export default function Cards() {
  const dispatch = useDispatch();
  const allrestaurant = useSelector((state) => state.allrestaurant.data);
  const token = useSelector((state) => state.token);
  const datapersonal = useSelector((state) => state.datapersonal);
  React.useEffect(() => {
    dispatch(AllRestaurant());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch, token]);
  return (
    <>
    {allrestaurant?.length === 0 ? (
        <div>
        <Result
          title="No hay restaurantes publicados"
    
        />
      </div>
    ): (

    <div>
      {/* <h1 className={styles.text}>Todos los productos</h1> */}
      <div className={styles.cards_container}>
        {allrestaurant?.map((data) => (
          <Link to={`/detalles/restaurante/${data.id}`}>
            <Card sx={{ maxWidth: 345, width: 500, ":hover":{ boxShadow: "3px 5px 5px #cacaca"} }}>
              <CardMedia
                component="img"
                image={data.imageFile[0]}
                alt={data.imageFile[0]}
                sx={{ height: 200 }}
                />
           
              <CardContent>
                <Typography
                  sx={{ textAlign: "center", textDecoration: "none" }}
                  >
                <img src={require("../../Images/Logo.png")} alt="Logo" className={styles.logo_card} />
                  {data.name}
                </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                {data.address},{" "}
                {data.address_optional ? data.address_optional : null}
              </Typography>
              </CardContent>

            </Card>
          </Link>
        ))}
      </div>
    </div>
    )}

                </>
  );
}
