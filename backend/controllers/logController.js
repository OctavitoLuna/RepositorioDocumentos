const Log = require('../models/Log');

// Crear un nuevo log
const crearLog = async (req, res) => {
  try {
    const { usuario_id, accion, ip } = req.body;

    const nuevoLog = new Log({ usuario_id, accion, ip });
    await nuevoLog.save();

    res.status(201).json({ mensaje: 'Log creado con éxito', nuevoLog });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear log', error });
  }
};

// Obtener logs
const obtenerLogs = async (req, res) => {
  try {
    const logs = await Log.find();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener logs', error });
  }
};

module.exports = { crearLog, obtenerLogs };
