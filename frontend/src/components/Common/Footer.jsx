import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";




const Footer = () => {
  return (
    <footer className="border-t py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
            <div>
            <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
            <p className="text-gray-500 mb-4">
                Be the first to hear about new products, exclusive events, and online offers.
            </p>
            <p className='font-medium text-sm mb-6 text-gray-700'>Sign up and get 10% off your first order.</p>

            {/* This is the form for newsletter */}
            <form className='flex'>
                <input
                type='email'
                placeholder='Enter your email'
                className='p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-mb
                focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all '/>

                <button type='submit' 
                className='bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all'>
                    Subscribe
                </button>
            </form>
            </div>

            {/* Shop Links */}
            <div>
                <h3 className='text-lg text-gray-800 mb-4 font-medium'>Shop</h3>
                <ul className='space-y-3 text-gray-600'>

                    <li>
                        <Link to="#" className='hover:text-gray-600 transition-colors'>Collections</Link>
                    </li>


                    <li>
                        <Link to="#" className='hover:text-gray-600 transition-colors'>Best Seller</Link>
                    </li>


                    <li>
                        <Link to="#" className='hover:text-gray-600 transition-colors'>Office</Link>
                    </li>


                    <li>
                        <Link to="#" className='hover:text-gray-600 transition-colors'>Kitchen</Link>
                    </li>

                    <li>
                        <Link to="#" className='hover:text-gray-600 transition-colors'>Bedroom</Link>
                    </li>

                </ul>
            </div>

            {/* Supports link */}
            <div>
                <h3 className='text-lg text-gray-800 mb-4 font-medium'>Support</h3>
                <ul className='space-y-3 text-gray-600'>

                    <li>
                        <Link to="#" className='hover:text-gray-600 transition-colors'>Contact Us</Link>
                    </li>


                    <li>
                        <Link to="#" className='hover:text-gray-600 transition-colors'>About Us</Link>
                    </li>


                    <li>
                        <Link to="#" className='hover:text-gray-600 transition-colors'>FAQs</Link>
                    </li>


                    <li>
                        <Link to="#" className='hover:text-gray-600 transition-colors'>Features</Link>
                    </li>

                    <li>
                        <Link to="#" className='hover:text-gray-600 transition-colors'>Bedroom</Link>
                    </li>

                </ul>
            </div>

            {/* Social Media links */}

            <div>

                <h3 className='text-lg text-gray-800 mb-4 font-medium'>Social Media</h3>
                <div className='flex items-center space-x-4 mb-6'>
                    <a href='https://www.facebook.com' target='blank' rel='noopener noreferrer'
                    className='hover:text-gray-300'
                    ><FaFacebook className='h-6 w-6 text-gray-700'/></a>

                    <a href='https://www.instagram.com' target='blank' rel='noopener noreferrer'
                    className='hover:text-gray-300'
                    ><FaInstagram className='h-6 w-6 text-gray-700'/></a>

                    <a href='https://www.X.com' target='blank' rel='noopener noreferrer'
                    className='hover:text-gray-300'
                    ><FaXTwitter className='h-6 w-6 text-gray-700'/></a>

                </div>

                <p className='text-gray-500'>
                    Call Us:
                </p>
                <p className='text-gray-500 mt-2'>
                  <FaPhone className='inline-block mr-2'/>
                  +639458472983  
                </p>
            </div>
        </div>

        {/*Footer Bottom */}

        <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6 text-gray-700 text-center'>
            <p className='text-sm tracking-tighter'>© 2025, Leon Coding, All Rights Reserved</p>
        </div>
    </footer>
  )
}

export default Footer
