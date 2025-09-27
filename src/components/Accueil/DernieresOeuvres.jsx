
import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import ArtworkCard from './ArtworkCard.jsx';

const DernieresOeuvres = () => {
  const { oeuvres, loading } = useGlobalContext();

  // On n'affiche rien ou un message de chargement pendant que les données arrivent
  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-4xl font-serif text-center text-gray-800 mb-12">Dernières Œuvres Ajoutées</h2>
          <p className="text-center text-gray-600">Chargement des œuvres...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl font-serif text-center text-gray-800 mb-12">Dernières Œuvres Ajoutées</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {oeuvres.slice(0, 5).map(work => (
            <ArtworkCard key={work.id} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DernieresOeuvres;