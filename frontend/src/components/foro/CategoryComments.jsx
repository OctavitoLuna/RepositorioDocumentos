import React, { useEffect, useState, useRef } from 'react';

export default function CategoryComments({ categoria, userId, userName }) {
  const [comments, setComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null); // ID comentario al que respondes o null para nuevo
  const [newCommentText, setNewCommentText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const commentsEndRef = useRef(null);

  // Cargar comentarios por categoría
  useEffect(() => {
    if (!categoria) return;
    setLoading(true);
    fetch(`http://localhost:3001/forums/comments/${categoria}`)
      .then(res => res.json())
      .then(data => {
        setComments(data);
        setLoading(false);
        scrollToBottom();
      })
      .catch(() => {
        setError('Error cargando comentarios');
        setLoading(false);
      });
  }, [categoria]);

  // Scroll al final para ver último comentario tras carga o envío
  const scrollToBottom = () => {
    setTimeout(() => {
      commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Renderizar comentarios recursivamente
  const renderComments = (list, level = 0) => {
    return list.map(comment => {
      const isOwnComment = (userId && comment.usuario_id?._id === userId) || (!userId && !comment.usuario_id);
      const nombreUsuario = comment.usuario_id?.nombre || (comment.usuario_id ? "Anónimo" : "Anónimo");

      return (
        <div
          key={comment._id}
          style={{
            marginLeft: level * 20,
            marginBottom: '10px',
            textAlign: isOwnComment ? 'right' : 'left',
          }}
        >
          <div
            style={{
              backgroundColor: isOwnComment ? '#d1ffd6' : '#eee',
              padding: '10px',
              borderRadius: '10px',
              maxWidth: '80%',
              display: 'inline-block',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}
          >
            <p style={{ margin: '0 0 5px 0' }}>{comment.texto}</p>
            <small style={{ fontSize: '0.8em', color: '#555' }}>
              {nombreUsuario} - {new Date(comment.fecha).toLocaleString()}
            </small>
            <br />
            <button
              style={{ fontSize: '12px', marginTop: '5px', cursor: 'pointer' }}
              onClick={() => {
                setReplyingTo(comment._id === replyingTo ? null : comment._id);
                setNewCommentText('');
              }}
            >
              {comment._id === replyingTo ? 'Cancelar' : 'Responder'}
            </button>
            {comment._id === replyingTo && renderReplyBox(comment._id)}
          </div>

          {/* Renderizar respuestas anidadas */}
          {comment.respuestas && comment.respuestas.length > 0 && renderComments(comment.respuestas, level + 1)}
        </div>
      );
    });
  };

  // Caja para escribir respuesta a comentario seleccionado
  const renderReplyBox = (parentId) => (
    <div style={{ marginTop: '10px' }}>
      <textarea
        rows={3}
        value={newCommentText}
        onChange={e => setNewCommentText(e.target.value)}
        placeholder="Escribe tu respuesta..."
        style={{ width: '100%', padding: '8px' }}
      />
      <button
        disabled={!newCommentText.trim()}
        onClick={() => sendComment(newCommentText, parentId)}
        style={{
          marginTop: '5px',
          padding: '8px 15px',
          backgroundColor: '#D46D1E',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '600',
        }}
      >
        Enviar
      </button>
    </div>
  );

  // Enviar comentario nuevo o respuesta
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
          usuario_id: userId || null, // null = anónimo
          parent_id: parentId,
        }),
      });

      if (!res.ok) throw new Error('Error enviando comentario');

      const updatedComments = await res.json();
      setComments(updatedComments);
      setReplyingTo(null);
      setNewCommentText('');
      scrollToBottom();
    } catch (error) {
      alert('Error enviando comentario');
      console.error(error);
    }
  };

  if (loading) return <p>Cargando comentarios...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h3>Foro {categoria}</h3>

      <div style={styles.commentsArea}>
        {comments.length === 0 ? (
          <p>No hay comentarios aún.</p>
        ) : (
          renderComments(comments)
        )}
        <div ref={commentsEndRef} />
      </div>

      {/* Textarea para nuevo comentario raíz */}
      {!replyingTo && (
        <>
          <textarea
            rows={4}
            value={newCommentText}
            onChange={e => setNewCommentText(e.target.value)}
            placeholder="Escribe un nuevo comentario..."
            style={{ width: '100%', padding: '10px', marginTop: '10px' }}
          />
          <button
            disabled={!newCommentText.trim()}
            onClick={() => sendComment(newCommentText)}
            style={styles.sendButton}
          >
            Enviar
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 2,
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    height: '95vh', // más altura para mejor uso
    overflowY: 'auto',
  },
  commentsArea: {
    flexGrow: 1,
    overflowY: 'auto',
  },
  sendButton: {
    marginTop: '10px',
    padding: '12px 25px',
    backgroundColor: '#D46D1E',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
};
