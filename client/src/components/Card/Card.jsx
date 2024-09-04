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
import Box from "@mui/material/Box";
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
          <Result title="No hay restaurantes publicados" />
        </div>
      ) : (
        <div>
          {/* <h1 className={styles.text}>Todos los productos</h1> */}
          <div className={styles.cards_container}>
            {allrestaurant?.map((data) => (
              <Link to={`/detalles/restaurante/${data.id}`}>
                <Card className={styles.card}>
                  <CardMedia
                    component="img"
                    image={data.imageFile[0]}
                    alt={data.imageFile[0]}
                    sx={{ height: 200 }}
                  />

                  <CardContent className={styles.text_logo}>
                    <div>
                      <img
                        src={data.logo}
                        alt="Logo"
                        className={styles.logo_card}
                      />
                    </div>

                    <div>
                      <div>
                        <strong>{data.name}</strong>
                      </div>
                      {data.address},{" "}
                      {data.address_optional ? data.address_optional : null}
                    </div>
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
