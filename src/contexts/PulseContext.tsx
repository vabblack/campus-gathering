import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import { ActiveSpace, PulseContextType } from '@/types';

// Types for our pulse data
type SpaceInfo = {
  id: string;
  type: ActiveSpace;
  name: string;
};

const defaultPulseContext: PulseContextType & {
  activeSpaces: SpaceInfo[];
  addSpace: (type: ActiveSpace, name: string) => void;
  removeSpace: (id: string) => void;
  liveEvents: { id: string; title: string; participants: number }[];
  trendingTopics: { id: string; name: string; engagement: number }[];
  totalOnline: number;
  createEvent: () => void;
  joinGroup: () => void;
  updateInterests: () => void;
  exploreEvents: () => void;
  joinEvent: (eventId: string) => void;
  joinSpace: (spaceType: ActiveSpace) => void;
  navigateToCreateEvent: (navigate: any) => void;
} = {
  activeTopics: [],
  setActiveTopics: () => {},
  activeSpace: null,
  setActiveSpace: () => {},
  activeSpaces: [],
  addSpace: () => {},
  removeSpace: () => {},
  liveEvents: [],
  trendingTopics: [],
  totalOnline: 0,
  createEvent: () => {},
  joinGroup: () => {},
  updateInterests: () => {},
  exploreEvents: () => {},
  joinEvent: () => {},
  joinSpace: () => {},
  navigateToCreateEvent: () => {},
};

export const PulseContext = createContext(defaultPulseContext);

export const usePulseContext = () => useContext(PulseContext);

interface PulseProviderProps {
  children: ReactNode;
}

export const PulseProvider: React.FC<PulseProviderProps> = ({ children }) => {
  const [activeTopics, setActiveTopics] = useState<string[]>([]);
  const [activeSpace, setActiveSpace] = useState<ActiveSpace | null>(null);
  const [activeSpaces, setActiveSpaces] = useState<SpaceInfo[]>([
    { id: '1', type: 'study', name: 'Finals Prep Group' },
    { id: '2', type: 'club', name: 'Photography Club' },
  ]);

  const [liveEvents, setLiveEvents] = useState([
    { id: '1', title: 'Campus Hackathon', participants: 42 },
    { id: '2', title: 'Open Mic Night', participants: 28 },
    { id: '3', title: 'Basketball Tournament', participants: 35 },
  ]);

  const [trendingTopics, setTrendingTopics] = useState([
    { id: '1', name: 'Final Exams', engagement: 85 },
    { id: '2', name: 'Spring Break', engagement: 73 },
    { id: '3', name: 'Career Fair', engagement: 68 },
    { id: '4', name: 'Campus Food', engagement: 54 },
    { id: '5', name: 'Dorm Life', engagement: 47 },
  ]);

  const totalOnline = 248; // Static number for demo

  const addSpace = (type: ActiveSpace, name: string) => {
    const newSpace = {
      id: Date.now().toString(),
      type,
      name,
    };
    setActiveSpaces([...activeSpaces, newSpace]);
    toast.success(`Joined ${type} space: ${name}`);
  };

  const removeSpace = (id: string) => {
    setActiveSpaces(activeSpaces.filter(space => space.id !== id));
    toast.info('Left the space');
  };

  // Modal handlers
  const createEvent = () => {
    toast.success('Event creation started!');
  };

  const joinGroup = () => {
    toast.success('Group joined successfully!');
  };

  const updateInterests = () => {
    toast.success('Interests updated!');
  };

  const exploreEvents = () => {
    toast.info('Exploring events...');
  };

  const joinEvent = (eventId: string) => {
    toast.success('Successfully registered for the event!');
  };

  const joinSpace = (spaceType: ActiveSpace) => {
    setActiveSpace(spaceType);
    toast.success(`Joined ${spaceType} space!`);
  };

  const navigateToCreateEvent = (navigate: any) => {
    navigate('/create-event');
  };

  return (
    <PulseContext.Provider
      value={{
        activeTopics,
        setActiveTopics,
        activeSpace,
        setActiveSpace,
        activeSpaces,
        addSpace,
        removeSpace,
        liveEvents,
        trendingTopics,
        totalOnline,
        createEvent,
        joinGroup,
        updateInterests,
        exploreEvents,
        joinEvent,
        joinSpace,
        navigateToCreateEvent,
      }}
    >
      {children}
    </PulseContext.Provider>
  );
};

export default PulseContext; 