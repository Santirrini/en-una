const { Carousel } = require('../db');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

  module.exports = {
    PostCarrusel: async (req, res) => {
  
      try {
        let imageCarousel = null;
        
        // Asegurarse de que haya archivos subidos
        if (req.file) {
          const imageCarouselFile = req.file;  // Obtenemos el archivo
          // Subir el archivo a Cloudinary
          const cloudinaryUploadResultLogo = await cloudinary.uploader.upload(imageCarouselFile.path, {
            resource_type: 'image',
            quality: 'auto:best',
            fetch_format: 'auto',
          });
          imageCarousel = cloudinaryUploadResultLogo.secure_url;
          console.log('Imagen de galeria subido a Cloudinary:', imageCarousel);
        }
  
        // Crear la escuela en la base de datos
        const carousel = await Carousel.create({ 
          imageCarousel: imageCarousel
        });
  
        res.status(200).send({ success: true, data: carousel });
    console.log("Carrusel subido correctamente correctamente")
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
      }
    }
  }
  
