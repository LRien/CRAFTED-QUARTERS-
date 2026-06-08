import React from 'react'
import Best from '../../assets/pics/Best.jpg'
import Feat from '../../assets/pics/Feature.jpg'
import { Link } from 'react-router-dom'
const FeaturedProducts = () => {
  return (
        <section className="py-16 px-4 lg:px-0">
        <div className="container mx-auto flex flex-col md:flex-row gap-8">
            {/* Best Sellers */}
            <div className="relative flex-1">
            <img
                src={Best}
                alt="Best Seller"
                className="w-full h-[700px] object-cover brightness-50"
            />
            <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Best Sellers</h2>
                <Link to="/collections/best-seller" className='text-gray-900 underline' >Shop Now</Link>
            </div>
            </div>

            {/* Featured Products */}
            <div className="relative flex-1">
            <img
                src={Feat}
                alt="Featured"
                className="w-full h-[700px] object-cover brightness-50"
            />
            <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Featured Products</h2>
                <Link to="/collections/featured" className='text-gray-900 underline' >Shop Now</Link>
            </div>
            </div>
        </div>
        </section>
  )
}

export default FeaturedProducts
