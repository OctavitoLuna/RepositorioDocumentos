const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  accion: {
    type: String,
    required: true
  },
  fecha_accion: {
    type: Date,
    default: Date.now
  },
  ip: {
    type: String,
    required: true
  }
});

const Log = mongoose.model('Log', LogSchema);

module.exports = Log;
per