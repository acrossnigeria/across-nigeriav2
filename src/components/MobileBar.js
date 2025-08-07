import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);


  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };
  const { status,  data: session } = useSession();
  const user = session?.name;
  const handleLogout = () => {
    signOut({ callbackUrl: '/login' }); // Call logout function from UserContext
  };

  return (
    <nav className="bg-gray-800 flex items-center justify-between px-4 py-2 relative mb-1 top-0 w-full z-50">
      {/* Logo */}
      <Link href="/" legacyBehavior>
        <a className="text-white text-xl font-bold">My App</a>
      </Link>

      {/* Search Bar (Optional) */}
      <div className="flex items-center rounded-md overflow-hidden w-auto">
        <input
          className="px-4 py-2 rounded-l-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
          type="search"
          placeholder="Search"
        />
        <button className="flex items-center rounded-r-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {/* Menu Items */}
      <ul className="flex space-x-4 text-white">
        <li>
          <Link href="/" legacyBehavior>
            <a className="hover:text-gray-400">Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about" legacyBehavior>
            <a className="hover:text-gray-400">About</a>
          </Link>
        </li>
        {/* Add more menu items here */}
      </ul>

      {/* User Menu (Conditional) */}
      <div className="flex items-center">
        {user ? (
          <div className="relative">
            <button
              className="inline-flex items-center px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              type="button"
            >
              <span className="mr-1">{user}</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.294 13.293a1 1 0 010 1.414l4 4a1 1 0 01-1.414 1.414L1.414 11.414a1 1 0 010-1.414l4-4a1 1 0 011.414 0zM17.894 5.293a1 1 0 010 1.414l4 4a1 1 0 01-1.414 1.414L13.414 3.414a1 1 0 00-1.414-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              </button>

            <div
              className={`absolute right-0 mt-2 w-56 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${
                isOpen ? 'visible' : 'invisible'
              }`}
            >
              <ul
                className="py-1 divide-y divide-gray-200"
                role="menu"
                aria-labelledby="menu-button"
              >
                <li>
                  <Link href="/profile" legacyBehavior>  
                    <a
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Profile
                    </a>
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout}>
                    <a
                      className="block px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                      role="menuitem"
                    >
                      Logout
                    </a>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link href="/login" legacyBehavior>
            <a
              className="inline-flex items-center px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Login
            </a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;