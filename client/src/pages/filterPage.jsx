import React, { useEffect, useState } from "react";
import UseMaterials from "../store/product.store";

const FilterPage = () => {
  const { materials, fetchMaterials, setFilteredMaterials } = UseMaterials();
  const [filters, setFilters] = useState({
    isFree: "",
    name: "",
    materialType: "",
  });
  const [filterClicked, setFilterClicked] = useState(false);

  useEffect(() => {
    fetchMaterials(); // Fetch materials only once when the component mounts
  }, []);

  const handleFilterChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    console.log("Applying filters:", filters);
    const isFreeFilter = filters.isFree === "true" ? true : filters.isFree === "false" ? false : null;

    const filteredMaterials = materials.filter((material) => {
      return (
        (isFreeFilter === null || material.isFree === isFreeFilter) &&
        (filters.name === "" || material.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.materialType === "" || material.materialType === filters.materialType)
      );
    });

    console.log("Filtered Materials:", filteredMaterials);
    setFilteredMaterials(filteredMaterials); // Corrected store function
  };

  useEffect(() => {
    applyFilters();
  }, [filters, materials]); // Runs whenever filters or materials change

  return (
    <div className="fixed left-0 top-16 container m-auto w-full md:w-1/5 bg-white rounded-sm p-4 shadow-lg border border-gray-300">
      <div className="flex-col">
        <button onClick={() => setFilterClicked(!filterClicked)} className="p-4 border border-gray-300 bg-blue-500 text-white px-4 py-2 mb-4 rounded-md w-full">
          {filterClicked ? 'Apply Filters' : 'Show Filters'}
        </button>
        {filterClicked && (
          <div className="flex flex-col mb-6 p-2">
            <label className="mb-4 text-gray-700">
              Free or Paid:
              <select name="isFree" onChange={handleFilterChange} className="ml-2 bg-white text-gray-700 border border-gray-300 rounded-md p-2 w-full">
                <option value="">All</option>
                <option value="true">Free</option>
                <option value="false">Paid</option>
              </select>
            </label>
            <label className="mb-4 text-gray-700">
              Subject:
              <input type="text" name="name" className="ml-2 bg-white text-gray-700 border border-gray-300 rounded-md p-2 w-full" onChange={handleFilterChange} />
            </label>
            <label className="mb-4 text-gray-700">
              Material Type:
              <select name="materialType" className="ml-2 bg-white text-gray-700 border border-gray-300 rounded-md p-2 w-full" onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="pdf">PDF</option>
                <option value="ebook">eBook</option>
                <option value="audiobook">Audiobook</option>
              </select>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPage;