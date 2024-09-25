// src/controllers/restaurantController.js
const { Restaurant, Menu } = require('../db');
const { wss } = require('../app'); // Importa el servidor WebSocket

module.exports = {
  AllRestaurant: async (req, res) => {
    try {
      const restaurants = await Restaurant.findAll({
        include: [{ model: Menu }],
      });

      console.log('Todos los restaurantes obtenidos');

      // Responder a la solicitud HTTP
      res.status(200).send({ success: true, data: restaurants });

      // Enviar los datos a través de WebSocket a todos los clientes conectados
      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify({ success: true, data: restaurants }));
        }
      });
    } catch (error) {
      console.error('Error al obtener todos los restaurantes:', error);
      res.status(500).json({ error: 'Error al obtener todos los restaurantes' });
    }
  },
};
