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
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const applyFilters = () => {
      const isFreeFilter =
        filters.isFree === "true"
          ? true
          : filters.isFree === "false"
          ? false
          : null;

      const filtered = materials.filter((material) => {
        return (
          (isFreeFilter === null || material.isFree === isFreeFilter) &&
          (filters.name === "" ||
            material.name.toLowerCase().includes(filters.name.toLowerCase())) &&
          (filters.materialType === "" ||
            material.materialType === filters.materialType)
        );
      });

      setFilteredMaterials(filtered);
    };

    const timeout = setTimeout(applyFilters, 300);
    return () => clearTimeout(timeout);
  }, [filters, materials]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-md shadow-md border border-gray-300 dark:border-gray-700 p-4 md:sticky md:top-6 max-h-full overflow-y-auto md:h-[calc(100vh-5rem)]">
      <h2
        className="text-lg font-semibold text-gray-800 dark:text-white mb-4 cursor-pointer md:cursor-default md:mb-6"
        onClick={() => !clickFilter && setClickFilter(true)}
      >
        Filters
      </h2>

      {clickFilter || window.innerWidth >= 768 ? (
        <div className="space-y-6">
          {/* Free or Paid */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Free or Paid
            </label>
            <select
              name="isFree"
              onChange={handleFilterChange}
              className="block w-full rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-2 text-sm text-gray-900 dark:text-white"
            >
              <option value="">All</option>
              <option value="true">Free</option>
              <option value="false">Paid</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleFilterChange}
              className="block w-full rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-2 text-sm text-gray-900 dark:text-white"
              placeholder="Search by name..."
            />
          </div>

          {/* Material Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Material Type
            </label>
            <select
              name="materialType"
              onChange={handleFilterChange}
              className="block w-full rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-2 text-sm text-gray-900 dark:text-white"
            >
              <option value="">All</option>
              <option value="pdf">PDF</option>
              <option value="ebook">eBook</option>
              <option value="audiobook">Audiobook</option>
            </select>
          </div>
        </div>
      ) : (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md w-full mt-4"
          onClick={() => setClickFilter(true)}
        >
          Show Filters
        </button>
      )}
    </div>
  );
};

export default FilterPage;