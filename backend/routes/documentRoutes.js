const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");

router.get("/search", documentController.searchDocuments);
// Crear un nuevo documento
router.post("/", documentController.createDocument);

// Obtener todos los documentos
router.get("/", documentController.getAllDocuments);

// Obtener un documento por su ID
router.get("/:id", documentController.getDocumentById);

// Actualizar un documento
router.put("/:id", documentController.updateDocument);

// Eliminar un documento
router.delete("/:id", documentController.deleteDocument);

router.post('/:id/rating', documentController.rateDocument);         // Agregar o actualizar rating
router.get('/:id/rating-summary', documentController.getRatingSummary); // Obtener promedio y total



module.exports = router;
