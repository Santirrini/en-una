
const { Router }= require('express');
const router = Router();
const {DeletePost} = require('../controllers/DeletePosts')
const {PostRestaurant} = require('../controllers/PostRestaurant');
const {AllProducts} = require('../controllers/AllProducts');
const {Register} = require('../controllers/Register');
const {Payment, handleWebhook} = require('../controllers/Payment');
const {DetailsRestaurant} = require('../controllers/DetailsRestaurant');
const {Order} = require('../controllers/Order');
const {AllOrder} = require('../controllers/AllOrder');
const {detailsOrder} = require('../controllers/detailsOrder');
const {DeleteOrder} = require('../controllers/DeleteOrder');
const {UpdateProduct} = require('../controllers/UpdateProduct');








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


router.post('/post-restaurant', upload.array('imageFile', 1000), PostRestaurant)
router.get('/restaurant/:restaurantId', DetailsRestaurant);
router.get('/products', AllProducts );
router.post('/register', Register );
router.post('/payment/:productId', Payment )
router.post('/webhook', handleWebhook);
router.post('/order', Order);
router.get('/orders', AllOrder);
router.get('/order/:orderId', detailsOrder);
router.delete('/delete/:productId', DeletePost);
router.delete('/order/delete/:orderId', DeleteOrder);
router.put('/productupdate/:productId', UpdateProduct);






module.exports = router