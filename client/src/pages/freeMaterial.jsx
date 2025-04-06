import React, { useEffect, useState } from "react"; import MaterialCard from "./materialCard"; import UseMaterials from "../store/product.store"; import FilterPage from "./filterPage"; import Loading from "../components/isLoading";

const MaterialHub = () => { const { materials, fetchMaterials, filteredMaterials } = UseMaterials(); const [isLoading, setIsLoading] = useState(false);

useEffect(() => { fetchMaterials(); }, [fetchMaterials]);

useEffect(() => { setIsLoading(materials.length === 0); }, [materials]);

return ( <div className="container m-auto min-h-screen p-6 flex flex-col md:flex-row"> {/* Sidebar filter (responsive) */} <div className="w-full md:w-1/4 lg:w-1/5 md:mr-6 mb-6 md:mb-0"> <FilterPage /> </div>

{/* Main content */}
  <div className="flex-1">
    {!isLoading ? (
      <>
        <h1 className="text-3xl text-white font-bold text-center mb-6">
          Available Materials
        </h1>
        
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => (
              <MaterialCard key={material._id} material={material} />
            ))}
            {filteredMaterials.length === 0 && "No materials found"}
          </div>
      </>
    ) : (
      <Loading message={"Fetching Materials"} />
    )}
  </div>
</div>

); };

export default MaterialHub;

