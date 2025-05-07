const mongoose = require("mongoose");
const Comment = mongoose.model("Comment", new mongoose.Schema({
  documento_id: mongoose.Schema.Types.ObjectId,
  usuario_id: mongoose.Schema.Types.ObjectId,
  comentario: String,
  fecha_comentario: Date
}));

// Crear un nuevo comentario
exports.createComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json({ message: "Comentario creado", comment });
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

// Obtener comentarios por documento ID
exports.getCommentsByDocumentId = async (req, res) => {
  try {
    const comments = await Comment.find({ documento_id: req.params.documentId });
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
