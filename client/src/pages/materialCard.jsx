import React from "react";

const MaterialCard = ({ material }) => {
  return (
    <div className="bg-gray-900 text-white shadow-lg rounded-lg p-4 transform transition duration-300 hover:scale-105 hover:shadow-xl">
      {/* Material Name */}
      <h2 className="text-lg font-semibold text-white mb-2 truncate">{material.name}</h2>

      {/* Material Type & Price */}
      <p className="text-gray-100 text-sm mb-1">Type: <span className="text-gray-300">{material.materialType}</span></p>
      <p className="text-gray-400 text-sm mb-1">Price: <span className={`font-medium ${material.isFree ? "text-green-400" : "text-red-400"}`}>
        {material.isFree ? "Free" : `$${material.price}`}
      </span></p>

      {/* College Name */}
      <p className="text-gray-100 text-sm mb-3">College: <span className="text-gray-300">{material.college}</span></p>

      {/* Image */}
      <div className="w-full h-48 mb-3 flex justify-center items-center bg-gray-800 rounded-lg overflow-hidden">
        <img src={material.image} alt={material.name} className="w-full h-full object-cover border-2 border-gray-700 rounded-lg" />
      </div>

      {/* Download or Purchase Button */}
      <a
        href={material.download_link}
        className={`block text-center font-semibold py-2 rounded-md transition-colors duration-300 ${
          material.isFree
            ? "bg-green-600 hover:bg-green-500 text-white"
            : "bg-blue-600 hover:bg-blue-500 text-white"
        }`}
      >
        {material.isFree ? "Download" : "Purchase"}
      </a>
    </div>
  );
};

export default MaterialCard;
