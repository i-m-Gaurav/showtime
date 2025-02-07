import React from 'react';
import { Sparkles, Calendar, Users, Ticket } from 'lucide-react';
import Link from 'next/link';

const ListYourShow = () => {
  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-br from-purple-900 to-purple-700 text-white py-16">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/10 blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full bg-purple-400/20 blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left side content */}
          <div className="flex-1 max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-purple-300" />
              <span className="text-purple-300 font-medium">Got a Show to Share?</span>
            </div>

            <h2 className="text-4xl font-bold mb-6">
              List Your Show
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                Reach Thousands!
              </span>
            </h2>

            <p className="text-gray-300 text-lg mb-8">
              Partner with us to showcase your events to thousands of entertainment seekers. Whether it is a concert, play, or any other event, we have got you covered.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <Calendar className="h-6 w-6 text-purple-300 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Any Date</h3>
                  <p className="text-gray-400 text-sm">Host your event on any date that suits you</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="h-6 w-6 text-purple-300 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Any Audience</h3>
                  <p className="text-gray-400 text-sm">Reach any audience, big or small</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Ticket className="h-6 w-6 text-purple-300 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Any Event</h3>
                  <p className="text-gray-400 text-sm">List concerts, plays, or any event</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="https://showtime-blond.vercel.app/"
                className="px-6 py-3  bg-white text-purple-700  hover:bg-purple-400 hover:text-white rounded-full font-medium flex items-center justify-center gap-2 transition-colors"
              >
                List Your Show
              </Link>

             
            </div>
          </div>

          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-400/30 rounded-lg transform rotate-12"></div>
          <div className="absolute top-10 right-10 w-40 h-40 bg-indigo-400/30 rounded-lg transform -rotate-6"></div>
          {/* <div className="absolute top-20 right-20 w-40 h-40 bg-pink-400/30 rounded-lg transform rotate-3"> */}
                {/* <div className="absolute inset-0 flex items-center justify-center">
                  <Ticket className="h-16 w-16 text-white/70" />
                </div> */}
         
        </div>
      </div>
    </div>
  );
};

export default ListYourShow;