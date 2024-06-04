
const { Router }= require('express');
const router = Router();
const {DeletePost} = require('../controllers/DeletePosts')
const {PostRestaurant} = require('../controllers/PostRestaurant');
const {AllProducts} = require('../controllers/AllProducts');
const {Register} = require('../controllers/Register');
const {Payment, } = require('../controllers/Payment');
const {DetailsRestaurant} = require('../controllers/DetailsRestaurant');
const {AllOrder} = require('../controllers/AllOrder');
const {AllRestaurant} = require('../controllers/AllRestaurants');
const {DeleteOrder} = require('../controllers/DeleteOrder');
const {UpdateProduct} = require('../controllers/UpdateProduct');

const {OrderDratails} = require('../controllers/OrderDratails');
const {Webhooks} = require('../controllers/Webhooks');
const {WebHooksEvent} = require('../controllers/WebHooksEvent');









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


router.post('/post-restaurant', upload.array('imageFile', 1000), PostRestaurant);

router.get('/restaurants', AllRestaurant);
router.get('/restaurant/:restaurantId', DetailsRestaurant);
router.get('/products', AllProducts );
router.post('/register', Register );
router.post('/payment', Payment )
router.get('/obtener-webhook', Webhooks )
router.post('/webhooks', WebHooksEvent )

router.get('/orders', AllOrder);
router.get('/order/:orderId', OrderDratails);
router.delete('/delete/:productId', DeletePost);
router.delete('/order/delete/:orderId', DeleteOrder);
router.put('/productupdate/:productId', UpdateProduct);






module.exports = router