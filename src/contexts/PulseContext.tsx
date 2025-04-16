import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import { ActiveSpace } from '@/types';

// Types for our pulse data
export type LiveEvent = {
  id: string;
  title: string;
  location: string;
  status: 'live' | 'soon' | 'upcoming';
  time: string;
};

export type TrendingTopic = {
  id: string;
  rank: number;
  title: string;
  mentions: string;
};

interface PulseContextType {
  activeSpaces: { id: string; type: ActiveSpace; name: string }[];
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
  joinSpace: (spaceType: ActiveSpace['type']) => void;
  navigateToCreateEvent: (navigate: any) => void;
}

const defaultContext: PulseContextType = {
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

const PulseContext = createContext<PulseContextType>(defaultContext);

export const usePulse = () => useContext(PulseContext);

export const PulseProvider = ({ children }: { children: ReactNode }) => {
  const [activeSpaces, setActiveSpaces] = useState<{ id: string; type: ActiveSpace; name: string }[]>([
    { id: '1', type: 'study', name: 'Finals Prep Group' },
    { id: '2', type: 'club', name: 'Photography Club' },
    { id: '3', type: 'project', name: 'Senior Thesis' }
  ]);

  const [liveEvents, setLiveEvents] = useState([
    { id: '1', title: 'Campus Orientation', participants: 156 },
    { id: '2', title: 'Tech Workshop', participants: 42 },
    { id: '3', title: 'Career Fair', participants: 89 }
  ]);

  const [trendingTopics, setTrendingTopics] = useState([
    { id: '1', name: 'Course Registration', engagement: 89 },
    { id: '2', name: 'Internship Opportunities', engagement: 76 },
    { id: '3', name: 'Campus Events', engagement: 65 }
  ]);

  const [totalOnline] = useState<number>(1200);

  const addSpace = (type: ActiveSpace, name: string) => {
    const newSpace = {
      id: Date.now().toString(),
      type,
      name
    };
    setActiveSpaces([...activeSpaces, newSpace]);
  };

  const removeSpace = (id: string) => {
    setActiveSpaces(activeSpaces.filter(space => space.id !== id));
  };

  // Actions
  const createEvent = () => {
    toast.success('Redirecting to event creation page', {
      description: 'You can create your own campus event here.',
      action: {
        label: 'Continue',
        onClick: () => window.location.href = '/create-event',
      },
    });
  };
  
  // New function that uses React Router's navigate
  const navigateToCreateEvent = (navigate: any) => {
    toast.success('Redirecting to event creation page', {
      description: 'You can create your own campus event here.',
    });
    navigate('/create-event');
  };

  const joinGroup = () => {
    toast.success('Choose a group to join', {
      description: 'Select from available study groups, projects, clubs, or discussions.',
      action: {
        label: 'Browse',
        onClick: () => console.log('Browse groups clicked'),
      },
    });
  };

  const updateInterests = () => {
    toast.success('Update your interests', {
      description: 'Customize your feed based on what matters to you.',
      action: {
        label: 'Select',
        onClick: () => console.log('Select interests clicked'),
      },
    });
  };

  const exploreEvents = () => {
    toast.success('Explore campus locations', {
      description: 'Discover events happening around campus.',
      action: {
        label: 'View Map',
        onClick: () => console.log('View map clicked'),
      },
    });
  };

  const joinEvent = (eventId: string) => {
    const event = liveEvents.find(e => e.id === eventId);
    if (event) {
      toast.success(`Joining event: ${event.title}`, {
        description: `You are now registered for this event at ${event.location}`,
      });
    }
  };

  const joinSpace = (spaceType: ActiveSpace['type']) => {
    const space = activeSpaces.find(s => s.type === spaceType);
    if (space) {
      const spaceTypes = {
        study: 'Study Group',
        project: 'Project Team',
        club: 'Club Meeting',
        discussion: 'Discussion'
      };
      
      toast.success(`Joining ${spaceTypes[spaceType]}`, {
        description: `You've been added to the group.`,
      });
    }
  };

  return (
    <PulseContext.Provider
      value={{
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
        navigateToCreateEvent
      }}
    >
      {children}
    </PulseContext.Provider>
  );
};

export default PulseContext; 