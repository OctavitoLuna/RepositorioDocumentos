import React from 'react';
import DocumentComments from './DocumentComments'; // Ajusta la ruta según tu estructura
import DocumentRating from './DocumentRating'; // Nuevo componente para calificaciones
import ShareWhatsApp from './ShareWhatsApp';
import ShareTwitter from './ShareTwitter'; // Importa el nuevo botón

export default function ModalDetalleLibro({ documento, visible, onClose, userId }) {
  if (!visible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>{documento.titulo}</h2>
        <p><strong>Autor:</strong> {documento.autor}</p>
        <p><strong>Tipo:</strong> {documento.tipo || 'N/A'}</p>
        <p><strong>Categoría:</strong> {documento.categoria || 'N/A'}</p>
        <p><strong>Descripción:</strong> {documento.descripcion || 'Sin descripción'}</p>
        <p><strong>Fecha subida:</strong> {documento.fecha_subida ? new Date(documento.fecha_subida).toLocaleDateString() : 'N/A'}</p>

        {/* Mostrar calificación con el componente que hace fetch de promedio y votos */}
        <DocumentRating documentId={documento._id} userId={userId} />

        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ShareWhatsApp
            title={documento.titulo}
            categoria={documento.categoria || 'sin categoría'}
            descripcion={documento.descripcion || 'sin descripción'}
            autor={documento.autor || 'desconocido'}
          />
          <ShareTwitter
            title={documento.titulo}
            categoria={documento.categoria || 'sin categoría'}
            descripcion={documento.descripcion || 'sin descripción'}
            autor={documento.autor || 'desconocido'}
          />
        </div>

        <DocumentComments documentoId={documento._id} />

        <button style={styles.button} onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    padding: '20px',
  },
  modal: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    width: 500,
    maxHeight: '85vh',
    overflowY: 'auto',
    boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
  },
  title: {
    marginBottom: 15,
    fontSize: 24,
    color: '#222',
  },
  button: {
    marginTop: 25,
    padding: '12px 25px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: 25,
    fontSize: 16,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};
