import React, { useState } from 'react';
import * as THREE from 'three';
import { Calendar, Users, Zap, MapPin, Heart } from 'lucide-react';
import { usePulseContext } from '@/contexts/PulseContext';
import { ActiveSpace } from '@/types';
import { useNavigate } from 'react-router-dom';
import EventRegistrationModal from './EventRegistrationModal';
import SpaceJoinModal from './SpaceJoinModal';
import InterestsModal from './InterestsModal';
import ExploreModal from './ExploreModal';

// Define temporary types for events
type LiveEvent = {
  id: string;
  title: string;
  location: string;
  time: string;
  status: 'live' | 'soon' | 'upcoming';
};

type SpaceInfo = {
  id: string;
  type: ActiveSpace;
  name: string;
  count: number;
};

type TopicInfo = {
  id: string;
  title: string;
  mentions: string;
  rank: number;
};

const CampusPulse = () => {
  const {
    liveEvents: contextLiveEvents,
    activeSpaces: contextActiveSpaces,
    trendingTopics: contextTrendingTopics,
    totalOnline,
    createEvent,
    joinGroup,
    updateInterests,
    exploreEvents,
    joinEvent,
    joinSpace,
    navigateToCreateEvent
  } = usePulseContext();
  
  // Add mock data if the context doesn't provide the necessary structure
  const liveEvents: LiveEvent[] = [
    { id: '1', title: 'Campus Hackathon', location: 'CS Building', time: '2:00 PM', status: 'live' },
    { id: '2', title: 'Open Mic Night', location: 'Student Center', time: '7:00 PM', status: 'soon' },
    { id: '3', title: 'Basketball Tournament', location: 'Sports Complex', time: '5:30 PM', status: 'upcoming' }
  ];
  
  const activeSpaces: SpaceInfo[] = [
    { id: '1', type: 'study', name: 'Finals Prep Group', count: 25 },
    { id: '2', type: 'club', name: 'Photography Club', count: 42 },
    { id: '3', type: 'project', name: 'Senior Thesis', count: 18 },
    { id: '4', type: 'discussion', name: 'Career Talk', count: 31 }
  ];
  
  const trendingTopics: TopicInfo[] = [
    { id: '1', title: 'Final Exams', mentions: '485 mentions', rank: 1 },
    { id: '2', title: 'Spring Break', mentions: '372 mentions', rank: 2 },
    { id: '3', title: 'Career Fair', mentions: '291 mentions', rank: 3 }
  ];
  
  const navigate = useNavigate();
  
  // State for event modal
  const [selectedEvent, setSelectedEvent] = useState<LiveEvent | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  
  // State for space modal
  const [selectedSpaceType, setSelectedSpaceType] = useState<ActiveSpace | null>(null);
  const [isSpaceModalOpen, setIsSpaceModalOpen] = useState(false);
  
  // State for interests modal
  const [isInterestsModalOpen, setIsInterestsModalOpen] = useState(false);
  
  // State for explore modal
  const [isExploreModalOpen, setIsExploreModalOpen] = useState(false);

  // Handler for event cards
  const handleEventClick = (eventId: string) => {
    const event = liveEvents.find(e => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
      setIsEventModalOpen(true);
    }
  };

  // Handler for space cards
  const handleSpaceClick = (spaceType: ActiveSpace) => {
    setSelectedSpaceType(spaceType);
    setIsSpaceModalOpen(true);
  };
  
  // Handler for join group button
  const handleJoinGroupClick = () => {
    setSelectedSpaceType('study'); // Default to study groups
    setIsSpaceModalOpen(true);
  };
  
  // Handler for interests button
  const handleInterestsClick = () => {
    setIsInterestsModalOpen(true);
  };
  
  // Handler for explore button
  const handleExploreClick = () => {
    setIsExploreModalOpen(true);
  };
  
  // Handler for create event button
  const handleCreateEventClick = () => {
    navigateToCreateEvent(navigate);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Interactive background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff08_0,transparent_100%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            Live Campus Pulse
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </div>

        {/* Live Activity Cards - Adjusted for better mobile layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Upcoming Events Card */}
          <div className="glass-card relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white">Live Events</h3>
                </div>
                <span className="animate-pulse flex h-3 w-3">
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  </span>
                </span>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {liveEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => handleEventClick(event.id)}
                    className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="text-sm sm:text-base text-white font-medium">{event.title}</p>
                      <p className="text-xs sm:text-sm text-gray-400">{event.location} • {event.time}</p>
                    </div>
                    <span className={`
                      px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium 
                      ${event.status === 'live' ? 'bg-green-500/20 text-green-400' : ''}
                      ${event.status === 'soon' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                      ${event.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400' : ''}
                    `}>
                      {event.status === 'live' ? 'Live' : 
                       event.status === 'soon' ? 'Soon' : 'Upcoming'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Active Spaces Card */}
          <div className="glass-card relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white">Active Spaces</h3>
                </div>
                <div className="text-xs sm:text-sm text-gray-400">{totalOnline || 248} online</div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                {activeSpaces.map((space) => (
                  <div
                    key={space.id}
                    onClick={() => handleSpaceClick(space.type)}
                    className="p-3 sm:p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-center cursor-pointer"
                  >
                    <div className="text-xl sm:text-2xl font-bold text-white mb-1">{space.count}</div>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {space.type === 'study' ? 'Study Groups' : 
                       space.type === 'project' ? 'Project Teams' : 
                       space.type === 'club' ? 'Club Meetings' : 
                       'Discussions'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trending Topics Card */}
          <div className="glass-card relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
            <div className="p-4 sm:p-6">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white">Trending Now</h3>
              </div>

              <div className="space-y-2 sm:space-y-3">
                {trendingTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className={`text-xl sm:text-2xl font-bold ${
                      topic.rank === 1 ? 'text-orange-500' :
                      topic.rank === 2 ? 'text-orange-400' :
                      'text-orange-300'
                    }`}>#{topic.rank}</span>
                    <div>
                      <p className="text-sm sm:text-base text-white font-medium">{topic.title}</p>
                      <p className="text-xs sm:text-sm text-gray-400">{topic.mentions}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={handleCreateEventClick}
            className="p-4 glass-card rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-medium">Create Event</span>
            </div>
          </button>
          
          <button 
            onClick={handleJoinGroupClick}
            className="p-4 glass-card rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-medium">Join Group</span>
            </div>
          </button>
          
          <button 
            onClick={handleInterestsClick}
            className="p-4 glass-card rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-medium">Interests</span>
            </div>
          </button>
          
          <button 
            onClick={handleExploreClick}
            className="p-4 glass-card rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-medium">Explore</span>
            </div>
          </button>
        </div>
      </div>

      {/* Modals */}
      {selectedEvent && (
        <EventRegistrationModal
          event={selectedEvent}
          isOpen={isEventModalOpen}
          onClose={() => setIsEventModalOpen(false)}
        />
      )}
      
      {selectedSpaceType && (
        <SpaceJoinModal
          spaceType={selectedSpaceType}
          isOpen={isSpaceModalOpen}
          onClose={() => setIsSpaceModalOpen(false)}
        />
      )}
      
      <InterestsModal
        isOpen={isInterestsModalOpen}
        onClose={() => setIsInterestsModalOpen(false)}
      />
      
      <ExploreModal
        isOpen={isExploreModalOpen}
        onClose={() => setIsExploreModalOpen(false)}
      />
    </section>
  );
};

export default CampusPulse; 