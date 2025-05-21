const { Forum } = require('../models/models');


// Obtener todos los foros
exports.getAllForums = async (req, res) => {
  try {
    const forums = await Forum.find().populate('id_autor').populate('id_documents');
    res.json(forums);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los foros' });
  }
};

// Crear un nuevo foro
exports.createForum = async (req, res) => {
  try {
    const { nombre, categoria, id_autor, id_documents } = req.body;
    const nuevoForo = new Forum({ nombre, categoria, id_autor, id_documents });
    const foroGuardado = await nuevoForo.save();
    res.status(201).json(foroGuardado);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el foro' });
  }
};

// Obtener un foro por ID
exports.getForumById = async (req, res) => {
  try {
    const forum = await Forum.findById(req.params.id).populate('id_autor').populate('id_documents');
    if (!forum) return res.status(404).json({ message: 'Foro no encontrado' });
    res.json(forum);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el foro' });
  }
};

// Buscar foros por categoría
exports.getForumsByCategory = async (req, res) => {
  try {
    const categoria = req.params.categoria;
    const forums = await Forum.find({ categoria: categoria })
                              .populate('id_autor')
                              .populate('id_documents');
    res.json(forums);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar foros por categoría' });
  }
};
