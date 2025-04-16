import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePulseContext } from '@/contexts/PulseContext';
import { MapPin, Calendar, Users } from "lucide-react";

type ExploreModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ExploreModal = ({ isOpen, onClose }: ExploreModalProps) => {
  const { exploreEvents } = usePulseContext();
  
  const campusLocations = [
    { id: '1', name: 'LPU Main Block', events: 25, attendees: 500, color: 'bg-blue-500' },
    { id: '2', name: 'LPU Student Center', events: 20, attendees: 400, color: 'bg-green-500' },
    { id: '3', name: 'LPU Sports Complex', events: 18, attendees: 350, color: 'bg-yellow-500' },
    { id: '4', name: 'LPU Auditorium', events: 12, attendees: 600, color: 'bg-red-500' },
    { id: '5', name: 'LPU Library', events: 8, attendees: 200, color: 'bg-purple-500' },
    { id: '6', name: 'LPU Innovation Center', events: 15, attendees: 250, color: 'bg-pink-500' },
    { id: '7', name: 'LPU Open Air Theatre', events: 10, attendees: 450, color: 'bg-orange-500' },
    { id: '8', name: 'LPU School of CSE', events: 15, attendees: 300, color: 'bg-indigo-500' },
  ];
  
  const handleExplore = (location: string) => {
    exploreEvents();
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto dark:bg-gray-900 dark:text-white border-purple-500/20">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-lg font-bold">Explore Campus Events</DialogTitle>
          <DialogDescription className="text-sm text-gray-400">
            Discover activities happening around different campus locations.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-3">
          {/* Google Maps iframe embed */}
          <div className="relative w-full mb-4 rounded-lg overflow-hidden border border-gray-700">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.0873936035737!2d75.70204611226575!3d31.25082446447919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5f6661247f15%3A0x8b4e59ecdcb06b1a!2sLPU%20School%20of%20Computer%20Science%20%26%20Engineering!5e1!3m2!1sen!2sin!4v1744751515027!5m2!1sen!2sin" 
              width="100%" 
              height="200" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
            
            <div className="absolute bottom-2 left-2 bg-gray-900 bg-opacity-75 rounded-lg p-1.5 text-xs text-gray-300 z-10">
              LPU School of Computer Science & Engineering
            </div>
          </div>
          
          {/* Location List */}
          <div className="grid grid-cols-2 gap-2">
            {campusLocations.map((location) => (
              <div
                key={location.id}
                className="flex items-center p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => handleExplore(location.name)}
              >
                <div className={`w-8 h-8 rounded-lg ${location.color} flex items-center justify-center mr-2`}>
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">{location.name}</p>
                  <div className="flex space-x-2 text-xs text-gray-400">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" /> 
                      {location.events}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-3 w-3 mr-1" /> 
                      {location.attendees}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={onClose}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExploreModal; 