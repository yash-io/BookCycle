import { create } from "zustand";

const UseMaterials = create((set) => ({
  materials: [],
  setMaterials: (materials) => set({ materials }),
  filterMaterials : (materials) =>set({materials}),

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
      return data;
    } catch (error) {
      console.error("Upload error:", error.message);
      return { success: false, error: error.message };
    }
  },

  fetchMaterials: async () => {
    try {
      const response = await fetch("/api/materials/get-materials");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Materials from Backend:", data);
      set({ materials: data });
    } catch (error) {
      console.error("Error fetching materials:", error.message);
    }
  },
}));

export default UseMaterials;