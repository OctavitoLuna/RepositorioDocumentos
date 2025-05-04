const express = require('express');
const { registrarUsuario, loginUsuario } = require('../controllers/userController');
const router = express.Router();

// Ruta para registrar un usuario
router.post('/registro', registrarUsuario);

// Ruta para login de usuario
router.post('/login', loginUsuario);

module.exports = router;
