import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import des composants partagés
import Navbar from './components/shared/Navbar.jsx';
import Footer from './components/shared/Footer.jsx';

// Import de votre page d'accueil
import FavorisPage from './page/Favoris.jsx';
function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <FavorisPage />
        <Footer />
      </div>
    </Router>
  );
}

export default App;