const express = require('express');
const { crearLog } = require('../controllers/logController');
const { verifyToken } = require('../middlewares/authMiddleware'); // Verificación de token
const router = express.Router();

// Ruta para registrar un log (requiere token)
router.post('/crear', verifyToken, crearLog);

module.exports = router;
