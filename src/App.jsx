// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import des composants partagés
import Navbar from './components/shared/Navbar.jsx';
import Footer from './components/shared/Footer.jsx';

// Import de toutes vos pages
import Accueil from './pages/Accueil.jsx';
import Apropos from './pages/Apropos.jsx';
import FavorisPage from './pages/FavorisPage.jsx';
import PublierPage from './pages/PublierPage.jsx';
import SearchResultsPage from './pages/SearchResultsPage.jsx';
import DetailsPage from './pages/DetailsPage.jsx';
import AdminPage from './pages/AdminPage.jsx';

function App() {
  return (
    <Router>
      {/* --- CORRECTION ICI --- */}
      {/* On utilise les styles complets pour créer un layout "sticky footer" */}
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        
        {/* 'flex: 1' dit à la section 'main' de prendre toute la place verticale disponible */}
        <main style={{ flex: '1' }}>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/a-propos" element={<Apropos />} />
            <Route path="/favoris" element={<FavorisPage />} />
            <Route path="/publier" element={<PublierPage />} />
            <Route path="/recherche" element={<SearchResultsPage />} />
            <Route path="/details/:type/:id" element={<DetailsPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;