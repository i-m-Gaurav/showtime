"use client";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import useFeaturedShowsStore from "@/store/FeaturedShowsStore";
import ShowCard from "./ShowCard";
import { ChevronRight } from "lucide-react";
import Loader from "./Loader";

const AllShows = () => {
  // const {shows, isLoading, fetchShows} = useFeaturedShowsStore();

  // useEffect(()=>{
  //   fetchShows();
  // },[fetchShows]);

  // if(isLoading){
  //   return <p className="text-center text-xl text-gray-500">Loading...</p>
  // }

  const { shows, isLoading, fetchShows } = useFeaturedShowsStore();

  useEffect(() => {
    fetchShows();
  }, [fetchShows]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">All shows</h2>
      </div>

      {shows.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {shows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">No shows available</p>
      )}
    </div>
  );
};

export default AllShows;
