
const { Router  }= require('express');
const router = Router();
const postRestaurantRouter = require('./restaurant_router');
const postUserRouter = require('../routes/Users_router'); 
const postMenuRouter = require('../routes/menu_router'); 
const passwordRouter = require('../routes/password'); 



router.use('/api', postRestaurantRouter, postUserRouter, postMenuRouter, passwordRouter  ) 



















module.exports = router