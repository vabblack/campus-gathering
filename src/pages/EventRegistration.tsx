import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { events } from '@/data/events';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { formatCurrency } from '@/lib/utils';

const EventRegistration = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState(events.find(e => e.id === id));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    department: '',
    numberOfTickets: 1,
    paymentMethod: 'upi'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!event) {
      navigate('/events');
    }
  }, [event, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call for registration
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate UPI payment details
      const amount = (event?.ticketPrice || 0) * formData.numberOfTickets;
      const upiDetails = {
        upiId: "campusgathering@upi", // Fixed merchant UPI ID
        name: "Campus Gathering Grid", // Merchant name
        amount: amount,
        description: `Payment for ${event!.title} - ${formData.name}`,
        merchantName: "Campus Gathering Grid"
      };

      // Store payment details in localStorage for the payment confirmation page
      localStorage.setItem('pendingPayment', JSON.stringify(upiDetails));
      
      // Navigate to payment confirmation page
      navigate(`/event/${event!.id}/payment-confirmation`);
      
    } catch (err) {
      setError('Failed to process registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!event) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#1e1b4b] via-[#2e1065] to-[#3b0764]">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-purple-500/5 to-blue-500/5 animate-gradient-xy" />
        
        {/* Animated shapes */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 right-1/4 w-[28rem] h-[28rem] bg-yellow-400/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-1/3 w-[32rem] h-[32rem] bg-purple-600/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/4 right-1/3 w-[24rem] h-[24rem] bg-yellow-600/10 rounded-full blur-3xl animate-pulse" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] opacity-10" />

        {/* Additional animated elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-yellow-300 rounded-full animate-ping" />
          <div className="absolute top-3/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping delay-300" />
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-yellow-200 rounded-full animate-ping delay-700" />
        </div>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="glass-card p-8 animate-fade-in backdrop-blur-xl bg-black/40 border border-white/10 shadow-2xl rounded-xl">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 mb-6">
            Register for {event.title}
          </h1>
          
          <div className="mb-8 glass-card p-6 rounded-lg border border-yellow-400/20 backdrop-blur-xl bg-black/40">
            <h2 className="text-xl font-semibold text-white mb-2">Event Details</h2>
            <div className="space-y-2 text-gray-300">
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Time: {event.time}</p>
              <p>Location: {event.location}</p>
              <p>Price: {formatCurrency(event.ticketPrice)} per ticket</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-200">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="glass-input bg-black/40 border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="glass-input bg-black/40 border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-200">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="glass-input bg-black/40 border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentId" className="text-gray-200">Student ID</Label>
                <Input
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  required
                  className="glass-input bg-black/40 border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department" className="text-gray-200">Department</Label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  className="glass-input bg-black/40 border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfTickets" className="text-gray-200">Number of Tickets</Label>
                <Input
                  id="numberOfTickets"
                  name="numberOfTickets"
                  type="number"
                  min="1"
                  value={formData.numberOfTickets}
                  onChange={handleInputChange}
                  required
                  className="glass-input bg-black/40 border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-gray-200">Payment Method</Label>
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upi" id="upi" className="border-yellow-400/50" />
                  <Label htmlFor="upi" className="text-gray-300">UPI Payment</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="glass-card p-6 rounded-lg border border-yellow-400/20 backdrop-blur-xl bg-black/40">
              <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400 mb-2">
                Payment Summary
              </h3>
              <div className="space-y-2 text-gray-300">
                <p>Number of Tickets: {formData.numberOfTickets}</p>
                <p>Price per Ticket: {formatCurrency(event.ticketPrice)}</p>
                <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">
                  Total Amount: {formatCurrency((event?.ticketPrice || 0) * formData.numberOfTickets)}
                </p>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-900/20 border border-red-500/20 rounded-lg p-3">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? 'Processing...' : 'Complete Registration'}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventRegistration; 