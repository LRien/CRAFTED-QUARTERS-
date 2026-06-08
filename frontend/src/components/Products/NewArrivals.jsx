import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const products = [
  { sku: "FUR-CT-001", name: "Modern Walnut Coffee Table", price: 249.99, images: [{ url: "https://picsum.photos/500/500?random=101", altText: "Modern Walnut Coffee Table" }] },
  { sku: "FUR-OC-002", name: "Ergonomic Mesh Office Chair", price: 179.99, images: [{ url: "https://picsum.photos/500/500?random=103", altText: "Ergonomic Mesh Office Chair" }] },
  { sku: "FUR-DT-003", name: "Solid Oak Dining Table", price: 799.99, images: [{ url: "https://picsum.photos/500/500?random=105", altText: "Solid Oak Dining Table" }] },
  { sku: "FUR-TVC-004", name: "Mid-Century TV Console", price: 349.99, images: [{ url: "https://picsum.photos/500/500?random=107", altText: "Mid-Century TV Console" }] },
  { sku: "FUR-AC-005", name: "Velvet Tufted Armchair", price: 299.99, images: [{ url: "https://picsum.photos/500/500?random=109", altText: "Velvet Tufted Armchair" }] },
  { sku: "FUR-SF-006", name: "Convertible Sleeper Sofa", price: 699.99, images: [{ url: "https://picsum.photos/500/500?random=111", altText: "Convertible Sleeper Sofa" }] },
  { sku: "FUR-BS-007", name: "Industrial Bookshelf", price: 199.99, images: [{ url: "https://picsum.photos/500/500?random=113", altText: "Industrial Bookshelf" }] },
  { sku: "FUR-WD-008", name: "Scandinavian Writing Desk", price: 229.99, images: [{ url: "https://picsum.photos/500/500?random=115", altText: "Scandinavian Writing Desk" }] },
];

const ITEMS_PER_PAGE = 2;

const NewArrivals = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const currentProducts = products.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - ITEMS_PER_PAGE, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + ITEMS_PER_PAGE >= products.length ? 0 : prev + ITEMS_PER_PAGE
    );
  };

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
        </p>
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`p-2 rounded border bg-white text-black ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <FaChevronLeft className="text-2xl text-gray-700" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded border bg-white text-black"
          >
            <FaChevronRight className="text-2xl text-gray-700" />
          </button>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-2 gap-6 pb-4">
        {currentProducts.map((product, index) => (
          <div key={product.sku || index} className="relative rounded overflow-hidden shadow-lg">
            <img
              src={product.images?.[0]?.url || "/placeholder.jpg"}
              alt={product.images?.[0]?.altText || product.name}
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md text-white p-4">
              <Link to={`/product/${product.sku}`} className="block">
                <h4 className="font-semibold text-lg">{product.name}</h4>
                <p className="mt-1">${product.price?.toLocaleString()}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i * ITEMS_PER_PAGE)}
            className={`w-2.5 h-2.5 rounded-full ${currentIndex === i * ITEMS_PER_PAGE ? "bg-gray-800" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;