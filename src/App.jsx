import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/shared/Navbar.jsx';
import Footer from './components/shared/Footer.jsx';
import Accueil from './pages/Accueil.jsx';
import Apropos from './pages/Apropos.jsx';
import FavorisPage from './pages/FavorisPage.jsx';

// --- NOUVEAUX IMPORTS ---
import SearchResultsPage from './pages/SearchResultsPage.jsx';
import DetailsPage from './pages/DetailsPage.jsx';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/a-propos" element={<Apropos />} />
            <Route path="/favoris" element={<FavorisPage />} />

            {/* --- NOUVELLES ROUTES --- */}
            <Route path="/recherche" element={<SearchResultsPage />} />
            {/* Route dynamique : :type peut être 'oeuvre' or 'evenement', :id est le numéro */}
            <Route path="/details/:type/:id" element={<DetailsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;