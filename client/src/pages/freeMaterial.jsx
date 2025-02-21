import React, { useEffect } from "react";
import MaterialCard from "./materialCard";
import UseMaterials from "../store/product.store";
import FilterPage from "./filterPage";
const MaterialHub = () => {
  const { materials, fetchMaterials } = UseMaterials();

  useEffect(() => {
    console.log("Fetching materials...");
    fetchMaterials();
  }, [fetchMaterials]);

  useEffect(() => {
    console.log("Materials state updated:", materials);
  }, [materials]);

  return (
    <div className="container m-auto min-h-screen p-6">
      <FilterPage/>
      <h1 className="text-3xl font-bold text-center mb-6">Available Materials</h1>
      <div className=" overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {materials.map((material) => (
            <MaterialCard key={material._id} material={material} />
          ))}
          {materials.length === 0 && "No materials found"}
        </div>
      </div>
    </div>
  );
};

export default MaterialHub;