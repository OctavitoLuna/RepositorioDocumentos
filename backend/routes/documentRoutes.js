const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");

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

module.exports = router;
