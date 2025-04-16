export type UserRole = 'student' | 'organizer' | 'admin' | 'sponsor';

export type EventCategory = 'all' | 'academic' | 'social' | 'sports' | 'career' | 'arts';

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  description: string;
  price?: string;
  category: string;
  featured?: boolean;
}

export type ActiveSpace = 'study' | 'project' | 'club' | 'discussion';

export type PulseContextType = {
  activeTopics: string[];
  setActiveTopics: (topics: string[]) => void;
  activeSpace: ActiveSpace | null;
  setActiveSpace: (space: ActiveSpace | null) => void;
};
