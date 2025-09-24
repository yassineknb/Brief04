// src/components/shared/Navbar.jsx

import React from 'react';
import "./Nav-Footer.css"; // On importe le CSS
import { Link } from 'react-router-dom';

function Navbar () {
  return (
    <nav className="navbar">
        <div className='logo-container'>
          <Link to="/" className="logo">ARTCONNECT</Link>
          <Link to="/" className='logo1'>&</Link>
          <Link to="/" className='logo2'>MAROC</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/" className='page'>Accueil</Link></li>
          <li><Link to="/a-propos" className='page'>À Propos</Link></li>
          <li><Link to="/publier" className='page'>Publier</Link></li>
          <li><Link to="/favoris" className='page'>Favoris</Link></li>
          <li><Link to="/admin" className='page'>Admin</Link></li>
        </ul>
        <div className='searchbar'>
          <input type='text' placeholder='Rechercher...' className="search-input" />
          <button className="search-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '8px' }} aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
        </div>
    </nav>
  );
};

export default Navbar;