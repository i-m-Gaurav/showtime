'use client'
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Ticket, Calendar, Star, Play } from 'lucide-react';

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      title: "List Your Show on ShowTime",
      subtitle: "Reach millions of entertainment seekers",
      description: "Join the biggest entertainment platform today",
      icon: <Calendar size={48} className="text-white" />,
      bgColor: "bg-gradient-to-r from-purple-600 to-blue-500"
    },
    {
      title: "Book Your Favorite Shows",
      subtitle: "Secure the best seats in the house",
      description: "Experience entertainment like never before",
      icon: <Ticket size={48} className="text-white" />,
      bgColor: "bg-gradient-to-r from-red-600 to-pink-500"
    },
    {
      title: "Exclusive Premier Access",
      subtitle: "Be the first to watch new releases",
      description: "Join our premium membership today",
      icon: <Star size={48} className="text-white" />,
      bgColor: "bg-gradient-to-r from-emerald-600 to-teal-500"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-xl">
      {/* Banner Content */}
      <div 
        className="w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)`, display: 'flex' }}
      >
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`w-full h-full flex-shrink-0 ${banner.bgColor} relative`}
          >
            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
              {/* Icon */}
              <div className="mb-6 animate-bounce">
                {banner.icon}
              </div>
              
              {/* Text Content */}
              <h2 className="text-4xl font-bold mb-4 text-center">
                {banner.title}
              </h2>
              <p className="text-xl mb-2 text-center">
                {banner.subtitle}
              </p>
              <p className="text-lg opacity-80 text-center">
                {banner.description}
              </p>
              
              {/* CTA Button */}
              <button className="mt-8 px-8 py-3 bg-white text-gray-900 rounded-full font-semibold 
                               hover:bg-opacity-90 transition-colors duration-300">
                Get Started
              </button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-4 left-4">
                <Play size={120} />
              </div>
              <div className="absolute bottom-4 right-4">
                <Play size={120} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-30 
                   rounded-full text-white hover:bg-opacity-50 transition-all duration-200"
      >
        <ArrowLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-30 
                   rounded-full text-white hover:bg-opacity-50 transition-all duration-200"
      >
        <ArrowRight size={24} />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 
                      ${currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;