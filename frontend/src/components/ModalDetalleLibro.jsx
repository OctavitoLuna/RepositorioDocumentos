import React from 'react';

export default function ModalDetalleLibro({ documento, visible, onClose }) {
  if (!visible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>{documento.titulo}</h2>
        <p><strong>Autor:</strong> {documento.autor}</p>
        <p><strong>Tipo:</strong> {documento.tipo || 'N/A'}</p>
        <p><strong>Categoría:</strong> {documento.categoria || 'N/A'}</p>
        <p><strong>Descripción:</strong> {documento.descripcion || 'Sin descripción'}</p>
        <p><strong>Fecha subida:</strong> {documento.fecha_subida ? new Date(documento.fecha_subida).toLocaleDateString() : 'N/A'}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    maxHeight: '80vh',
    overflowY: 'auto'
  }
};
