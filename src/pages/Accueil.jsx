// src/pages/Accueil.jsx

import React from 'react';

// --- LES IMPORTS MANQUANTS SONT ICI ---
// On doit dire à React où trouver chaque composant que nous utilisons.
import HeroSection from '../components/accueil/HeroSection.jsx';
import SearchSection from '../components/Accueil/SearchSection.jsx';
import Evenements from '../components/Accueil/Evenements.jsx';
import Categories from '../components/Accueil/Categories.jsx';
import DernieresOeuvres from '../components/Accueil/DernieresOeuvres.jsx';
import ArtisanDuMois from '../components/accueil/ArtisanDuMois.jsx';
// ------------------------------------

const Accueil = () => {
  return (
    <div className="bg-background font-sans">
      <HeroSection />
      <main>
        <SearchSection />
        <Evenements />
        <Categories />
        <DernieresOeuvres />
        <ArtisanDuMois />
      </main>
    </div>
  );
};

export default Accueil;