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
    fetchMaterials(); // Fetch materials only once on mount
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
    }, 300); // Debounce filtering

    return () => clearTimeout(timeout);
  }, [filters, materials, setFilteredMaterials]);

  return (
    <div className="fixed left-0 top-16 container m-auto w-full md:w-1/5 bg-gray-900 text-white rounded-sm p-4 shadow-lg border border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col items-center"> {/* Center content */}
        <h2
          className="text-xl font-semibold mb-4 text-white border-2 border-white rounded-sm px-4 py-2 cursor-pointer w-32 md:w-auto text-center"
          onClick={changeClick}
        >
          {clickFilter ? "Apply" : "Filter"}
        </h2>

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
  );
};

export default FilterPage;
