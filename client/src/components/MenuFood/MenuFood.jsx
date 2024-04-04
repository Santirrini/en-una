import Card from "@mui/material/Card";
import styles from "./MenuFood.module.css";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

export default function MenuFood() {
  return (
    <>
      <h1 className={styles.text}>Menu</h1>
      <div className={styles.menufood_container}>
        <Card className={styles.menufood_box}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image="https://www.comedera.com/wp-content/uploads/2022/06/jalea-mixta.jpg"
            alt="Live from space album cover"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                Live From Spaceas
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Mac Miller
              </Typography>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                pl: 1,
                pb: 1,
                justifyContent: "center",
                gap: "1em",
              }}
            >
              <Button sx={{ display: "flex", flex: 2 }}>
                AGREGAR AL CARRITO
              </Button>
            </Box>
          </Box>
        </Card>
      </div>
    </>
  );
}
