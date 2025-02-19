import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className='bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo and Brand */}
          <Link to='/' className='flex items-center space-x-3'>
            <span className='text-2xl'>🏪</span>
            <span className='text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent'>
              Marketplace
            </span>
          </Link>

          {/* Navigation Links */}
          <div className='flex items-center space-x-1'>
            <Link
              to='/'
              className={`px-4 py-2 rounded-lg transition-colors duration-150 ease-in-out ${
                isActiveRoute("/")
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className='flex items-center space-x-2'>
                <span>🏠</span>
                <span>Home</span>
              </div>
            </Link>

            <Link
              to='/orders'
              className={`px-4 py-2 rounded-lg transition-colors duration-150 ease-in-out ${
                isActiveRoute("/orders")
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className='flex items-center space-x-2'>
                <span>📦</span>
                <span>Orders</span>
              </div>
            </Link>

            {/* User Profile - You can add this later */}
            <button className='ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-150 ease-in-out'>
              <span className='text-xl'>👤</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
