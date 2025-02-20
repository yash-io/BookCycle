import React from "react";

const MaterialCard = ({ material }) => {
  return (
    <div className="bg-white opacity-70 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">{material.name}</h2>
      <p className="text-gray-900 mb-2">Type: {material.materialType}</p>
      <p className="text-gray-900 mb-2">Price: ${material.price}</p>
      <p className="text-gray-900 mb-2">College: {material.college}</p>
      <div className="w-full h-48 mb-2 flex justify-center items-center">
        <img src={material.image} alt={material.name} className="max-w-full max-h-full object-contain rounded-lg" />
      </div>
      <a href={material.download_link} className="text-blue-500 hover:underline">
        Download
      </a>
    </div>
  );
};

export default MaterialCard;