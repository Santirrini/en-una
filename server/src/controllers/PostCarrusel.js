const { Gallery } = require('../db');
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
        let imageGallery = null;
        
        // Asegurarse de que haya archivos subidos
        if (req.file) {
          const imageGalleryFile = req.file;  // Obtenemos el archivo
          // Subir el archivo a Cloudinary
          const cloudinaryUploadResultLogo = await cloudinary.uploader.upload(imageGalleryFile.path, {
            resource_type: 'image',
            quality: 'auto:best',
            fetch_format: 'auto',
          });
          imageGallery = cloudinaryUploadResultLogo.secure_url;
          console.log('Imagen de galeria subido a Cloudinary:', imageGallery);
        }
  
        // Crear la escuela en la base de datos
        const school = await Gallery.create({ 
          imageGallery: imageGallery
        });
  
        res.status(200).send({ success: true, data: school });
    console.log("Foto subido a galeria correctamente")
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
      }
    }
  }
  
