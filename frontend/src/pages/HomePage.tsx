import { Link } from 'react-router-dom';
import { Calendar, Users, Ticket, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useEvents } from '../lib/EventsContext';
import EventCard from '../components/EventCard';

export default function HomePage() {
  const { events } = useEvents();
  const featuredEvents = events.filter(e => e.featured).slice(0, 3);
  const upcomingEvents = events.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl mb-6">Discover Amazing Events</h1>
            <p className="text-xl text-blue-100 mb-8">
              Connect with people who share your interests. Create, manage, and attend events that matter to you.
            </p>
            <div className="flex gap-4">
              <Link to="/events">
                <Button size="lg" variant="secondary">
                  Browse Events
                </Button>
              </Link>
              <Link to="/organizer">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Create Event
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-16">Why Choose Us?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Easy Event Creation */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-3">Easy Event Creation</h3>
                <p className="text-gray-600">
                  Create and manage events in minutes with our intuitive interface.
                </p>
              </CardContent>
            </Card>

            {/* Connect & Network */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mb-3">Connect & Network</h3>
                <p className="text-gray-600">
                  Meet people with shared interests and build meaningful connections.
                </p>
              </CardContent>
            </Card>

            {/* Ticket Management */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Ticket className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mb-3">Ticket Management</h3>
                <p className="text-gray-600">
                  Seamless ticket booking and management for all your events.
                </p>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="mb-3">Analytics</h3>
                <p className="text-gray-600">
                  Track engagement and participation with detailed analytics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12">Upcoming Events</h2>
          
          {events.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 mb-6">No upcoming events yet.</p>
              <Link to="/organizer">
                <Button size="lg">
                  Create the First Event
                </Button>
              </Link>
              <div className="mt-8">
                <Link to="/events">
                  <Button variant="outline">
                    View All Events
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4">Ready to Host Your Event?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of event organizers who are creating amazing experiences on our platform.
          </p>
          <Link to="/organizer">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Create Event Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
