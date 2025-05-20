const Document = require('../models/Document');

// Crear un nuevo documento
const crearDocumento = async (req, res) => {
  try {
    const { titulo, autor, fecha, tipo, categoria, archivo_url, descripcion, usuario_responsable } = req.body;

    const documento = new Document({ titulo, autor, fecha, tipo, categoria, archivo_url, descripcion, usuario_responsable });
    await documento.save();

    res.status(201).json({ mensaje: 'Documento creado con éxito', documento });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear documento', error });
  }
};

// Obtener todos los documentos
const obtenerDocumentos = async (req, res) => {
  try {
    const documentos = await Document.find();
    res.status(200).json(documentos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener documentos', error });
  }
};

module.exports = { crearDocumento, obtenerDocumentos };
