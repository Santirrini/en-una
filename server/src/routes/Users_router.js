
const { Router }= require('express');
const router = Router();

const {Register} = require('../controllers/Register');
const {AllUsers} = require('../controllers/AllUsers');
const {Login} = require('../controllers/Login');
const {DetailsPersonal} = require('../controllers/DetailsPersonal');
const {ContactUs} = require('../controllers/ContactUs');






router.post('/register', Register );
router.get('/users', AllUsers );
router.post('/login', Login );
router.get('/datapersonal', DetailsPersonal );
router.get('/datapersonal', DetailsPersonal );
router.post('/contact-us', ContactUs );







module.exports = router




















