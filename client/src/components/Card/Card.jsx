import * as React from "react";
import { Result } from "antd";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AllRestaurant } from "../../redux/action";

export default function Cards() {
  const dispatch = useDispatch();
  const allrestaurant = useSelector((state) => state.allrestaurant.data);

  React.useEffect(() => {
    dispatch(AllRestaurant());
  }, [dispatch]);

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
            <Card sx={{ maxWidth: 345, width: 500 }}>
              <CardMedia
                component="img"
                image={data.imageFile[0]}
                alt={data.imageFile[0]}
                sx={{ height: 300 }}
                />
              <CardContent>
                <Typography
                  sx={{ textAlign: "center", textDecoration: "none" }}
                  >
                  {data.name}
                </Typography>
              </CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textAlign: "center",
                  paddingBottom: "2em",
                  textDecoration: "none",
                }}
              >
                {data.address},{" "}
                {data.address_optional ? data.address_optional : null}
              </Typography>
            </Card>
          </Link>
        ))}
      </div>
    </div>
    )}

                </>
  );
}
