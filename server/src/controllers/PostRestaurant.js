require('dotenv').config();

const { Restaurant, User } = require('../db');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');




cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = {
  PostRestaurant: async (req, res) => {
    const { authorization } = req.headers;

    // Verificar el token de autorización
    jwt.verify(authorization, process.env.FIRMA_TOKEN, async (err, decoded) => {
      if (err) {
        return res.sendStatus(401);
      }

      try {
        const userId = decoded.id; // ID del usuario extraído del token
        const existingRestaurant = await Restaurant.findOne({ where: { userId } });

        // Verificar si el usuario ya tiene un restaurante asociado
        if (existingRestaurant) {
          console.log('El usuario ya tiene un restaurante asociado')
          return res.status(400).send('El usuario ya tiene un restaurante asociado');
        }

        // Verificar si se han proporcionado archivos
        if (!req.files || req.files.length === 0) {
          console.log('No se han proporcionado archivos.')
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
        const { name, address, address_optional, phone, email, details, horarios } = req.body;

        // Asegúrate de convertir horarios a un array si es un string
        let parsedHorarios;
        try {
          parsedHorarios = JSON.parse(horarios);
        } catch (error) {
          console.error('Error al parsear los horarios:', error);
          return res.status(400).send('El formato de los horarios no es válido');
        }

        const newRestaurant = await Restaurant.create({
          imageFile: imageUrls,
          name,
          address,
          address_optional,
          phone,
          email,
          horarios: parsedHorarios, // Usar el array parseado
          details,
          userId // Asignar el ID del usuario al restaurante
        });

        console.log('Restaurante creado correctamente');
        res.status(200).send({ success: true, data: newRestaurant });
      } catch (error) {
        console.error('Error al crear el restaurante:', error);
        res.status(500).send({ success: false, error: 'Ocurrió un error al crear el restaurante' });
      }
    });
  }
};
