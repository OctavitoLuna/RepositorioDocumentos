const Comment = require('../models/Comment');
const Document = require('../models/Document');

// Crear un nuevo comentario
const crearComentario = async (req, res) => {
  try {
    const { documento_id, comentario } = req.body;
    const { id: usuario_id } = req.user;  // Obtenemos el ID del usuario desde el token JWT
    
    // Verificar si el documento existe
    const documento = await Document.findById(documento_id);
    if (!documento) {
      return res.status(404).json({ mensaje: 'Documento no encontrado' });
    }

    // Crear el nuevo comentario con el ID del usuario
    const nuevoComentario = new Comment({ documento_id, usuario_id, comentario });
    await nuevoComentario.save();

    // Agregar el comentario al documento
    documento.comentarios.push(nuevoComentario._id);
    await documento.save();

    res.status(201).json({ mensaje: 'Comentario creado con éxito', comentario: nuevoComentario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear comentario', error });
  }
};


// Obtener comentarios de un documento
const obtenerComentarios = async (req, res) => {
  try {
    const { documento_id } = req.params;
    const comentarios = await Comment.find({ documento_id }).populate('usuario_id', 'nombre apellido');  // Para obtener los detalles del usuario

    res.status(200).json(comentarios);  // Enviamos los comentarios
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener comentarios', error });
  }
};

module.exports = { crearComentario, obtenerComentarios };
