// src/components/accueil/DernieresOeuvres.jsx

import React, { useState, useEffect } from 'react';
import ArtworkCard from './ArtworkCard.jsx';

// -- MODIFICATION ICI --
// Le composant ne reçoit plus aucune prop. On retire ({ onVoirDetails })
const DernieresOeuvres = () => {
  const [oeuvres, setOeuvres] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/oeuvres?_limit=5')
      .then(res => res.json())
      .then(data => setOeuvres(data))
      .catch(err => console.error("Erreur de chargement des oeuvres:", err));
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl font-serif text-center text-gray-800 mb-12">
          Dernières Œuvres Ajoutées
        </h2>
        {oeuvres.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* -- MODIFICATION ICI -- */}
            {/* On ne passe plus la prop onVoirDetails à ArtworkCard */}
            {oeuvres.map(work => (
              <ArtworkCard key={work.id} work={work} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">Chargement des œuvres...</p>
        )}
      </div>
    </section>
  );
};

export default DernieresOeuvres;