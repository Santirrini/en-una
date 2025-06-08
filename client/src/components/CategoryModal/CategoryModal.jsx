import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AllRestaurant, dataPersonal } from "../../redux/action";
const CategoryModal = ({ setOpen }) => {
  const dispatch = useDispatch();
  const allrestaurant = useSelector((state) => state.allrestaurant.data);
  const token = useSelector((state) => state.token);
  const [selectedType, setSelectedType] = React.useState(null);

  React.useEffect(() => {
    dispatch(AllRestaurant());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(dataPersonal(token));
  }, [dispatch, token]);
  // Obtener todos los "type_of_meals" únicos
  const mealTypes = [
    ...new Set(
      allrestaurant
        ?.map((r) => r.restaurants?.[0]?.type_of_meals)
        .filter(Boolean),
    ),
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {mealTypes?.map((category, index) => (
          <Grid item xs={6} sm={4} md={2.4} key={index}>
            <a href={`/restaurante/tipo-de-comida/${category}`}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  setSelectedType(selectedType === category ? null : category);
                  setOpen(false);
                }}
                sx={{
                  backgroundColor:
                    selectedType === category ? "#d300ff" : "#4a0072",
                  color: "#fff",
                  height: 100,
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor:
                      selectedType === category ? "#c000e6" : "#360050",
                  },
                }}
              >
                {category}
              </Button>
            </a>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryModal;
