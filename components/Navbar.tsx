"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react"; // Import Menu and X icons
import { MapPin } from "lucide-react";
import logo from '../public/logo.png';
import Link from 'next/link';
import { useState } from "react"; // Import useState

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button (Hamburger Icon) */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" /> // Close icon when menu is open
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" /> // Hamburger icon when menu is closed
              )}
            </button>
          </div>

          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Link href = '/'>
                <Image src = {logo} alt = "logo image" width={120} height={120} className="hidden sm:block"/> {/* Hide on mobile, show on larger */}
                <Image src = {logo} alt = "logo image" width={80} height={80} className="block sm:hidden"/>  {/* Show on mobile, hide on larger */}
              </Link>
            </div>
             {/* Location Selector - Move to left on larger screens */}
            <div className="hidden sm:flex items-center space-x-1 text-gray-700">
              <MapPin className="h-5 w-5" />
              <span className="text-sm">Patna</span>
            </div>
          </div>

          {/* Search Bar - Hide on small screens, full width on larger */}
          <div className="hidden sm:block flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                placeholder="Search for Movies, Events, Plays, Sports and Activities"
              />
            </div>
          </div>

          {/* Right Section - Auth and Location on mobile, Auth only on larger */}
          <div className="flex items-center space-x-6">
            {/* Location Selector - Show only on mobile */}
            <div className="sm:hidden flex items-center space-x-1 text-gray-700">
              <MapPin className="h-5 w-5" />
              <span className="text-sm">Patna</span>
            </div>

            {/* Auth Section */}
            {status === "authenticated" ? (
              <div className="flex items-center space-x-4">
                <span className="hidden sm:block text-gray-600 text-sm"> {/* Hide name on mobile */}
                  Hello, {session.user?.name}
                </span>
                <Image
                  src={session.user?.image || "/default-avatar.png"}
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <button
                  onClick={() => signOut()}
                  className="text-white bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="text-white bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-sm"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu (Hidden by default on larger screens) */}
      <div className="sm:hidden" aria-hidden="true" id="mobile-menu" style={{ display: isMobileMenuOpen ? 'block' : 'none' }}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
            <div className="flex items-center space-x-1 text-gray-700">
              <MapPin className="h-5 w-5" />
              <span className="text-sm">Patna</span>
            </div>
          </div>
          <div className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
            <div className="relative">
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                placeholder="Search..."
              />
            </div>
          </div>
          {status === "authenticated" ? (
            <>
              <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Hello, {session.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-red-500 hover:bg-red-600"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-red-500 hover:bg-red-600"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;