const { Restaurant } = require('../db');

module.exports = {
    RestaurantDetacs: async (req, res) => {
        try {
            const { restaurantId, newCategory } = req.body;

            // Verifica que se hayan enviado los datos necesarios
            if (!restaurantId || !newCategory) {
                return res.status(400).json({ message: 'ID de restaurante y nueva categoría son requeridos' });
            }

            // Busca y actualiza la categoría del restaurante
            const [updated] = await Restaurant.update(
                { category: newCategory },
                { where: { id: restaurantId } }
            );

            if (updated) {
                const updatedRestaurant = await Restaurant.findByPk(restaurantId);
                return res.status(200).json({ message: 'Categoría actualizada exitosamente', restaurant: updatedRestaurant });
            }

            return res.status(404).json({ message: 'Restaurante no encontrado' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    },
};
