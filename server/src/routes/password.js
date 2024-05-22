
const { Router }= require('express');
const router = Router();

const {requestPasswordReset} = require('../controllers/requestPasswordReset');
const {resetPassword} = require('../controllers/resetPassword');








router.post('/email-reset', requestPasswordReset );
router.post('/password-reset/:token', resetPassword );









module.exports = router




















