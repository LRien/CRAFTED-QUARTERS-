import React, { useState, useEffect } from 'react';
import Hero from '../components/Layout/Hero';
import FeaturedProducts from '../components/Products/FeaturedProducts';
import NewArrivals from '../components/Products/NewArrivals';
import ProductDetails from '../components/Products/ProductDetails';
import ProductGrid from '../components/Products/ProductGrid';
import FeaturedCollection from '../components/Products/FeaturedCollection';
import FeaturesSection from '../components/Products/FeaturesSection';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productSlice';
import axios from 'axios';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        category: 'Office Furniture',
        limit: 8,
      })
    );

    // Fetching the best selling product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch best seller:', error);
      }
    };

    fetchBestSeller();
  }, [dispatch]);

  return (
    <>
      <Hero />
      <FeaturedProducts />
      <NewArrivals />

      {/* BEST SELLER SECTION */}
      <div className="my-12">
        <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
        {bestSellerProduct ? (
          <ProductDetails productId={bestSellerProduct._id} />
        ) : (
          <p className="text-center">Loading best seller product...</p>
        )}
      </div>

      {/* BEDROOM FURNITURES */}
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">Top Bedroom Furnitures</h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </>
  );
};

export default HomePage;
