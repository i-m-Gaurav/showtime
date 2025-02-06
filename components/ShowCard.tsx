import Image from "next/image";
import Link from "next/link";
import { Button } from '@/components/ui/button';

interface Show {
    id: number;
    name: string;
    date: string;
    location: string;
    imageUrl: string;
}

const ShowCard = ({ show }: { show: Show }) => (
    <div className="group relative rounded-lg overflow-hidden bg-black cursor-pointer">
        {/* Image container */}
        <div className="aspect-[3/4] relative">
            <Image
                src={show.imageUrl || "/default-image.jpg"}
                alt={show.name || "Show image"}
                width={400}
                height={500}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                priority // Optimize loading for above-the-fold images
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>

            {/* Info panel that slides up on hover */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4 transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                <h3 className="text-white font-semibold mb-1">{show.name || "Unnamed Show"}</h3>
                <p className="text-gray-300 text-sm mb-2">{show.location || "Location not available"}</p>
                <Link href={`/shows/${show.id}`} passHref>
                    <Button 
                        variant="secondary" 
                        size="sm" 
                        className="w-full bg-white text-black hover:bg-gray-200"
                    >
                        Book Now
                    </Button>
                </Link>
            </div>
        </div>
    </div>
);

export default ShowCard;