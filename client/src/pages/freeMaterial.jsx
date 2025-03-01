import React, { useEffect,useState } from "react";
import MaterialCard from "./materialCard";
import UseMaterials from "../store/product.store";
import FilterPage from "./filterPage";
import Loading from "../components/isLoading";
const MaterialHub = () => {
  const { materials, fetchMaterials,filteredMaterials } = UseMaterials();
  const [isLoading,setIsLoading] = useState(false);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  useEffect(() => {
    if(materials.length===0){
      setIsLoading(true);
    }
    else{
      setIsLoading(false);
    }
   // console.log("Materials state updated:", materials);
  }, [materials]);

  return (
    <div className="container m-auto min-h-screen p-6">
     {
      !isLoading ? ( <div><div className="mt-auto absolute z-40 ">
        <FilterPage/>
        </div>
         <h1 className="text-3xl text-white font-bold text-center mb-6">Available Materials</h1>
         <div className=" overflow-y-auto">
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
           {filteredMaterials.map((material) => (
              <MaterialCard key={material._id} material={material} />
            ))}
            {filteredMaterials.length === 0 && "No materials found"}

           </div>
         </div></div> ): (<Loading message={'Fetching Materials '} />)
      
     }
    </div>
  );
};

export default MaterialHub;