'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useShowStore from '@/store/useStore';

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

export default function ShowDetails({ params }: { params: { showId: string } }) {
    const [show, setShow] = useState<Show | null>(null);
    const [error, setError] = useState<string | null>(null);
    // const [seatsBooked, setSeatsBooked] = useState<number>(0);
    const [seats, setSeats] = useState<Seat[]>([]);
    const {seatsBooked,setSeatsBooked} = useShowStore();

    console.log(seatsBooked);

    const { showId } = params;
    const {data : session} = useSession();
    const router = useRouter();

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

        //get all the seats details for a eventId, with status.

        const fetchSeatsForEventId = async () => {
            try {
                const response = await axios.get('/api/seats?eventId=' + showId);
                setSeats(response.data.seats);
            } catch (error) {
                console.error("Error", error);
            }
        }
        fetchSeatsForEventId();

        if (showId) {
            fetchShowDetails();
        }
    }, [showId]);

    // Calculate available seats
    const availableSeats = seats.filter(seat => seat.status === "available").length;

    console.log('available seats are ',availableSeats)
    const totalSeats = seats.length;

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
                                max={availableSeats}
                            />
                            <button 
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                                // onClick={handleBooking}
                                onClick  = {()=> router.push(`/shows/${showId}/selectSeat`)}
                                disabled={availableSeats < seatsBooked}
                            >
                                Book Now
                            </button>
                           
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
                                    {availableSeats} available / {totalSeats} total
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
