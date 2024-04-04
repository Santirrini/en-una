import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import styles from "./CarsFood.module.css";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function CarsFood() {
  const theme = useTheme();
  const [items, setItems] = React.useState({ image: "", name: "", quantity: 0 });

  const handleIncrease = (newQuantity) => {
    setItems((prevItems) => ({
      ...prevItems,
      quantity: newQuantity
    }));
  };

  const handleDecrease = (newQuantity) => {
    setItems((prevItems) => ({
      ...prevItems,
      quantity: newQuantity
    }));
  };

  const handleCapture = (image, name) => {
    setItems((prevItems) => ({
      ...prevItems,
      image: image,
      name: name
    }));
  };

  const handleConsoleLog = () => {
    console.log(items);
  };

  return (
    <>
      <h1 className={styles.text}>Carrito</h1>
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
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1, justifyContent: "center", gap:"1em"  }}>
              <ButtonGroup sx={{ display: "flex", gap:"1em" }}>
                <Typography>{items.quantity}</Typography>
                <div className={styles.btn_quantity}>

                <Button
                    aria-label="increase"
                    onClick={() => {
                      const newQuantity = Math.max(items.quantity - 1, 0);
                      handleDecrease(newQuantity);
                      handleConsoleLog();
                    }}
                    sx={{ display: "flex", flex: 2  }}
                    >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button
                  aria-label="increase"
                  onClick={() => {
                    const newQuantity = items.quantity + 1;
                    handleIncrease(newQuantity);
                    handleConsoleLog();
                  }}
                  >
                  <AddIcon fontSize="small" />
                </Button>
                  </div>
              </ButtonGroup>
            </Box>
          </Box>
        </Card>

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
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1, justifyContent: "center", gap:"1em"  }}>
              <ButtonGroup sx={{ display: "flex", gap:"1em" }}>
                <Typography>{items.quantity}</Typography>
                <div className={styles.btn_quantity}>

                <Button
                    aria-label="increase"
                    onClick={() => {
                      const newQuantity = Math.max(items.quantity - 1, 0);
                      handleDecrease(newQuantity);
                      handleConsoleLog();
                    }}
                    sx={{ display: "flex", flex: 2  }}
                    >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button
                  aria-label="increase"
                  onClick={() => {
                    const newQuantity = items.quantity + 1;
                    handleIncrease(newQuantity);
                    handleConsoleLog();
                  }}
                  >
                  <AddIcon fontSize="small" />
                </Button>
                  </div>
              </ButtonGroup>
            </Box>
          </Box>
        </Card>

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
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1, justifyContent: "center", gap:"1em"  }}>
              <ButtonGroup sx={{ display: "flex", gap:"1em" }}>
                <Typography>{items.quantity}</Typography>
                <div className={styles.btn_quantity}>

                <Button
                    aria-label="increase"
                    onClick={() => {
                      const newQuantity = Math.max(items.quantity - 1, 0);
                      handleDecrease(newQuantity);
                      handleConsoleLog();
                    }}
                    sx={{ display: "flex", flex: 2  }}
                    >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button
                  aria-label="increase"
                  onClick={() => {
                    const newQuantity = items.quantity + 1;
                    handleIncrease(newQuantity);
                    handleConsoleLog();
                  }}
                  >
                  <AddIcon fontSize="small" />
                </Button>
                  </div>
              </ButtonGroup>
            </Box>
          </Box>
        </Card>

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
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1, justifyContent: "center", gap:"1em"  }}>
              <ButtonGroup sx={{ display: "flex", gap:"1em" }}>
                <Typography>{items.quantity}</Typography>
                <div className={styles.btn_quantity}>

                <Button
                    aria-label="increase"
                    onClick={() => {
                      const newQuantity = Math.max(items.quantity - 1, 0);
                      handleDecrease(newQuantity);
                      handleConsoleLog();
                    }}
                    sx={{ display: "flex", flex: 2  }}
                    >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button
                  aria-label="increase"
                  onClick={() => {
                    const newQuantity = items.quantity + 1;
                    handleIncrease(newQuantity);
                    handleConsoleLog();
                  }}
                  >
                  <AddIcon fontSize="small" />
                </Button>
                  </div>
              </ButtonGroup>
            </Box>
          </Box>
        </Card>

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
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1, justifyContent: "center", gap:"1em"  }}>
              <ButtonGroup sx={{ display: "flex", gap:"1em" }}>
                <Typography>{items.quantity}</Typography>
                <div className={styles.btn_quantity}>

                <Button
                    aria-label="increase"
                    onClick={() => {
                      const newQuantity = Math.max(items.quantity - 1, 0);
                      handleDecrease(newQuantity);
                      handleConsoleLog();
                    }}
                    sx={{ display: "flex", flex: 2  }}
                    >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button
                  aria-label="increase"
                  onClick={() => {
                    const newQuantity = items.quantity + 1;
                    handleIncrease(newQuantity);
                    handleConsoleLog();
                  }}
                  >
                  <AddIcon fontSize="small" />
                </Button>
                  </div>
              </ButtonGroup>
            </Box>
          </Box>
        </Card>

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
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1, justifyContent: "center", gap:"1em"  }}>
              <ButtonGroup sx={{ display: "flex", gap:"1em" }}>
                <Typography>{items.quantity}</Typography>
                <div className={styles.btn_quantity}>

                <Button
                    aria-label="increase"
                    onClick={() => {
                      const newQuantity = Math.max(items.quantity - 1, 0);
                      handleDecrease(newQuantity);
                      handleConsoleLog();
                    }}
                    sx={{ display: "flex", flex: 2  }}
                    >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button
                  aria-label="increase"
                  onClick={() => {
                    const newQuantity = items.quantity + 1;
                    handleIncrease(newQuantity);
                    handleConsoleLog();
                  }}
                  >
                  <AddIcon fontSize="small" />
                </Button>
                  </div>
              </ButtonGroup>
            </Box>
          </Box>
        </Card>

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
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1, justifyContent: "center", gap:"1em"  }}>
              <ButtonGroup sx={{ display: "flex", gap:"1em" }}>
                <Typography>{items.quantity}</Typography>
                <div className={styles.btn_quantity}>

                <Button
                    aria-label="increase"
                    onClick={() => {
                      const newQuantity = Math.max(items.quantity - 1, 0);
                      handleDecrease(newQuantity);
                      handleConsoleLog();
                    }}
                    sx={{ display: "flex", flex: 2  }}
                    >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button
                  aria-label="increase"
                  onClick={() => {
                    const newQuantity = items.quantity + 1;
                    handleIncrease(newQuantity);
                    handleConsoleLog();
                  }}
                  >
                  <AddIcon fontSize="small" />
                </Button>
                  </div>
              </ButtonGroup>
            </Box>
          </Box>
        </Card>

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
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1, justifyContent: "center", gap:"1em"  }}>
              <ButtonGroup sx={{ display: "flex", gap:"1em" }}>
                <Typography>{items.quantity}</Typography>
                <div className={styles.btn_quantity}>

                <Button
                    aria-label="increase"
                    onClick={() => {
                      const newQuantity = Math.max(items.quantity - 1, 0);
                      handleDecrease(newQuantity);
                      handleConsoleLog();
                    }}
                    sx={{ display: "flex", flex: 2  }}
                    >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Button
                  aria-label="increase"
                  onClick={() => {
                    const newQuantity = items.quantity + 1;
                    handleIncrease(newQuantity);
                    handleConsoleLog();
                  }}
                  >
                  <AddIcon fontSize="small" />
                </Button>
                  </div>
              </ButtonGroup>
            </Box>
          </Box>
        </Card>
      </div>
    </>
  );
}
