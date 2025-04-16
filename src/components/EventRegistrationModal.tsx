import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { usePulseContext } from '@/contexts/PulseContext';

// Type definition that matches the one in CampusPulse
type LiveEvent = {
  id: string;
  title: string;
  location: string;
  time: string;
  status: 'live' | 'soon' | 'upcoming';
};

type EventRegistrationModalProps = {
  event: LiveEvent;
  isOpen: boolean;
  onClose: () => void;
};

const EventRegistrationModal = ({ event, isOpen, onClose }: EventRegistrationModalProps) => {
  const { joinEvent } = usePulseContext();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    joinEvent(event.id);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] dark:bg-gray-900 dark:text-white border-purple-500/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{event.title}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Fill in your details to join this event.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <MapPin className="h-4 w-4 text-purple-400" />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <Clock className="h-4 w-4 text-purple-400" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <Users className="h-4 w-4 text-purple-400" />
            <span>42 attendees</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Your name"
                className="col-span-3 bg-gray-800 border-gray-700"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email"
                className="col-span-3 bg-gray-800 border-gray-700"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Join Event
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventRegistrationModal; 