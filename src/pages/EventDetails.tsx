import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, DollarSign, Users, Share2, Heart, Ticket } from 'lucide-react';
import { events } from '@/data/events';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h1>
            <p className="text-lg text-gray-600 mb-8">The event you're looking for doesn't exist or has been removed.</p>
            <Link to="/">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#1e1b4b] via-[#2e1065] to-[#3b0764]">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-blue-500/5 animate-gradient-xy" />
        
        {/* Animated shapes */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 right-1/4 w-[28rem] h-[28rem] bg-indigo-400/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-1/3 w-[32rem] h-[32rem] bg-purple-600/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/4 right-1/3 w-[24rem] h-[24rem] bg-indigo-600/10 rounded-full blur-3xl animate-pulse" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] opacity-10" />

        {/* Additional animated elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-indigo-300 rounded-full animate-ping" />
          <div className="absolute top-3/4 left-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-ping delay-300" />
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-indigo-200 rounded-full animate-ping delay-700" />
        </div>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="glass-card p-8 animate-fade-in backdrop-blur-xl bg-black/40 border border-white/10 shadow-2xl rounded-xl">
          <div className="relative h-96">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="max-w-7xl mx-auto">
                <Badge className="mb-4 bg-indigo-600">{event.category}</Badge>
                <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="glass-card p-8 backdrop-blur-xl bg-black/40 border border-white/10 rounded-xl mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">About This Event</h2>
                  <p className="text-gray-300 whitespace-pre-line">
                    {event.description}
                  </p>
                  <hr className="my-8 border-white/10" />
                  <h2 className="text-2xl font-bold text-white mb-4">Organizer</h2>
                  <div className="flex items-center">
                    <div className="bg-indigo-900/50 rounded-full h-12 w-12 flex items-center justify-center">
                      <Users className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-white">{event.organizer}</h3>
                      <p className="text-gray-400 text-sm">Event Organizer</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="glass-card p-6 backdrop-blur-xl bg-black/40 border border-white/10 rounded-xl sticky top-24">
                  <div className="border-b border-white/10 pb-4 mb-4">
                    <h3 className="text-xl font-bold text-white mb-4">Event Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-white">Location</p>
                          <p className="text-gray-300">{event.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-white">Date</p>
                          <p className="text-gray-300">
                            {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-white">Time</p>
                          <p className="text-gray-300">{event.time}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <DollarSign className="h-5 w-5 text-indigo-400 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-white">Price</p>
                          <p className="text-gray-300">{event.ticketPrice === 0 ? 'Free' : `$${event.ticketPrice}`}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6 flex justify-between">
                    <Button variant="outline" className="flex items-center bg-transparent border-white/10 text-white hover:bg-white/10">
                      <Heart className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" className="flex items-center bg-transparent border-white/10 text-white hover:bg-white/10">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                  
                  <Link to={`/event/${event.id}/register`}>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center">
                      <Ticket className="h-5 w-5 mr-2" />
                      {event.ticketPrice === 0 ? 'Register Now' : 'Buy Tickets'}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetails;
