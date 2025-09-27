import React from 'react';

const DetailsModal = ({ oeuvre, onClose }) => {
  // Si aucune oeuvre n'est sélectionnée, on n'affiche rien
  if (!oeuvre) {
    return null;
  }

  return (
    // Le fond semi-transparent (backdrop)
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
    >
      {/* Le contenu de la modale */}
      <div
        onClick={(e) => e.stopPropagation()} // Empêche la fermeture quand on clique sur la modale
        className="bg-white rounded-lg shadow-2xl max-w-3xl w-full flex flex-col md:flex-row overflow-hidden"
      >
        <img src={oeuvre.image} alt={oeuvre.titre} className="w-full md:w-1/2 h-64 md:h-auto object-cover" />
        <div className="p-6 relative flex flex-col">
          {/* Bouton de fermeture */}
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">{oeuvre.titre}</h2>
          <p className="text-sm text-gray-500 mb-4">{`${oeuvre.category} - ${oeuvre.lieu}`}</p>
          <p className="text-gray-700 leading-relaxed">
            {oeuvre.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;