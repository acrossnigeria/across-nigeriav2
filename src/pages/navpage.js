// components/Navbar.js
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" legacyBehavior>
          <a className="text-white text-lg font-bold">Your Logo</a>
        </Link>

        {/* Search Bar */}
        <div className="flex-grow md:w-1/4">
          {/* Replace this with your search bar component */}
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Menu Items */}
        <div className="hidden md:flex space-x-4">
          <Link href="/home" legacyBehavior>
            <a className="text-white">Home</a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="text-white">About</a>
          </Link>
          {/* Add more menu items as needed */}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Hidden by default) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-700 p-4 space-y-4">
          <Link href="/home" legacyBehavior>
            <a className="text-white">Home</a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="text-white">About</a>
          </Link>
          {/* Add more mobile menu items as needed */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
