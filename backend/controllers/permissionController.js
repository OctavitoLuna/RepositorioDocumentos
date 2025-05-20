const Permission = require('../models/Permission');

// Crear un permiso especial para un usuario
const asignarPermiso = async (req, res) => {
  try {
    const { usuario_id, documento_id, tipo_permiso } = req.body;

    const nuevoPermiso = new Permission({ usuario_id, documento_id, tipo_permiso });
    await nuevoPermiso.save();

    res.status(201).json({ mensaje: 'Permiso asignado con éxito', nuevoPermiso });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al asignar permiso', error });
  }
};

// Obtener permisos de un documento
const obtenerPermisos = async (req, res) => {
  try {
    const permisos = await Permission.find({ documento_id: req.params.documento_id });
    res.status(200).json(permisos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener permisos', error });
  }
};

module.exports = { asignarPermiso, obtenerPermisos };
