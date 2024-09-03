const { Restaurant } = require('../db');
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
        console.error('Error de autenticación:', err);
        return res.sendStatus(401);
      }

      try {
        const {
          name, address, phone, email, details, horarios, local, area, additional_services,
          maximum_per_table, maximum_person_per_table, type_of_meals, average_price
        } = req.body;

        const userId = decoded.id; // ID del usuario extraído del token

        // Subir el logo a Cloudinary si se proporciona
        let logoUrl = null;
        if (req.files && req.files.logoUrl) {
          const logoFile = req.files.logoUrl[0];
          try {
            const cloudinaryUploadResultLogo = await cloudinary.uploader.upload(logoFile.path, {
              resource_type: 'image',
              quality: 'auto:low',
              fetch_format: 'auto',
            });
            logoUrl = cloudinaryUploadResultLogo.secure_url;
            console.log('Logo subido a Cloudinary:', logoUrl);
          } catch (error) {
            console.error('Error al subir el logo a Cloudinary:', error);
            return res.status(500).send('Error al subir el logo a Cloudinary');
          }
        }

        // Subir imágenes a Cloudinary si se proporcionan
        let newImageUrls = [];
        if (req.files && req.files.imageFile) {
          newImageUrls = await Promise.all(req.files.imageFile.map(async (file) => {
            try {
              const cloudinaryUploadResultImage = await cloudinary.uploader.upload(file.path, {
                resource_type: 'image',
                quality: 'auto:low',
                fetch_format: 'auto',
              });
              console.log('Imagen subida a Cloudinary:', cloudinaryUploadResultImage.secure_url);
              return cloudinaryUploadResultImage.secure_url;
            } catch (error) {
              console.error('Error al subir una imagen a Cloudinary:', error);
              throw new Error('Error al subir una imagen a Cloudinary');
            }
          }));
        }

        // Parsear horarios
        let parsedHorarios = [];
        if (horarios) {
          try {
            parsedHorarios = JSON.parse(horarios);
          } catch (error) {
            console.error('Error al parsear los horarios:', error);
            return res.status(400).send('El formato de los horarios no es válido');
          }
        }

        // Verificar si el restaurante ya existe
        let restaurant = await Restaurant.findOne({ where: { userId } });

        if (restaurant) {
          // Si el restaurante ya existe, eliminar todas las imágenes antiguas en Cloudinary
          const oldImageUrls = restaurant.imageFile;
          if (oldImageUrls.length > 0) {
            await Promise.all(oldImageUrls.map(async (url) => {
              try {
                const publicId = url.split('/').pop().split('.')[0]; // Obtener el public_id de la URL
                await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
                console.log('Imagen eliminada de Cloudinary:', url);
              } catch (error) {
                console.error('Error al eliminar una imagen de Cloudinary:', error);
                throw new Error('Error al eliminar una imagen de Cloudinary');
              }
            }));
          }

          // Actualizar el restaurante en la base de datos con las nuevas imágenes
          await Restaurant.update({
            imageFile: newImageUrls,
            logo: logoUrl || restaurant.logo,
            address: address || restaurant.address,
            phone: phone || restaurant.phone,
            maximum_per_table: maximum_per_table || restaurant.maximum_per_table,
            maximum_person_per_table: maximum_person_per_table || restaurant.maximum_person_per_table,
            type_of_meals: type_of_meals || restaurant.type_of_meals,
            average_price: average_price || restaurant.average_price,
            email: email || restaurant.email,
            local: local || restaurant.local,
            area: area ? JSON.parse(area) : restaurant.area,
            additional_services: additional_services ? JSON.parse(additional_services) : restaurant.additional_services,
            horarios: horarios ? parsedHorarios : restaurant.horarios,
            details: details || restaurant.details,
          }, { where: { userId } });

          console.log('Restaurante actualizado correctamente');
          res.status(200).send({ success: true, message: 'Restaurante actualizado correctamente' });
        } else {
          // Si el restaurante no existe, créalo
          const newRestaurant = await Restaurant.create({
            imageFile: newImageUrls,
            logo: logoUrl,
            name,
            address,
            phone,
            maximum_per_table,
            maximum_person_per_table,
            type_of_meals,
            average_price,
            email,
            local,
            area: area ? JSON.parse(area) : [],
            additional_services: additional_services ? JSON.parse(additional_services) : [],
            horarios: parsedHorarios,
            details,
            userId // Asignar el ID del usuario al restaurante
          });

          console.log('Restaurante creado correctamente');
          res.status(201).send({ success: true, message: 'Restaurante creado correctamente', data: newRestaurant });
        }
      } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send({ success: false, error: 'Ocurrió un error al procesar la solicitud' });
      }
    });
  }
};
