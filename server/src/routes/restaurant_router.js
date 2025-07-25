
const { Router } = require('express');
const router = Router();
const { DeletePost } = require('../controllers/DeletePosts')
const { PostRestaurant } = require('../controllers/PostRestaurant');
const { AllProducts } = require('../controllers/AllProducts');
const { Register } = require('../controllers/Register');
const { Payment, } = require('../controllers/Payment');
const { DetailsRestaurant } = require('../controllers/DetailsRestaurant');
const { AllOrder } = require('../controllers/AllOrder');
const { AllRestaurant } = require('../controllers/AllRestaurants');
const { DeleteOrder } = require('../controllers/DeleteOrder');
const { UpdateProduct } = require('../controllers/UpdateProduct');

const { OrderDetails } = require('../controllers/OrderDetails');
const { Webhooks } = require('../controllers/Webhooks');
const { WebHooksEvent } = require('../controllers/WebHooksEvent');
const { DetailsReservation } = require('../controllers/DetailsReservation');
const { FormPetition } = require('../controllers/FormPetition');
const { AllForm } = require('../controllers/AllForm');
const { DetailsForm } = require('../controllers/DetailsForm');
const { PostCarrusel } = require('../controllers/PostCarrusel');
const { AllCarousel } = require('../controllers/AllCarousel');
const { DeleteCarousel } = require('../controllers/DeleteCarousel');
const { AdminFormSuccess } = require('../controllers/AdminFormSuccess');
const { AllOrdersRestaurants } = require('../controllers/AllOrdersRestaurants');
const { RestaurantDetacs } = require('../controllers/RestaurantDetacs');
const { AllOrdersAdmin } = require('../controllers/AllOrdersAdmin');
const { AllCodes } = require('../controllers/AllCodes');
const { DetailsCodes } = require('../controllers/DetailsCodes');
const { FilterCategory } = require('../controllers/FilterCategory');



const {  User, Code, Restaurant} = require('../db'); // Incluye tu modelo Code















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


router.post('/post-restaurant', upload.fields([
  { name: 'imageFile', maxCount: 1000 },
  { name: 'logoUrl', maxCount: 1 }
]), PostRestaurant);

router.get('/restaurants', AllCodes);
router.get('/code/:codeId', DetailsCodes);

router.get('/restaurant/:restaurantId', DetailsRestaurant);
router.get('/products', AllProducts);
router.post('/register', Register);
router.post('/payment', Payment)
router.get('/obtener-webhook', Webhooks)
router.post('/webhooks', WebHooksEvent)
router.get('/details-reservations/:reservationtId', DetailsReservation)

router.get('/orders/:restaurantId', AllOrder);
router.get('/orders', AllOrdersAdmin);

router.get('/order/:orderId', OrderDetails);
router.delete('/delete/:productId', DeletePost);
router.delete('/order/delete/:orderId', DeleteOrder);
router.put('/productupdate/:productId', UpdateProduct);

router.post('/form-petition', FormPetition);
router.get('/forms', AllForm);
router.get('/forms/:formId', DetailsForm);


router.post('/post-carrusel', upload.single('carrusel'), PostCarrusel);

router.get('/carousels', AllCarousel);
router.delete('/carousels/:id', DeleteCarousel);
router.post('/confirm-form', AdminFormSuccess);
router.get('/all-orders-restaurants', AllOrdersRestaurants);

router.put('/restaurant-destac', RestaurantDetacs);
router.get('/codes-restaurants', AllCodes);
router.get('/restaurant-filter/:category', FilterCategory);



router.get('/code/:codeId', async (req, res) => {
  const { codeId } = req.params;

  if (!codeId || typeof codeId !== 'string') {
    return res.status(400).json({ message: 'Código inválido' });
  }

  try {
    const user = await User.findOne({ where: { codeId }, include: {model:Restaurant} });

    if (user) {
      res.status(200).send({ message: 'Código encontrado', data: user });
    } else {
      res.status(404).json({ message: 'Código no encontrado' });
    }
  } catch (error) {
    console.error('Error al buscar el nombre:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});








module.exports = router