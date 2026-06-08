import React, { useState } from 'react';
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';
import { useParams } from 'react-router-dom';

const products = [
  { _id: "FUR-CT-001", name: "Modern Walnut Coffee Table", price: 249.99, originalPrice: 299.99, category: "Living Room", collections: "Modern Living", brand: "Oak & Steel", colors: ["Walnut", "Black", "Natural"], sizes: ["Small", "Medium", "Large"], material: "Walnut Wood", rating: 4.7, numReviews: 18, countInStock: 15, description: "A sleek and modern coffee table made from solid walnut wood. Features a minimalist design with rounded edges and a durable matte finish.", images: [{ url: "https://picsum.photos/500/500?random=101", altText: "Modern Walnut Coffee Table Front View" }, { url: "https://picsum.photos/500/500?random=102", altText: "Modern Walnut Coffee Table Side View" }] },
  { _id: "FUR-OC-002", name: "Ergonomic Mesh Office Chair", price: 179.99, originalPrice: 219.99, category: "Office Furniture", collections: "Work Essentials", brand: "ComfortForm", colors: ["Black", "Gray"], sizes: ["Standard"], material: "Mesh, Steel", rating: 4.6, numReviews: 22, countInStock: 25, description: "Designed for maximum comfort and support during long work hours. Features adjustable height, lumbar support, and breathable mesh backrest.", images: [{ url: "https://picsum.photos/500/500?random=103", altText: "Ergonomic Mesh Office Chair Front" }, { url: "https://picsum.photos/500/500?random=104", altText: "Ergonomic Mesh Office Chair Side" }] },
  { _id: "FUR-DT-003", name: "Solid Oak Dining Table", price: 799.99, originalPrice: 899.99, category: "Dining Room", collections: "Rustic Charm", brand: "Harvest Home", colors: ["Oak", "Whitewash"], sizes: ["6-Seater", "8-Seater"], material: "Oak Wood", rating: 4.8, numReviews: 30, countInStock: 10, description: "This farmhouse-inspired dining table is crafted from solid oak wood, offering durability and timeless style. Seats up to 6 people comfortably.", images: [{ url: "https://picsum.photos/500/500?random=105", altText: "Solid Oak Dining Table Top View" }, { url: "https://picsum.photos/500/500?random=106", altText: "Solid Oak Dining Table Full View" }] },
  { _id: "FUR-TVC-004", name: "Mid-Century TV Console", price: 349.99, originalPrice: 399.99, category: "Living Room", collections: "Mid-Century Modern", brand: "ModEdge", colors: ["Walnut", "Teak"], sizes: ["48\"", "60\""], material: "MDF, Veneer", rating: 4.4, numReviews: 14, countInStock: 18, description: "A retro-inspired TV stand with clean lines and angled legs. Offers two storage cabinets and an open shelf for media devices.", images: [{ url: "https://picsum.photos/500/500?random=107", altText: "Mid-Century TV Console Front View" }, { url: "https://picsum.photos/500/500?random=108", altText: "Mid-Century TV Console Side View" }] },
  { _id: "FUR-AC-005", name: "Velvet Tufted Armchair", price: 299.99, originalPrice: 349.99, category: "Living Room", collections: "Luxe Comfort", brand: "Velure Home", colors: ["Emerald", "Blush", "Navy"], sizes: ["Standard"], material: "Velvet, Metal", rating: 4.5, numReviews: 19, countInStock: 12, description: "A luxurious velvet armchair with deep button tufting and brass legs. Adds a touch of elegance to any space.", images: [{ url: "https://picsum.photos/500/500?random=109", altText: "Velvet Tufted Armchair Front View" }, { url: "https://picsum.photos/500/500?random=110", altText: "Velvet Tufted Armchair Detail" }] },
  { _id: "FUR-SF-006", name: "Convertible Sleeper Sofa", price: 699.99, originalPrice: 799.99, category: "Living Room", collections: "Smart Living", brand: "NestFold", colors: ["Gray", "Beige"], sizes: ["Full", "Queen"], material: "Polyester, Wood", rating: 4.3, numReviews: 21, countInStock: 8, description: "This versatile sofa easily converts into a bed for overnight guests. Upholstered in durable fabric with under-seat storage.", images: [{ url: "https://picsum.photos/500/500?random=111", altText: "Convertible Sleeper Sofa Mode" }, { url: "https://picsum.photos/500/500?random=112", altText: "Convertible Sleeper Sofa Bed Mode" }] },
  { _id: "FUR-BS-007", name: "Industrial Bookshelf", price: 199.99, originalPrice: 239.99, category: "Office Furniture", collections: "Industrial Loft", brand: "SteelCraft", colors: ["Dark Oak", "Rustic Brown"], sizes: ["5-Tier", "6-Tier"], material: "Reclaimed Wood, Steel", rating: 4.6, numReviews: 16, countInStock: 20, description: "Open-concept bookshelf with metal frame and reclaimed wood shelves. Perfect for loft-style interiors or modern workspaces.", images: [{ url: "https://picsum.photos/500/500?random=113", altText: "Industrial Bookshelf Full View" }, { url: "https://picsum.photos/500/500?random=114", altText: "Industrial Bookshelf Close-up" }] },
  { _id: "FUR-WD-008", name: "Scandinavian Writing Desk", price: 229.99, originalPrice: 269.99, category: "Office Furniture", collections: "Scandinavian Simplicity", brand: "NordWood", colors: ["White", "Natural"], sizes: ["Compact", "Standard"], material: "MDF, Pine Wood", rating: 4.2, numReviews: 11, countInStock: 13, description: "Minimalist writing desk with a smooth white finish and natural wood legs. Includes two small drawers for storage.", images: [{ url: "https://picsum.photos/500/500?random=115", altText: "Scandinavian Writing Desk Front View" }, { url: "https://picsum.photos/500/500?random=116", altText: "Scandinavian Writing Desk Angle View" }] },
  { _id: "FUR-RC-009", name: "Leather Recliner Chair", price: 499.99, originalPrice: 569.99, category: "Living Room", collections: "Classic Comfort", brand: "RelaxMax", colors: ["Brown", "Black"], sizes: ["Standard"], material: "Leather, Metal", rating: 4.7, numReviews: 25, countInStock: 9, description: "A comfortable recliner wrapped in genuine leather with a smooth reclining mechanism and built-in footrest.", images: [{ url: "https://picsum.photos/500/500?random=117", altText: "Leather Recliner Chair Upright" }, { url: "https://picsum.photos/500/500?random=118", altText: "Leather Recliner Chair Reclined" }] },
  { _id: "FUR-WS-010", name: "Floating Wall Shelf Set", price: 89.99, originalPrice: 109.99, category: "Decor", collections: "Modern Minimal", brand: "FloatSpace", colors: ["White", "Oak"], sizes: ["Set of 3"], material: "MDF", rating: 4.5, numReviews: 13, countInStock: 30, description: "Set of 3 floating wall shelves with invisible brackets. Great for displaying books, plants, or décor.", images: [{ url: "https://picsum.photos/500/500?random=119", altText: "Floating Wall Shelf Set with Decor" }, { url: "https://picsum.photos/500/500?random=120", altText: "Empty Floating Wall Shelf Set" }] },
  { _id: "FUR-NT-011", name: "Glass-Top Nesting Tables", price: 179.99, originalPrice: 209.99, category: "Living Room", collections: "Urban Glam", brand: "LuxeEdge", colors: ["Gold", "Black"], sizes: ["Set of 2", "Set of 3"], material: "Glass, Metal", rating: 4.4, numReviews: 17, countInStock: 14, description: "Elegant nesting table set with tempered glass tops and golden metal frames. Space-saving and stylish.", images: [{ url: "https://picsum.photos/500/500?random=121", altText: "Glass-Top Nesting Tables Full Set" }, { url: "https://picsum.photos/500/500?random=122", altText: "Glass-Top Nesting Tables Close-up" }] },
  { _id: "FUR-OT-012", name: "Fabric Storage Ottoman", price: 129.99, originalPrice: 159.99, category: "Living Room", collections: "Functional Living", brand: "HavenHome", colors: ["Gray", "Beige"], sizes: ["Medium", "Large"], material: "Fabric, MDF", rating: 4.3, numReviews: 15, countInStock: 22, description: "Multi-functional ottoman that doubles as a storage box. Upholstered in textured fabric with a padded top.", images: [{ url: "https://picsum.photos/500/500?random=123", altText: "Fabric Storage Ottoman Closed" }, { url: "https://picsum.photos/500/500?random=124", altText: "Fabric Storage Ottoman Opened" }] },
];

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const productFetchId = productId || id;

  const selectedProduct = products.find((p) => p._id === productFetchId);
  const similarProducts = products.filter((p) => p._id !== productFetchId && p.category === selectedProduct?.category).slice(0, 4);

  const [mainImage, setMainImage] = useState(selectedProduct?.images?.[0]?.url || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const isButtonDisabled = !selectedSize || !selectedColor || isAddingToCart;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color before adding to cart.", { duration: 2000 });
      return;
    }
    setIsAddingToCart(true);
    setTimeout(() => {
      toast.success("Product has been added to cart", { duration: 1000 });
      setIsAddingToCart(false);
    }, 600);
  };

  if (!selectedProduct) return <p className="text-center text-red-500">Product not found.</p>;

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">

          {/* Left Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images?.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="md:w-1/2">
            <img
              src={mainImage}
              alt="main product"
              className="w-full h-auto object-cover rounded-lg mb-4"
            />
          </div>

          {/* Mobile Thumbnails */}
          <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
            {selectedProduct.images?.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">{selectedProduct.name}</h1>
            <p className="text-lg text-gray-600 mb-1 line-through">
              {selectedProduct.originalPrice && `PHP ${selectedProduct.originalPrice.toLocaleString()}`}
            </p>
            <p className="text-xl text-gray-500 mb-2">PHP {selectedProduct.price?.toLocaleString()}</p>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

            {/* Color */}
            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors?.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full border-2 ${selectedColor === color ? "border-black" : "border-gray-400"}`}
                    style={{ backgroundColor: color.toLowerCase(), filter: "brightness(0.85)" }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {selectedProduct.sizes?.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border rounded transition-all duration-200 ${selectedSize === size ? "bg-black text-white border-black" : "bg-white text-black border-gray-400"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-gray-700">Quantity</p>
              <div className="flex items-center space-x-4 mt-2">
                <button onClick={decrementQuantity} className="px-2 py-1 bg-gray-200 rounded text-lg">-</button>
                <span className="min-w-[20px] text-center">{quantity}</span>
                <button onClick={incrementQuantity} className="px-2 py-1 bg-gray-200 rounded text-lg">+</button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`py-2 px-6 rounded w-full mb-4 transition-all duration-200 ${isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white"}`}
            >
              {isAddingToCart ? "Adding..." : "Add to Cart"}
            </button>

            {/* Characteristics */}
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">You May Also Like</h2>
          <ProductGrid products={similarProducts} loading={false} error={null} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;