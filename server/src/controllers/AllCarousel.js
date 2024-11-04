const { Carousel } = require('../db');
module.exports = {
    AllCarousel: async (req, res) => {
    try {
  
        const carousels = await Carousel.findAll();

        console.log('Todos los carruseles');

        res.status(200).send({success: true, data: carousels})


    } catch (error) {
      console.error('error al obtener todas las imagenes del formulario:', error);
      res.status(500).json({ error: 'error al obtener todas las imagenes del formulario' });
    }
  }
};
