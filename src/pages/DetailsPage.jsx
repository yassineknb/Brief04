// src/pages/DetailsPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailsPage = () => {
  const { type, id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const endpoint = type === 'oeuvre' ? 'oeuvres' : 'evenements';
        const response = await fetch(`http://localhost:3001/${endpoint}/${id}`);
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error("Erreur de chargement des détails:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [type, id]);

  if (loading) return <p className="text-center py-20">Chargement...</p>;
  if (!item) return <p className="text-center py-20">Élément non trouvé.</p>;

  return (
    <div className="bg-white min-h-screen py-20">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 px-4">
        <img src={item.image} alt={item.titre} className="w-full md:w-1/2 rounded-lg shadow-lg object-cover" />
        <div>
          <h1 className="text-5xl font-serif font-bold text-gray-900">{item.titre}</h1>
          <p className="text-lg text-gray-500 my-4">{item.lieu}</p>
          {item.description && <p className="text-gray-700 leading-relaxed">{item.description}</p>}
          {item.date && <p className="text-gray-700 leading-relaxed mt-4"><strong>Date:</strong> {item.date}</p>}
        </div>
      </div>
    </div>
  );
};

// --- LA LIGNE MANQUANTE EST ICI ---
export default DetailsPage;