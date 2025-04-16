import React from 'react';
import { Calendar, Users, Zap, MapPin, Heart, Trophy, Target, Sparkles, BookOpen, Music, Palette } from 'lucide-react';
import Footer from '../components/Footer';

const HomePage = () => {
  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Live Activity Showcase */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
        {/* Interactive background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff08_0,transparent_100%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
              Live Campus Pulse
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
          </div>

          {/* Live Activity Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Upcoming Events Card */}
            <div className="glass-card relative overflow-hidden group cursor-pointer">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Live Events</h3>
                  </div>
                  <span className="animate-pulse flex h-3 w-3">
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    </span>
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div 
                    onClick={() => navigateTo('/events/tech-hackathon-2024')}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <div>
                      <p className="text-white font-medium">Tech Hackathon 2024</p>
                      <p className="text-sm text-gray-400">Main Auditorium • Now</p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                      Live
                    </span>
                  </div>
                  <div 
                    onClick={() => navigateTo('/events/ai-workshop')}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <div>
                      <p className="text-white font-medium">AI Workshop</p>
                      <p className="text-sm text-gray-400">Room 301 • In 30m</p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                      Soon
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Spaces Card */}
            <div className="glass-card relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Active Spaces</h3>
                  </div>
                  <div className="text-sm text-gray-400">1.2k online</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div 
                    onClick={() => navigateTo('/spaces/study-groups')}
                    className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-center cursor-pointer">
                    <div className="text-2xl font-bold text-white mb-1">12</div>
                    <p className="text-sm text-gray-400">Study Groups</p>
                  </div>
                  <div 
                    onClick={() => navigateTo('/spaces/project-teams')}
                    className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-center cursor-pointer">
                    <div className="text-2xl font-bold text-white mb-1">8</div>
                    <p className="text-sm text-gray-400">Project Teams</p>
                  </div>
                  <div 
                    onClick={() => navigateTo('/spaces/club-meetings')}
                    className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-center cursor-pointer">
                    <div className="text-2xl font-bold text-white mb-1">5</div>
                    <p className="text-sm text-gray-400">Club Meetings</p>
                  </div>
                  <div 
                    onClick={() => navigateTo('/spaces/discussions')}
                    className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-center cursor-pointer">
                    <div className="text-2xl font-bold text-white mb-1">15</div>
                    <p className="text-sm text-gray-400">Discussions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trending Topics Card */}
            <div className="glass-card relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Trending Now</h3>
                </div>

                <div className="space-y-3">
                  <div 
                    onClick={() => navigateTo('/trending/spring-festival')}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <span className="text-2xl font-bold text-orange-500">#1</span>
                    <div>
                      <p className="text-white font-medium">Spring Festival</p>
                      <p className="text-sm text-gray-400">2.5k mentions</p>
                    </div>
                  </div>
                  <div 
                    onClick={() => navigateTo('/trending/tech-week')}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <span className="text-2xl font-bold text-orange-400">#2</span>
                    <div>
                      <p className="text-white font-medium">Tech Week</p>
                      <p className="text-sm text-gray-400">1.8k mentions</p>
                    </div>
                  </div>
                  <div 
                    onClick={() => navigateTo('/trending/career-fair')}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <span className="text-2xl font-bold text-orange-300">#3</span>
                    <div>
                      <p className="text-white font-medium">Career Fair</p>
                      <p className="text-sm text-gray-400">1.2k mentions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a 
              href="/create-event"
              className="p-4 glass-card rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group no-underline"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <span className="text-white font-medium">Create Event</span>
              </div>
            </a>
            
            <a 
              href="/groups"
              className="p-4 glass-card rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group no-underline"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="text-white font-medium">Join Group</span>
              </div>
            </a>
            
            <a 
              href="/interests"
              className="p-4 glass-card rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group no-underline"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-white font-medium">Interests</span>
              </div>
            </a>
            
            <a 
              href="/explore"
              className="p-4 glass-card rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 group no-underline"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <span className="text-white font-medium">Explore</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Campus Impact Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
        {/* Interactive background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff08_0,transparent_100%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
              Campus Impact
            </h2>
            <p className="text-xl text-gray-300">Real stories and statistics that showcase our platform's influence</p>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"></div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Event Success Card */}
            <div className="glass-card p-6 backdrop-blur-lg bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Event Success</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Average Attendance</span>
                  <span className="text-2xl font-bold text-green-400">92%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Events This Month</span>
                  <span className="text-2xl font-bold text-green-400">45+</span>
                </div>
              </div>
            </div>

            {/* Student Engagement Card */}
            <div className="glass-card p-6 backdrop-blur-lg bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Student Engagement</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Active Users</span>
                  <span className="text-2xl font-bold text-blue-400">8.5K+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Monthly Growth</span>
                  <span className="text-2xl font-bold text-blue-400">15%</span>
                </div>
              </div>
            </div>

            {/* Platform Growth Card */}
            <div className="glass-card p-6 backdrop-blur-lg bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Platform Growth</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">New Features</span>
                  <span className="text-2xl font-bold text-purple-400">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">User Satisfaction</span>
                  <span className="text-2xl font-bold text-purple-400">96%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="glass-card p-8 backdrop-blur-lg bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-6">Event Categories</h3>
              <div className="space-y-4">
                {[
                  { category: "Academic", icon: <BookOpen className="w-5 h-5" />, percentage: 35 },
                  { category: "Cultural", icon: <Music className="w-5 h-5" />, percentage: 25 },
                  { category: "Sports", icon: <Trophy className="w-5 h-5" />, percentage: 20 },
                  { category: "Arts", icon: <Palette className="w-5 h-5" />, percentage: 15 },
                  { category: "Other", icon: <Zap className="w-5 h-5" />, percentage: 5 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">{item.category}</span>
                        <span className="text-white">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 backdrop-blur-lg bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-6">Impact Highlights</h3>
              <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <h4 className="text-lg font-medium text-white">Record Attendance</h4>
                  </div>
                  <p className="text-gray-300">Tech Symposium 2024 broke attendance records with over 2,000 participants!</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <Heart className="w-5 h-5 text-red-400" />
                    <h4 className="text-lg font-medium text-white">Community Growth</h4>
                  </div>
                  <p className="text-gray-300">50+ new student organizations joined our platform this semester.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <Zap className="w-5 h-5 text-blue-400" />
                    <h4 className="text-lg font-medium text-white">Platform Milestone</h4>
                  </div>
                  <p className="text-gray-300">Successfully facilitated over 1,000 events in the past year!</p>
                </div>
              </div>
            </div>
          </div>
      </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage; 