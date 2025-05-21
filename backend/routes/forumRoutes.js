const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

// Obtener todos los foros
router.get('/', forumController.getAllForums);

// Crear un nuevo foro
router.post('/', forumController.createForum);

// Obtener foro por ID
router.get('/:id', forumController.getForumById);

// (Opcional) Eliminar foro, editar, etc.

// Buscar por categoría
router.get('/categoria/:categoria', forumController.getForumsByCategory);


module.exports = router;
