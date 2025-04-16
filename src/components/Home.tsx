import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Home: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800/50 backdrop-blur-xl border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-yellow-400 text-xl font-bold">Campus Events</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user?.name}</span>
              <Button
                onClick={logout}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-lg border border-gray-700">
              <h2 className="text-xl font-semibold text-yellow-400 mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <Link to="/create-event">
                  <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
                    Create New Event
                  </Button>
                </Link>
                <Link to="/events">
                  <Button className="w-full bg-gray-700 text-white hover:bg-gray-600">
                    Browse Events
                  </Button>
                </Link>
              </div>
            </div>

            {/* User Profile */}
            <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-lg border border-gray-700">
              <h2 className="text-xl font-semibold text-yellow-400 mb-4">Your Profile</h2>
              <div className="space-y-2">
                <p className="text-gray-300">Name: {user?.name}</p>
                <p className="text-gray-300">Email: {user?.email}</p>
                <Button 
                  variant="outline" 
                  className="mt-4 w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Edit Profile
                </Button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-lg border border-gray-700">
              <h2 className="text-xl font-semibold text-yellow-400 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <p className="text-gray-400">No recent activity to show.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home; 