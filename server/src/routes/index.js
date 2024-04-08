
const { Router, request }= require('express');
const router = Router();
const postRestaurantRouter = require('./restaurant_router');
const postUserRouter = require('../routes/Users_router'); 


router.use('/api', postRestaurantRouter, postUserRouter  ) 



















module.exports = router