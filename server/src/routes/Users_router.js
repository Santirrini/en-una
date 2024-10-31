
const { Router }= require('express');
const router = Router();

const {Register} = require('../controllers/Register');
const {AllUsers} = require('../controllers/AllUsers');
const {Login} = require('../controllers/Login');
const {DetailsPersonal} = require('../controllers/DetailsPersonal');
const {ContactUs} = require('../controllers/ContactUs');
const {UpdatePersonal} = require('../controllers/UpdatePersonal');
const {LoginGoogle} = require('../controllers/LoginGoogle');
const {GoogleCallback} = require('../controllers/LoginGoogle');
const {Claim} = require('../controllers/Claim');
const {DetailsUser} = require('../controllers/DetailsUser');








router.post('/register', Register );
router.get('/users', AllUsers );
router.get('/user/:userId', DetailsUser);

router.post('/login', Login );
router.get('/datapersonal', DetailsPersonal );
router.post('/contact-us', ContactUs );
router.put('/update-datapersonal', UpdatePersonal );

router.get('/auth/google', LoginGoogle);

router.get('/auth/google/callback', GoogleCallback);

router.post('/claim', Claim);








module.exports = router




















