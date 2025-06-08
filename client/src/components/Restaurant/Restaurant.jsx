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
    <div data-oid="5oy5:6.">
      <h1 className={styles.text} data-oid="5_puvlq">
        Restaurantes con esos productos
      </h1>
      <div className={styles.cards_container} data-oid="cwe-6ey">
        {allrestaurant &&
          allrestaurant.map((data) => (
            <Link to={`/detalles/restaurante/${data.id}`} data-oid="faeibm3">
              <Card sx={{ maxWidth: 345 }} data-oid="4e77cd7">
                <CardMedia
                  component="img"
                  height="194"
                  image={data.imageFile && data.imageFile[0]}
                  alt="Paella dish"
                  data-oid="abed8rf"
                />

                <CardContent data-oid="5w6ujhd">
                  <Typography sx={{ textAlign: "center" }} data-oid="slpym:5">
                    {data.name}
                  </Typography>
                </CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center", paddingBottom: "2em" }}
                  data-oid="b:oviaa"
                >
                  {data.address}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center", paddingBottom: "2em" }}
                  data-oid="lrnhuvl"
                >
                  {data.email}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center", paddingBottom: "2em" }}
                  data-oid="xkgfsdi"
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
