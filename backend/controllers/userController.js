const { User } = require("../models/models");
const bcrypt = require("bcrypt");

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { nombre, apellido, correo, contraseña, rol } = req.body;
    if (!nombre || !apellido || !correo || !contraseña || !rol) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const user = new User({
      nombre,
      apellido,
      correo,
      contraseña: hashedPassword,
      rol,
      fecha_registro: new Date(),
    });

    await user.save();

    res.status(201).json({ message: "Usuario creado", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
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

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  try {
    const { nombre, apellido, correo, contraseña, rol, permisos, fecha_registro } = req.body;

    if (!nombre || !apellido || !correo || !rol) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    let hashedPassword = undefined;
    if (contraseña) {
      hashedPassword = await bcrypt.hash(contraseña, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        apellido,
        correo,
        ...(hashedPassword && { contraseña: hashedPassword }),
        rol,
        permisos,
        fecha_registro,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario actualizado", updatedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
