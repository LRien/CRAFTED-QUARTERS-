import React from 'react'
import { IoBagHandleOutline } from "react-icons/io5";
import { GiReturnArrow } from "react-icons/gi";
import { FaRegCircleCheck } from "react-icons/fa6";


const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Feature 1 */}
            <div className="flex flex-col items-center">
            <div className="p-4 rounded-full mb-4">
                <IoBagHandleOutline className="text-xl" />
            </div>
            <h4 className="tracking-tighter mb-2">FREE LOCAL SHIPPING</h4>
            <p className="text-gray-600 text-sm tracking-tighter">
                On all orders over PHP 10000
            </p>
            </div>

            {/* Feature 1 */}
            <div className="flex flex-col items-center">
            <div className="p-4 rounded-full mb-4">
                <GiReturnArrow  className="text-xl" />
            </div>
            <h4 className="tracking-tighter mb-2">45 DAYS RETURN</h4>
            <p className="text-gray-600 text-sm tracking-tighter">
                Money back guarantee
            </p>
            </div>

            {/* Feature 1 */}
            <div className="flex flex-col items-center">
            <div className="p-4 rounded-full mb-4">
                <FaRegCircleCheck  className="text-xl" />
            </div>
            <h4 className="tracking-tighter mb-2">SECURE CHECKOUT</h4>
            <p className="text-gray-600 text-sm tracking-tighter">
                100% Secure Checkouts
            </p>
            </div>
        </div>
    </section>
  )
}

export default FeaturesSection
