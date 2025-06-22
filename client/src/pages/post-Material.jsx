import React, { useState } from "react";
import UseMaterials from "../store/product.store";
import imageCompression from 'browser-image-compression'
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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Compression 
    const options = {
      maxSizeMB: 0.1, 
      maxWidthOrHeight: 800, 
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result,
        });
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Image compression error:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      price: formData.isFree ? 0 : Number(formData.price),
    };
    try {
      const response = await uploadMaterial(processedData);
      if (response.success) {
        console.log("Material uploaded successfully");
      } else {
        console.error("Error in uploading material", response);
      }
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
          Post Material
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div className="grid">
            <label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-bold">
              Material Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border rounded outline-none bg-gray-100 dark:bg-gray-700"
              required
            />
          </div>

          {/* Material Type */}
          <div className="grid">
            <label htmlFor="materialType" className="text-gray-700 dark:text-gray-300 font-bold">
              Material Type
            </label>
            <select
              id="materialType"
              name="materialType"
              value={formData.materialType}
              onChange={handleChange}
              className="p-2 border rounded outline-none bg-gray-100 dark:bg-gray-700"
              required
            >
              <option value="pdf">PDF</option>
              <option value="ebook">eBook</option>
              <option value="audiobook">Audiobook</option>
              <option value="other">other</option>

            </select>
          </div>

          {/* Price */}
          <div className="grid">
            <label htmlFor="price" className="text-gray-700 dark:text-gray-300 font-bold">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="p-2 border rounded outline-none bg-gray-100 dark:bg-gray-700"
              required
              disabled={formData.isFree}
            />
          </div>

          {/* College */}
          <div className="grid">
            <label htmlFor="college" className="text-gray-700 dark:text-gray-300 font-bold">
              College
            </label>
            <input
              type="text"
              id="college"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="p-2 border rounded outline-none bg-gray-100 dark:bg-gray-700"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="grid">
            <label htmlFor="image" className="text-gray-700 dark:text-gray-300 font-bold">
              Image
            </label>
            <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="w-full p-2 border rounded outline-none bg-gray-100 dark:bg-gray-700 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Download Link */}
          <div className="grid">
            <label htmlFor="download_link" className="text-gray-700 dark:text-gray-300 font-bold">
              {formData.isFree?'Download link':'Purchase Link'}
            </label>
            <input
              type="url"
              id="download_link"
              name="download_link"
              value={formData.download_link}
              onChange={handleChange}
              className="p-2 border rounded outline-none bg-gray-100 dark:bg-gray-700"
            />
          </div>

          {/* Is Free Checkbox - Full Width */}
          <div className="grid grid-cols-[auto_1fr] items-center gap-2 col-span-1 sm:col-span-2">
            <input
              type="checkbox"
              id="isFree"
              name="isFree"
              checked={formData.isFree}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <label htmlFor="isFree" className="text-gray-700 dark:text-gray-300 font-bold">
              Is this material free?
            </label>
          </div>

          {/* Submit Button - Full Width */}
          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Post Material
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostMaterial;
