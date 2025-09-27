// src/components/apropos/Mission.jsx

import React from 'react';

// Un dictionnaire pour mapper les noms d'icônes du JSON à de vrais composants SVG
const icons = {
  building: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-button-action" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  book: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-button-action" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  diamond: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-button-action" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" /></svg>,
  lightbulb: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-button-action" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
};

const FeatureCard = ({ icon, title }) => (
  <div className="bg-white rounded-lg shadow-md p-6 text-center flex flex-col items-center justify-center space-y-3">
    {icon}
    <h3 className="font-bold text-gray-800">{title}</h3>
  </div>
);

const Mission = ({ data }) => {
  if (!data) return null;

  return (
    <section className="py-20 text-center px-4">
      <h2 className="text-4xl font-serif text-gray-800">{data.titre}</h2>
      <p className="max-w-3xl mx-auto mt-4 text-gray-600">{data.description}</p>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
        {data.features.map(feature => (
          <FeatureCard key={feature.id} title={feature.titre} icon={icons[feature.icon]} />
        ))}
      </div>
    </section>
  );
};

export default Mission;