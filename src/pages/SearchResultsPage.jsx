// src/pages/SearchResultsPage.jsx

import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ArtworkCard from '../components/Accueil/ArtworkCard';
import EventCard from '../components/accueil/EventCard';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const category = searchParams.get('category');

  const [allData, setAllData] = useState({ oeuvres: [], evenements: [] });
  const [filteredResults, setFilteredResults] = useState({ oeuvres: [], evenements: [] });
  const [loading, setLoading] = useState(true);

  const hasSearchParams = query || category;

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [oeuvresRes, evenementsRes] = await Promise.all([
          fetch('http://localhost:3001/oeuvres'),
          fetch('http://localhost:3001/evenements')
        ]);
        const oeuvresData = await oeuvresRes.json();
        const evenementsData = await evenementsRes.json();
        setAllData({ oeuvres: oeuvresData, evenements: evenementsData });
      } catch (error) {
        console.error("Erreur de récupération des données:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    if (!hasSearchParams) {
      setFilteredResults({ oeuvres: [], evenements: [] });
      return;
    }

    const lowerCaseQuery = query ? query.toLowerCase() : "";

    // --- CORRECTION FINALE DE LA LOGIQUE DE FILTRAGE ---
    const filteredOeuvres = allData.oeuvres.filter(oeuvre => {
      let matchesCategory = true; // Par défaut, on suppose que ça correspond

      // Logique spéciale pour la catégorie "Musique & Danse"
      if (category === "Musique & Danse") {
        matchesCategory = oeuvre.category === "Musique" || oeuvre.category === "Danse";
      } else if (category) {
        // Logique normale pour les autres catégories
        matchesCategory = oeuvre.category === category;
      }
      
      if (!matchesCategory) return false;

      // La logique pour le mot-clé reste la même
      const matchesQuery = lowerCaseQuery
        ? oeuvre.titre.toLowerCase().includes(lowerCaseQuery) ||
          oeuvre.lieu.toLowerCase().includes(lowerCaseQuery)
        : true;

      return matchesQuery;
    });

    const filteredEvenements = allData.evenements.filter(event => {
      if (category || !lowerCaseQuery) return false;
      return event.titre.toLowerCase().includes(lowerCaseQuery) || event.lieu.toLowerCase().includes(lowerCaseQuery);
    });

    setFilteredResults({ oeuvres: filteredOeuvres, evenements: filteredEvenements });

  }, [query, category, allData, hasSearchParams]);

  const totalResults = filteredResults.oeuvres.length + filteredResults.evenements.length;

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-serif text-center text-gray-800 mb-4">
          {hasSearchParams ? `Résultats de recherche` : "Explorer"}
        </h1>
        {loading ? (
          <p className="text-center mt-12">Chargement...</p>
        ) : hasSearchParams ? (
          totalResults > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
              {filteredResults.oeuvres.map(item => <ArtworkCard key={`oeuvre-${item.id}`} work={item} />)}
              {filteredResults.evenements.map(item => <EventCard key={`event-${item.id}`} event={item} />)}
            </div>
          ) : (
            <div className="text-center mt-12">
              <p className="text-gray-600">Aucun résultat trouvé pour votre recherche.</p>
              <Link to="/" className="mt-8 inline-block bg-button-action text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">Retour à l'accueil</Link>
            </div>
          )
        ) : (
          <div className="text-center mt-12">
            <p className="text-gray-600">Veuillez utiliser la barre de recherche sur la page d'accueil pour trouver des œuvres ou des événements.</p>
            <Link to="/" className="mt-8 inline-block bg-button-action text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">Retour à l'accueil</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;