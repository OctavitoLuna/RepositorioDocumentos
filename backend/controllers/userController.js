const jwt = require('jsonwebtoken');
const { User } = require('../models/models');
const bcrypt = require('bcryptjs'); // Usa bcryptjs para mantener consistencia

exports.createUser = async (req, res) => {
  const { nombre, apellido, correo, contraseña, rol } = req.body;
  if (!nombre || !apellido || !correo || !contraseña || !rol) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  try {
    // La contraseña se hashea automáticamente con el pre-save hook en el modelo User
    const user = new User({
      nombre,
      apellido,
      correo,
      contraseña, // El pre-save hook del modelo se encargará de hashear esto
      rol,
      permisos: [],
      autenticacion_2fa: false,
      fecha_registro: new Date()
    });
    await user.save();
    res.status(201).json({ message: "Usuario creado", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { nombre, apellido, correo, contraseña, rol, permisos, fecha_registro } = req.body;
    if (!nombre || !apellido || !correo || !rol) { // Contraseña no es obligatoria para actualizar si no se cambia
      return res.status(400).json({ error: "Faltan datos obligatorios (nombre, apellido, correo, rol)" });
    }

    let updateFields = { nombre, apellido, correo, rol, permisos, fecha_registro };

    // Solo hashear y actualizar la contraseña si se proporciona una nueva
    if (contraseña) {
      updateFields.contraseña = await bcrypt.hash(contraseña, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true } // runValidators para que se apliquen las validaciones del schema
    );
    if (!updatedUser) return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json({ message: "Usuario actualizado", updatedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// *** ESTA FUNCIÓN DE LOGIN HA SIDO ELIMINADA DE AQUÍ ***
// exports.loginUsuario = async (req, res) => { ... };
