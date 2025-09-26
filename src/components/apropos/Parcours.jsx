// src/components/apropos/Parcours.jsx

import React from 'react';

const Parcours = ({ data }) => {
  if (!data) return null;

  // Inverser l'ordre des étapes pour afficher 2026 avant 2025
  const etapesOrdonnees = [...data.etapes].reverse();

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-serif text-gray-800 mb-12">{data.titre}</h2>
        <div className="relative">
          <div className="absolute left-1/2 h-full w-0.5 bg-yellow-500 transform -translate-x-1/2"></div>
          
          {etapesOrdonnees.map((etape, index) => (
            <div key={etape.id} className={`relative mb-8 flex justify-between items-center w-full`}>
              {/* Contenu à Gauche (pour les index pairs: 0, 2, ...) */}
              <div className="w-5/12 text-right pr-8">
                {index % 2 === 0 && (
                  <>
                    <h3 className="font-bold">{etape.titre}</h3>
                    <p className="text-sm text-gray-600">{etape.description}</p>
                  </>
                )}
              </div>
              
              {/* Point central sur la timeline */}
              <div className="z-10 bg-yellow-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold">{etape.annee}</div>
              
              {/* Contenu à Droite (pour les index impairs: 1, 3, ...) */}
              <div className="w-5/12 text-left pl-8">
                {index % 2 !== 0 && (
                  <>
                    <h3 className="font-bold">{etape.titre}</h3>
                    <p className="text-sm text-gray-600">{etape.description}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Parcours;