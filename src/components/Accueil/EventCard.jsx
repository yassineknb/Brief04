
import React from 'react';
import { Link } from 'react-router-dom'; // <-- 1. IMPORTER Link

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group transition-transform duration-300 hover:-translate-y-2">
      <img src={event.image} alt={event.titre} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{event.titre}</h3>
        <p className="text-gray-600 text-sm mb-1"><strong>Lieu :</strong> {event.lieu}</p>
        <p className="text-gray-600 text-sm"><strong>Date :</strong> {event.date}</p>
        
        {/* --- 2. MODIFIER LE LIEN --- */}
        <Link to={`/details/evenement/${event.id}`} className="text-right mt-auto pt-4 font-semibold text-gray-800 hover:text-button-action">
          Voir détails
        </Link>
      </div>
    </div>
  );
};

export default EventCard;