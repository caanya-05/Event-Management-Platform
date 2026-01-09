import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, CreditCard, User, Mail, Phone, Ticket, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useEvents } from '../lib/EventsContext';
import { Booking } from '../lib/mockData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, addBooking } = useEvents();
  const event = events.find(e => e.id === id);
  
  const [tickets, setTickets] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

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

  const availableSeats = event.capacity - event.registered;
  const totalPrice = tickets * event.price;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      if (event) {
        const booking: Booking = {
          id: Date.now().toString(),
          eventId: event.id,
          eventTitle: event.title,
          eventDate: event.date,
          tickets: tickets,
          totalPrice: totalPrice,
          status: 'upcoming'
        };
        addBooking(booking);
      }
      
      setIsProcessing(false);
      setBookingComplete(true);
      toast.success('Booking confirmed! Check your email for details.');
    }, 2000);
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-12 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Your booking for {event.title} has been confirmed. 
              A confirmation email has been sent to {formData.email}.
            </p>
            <div className="space-y-2">
              <Button className="w-full" onClick={() => navigate('/profile')}>
                View My Bookings
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate('/events')}>
                Browse More Events
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <h1 className="mb-8">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <h2>Personal Information</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 234 567 8900"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ticket Selection */}
              <Card>
                <CardHeader>
                  <h2>Select Tickets</h2>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Ticket className="h-5 w-5 text-blue-600" />
                        <span>Number of Tickets</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {availableSeats} seats available
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setTickets(Math.max(1, tickets - 1))}
                      >
                        -
                      </Button>
                      <span className="text-xl w-12 text-center">{tickets}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setTickets(Math.min(availableSeats, tickets + 1))}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              {event.price > 0 && (
                <Card>
                  <CardHeader>
                    <h2>Payment Information</h2>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="pl-10"
                          required={event.price > 0}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required={event.price > 0}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required={event.price > 0}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                {isProcessing ? 'Processing...' : event.price > 0 ? `Pay $${totalPrice}` : 'Confirm Booking'}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <h2>Order Summary</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Event Image */}
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Event Details */}
                <div>
                  <h3 className="mb-2">{event.title}</h3>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 mt-0.5" />
                      <div>
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })} at {event.time}
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5" />
                      <div>{event.venue}</div>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ticket Price</span>
                    <span>${event.price === 0 ? '0' : event.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Number of Tickets</span>
                    <span>× {tickets}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Service Fee</span>
                    <span>$0</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span>Total</span>
                    <span className="text-xl">${totalPrice}</span>
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
