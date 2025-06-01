const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

const bcrypt = require('bcrypt');

// Crear usuario
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

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
  try {
    const { nombre, apellido, correo, contraseña, rol, permisos, fecha_registro } = req.body;
    if (!nombre || !apellido || !correo || !contraseña || !rol) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
    const hash = await bcrypt.hash(contraseña, 10);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        apellido,
        correo,
        contraseña: hash,
        rol,
        permisos,
        fecha_registro,
      },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json({ message: "Usuario actualizado", updatedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login usuario con JWT
exports.loginUsuario = async (req, res) => {
  const { usuario, contrasenia } = req.body;
  if (!usuario || !contrasenia) {
    return res.status(400).json({ mensaje: 'Debe proporcionar usuario y contraseña', encontrado: 0 });
  }
  try {
    const user = await User.findOne({ nombre: usuario });
    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado', encontrado: 0 });
    }
    const match = await bcrypt.compare(contrasenia, user.contraseña);
    if (!match) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta', encontrado: 0 });
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id: user._id,
        nombre: user.nombre,
        rol: user.rol,
      },
      process.env.JWT_SECRET,
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
      token, // Token JWT para autenticación
    });
  } catch (error) {
    console.error('Error en loginUsuario:', error);
    return res.status(500).json({ mensaje: 'Usuario no encontrado', encontrado: 0 });
  }
};