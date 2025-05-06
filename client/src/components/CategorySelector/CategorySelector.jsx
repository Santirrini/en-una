import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';

const CategorySelector = ({ mealTypes, selectedType, setSelectedType }) => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Hola. ¿Qué quieres comer Hoy?
      </Typography>

      <Grid container spacing={2}>
        {mealTypes?.map((category, index) => (
          <Grid item xs={6} sm={4} md={2.4} key={index}>
            <Button
              fullWidth
              variant="contained"
              onClick={() =>
                setSelectedType(selectedType === category ? null : category)
              }
              sx={{
                backgroundColor: selectedType === category ? '#d300ff' : '#4a0072',
                color: '#fff',
                height: 80,
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: selectedType === category ? '#c000e6' : '#360050',
                },
              }}
            >
              {category}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategorySelector;
