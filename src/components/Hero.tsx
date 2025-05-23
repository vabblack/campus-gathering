import React, { useState } from 'react';
import { Search, MessageSquare, Star, ThumbsUp, Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/ui-button.css';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black to-gray-900 overflow-hidden">
      {/* Abstract geometric shapes for background flair */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-float-slow"></div>
        <div className="absolute bottom-20 right-24 w-80 h-80 bg-yellow-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-float-delay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen flex flex-col lg:flex-row items-center">
        <div className="relative z-10 w-full lg:w-1/2">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl opacity-100">
              <span className="block">Discover & Create</span>
              <span className="block text-yellow-400">Campus Events</span>
            </h1>
      
            <p className="mt-6 text-xl text-gray-300 text-center sm:text-left">
              Your ultimate platform to find exciting events on campus, connect with peers, and create your own gatherings.
            </p>
            <div className="mt-5 sm:mt-8 flex items-center gap-3 opacity-100">
              <Link to="/events">
                <button className="ui-btn">
                  <span>
                    Browse Events
                  </span>
                </button>
              </Link>
              <Link to="/create-event">
                <button className="ui-btn yellow">
                  <span>
                    Create Event
                  </span>
                </button>
              </Link>
            </div>

            <div className="mt-16 sm:max-w-lg sm:mx-auto lg:mx-0 opacity-100">
              <form onSubmit={handleSearch} className="input__container">
                <div className="shadow__input"></div>
                <button type="submit" className="input__button__shadow">
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="20px" width="20px">
                    <path d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z" fillRule="evenodd" fill="#17202A"></path>
                  </svg>
                </button>
                <input 
                  type="text" 
                  name="text" 
                  className="input__search" 
                  placeholder="Search for events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>

            <div className="mt-16 sm:max-w-lg sm:mx-auto lg:mx-0 opacity-100">
              <div className="bar">
                <div className="ball"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Modified this div to be visible on all screen sizes */}
        <div className="relative mt-12 lg:mt-0 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 w-full">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full rounded-xl"
            src="https://happenings.lpu.in/wp-content/uploads/2023/11/Spectra-closing-4.jpg"
            alt="Students at a campus event"
          />

          {/* Enhanced floating event comments with better design and random positioning */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Modified comment positions and sizes for better mobile visibility */}
            {/* Top Left Comment */}
            <div className="absolute top-[10%] left-[5%] bg-gradient-to-br from-yellow-500/20 to-yellow-600/30 backdrop-blur-md p-3 sm:p-4 rounded-xl w-36 sm:w-52 animate-float-slow shadow-lg border border-yellow-500/30">
              <div className="flex items-start">
                <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 mt-1 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-white ml-2">"The concert last week was amazing! Can't wait for the next one."</p>
              </div>
              <div className="flex items-center mt-2 sm:mt-3">
                <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-yellow-500 flex items-center justify-center">
                  <span className="text-[10px] sm:text-xs font-bold">S</span>
                </div>
                <span className="text-[10px] sm:text-xs ml-2 text-gray-300">Rittik, Music</span>
                <Star className="h-3 w-3 ml-auto text-yellow-400 fill-yellow-400" />
              </div>
            </div>

            {/* Top Right Comment */}
            <div className="absolute top-[8%] right-[5%] bg-gradient-to-br from-gray-800/60 to-gray-900/80 backdrop-blur-md p-3 sm:p-4 rounded-xl w-36 sm:w-56 animate-float shadow-lg border border-gray-600/30" style={{ animationDelay: "1.5s" }}>
              <div className="flex items-start">
                <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 mt-1 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-white ml-2">"The hackathon helped me connect with my future co-founders!"</p>
              </div>
              <div className="flex items-center mt-2 sm:mt-3">
                <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-yellow-500 flex items-center justify-center">
                  <span className="text-[10px] sm:text-xs font-bold">M</span>
                </div>
                <span className="text-[10px] sm:text-xs ml-2 text-gray-300">Yash, CS</span>
                <div className="ml-auto flex space-x-1">
                  <Star className="h-2 w-2 sm:h-3 sm:w-3 text-yellow-400 fill-yellow-400" />
                  <Star className="h-2 w-2 sm:h-3 sm:w-3 text-yellow-400 fill-yellow-400" />
                </div>
              </div>
            </div>

            {/* Bottom Left Comment - Only show on larger screens */}
            <div className="hidden sm:block absolute bottom-[20%] left-[5%] bg-gradient-to-br from-yellow-400/20 to-yellow-500/30 backdrop-blur-md p-4 rounded-xl w-48 animate-float-delay shadow-lg border border-yellow-400/30" style={{ animationDelay: "2s" }}>
              <div className="flex items-start">
                <MessageSquare className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                <p className="text-sm text-white ml-2">"Found my favorite club at the Activities Fair!"</p>
              </div>
              <div className="flex items-center mt-3">
                <div className="h-6 w-6 rounded-full bg-yellow-500 flex items-center justify-center">
                  <span className="text-xs font-bold">A</span>
                </div>
                <span className="text-xs ml-2 text-gray-300">Gaurav, Freshman</span>
              </div>
            </div>

            {/* Bottom Right Comment - Only show on larger screens */}
            <div className="hidden sm:block absolute bottom-[15%] right-[5%] bg-gradient-to-br from-gray-800/60 to-gray-900/80 backdrop-blur-md p-4 rounded-xl w-60 animate-float-slow shadow-lg border border-gray-600/30" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-start">
                <ThumbsUp className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                <p className="text-sm text-white ml-2">"Never knew campus had so many events until I found this platform!"</p>
              </div>
              <div className="flex items-center mt-3">
                <div className="h-6 w-6 rounded-full bg-yellow-500 flex items-center justify-center">
                  <span className="text-xs font-bold">J</span>
                </div>
                <span className="text-xs ml-2 text-gray-300">Aman, Senior</span>
                <div className="ml-auto flex space-x-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                </div>
              </div>
            </div>

            {/* Middle Left Comment - Only show on larger screens */}
            <div className="hidden sm:block absolute top-[39%] left-[24%] bg-gradient-to-br from-gray-800/60 to-gray-900/80 backdrop-blur-md p-3 rounded-xl w-44 animate-float shadow-lg border border-gray-600/30 transform -translate-y-1/2" style={{ animationDelay: "2.5s" }}>
              <p className="text-xs text-white">"Best way to meet new people on campus!"</p>
              <div className="flex items-center mt-2">
                <div className="h-5 w-5 rounded-full bg-yellow-500 flex items-center justify-center">
                  <span className="text-[10px] font-bold">T</span>
                </div>
                <span className="text-[10px] ml-1 text-gray-300">Vishal</span>
                <ThumbsUp className="h-3 w-3 ml-auto text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;