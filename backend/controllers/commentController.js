const Comment = require('../models/Comment');

// Crear un nuevo comentario
const crearComentario = async (req, res) => {
  try {
    const { documento_id, usuario_id, comentario } = req.body;

    const nuevoComentario = new Comment({ documento_id, usuario_id, comentario });
    await nuevoComentario.save();

    res.status(201).json({ mensaje: 'Comentario creado con éxito', nuevoComentario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear comentario', error });
  }
};

// Obtener comentarios de un documento
const obtenerComentarios = async (req, res) => {
  try {
    const comentarios = await Comment.find({ documento_id: req.params.documento_id });
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener comentarios', error });
  }
};

module.exports = { crearComentario, obtenerComentarios };
