import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const FilterSideBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    category: "",
    color: "",
    variation: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 10000,
  });

  const [priceRange, setPriceRange] = useState([0, 10000]);

  const categories = ["Dining Room", "Decor", "Office Furniture", "Living Room"];
  const colors = ["Walnut", "Black", "Natural", "Gray", "Beige", "Oak", "Whitewash", "Teak", "Emerald", "Blush", "Navy", "Brown", "White", "Gold", "Dark Oak", "Rustic Brown"];
  const variation = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = ["Walnut Wood", "Mesh, Steel", "Oak Wood", "MDF, Veneer", "Velvet, Metal", "Polyester, Wood", "Reclaimed Wood, Steel", "MDF, Pine Wood", "Leather, Metal", "MDF", "Glass, Metal", "Fabric, MDF"];
  const brands = ["Oak & Steel", "ComfortForm", "Harvest Home", "ModEdge", "Velure Home", "NestFold", "SteelCraft", "NordWood", "RelaxMax", "FloatSpace", "LuxeEdge", "HavenHome"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      color: params.color || "",
      variation: params.variation ? params.variation.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 10000,
    });
    setPriceRange([0, params.maxPrice || 10000]);
  }, [searchParams]);

  useEffect(() => {
    const newParams = {
      category: filters.category,
      color: filters.color,
      variation: filters.variation.join(','),
      material: filters.material.join(','),
      brand: filters.brand.join(','),
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
    };
    setSearchParams(newParams);
  }, [filters, setSearchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFilters((prev) => {
      const updated = { ...prev };
      if (type === 'radio') {
        updated[name] = value;
      } else if (type === 'checkbox') {
        const list = new Set(prev[name]);
        checked ? list.add(value) : list.delete(value);
        updated[name] = Array.from(list);
      } else if (name === 'priceRange') {
        updated.maxPrice = parseInt(value);
        setPriceRange([0, parseInt(value)]);
      }
      return updated;
    });
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* Color */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Color</label>
        {colors.map((color) => (
          <div key={color} className="flex items-center mb-1">
            <input
              type="radio"
              name="color"
              value={color}
              checked={filters.color === color}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{color}</span>
          </div>
        ))}
      </div>

      {/* Size */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Size</label>
        {variation.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="variation"
              value={size}
              checked={filters.variation.includes(size)}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>

      {/* Material */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Material</label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="material"
              value={material}
              checked={filters.material.includes(material)}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>

      {/* Brand */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Brand</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              checked={filters.brand.includes(brand)}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Price Range</label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={10000}
          value={priceRange[1]}
          onChange={handleFilterChange}
          className="w-full bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600">
          <span>PHP 0</span>
          <span>PHP {priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;