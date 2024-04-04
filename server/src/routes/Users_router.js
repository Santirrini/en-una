
const { Router }= require('express');
const router = Router();

const {Register} = require('../controllers/Register');
const {AllUsers} = require('../controllers/AllUsers');
const {Login} = require('../controllers/Login');
const {DetailsPersonal} = require('../controllers/DetailsPersonal');





router.post('/register', Register );
router.get('/users', AllUsers );
router.post('/login', Login );
router.get('/datapersonal', DetailsPersonal );





module.exports = router




















