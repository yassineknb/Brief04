// src/components/accueil/Evenements.jsx

import React, { useState, useEffect } from 'react';
import EventCard from '../accueil/EventCard.jsx';

const Evenements = () => {
  const [evenements, setEvenements] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/evenements')
      .then(res => res.json())
      .then(data => setEvenements(data))
      .catch(err => console.error("Erreur de chargement des événements:", err));
  }, []);

  return (
    // -- MODIFICATION ICI --
    // Remplacement de pt-8 par py-16 pour un espacement complet et harmonieux.
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif text-center text-gray-800 mb-12">
          Événements à venir.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {evenements.map(event => <EventCard key={event.id} event={event} />)}
        </div>
      </div>
    </section>
  );
};

export default Evenements;