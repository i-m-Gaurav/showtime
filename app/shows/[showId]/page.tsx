// 'use client'
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Image from 'next/image';
// import { Calendar, MapPin, Users } from 'lucide-react';

// interface Show {
//     id: string;
//     name: string;
//     description: string;
//     location: string;
//     date: string;
//     imageUrl: string;
//     totalSeats: number;
//     availableSeats: number;
// }

// export default  function ShowDetails({ params }: { params: { showId: string } }) {
//     const [show, setShow] = useState<Show | null>(null);
//     const [error, setError] = useState<string | null>(null);
//     const { showId } =  params;

//     useEffect(() => {
//         const fetchShowDetails = async () => {
//             try {
//                 const response = await axios.get(`/api/shows/${showId}`);
//                 setShow(response.data.data);
//             } catch (error) {
//                 setError('Error loading show details');
//                 console.error('Error fetching show details:', error);
//             }
//         };

//         if (showId) {
//             fetchShowDetails();
//         }
//     }, [showId]);

//     if (error) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="p-4 bg-red-50 text-red-500 rounded-lg shadow">
//                     {error}
//                 </div>
//             </div>
//         );
//     }

//     if (!show) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
//             </div>
//         );
//     }

//     const formatDate = (dateString: string) => {
//         return new Date(dateString).toLocaleDateString('en-US', {
//             weekday: 'long',
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         });
//     };

//     return (
//         <div className="max-w-6xl mx-auto p-6">
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//                 <div className="relative h-96 w-full">
//                     <Image
//                         src={show.imageUrl}
//                         alt={show.name}
//                         fill
//                         className="object-cover"
//                         priority
//                     />
//                 </div>
                
//                 <div className="p-8">
//                     <div className="flex justify-between items-start">
//                         <div>
//                             <h1 className="text-4xl font-bold text-gray-900 mb-2">
//                                 {show.name}
//                             </h1>
//                             <p className="text-lg text-gray-600 mb-6">
//                                 {show.description}
//                             </p>
//                         </div>
//                         <button 
//                             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
//                             onClick={() => alert('Booking functionality to be implemented')}
//                         >
//                             Book Now
//                         </button>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//                         <div className="flex items-center space-x-3">
//                             <Calendar className="h-6 w-6 text-blue-600" />
//                             <div>
//                                 <p className="text-sm text-gray-500">Date & Time</p>
//                                 <p className="text-gray-700">{formatDate(show.date)}</p>
//                             </div>
//                         </div>

//                         <div className="flex items-center space-x-3">
//                             <MapPin className="h-6 w-6 text-blue-600" />
//                             <div>
//                                 <p className="text-sm text-gray-500">Location</p>
//                                 <p className="text-gray-700">{show.location}</p>
//                             </div>
//                         </div>

//                         <div className="flex items-center space-x-3">
//                             <Users className="h-6 w-6 text-blue-600" />
//                             <div>
//                                 <p className="text-sm text-gray-500">Seating</p>
//                                 <p className="text-gray-700">
//                                     {show.availableSeats} available / {show.totalSeats} total
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="mt-8 pt-8 border-t border-gray-200">
//                         <div className="bg-gray-50 p-4 rounded-lg">
//                             <div className="flex justify-between items-center">
//                                 <div className="text-gray-600">
//                                     <span className="text-green-600 font-semibold">
//                                         {Math.round((show.availableSeats / show.totalSeats) * 100)}%
//                                     </span> seats still available
//                                 </div>
//                                 <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
//                                     <div 
//                                         className="h-full bg-green-600 rounded-full"
//                                         style={{
//                                             width: `${(show.availableSeats / show.totalSeats) * 100}%`
//                                         }}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }



'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useSession } from 'next-auth/react';

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

export default function ShowDetails({ params }: { params: { showId: string } }) {
    const [show, setShow] = useState<Show | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [seatsBooked, setSeatsBooked] = useState<number>(1);
    const [bookingMessage, setBookingMessage] = useState<string | null>(null);
    
    const { showId } = params;
    const {data : session} = useSession();

    useEffect(() => {
        const fetchShowDetails = async () => {
            try {
                const response = await axios.get(`/api/shows/${showId}`);
                setShow(response.data.data);
            } catch (error) {
                setError('Error loading show details');
                console.error('Error fetching show details:', error);
            }
        };

        if (showId) {
            fetchShowDetails();
        }
    }, []);

    const handleBooking = async () => {
        setBookingMessage(null);
        try {

            const emailId = session?.user?.email;

            const response = await axios.get('/api/user?email=' + emailId);

            const id = response.data.id;

            console.log(emailId);      
            
            await axios.post('/api/bookings', {
                userId : id,
                showId,
                seatsBooked,
            });

            setBookingMessage("Booking successful!");
            setShow((prev) => prev ? { ...prev, availableSeats: prev.availableSeats - seatsBooked } : prev);
        } catch (error) {
            console.error('Error booking show:', error);
            setBookingMessage("Booking failed");
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
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-96 w-full">
                    <Image
                        src={show.imageUrl}
                        alt={show.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                
                <div className="p-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                {show.name}
                            </h1>
                            <p className="text-lg text-gray-600 mb-6">
                                {show.description}
                            </p>
                        </div>
                        <div>
                            <input 
                                type="number" 
                                value={seatsBooked} 
                                onChange={(e) => setSeatsBooked(Number(e.target.value))}
                                className="border p-2 rounded-md w-20 mr-2"
                                min="1"
                                max={show.availableSeats}
                            />
                            <button 
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                                onClick={handleBooking}
                                disabled={show.availableSeats < seatsBooked}
                            >
                                Book Now
                            </button>
                            {bookingMessage && (
                                <p className="mt-2 text-sm text-gray-600">{bookingMessage}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="flex items-center space-x-3">
                            <Calendar className="h-6 w-6 text-blue-600" />
                            <div>
                                <p className="text-sm text-gray-500">Date & Time</p>
                                <p className="text-gray-700">{formatDate(show.date)}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <MapPin className="h-6 w-6 text-blue-600" />
                            <div>
                                <p className="text-sm text-gray-500">Location</p>
                                <p className="text-gray-700">{show.location}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <Users className="h-6 w-6 text-blue-600" />
                            <div>
                                <p className="text-sm text-gray-500">Seating</p>
                                <p className="text-gray-700">
                                    {show.availableSeats} available / {show.totalSeats} total
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
