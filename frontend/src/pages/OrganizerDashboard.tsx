import { useState } from 'react';
import { Plus, Edit, Trash2, Users, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { useEvents } from '../lib/EventsContext';
import { Event } from '../lib/mockData';
import { toast } from 'sonner@2.0.3';

export default function OrganizerDashboard() {
  const { events, addEvent, deleteEvent } = useEvents();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    category: 'Conference',
    date: '',
    time: '',
    venue: '',
    price: '',
    capacity: ''
  });

  const totalRevenue = events.length > 0 ? events.reduce((sum, event) => sum + (event.registered * event.price), 0) : 0;
  const totalAttendees = events.length > 0 ? events.reduce((sum, event) => sum + event.registered, 0) : 0;
  const averageCapacity = events.length > 0 ? events.reduce((sum, event) => sum + ((event.registered / event.capacity) * 100), 0) / events.length : 0;

  const handleCreateEvent = () => {
    // Validation
    if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.time || !newEvent.venue || !newEvent.capacity) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Create new event object
    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      category: newEvent.category,
      date: newEvent.date,
      time: newEvent.time,
      venue: newEvent.venue,
      organizer: 'Chaithanyo S', // Current user
      price: parseFloat(newEvent.price) || 0,
      capacity: parseInt(newEvent.capacity),
      registered: 0,
      featured: false,
      tags: [newEvent.category],
      image: `https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop` // Default event image
    };

    addEvent(event);
    toast.success('Event created successfully!');
    setIsCreateDialogOpen(false);
    setNewEvent({
      title: '',
      description: '',
      category: 'Conference',
      date: '',
      time: '',
      venue: '',
      price: '',
      capacity: ''
    });
  };

  const handleDeleteEvent = (id: string) => {
    deleteEvent(id);
    toast.success('Event deleted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="mb-2">Organizer Dashboard</h1>
            <p className="text-gray-600">Manage your events and track performance</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter event title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your event"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={newEvent.category} onValueChange={(value) => setNewEvent({ ...newEvent, category: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Conference">Conference</SelectItem>
                        <SelectItem value="Concert">Concert</SelectItem>
                        <SelectItem value="Hackathon">Hackathon</SelectItem>
                        <SelectItem value="Workshop">Workshop</SelectItem>
                        <SelectItem value="Cultural">Cultural</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="venue">Venue *</Label>
                    <Input
                      id="venue"
                      placeholder="Event location"
                      value={newEvent.venue}
                      onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Ticket Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0"
                      value={newEvent.price}
                      onChange={(e) => setNewEvent({ ...newEvent, price: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="capacity">Capacity *</Label>
                    <Input
                      id="capacity"
                      type="number"
                      placeholder="100"
                      value={newEvent.capacity}
                      onChange={(e) => setNewEvent({ ...newEvent, capacity: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={handleCreateEvent} className="w-full">
                  Create Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Events</p>
                  <h2>{events.length}</h2>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Attendees</p>
                  <h2>{totalAttendees}</h2>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <h2>${totalRevenue.toLocaleString()}</h2>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg. Capacity</p>
                  <h2>{averageCapacity.toFixed(0)}%</h2>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events Table */}
        <Card>
          <CardHeader>
            <h2>My Events</h2>
          </CardHeader>
          <CardContent>
            {events.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No events created yet</p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  Create Your First Event
                </Button>
              </div>
            ) : (
              <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map(event => {
                  const capacity = (event.registered / event.capacity) * 100;
                  const revenue = event.registered * event.price;
                  
                  return (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div>
                          <div>{event.title}</div>
                          <div className="text-sm text-gray-600">{event.venue}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{event.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>{event.registered} / {event.capacity}</div>
                          <div className="text-sm text-gray-600">{capacity.toFixed(0)}% full</div>
                        </div>
                      </TableCell>
                      <TableCell>${revenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={capacity >= 80 ? 'bg-red-600' : capacity >= 50 ? 'bg-yellow-600' : 'bg-green-600'}>
                          {capacity >= 80 ? 'Almost Full' : 'Available'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
