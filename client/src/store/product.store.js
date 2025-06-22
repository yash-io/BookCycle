import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_URL;

const UseMaterials = create((set) => ({
  materials: [],
  filteredMaterials: [],

  fetchMaterials: async () => {
    try {
      const response = await fetch(`${API_URL}/api/materials/get-materials`);
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
    const response = await fetch(`${API_URL}/api/materials/post-material`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(materialData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Material uploaded successfully:", data);
      return { success: true, message: data.message || "Material uploaded" };
    } else {
      return { success: false, message: data.message || "Upload failed" };
    }
  } catch (error) {
    console.error("Error uploading material:", error.message);
    return { success: false, message: error.message || "Upload failed" };
  }
},
}));

export default UseMaterials;