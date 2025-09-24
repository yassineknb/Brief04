// src/pages/Accueil.jsx

import React from 'react';
// ... (vos imports)

const Accueil = () => {
  return (
    // -- MODIFICATION ICI --
    // Changement de bg-background à bg-[#EAE0D5] pour une couleur plus claire
    // Ajout de 'space-y-16' sur le <main> pour créer de grands espaces entre les sections
    <div className="bg-[#EAE0D5] font-sans">
      <HeroSection />
      <main className="space-y-16">
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