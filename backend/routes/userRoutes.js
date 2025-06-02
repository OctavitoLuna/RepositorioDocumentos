// src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware'); // Asegúrate de tener estos middlewares

// Ruta para crear un nuevo usuario (POST /users)
// Esta ruta ya la tienes, pero la reconfirmamos aquí con la protección si es que la habías quitado.
// La mantendremos protegida para que solo un admin pueda crear nuevos usuarios.
router.post('/', verifyToken, isAdmin, userController.createUser);

// Rutas para la gestión de usuarios (solo para administradores)
// ----------------------------------------------------------------------

// GET all users (obtener todos los usuarios)
router.get('/', verifyToken, isAdmin, userController.getAllUsers);

// GET user by ID (obtener un usuario específico por su ID)
router.get('/:id', verifyToken, isAdmin, userController.getUserById);

// PUT update user (actualizar un usuario existente por su ID)
router.put('/:id', verifyToken, isAdmin, userController.updateUser);

// DELETE user (eliminar un usuario por su ID)
router.delete('/:id', verifyToken, isAdmin, userController.deleteUser);

// ----------------------------------------------------------------------

module.exports = router;