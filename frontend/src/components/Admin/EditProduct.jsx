import React, { useState } from 'react';

const EditProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    images: [
      { url: "https://picsum.photos/150?random=1" },
      { url: "https://picsum.photos/150?random=2" },
    ],
  });

  const [sizesInput, setSizesInput] = useState("");
  const [colorsInput, setColorsInput] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null); // NEW state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSizesChange = (e) => {
    const value = e.target.value;
    setSizesInput(value);
    setProductData((prevData) => ({
      ...prevData,
      sizes: value.split(",").map((size) => size.trim()).filter(Boolean),
    }));
  };

  const handleColorsChange = (e) => {
    const value = e.target.value;
    setColorsInput(value);
    setProductData((prevData) => ({
      ...prevData,
      colors: value.split(",").map((color) => color.trim()).filter(Boolean),
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
    console.log("Selected file:", file);

    // For now we just simulate a preview update
    const newImageUrl = URL.createObjectURL(file);
    setProductData((prevData) => ({
      ...prevData,
      images: [{ url: newImageUrl }, ...prevData.images.slice(1)],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Product Data:", productData);
    if (uploadedFile) {
      console.log("Uploaded file:", uploadedFile);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md bg-white">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={4}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Count In Stock */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Count In Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* SKU */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Sizes (comma-separated)</label>
          <input
            type="text"
            name="sizes"
            value={sizesInput}
            onChange={handleSizesChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g. S, M, L, XL"
          />
        </div>

        {/* Colors */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Colors (comma-separated)</label>
          <input
            type="text"
            name="colors"
            value={colorsInput}
            onChange={handleColorsChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g. Red, Blue, Green"
          />
        </div>

        {/* Image Upload and Preview */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Update Image</label>
          <input type="file" onChange={handleImageUpload} />
          <div className="flex gap-4 mt-4 flex-wrap">
            {productData.images.map((image, index) => (
              <div key={index} className="w-32 h-32">
                <img
                  src={image.url}
                  alt={image.altText || "Product Image"}
                  className="w-full h-full object-cover border border-gray-300 rounded-md"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
