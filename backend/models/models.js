const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
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
documentSchema.index({ categoria: 1 });
const Document = mongoose.models.Document || mongoose.model("Document", documentSchema);

// Comentario
const commentSchema = new mongoose.Schema({
  documento_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comentario: String,
  fecha_comentario: { type: Date, default: Date.now },
  parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null } // nuevo campo
});

commentSchema.index({ documento_id: 1 });
commentSchema.index({ usuario_id: 1 });
commentSchema.index({ parent_id: 1 });
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


const collectionSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  usuario_creador: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  documentos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
  fecha_creacion: { type: Date, default: Date.now }
});

const Collection = mongoose.models.Collection || mongoose.model('Collection', collectionSchema);



// Esquema para comentarios del foro con estructura anidada
const CommentForumSchema = new Schema({
  categoria: { type: String, required: true },
  texto: { type: String, required: true },
  usuario_id: { type: Types.ObjectId, ref: 'User', required: true },
  fecha: { type: Date, default: Date.now },
  parent_id: { type: Types.ObjectId, ref: 'CommentForum', default: null }, // Comentario padre (puede ser null)
});

CommentForumSchema.index({ categoria: 1 });
CommentForumSchema.index({ usuario_id: 1 });
CommentForumSchema.index({ parent_id: 1 });

const CommentForum = mongoose.models.CommentForum || mongoose.model('CommentForum', CommentForumSchema);

// Exporta todos los modelos correctamente
module.exports = { Document, Comment, User, Log, Collection, CommentForum };
