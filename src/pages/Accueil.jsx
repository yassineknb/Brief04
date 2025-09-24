// src/pages/Accueil.jsx

import React from 'react';
import HeroSection from '../components/Accueil/HeroSection.jsx';
import SearchSection from '../components/Accueil/SearchSection.jsx'; // <-- 1. IMPORTER LE NOUVEAU COMPOSANT
import Evenements from '../components/Accueil/Evenements.jsx';
import Categories from '../components/Accueil/Categories.jsx';
import DernieresOeuvres from '../components/Accueil/DernieresOeuvres.jsx';
import ArtisanDuMois from '../components/Accueil/ArtisanDuMois.jsx';

const Accueil = () => {
  return (
    <div className="bg-background font-sans">
      <HeroSection />
      <main>
        <SearchSection /> {/* <-- 2. PLACER LE COMPOSANT ICI */}
        <Evenements />
        <Categories />
        <DernieresOeuvres />
        <ArtisanDuMois />
      </main>
    </div>
  );
};

export default Accueil;