const { Restaurant, User } = require('../db');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

// Configuración de multer y Cloudinary

module.exports = {
  PostRestaurant: async (req, res) => {
    try {
      // Verificar si se han proporcionado archivos
      if (!req.files || req.files.length === 0) {
        return res.status(400).send('No se han proporcionado archivos.');
      }

      // Subir imágenes a Cloudinary
      const imageUrls = await Promise.all(req.files.map(async (file) => {
        const cloudinaryUploadResult = await cloudinary.uploader.upload(file.path, {
          resource_type: 'image',
          quality: 'auto:low',
          fetch_format: 'auto',
        });
        console.log('Imagen subida a Cloudinary:', cloudinaryUploadResult.secure_url);
        return cloudinaryUploadResult.secure_url;
      }));

      // Crear el restaurante
      const {     
        name,
        address,
        address_optional,
        phone,
        email,
        details
      } = req.body;

      const newPost = await Restaurant.create({
        imageFile: imageUrls,
        name,
        address,
        address_optional,
        phone,
        email,
        details
      });

      // Asociar el restaurante con el usuario
      const userId = req.user.id; // Suponiendo que el id del usuario está en req.user.id
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).send('Usuario no encontrado');
      }
      user.restaurantId = newPost.id;
      await user.save();

      console.log('Restaurante creado correctamente');
      res.status(200).send({ success: true, data: newPost });

    } catch (error) {
      console.error('Error al crear el restaurante:', error);
      res.status(500).send({ success: false, error: 'Ocurrió un error al crear el restaurante' });
    }
  }
};
