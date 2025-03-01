import { create } from "zustand";

const UseMaterials = create((set) => ({
  materials: [],
  filteredMaterials: [],

  fetchMaterials: async () => {
    try {
      const response = await fetch("/api/materials/get-materials");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched Materials from Backend");
      set({ materials: data, filteredMaterials: data }); // Set both original and filtered data
    } catch (error) {
      console.error("Error fetching materials:", error.message);
    }
  },

  setFilteredMaterials: (filteredMaterials) => {
    set({ filteredMaterials });
  },

  uploadMaterial: async (materialData) => {
    try {
      const response = await fetch("/api/materials/post-material", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(materialData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Material uploaded successfully:", data);

      // Update the materials list after upload
      set((state) => ({
        materials: [...state.materials, data],
        filteredMaterials: [...state.filteredMaterials, data],
      }));

      return { success: true, data };
    } catch (error) {
      console.error("Upload error:", error.message);
      return { success: false, error: error.message };
    }
  },
}));

export default UseMaterials;
