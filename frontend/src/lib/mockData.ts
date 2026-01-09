export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  price: number;
  image: string;
  capacity: number;
  registered: number;
  featured: boolean;
  tags: string[];
}

export interface Booking {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  tickets: number;
  totalPrice: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}

// Start with empty events array - users will create events
export const mockEvents: Event[] = [];

// Start with empty bookings
export const mockBookings: Booking[] = [];

export const mockUser = {
  name: 'Chaithanya S',
  email: 'chaithanyo@example.com',
  phone: '+1 234 567 8900',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chaithanyo',
  joinedDate: '2024-01-15',
  totalBookings: 0,
  upcomingEvents: 0
};
