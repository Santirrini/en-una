
const { Router } = require('express');
const router = Router();

const { PostMenu } = require('../controllers/PostMenu');
const { UpdateMenu } = require('../controllers/UpdateMenu');




const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // Usa path.join para obtener la ruta absoluta
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });


router.post('/post-menu/:restaurantId', upload.array('imageFile', 1000), PostMenu);

router.put('/update-menu/:menuId', upload.array('imageFile', 1000), UpdateMenu);





module.exports = router




















