import React, { useEffect, useState } from "react";

import UseMaterials from "../store/product.store";

const FilterPage = () => {
  const { materials, fetchMaterials } = UseMaterials();
  const [filters, setFilters] = useState({
    isFree: null,
    subject: "",
    materialType: "",
  });
  const [filterClicked,setFilterClicked] = useState(false);
  const HandleFilter = () => {
    setFilterClicked(!filterClicked);
  }
  useEffect(() => {
    console.log("Fetching materials...");
    fetchMaterials();
  }, [fetchMaterials]);

  useEffect(() => {
  }, [materials]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredMaterials = materials.filter((material) => {
    return (
      (filters.isFree === null || material.isFree === (filters.isFree === "true")) &&
      (filters.subject === "" || material.subject === filters.subject) &&
      (filters.materialType === "" || material.materialType === filters.materialType)
    );
  });

  return (
    <div className="fixed left-0 top-16 container  m-auto w-full md:w-1/5 bg-blue-950 md:bg-gray-950 rounded-sm p-2">
      <div className="flex-col  ">
      <button onClick={HandleFilter} className="p-4 border-white border-2 bg-blue-500 text-white px-4 py-2 mb-2 rounded-md max-w-screen" >
      {
        filterClicked? 'apply': 'filter'
      }
      </button>
      {
        filterClicked && <div className="flex flex-col mb-6 p-2 max-w-screen ">
        <label className="mb-4 text-yellow-200">
          Free or Paid:
          <select name="isFree" onChange={handleFilterChange}>
            <option value="" className="bg-black">All</option>
            <option value="true" className="bg-black">Free</option>
            <option value="false" className="bg-black">Paid</option>
          </select>
        </label>
        <label className="mb-4 text-yellow-200">
          Subject:
          <input type="text" name="subject"className="ml-2 bg-white rounded-md" onChange={handleFilterChange} />
        </label>
        <label className="mb-4 text-yellow-200">
          Material Type:
          <select name="materialType" className=" text-white" onChange={handleFilterChange}>
            <option value="" className="bg-black">All</option>
            <option value="pdf" className="bg-black">PDF</option>
            <option value="ebook" className="bg-black">eBook</option>
            <option value="audiobook" className="bg-black">Audiobook</option>
          </select>
        </label>
      </div> 
      }
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {filteredMaterials.map((material) => (
          <MaterialCard key={material._id} material={material} />
        ))}
        {filteredMaterials.length === 0 && "No materials found"}
      </div> */}
    </div>
  );
};

export default FilterPage;