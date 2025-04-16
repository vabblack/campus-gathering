import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckIcon, UserCircle, Clock } from "lucide-react";
import { usePulse, ActiveSpace } from '@/contexts/PulseContext';

type SpaceJoinModalProps = {
  spaceType: ActiveSpace['type'];
  isOpen: boolean;
  onClose: () => void;
};

const typeLabels = {
  'study': 'Study Group',
  'project': 'Project Team',
  'club': 'Club Meeting',
  'discussion': 'Discussion'
};

const SpaceJoinModal = ({ spaceType, isOpen, onClose }: SpaceJoinModalProps) => {
  const { joinSpace } = usePulse();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    joinSpace(spaceType);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] dark:bg-gray-900 dark:text-white border-purple-500/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Join {typeLabels[spaceType]}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Connect with other students in this space.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 my-4">
          <div className="flex flex-wrap gap-2">
            {spaceType === 'study' && (
              <>
                <div className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">Mathematics</div>
                <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Biology</div>
                <div className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">Computer Science</div>
                <div className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">Literature</div>
              </>
            )}
            
            {spaceType === 'project' && (
              <>
                <div className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">App Development</div>
                <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Research</div>
                <div className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">Hackathon</div>
              </>
            )}
            
            {spaceType === 'club' && (
              <>
                <div className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">Photography</div>
                <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Chess</div>
                <div className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">Debate</div>
                <div className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">Music</div>
              </>
            )}
            
            {spaceType === 'discussion' && (
              <>
                <div className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">Current Events</div>
                <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Academic</div>
                <div className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">Career</div>
              </>
            )}
          </div>
          
          <div className="flex items-start space-x-2 text-sm text-gray-300 mt-4">
            <UserCircle className="h-4 w-4 text-purple-400 mt-0.5" />
            <div>
              <p className="font-medium text-white">Active participants</p>
              <div className="flex -space-x-2 mt-1">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white">A</div>
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs text-white">B</div>
                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-xs text-white">C</div>
                <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-xs text-white">D</div>
                <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white">+12</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <Clock className="h-4 w-4 text-purple-400" />
            <span>Next session: Today, 4:00 PM</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="specific-group" className="text-right">
                Select Group
              </Label>
              <Select>
                <SelectTrigger className="col-span-3 bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Choose a specific group" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="group-1">Group 1 (5 members)</SelectItem>
                  <SelectItem value="group-2">Group 2 (8 members)</SelectItem>
                  <SelectItem value="group-3">Group 3 (3 members)</SelectItem>
                  <SelectItem value="group-4">Group 4 (New)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Intro Message
              </Label>
              <Input
                id="message"
                placeholder="Brief introduction (optional)"
                className="col-span-3 bg-gray-800 border-gray-700"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Join Now
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SpaceJoinModal; 