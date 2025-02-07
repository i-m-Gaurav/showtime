// "use client";
// import { useEffect, useState } from "react";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { Button } from "@/components/ui/button";
// import axios from "axios";

// // Define the Show interface in a separate file (e.g., types.ts)
// interface Show {
//   id: number;
//   name: string;
//   date: string;
//   location: string;
//   imageUrl: string;
// }

// // Fetch shows data (can be moved to a separate service file)
// const fetchShows = async (): Promise<Show[]> => {
//   try {
//     // const response = await axios.get("/api/shows");
//     const response = await axios.get('/api/shows');
//     const data = await response.data;
//     return data.data;
//   } catch (error) {
//     console.error("Error fetching shows:", error);
//     throw error;
//   }
// };


// // ShowCard component for reusability
// // const ShowCard = ({ show }: { show: Show }) => (
// //   <div className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-white">
// //     <Image
// //       src={show.imageUrl || "/default-image.jpg"}
// //       alt={show.name || "Show image"}
// //       width={400}
// //       height={400}
// //       className="w-full h-48 object-cover"
// //       priority // Optimize loading for above-the-fold images
// //     />
// //     <div className="p-4">
// //       <h2 className="text-xl font-semibold mb-2">
// //         {show.name || "Unnamed Show"}
// //       </h2>
// //       <p className="text-gray-600 mb-2">{show.date || "Date not available"}</p>
// //       <p className="text-gray-500 mb-4">
// //         {show.location || "Location not available"}
// //       </p>
// //       <Link href={`/shows/${show.id}`} passHref>
// //         <Button className="w-full">Book Now</Button>
// //       </Link>
// //     </div>
// //   </div>
// // );

// // Main AllShows component
// const AllShows = () => {
//   const [shows, setShows] = useState<Show[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const loadShows = async () => {
//       try {
//         const data = await fetchShows();
//         setShows(data);
//       } catch (error) {
//         console.error('Error',error)
//         setError("Failed to load shows. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadShows();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="text-center text-xl text-gray-500">
//         <p>Loading...</p>
//         {/* Add a skeleton loader here for better UX */}
//       </div>
//     );
//   }

//   if (error) {
//     return <p className="text-center text-xl text-red-500">{error}</p>;
//   }

//   return (
//     // <div className="container mx-auto px-4 py-8">
//     //   <h1 className="text-3xl font-bold text-center mb-8">All Shows</h1>
//     //   {shows.length > 0 ? (
//     //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//     //       {shows.map((show) => (
//     //         <ShowCard key={show.id} show={show} />
//     //       ))}
//     //     </div>
//     //   ) : (
//     //     <p className="text-center text-xl text-gray-500">No shows available</p>
//     //   )}
//     // </div>
//     <div>
//       <AllShows/>
//     </div>
//   );
// };

// export default AllShows;

import React from 'react'
import AllShows from '@/components/AllShows'

const All = () => {
  return (
    <div>

      <AllShows/>


    </div>
  )
}

export default All