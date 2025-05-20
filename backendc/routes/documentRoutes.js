const express = require('express');
const { crearDocumento, obtenerDocumentos } = require('../controllers/documentController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');  // Asegúrate de importar los middlewares
const router = express.Router();

// Ruta para crear un documento (solo para administradores)
router.post('/crear', verifyToken, isAdmin, crearDocumento);  // Aquí estamos usando el middleware para verificar el token y que sea admin

// Ruta para obtener documentos (pueden acceder los usuarios autenticados)
router.get('/obtener', verifyToken, obtenerDocumentos);  // Solo necesita un token válido

module.exports = router;
