const { Restaurant, Order, Menu, Code } = require("../db");

module.exports = {
  AllRestaurant: async (req, res) => {
    try {
      // Obtener todos los restaurantes con la relación con Code
      const restaurants = await Restaurant.findAll({
        include: [
          { model: Menu },
          { model: Order },
          { model: Code, as: "code" } // Agregamos la relación con Code
        ]
      });

      // Agrupar restaurantes por CodeId
      const groupedRestaurants = {};
      restaurants.forEach((restaurant) => {
        const codeId = restaurant.codeId;

        if (!groupedRestaurants[codeId]) {
          groupedRestaurants[codeId] = {
            mainRestaurant: restaurant, // Mostrar solo un restaurante principal
            locations: []
          };
        } else {
          groupedRestaurants[codeId].locations.push(restaurant); // Agregar restaurantes con la misma CodeId
        }
      });

      console.log("Restaurantes agrupados por CodeId");

      res.status(200).json({
        success: true,
        data: Object.values(groupedRestaurants)
      });
    } catch (error) {
      console.error("Error al obtener los restaurantes:", error);
      res.status(500).json({ error: "Error al obtener los restaurantes" });
    }
  }
};
