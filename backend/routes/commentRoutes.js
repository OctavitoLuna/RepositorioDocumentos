const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// Crear un nuevo comentario
router.post("/", commentController.createComment);

// Obtener todos los comentarios
router.get("/", commentController.getAllComments);

// Obtener comentarios por documento ID
router.get("/document/:documentId", commentController.getCommentsByDocumentId);

// Eliminar un comentario
router.delete("/:id", commentController.deleteComment);

module.exports = router;
