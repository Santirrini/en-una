
const { Router, request }= require('express');
const router = Router();
const postProductRouter = require('../routes/postProduct_router');
const postUserRouter = require('../routes/Users_router'); 


router.use('/api', postProductRouter, postUserRouter  ) 



















module.exports = router