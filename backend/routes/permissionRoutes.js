const express = require('express');
const { asignarPermiso, obtenerPermisos } = require('../controllers/permissionController');
const router = express.Router();

// Ruta para asignar un permiso a un usuario
router.post('/asignar', asignarPermiso);

// Ruta para obtener los permisos de un documento
router.get('/obtener/:documento_id', obtenerPermisos);

module.exports = router;
