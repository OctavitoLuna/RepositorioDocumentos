const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  autor: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  tipo: {
    type: String,
    enum: ['PDF', 'TIFF', 'JPG', 'PNG'],
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  etiquetas: {
    type: [String], // Etiquetas relacionadas con el documento
    default: []
  },
  archivo_url: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    default: ''
  },
  fecha_subida: {
    type: Date,
    default: Date.now
  },
  usuario_responsable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comentarios: [{
    usuario_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    comentario: {
      type: String
    },
    fecha_comentario: {
      type: Date,
      default: Date.now
    }
  }],
  versiones: [{
    version_id: String,
    fecha: Date,
    archivo_url: String
  }]
});

const Document = mongoose.model('Document', DocumentSchema);

module.exports = Document;
