import { useEffect, useRef } from 'react';
import LoadingScreen from './LoadingScreen'; // Importamos el componente LoadingScreen

export default function Background3D() {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    const handleMouseMove = (e) => {
      // Aumentamos la sensibilidad multiplicando por un valor mayor
      const x = (e.clientX / window.innerWidth - 0.5) * 130;  // 20 en vez de 2 para mayor sensibilidad
      const y = (e.clientY / window.innerHeight - 0.5) * 130; // 20 en vez de 2 para mayor sensibilidad

      // Aplicamos el aumento de zoom en un 20% (scale(1.25) en lugar de scale(1.05))
      iframe.style.transform = `scale(1.25) translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="background-3d">
      <LoadingScreen /> {/* Aquí está la pantalla de carga */}
      <iframe
        ref={iframeRef}
        src="https://skybox.blockadelabs.com/e/851e0249d6c961d7f4803437fe9e4e32"
        width="100%"
        height="100%"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
          border: 'none',
          transition: 'transform 0.2s ease',
        }}
        allow="fullscreen"
        title="3D Background"
      ></iframe>
    </div>
  );
}
