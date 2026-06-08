import React from 'react'
import { Link } from 'react-router-dom'

const products = [
  { _id: "FUR-CT-001", name: "Modern Walnut Coffee Table", price: 249.99, images: [{ url: "https://picsum.photos/500/500?random=101", altText: "Modern Walnut Coffee Table" }] },
  { _id: "FUR-OC-002", name: "Ergonomic Mesh Office Chair", price: 179.99, images: [{ url: "https://picsum.photos/500/500?random=103", altText: "Ergonomic Mesh Office Chair" }] },
  { _id: "FUR-DT-003", name: "Solid Oak Dining Table", price: 799.99, images: [{ url: "https://picsum.photos/500/500?random=105", altText: "Solid Oak Dining Table" }] },
  { _id: "FUR-TVC-004", name: "Mid-Century TV Console", price: 349.99, images: [{ url: "https://picsum.photos/500/500?random=107", altText: "Mid-Century TV Console" }] },
  { _id: "FUR-AC-005", name: "Velvet Tufted Armchair", price: 299.99, images: [{ url: "https://picsum.photos/500/500?random=109", altText: "Velvet Tufted Armchair" }] },
  { _id: "FUR-SF-006", name: "Convertible Sleeper Sofa", price: 699.99, images: [{ url: "https://picsum.photos/500/500?random=111", altText: "Convertible Sleeper Sofa" }] },
  { _id: "FUR-BS-007", name: "Industrial Bookshelf", price: 199.99, images: [{ url: "https://picsum.photos/500/500?random=113", altText: "Industrial Bookshelf" }] },
  { _id: "FUR-WD-008", name: "Scandinavian Writing Desk", price: 229.99, images: [{ url: "https://picsum.photos/500/500?random=115", altText: "Scandinavian Writing Desk" }] },
  { _id: "FUR-RC-009", name: "Leather Recliner Chair", price: 499.99, images: [{ url: "https://picsum.photos/500/500?random=117", altText: "Leather Recliner Chair" }] },
  { _id: "FUR-WS-010", name: "Floating Wall Shelf Set", price: 89.99, images: [{ url: "https://picsum.photos/500/500?random=119", altText: "Floating Wall Shelf Set" }] },
  { _id: "FUR-NT-011", name: "Glass-Top Nesting Tables", price: 179.99, images: [{ url: "https://picsum.photos/500/500?random=121", altText: "Glass-Top Nesting Tables" }] },
  { _id: "FUR-OT-012", name: "Fabric Storage Ottoman", price: 129.99, images: [{ url: "https://picsum.photos/500/500?random=123", altText: "Fabric Storage Ottoman" }] },
];

const ProductGrid = ({ products: propProducts, loading, error }) => {
  const displayProducts = propProducts?.length > 0 ? propProducts : products;

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error: {error}</p>;
  if (!displayProducts || displayProducts.length === 0) return <p>No products found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayProducts.map((product, index) => (
        <Link key={product._id || index} to={`/product/${product._id}`} className="block">
          <div className="bg-white p-4 rounded-lg">
            <div className="w-full h-96 mb-4">
              <img
                src={product.images?.[0]?.url || "/placeholder.jpg"}
                alt={product.images?.[0]?.altText || product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-sm mb-2">{product.name}</h3>
            <p className="text-gray-500 font-medium text-sm tracking-tighter">
              PHP {product.price?.toLocaleString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;