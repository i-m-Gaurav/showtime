// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// import { Calendar, MapPin, Users, Share2, Heart, Ticket } from "lucide-react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import useShowStore from "@/store/useStore";

// interface Show {
//   id: string;
//   name: string;
//   description: string;
//   location: string;
//   date: string;
//   imageUrl: string;
//   totalSeats: number;
//   availableSeats: number;
// }

// interface Seat {
//   id: string;
//   number: number;
//   status: string;
// }

// export default function ShowDetails({
//   params,
// }: {
//   params: { showId: string };
// }) {
//   const [show, setShow] = useState<Show | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [seats, setSeats] = useState<Seat[]>([]);
//   const { seatsBooked, setSeatsBooked } = useShowStore();
//   const [isLiked, setIsLiked] = useState(false);``

//   const { showId } = params;
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     const fetchShowDetails = async () => {
//       try {
//         const response = await axios.get(`/api/shows/${showId}`);
//         setShow(response.data.data);
//       } catch (error) {
//         setError("Error loading show details");
//         console.error("Error fetching show details:", error);
//       }
//     };

//     const fetchSeatsForEventId = async () => {
//       try {
//         const response = await axios.get("/api/seats?eventId=" + showId);
//         setSeats(response.data.seats);
//       } catch (error) {
//         console.error("Error", error);
//       }
//     };

//     if (showId) {
//       fetchShowDetails();
//       fetchSeatsForEventId();
//     }
//   }, [showId]);

//   const handleBookNowClick = () => {
//     if (status === "unauthenticated" || !session) {
//       alert("Please sign in first!");
//       return;
//     }
//     router.push(`/shows/${showId}/selectSeat`);
//   };

//   const availableSeats = seats.filter((seat) => seat.status === "available").length;
//   const totalSeats = seats.length;

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="p-4 bg-red-50 text-red-500 rounded-lg shadow">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   if (!show) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
//       </div>
//     );
//   }

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
//       <div className="relative">
//         {/* Hero Section */}
//         <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full overflow-hidden">
//           <Image
//             src={show.imageUrl}
//             alt={show.name}
//             fill
//             className="object-cover transform hover:scale-105 transition-transform duration-700"
//             priority
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
          
//           {/* Action Buttons */}
//           <div className="absolute top-4 right-4 flex gap-3">
//             <button 
//               onClick={() => setIsLiked(!isLiked)}
//               className={`p-2 rounded-full transition-all duration-300 ${
//                 isLiked ? 'bg-red-500' : 'bg-white bg-opacity-20 hover:bg-opacity-30'
//               }`}
//             >
//               <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
//             </button>
//             <button className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300">
//               <Share2 className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-32 relative z-10">
//           <div className="bg-white rounded-xl shadow-xl overflow-hidden">
//             <div className="p-4 sm:p-8">
//               {/* Title Section */}
//               <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
//                 <div className="space-y-4 flex-1">
//                   <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{show.name}</h1>
//                   <div className="flex gap-2">
//                     <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
//                       Entertainment
//                     </span>
//                     <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
//                       Live Show
//                     </span>
//                   </div>
//                   <p className="text-sm sm:text-lg text-gray-600 max-w-2xl">{show.description}</p>
//                 </div>

//                 {/* Booking Card */}
//                 <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 w-full sm:w-80">
//                   <div className="space-y-4 sm:space-y-6">
//                     <div className="text-center">
//                       <span className="text-xl sm:text-2xl font-bold text-gray-900">Select Seats</span>
//                     </div>
                    
//                     <div className="flex items-center justify-between py-3 sm:py-4 border-t border-b border-gray-200">
//                       <span className="text-sm sm:text-base text-gray-600">Available Seats</span>
//                       <span className="font-bold text-gray-900">{availableSeats}/{totalSeats}</span>
//                     </div>

//                     <div className="flex flex-col sm:flex-row items-center gap-3">
//                       <input
//                         type="number"
//                         value={seatsBooked}
//                         onChange={(e) => setSeatsBooked(Number(e.target.value))}
//                         className="border border-gray-300 p-2 rounded-lg w-full sm:w-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         min="1"
//                         max={availableSeats}
//                       />
//                       <button
//                         className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 sm:py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                         onClick={handleBookNowClick}
//                         disabled={availableSeats < seatsBooked}
//                       >
//                         <Ticket className="w-4 h-4 sm:w-5 sm:h-5" />
//                         <span>Book Now</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Info Cards */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
//                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-blue-500 transition-colors duration-300">
//                   <div className="flex items-center space-x-3">
//                     <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
//                     <div>
//                       <p className="text-xs sm:text-sm text-gray-500">Date & Time</p>
//                       <p className="text-sm sm:text-base text-gray-900 font-medium">{formatDate(show.date)}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-blue-500 transition-colors duration-300">
//                   <div className="flex items-center space-x-3">
//                     <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
//                     <div>
//                       <p className="text-xs sm:text-sm text-gray-500">Location</p>
//                       <p className="text-sm sm:text-base text-gray-900 font-medium">{show.location}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-blue-500 transition-colors duration-300">
//                   <div className="flex items-center space-x-3">
//                     <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
//                     <div>
//                       <p className="text-xs sm:text-sm text-gray-500">Seating</p>
//                       <p className="text-sm sm:text-base text-gray-900 font-medium">
//                         {availableSeats} available / {totalSeats} total
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Calendar, MapPin, Users, Share2, Heart, Ticket, Minus, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useShowStore from "@/store/useStore";

interface Show {
  id: string;
  name: string;
  description: string;
  location: string;
  date: string;
  imageUrl: string;
  totalSeats: number;
  availableSeats: number;
}

interface Seat {
  id: string;
  number: number;
  status: string;
}

export default function ShowDetails({
  params,
}: {
  params: { showId: string };
}) {
  const [show, setShow] = useState<Show | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const { seatsBooked, setSeatsBooked } = useShowStore();
  const [isLiked, setIsLiked] = useState(false);

  const { showId } = params;
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(`/api/shows/${showId}`);
        setShow(response.data.data);
      } catch (error) {
        setError("Error loading show details");
        console.error("Error fetching show details:", error);
      }
    };

    const fetchSeatsForEventId = async () => {
      try {
        const response = await axios.get("/api/seats?eventId=" + showId);
        setSeats(response.data.seats);
      } catch (error) {
        console.error("Error", error);
      }
    };

    if (showId) {
      fetchShowDetails();
      fetchSeatsForEventId();
    }
  }, [showId]);

  const handleBookNowClick = () => {
    if (status === "unauthenticated" || !session) {
      alert("Please sign in first!");
      return;
    }
    router.push(`/shows/${showId}/selectSeat`);
  };

  const availableSeatsCount = seats.filter((seat) => seat.status === "available").length;
  const totalSeats = seats.length;

  const handleIncrementSeats = () => {
    if (seatsBooked < availableSeatsCount) {
      setSeatsBooked(seatsBooked + 1);
    }
  };

  const handleDecrementSeats = () => {
    if (seatsBooked > 1) {
      setSeatsBooked(seatsBooked - 1);
    }
  };


  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 bg-red-50 text-red-500 rounded-lg shadow">
          {error}
        </div>
      </div>
    );
  }

  if (!show) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="relative">
        {/* Hero Section */}
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full overflow-hidden">
          <Image
            src={show.imageUrl}
            alt={show.name}
            fill
            className="object-cover transform hover:scale-105 transition-transform duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-3">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full transition-all duration-300 ${
                isLiked ? 'bg-red-500' : 'bg-white bg-opacity-20 hover:bg-opacity-30'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-32 relative z-10">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-4 sm:p-8">
              {/* Title Section */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                <div className="space-y-4 flex-1">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{show.name}</h1>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                      Entertainment
                    </span>

                    <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                      Live Show
                    </span>
                  </div>
                  <p className="text-sm sm:text-lg text-gray-600 max-w-2xl">{show.description}</p>
                </div>

                {/* Booking Card */}
                <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200 w-full sm:w-80">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center">
                      <span className="text-xl sm:text-2xl font-bold text-gray-900">Select Seats</span>
                    </div>

                    <div className="flex items-center justify-between py-3 sm:py-4 border-t border-b border-gray-200">
                      <span className="text-sm sm:text-base text-gray-600">Available Seats</span>
                      <span className="font-bold text-gray-900">{availableSeatsCount}/{totalSeats}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <div className="flex items-center space-x-2 w-full sm:w-auto">
                        <button
                          onClick={handleDecrementSeats}
                          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={seatsBooked <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-full text-center border border-gray-300 p-2 rounded-lg">{seatsBooked}</span>
                        <button
                          onClick={handleIncrementSeats}
                          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={seatsBooked >= availableSeatsCount}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 sm:py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleBookNowClick}
                        disabled={availableSeatsCount < seatsBooked || seatsBooked === 0}
                      >
                        <Ticket className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Book Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-blue-500 transition-colors duration-300">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Date & Time</p>
                      <p className="text-sm sm:text-base text-gray-900 font-medium">{formatDate(show.date)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-blue-500 transition-colors duration-300">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Location</p>
                      <p className="text-sm sm:text-base text-gray-900 font-medium">{show.location}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-blue-500 transition-colors duration-300">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Seating</p>
                      <p className="text-sm sm:text-base text-gray-900 font-medium">
                        {availableSeatsCount} available / {totalSeats} total
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}