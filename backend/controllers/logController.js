const mongoose = require("mongoose");
const Log = mongoose.model("Log", new mongoose.Schema({
  usuario_id: mongoose.Schema.Types.ObjectId,
  accion: String,
  ip: String,
  fecha_accion: Date
}));

// Crear un nuevo log
exports.createLog = async (req, res) => {
  try {
    const log = new Log(req.body);
    await log.save();
    res.status(201).json({ message: "Log creado", log });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todos los logs
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find();
    res.status(200).json(logs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener logs por usuario ID
exports.getLogsByUserId = async (req, res) => {
  try {
    const logs = await Log.find({ usuario_id: req.params.userId });
    res.status(200).json(logs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar un log
exports.deleteLog = async (req, res) => {
  try {
    const deletedLog = await Log.findByIdAndDelete(req.params.id);
    if (!deletedLog) {
      return res.status(404).json({ message: "Log no encontrado" });
    }
    res.status(200).json({ message: "Log eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
