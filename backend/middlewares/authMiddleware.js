const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para verificar si el token es válido
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Obtener el token del header Authorization

  if (!token) {
    return res.status(403).json({ mensaje: 'Token requerido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensaje: 'Token inválido' });
    }
    req.user = decoded;  // Guardamos el usuario decodificado en la solicitud
    next();  // Pasamos al siguiente middleware o ruta
  });
};

// Middleware para verificar si el usuario es admin
const isAdmin = (req, res, next) => {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ mensaje: 'Solo administradores pueden realizar esta acción' });
  }
  next();  // Si el usuario es admin, seguimos
};

// Middleware para verificar si el usuario tiene permisos para comentar
const puedeComentar = (req, res, next) => {
  if (req.user.rol === 'visitante') {
    return res.status(403).json({ mensaje: 'Los visitantes no pueden comentar en los documentos' });
  }
  next(); // Si es investigador o admin, sigue adelante
};

// Exportar todas las funciones juntas
module.exports = { verifyToken, isAdmin, puedeComentar };
