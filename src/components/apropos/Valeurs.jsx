// src/components/apropos/Valeurs.jsx

import React from 'react';

// Le dictionnaire d'icônes pour les valeurs
const icons = {
  heart: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-button-action mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>,
  badge: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-button-action mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
  users: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-button-action mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  globe: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-button-action mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.737 10.737a1.5 1.5 0 012.409 0l3 3a1.5 1.5 0 01-2.121 2.121l-3-3a1.5 1.5 0 01-.288-2.121zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

const ValueCard = ({ icon, title, text }) => (
  <div className="bg-white rounded-lg shadow-md p-6 text-center space-y-3">
    {icon}
    <h3 className="font-bold text-gray-800">{title}</h3>
    <p className="text-sm text-gray-500">{text}</p>
  </div>
);

const Valeurs = ({ data }) => {
  if (!data) return null;

  return (
    <section className="py-16 text-center px-4">
      <h2 className="text-4xl font-serif text-gray-800">{data.titre}</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
        {data.items.map(value => (
          <ValueCard key={value.id} title={value.titre} text={value.description} icon={icons[value.icon]} />
        ))}
      </div>
    </section>
  );
};

export default Valeurs;