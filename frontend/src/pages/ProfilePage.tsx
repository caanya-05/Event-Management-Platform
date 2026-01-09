import { useState, useEffect } from 'react';
import { Calendar, Mail, Phone, Edit2, Ticket } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { mockUser } from '../lib/mockData';
import { useEvents } from '../lib/EventsContext';
import { toast } from 'sonner'; // Fixed import
import { getUserProfile, updateUserProfile } from '../api/user';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUser);
  const { bookings, events } = useEvents();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfile();
        setUserData({ ...data, totalBookings: 0, upcomingEvents: 0 }); // Merge with mock stats for now
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      const updatedUser = await updateUserProfile(userData);
      setUserData({ ...updatedUser, totalBookings: 0, upcomingEvents: 0 });
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error('Failed to update profile');
    }
  };

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const pastBookings = bookings.filter(b => b.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={userData.avatar} />
                    <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h2 className="mb-1">{userData.name}</h2>
                  <p className="text-gray-600">{userData.email}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-gray-600" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-gray-600" />
                    <span>{userData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    <span>Joined {new Date(userData.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-t border-b">
                  <div className="text-center">
                    <div className="text-2xl mb-1">{userData.totalBookings}</div>
                    <div className="text-sm text-gray-600">Total Bookings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">{userData.upcomingEvents}</div>
                    <div className="text-sm text-gray-600">Upcoming</div>
                  </div>
                </div>

                <Button
                  className="w-full mt-6"
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="bookings">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Bookings Tab */}
              <TabsContent value="bookings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <h2>Upcoming Events</h2>
                  </CardHeader>
                  <CardContent>
                    {upcomingBookings.length === 0 ? (
                      <div className="text-center py-12">
                        <Ticket className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">No upcoming bookings</p>
                        <Button onClick={() => window.location.href = '/events'}>
                          Browse Events
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {upcomingBookings.map(booking => {
                          const event = events.find(e => e.id === booking.eventId);
                          return (
                            <div key={booking.id} className="flex gap-4 p-4 border rounded-lg">
                              {event && (
                                <>
                                  <div className="flex-1">
                                    <h3 className="mb-2">{booking.eventTitle}</h3>
                                    <div className="space-y-1 text-sm text-gray-600">
                                      <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        {new Date(booking.eventDate).toLocaleDateString('en-US', {
                                          weekday: 'short',
                                          month: 'short',
                                          day: 'numeric',
                                          year: 'numeric'
                                        })}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Ticket className="h-4 w-4" />
                                        {booking.tickets} ticket{booking.tickets > 1 ? 's' : ''}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="mb-2">${booking.totalPrice}</div>
                                    <Badge>{booking.status}</Badge>
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <h2>Past Events</h2>
                  </CardHeader>
                  <CardContent>
                    {pastBookings.length === 0 ? (
                      <p className="text-gray-600 text-center py-8">No past bookings</p>
                    ) : (
                      <div className="space-y-4">
                        {pastBookings.map(booking => (
                          <div key={booking.id} className="flex gap-4 p-4 border rounded-lg">
                            <div className="flex-1">
                              <h3 className="mb-2">{booking.eventTitle}</h3>
                              <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(booking.eventDate).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Ticket className="h-4 w-4" />
                                  {booking.tickets} ticket{booking.tickets > 1 ? 's' : ''}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="mb-2">${booking.totalPrice}</div>
                              <Badge variant="outline">{booking.status}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <h2>Account Settings</h2>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={userData.phone}
                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleSave}>Save Changes</Button>
                          <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <Label>Full Name</Label>
                          <div className="text-gray-700 mt-1">{userData.name}</div>
                        </div>
                        <div>
                          <Label>Email</Label>
                          <div className="text-gray-700 mt-1">{userData.email}</div>
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <div className="text-gray-700 mt-1">{userData.phone}</div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
