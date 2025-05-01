const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  documento_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    required: true
  },
  tipo_permiso: {
    type: String,
    enum: ['lectura', 'descarga', 'edición'],
    required: true
  },
  fecha_asignacion: {
    type: Date,
    default: Date.now
  }
});

const Permission = mongoose.model('Permission', PermissionSchema);

module.exports = Permission;
