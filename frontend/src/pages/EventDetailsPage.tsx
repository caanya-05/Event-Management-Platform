import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, DollarSign, Clock, Tag, ArrowLeft, Share2, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { useEvents } from '../lib/EventsContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events } = useEvents();
  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">Event Not Found</h2>
          <Button onClick={() => navigate('/events')}>Back to Events</Button>
        </div>
      </div>
    );
  }

  const percentage = (event.registered / event.capacity) * 100;
  const availableSeats = event.capacity - event.registered;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-96 bg-gray-900">
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute top-4 left-4">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 mb-4">
              <Badge className="bg-blue-600">{event.category}</Badge>
              {event.featured && <Badge className="bg-yellow-500">Featured</Badge>}
            </div>
            <h1 className="text-white mb-2">{event.title}</h1>
            <p className="text-white/90">Organized by {event.organizer}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4">About This Event</h2>
                <p className="text-gray-700">{event.description}</p>
              </CardContent>
            </Card>

            {/* Event Details */}
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4">Event Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600">Date & Time</div>
                      <div>
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-gray-600">{event.time}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600">Venue</div>
                      <div>{event.venue}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600">Capacity</div>
                      <div>{event.capacity} attendees</div>
                      <div className="text-gray-600">{event.registered} registered</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600">Price</div>
                      <div>
                        {event.price === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `$${event.price}`
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3">Tags</h3>
                <div className="flex gap-2 flex-wrap">
                  {event.tags.map(tag => (
                    <Badge key={tag} variant="outline">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Organizer */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4">Organizer</h3>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback>{event.organizer[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div>{event.organizer}</div>
                    <div className="text-sm text-gray-600">Event Organizer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6 space-y-6">
                {/* Price */}
                <div>
                  <div className="text-sm text-gray-600 mb-1">Ticket Price</div>
                  {event.price === 0 ? (
                    <div className="text-3xl text-green-600">Free</div>
                  ) : (
                    <div className="text-3xl">${event.price}</div>
                  )}
                </div>

                {/* Availability */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Seats Available</span>
                    <span>{availableSeats} / {event.capacity}</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                  <div className="text-sm text-gray-600 mt-1">
                    {percentage.toFixed(0)}% filled
                  </div>
                </div>

                {/* Booking Button */}
                <Link to={`/booking/${event.id}`} className="block">
                  <Button className="w-full" size="lg" disabled={availableSeats === 0}>
                    {availableSeats === 0 ? 'Sold Out' : 'Book Now'}
                  </Button>
                </Link>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Heart className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                {/* Quick Info */}
                <div className="border-t pt-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-600">Event starts in</span>
                  </div>
                  <div className="text-2xl">
                    {Math.ceil((new Date(event.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
