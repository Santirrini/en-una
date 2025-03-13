
const { Router }= require('express');
const router = Router();
const https = require('https');
const cors = require('cors');

const {Register} = require('../controllers/Register');
const {AllUsers} = require('../controllers/AllUsers');
const {Login} = require('../controllers/Login');
const {DetailsPersonal} = require('../controllers/DetailsPersonal');
const {ContactUs} = require('../controllers/ContactUs');
const {UpdatePersonal} = require('../controllers/UpdatePersonal');
const {LoginGoogle, GoogleAuth, GoogleCallback} = require('../controllers/LoginGoogle');

const {Claim} = require('../controllers/Claim');
const {DetailsUser} = require('../controllers/DetailsUser');
const {UpdateStatus} = require('../controllers/UpdateStatus');

const {VerifyEmail} = require('../controllers/VerifyEmail');


router.use(cors())



router.post('/register', Register );
router.get('/users', AllUsers );
router.get('/user/:userId', DetailsUser);

router.post('/login', Login );
router.get('/datapersonal', DetailsPersonal );
router.post('/contact', ContactUs );
router.put('/update-datapersonal', UpdatePersonal );

// Rutas para la autenticación con Google

router.get('/auth/google', LoginGoogle);  // Redirige al flujo de autenticación de Google
router.get('/auth/google/callback', GoogleCallback);  // Callback de Google
router.post('/auth/google', GoogleAuth); 
router.post('/claim', Claim);

router.put('/user/:id', UpdateStatus);
router.get('/verificar', VerifyEmail);




router.post('/token', async (req, res) => {

    const { body, headers: { transactionid } } = req;

    const options = {
        host: 'testapi-pw.izipay.pe',
        port: 443,
        path: '/security/v1/Token/Generate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'transactionId': transactionid,
        },
        body: body,
    };

    const request = https.request(options, callback => {
        callback.on('data', data => {
            res.send(JSON.parse(data));
        });
    });

    request.on('error', error => {
        console.error(error);
    });

    if (req.body) request.write(JSON.stringify(req.body));
    request.end();

});

module.exports = router




















