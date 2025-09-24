// src/components/accueil/Categories.jsx

import React, { useState, useEffect } from 'react';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Erreur de chargement des catégories:", err));
  }, []);

  return (
    // -- MODIFICATIONS ICI --
    // Fond blanc et espacement vertical pour créer la séparation visuelle.
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl font-serif text-center text-gray-800 mb-12">
          CATÉGORIES
        </h2>
        <div className="flex justify-center flex-wrap gap-4 md:gap-6">
          {categories.map(category => (
            // Style des boutons conforme au design
            <button key={category.id} className="bg-card-bg text-gray-800 font-medium px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
              {category.nom}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;