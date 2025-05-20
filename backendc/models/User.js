const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true,
    unique: true
  },
  contraseña: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ['admin', 'investigador', 'visitante'],
    default: 'visitante'
  },
  permisos: {
    type: [String], // Permisos especiales si es investigador
    default: []
  },
  fecha_registro: {
    type: Date,
    default: Date.now
  },
  autenticacion_2fa: {
    type: Boolean,
    default: false
  },
  documentos_descargados: {
    type: [mongoose.Schema.Types.ObjectId], // Referencias a documentos descargados
    ref: 'Document'
  }
});

// Encriptar contraseña antes de guardar el usuario
UserSchema.pre('save', async function(next) {
  if (!this.isModified('contraseña')) return next();
  this.contraseña = await bcrypt.hash(this.contraseña, 10);
  next();
});

// Método para comparar contraseñas
UserSchema.methods.compararContraseña = async function(contraseña) {
  return await bcrypt.compare(contraseña, this.contraseña);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
