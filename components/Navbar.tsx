"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-xl font-bold text-gray-800">MyApp</div>

        <div className="flex items-center space-x-4">
          {session ? (
            <div className="flex items-center space-x-2">
              <Image
                src={session.user.image || "/default-user.png"}
                height={40}
                width={40}
                className="rounded-full"
                alt="user image"
              />
              <span className="text-gray-800 font-medium">
                Hi, {session?.user?.name}
              </span>
            </div>
          ) : (
            <div>User not logged</div>
          )}

          <button
            onClick={() => signIn()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            User Sign in
          </button>

          <Button variant="outline" className="w-full md:w-auto">
            <Link href={"/signIn"}>Admin Login</Link>
          </Button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
