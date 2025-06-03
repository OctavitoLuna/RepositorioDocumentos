import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function PdfViewer({ fileUrl }) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  if (!fileUrl) return <div>No se ha proporcionado un archivo PDF.</div>;

  return (
    <div style={{ height: '30vw', width: '100%', overflowY: 'auto',   overflowX: 'hidden', }}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl={fileUrl}
          plugins={[defaultLayoutPluginInstance]}
          theme="light"
          scrollMode="vertical" // Scroll vertical para solo una página visible
        />
      </Worker>
    </div>
  );
}
