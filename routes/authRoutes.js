const express = require('express');
const { register, login } = require('../controllers/authController');
const { validateUserRegistration, validateUserLogin, validateRequest } = require('../utils/validate');

const router = express.Router();

router.post('/register', validateUserRegistration, validateRequest, register);
router.post('/login', validateUserLogin, validateRequest, login);

module.exports = router;
