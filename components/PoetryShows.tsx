'use client'
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ShowCard from './ShowCard';
import { useEffect } from 'react';
import Link from 'next/link'
import Loader from './Loader';
import useFeaturedShowsStore from '@/store/FeaturedShowsStore';

const PoetryShows = () => {

  const {shows, isLoading, fetchShows} = useFeaturedShowsStore();

  useEffect(()=>{
    fetchShows();
  },[fetchShows]);

  if(isLoading){
    return <Loader />
  }

  const featuredShows = shows
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

    return (
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Poetry Shows</h2>
            <Button 
              variant="ghost" 
              className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
            >
               <Link href = '/shows'>Show All</Link>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
         
          {featuredShows.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {featuredShows.map((show) => (
                <ShowCard key={show.id} show={show} />
              ))}
            </div>
          ) : (
            <p className="text-center text-xl text-gray-500">No shows available</p>
          )}
      
    
        </div>
      );
};

export default PoetryShows;