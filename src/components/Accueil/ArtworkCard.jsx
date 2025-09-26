// src/components/accueil/ArtworkCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext'; // L'import est correct

const ArtworkCard = ({ work }) => {
  const subtitle = `${work.category} - ${work.lieu}`;
  
  // --- CORRECTION DE LA FAUTE DE FRAPPE ICI ---
  // Remplacement de 'useGlobal' par le nom correct 'useGlobalContext'
  const { favorites, addFavorite, removeFavorite } = useGlobalContext();

  const isFavorite = favorites.some(item => item.id === work.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(work.id);
    } else {
      addFavorite(work);
    }
  };

  return (
    <div className="rounded-lg shadow-md group flex flex-col">
      <img 
        src={work.image} 
        alt={work.titre} 
        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out rounded-t-lg" 
      />
      <div className="bg-white p-4 flex flex-col flex-grow rounded-b-lg">
        <div>
          <h3 className="text-lg font-bold text-gray-900 truncate">{work.titre}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        
        <div className="flex justify-between items-center text-sm mt-auto pt-4 mt-4 border-t border-gray-100">
          
          <button onClick={handleFavoriteClick} className={`flex items-center gap-2 transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}>
            {isFavorite ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
            )}
            Favoris
          </button>

          <Link to={`/details/oeuvre/${work.id}`} className="font-semibold text-gray-800 hover:text-button-action">
            Voir détails
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;