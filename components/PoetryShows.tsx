'use client'
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Image from 'next/image'
import { useEffect } from 'react';
import Link from 'next/link'
import useFeaturedShowsStore from '@/store/FeaturedShowsStore';

const PoetryShows = () => {

  const {shows, isLoading, fetchShows} = useFeaturedShowsStore();

  useEffect(()=>{
    fetchShows();
  },[fetchShows]);

  if(isLoading){
    return <p className="text-center text-xl text-gray-500">Loading...</p>
  }

  const featuredShows = shows
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Featured Shows</h2>
        <Button 
          variant="ghost" 
          className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
        >
           <Link href = '/shows'>Show All</Link>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {featuredShows.map((show) => (
          <div 
            key={show.id} 
            className="group relative rounded-lg overflow-hidden bg-black cursor-pointer"
          >
            {/* Image container */}
            <div className="aspect-[3/4] relative">
              <Image
                src={show.imageUrl}
                alt={show.name}
                width={400}
                height={500}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>

              {/* Info panel that slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4 transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                <h3 className="text-white font-semibold mb-1">{show.name}</h3>
                <p className="text-gray-300 text-sm mb-2">{show.location}</p>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="w-full bg-white text-black hover:bg-gray-200"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoetryShows;