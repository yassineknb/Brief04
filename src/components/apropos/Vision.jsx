// src/components/apropos/Vision.jsx

import React from 'react';

const Vision = ({ data }) => {
  if (!data) return null;

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto bg-[#B8860B] text-white rounded-lg p-10 text-center">
        <h2 className="text-4xl font-serif">{data.titre}</h2>
        <p className="mt-4 max-w-3xl mx-auto">{data.description}</p>
      </div>
    </section>
  );
};

export default Vision;