const express = require('express');
const { register, login, account } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/account', account);

module.exports = router;
