import { useEffect, useRef, useState } from 'react';
import FilterSideBar from '../components/Products/FilterSideBar';
import SortOptions from '../components/Products/SortOptions';
import { FaFilter } from 'react-icons/fa';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';

const products = [
  { _id: "FUR-CT-001", sku: "FUR-CT-001", name: "Modern Walnut Coffee Table", price: 249.99, category: "Living Room", collections: "Modern Living", brand: "Oak & Steel", colors: ["Walnut", "Black", "Natural"], sizes: ["Small", "Medium", "Large"], material: "Walnut Wood", rating: 4.7, numReviews: 18, countInStock: 15, images: [{ url: "https://picsum.photos/500/500?random=101", altText: "Modern Walnut Coffee Table" }] },
  { _id: "FUR-OC-002", sku: "FUR-OC-002", name: "Ergonomic Mesh Office Chair", price: 179.99, category: "Office Furniture", collections: "Work Essentials", brand: "ComfortForm", colors: ["Black", "Gray"], sizes: ["Standard"], material: "Mesh, Steel", rating: 4.6, numReviews: 22, countInStock: 25, images: [{ url: "https://picsum.photos/500/500?random=103", altText: "Ergonomic Mesh Office Chair" }] },
  { _id: "FUR-DT-003", sku: "FUR-DT-003", name: "Solid Oak Dining Table", price: 799.99, category: "Dining Room", collections: "Rustic Charm", brand: "Harvest Home", colors: ["Oak", "Whitewash"], sizes: ["6-Seater", "8-Seater"], material: "Oak Wood", rating: 4.8, numReviews: 30, countInStock: 10, images: [{ url: "https://picsum.photos/500/500?random=105", altText: "Solid Oak Dining Table" }] },
  { _id: "FUR-TVC-004", sku: "FUR-TVC-004", name: "Mid-Century TV Console", price: 349.99, category: "Living Room", collections: "Mid-Century Modern", brand: "ModEdge", colors: ["Walnut", "Teak"], sizes: ["48\"", "60\""], material: "MDF, Veneer", rating: 4.4, numReviews: 14, countInStock: 18, images: [{ url: "https://picsum.photos/500/500?random=107", altText: "Mid-Century TV Console" }] },
  { _id: "FUR-AC-005", sku: "FUR-AC-005", name: "Velvet Tufted Armchair", price: 299.99, category: "Living Room", collections: "Luxe Comfort", brand: "Velure Home", colors: ["Emerald", "Blush", "Navy"], sizes: ["Standard"], material: "Velvet, Metal", rating: 4.5, numReviews: 19, countInStock: 12, images: [{ url: "https://picsum.photos/500/500?random=109", altText: "Velvet Tufted Armchair" }] },
  { _id: "FUR-SF-006", sku: "FUR-SF-006", name: "Convertible Sleeper Sofa", price: 699.99, category: "Living Room", collections: "Smart Living", brand: "NestFold", colors: ["Gray", "Beige"], sizes: ["Full", "Queen"], material: "Polyester, Wood", rating: 4.3, numReviews: 21, countInStock: 8, images: [{ url: "https://picsum.photos/500/500?random=111", altText: "Convertible Sleeper Sofa" }] },
  { _id: "FUR-BS-007", sku: "FUR-BS-007", name: "Industrial Bookshelf", price: 199.99, category: "Office Furniture", collections: "Industrial Loft", brand: "SteelCraft", colors: ["Dark Oak", "Rustic Brown"], sizes: ["5-Tier", "6-Tier"], material: "Reclaimed Wood, Steel", rating: 4.6, numReviews: 16, countInStock: 20, images: [{ url: "https://picsum.photos/500/500?random=113", altText: "Industrial Bookshelf" }] },
  { _id: "FUR-WD-008", sku: "FUR-WD-008", name: "Scandinavian Writing Desk", price: 229.99, category: "Office Furniture", collections: "Scandinavian Simplicity", brand: "NordWood", colors: ["White", "Natural"], sizes: ["Compact", "Standard"], material: "MDF, Pine Wood", rating: 4.2, numReviews: 11, countInStock: 13, images: [{ url: "https://picsum.photos/500/500?random=115", altText: "Scandinavian Writing Desk" }] },
  { _id: "FUR-RC-009", sku: "FUR-RC-009", name: "Leather Recliner Chair", price: 499.99, category: "Living Room", collections: "Classic Comfort", brand: "RelaxMax", colors: ["Brown", "Black"], sizes: ["Standard"], material: "Leather, Metal", rating: 4.7, numReviews: 25, countInStock: 9, images: [{ url: "https://picsum.photos/500/500?random=117", altText: "Leather Recliner Chair" }] },
  { _id: "FUR-WS-010", sku: "FUR-WS-010", name: "Floating Wall Shelf Set", price: 89.99, category: "Decor", collections: "Modern Minimal", brand: "FloatSpace", colors: ["White", "Oak"], sizes: ["Set of 3"], material: "MDF", rating: 4.5, numReviews: 13, countInStock: 30, images: [{ url: "https://picsum.photos/500/500?random=119", altText: "Floating Wall Shelf Set" }] },
  { _id: "FUR-NT-011", sku: "FUR-NT-011", name: "Glass-Top Nesting Tables", price: 179.99, category: "Living Room", collections: "Urban Glam", brand: "LuxeEdge", colors: ["Gold", "Black"], sizes: ["Set of 2", "Set of 3"], material: "Glass, Metal", rating: 4.4, numReviews: 17, countInStock: 14, images: [{ url: "https://picsum.photos/500/500?random=121", altText: "Glass-Top Nesting Tables" }] },
  { _id: "FUR-OT-012", sku: "FUR-OT-012", name: "Fabric Storage Ottoman", price: 129.99, category: "Living Room", collections: "Functional Living", brand: "HavenHome", colors: ["Gray", "Beige"], sizes: ["Medium", "Large"], material: "Fabric, MDF", rating: 4.3, numReviews: 15, countInStock: 22, images: [{ url: "https://picsum.photos/500/500?random=123", altText: "Fabric Storage Ottoman" }] },
];

