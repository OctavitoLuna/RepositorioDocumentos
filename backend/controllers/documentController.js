// documentController.js
const { Document } = require("../models/models");  // Importa el modelo desde el archivo central

// Crear un nuevo documento
exports.createDocument = async (req, res) => {
  try {
    const document = new Document(req.body);
    await document.save();
    res.status(201).json({ message: "Documento creado", document });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todos los documentos
exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json(documents);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener un documento por ID
exports.getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: "Documento no encontrado" });
    }
    res.status(200).json(document);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar un documento
exports.updateDocument = async (req, res) => {
  try {
    const updatedDocument = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDocument) {
      return res.status(404).json({ message: "Documento no encontrado" });
    }
    res.status(200).json({ message: "Documento actualizado", updatedDocument });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar un documento
exports.deleteDocument = async (req, res) => {
  try {
    const deletedDocument = await Document.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      return res.status(404).json({ message: "Documento no encontrado" });
    }
    res.status(200).json({ message: "Documento eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Búsqueda de documentos
exports.searchDocuments = async (req, res) => {
  try {
    const { titulo, autor, tipo } = req.query;

    let filtro = {};

    if (titulo) {
      filtro.titulo = { $regex: titulo, $options: 'i' };
    }

    if (autor) {
      filtro.autor = { $regex: autor, $options: 'i' };
    }

    if (tipo) {
      filtro.tipo = tipo;
    }

    const documents = await Document.find(filtro);
    res.status(200).json(documents);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.rateDocument = async (req, res) => {
  const { id } = req.params;
  const { usuario_id, valor } = req.body;

  if (!usuario_id || !valor || valor < 1 || valor > 5) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  try {
    const doc = await Document.findById(id);
    if (!doc) return res.status(404).json({ error: 'Documento no encontrado' });

    const existingRating = doc.ratings.find(r => r.usuario_id.toString() === usuario_id);

    if (existingRating) {
      existingRating.valor = valor; // actualiza rating
    } else {
      doc.ratings.push({ usuario_id, valor }); // nuevo rating
    }

    await doc.save();
    res.json({ message: 'Calificación registrada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getRatingSummary = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findById(id).select('ratings');
    if (!doc) return res.status(404).json({ error: 'Documento no encontrado' });

    const total = doc.ratings.length;
    const promedio = total > 0
      ? doc.ratings.reduce((sum, r) => sum + r.valor, 0) / total
      : 0;

    res.json({
      promedio: promedio.toFixed(2),
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
