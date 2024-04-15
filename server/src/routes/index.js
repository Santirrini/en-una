
const { Router, request }= require('express');
const router = Router();
const postRestaurantRouter = require('./restaurant_router');
const postUserRouter = require('../routes/Users_router'); 
const postMenuRouter = require('../routes/menu_router'); 



router.use('/api', postRestaurantRouter, postUserRouter, postMenuRouter  ) 



















module.exports = router