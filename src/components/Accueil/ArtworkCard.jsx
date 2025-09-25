// src/components/accueil/ArtworkCard.jsx

import React from 'react';

const ArtworkCard = ({ work }) => {
  const subtitle = `${work.category} - ${work.lieu}`;

  return (
    // -- CHANGEMENT 1 --
    // La carte entière devient un conteneur flex vertical.
    // Cela permet aux éléments à l'intérieur de s'étirer.
    <div className="rounded-lg shadow-md group flex flex-col">
      
      {/* L'image reste la même */}
      <img 
        src={work.image} 
        alt={work.titre} 
        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out rounded-t-lg" 
      />

      {/* -- CHANGEMENT 2 -- */}
      {/* Le bloc de contenu devient aussi un conteneur flex vertical */}
      {/* et 'flex-grow' lui dit de prendre TOUTE la place verticale disponible. */}
      <div className="bg-white p-4 flex flex-col flex-grow rounded-b-lg">
        
        {/* Le titre et le sous-titre */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 truncate">{work.titre}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>

        {/* -- CHANGEMENT 3 (LA SOLUTION) -- */}
        {/* 'mt-auto' (margin-top: auto) est la clé. Il crée une marge automatique */}
        {/* qui pousse ce bloc tout en bas de son conteneur flex. */}
        <div className="flex justify-between items-center text-sm mt-auto pt-4 border-t border-gray-100">
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