import React, { useEffect, useState } from "react";
import MaterialCard from "./materialCard";
import UseMaterials from "../store/product.store";
import FilterPage from "./filterPage";
import Loading from "../components/isLoading";

const MaterialHub = () => {
  const { materials, fetchMaterials, filteredMaterials } = UseMaterials();
  const [isLoading, setIsLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false); // Toggle for mobile

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  useEffect(() => {
    setIsLoading(materials.length === 0);
  }, [materials]);

  return (
    <div className="container m-auto min-h-screen p-6 flex flex-col md:flex-row relative">
      {/* Mobile Filter Button */}
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="md:hidden absolute top-20 left-4 bg-blue-600 text-white px-4 py-2 rounded shadow-lg z-50"
      >
        {showFilter ? "Close Filter" : "Open Filter"}
      </button>

      {/* Sidebar Filter - Normal on Desktop, Overlay on Mobile */}
      <div
  className={`fixed top-0 left-0 w-3/4 sm:w-2/4 h-full bg-gray-900 text-white shadow-lg p-4 transition-transform transform z-40
    ${showFilter ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 md:relative md:w-1/4 lg:w-1/5 md:mr-6 md:h-auto md:p-0 md:z-0`}
>
  <FilterPage />
  </div>


      {/* Main Content */}
      <div className="flex-1">
        {!isLoading ? (
          <>
            <h1 className="text-3xl text-white font-bold text-center mb-6">
              Available Materials
            </h1>
            <div className="overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {filteredMaterials.map((material) => (
                  <MaterialCard key={material._id} material={material} />
                ))}
                {filteredMaterials.length === 0 && "No materials found"}
              </div>
            </div>
          </>
        ) : (
          <Loading message={"Fetching Materials"} />
        )}
      </div>
    </div>
  );
};

export default MaterialHub;
