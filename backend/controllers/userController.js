const mongoose = require("mongoose");
const User = mongoose.model("User", new mongoose.Schema({
  nombre: String,
  apellido: String,
  correo: String,
  contraseña: String,
  rol: String,
  permisos: [String],
  autenticacion_2fa: Boolean,
  fecha_registro: Date
}));

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  const { nombre, apellido, correo, contraseña, rol } = req.body;

  if (!nombre || !apellido || !correo || !contraseña || !rol) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const user = new User(req.body);
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

    // Validar que los datos obligatorios estén presentes
    if (!nombre || !apellido || !correo || !contraseña || !rol) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    // Encontrar y actualizar el usuario por su ID
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      nombre,
      apellido,
      correo,
      contraseña,  // Asegúrate de usar un hash para la contraseña si es necesario
      rol,
      permisos,
      fecha_registro
    }, { new: true });

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
    // Eliminar el usuario por su ID
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

