// src/components/accueil/SearchSection.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchSection = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Erreur de chargement des catégories:", err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    
    // --- CORRECTION ICI ---
    // On utilise URLSearchParams qui encode automatiquement les valeurs.
    const params = new URLSearchParams();
    if (query.trim()) {
      params.append('q', query.trim());
    }
    if (category) {
      params.append('category', category);
    }

    // params.toString() va maintenant générer une URL sûre, par exemple :
    // /recherche?category=Musique+%26+Danse
    if (query.trim() || category) {
      navigate(`/recherche?${params.toString()}`);
    }
  };

  const handleReset = () => {
    setQuery('');
    setCategory('');
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto bg-section-bg rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-serif text-center text-gray-800 mb-6">
          Découvrez le patrimoine Marocain
        </h2>
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:flex-1">
             <input type="text" placeholder="Rechercher par mot-clé..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full pl-4 pr-4 py-3 border-none rounded-lg focus:ring-2 focus:ring-button-action" />
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full md:w-auto px-4 py-3 border-none rounded-lg focus:ring-2 focus:ring-button-action">
            <option value="">Toutes les catégories</option>
            {categories.map(cat => <option key={cat.id} value={cat.nom}>{cat.nom}</option>)}
          </select>
          <button type="submit" className="w-full md:w-auto bg-button-action text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
            Rechercher
          </button>
          <button type="button" onClick={handleReset} className="w-full md:w-auto bg-button-search text-gray-800 font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
            Réinitialiser
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchSection;