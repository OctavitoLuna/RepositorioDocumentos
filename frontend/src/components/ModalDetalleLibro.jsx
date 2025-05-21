import React from 'react';

export default function ModalDetalleLibro({ documento, visible, onClose }) {
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
    padding: '30px',
    borderRadius: '15px',
    width: '500px',
    maxHeight: '85vh',
    overflowY: 'auto',
    boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
  },
  title: {
    marginBottom: '15px',
    fontSize: '24px',
    color: '#222',
  },
  button: {
    marginTop: '25px',
    padding: '12px 25px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  }
};
