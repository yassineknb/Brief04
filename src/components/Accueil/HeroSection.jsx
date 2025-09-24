// src/components/accueil/HeroSection.jsx

import React from 'react';

const HeroSection = () => {
  const heroStyle = { backgroundImage: `url('/images/hero-background.jpg')` };

  return (
    <div className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-center text-white" style={heroStyle}>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 max-w-4xl px-4">
        <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-4">
          Patrimoine Culturel, Héritage Précieux
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Que vous aimiez l'artisanat traditionnel, les classiques intemporels, ou les créations audacieuses contemporaines.
        </p>
        <div className="flex justify-center items-center gap-4">
          <span className="bg-white/90 text-black text-sm font-semibold px-4 py-2 rounded">
            QUALITÉ EXCEPTIONNELLE
          </span>
          <span className="bg-accent-gold text-white text-sm font-semibold px-4 py-2 rounded">
            DESIGN AUTHENTIQUE
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;