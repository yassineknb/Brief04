// src/components/accueil/ArtworkCard.jsx

import React from 'react';

const ArtworkCard = ({ work }) => {
  // On combine la catégorie et le lieu pour créer le sous-titre
  const subtitle = `${work.category} - ${work.lieu}`;

  return (
    // -- MODIFICATIONS ICI --
    // Fond blanc unique, ombre subtile, et coins arrondis.
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <div className="overflow-hidden">
        <img src={work.image} alt={work.titre} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out" />
      </div>
      <div className="p-4">
        {/* Titre de l'oeuvre */}
        <h3 className="text-lg font-bold text-gray-900 truncate">{work.titre}</h3>
        {/* Sous-titre (Catégorie - Lieu) */}
        <p className="text-sm text-gray-500 mb-4">{subtitle}</p>
        <div className="flex justify-between items-center text-sm">
          <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
            Favoris
          </button>
          <a href="#" className="font-semibold text-gray-800 hover:text-button-action">
            Voir détails
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;