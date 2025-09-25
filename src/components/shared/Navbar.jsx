// src/components/shared/Navbar.jsx

import React, { useState } from 'react';
import "./Nav-Footer.css"; // Nous gardons le CSS
import { Link } from 'react-router-dom';

function Navbar() {
  // État pour savoir si le menu mobile est ouvert ou fermé
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className='logo-container'>
        <Link to="/" className="logo">ARTCONNECT</Link>
        <Link to="/" className='logo1'>&</Link>
        <Link to="/" className='logo2'>MAROC</Link>
      </div>

      {/* --- MODIFICATION 1 : AJOUT DE CLASSES POUR LE RESPONSIVE --- */}
      {/* La classe 'active' sera ajoutée dynamiquement quand le menu est ouvert */}
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" className='page' onClick={() => setIsMenuOpen(false)}>Accueil</Link></li>
        <li><Link to="/a-propos" className='page' onClick={() => setIsMenuOpen(false)}>À Propos</Link></li>
        <li><Link to="/publier" className='page' onClick={() => setIsMenuOpen(false)}>Publier</Link></li>
        <li><Link to="/favoris" className='page' onClick={() => setIsMenuOpen(false)}>Favoris</Link></li>
        <li><Link to="/admin" className='page' onClick={() => setIsMenuOpen(false)}>Admin</Link></li>
      </ul>

      {/* La barre de recherche reste la même */}
      <div className='searchbar'>
        <input
          type='text'
          placeholder='Rechercher...'
          className="search-input"
        />
        <button
          className="search-btn"
          style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '8px' }}
          aria-label="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
      </div>
    
      <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
    </nav>
  );
};

export default Navbar;