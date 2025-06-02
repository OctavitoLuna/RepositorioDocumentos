const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');

// Crear colección
router.post('/', collectionController.createCollection);

// Obtener colecciones por usuario
router.get('/user/:userId', collectionController.getCollectionsByUser);

// Obtener detalle colección
router.get('/:id', collectionController.getCollectionById);

// Actualizar colección
router.put('/:id', collectionController.updateCollection);

// Eliminar colección
router.delete('/:id', collectionController.deleteCollection);

router.post('/:id/documentos', collectionController.addDocumentToCollection);
router.delete('/:id/documentos/:docId', collectionController.removeDocumentFromCollection);

module.exports = router;