const Collection = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const sideBarRef = useRef(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const queryParams = Object.fromEntries([...searchParams]);

  const filteredProducts = products.filter((p) => {
    if (collection && p.collections?.toLowerCase().replace(/\s+/g, "-") !== collection.toLowerCase()) return false;
    if (queryParams.category && p.category !== queryParams.category) return false;
    if (queryParams.brand && !p.brand.includes(queryParams.brand)) return false;
    if (queryParams.color && !p.colors.includes(queryParams.color)) return false;
    if (queryParams.material && !p.material.includes(queryParams.material)) return false;
    if (queryParams.minPrice && p.price < Number(queryParams.minPrice)) return false;
    if (queryParams.maxPrice && p.price > Number(queryParams.maxPrice)) return false;
    return true;
  });

  const sortBy = searchParams.get("sortBy");
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "priceAsc") return a.price - b.price;
    if (sortBy === "priceDesc") return b.price - a.price;
    if (sortBy === "popularity") return b.numReviews - a.numReviews;
    return 0;
  });

  const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);

  const handleClickOutside = (e) => {
    if (sideBarRef.current && !sideBarRef.current.contains(e.target)) {
      setIsSideBarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      <button
        onClick={toggleSideBar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" />Filters
      </button>

      <div ref={sideBarRef} className={`${isSideBarOpen ? "translate-x-0" : "-translate-x-full"}
        fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
        <FilterSideBar />
      </div>

      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4 font-medium">All Collection</h2>
        <SortOptions />
        <ProductGrid products={sortedProducts} loading={false} error={null} />
      </div>
    </div>
  );
};

export default Collection;