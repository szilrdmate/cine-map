import React from 'react';

const MovieCard = ({ title, year, location, image, isOpen, onClose }) => {
  const cardStyle = {
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)', // Slide in from the left when isOpen is true
    transition: 'transform 0.3s ease-in-out', // Smooth transition
  };

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 w-64 bg-white h-full shadow-lg" style={cardStyle}>
      <div className="max-w-sm rounded overflow-hidden">
        <img className="w-full" src={image} alt={`Scene from ${title}`} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <h2 className="text-gray-700">{title}</h2>
          <p className="text-gray-700 text-base">Year: {year}</p>
          <p className="text-gray-700 text-base">Location: {location}</p>
        </div>
        <div className="px-6 py-4">
          <button onClick={onClose} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
