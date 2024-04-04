const { Products, Transaccion } = require('../db');
const Stripe = require('stripe');
const stripe = new Stripe('sk_test_51OgZlTD6FRAUxT8Mk23Qrm1JByYZ6PLQ6Y3RlWfRGvX2qKCJLb1Euk276KadWvh2ffY1KbfpcK4A6ZcswJqkJuXU00iznVJrUz');

module.exports = {
  Payment: async (req, res) => {
    const { productId } = req.params;

    try {
      const post = await Products.findByPk(productId);
      if (!post) {
        return res.status(404).json({ message: 'Publicación no encontrada' });
      }

      const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'required',
        line_items: [
          {
            price_data: {
              product_data: {
                name: post.product,
                description: post.details,
              },
              currency: 'eur',
              unit_amount: post.price * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'https://placee-inc.vercel.app/success',
        cancel_url: 'https://placee-inc.vercel.app/cancel',
      });

      console.log('Pago exitoso');
      res.redirect(session.url);
    } catch (error) {
      console.error('Error al crear la sesión:', error);
      return res.status(500).json({ message: 'Error del servidor' });
    }
  },

  handleWebhook: async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      // Asegúrate de que req.body esté disponible y sea un objeto parseado
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_ENDPOINT_SECRET);
    } catch (err) {
      console.error('Fallo en la construcción del evento webhook:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('Pago exitoso:', paymentIntent.id);
        break;
      // Agrega más casos según sea necesario para manejar otros eventos
      default:
        console.log('Evento no manejado:', event.type);
    }

    // Envía una respuesta exitosa al webhook de Stripe
    res.json({ received: true });
  }
};
