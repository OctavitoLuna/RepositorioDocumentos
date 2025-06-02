import React, { useState } from 'react';
import OcrScan from './OcrScan';

const DocumentForm = ({ usuarioResponsableId, onSubmit }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    fecha: '',
    tipo: '',
    categoria: '',
    etiquetas: [], // array de strings
    archivo_url: '',
    descripcion: '',
  });

  const [etiquetaInput, setEtiquetaInput] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
    const [showOcrScan, setShowOcrScan] = useState(false);

  // Maneja cambio en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Agrega etiqueta al presionar Enter
  const handleEtiquetaKeyDown = (e) => {
    if (e.key === 'Enter' && etiquetaInput.trim() !== '') {
      e.preventDefault();
      if (!formData.etiquetas.includes(etiquetaInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          etiquetas: [...prev.etiquetas, etiquetaInput.trim()],
        }));
      }
      setEtiquetaInput('');
    }
  };

  // Elimina etiqueta al hacer click
  const handleRemoveEtiqueta = (et) => {
    setFormData((prev) => ({
      ...prev,
      etiquetas: prev.etiquetas.filter((tag) => tag !== et),
    }));
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validar campos obligatorios
    if (
      !formData.titulo ||
      !formData.autor ||
      !formData.fecha ||
      !formData.tipo ||
      !formData.categoria ||
      !formData.archivo_url
    ) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    setLoading(true);

    // Preparar payload para enviar (agregando campos adicionales)
    const payload = {
      titulo: formData.titulo,
      autor: formData.autor,
      fecha: formData.fecha,
      tipo: formData.tipo,
      categoria: formData.categoria,
      etiquetas: formData.etiquetas,
      archivo_url: formData.archivo_url,
      descripcion: formData.descripcion,
      usuario_responsable: usuarioResponsableId, // se recibe como prop
      comentarios: [], // vacío al crear
      versiones: [], // vacío al crear
      fecha_subida: new Date().toISOString(),
    };

    try {
      const response = await fetch('http://localhost:3001/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar documento');
      }

      const data = await response.json();

      // Opcional: ejecutar callback onSubmit para actualizar UI
      if (onSubmit) onSubmit(data.document);

      // Limpiar formulario
      setFormData({
        titulo: '',
        autor: '',
        fecha: '',
        tipo: '',
        categoria: '',
        etiquetas: [],
        archivo_url: '',
        descripcion: '',
      });
      setEtiquetaInput('');
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    marginTop: '5px',
    boxSizing: 'border-box',
  };

  return (
    <>
      {/* Fondo negro semi-transparente */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Contenedor beige opaco */}
        <div
          style={{
            backgroundColor: '#f5f1e9',
            padding: '30px',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 0 20px rgba(0,0,0,0.3)',
            position: 'relative',
          }}
        >
          <h2
            style={{
              textAlign: 'center',
              marginBottom: '20px',
              fontWeight: '700',
              color: '#333',
            }}
          >
            AGREGAR DOCUMENTO
          </h2>

          {error && (
            <p style={{ color: 'red', fontWeight: '600', marginBottom: '10px' }}>
              {error}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
          >
            <label>
              Título*:
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
                style={inputStyle}
                disabled={loading}
              />
            </label>

            <label>
              Autor*:
              <input
                type="text"
                name="autor"
                value={formData.autor}
                onChange={handleChange}
                required
                style={inputStyle}
                disabled={loading}
              />
            </label>

            <label>
              Fecha*:
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                required
                style={inputStyle}
                disabled={loading}
              />
            </label>

            <label>
              Tipo*:
              <input
                type="text"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
                placeholder="Ej: PDF"
                style={inputStyle}
                disabled={loading}
              />
            </label>

            <label>
              Categoría*:
              <input
                type="text"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
                style={inputStyle}
                disabled={loading}
              />
            </label>

            <label>
              Etiquetas (presiona Enter para agregar):
              <input
                type="text"
                name="etiquetas"
                value={etiquetaInput}
                onChange={(e) => setEtiquetaInput(e.target.value)}
                onKeyDown={handleEtiquetaKeyDown}
                placeholder="Agregar etiqueta"
                style={inputStyle}
                disabled={loading}
              />
            </label>
            {/* Mostrar etiquetas agregadas */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginTop: '-10px',
              }}
            >
              {formData.etiquetas.map((etiqueta) => (
                <span
                  key={etiqueta}
                  style={{
                    backgroundColor: '#ddd',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                  onClick={() => handleRemoveEtiqueta(etiqueta)}
                  title="Haz clic para eliminar"
                >
                  {etiqueta} ×
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
                type="url"
                name="archivo_url"
                value={formData.archivo_url}
                onChange={handleChange}
                required
                placeholder="https://ejemplo.com/archivo.pdf"
                style={{ ...inputStyle, flex: 1 }}
                disabled={loading}
            />
            <button
                type="button"
                onClick={() => setShowOcrScan(true)}
                disabled={loading}
                style={{
                padding: '8px 12px',
                backgroundColor: '#4b6e35',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                }}
            >
                Escanear 📷
            </button>
            </div>

            {showOcrScan && (
            <OcrScan
                onClose={() => setShowOcrScan(false)}
                onSetArchivoUrl={(url) => setFormData(prev => ({ ...prev, archivo_url: url }))}
            />
            )}


            <label>
              Descripción:
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={4}
                style={{ ...inputStyle, resize: 'vertical' }}
                disabled={loading}
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '12px',
                backgroundColor: loading ? '#999' : '#4b6e35',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '10px',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = '#375222';
              }}
              onMouseOut={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = '#4b6e35';
              }}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DocumentForm;
