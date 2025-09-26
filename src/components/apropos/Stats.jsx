// src/components/apropos/Stats.jsx

import React from 'react';

const StatItem = ({ value, label }) => (
  <div className="text-center">
    <p className="text-5xl font-bold text-button-action">{value}</p>
    <p className="text-gray-600 mt-2 uppercase tracking-wider">{label}</p>
  </div>
);

const Stats = ({ data }) => {
  if (!data) return null;

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {data.map(stat => (
          <StatItem key={stat.id} value={stat.valeur} label={stat.label} />
        ))}
      </div>
    </section>
  );
};

export default Stats;