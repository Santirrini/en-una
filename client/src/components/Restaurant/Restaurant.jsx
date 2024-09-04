import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./Restaurant.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AllRestaurant } from "../../redux/action";

export default function Restaurant() {
  const dispatch = useDispatch();
  const allrestaurant = useSelector((state) => state.allrestaurant.data);
  React.useEffect(() => {
    dispatch(AllRestaurant());
  }, [dispatch]);

  return (
    <div>
      <h1 className={styles.text}>Restaurantes con esos productos</h1>
      <div className={styles.cards_container}>
        {allrestaurant &&
          allrestaurant.map((data) => (
            <Link to={`/detalles/restaurante/${data.id}`}>
              <Card sx={{ maxWidth: 345,  }}>
                <CardMedia
                
                  component="img"
                  height="194"
                  image={data.imageFile && data.imageFile[0]}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography sx={{ textAlign: "center" }}>
                    {data.name}
                  </Typography>
                </CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center", paddingBottom: "2em" }}
                >
                  {data.address}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center", paddingBottom: "2em" }}
                >
                  {data.email}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center", paddingBottom: "2em" }}
                >
                  {data.phone}
                </Typography>
              </Card>
            </Link>
          ))}
    
      </div>
    </div>
  );
}
