export type UserRole = 'student' | 'organizer' | 'admin' | 'sponsor';

export type EventCategory = 'all' | 'academic' | 'social' | 'sports' | 'career' | 'arts' | 'cultural' | 'workshop' | 'concert' | 'All' | 'Academic' | 'Social' | 'Sports' | 'Career' | 'Workshop' | 'Concert' | 'Cultural';

export interface Event {
  id: number | string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  description: string;
  price?: string;
  ticketPrice?: number;
  category: string;
  featured?: boolean;
  mentions?: number;
  organizer?: string;
  submit?: string;
}

export type ActiveSpace = 'study' | 'project' | 'club' | 'discussion';

export type PulseContextType = {
  activeTopics: string[];
  setActiveTopics: (topics: string[]) => void;
  activeSpace: ActiveSpace | null;
  setActiveSpace: (space: ActiveSpace | null) => void;
};

export interface TopicType {
  id: string | number;
  name: string;
  title?: string;
  engagement?: number;
  mentions?: number;
}

export interface SearchResult {
  id: number;
  title: string;
  type: string;
}

export interface SpaceInfo {
  id: string;
  title: string;
  participants: number;
  count?: number;
  location?: string;
}

export type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};
