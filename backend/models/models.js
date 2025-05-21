// models/models.js
const mongoose = require("mongoose");

// Definir el esquema de documentos
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
  versiones: [String]
});

// Verificar si el modelo ya existe
const Document = mongoose.models.Document || mongoose.model("Document", documentSchema);

// Definir el esquema de comentarios
const commentSchema = new mongoose.Schema({
  documento_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comentario: String,
  fecha_comentario: Date
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

// Definir el esquema de usuarios
const userSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  correo: String,
  contraseña: String,
  rol: String,
  permisos: Array,
  fecha_registro: Date
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

// Definir el esquema de logs
const logSchema = new mongoose.Schema({
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  accion: String,
  ip: String,
  fecha_accion: Date
});

const Log = mongoose.models.Log || mongoose.model("Log", logSchema);

// Definir el esquema de forums (foros)
const forumSchema = new mongoose.Schema({
  nombre: String,
  categoria: String,
  fecha_creacion: { type: Date, default: Date.now },
  id_autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  id_documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }]
});

const Forum = mongoose.models.Forum || mongoose.model("Forum", forumSchema);

// Exportar los modelos para ser utilizados en otras partes del proyecto
module.exports = { Document, Comment, User, Log, Forum };
