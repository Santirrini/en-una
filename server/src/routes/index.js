
const { Router  }= require('express');
const router = Router();
const postRestaurantRouter = require('./restaurant_router');
const postUserRouter = require('./users_router'); 
const postMenuRouter = require('./menu_router'); 
const passwordRouter = require('./password'); 

console.log('Todos los módulos se cargaron correctamente.');

router.use('/api', postRestaurantRouter, postUserRouter, postMenuRouter, passwordRouter  ) 




module.exports = router