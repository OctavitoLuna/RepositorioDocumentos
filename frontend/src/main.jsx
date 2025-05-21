import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { BibliotecaProvider } from './context/BibliotecaContext'; // Importa aquí

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <BibliotecaProvider> {/* Aquí */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BibliotecaProvider>
    </ThemeProvider>
  </React.StrictMode>
);
