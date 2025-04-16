import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePulseContext } from '@/contexts/PulseContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Calendar, Camera, Settings, Bell, Shield, LogOut, MapPin, Users, Zap, MessageSquare, BookOpen, Heart } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const { liveEvents, activeSpaces, trendingTopics, totalOnline } = usePulseContext();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto">
            <User className="h-8 w-8 text-yellow-400" />
          </div>
          <p className="text-gray-300">Please sign in to view your profile.</p>
          <Button variant="outline" className="border-yellow-400/20 text-yellow-400 hover:bg-yellow-400/10" onClick={() => window.location.href = '/signin'}>
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 bg-[url('/images/auth-bg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-yellow-400/20 via-purple-500/20 to-pink-500/20 animate-gradient-xy"></div>
      
      {/* 3D Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      {/* Animated floating shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative min-h-screen w-full z-10 py-16 px-4 overflow-x-hidden">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="glass-card border-0">
            <CardHeader className="space-y-6 text-center pb-10">
              <div className="relative w-32 h-32 mx-auto">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500 p-1">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                    <User className="h-16 w-16 text-yellow-400" />
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 bg-yellow-400 p-2 rounded-full text-black hover:bg-yellow-500 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div>
                <CardTitle className="text-3xl font-bold text-yellow-400">{user.name}</CardTitle>
                <CardDescription className="text-gray-400">Account Holder</CardDescription>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-yellow-400">Account Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-800/40 backdrop-blur-sm">
                      <Mail className="h-5 w-5 text-yellow-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-200">Email</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-800/40 backdrop-blur-sm">
                      <Calendar className="h-5 w-5 text-yellow-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-200">Member Since</p>
                        <p className="text-sm text-gray-400">{new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-yellow-400">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="flex items-center space-x-2 border-yellow-400/20 text-yellow-400 hover:bg-yellow-400/10">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2 border-yellow-400/20 text-yellow-400 hover:bg-yellow-400/10">
                      <Bell className="h-4 w-4" />
                      <span>Notifications</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2 border-yellow-400/20 text-yellow-400 hover:bg-yellow-400/10">
                      <Shield className="h-4 w-4" />
                      <span>Security</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2 border-yellow-400/20 text-yellow-400 hover:bg-yellow-400/10" onClick={logout}>
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campus Pulse Section */}
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-yellow-400">Your Campus Pulse</CardTitle>
              <CardDescription className="text-gray-400">
                Stay connected with campus activities and events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Live Events */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Live Events
                  </h4>
                  <div className="space-y-3">
                    {liveEvents.map((event) => (
                      <div key={event.id} className="p-3 rounded-lg bg-gray-800/40 backdrop-blur-sm">
                        <p className="text-sm font-medium text-gray-200">{event.title || 'Untitled Event'}</p>
                        <div className="flex items-center space-x-2 mt-1 text-xs text-gray-400">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location || 'Unknown Location'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Spaces */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-green-400 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Active Spaces
                  </h4>
                  <div className="space-y-3">
                    {activeSpaces.map((space) => (
                      <div key={space.id} className="p-3 rounded-lg bg-gray-800/40 backdrop-blur-sm">
                        <p className="text-sm font-medium text-gray-200">
                          {space.type.charAt(0).toUpperCase() + space.type.slice(1)} Group
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {space.count || 0} active members
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trending Topics */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-pink-400 flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Trending Topics
                  </h4>
                  <div className="space-y-3">
                    {trendingTopics.map((topic) => (
                      <div key={topic.id} className="p-3 rounded-lg bg-gray-800/40 backdrop-blur-sm">
                        <p className="text-sm font-medium text-gray-200">{topic.title || topic.name}</p>
                        <p className="text-xs text-gray-400 mt-1">{topic.mentions || topic.engagement} interactions</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  {totalOnline} students currently online
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile; 