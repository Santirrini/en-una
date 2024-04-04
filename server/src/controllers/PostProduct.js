const { Products } = require('../db');
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
  PostProduct: async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).send('No se han proporcionado archivos.');
      }

      const imageUrls = [];

      const uploadImageToCloudinary = async (file) => {
        try {
          const cloudinaryUploadResult = await cloudinary.uploader.upload(file.path, {
            resource_type: 'image',
            quality: 'auto:low',
            fetch_format: 'auto',
          });
          console.log('Imagen subida a Cloudinary:', cloudinaryUploadResult.secure_url);
          return cloudinaryUploadResult.secure_url;
        } catch (error) {
          console.error('Error al cargar la imagen en Cloudinary:', error);
          throw error;
        }
      };

      const uploadPromises = req.files.map(uploadImageToCloudinary);

      const uploadedImageUrls = await Promise.all(uploadPromises);
        
      const { product, details, price, price_send,  category, size,descount, backgroundColor } = req.body;
      const parsedSize= typeof size === 'string' ? JSON.parse(size) : [];

      const newPost = await Products.create({
        imageFile: uploadedImageUrls,
        product,
        details,
        descount,
        price,
        price_send,
        category,
        size: parsedSize,
        backgroundColor
      });

      console.log('Post creado correctamente');
      res.status(200).json({ newPost });

    } catch (error) {
      console.error('Error al crear el post:', error);
      res.status(500).json({ error: 'Ocurrió un error al crear el post' });
    }
  }
};
