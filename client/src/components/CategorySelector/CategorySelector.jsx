import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AllRestaurant, dataPersonal } from "../../redux/action";
const CategorySelector = () => {
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
      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
      >
        Hola. ¿Qué quieres comer Hoy?
      </Typography>

      <Grid container spacing={2} display="flex" justifyContent="center">
        {mealTypes?.map((category, index) => (
          <Grid item xs={6} sm={4} md={2.4} key={index}>
            <Link to={`/restaurante/tipo-de-comida/${category}`}>
              <Button
                fullWidth
                variant="contained"
                onClick={() =>
                  setSelectedType(selectedType === category ? null : category)
                }
                sx={{
                  backgroundColor:
                    selectedType === category ? "#d300ff" : "#4a0072",
                  color: "#fff",
                  height: 150,
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  justifyContent: "flex-start", // alineación horizontal a la izquierda
                  alignItems: "flex-start", // alineación vertical arriba
                  padding: 1.5, // para que no quede pegado al borde
                  "&:hover": {
                    backgroundColor:
                      selectedType === category ? "#c000e6" : "#360050",
                  },
                }}
              >
                {category}
              </Button>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategorySelector;
