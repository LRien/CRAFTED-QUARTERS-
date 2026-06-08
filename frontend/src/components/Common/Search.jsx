import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setFilters, fetchProductsByFilters} from "../../redux/slices/productSlice"


const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();  

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchTerm }));
    dispatch(fetchProductsByFilters({ search: searchTerm }));
    navigate(`/collections/all?search=${searchTerm}`);
    setIsOpen(false);
  };


  return (
    <div className={`flex items-center justify-center w-full transition-all duration-300 ${
      isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"
    }`}>
      {isOpen ? (
        <form 
        onSubmit={handleSearch}
        className='relative flex items-center justify-center w-full'>
          <div className='relative w-1/2'>
            <input
              type="text"
              placeholder='Search'
              value={searchTerm}
              onChange={handleInputChange}
              className='bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700 p-2'
            />

            {/* Search Icon */}
            <button type="submit" className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'>
                <IoIosSearch className="h-6 w-6" />
            </button>

            
          </div>
            {/* Close Button */}
            <button type="button" 
            onClick={handleSearchToggle}
            className='absolute right-11 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'>
                <IoIosCloseCircle className="h-6 w-6" />
            </button>

        </form>
      ) : (
        <button onClick={handleSearchToggle} className="p-2 rounded hover:bg-gray-300">
          <IoIosSearch className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default Search;
