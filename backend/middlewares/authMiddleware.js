const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ mensaje: 'Token requerido' });

  const token = authHeader.split(' ')[1]; // "Bearer token"
  if (!token) return res.status(403).json({ mensaje: 'Token requerido' });

  jwt.verify(token, process.env.JWT_SECRET || "clave_secreta", (err, decoded) => {
    if (err) return res.status(401).json({ mensaje: 'Token inválido' });
    req.user = decoded;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ mensaje: 'Solo administradores pueden realizar esta acción' });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
