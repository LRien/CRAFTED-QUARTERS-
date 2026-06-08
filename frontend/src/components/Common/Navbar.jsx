import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoBagHandleOutline } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import Search from './Search';
import CartDrawer from '../Layout/CartDrawer';
import { useSelector } from 'react-redux';

const Navbar = () => {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);

    const { cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth); // <-- You forgot this line!

    const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen);
    };

    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <>
            {/* Logo */}
            <nav className='container mx-auto flex items-center justify-between py-4 px-6'>
                <Link to="/" className='text-2xl font-medium'>Crafted Quarters</Link>

                {/* Center Navigation */}
                <div className='hidden md:flex space-x-8'>
                    <Link to="/collections/all" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>Collection</Link>
                    <Link to="#" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>BEDROOM</Link>
                    <Link to="#" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>OFFICE</Link>
                    <Link to="#" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>KITCHEN</Link>
                </div>

                {/* Icons */}
                <div className='flex items-center space-x-4'>
                    {user && user.role === "admin" && (
                        <Link to="/admin" className='block bg-black px-2 rounded text-sm text-white'>Admin</Link>
                    )}

                    <Link to="/profile" className='text-gray-700 hover:text-black'>
                        <FaRegUser className='h-6 w-6' />
                    </Link>

                    {/* Cart Icon */}
                    <button
                        onClick={toggleCartDrawer}
                        className='relative hover:text-black'>
                        <IoBagHandleOutline className='h-6 w-6 text-gray-700' />
                        {cartItemCount > 0 && (
                            <span className='absolute -top-1 right-0 bg-main-red text-white text-xs rounded-full px-2 py-0.5'>
                                {cartItemCount}
                            </span>
                        )}
                    </button>

                    {/* Search Bar */}
                    <div>
                        <Search />
                    </div>

                    <button
                        onClick={toggleNavDrawer}
                        className='md:hidden'>
                        <GiHamburgerMenu className='h-6 w-6 text-gray-700' />
                    </button>
                </div>
            </nav>

            {/* Cart Drawer */}
            <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

            {/* Navigation Menu */}
            <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className='flex justify-end p-4'>
                    <button onClick={toggleNavDrawer}>
                        <IoIosCloseCircle className="h-6 w-6 text-gray-600" />
                    </button>
                </div>

                <div className='p-4'>
                    <h2 className='text-xl font-semibold mb-8'>Menu</h2>
                    <nav className='space-y-4'>
                        <Link to='#' onClick={toggleNavDrawer} className='block text-gray-700 hover:text-black font-medium uppercase mb-4'>Collection</Link>
                        <Link to='#' onClick={toggleNavDrawer} className='block text-gray-700 hover:text-black font-medium uppercase mb-4'>Bedroom</Link>
                        <Link to='#' onClick={toggleNavDrawer} className='block text-gray-700 hover:text-black font-medium uppercase mb-4'>Office</Link>
                        <Link to='#' onClick={toggleNavDrawer} className='block text-gray-700 hover:text-black font-medium uppercase mb-4'>Kitchen</Link>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Navbar;
