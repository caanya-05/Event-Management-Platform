import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Event, Booking, mockBookings as initialBookings } from './mockData';
import { getEvents, createEvent as apiCreateEvent, deleteEvent as apiDeleteEvent } from '../api/events';
import { toast } from 'sonner';

interface EventsContextType {
  events: Event[];
  bookings: Booking[];
  addEvent: (event: Event) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  addBooking: (booking: Booking) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      // Map _id to id if necessary, or ensure backend returns id
      const mappedEvents = data.map((e: any) => ({ ...e, id: e._id || e.id }));
      setEvents(mappedEvents);
    } catch (error) {
      console.error("Failed to fetch events", error);
      toast.error("Failed to load events");
    }
  };

  const addEvent = async (event: Event) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...eventData } = event; // Remove ID as backend generates it
      const newEvent = await apiCreateEvent(eventData);
      setEvents(prev => [...prev, { ...newEvent, id: newEvent._id || newEvent.id }]);
    } catch (error) {
      console.error("Failed to create event", error);
      toast.error("Failed to create event");
    }
  };

  const updateEvent = (id: string, updatedEvent: Partial<Event>) => {
    setEvents(prev => prev.map(event =>
      event.id === id ? { ...event, ...updatedEvent } : event
    ));
  };

  const deleteEvent = async (id: string) => {
    try {
      await apiDeleteEvent(id);
      setEvents(prev => prev.filter(event => event.id !== id));
    } catch (error) {
      console.error("Failed to delete event", error);
      toast.error("Failed to delete event");
    }
  };

  const addBooking = (booking: Booking) => {
    setBookings(prev => [...prev, booking]);
  };

  return (
    <EventsContext.Provider value={{ events, bookings, addEvent, updateEvent, deleteEvent, addBooking }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
}
