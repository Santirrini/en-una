
const { Router  }= require('express');
const router = Router();
const postRestaurantRouter = require('./restaurant_router');
const postUserRouter = require('../routes/users_router'); 
const postMenuRouter = require('./menu_router'); 
const passwordRouter = require('./password'); 



router.use('/api', postRestaurantRouter, postUserRouter, postMenuRouter, passwordRouter  ) 



















module.exports = router