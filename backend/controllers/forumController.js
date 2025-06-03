const { Document, CommentForum } = require('../models/models'); // Ajusta según dónde exportes CommentForum

// Obtener categorías dinámicas (únicas) desde documentos
exports.getCategories = async (req, res) => {
  try {
    const categorias = await Document.distinct('categoria');
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo categorías' });
  }
};

// Función recursiva para construir árbol de comentarios con respuestas
async function getReplies(commentId) {
  const replies = await CommentForum.find({ parent_id: commentId }).sort({ fecha: 1 }).lean();
  for (let reply of replies) {
    reply.respuestas = await getReplies(reply._id);
  }
  return replies;
}

// Obtener comentarios anidados para categoría (solo comentarios raíz y sus respuestas)
exports.getCommentsByCategory = async (req, res) => {
  try {
    const categoria = req.params.categoria;
    // Obtener comentarios raíz (parent_id == null) de la categoría
    const rootComments = await CommentForum.find({ categoria, parent_id: null })
      .sort({ fecha: -1 }) // más recientes primero
      .lean();

    // Para cada comentario raíz, obtener respuestas recursivamente
    for (let comment of rootComments) {
      comment.respuestas = await getReplies(comment._id);
    }

    res.json(rootComments);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo comentarios por categoría' });
  }
};


exports.createComment = async (req, res) => {
  try {
    const { categoria, texto, usuario_id, parent_id = null } = req.body;
    if (!categoria || !texto || !usuario_id) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const newComment = new CommentForum({
      categoria,
      texto,
      usuario_id,
      parent_id,
      fecha: new Date(),
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};