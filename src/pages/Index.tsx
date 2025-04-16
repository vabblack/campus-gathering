import React, { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import FeaturedEvents from '@/components/FeaturedEvents';
import CategoryFilter from '@/components/CategoryFilter';
import EventCard from '@/components/EventCard';
import Footer from '@/components/Footer';
import CampusPulse from '@/components/CampusPulse';
import { events } from '@/data/events';
import { EventCategory } from '@/types';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All');
  const [animatedElements, setAnimatedElements] = useState<Element[]>([]);

  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter(event => {
        console.log('Comparing:', event.category, selectedCategory);
        return event.category === selectedCategory;
      });

  const handleCategoryChange = (category: EventCategory) => {
    console.log('Category changed to:', category);
    setSelectedCategory(category);
  };

  useEffect(() => {
    console.log('Component re-rendered with category:', selectedCategory);
    // Initialize scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => {
      observer.observe(el);
    });

    setAnimatedElements(Array.from(elements));

    return () => {
      if (animatedElements.length) {
        animatedElements.forEach(el => {
          observer.unobserve(el);
        });
      }
    };
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Hero />
      <FeaturedEvents events={events} />
      
      {/* Replace static Live Campus Pulse section with the component */}
      <CampusPulse />
      
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-8 rounded-lg shadow-lg scroll-reveal border border-yellow-400/20">
            <h2 className="text-3xl font-bold text-white">
              Ready to create your own campus event?
            </h2>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Share your passion with the university community
            </p>
            <div className="mt-8">
              <Link to="/create-event">
                <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 hover:scale-105 transition-all">
                  Start Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
