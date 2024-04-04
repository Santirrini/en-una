const { Orders } = require('../db');

module.exports = {
    Order: async (req, res) => {
        const { product_id,product,price_total, oneSize, size, name, lastName, email, phone, direction_1, direction_2, city, postal_code } = req.body;
        try {

            const orders = await Orders.create({
                product_id,product, oneSize, size,price_total, name, lastName, email, phone, direction_1, direction_2, city, postal_code
            });
            res.status(200).json(orders)





        } catch (error) {
            console.error('Error al crear el orden:', error);
            res.status(500).json({ error: 'Error al crear el orden' });
        }
    }
};
