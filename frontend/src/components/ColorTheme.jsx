import React from 'react';
import { useTheme } from '../context/ThemeContext';

const themes = {
  none: 'transparent',
  dark: 'rgba(40, 29, 22, 0.7)',
  light: 'rgba(227, 255, 254, 0.1)'
};

export default function ColorTheme() {
  const { theme } = useTheme(); // Aquí fallaba porque no estabas dentro del Provider

  return (
    <div
      style={{
        backgroundColor: themes[theme],
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        transition: 'background-color 0.5s ease'
      }}
    />
  );
}
