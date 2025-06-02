import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Asegúrate de importar Navigate
import axios from 'axios';

// Componentes de páginas
import HomePage from './pages/HomePage';
import BiblioPage from './pages/BiblioPage.jsx';
import ContactPage from './pages/ContactPage';
import ForumPage from './pages/ForumPage';
import AboutUsPage from './pages/AboutUsPage';
import MyCollectionPage from './pages/MyCollectionPage';
import BiblioManagerPage from './pages/BiblioManagerPage';
import ForumManagerPage from './pages/ForumManagerPage';
import AddContentPage from './pages/AddContentPage';
import HistoricalEventsManagerPage from './pages/HistoricalEventsManagerPage';

// Componentes generales
import Background3D from './components/Background3D';
import LoadingScreen from './components/LoadingScreen';
import NavBar from './components/NavBar';
import HeaderBar from './components/HeaderBar';
import GraphPage from './pages/GraphPage';
import ColorTheme from './components/ColorTheme.jsx';

// Componentes de administración
import AdminUserPanel from './components/AdminUserPanel.jsx';

// Contextos
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import { ThemeProvider } from './context/ThemeContext';

// Importa el CSS principal de tu aplicación
import './index.css'; // <--- ¡CONFIRMADO: ESTA ES LA LÍNEA CORRECTA PARA TU CASO!


// Componente auxiliar para rutas protegidas
const ProtectedRoute = ({ children, allowedRoles }) => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
        return <Navigate to="/" replace />;
    }
    const user = JSON.parse(storedUser);

    if (allowedRoles && !allowedRoles.includes(user.rol)) {
        alert('Acceso denegado. No tienes el rol necesario para acceder a esta sección.');
        return <Navigate to="/" replace />;
    }

    return children;
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 3000);
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/documents');
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
    fetchData();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <div className="app-container">
          {isLoading && <LoadingScreen />}
          <Background3D />
          <ColorTheme theme="dark" />
          <HeaderBar />
          <NavBar />

          <div className="page-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/biblio" element={<BiblioPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/forum" element={<ForumPage />} />
              <Route path="/aboutus" element={<AboutUsPage />} />
              <Route path="/mycollection" element={<MyCollectionPage />} />
              <Route path="/biblio-manager" element={<BiblioManagerPage />} />
              <Route path="/forum-manager" element={<ForumManagerPage />} />
              <Route path="/add-content" element={<AddContentPage />} />
              <Route path="/historical-events" element={<HistoricalEventsManagerPage />} />
              <Route path="/graph" element={<GraphPage />} />

              <Route path="/admin/users" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                      <AdminUserPanel />
                  </ProtectedRoute>
              } />

              <Route path="*" element={<div>Página no encontrada (404)</div>} />
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}
