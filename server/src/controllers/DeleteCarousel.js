// En tu archivo del controlador de carrusel (por ejemplo, carouselController.js)
const { Carousel } = require('../db');
const cloudinary = require('cloudinary').v2;

module.exports = {
  // Función para eliminar un elemento del carrusel
  DeleteCarousel: async (req, res) => {
    try {
      const { id } = req.params;

      // Buscar el carrusel en la base de datos
      const carousel = await Carousel.findByPk(id);
      if (!carousel) {
        return res.status(404).json({ message: 'Imagen no encontrada' });
      }

      // Eliminar la imagen de Cloudinary
      const publicId = carousel.imageCarousel.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);

      // Eliminar el registro de la base de datos
      await carousel.destroy();
      
      res.status(200).json({ message: 'Imagen eliminada exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar la imagen' });
    }
  },
};
