// src/components/accueil/ArtisanDuMois.jsx

import React, { useState, useEffect } from 'react';

const ArtisanDuMois = () => {
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtisan = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/artisans/1');
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        const data = await response.json();
        setArtisan(data);
      } catch (e) {
        setError(e.message);
        console.error("Fetch Artisan a échoué:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchArtisan();
  }, []);

  if (loading) return <p className="text-center py-20">Chargement de l'artisan du mois...</p>;
  if (error) return <p className="text-center py-20 text-red-600 font-bold">Impossible de charger l'artisan: {error}</p>;
  if (!artisan) return null;

  return (
    <section className="py-20 px-4 md:px-8">
      <h2 className="text-4xl font-serif text-center text-gray-800 mb-12">Artisan du mois.</h2>
      <div className="max-w-4xl mx-auto bg-section-bg rounded-2xl p-8 md:p-12 shadow-lg flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <img src={artisan.image} alt={artisan.nom} className="w-48 h-48 rounded-full object-cover flex-shrink-0 border-4 border-white shadow-md"/>
        <div className="text-center md:text-left">
          <h3 className="text-3xl font-serif font-bold text-gray-900">{artisan.nom}</h3>
          <h4 className="text-lg text-gray-700 mt-1 mb-4">{artisan.titre}</h4>
          <p className="text-gray-800 leading-relaxed">{artisan.description}</p>
        </div>
      </div>
    </section>
  );
};

export default ArtisanDuMois;