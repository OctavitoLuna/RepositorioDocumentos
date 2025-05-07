const mongoose = require("mongoose");
const Document = mongoose.model("Document", new mongoose.Schema({
  titulo: String,
  autor: String,
  descripcion: String,
  fecha: Date,
  tipo: String,
  categoria: String,
  archivo_url: String,
  usuario_responsable: mongoose.Schema.Types.ObjectId,
  fecha_subida: Date,
  comentarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  versiones: [String]
}));

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
