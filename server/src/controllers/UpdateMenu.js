const { Menu } = require('../db');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = {
  UpdateMenu: async (req, res) => {
    const { authorization } = req.headers;

    // Verificar el token de autorización
    jwt.verify(authorization, process.env.FIRMA_TOKEN, async (err, decoded) => {
      if (err) {
        return res.sendStatus(401);
      }

      try {
        // Verificar si se han proporcionado archivos
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
          imageUrls = await Promise.all(req.files.map(async (file) => {
            const cloudinaryUploadResult = await cloudinary.uploader.upload(file.path, {
              resource_type: 'image',
              quality: 'auto:low',
              fetch_format: 'auto',
            });
            console.log('Imagen subida a Cloudinary:', cloudinaryUploadResult.secure_url);
            return cloudinaryUploadResult.secure_url;
          }));
        }

        // Obtener el menuId del menú a actualizar desde los parámetros de la URL
        const { menuId } = req.params;

        // Obtener los datos actualizados desde el cuerpo de la solicitud
        const { name, details, price, category } = req.body;

        // Buscar el menú existente por su ID
        const menuToUpdate = await Menu.findByPk(menuId);

        if (!menuToUpdate) {
          return res.status(404).send({ success: false, error: 'Menú no encontrado' });
        }

        // Actualizar los campos del menú
        menuToUpdate.name = name || menuToUpdate.name;
        menuToUpdate.details = details || menuToUpdate.details;
        menuToUpdate.price = price || menuToUpdate.price;
        menuToUpdate.category = category ? JSON.parse(category) : menuToUpdate.category;
        if (imageUrls.length > 0) {
          menuToUpdate.imageFile = imageUrls; // Actualizar imágenes si se proporcionaron
        }

        // Guardar los cambios en la base de datos
        await menuToUpdate.save();

        console.log('Menú actualizado correctamente');
        res.status(200).send({ success: true, data: menuToUpdate });
      } catch (error) {
        console.error('Error al actualizar el menú:', error);
        res.status(500).send({ success: false, error: 'Ocurrió un error al actualizar el menú' });
      }
    });
  }
};
