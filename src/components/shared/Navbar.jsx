// src/components/shared/Navbar.jsx

import React, { useState } from 'react';
import "./Nav-Footer.css";
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className='logo-container'>
        <Link to="/" className="logo">ARTCONNECT</Link>
        <Link to="/" className='logo1'>&</Link>
        <Link to="/" className='logo2'>MAROC</Link>
      </div>

      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" className='page' onClick={() => setIsMenuOpen(false)}>Accueil</Link></li>
        <li><Link to="/a-propos" className='page' onClick={() => setIsMenuOpen(false)}>À Propos</Link></li>
        <li><Link to="/publier" className='page' onClick={() => setIsMenuOpen(false)}>Publier</Link></li>
        <li><Link to="/favoris" className='page' onClick={() => setIsMenuOpen(false)}>Favoris</Link></li>
        <li><Link to="/admin" className='page' onClick={() => setIsMenuOpen(false)}>Admin</Link></li>
      </ul>

      {/* --- BLOC DE RECHERCHE SUPPRIMÉ --- */}
      {/* 
        <div className='searchbar'>
          <input type='text' placeholder='Rechercher...' className="search-input" />
          <button className="search-btn" ... >
            <svg ... />
          </button>
        </div> 
      */}
      
      <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
    </nav>
  );
};

export default Navbar;