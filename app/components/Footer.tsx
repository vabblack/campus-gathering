import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-pink-400">CampusEvents</h3>
            <p className="text-gray-400 text-sm">
              The premier platform for campus event discovery and management. Connect with your community and never miss an event.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-100">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-pink-400 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-pink-400 text-sm">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link to="/create-event" className="text-gray-400 hover:text-pink-400 text-sm">
                  Create Event
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-pink-400 text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* For Organizers */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-100">For Organizers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/organizer" className="text-gray-400 hover:text-pink-400 text-sm">
                  Organizer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="text-gray-400 hover:text-pink-400 text-sm">
                  Event Analytics
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-pink-400 text-sm">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-pink-400 text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-100">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">Email: info@campusevents.com</li>
              <li className="text-gray-400 text-sm">Phone: (123) 456-7890</li>
              <li className="text-gray-400 text-sm">Address: 123 University Ave, Campus City</li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-400">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-gray-400 text-sm">© 2024 CampusEvents. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="text-gray-400 hover:text-pink-400 text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-pink-400 text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 