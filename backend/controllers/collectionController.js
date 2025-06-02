const { Collection } = require('../models/models');

// Crear una colección nueva
exports.createCollection = async (req, res) => {
  try {
    const { nombre, descripcion, usuario_creador } = req.body;
    if (!nombre || !usuario_creador) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    const newCollection = new Collection({
      nombre,
      descripcion,
      usuario_creador,
      documentos: []
    });
    const savedCollection = await newCollection.save();
    res.status(201).json(savedCollection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener colecciones de un usuario
exports.getCollectionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const collections = await Collection.find({ usuario_creador: userId })
      .populate('documentos')
      .exec();
    res.json(collections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener detalle de colección por id
exports.getCollectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await Collection.findById(id).populate('documentos').exec();
    if (!collection) return res.status(404).json({ error: 'Colección no encontrada' });
    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar colección (nombre, descripción, documentos)
exports.updateCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, documentos } = req.body;
    const collection = await Collection.findById(id);
    if (!collection) return res.status(404).json({ error: 'Colección no encontrada' });
    if (nombre) collection.nombre = nombre;
    if (descripcion) collection.descripcion = descripcion;
    if (documentos) collection.documentos = documentos;
    await collection.save();
    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar colección
exports.deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Collection.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Colección no encontrada' });
    res.json({ message: 'Colección eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// En collectionController.js
exports.addDocumentToCollection = async (req, res) => {
  try {
    const { id } = req.params;        // ID de la colección
    const { documentoId } = req.body; // ID del documento a agregar

    const collection = await Collection.findById(id);
    if (!collection) return res.status(404).json({ error: 'Colección no encontrada' });

    // Evitar duplicados
    if (!collection.documentos.includes(documentoId)) {
      collection.documentos.push(documentoId);
      await collection.save();
    }
    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// En collectionController.js
exports.removeDocumentFromCollection = async (req, res) => {
  try {
    const { id, docId } = req.params; // id colección y id documento

    const collection = await Collection.findById(id);
    if (!collection) return res.status(404).json({ error: 'Colección no encontrada' });

    collection.documentos = collection.documentos.filter(d => d.toString() !== docId);
    await collection.save();

    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
