// src/context/GlobalContext.jsx

import React, { createContext, useContext, useState } from 'react';

// 1. Créer le contexte
const GlobalContext = createContext();

// 2. Créer le "Provider" (fournisseur) qui contiendra l'état et la logique
export const GlobalProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Fonction pour ajouter une oeuvre aux favoris
  const addFavorite = (oeuvre) => {
    // On vérifie qu'elle n'y est pas déjà pour éviter les doublons
    if (!favorites.find(item => item.id === oeuvre.id)) {
      setFavorites(prevFavorites => [...prevFavorites, oeuvre]);
    }
  };

  // Fonction pour retirer une oeuvre des favoris
  const removeFavorite = (oeuvreId) => {
    setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== oeuvreId));
  };

  return (
    <GlobalContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </GlobalContext.Provider>
  );
};

// 3. Créer un "hook" personnalisé pour utiliser facilement le contexte
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};