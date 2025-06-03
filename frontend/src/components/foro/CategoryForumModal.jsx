import React, { useEffect, useState, useRef } from 'react';

export default function CategoryForumModal({ categoria, userId, onClose }) {
  const [comments, setComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedComments, setExpandedComments] = useState([]);
  const commentsEndRef = useRef(null);

  const overlayStyles = {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: '14px',
  };

  const modalStyles = {
    backgroundColor: 'white',
    padding: '25px 30px',
    borderRadius: '12px',
    width: '60vw',
    maxHeight: '85vh',
    overflowY: 'auto',
    boxShadow: '0 0 20px rgba(0,0,0,0.4)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  };

  const closeButtonStyles = {
    position: 'absolute',
    top: 10,
    right: 15,
    padding: '8px 14px',
    backgroundColor: '#cc2b2b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
  };

  const commentsAreaStyles = {
    flexGrow: 1,
    overflowY: 'auto',
    marginBottom: '20px',
    paddingRight: '10px',
    borderTop: '1px solid #ddd',
    borderBottom: '1px solid #ddd',
  };

  // Nuevo estilo para línea vertical en anidados
  const commentContainerStyles = (level) => ({
    marginLeft: level * 25,
    paddingLeft: '15px',
    borderLeft: level === 0 ? 'none' : '3px solid #ddd',
    marginBottom: '15px',
  });

  const commentBoxStyles = {
    backgroundColor: '#f5f5f7',
    borderRadius: '10px',
    padding: '12px 15px',
    maxWidth: '75%',
    wordWrap: 'break-word',
    boxShadow: '0 1px 4px rgb(0 0 0 / 0.1)',
    position: 'relative',
  };

  const usernameStyle = {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '4px',
  };

  const dateStyle = {
    fontSize: '0.75em',
    color: '#666',
    marginBottom: '8px',
  };

  const textareaStyles = {
    width: '70%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    resize: 'vertical',
    fontSize: '14px',
    fontFamily: 'inherit',
    marginBottom: '12px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const sendButtonStyles = {
    width: '100px',
    padding: '10px',
    backgroundColor: '#D46D1E',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const buildCommentTree = (comments) => {
    const map = {};
    const roots = [];
    comments.forEach(c => {
      c.respuestas = [];
      map[c._id] = c;
    });
    comments.forEach(c => {
      if (c.parent_id) {
        if (map[c.parent_id]) {
          map[c.parent_id].respuestas.push(c);
        }
      } else {
        roots.push(c);
      }
    });
    return roots;
  };

  const fetchComments = () => {
    setLoading(true);
    fetch(`http://localhost:3001/forums/comments/${categoria}`)
      .then(res => res.json())
      .then(data => {
        const tree = buildCommentTree(data);
        setComments(tree);
        setLoading(false);
        scrollToBottom();
      })
      .catch(() => {
        setError('Error cargando comentarios');
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!categoria) return;
    fetchComments();
  }, [categoria]);

  const scrollToBottom = () => {
    setTimeout(() => {
      commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const toggleExpand = (commentId) => {
    setExpandedComments(prev =>
      prev.includes(commentId)
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    );
  };

  const sendComment = async (text, parentId = null) => {
    if (!text.trim()) {
      alert("El comentario no puede estar vacío");
      return;
    }
    try {
      const res = await fetch('http://localhost:3001/forums/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoria,
          texto: text,
          usuario_id: userId || null,
          parent_id: parentId,
        }),
      });
      if (!res.ok) throw new Error('Error enviando comentario');
      await res.json();
      fetchComments();
      setReplyingTo(null);
      setNewCommentText('');
    } catch (error) {
      alert('Error enviando comentario');
      console.error(error);
    }
  };

  const renderComments = (list, level = 0) => {
    return list.map(comment => {
      const isOwnComment = (userId && comment.usuario_id?._id === userId) || (!userId && !comment.usuario_id);
      const nombreUsuario = comment.usuario_id?.nombre || "Anónimo";
      const hasReplies = comment.respuestas && comment.respuestas.length > 0;
      const isExpanded = expandedComments.includes(comment._id);

      return (
        <div key={comment._id} style={commentContainerStyles(level)}>
          <div
            style={{
              ...commentBoxStyles,
              textAlign: isOwnComment ? 'right' : 'left',
              backgroundColor: isOwnComment ? '#d1ffd6' : '#f5f5f7',
            }}
          >
            <div style={usernameStyle}>{nombreUsuario}:</div>
            <div>{comment.texto}</div>
            <div style={dateStyle}>{new Date(comment.fecha).toLocaleString()}</div>

            <button
              style={{ fontSize: '12px', marginTop: '5px', cursor: 'pointer', marginRight: '10px' }}
              onClick={() => {
                setReplyingTo(comment._id === replyingTo ? null : comment._id);
                setNewCommentText('');
              }}
            >
              {comment._id === replyingTo ? 'Cancelar' : 'Responder'}
            </button>

            {hasReplies && (
              <button
                style={{ fontSize: '12px', marginTop: '5px', cursor: 'pointer' }}
                onClick={() => toggleExpand(comment._id)}
              >
                {isExpanded ? 'Menos' : `Más (${comment.respuestas.length})`}
              </button>
            )}

            {/* Mostrar textarea para respuesta si el comentario está seleccionado */}
            {comment._id === replyingTo && renderReplyBox(comment._id)}
          </div>

          {/* Mostrar respuestas solo si el comentario está expandido */}
          {isExpanded && hasReplies && renderComments(comment.respuestas, level + 1)}
        </div>
      );
    });
  };

  const renderReplyBox = (parentId) => (
    <div style={{ marginTop: '10px' }}>
      <textarea
        rows={3}
        value={newCommentText}
        onChange={e => setNewCommentText(e.target.value)}
        placeholder="Escribe tu respuesta..."
        style={textareaStyles}
      />
      <button
        disabled={!newCommentText.trim()}
        onClick={() => sendComment(newCommentText, parentId)}
        style={sendButtonStyles}
      >
        Enviar
      </button>
    </div>
  );

  if (loading) return null;
  if (error) return null;

  return (
    <div style={overlayStyles} onClick={onClose}>
      <div style={modalStyles} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={closeButtonStyles}>
          Cerrar
        </button>
        <h3>Foro {categoria}</h3>
        <div style={commentsAreaStyles}>
          {comments.length === 0 ? (
            <p>No hay comentarios aún.</p>
          ) : (
            renderComments(comments)
          )}
          <div ref={commentsEndRef} />
        </div>

        {/* Formulario para comentario raíz */}
        {!replyingTo && (
          <>
            <textarea
              rows={4}
              value={newCommentText}
              onChange={e => setNewCommentText(e.target.value)}
              placeholder="Escribe un nuevo comentario..."
              style={textareaStyles}
            />
            <button
              disabled={!newCommentText.trim()}
              onClick={() => sendComment(newCommentText)}
              style={sendButtonStyles}
            >
              Enviar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
