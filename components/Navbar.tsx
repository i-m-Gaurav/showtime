import React from "react";
import { Search, Menu } from "lucide-react";
import SignIn from "@/components/SignIn";
import { auth } from "@/auth";
import Image from "next/image";
import { SignOut } from "@/components/SignOut";
import Link from "next/link";

const Navbar = async () => {
  const session = await auth();
  // if (!session?.user) return null
  // No need to return null if the user is not signed in

  return (
    <nav className="w-full bg-white shadow-md px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-1">
          <span className="text-lg font-bold">book</span>
          <div className="bg-red-500 rounded px-1">
            <span className="text-lg font-bold text-white">my</span>
          </div>
          <span className="text-lg font-bold">show</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for Movies, Events, Plays, Sports and Activities"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-400"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Patna</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {session ? (
            <div className="flex items-center space-x-2">
              <Image
                src={session.user.image || "/default-user.png"}
                alt="user"
                width={50}
                height={50}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium">{session.user.name}</span>
              <SignOut />
            </div>
          ) : (
            <SignIn />
          )}

          <Link href="/admin">Admin</Link>

          <Menu className="h-6 w-6 text-gray-700" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
