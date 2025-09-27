// src/pages/Apropos.jsx

import React, { useState, useEffect } from 'react';
import Mission from '../components/apropos/Mission.jsx';
import Stats from '../components/apropos/Stats.jsx';
import QuiSommesNous from '../components/apropos/QuiSommesNous.jsx';
import Valeurs from '../components/apropos/Valeurs.jsx';
import Vision from '../components/apropos/Vision.jsx';
import Parcours from '../components/apropos/Parcours.jsx';
import Cta from '../components/apropos/Cta.jsx';

const Apropos = () => {
  const [aproposData, setAproposData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/apropos');
        if (!response.ok) throw new Error('Erreur réseau');
        const data = await response.json();
        setAproposData(data);
      } catch (error) {
        console.error("Erreur de chargement:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center py-20">Chargement de la page...</p>;
  if (!aproposData) return <p className="text-center py-20 text-red-500">Impossible de charger les informations.</p>;

  return (
    <div className="bg-background">
      <Mission data={aproposData.mission} />
      <Stats data={aproposData.stats} />
      <QuiSommesNous data={aproposData.quiSommesNous} />
      <Valeurs data={aproposData.valeurs} />
      <Vision data={aproposData.vision} />
      <Parcours data={aproposData.parcours} />
      <Cta data={aproposData.cta} />
    </div>
  );
};

export default Apropos;