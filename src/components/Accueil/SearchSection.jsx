// src/components/accueil/SearchSection.jsx

import React, { useState, useEffect } from 'react';

const SearchSection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Erreur de chargement des catégories:", err));
  }, []);

  return (
    // -- MODIFICATION ICI --
    // Suppression de -mt-16 et z-20. Ajout d'un padding vertical standard (py-16).
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto bg-section-bg rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-serif text-center text-gray-800 mb-6">
          Découvrez le patrimoine Marocain
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></span>
            <input type="text" placeholder="Rechercher par mot-clé..." className="w-full pl-10 pr-4 py-3 border-none rounded-lg focus:ring-2 focus:ring-button-action" />
          </div>
          <select className="w-full md:w-auto px-4 py-3 border-none rounded-lg focus:ring-2 focus:ring-button-action">
            <option value="">Catégorie</option>
            {categories.map(cat => <option key={cat.id} value={cat.nom}>{cat.nom}</option>)}
          </select>
          <button className="w-full md:w-auto bg-button-action text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>Rechercher</button>
          <button className="w-full md:w-auto bg-button-search text-gray-800 font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">Réinitialiser</button>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;