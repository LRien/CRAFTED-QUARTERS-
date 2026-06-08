import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";




const Topbar = () => {
  return (
    <div className='bg-main-red text-white'>
        <div className='container mx-auto flex justify-between items-center py-3'>
            <div className='hidden md:flex items-center space-x-4'>
                <a href='#' className='hover:text-gray-300'>
                     <FaFacebook className='h-5 w-5' />
                </a>

                <a href='#' className='hover:text-gray-300'>
                     <FaInstagram className='h-5 w-5' />
                </a>

                <a href='#' className='hover:text-gray-300'>
                     <FaXTwitter className='h-5 w-5' />
                </a>
                
            </div>

            <div className='text-sm text-center'>
                <span>Please Visit Our Store Thankyou</span>
            </div>

            <div className='text-sm'>
                <span>+639458472983</span>
            </div>

        </div>
    </div>
  )
}

export default Topbar
