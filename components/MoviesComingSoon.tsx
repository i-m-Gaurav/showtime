import React from 'react';
import { Film, Calendar, Bell, Timer } from 'lucide-react';

const MoviesComingSoon = () => {
  return (
    <div className="w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left side content */}
          <div className="flex-1 max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <Film className="h-6 w-6 text-purple-400" />
              <span className="text-purple-400 font-medium">New Feature Alert</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-6">
              Movie Tickets
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Coming Soon!
              </span>
            </h2>
            
            <p className="text-gray-300 text-lg mb-8">
              Get ready for the ultimate movie experience! Soon you will be able to book tickets for the latest blockbusters, indie gems, and everything in between.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <Calendar className="h-6 w-6 text-purple-400 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Advance Booking</h3>
                  <p className="text-gray-400 text-sm">Book your tickets up to 2 weeks in advance</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Timer className="h-6 w-6 text-purple-400 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Quick Booking</h3>
                  <p className="text-gray-400 text-sm">Book your tickets in less than 2 minutes</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                <Bell className="h-5 w-5" />
                Notify Me When Live
              </button>
              
              <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Right side animated illustration */}
          <div className="relative w-full md:w-96 h-96">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Rotating circles animation */}
              <div className="absolute w-72 h-72 border-4 border-purple-500/20 rounded-full animate-[spin_8s_linear_infinite]"></div>
              <div className="absolute w-56 h-56 border-4 border-pink-500/20 rounded-full animate-[spin_6s_linear_infinite_reverse]"></div>
              <div className="absolute w-40 h-40 border-4 border-indigo-500/20 rounded-full animate-[spin_4s_linear_infinite]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesComingSoon;