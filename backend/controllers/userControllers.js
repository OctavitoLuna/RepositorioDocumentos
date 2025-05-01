const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, correo, contraseña, rol } = req.body;

    // Verificar si el correo ya está registrado
    const usuarioExistente = await User.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Crear nuevo usuario
    const usuario = new User({ nombre, apellido, correo, contraseña, rol });
    await usuario.save();

    // Generar un token JWT
    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ mensaje: 'Usuario registrado con éxito', token });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error });
  }
};

// Iniciar sesión (login)
const loginUsuario = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    const usuario = await User.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Usuario no encontrado' });
    }

    const esValida = await usuario.compararContraseña(contraseña);
    if (!esValida) {
      return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ mensaje: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
  }
};

module.exports = { registrarUsuario, loginUsuario };
