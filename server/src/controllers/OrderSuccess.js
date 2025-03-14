require('dotenv').config();

const { SuccessPayment, Order } = require('../db');

module.exports = {
    OrderSuccess: async (req, res) => {
    const { order_id,
        name,
        lastName,
        email,
        phone,
        observation,
  
        orderId,
        userId} = req.body;


  

      // Verifica y guarda la orden en la base de datos
      try {

        // Busca la orden relacionada
    
        const formatDate = (date) => {
          if (isNaN(date.getTime())) {
            throw new Error("Fecha inválida");
          }
          const day = String(date.getDate()).padStart(2, '0'); // Asegura dos dígitos
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes comienza en 0
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        };
        
        const today = new Date();
        if (isNaN(today.getTime())) {
          throw new Error("Fecha no válida");
        }
        const successPayment = await SuccessPayment.create({
          order_id,
          name,
          lastName,
          email,
          phone,
          observation,
          date_payment: formatDate(today), // Usar formato DD/MM/YYYY

          status: 'Pendiente',
          orderId,
          userId
        });

        console.log('Orden guardada en la base de datos:', successPayment);
      } catch (error) {
        console.error('Error al guardar la orden en la base de datos:', error);
      }

    res.status(200).send('Evento recibido');

  }
};
