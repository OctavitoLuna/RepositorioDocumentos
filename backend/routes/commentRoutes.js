const express = require('express');
const { crearComentario, obtenerComentarios } = require('../controllers/commentController');
const { verifyToken, puedeComentar } = require('../middlewares/authMiddleware'); // Importamos los middlewares
const router = express.Router();

// Ruta para crear un comentario (solo usuarios autenticados con permisos)
router.post('/crear', verifyToken, puedeComentar, crearComentario);  // Protegemos la ruta con el token y permisos

// Ruta para obtener comentarios de un documento
router.get('/obtener/:documento_id', obtenerComentarios);  // Esta ruta es para obtener los comentarios de un documento

module.exports = router;
