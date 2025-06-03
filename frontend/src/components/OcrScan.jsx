import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';
import { PDFDocument } from 'pdf-lib';

const videoConstraints = {
  facingMode: "environment"
};

const OcrScan = ({ onClose, onUploadComplete, onSetArchivoUrl }) => {
  const webcamRef = useRef(null);
  const [capturas, setCapturas] = useState([]); // imágenes capturadas base64
  const [loading, setLoading] = useState(false);
  const [ocrText, setOcrText] = useState('');
  const [error, setError] = useState(null);

  // Capturar imagen desde cámara
  const capture = useCallback(() => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturas((prev) => [...prev, imageSrc]);
    }
  }, [webcamRef]);

  // Convierte imágenes base64 a PDF con pdf-lib
  const crearPdfDesdeCapturas = async (imagenesBase64) => {
    const pdfDoc = await PDFDocument.create();
    for (const base64 of imagenesBase64) {
      const imgBytes = Uint8Array.from(atob(base64.split(',')[1]), c => c.charCodeAt(0));
      let img;
      try {
        img = await pdfDoc.embedJpg(imgBytes);
      } catch {
        img = await pdfDoc.embedPng(imgBytes);
      }
      const page = pdfDoc.addPage([img.width, img.height]);
      page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    }
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  };

  // Ejecuta OCR sobre cada imagen y concatena textos
  const procesarOCR = async (imagenesBase64) => {
    let textoCompleto = '';
    for (const img of imagenesBase64) {
      const { data: { text } } = await Tesseract.recognize(img, 'spa');
      textoCompleto += text + '\n\n';
    }
    return textoCompleto;
  };

  // Sube el archivo PDF a Cloudinary y retorna URL
  const subirPdfACloudinary = async (pdfBytes) => {
    // Configura aquí tu URL de endpoint de Cloudinary y tu preset
    const cloudName = 'diswqpy8v'; // reemplaza con tu cloud name
    const uploadPreset = 'tecweb'; // reemplaza con tu upload preset configurado

    // Crea blob pdf con MIME correcto
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Prepara FormData para subir
    const formData = new FormData();
    formData.append('file', blob);
    formData.append('upload_preset', uploadPreset);

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cloudinary upload error:', errorText);
      throw new Error(`Error subiendo a Cloudinary: ${response.statusText}`);
    }

    const data = await response.json();
    return data.secure_url; // URL HTTPS del archivo subido
  };

  // Finalizar captura: crea PDF, hace OCR, sube a Cloudinary y actualiza URL
  const handleFinalizar = async () => {
    setError(null);
    setLoading(true);
    try {
      if (capturas.length === 0) {
        setError('Debe capturar al menos una imagen');
        setLoading(false);
        return;
      }

      // Crear PDF con capturas
      const pdfBytes = await crearPdfDesdeCapturas(capturas);

      // Procesar OCR (opcional)
      const texto = await procesarOCR(capturas);
      setOcrText(texto);

      // Subir PDF a Cloudinary y obtener URL
      const urlArchivo = await subirPdfACloudinary(pdfBytes);

      // Actualizar campo archivo_url en DocumentForm
      if (onSetArchivoUrl) onSetArchivoUrl(urlArchivo);

      // Callback general que indica que ya subió el archivo y tiene URL
      if (onUploadComplete) onUploadComplete(urlArchivo);

      setLoading(false);
      onClose(); // cerrar modal

    } catch (err) {
      setError(err.message || 'Error inesperado');
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton} aria-label="Cerrar modal">×</button>

        <h2>Escaneo OCR con cámara</h2>

        <Webcam
          audio={false}
          height={300}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={400}
          videoConstraints={videoConstraints}
        />

        <button onClick={capture} style={styles.captureButton}>Capturar página</button>

        <div style={{ marginTop: 10 }}>
          <strong>Páginas capturadas: {capturas.length}</strong>
          <div style={styles.capturasContainer}>
            {capturas.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Captura ${i + 1}`}
                style={styles.thumbnail}
              />
            ))}
          </div>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button
          onClick={handleFinalizar}
          style={{
            ...styles.finalizarButton,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'Finalizar y Subir'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 2000,
  },
  modal: {
    position: 'relative',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '480px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    fontSize: '28px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  },
  captureButton: {
    marginTop: '15px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  capturasContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '10px',
    gap: '8px',
  },
  thumbnail: {
    width: '80px',
    height: 'auto',
    borderRadius: '4px',
    boxShadow: '0 0 5px rgba(0,0,0,0.2)',
  },
  finalizarButton: {
    marginTop: '20px',
    padding: '12px 30px',
    fontSize: '18px',
    backgroundColor: '#4b6e35',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
  }
};

export default OcrScan;
