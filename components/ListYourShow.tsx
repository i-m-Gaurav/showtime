import React from 'react';
import { Sparkles, Calendar, Users, Ticket } from 'lucide-react';

const ListYourShow = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 my-8">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/10 blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full bg-purple-400/20 blur-2xl"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Got a Show to Share?
            <Sparkles className="inline-block ml-2 h-6 w-6" />
          </h2>
          
          <p className="text-white/90 text-lg mb-6">
            Partner with us to showcase your events to thousands of entertainment seekers
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-300" />
              <span className="text-sm">Any Date</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-300" />
              <span className="text-sm">Any Audience</span>
            </div>
            <div className="flex items-center gap-2">
              <Ticket className="h-5 w-5 text-purple-300" />
              <span className="text-sm">Any Event</span>
            </div>
          </div>

          <button className="bg-white text-purple-700 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            List Your Show
          </button>
        </div>

        <div className="hidden md:block">
          <div className="relative">
            {/* Artistic element representing events/shows */}
            <div className="w-64 h-64 relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-400/30 rounded-lg transform rotate-12"></div>
              <div className="absolute top-10 right-10 w-40 h-40 bg-indigo-400/30 rounded-lg transform -rotate-6"></div>
              <div className="absolute top-20 right-20 w-40 h-40 bg-pink-400/30 rounded-lg transform rotate-3">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Ticket className="h-16 w-16 text-white/70" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListYourShow;