import React, { useState } from "react";
import UseMaterials from "../store/product.store";

const PostMaterial = () => {
  const [formData, setFormData] = useState({
    name: "",
    materialType: "pdf",
    price: 0,
    college: "",
    image: "",
    download_link: "",
    isFree: false,
  });

  const { uploadMaterial } = UseMaterials();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const processedData = {
        ...formData,
        price: formData.isFree ? 0 : Number(formData.price),
      };
    
      console.log("Submitting:", processedData); // Debugging step
    
      try {
        const response = await uploadMaterial(processedData);
    
        if (response.success==true) {
          console.log("Material uploaded successfully");
        } else {
          console.error("Error in uploading material", response);
        }
      } catch (error) {
        console.error("Upload failed", error);
      }
    };
    


  return (
    <div className="min-h-screen bg-gray-900 fixed top-0 sticky flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Post Material</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Material Name
            </label>
            <div className="flex items-center border border-gray-300 rounded p-2">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 outline-none"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="materialType" className="block text-gray-700 font-bold mb-2">
              Material Type
            </label>
            <div className="flex items-center border border-gray-300 rounded p-2">
              <select
                id="materialType"
                name="materialType"
                value={formData.materialType}
                onChange={handleChange}
                className="w-full p-2 outline-none"
                required
              >
                <option value="pdf">PDF</option>
                <option value="ebook">eBook</option>
                <option value="audiobook">Audiobook</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
              Price
            </label>
            <div className="flex items-center border border-gray-300 rounded p-2">
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 outline-none"
                required
                disabled={formData.isFree}
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="college" className="block text-gray-700 font-bold mb-2">
              College
            </label>
            <div className="flex items-center border border-gray-300 rounded p-2">
              <input
                type="text"
                id="college"
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="w-full p-2 outline-none"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
              Image
            </label>
            <div className="flex items-center border border-gray-300 rounded p-2">
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="w-full p-2 outline-none"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="download_link" className="block text-gray-700 font-bold mb-2">
              Download Link
            </label>
            <div className="flex items-center border border-gray-300 rounded p-2">
              <input
                type="url"
                id="download_link"
                name="download_link"
                value={formData.download_link}
                onChange={handleChange}
                className="w-full p-2 outline-none"
              />
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="isFree"
              name="isFree"
              checked={formData.isFree}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="isFree" className="text-gray-700 font-bold">
              Is this material free?
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Post Material
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostMaterial;