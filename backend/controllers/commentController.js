// commentController.js
const { Comment } = require("../models/models");  // Importar modelo desde models.js

exports.createComment = async (req, res) => {
  try {
    const { documento_id, usuario_id, comentario, parent_id } = req.body;
    if (!documento_id || !comentario) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    const newComment = new Comment({
      documento_id,
      usuario_id: usuario_id || null,
      comentario,
      fecha_comentario: new Date(),
      parent_id: parent_id || null
    });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



// Obtener todos los comentarios
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCommentsByDocumentId = async (req, res) => {
  try {
    const comments = await Comment.find({ documento_id: req.params.documentId })
      .populate('usuario_id', 'nombre apellido')
      .sort({ fecha_comentario: -1 });
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Eliminar un comentario
exports.deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }
    res.status(200).json({ message: "Comentario eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
