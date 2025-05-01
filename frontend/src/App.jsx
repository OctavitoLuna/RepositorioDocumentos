import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BiblioPage from './pages/BiblioPage.jsx';
import ContactPage from './pages/ContactPage';
import ForumPage from './pages/ForumPage';
import AboutUsPage from './pages/AboutUsPage';
import MyCollectionPage from './pages/MyCollectionPage';
import BiblioManagerPage from './pages/BiblioManagerPage';
import UserManagerPage from './pages/UserManagerPage';
import ForumManagerPage from './pages/ForumManagerPage';
import AddContentPage from './pages/AddContentPage';
import HistoricalEventsManagerPage from './pages/HistoricalEventsManagerPage';
import Background3D from './components/Background3D';
import LoadingScreen from './components/LoadingScreen';
import NavBar from './components/NavBar';
import HeaderBar from './components/HeaderBar';


export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="app-container">
      {isLoading && <LoadingScreen />}
      <Background3D />
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
          <Route path="/user-manager" element={<UserManagerPage />} />
          <Route path="/forum-manager" element={<ForumManagerPage />} />
          <Route path="/add-content" element={<AddContentPage />} />
          <Route path="/historical-events" element={<HistoricalEventsManagerPage />} />
        </Routes>
      </div>
    </div>
  );
}
