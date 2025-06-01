const jwt = require('jsonwebtoken');
const { User } = require('../models/models');
const bcrypt = require('bcryptjs');  // usa bcryptjs para mantener consistencia

exports.createUser = async (req, res) => {
  const { nombre, apellido, correo, contraseña, rol } = req.body;
  if (!nombre || !apellido || !correo || !contraseña || !rol) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  try {
    const hash = await bcrypt.hash(contraseña, 10);
    const user = new User({
      nombre,
      apellido,
      correo,
      contraseña: hash,
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
    if (!nombre || !apellido || !correo || !contraseña || !rol) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
    const hash = await bcrypt.hash(contraseña, 10);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { nombre, apellido, correo, contraseña: hash, rol, permisos, fecha_registro },
      { new: true }
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

exports.loginUsuario = async (req, res) => {
  const { correo, contraseña } = req.body;
  console.log("Datos recibidos:", { correo, contraseña });
  if (!correo || !contraseña) {
    return res.status(400).json({ mensaje: 'Debe proporcionar correo y contraseña', encontrado: 0 });
  }
  try {
    const user = await User.findOne({ correo });
    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado', encontrado: 0 });
    }
    console.log("Usuario encontrado:", user);
    const match = await bcrypt.compare(contraseña, user.contraseña);
    console.log("Resultado comparación:", match);
    if (!match) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta', encontrado: 0 });
    }
    const token = jwt.sign(
      { id: user._id, rol: user.rol },
      process.env.JWT_SECRET || "clave_secreta",
      { expiresIn: '8h' }
    );
    return res.status(200).json({
      mensaje: 'Usuario autenticado',
      encontrado: 1,
      usuario: {
        id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        rol: user.rol,
        permisos: user.permisos,
      },
      token,
    });
  } catch (error) {
    console.error('Error en loginUsuario:', error);
    return res.status(500).json({ mensaje: 'Error interno', encontrado: 0 });
  }
};
