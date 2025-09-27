// src/components/apropos/QuiSommesNous.jsx

import React from 'react';

const QuiSommesNous = ({ data }) => {
  if (!data) return null;

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-10 text-center">
        <h2 className="text-4xl font-serif text-gray-800 mb-6">{data.titre}</h2>
        <p className="text-gray-600 leading-relaxed">{data.paragraphe1}</p>
        <p className="text-gray-600 leading-relaxed mt-4">{data.paragraphe2}</p>
      </div>
    </section>
  );
};

export default QuiSommesNous;