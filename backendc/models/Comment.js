const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  documento_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    required: true
  },
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comentario: {
    type: String,
    required: true
  },
  fecha_comentario: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
