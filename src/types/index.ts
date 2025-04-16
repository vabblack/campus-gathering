export type UserRole = 'student' | 'organizer' | 'admin' | 'sponsor';

export type EventCategory = 'All' | 'Academic' | 'Social' | 'Cultural' | 'Sports' | 'Career' | 'Workshop' | 'Concert' | 'conference' | 'workshop' | 'social' | 'academic' | 'sports' | 'cultural' | 'other';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  image: string;
  category: EventCategory;
  organizer: string;
  ticketPrice: number;
  featured?: boolean;
}

export type ActiveSpace = 'study' | 'project' | 'club' | 'discussion';
