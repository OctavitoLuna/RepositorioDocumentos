import React, { useState, useEffect } from 'react';

function DocumentComments({ documentoId, usuario }) {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null); // id comentario al que se responde
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    if (!documentoId) return;
    if (!showComments) return;
    setLoading(true);
    fetch(`http://localhost:3001/comments/document/${documentoId}`)
      .then(res => res.json())
      .then(data => {
        setComentarios(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar comentarios');
        setLoading(false);
      });
  }, [documentoId, showComments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = replyingTo ? replyText : nuevoComentario;
    if (!text.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documento_id: documentoId,
          usuario_id: usuario ? usuario._id : null,
          comentario: text,
          parent_id: replyingTo || null,
        }),
      });
      if (!response.ok) throw new Error('Error al enviar comentario');
      const savedComment = await response.json();
      setComentarios([savedComment, ...comentarios]);
      if (replyingTo) {
        setReplyingTo(null);
        setReplyText('');
      } else {
        setNuevoComentario('');
      }
      setError(null);
    } catch {
      setError('No se pudo enviar el comentario');
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    if (isNaN(d)) return '';
    return d.toLocaleString();
  };

  // Construye árbol de comentarios anidados
  const buildTree = (list) => {
    const map = {};
    const roots = [];
    list.forEach(c => {
      c.children = [];
      map[c._id] = c;
    });
    list.forEach(c => {
      if (c.parent_id) {
        if (map[c.parent_id]) {
          map[c.parent_id].children.push(c);
        } else {
          roots.push(c);
        }
      } else {
        roots.push(c);
      }
    });
    return roots;
  };

  // Renderiza comentarios y respuestas recursivamente
  const renderComments = (comments, depth = 0) => {
    return comments.map(c => (
      <div key={c._id} style={{ marginLeft: depth * 20, marginBottom: '12px', borderLeft: depth > 0 ? '2px solid #ccc' : 'none', paddingLeft: '8px' }}>
        <div style={{ fontWeight: '700' }}>
          {c.usuario_id ? `${c.usuario_id.nombre} ${c.usuario_id.apellido}` : 'Anónimo'}:
        </div>
        <div style={{ whiteSpace: 'pre-wrap', marginBottom: '4px' }}>{c.comentario}</div>
        <div style={{ fontSize: '12px', color: '#666' }}>{formatDate(c.fecha_comentario) || 'Fecha desconocida'}</div>
        <button
          onClick={() => setReplyingTo(c._id === replyingTo ? null : c._id)}
          style={{ fontSize: '12px', cursor: 'pointer', color: '#D46D1E', background: 'none', border: 'none', padding: 0, marginTop: '4px' }}
        >
          {c._id === replyingTo ? 'Cancelar' : 'Responder'}
        </button>
        {c._id === replyingTo && (
          <form onSubmit={handleSubmit} style={{ marginTop: '8px' }}>
            <textarea
              rows={2}
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder="Escribe tu respuesta..."
              style={{ width: '100%', borderRadius: '6px', border: '1px solid #ccc', padding: '6px', fontSize: '14px' }}
              required
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: '6px',
                padding: '6px 15px',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: '#D46D1E',
                color: 'white',
                border: 'none',
                fontWeight: '600',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b95c17'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#D46D1E'}
            >
              Enviar
            </button>
          </form>
        )}
        {c.children.length > 0 && renderComments(c.children, depth + 1)}
      </div>
    ));
  };

  const tree = buildTree(comentarios);

  return (
    <div style={{ marginTop: '20px' }}>
      <button
        onClick={() => setShowComments(!showComments)}
        style={{
          backgroundColor: '#D46D1E',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 20px',
          cursor: 'pointer',
          fontWeight: '600',
          marginBottom: '15px',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b95c17'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#D46D1E'}
      >
        {showComments ? 'Ocultar Comentarios' : 'Mostrar Comentarios'}
      </button>

      {showComments && (
        <>
          {!replyingTo && (
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
              <textarea
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
                placeholder="Escribe tu comentario..."
                rows={3}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  resize: 'vertical',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: '10px',
                  padding: '10px 25px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: '#D46D1E',
                  color: 'white',
                  border: 'none',
                  fontWeight: '600',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b95c17'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#D46D1E'}
              >
                Enviar
              </button>
            </form>
          )}
          {loading && <p>Cargando comentarios...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {comentarios.length === 0 && <p>No hay comentarios aún.</p>}
          {renderComments(tree)}
        </>
      )}
    </div>
  );
}

export default DocumentComments;
