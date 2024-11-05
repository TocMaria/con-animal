const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

// Rota para registrar um novo usuário
router.post('/register', UserController.registerUser);

// Rota para login
router.post('/login', UserController.loginUser);

module.exports = router;
