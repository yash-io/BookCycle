import React, { useEffect, useState } from "react";
import UseMaterials from "../store/product.store";

const FilterPage = () => {
  const { materials, fetchMaterials, setFilteredMaterials } = UseMaterials();
  const [clickFilter, setClickFilter] = useState(false);
  const [filters, setFilters] = useState({
    isFree: "",
    name: "",
    materialType: "",
  });

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const changeClick = () => {
    setClickFilter(!clickFilter);
  };

  useEffect(() => {
    const applyFilters = () => {
      const isFreeFilter =
        filters.isFree === "true"
          ? true
          : filters.isFree === "false"
          ? false
          : null;

      const filteredMaterials = materials.filter((material) => {
        return (
          (isFreeFilter === null || material.isFree === isFreeFilter) &&
          (filters.name === "" ||
            material.name.toLowerCase().includes(filters.name.toLowerCase())) &&
          (filters.materialType === "" ||
            material.materialType === filters.materialType)
        );
      });

      setFilteredMaterials(filteredMaterials);
    };

    const timeout = setTimeout(() => {
      applyFilters();
    }, 300);

    return () => clearTimeout(timeout);
  }, [filters, materials, setFilteredMaterials]);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-900 text-white">
      {/* Sticky Filter Section on Mobile */}
      <div className="md:static fixed top-16 left-0 w-full z-40 bg-gray-900 p-4 border-b border-gray-700 md:relative">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          {/* Toggle Filter Button */}
          <h2
            className="text-xl font-semibold mb-4 text-white border-2 border-white rounded-sm px-4 py-2 cursor-pointer w-32 md:w-full text-center"
            onClick={changeClick}
          >
            {clickFilter ? "Apply Filters" : "Open Filters"}
          </h2>

          {/* Filters Section */}
          {clickFilter && (
            <>
              <label className="mb-4 w-full">
                <span className="text-gray-300">Free or Paid:</span>
                <select
                  name="isFree"
                  onChange={handleFilterChange}
                  className="ml-2 bg-gray-700 text-white border border-gray-500 rounded-md p-2 w-full"
                >
                  <option value="">All</option>
                  <option value="true">Free</option>
                  <option value="false">Paid</option>
                </select>
              </label>

              <label className="mb-4 w-full">
                <span className="text-gray-300">Subject:</span>
                <input
                  type="text"
                  name="name"
                  className="ml-2 bg-gray-700 text-white border border-gray-500 rounded-md p-2 w-full"
                  onChange={handleFilterChange}
                  placeholder="Search by name..."
                />
              </label>

              <label className="mb-4 w-full">
                <span className="text-gray-300">Material Type:</span>
                <select
                  name="materialType"
                  onChange={handleFilterChange}
                  className="ml-2 bg-gray-700 text-white border border-gray-500 rounded-md p-2 w-full"
                >
                  <option value="">All</option>
                  <option value="pdf">PDF</option>
                  <option value="ebook">eBook</option>
                  <option value="audiobook">Audiobook</option>
                </select>
              </label>
            </>
          )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto flex-1 p-4 mt-48 md:mt-4">
        {/* You can render the filteredMaterials list here */}
        {/* Example placeholder */}
        <h3 className="text-xl font-bold mb-4">Filtered Materials</h3>
        {materials.length === 0 ? (
          <p className="text-gray-400">No materials found.</p>
        ) : (
          <ul className="space-y-4">
            {materials.map((material) => (
              <li key={material.id} className="p-4 border border-gray-700 rounded-md">
                <p className="text-lg font-semibold">{material.name}</p>
                <p className="text-sm text-gray-400">
                  Type: {material.materialType} | {material.isFree ? "Free" : "Paid"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FilterPage;
