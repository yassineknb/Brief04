// src/components/shared/Footer.jsx

import React from 'react';
import "./Nav-Footer.css";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="container2">
        <div className="footer-content">
            <div className="footer-section">
                <h3>Réseaux sociaux</h3>
                <div className="social-icons">
                    <div className='icons-media'> <i className="fab fa-facebook"></i><p>Facebook</p></div>
                    <div className='icons-media'> <i className="fab fa-twitter"></i><p>Twitter</p></div>    
                    <div className='icons-media'><i className="fab fa-linkedin"></i><p>Linkedin</p></div>
                    <div className='icons-media'><i className="fab fa-instagram"></i><p>Instagram</p></div>
                </div>
            </div>
             <div className="footer-section">
                <h3>Liens rapides</h3>
                <ul>
                    <li><Link to="/" className='a'>Accueil</Link></li>
                    <li><Link to="/a-propos" className='a'>A propos</Link></li>
                    <li><Link to="/publier" className='a'>Publier</Link></li>
                    <li><Link to="/favoris" className='a'>Favoris</Link></li>
                    {/* --- CORRECTION ICI --- */}
                    <li><Link to="/admin" className='a'>Admin</Link></li>
                </ul>
            </div>
             <div className="footer-section">
                <h3>Support</h3>
                <ul>
                    <li><Link to="/" className='a'>Centre d'aide</Link></li>
                    <li><Link to="/" className='a'>Guide utilisateur</Link></li>
                    <li><Link to="/" className='a'>Contacter le support</Link></li>
                    <li><Link to="/" className='a'>Signaler un problème</Link></li>
                </ul>
            </div>
             <div className="footer-section">
                <h3>Informations de contact</h3>
                <div className='icons-media'><i className="fas fa-map-marker-alt"></i><p>Boulevard Abderrahim, Casablanca.</p></div>
                <div className='icons-media'><i className="fas fa-phone"></i><p>+212 650678910</p></div>
                <div className='icons-media'><i className="fas fa-envelope"></i><p>info@artconnect.com</p></div>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; 2025 ARTCONNECT & MAROC. All rights reserved. | <Link to="/privacy">Privacy Policy</Link> | <Link to="/terms">Terms of Service</Link></p>
        </div>
    </footer>
  );
}