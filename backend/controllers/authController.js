const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

exports.login = async (req, res) => {
  const { correo, contraseña } = req.body;

  console.log("--- Intento de Login ---");
  console.log("Correo recibido (frontend):", correo);
  console.log("Contraseña recibida (frontend):", contraseña ? "********" : "VACÍA"); // No loguear la contraseña en texto plano en producción

  if (!correo || !contraseña) {
    console.log("Error: Correo o contraseña obligatorios.");
    return res.status(400).json({ error: "Correo y contraseña son obligatorios" });
  }

  try {
    const user = await User.findOne({ correo });
    if (!user) {
        console.log("Login fallido: Usuario no encontrado para el correo:", correo);
        return res.status(401).json({ error: "Usuario no encontrado" });
    }

    console.log("Usuario encontrado en DB:", user.correo);
    console.log("Hash de contraseña almacenado en DB:", user.contraseña);
    console.log("Contraseña recibida para comparación:", contraseña ? "********" : "VACÍA");

    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    console.log("Resultado de bcrypt.compare:", isMatch);

    if (!isMatch) {
        console.log("Login fallido: Contraseña incorrecta para el correo:", correo);
        return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user._id, correo: user.correo, rol: user.rol },
      process.env.JWT_SECRET || "clave_secreta",
      { expiresIn: "8h" }
    );

    res.json({
        token,
        user: {
            id: user._id,
            nombre: user.nombre,
            apellido: user.apellido,
            correo: user.correo,
            rol: user.rol,
            id_rol: user.rol === 'admin' ? 1 : (user.rol === 'investigador' ? 2 : 3)
        }
    });
    console.log("Login exitoso para el usuario:", user.correo);

  } catch (error) {
    console.error("Error en el login (catch block):", error);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    console.log("--- Fin de Intento de Login ---");
  }
};
