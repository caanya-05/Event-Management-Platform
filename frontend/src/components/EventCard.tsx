import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Tag } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Event } from '../lib/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const percentage = (event.registered / event.capacity) * 100;
  const availableSeats = event.capacity - event.registered;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        {event.featured && (
          <Badge className="absolute top-2 right-2 bg-yellow-500">
            Featured
          </Badge>
        )}
        <Badge className="absolute top-2 left-2">
          {event.category}
        </Badge>
      </div>

      <CardHeader>
        <h3>{event.title}</h3>
        <p className="text-gray-600 line-clamp-2">{event.description}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{new Date(event.date).toLocaleDateString('en-US', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })} at {event.time}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{event.venue}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          <span>{event.registered} / {event.capacity} registered ({percentage.toFixed(0)}% full)</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Tag className="h-4 w-4 text-gray-600" />
          <div className="flex gap-1 flex-wrap">
            {event.tags.map(tag => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div>
          {event.price === 0 ? (
            <span className="text-green-600">Free</span>
          ) : (
            <span>${event.price}</span>
          )}
        </div>
        <Link to={`/events/${event.id}`}>
          <Button>
            {availableSeats > 0 ? 'View Details' : 'Sold Out'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
