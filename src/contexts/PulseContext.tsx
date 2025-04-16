import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';
import { ActiveSpace, PulseContextType, TopicType } from '@/types';

// Define local space info interface to avoid type conflict
interface SpaceInfo {
  id: string;
  title: string;
  type?: string;
  participants: number;
  count?: number;
  location?: string;
  name?: string;
}

interface PulseProviderProps {
  children: React.ReactNode;
}

// Extended context type to include campus pulse data
interface ExtendedPulseContextType extends PulseContextType {
  liveEvents: SpaceInfo[];
  activeSpaces: {
    id: string;
    type: string;
    count: number;
    name?: string;
  }[];
  trendingTopics: TopicType[];
  totalOnline: number;
  createEvent: () => void;
  joinGroup: () => void;
  updateInterests: () => void;
  exploreEvents: () => void;
  joinEvent: (eventId: string) => void;
  joinSpace: (spaceType: ActiveSpace) => void;
  navigateToCreateEvent: (navigate: any) => void;
  addSpace: (type: ActiveSpace, name: string) => void;
  removeSpace: (id: string) => void;
}

const defaultContext: ExtendedPulseContextType = {
  activeTopics: [],
  setActiveTopics: () => {},
  activeSpace: null,
  setActiveSpace: () => {},
  liveEvents: [],
  activeSpaces: [],
  trendingTopics: [],
  totalOnline: 0,
  createEvent: () => {},
  joinGroup: () => {},
  updateInterests: () => {},
  exploreEvents: () => {},
  joinEvent: () => {},
  joinSpace: () => {},
  navigateToCreateEvent: () => {},
  addSpace: () => {},
  removeSpace: () => {}
};

const PulseContext = createContext<ExtendedPulseContextType>(defaultContext);

export const PulseProvider: React.FC<PulseProviderProps> = ({ children }) => {
  const [activeTopics, setActiveTopics] = useState<string[]>([]);
  const [activeSpace, setActiveSpace] = useState<ActiveSpace | null>(null);
  const [activeSpacesState, setActiveSpacesState] = useState([
    { id: '1', type: 'study', count: 23, name: 'Finals Prep Group' },
    { id: '2', type: 'project', count: 15, name: 'App Development' },
    { id: '3', type: 'club', count: 8, name: 'Photography Club' }
  ]);
  
  // Mock data for campus pulse
  const liveEvents: SpaceInfo[] = [
    { id: '1', title: 'Tech Conference', participants: 120, location: 'Main Auditorium' },
    { id: '2', title: 'Career Fair', participants: 200, location: 'Student Center' },
    { id: '3', title: 'AI Workshop', participants: 50, location: 'Tech Lab 101' }
  ];
  
  const trendingTopics: TopicType[] = [
    { id: '1', name: 'AI Research', title: 'AI Research', engagement: 87, mentions: 120 },
    { id: '2', name: 'Startup Weekend', title: 'Startup Weekend', engagement: 65, mentions: 95 },
    { id: '3', name: 'Campus Sports', title: 'Campus Sports', engagement: 42, mentions: 78 }
  ];
  
  const totalOnline = 1243;

  const addSpace = (type: ActiveSpace, name: string) => {
    const newSpace = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      name,
      count: Math.floor(Math.random() * 30) + 5
    };
    
    setActiveSpacesState([...activeSpacesState, newSpace]);
    toast.success(`Joined ${type} space: ${name}`);
  };
  
  const removeSpace = (id: string) => {
    setActiveSpacesState(activeSpacesState.filter(space => space.id !== id));
    toast.success("Left the space");
  };
  
  // Mock functionality for UI interactions
  const createEvent = () => {
    toast.success("Event created successfully!");
  };
  
  const joinGroup = () => {
    toast.success("Joined group successfully!");
  };
  
  const updateInterests = () => {
    toast.success("Interests updated successfully!");
  };
  
  const exploreEvents = () => {
    toast.success("Explore mode activated!");
  };
  
  const joinEvent = (eventId: string) => {
    toast.success(`Registered for event #${eventId}!`);
  };
  
  const joinSpace = (spaceType: ActiveSpace) => {
    toast.success(`Joined ${spaceType} space!`);
  };
  
  const navigateToCreateEvent = (navigate: any) => {
    navigate('/create-event');
  };

  return (
    <PulseContext.Provider value={{
      activeTopics,
      setActiveTopics,
      activeSpace,
      setActiveSpace,
      liveEvents,
      activeSpaces: activeSpacesState,
      trendingTopics,
      totalOnline,
      createEvent,
      joinGroup,
      updateInterests,
      exploreEvents,
      joinEvent,
      joinSpace,
      navigateToCreateEvent,
      addSpace,
      removeSpace
    }}>
      {children}
    </PulseContext.Provider>
  );
};

export const usePulseContext = () => useContext(PulseContext);

export default PulseProvider; 