// src/components/apropos/Cta.jsx

import React from 'react';

const Cta = ({ data }) => {
  if (!data) return null;

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto bg-[#8B4513] text-white rounded-lg p-10 text-center">
        <h2 className="text-4xl font-serif">{data.titre}</h2>
        <p className="mt-4 max-w-3xl mx-auto">{data.description}</p>
        <button className="mt-8 bg-white text-[#8B4513] font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition-colors">
          {data.bouton}
        </button>
      </div>
    </section>
  );
};

export default Cta;