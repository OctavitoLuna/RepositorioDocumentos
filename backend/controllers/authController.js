const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

exports.login = async (req, res) => {
  let { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res.status(400).json({ error: "Correo y contraseña son obligatorios" });
  }

  correo = correo.trim();
  contraseña = contraseña.trim();

  try {
    const user = await User.findOne({ correo });
    if (!user) return res.status(401).json({ error: "Usuario no encontrado" });

    // Aquí agregas los console.log para depurar
    console.log("Contraseña recibida:", contraseña);
    console.log("Contraseña hash almacenada:", user.contraseña);

    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user._id, correo: user.correo, rol: user.rol },
      process.env.JWT_SECRET || "clave_secreta",
      { expiresIn: "8h" }
    );

    res.json({ token, user: { id: user._id, nombre: user.nombre, correo: user.correo, rol: user.rol } });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
