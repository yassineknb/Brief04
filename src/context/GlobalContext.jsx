// src/context/GlobalContext.jsx

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:3001";
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  // --- ÉTATS GLOBAUX POUR TOUTES LES DONNÉES ---
  const [oeuvres, setOeuvres] = useState([]);
  const [evenements, setEvenements] = useState([]);
  const [categories, setCategories] = useState([]);
  const [artisans, setArtisans] = useState([]);
  
  // Initialiser les favoris depuis le localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem('artconnect_favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error("Erreur lors de la lecture des favoris depuis localStorage", error);
      return [];
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Un useEffect pour sauvegarder les favoris à chaque changement
  useEffect(() => {
    try {
      localStorage.setItem('artconnect_favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des favoris dans localStorage", error);
    }
  }, [favorites]);

  // Chargement initial de toutes les données de l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [oeuvresRes, evenementsRes, categoriesRes, artisansRes] = await Promise.all([
          axios.get(`${API_URL}/oeuvres`),
          axios.get(`${API_URL}/evenements`),
          axios.get(`${API_URL}/categories`),
          axios.get(`${API_URL}/artisans`),
        ]);
        setOeuvres(oeuvresRes.data.reverse());
        setEvenements(evenementsRes.data.reverse());
        setCategories(categoriesRes.data);
        setArtisans(artisansRes.data);
      } catch (err) {
        console.error("Erreur lors du chargement des données initiales:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- FONCTIONS DE MODIFICATION DE L'ÉTAT GLOBAL ---
  const addOeuvre = (newOeuvre) => setOeuvres(prev => [newOeuvre, ...prev]);
  const deleteOeuvre = (id) => setOeuvres(prev => prev.filter(item => item.id !== id));
  const updateOeuvre = (updatedOeuvre) => setOeuvres(prev => prev.map(item => item.id === updatedOeuvre.id ? updatedOeuvre : item));
  
  const addEvenement = (newEvent) => setEvenements(prev => [newEvent, ...prev]);
  const deleteEvenement = (id) => setEvenements(prev => prev.filter(item => item.id !== id));

  const addCategory = (newCategory) => setCategories(prev => [...prev, newCategory]);
  const deleteCategory = (id) => setCategories(prev => prev.filter(item => item.id !== id));
  
  const addArtisan = (newArtisan) => setArtisans(prev => [...prev, newArtisan]);
  const deleteArtisan = (id) => setArtisans(prev => prev.filter(item => item.id !== id));
  const updateArtisan = (updatedArtisan) => setArtisans(prev => prev.map(item => item.id === updatedArtisan.id ? updatedArtisan : item));
  
  const setFeaturedArtisan = (artisanId) => {
    setArtisans(prevArtisans => 
      prevArtisans.map(artisan => ({
        ...artisan,
        featured: artisan.id === artisanId
      }))
    );
  };
  
  const addFavorite = (oeuvre) => {
    setFavorites(prev => {
      if (prev.find(item => item.id === oeuvre.id)) {
        return prev;
      }
      return [...prev, oeuvre];
    });
  };
  
  const removeFavorite = (oeuvreId) => {
    setFavorites(prev => prev.filter(item => item.id !== oeuvreId));
  };

  const value = useMemo(() => ({
    oeuvres, addOeuvre, deleteOeuvre, updateOeuvre,
    evenements, addEvenement, deleteEvenement,
    categories, addCategory, deleteCategory,
    artisans, addArtisan, deleteArtisan, updateArtisan, setFeaturedArtisan,
    favorites, addFavorite, removeFavorite,
    loading,
    error
  }), [oeuvres, evenements, categories, artisans, favorites, loading, error]);

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);