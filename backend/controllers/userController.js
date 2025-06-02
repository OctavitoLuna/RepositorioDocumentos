// src/controllers/userController.js

const { User } = require('../models/models'); // ESTA ES LA LÍNEA CORRECTA // Asegúrate de que la ruta a tu modelo User sea correcta
const bcrypt = require('bcryptjs'); // Necesario para hashear contraseñas si se actualizan

// Función para crear usuario (ya la tienes, solo la reconfirmamos)
exports.createUser = async (req, res) => {
    try {
        const { nombre, apellido, correo, contrasenia, rol } = req.body;

        // Validar que todos los campos requeridos estén presentes
        if (!nombre || !apellido || !correo || !contrasenia || !rol) {
            return res.status(400).json({ mensaje: 'Todos los campos son requeridos.' });
        }

        // Verificar si el correo ya existe
        let user = await User.findOne({ correo });
        if (user) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado.' });
        }

        // Hashear la contraseña antes de guardar
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contrasenia, salt);

        // Crear nuevo usuario
        user = new User({
            nombre,
            apellido,
            correo,
            contrasenia: hashedPassword,
            rol // El rol viene del body, el admin lo asignará
        });

        await user.save();
        res.status(201).json({ mensaje: 'Usuario creado exitosamente', user: user });

    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

// Nueva función: Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-contrasenia'); // No devolver la contraseña
        res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

// Nueva función: Obtener un usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-contrasenia'); // No devolver la contraseña
        if (!user) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

// Nueva función: Actualizar un usuario
exports.updateUser = async (req, res) => {
    try {
        const { nombre, apellido, correo, contrasenia, rol } = req.body;
        const userId = req.params.id;

        const updates = {};
        if (nombre) updates.nombre = nombre;
        if (apellido) updates.apellido = apellido;
        if (correo) updates.correo = correo;
        if (rol) updates.rol = rol;

        // Si se proporciona una nueva contraseña, hashearla
        if (contrasenia) {
            const salt = await bcrypt.genSalt(10);
            updates.contrasenia = await bcrypt.hash(contrasenia, salt);
        }

        const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }).select('-contrasenia');

        if (!user) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        res.status(200).json({ mensaje: 'Usuario actualizado exitosamente', user });

    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        // Manejo específico para errores de validación de Mongoose si es necesario
        if (error.name === 'ValidationError') {
            return res.status(400).json({ mensaje: error.message });
        }
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

// Nueva función: Eliminar un usuario
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        res.status(200).json({ mensaje: 'Usuario eliminado exitosamente' });

    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};