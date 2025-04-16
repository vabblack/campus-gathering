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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { usePulseContext } from '@/contexts/PulseContext';
import { 
  BookOpen, Code, Music, Film, 
  Briefcase, HeartPulse, Camera, Coffee,
  Palette, DollarSign, Globe, Award,
  Gamepad2, Shirt, Landmark, Clapperboard
} from "lucide-react";

type InterestsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type Interest = {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
};

const InterestsModal = ({ isOpen, onClose }: InterestsModalProps) => {
  const { updateInterests } = usePulseContext();
  
  const interests: Interest[] = [
    { id: 'academic', name: 'Academic', icon: <BookOpen className="h-4 w-4" />, color: 'bg-blue-500' },
    { id: 'tech', name: 'Technology', icon: <Code className="h-4 w-4" />, color: 'bg-cyan-500' },
    { id: 'music', name: 'Music', icon: <Music className="h-4 w-4" />, color: 'bg-purple-500' },
    { id: 'film', name: 'Film & Media', icon: <Film className="h-4 w-4" />, color: 'bg-red-500' },
    { id: 'career', name: 'Career', icon: <Briefcase className="h-4 w-4" />, color: 'bg-orange-500' },
    { id: 'health', name: 'Health & Wellness', icon: <HeartPulse className="h-4 w-4" />, color: 'bg-green-500' },
    { id: 'photography', name: 'Photography', icon: <Camera className="h-4 w-4" />, color: 'bg-indigo-500' },
    { id: 'social', name: 'Social', icon: <Coffee className="h-4 w-4" />, color: 'bg-pink-500' },
    { id: 'art', name: 'Art', icon: <Palette className="h-4 w-4" />, color: 'bg-yellow-500' },
    { id: 'business', name: 'Business', icon: <DollarSign className="h-4 w-4" />, color: 'bg-emerald-500' },
    { id: 'international', name: 'International', icon: <Globe className="h-4 w-4" />, color: 'bg-violet-500' },
    { id: 'leadership', name: 'Leadership', icon: <Award className="h-4 w-4" />, color: 'bg-rose-500' },
    { id: 'gaming', name: 'Gaming', icon: <Gamepad2 className="h-4 w-4" />, color: 'bg-sky-500' },
    { id: 'fashion', name: 'Fashion', icon: <Shirt className="h-4 w-4" />, color: 'bg-fuchsia-500' },
    { id: 'politics', name: 'Politics', icon: <Landmark className="h-4 w-4" />, color: 'bg-amber-500' },
    { id: 'entertainment', name: 'Entertainment', icon: <Clapperboard className="h-4 w-4" />, color: 'bg-lime-500' },
  ];
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['academic', 'tech', 'music']);
  
  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateInterests();
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto dark:bg-gray-900 dark:text-white border-purple-500/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Customize Your Interests</DialogTitle>
          <DialogDescription className="text-gray-400">
            Select topics that interest you to personalize your event and group recommendations.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
              {interests.map((interest) => (
                <div key={interest.id} className="flex flex-col items-center">
                  <div
                    className={`
                      w-16 h-16 rounded-xl flex items-center justify-center mb-2 cursor-pointer
                      transition-all duration-200
                      ${selectedInterests.includes(interest.id) 
                        ? `${interest.color} text-white ring-2 ring-white/50 ring-offset-2 ring-offset-gray-900` 
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}
                    `}
                    onClick={() => handleInterestToggle(interest.id)}
                  >
                    {interest.icon}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={interest.id}
                      checked={selectedInterests.includes(interest.id)}
                      onCheckedChange={() => handleInterestToggle(interest.id)}
                    />
                    <Label 
                      htmlFor={interest.id}
                      className="text-sm cursor-pointer"
                    >
                      {interest.name}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <h4 className="font-medium text-purple-400 mb-2">Selected Interests</h4>
              <div className="flex flex-wrap gap-2">
                {selectedInterests.map(id => {
                  const interest = interests.find(i => i.id === id);
                  return interest ? (
                    <div 
                      key={id} 
                      className={`
                        px-2 py-1 rounded-full text-xs text-white flex items-center space-x-1
                        ${interest.color}
                      `}
                    >
                      {interest.icon}
                      <span>{interest.name}</span>
                    </div>
                  ) : null;
                })}
                {selectedInterests.length === 0 && (
                  <p className="text-sm text-gray-400">No interests selected</p>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Save Preferences
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InterestsModal; 