const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Documento
const documentSchema = new mongoose.Schema({
  titulo: String,
  autor: String,
  descripcion: String,
  fecha: Date,
  tipo: String,
  categoria: String,
  archivo_url: String,
  usuario_responsable: mongoose.Schema.Types.ObjectId,
  fecha_subida: Date,
  comentarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  versiones: [String],
  ratings: [
    {
      usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      valor: { type: Number, min: 1, max: 5, required: true },
    }
  ]
});
const Document = mongoose.models.Document || mongoose.model("Document", documentSchema);

// Comentario
const commentSchema = new mongoose.Schema({
  documento_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comentario: String,
  fecha_comentario: { type: Date, default: Date.now },
  parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null } // nuevo campo
});
const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
// Usuario
const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  rol: { type: String, enum: ['admin', 'investigador', 'visitante'], default: 'visitante' },
  permisos: { type: [String], default: [] },
  fecha_registro: { type: Date, default: Date.now },
  autenticacion_2fa: { type: Boolean, default: false },
  documentos_descargados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }]
});

// Encriptar contraseña antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('contraseña')) return next();
  this.contraseña = await bcrypt.hash(this.contraseña, 10);
  next();
});

// Método para comparar contraseñas
userSchema.methods.compararContraseña = async function(contraseña) {
  return await bcrypt.compare(contraseña, this.contraseña);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

// Log
const logSchema = new mongoose.Schema({
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  accion: String,
  ip: String,
  fecha_accion: Date
});
const Log = mongoose.models.Log || mongoose.model("Log", logSchema);

// Forum (Foro)
const forumSchema = new mongoose.Schema({
  nombre: String,
  categoria: String,
  fecha_creacion: { type: Date, default: Date.now },
  id_autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  id_documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }]
});
const Forum = mongoose.models.Forum || mongoose.model("Forum", forumSchema);

const collectionSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  usuario_creador: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  documentos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
  fecha_creacion: { type: Date, default: Date.now }
});

const Collection = mongoose.models.Collection || mongoose.model('Collection', collectionSchema);

module.exports = { Document, Comment, User, Log, Forum, Collection};
