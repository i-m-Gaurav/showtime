"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from 'next/link'

const AllShows = () => {
 

  interface Show {
    id: number;
    name: string;
    date: string;
    location: string;
    imageUrl: string;
  }



  const [shows, setShows] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
        try {
          const response = await axios.get("/api/shows");
          // Access the data property of the response
          setShows(response.data.data);
        } catch (error) {
          console.error("Error fetching shows:", error);
        } finally {
          setIsLoading(false);
        }
      };

    fetchShows();
  }, []);

  if (isLoading) {
    return <p className="text-center text-xl text-gray-500">Loading...</p>;
  }

  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">All Shows</h1>

      {shows.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {shows.map((show) => (
            <div
              key={show.id}
              className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-white"
            >
              <Image
                src={show.imageUrl || "/default-image.jpg"}
                alt={show.name || "Show image"}
                width={400}
                height={400}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {show.name || "Unnamed Show"}
                </h2>
                <p className="text-gray-600 mb-2">
                  {show.date || "Date not available"}
                </p>
                <p className="text-gray-500 mb-4">
                  {show.location || "Location not available"}
                </p>
                <Link href={`/Booking/${show.id}`} passHref>
                  <Button>Book Now</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">No shows available</p>
      )}
    </div>
  );
};

export default AllShows;