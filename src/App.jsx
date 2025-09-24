// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import des composants partagés
import Navbar from './components/shared/Navbar.jsx';
import Footer from './components/shared/Footer.jsx';

// Import de votre page d'accueil
import Accueil from './pages/Accueil.jsx';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            {/* La route pour votre page d'accueil */}
            <Route path="/" element={<Accueil />} />

            {/* Vous pourrez ajouter les autres routes ici plus tard */}
            {/* <Route path="/a-propos" element={<AboutPage />} /> */}
            {/* <Route path="/favoris" element={<FavoritesPage />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;