// src/pages/FavorisPage.jsx

import React, { useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext'; // On importe notre contexte

const FavorisPage = () => {
  // On récupère la liste des favoris et la fonction pour les retirer
  const { favorites, removeFavorite } = useGlobalContext();

  // Ce hook de votre collègue active les icônes Lucide
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [favorites]); // On le relance si la liste des favoris change

  return (
    <div className="min-h-screen bg-[#D1C1B2] p-8"> {/* Couleur de fond cohérente */}
      <h1 className="text-4xl font-serif text-center mb-16 mt-12 text-gray-800">
        Vos Favoris
      </h1>

      {/* On vérifie s'il y a des favoris */}
      {favorites.length > 0 ? (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto">
          {/* On itère sur la liste des favoris pour créer les cartes */}
          {favorites.map((fav) => (
            <div key={fav.id} className="flex items-center bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={fav.image} // Image dynamique
                alt={fav.titre} // Texte alt dynamique
                className="w-48 h-32 object-cover"
              />
              <div className="flex-1 px-4 py-3">
                <h2 className="text-lg font-semibold text-gray-900">{fav.titre}</h2>
                <p className="text-sm text-gray-600">{`${fav.category} - ${fav.lieu}`}</p>
              </div>
              {/* Le bouton appelle maintenant la fonction removeFavorite */}
              <button onClick={() => removeFavorite(fav.id)} className="flex items-center gap-2 text-red-500 pr-4 hover:text-red-600">
                <i data-lucide="heart" className="w-5 h-5 fill-red-500"></i>
                <span className="text-sm font-medium">Retirer</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        // Message si la liste est vide
        <p className="text-center text-gray-600 mt-8">
          Vous n'avez pas encore ajouté d'œuvre à vos favoris.
        </p>
      )}
    </div>
  );
};

export default FavorisPage;