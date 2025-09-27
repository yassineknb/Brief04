// src/components/accueil/ArtisanDuMois.jsx

import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';

const ArtisanDuMois = () => {
  // On récupère la liste complète des artisans depuis le contexte
  const { artisans, loading } = useGlobalContext();

  // On cherche dans la liste celui qui est "featured"
  const artisan = artisans.find(art => art.featured === true);

  // Si on charge ou si aucun artisan n'est "featured", on n'affiche rien.
  if (loading || !artisan) {
    return null; 
  }

  return (
    <section className="py-20 px-4 md:px-8">
        <h2 className="text-4xl font-serif text-center text-gray-800 mb-12">
          Artisan du mois.
        </h2>
      <div className="max-w-4xl mx-auto bg-section-bg rounded-2xl p-8 md:p-12 shadow-lg flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <img
          src={artisan.image}
          alt={artisan.nom}
          className="w-48 h-48 rounded-full object-cover flex-shrink-0 border-4 border-white shadow-md"
        />
        <div className="text-center md:text-left">
          <h3 className="text-3xl font-serif font-bold text-gray-900">{artisan.nom}</h3>
          {/* Le titre de l'artisan n'existe plus, on peut afficher la spécialité */}
          <h4 className="text-lg text-gray-700 mt-1 mb-4">{artisan.specialite} - {artisan.region}</h4>
          <p className="text-gray-800 leading-relaxed">{artisan.description}</p>
        </div>
      </div>
    </section>
  );
};

export default ArtisanDuMois;