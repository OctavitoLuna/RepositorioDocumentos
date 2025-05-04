const Log = require('../models/Log');

const crearLog = async (req, res) => {
  try {
    const { accion } = req.body;
    const { id: usuario_id } = req.user;  // Obtenemos el ID del usuario desde el token JWT
    const ip = req.ip;  // Obtenemos la IP desde la solicitud

    // Crear nuevo log
    const nuevoLog = new Log({
      usuario_id,
      accion,
      ip,
      fecha_accion: Date.now()  // Registrar la fecha actual
    });

    await nuevoLog.save();  // Guardamos el log en la base de datos

    res.status(201).json({ mensaje: 'Log registrado con éxito', log: nuevoLog });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar log', error });
  }
};

module.exports = { crearLog };
