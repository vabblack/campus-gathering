import React, { useEffect, useRef, useState } from 'react';
import Footer from '@/components/Footer';
import { Users, Calendar, MapPin, Heart, Award, Mail, Linkedin, Twitter, Github, Instagram, 
  Sparkles, Trophy, Target, Zap, BookOpen, Music, Camera, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
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

    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(el => {
      observer.observe(el);
    });

    return () => {
      scrollElements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="hero-pattern text-white py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 mix-blend-multiply"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h1 className="text-4xl font-bold text-center mb-8">About Campus Gathering Grid</h1>
            <h2 className="text-2xl text-center mb-12">
              Connecting LPU students with campus events and creating vibrant university experiences.
            </h2>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-24 gradient-bg-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card p-8 md:p-12 scroll-reveal hover:shadow-2xl transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold elegant-text-primary mb-6 relative">
                    <span className="inline-block">Our Mission</span>
                    <div className="absolute -bottom-2 left-0 w-20 h-1 bg-indigo-500"></div>
                  </h2>
                  <p className="text-lg mb-8">
                    Campus Gathering Grid aims to enhance the LPU experience by connecting students with events that matter to them. We believe that a rich campus life contributes significantly to student growth and development.
                  </p>
                  <p className="text-lg elegant-text-secondary leading-relaxed">
                    Our platform makes it easy for students to discover, attend, and create events that foster community, learning, and memorable experiences.
                  </p>
                </div>
                <div className="rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                    alt="Students at an event" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-24 gradient-bg-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 scroll-reveal">
              <h2 className="text-4xl font-bold elegant-text-primary mb-6 relative inline-block">
                Our Values
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-indigo-500"></div>
              </h2>
              <p className="mt-4 text-xl elegant-text-secondary">The principles that guide our platform</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users className="h-12 w-12 text-indigo-500" />,
                  title: "Community Building",
                  description: "We foster connections among students, faculty, and staff to create a vibrant campus community."
                },
                {
                  icon: <Calendar className="h-12 w-12 text-indigo-500" />,
                  title: "Accessibility",
                  description: "Making event information accessible to all students, regardless of their background or interests."
                },
                {
                  icon: <Heart className="h-12 w-12 text-indigo-500" />,
                  title: "Student Empowerment",
                  description: "Enabling students to take initiative and create their own events to enrich campus life."
                }
              ].map((value, index) => (
                <div 
                  key={index} 
                  className="glass-card p-8 text-center scroll-reveal hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300" 
                  style={{transitionDelay: `${index * 0.1}s`}}
                >
                  <div className="inline-block p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl mb-6 shadow-lg">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-semibold elegant-text-primary mb-4">{value.title}</h3>
                  <p className="elegant-text-secondary leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-24 bg-gradient-to-br from-indigo-600 to-purple-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: "15,000+", label: "Students Connected" },
                { value: "1,200+", label: "Events Hosted" },
                { value: "200+", label: "Student Organizations" },
                { value: "95%", label: "Student Satisfaction" }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center p-8 glass-card staggered-item hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300" 
                  style={{background: "rgba(255,255,255,0.15)", animationDelay: `${index * 0.1}s`}}
                >
                  <div className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">{stat.value}</div>
                  <div className="text-lg text-indigo-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-24 gradient-bg-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 scroll-reveal">
              <h2 className="text-4xl font-bold elegant-text-primary mb-6 relative inline-block">
                Our Team
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-indigo-500"></div>
              </h2>
              <p className="mt-4 text-xl elegant-text-secondary">The passionate individuals driving Campus Gathering Grid forward</p>
            </div>
            
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
                {[
                  {
                    name: "Vaibhav",
                    role: "Head of Operations",
                    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
                    socialLinks: {
                      linkedin: "https://linkedin.com/in/vaibhav",
                      twitter: "https://twitter.com/vaibhav",
                      github: "https://github.com/vaibhav"
                    }
                  },
                  {
                    name: "Yash",
                    role: "Technical Lead",
                    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
                    socialLinks: {
                      linkedin: "https://linkedin.com/in/yash",
                      github: "https://github.com/yash",
                      instagram: "https://instagram.com/yash"
                    }
                  }
                ].map((member, index) => (
                  <div 
                    key={index} 
                    className="glass-card scroll-reveal w-72 h-72 group hover:shadow-2xl transition-all duration-500 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 relative overflow-hidden mx-auto" 
                    style={{transitionDelay: `${index * 0.1}s`}}
                  >
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-all duration-500"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">
                      <h3 className="text-xl font-bold text-white truncate">{member.name}</h3>
                      <p className="text-sm font-medium text-gray-300 mb-3 truncate">{member.role}</p>
                      
                      <div className="flex items-center justify-center space-x-3">
                        {member.socialLinks.linkedin && (
                          <a 
                            href={member.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white/10 hover:bg-indigo-500/50 transition-colors duration-300"
                          >
                            <Linkedin className="h-4 w-4 text-white" />
                          </a>
                        )}
                        {member.socialLinks.twitter && (
                          <a 
                            href={member.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white/10 hover:bg-indigo-500/50 transition-colors duration-300"
                          >
                            <Twitter className="h-4 w-4 text-white" />
                          </a>
                        )}
                        {member.socialLinks.github && (
                          <a 
                            href={member.socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white/10 hover:bg-indigo-500/50 transition-colors duration-300"
                          >
                            <Github className="h-4 w-4 text-white" />
                          </a>
                        )}
                        {member.socialLinks.instagram && (
                          <a 
                            href={member.socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white/10 hover:bg-indigo-500/50 transition-colors duration-300"
                          >
                            <Instagram className="h-4 w-4 text-white" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-yellow-500/20" />
            
            {/* Animated shapes */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-yellow-500/20 rounded-full blur-3xl animate-float-delayed" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-3xl animate-pulse" />
            
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f61a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f61a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16 scroll-reveal">
              <h2 className="text-4xl font-bold text-white mb-6 relative inline-block">
                Contact Us
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-500"></div>
              </h2>
              <p className="mt-4 text-xl text-gray-300">Have questions or feedback? Reach out to our team.</p>
            </div>
            
            <div className="glass-card p-10 scroll-reveal backdrop-blur-lg bg-gray-900/80 shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-500/20 rounded-2xl">
              <form className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block font-medium text-white text-lg">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="glass-input w-full px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400 bg-gray-800/50 text-white placeholder:text-gray-400 border border-gray-700"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block font-medium text-white text-lg">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="glass-input w-full px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400 bg-gray-800/50 text-white placeholder:text-gray-400 border border-gray-700"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="block font-medium text-white text-lg">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="glass-input w-full px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400 bg-gray-800/50 text-white placeholder:text-gray-400 border border-gray-700"
                    placeholder="Subject of your message"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="block font-medium text-white text-lg">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    className="glass-input w-full px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400 bg-gray-800/50 text-white placeholder:text-gray-400 resize-none border border-gray-700"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 text-white hover:scale-105 transition-all duration-300 py-3 text-lg font-semibold rounded-xl"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-24 gradient-bg-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 scroll-reveal">
              <h2 className="text-4xl font-bold elegant-text-primary mb-6 relative inline-block">
                Frequently Asked Questions
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-indigo-500"></div>
              </h2>
              <p className="mt-4 text-xl elegant-text-secondary">Answers to common questions about our platform</p>
            </div>
            
            <div className="glass-card divide-y divide-gray-200/10 scroll-reveal rounded-2xl overflow-hidden">
              {[
                {
                  question: "How do I create my own event?",
                  answer: "You can create an event by clicking on the 'Create Event' button in the navigation menu. Fill out the event details form, add an image, and submit for approval."
                },
                {
                  question: "Are all events free to attend?",
                  answer: "No, some events may require a ticket purchase. Each event listing will clearly indicate if there is a fee to attend and the ticket price."
                },
                {
                  question: "How can I promote my student organization's events?",
                  answer: "Create an account for your organization, then create events through that account. You can also contact us to feature your events on our homepage."
                },
                {
                  question: "Can I edit an event after publishing it?",
                  answer: "Yes, you can edit your event's details anytime before it occurs. Just go to your event management dashboard to make changes."
                },
                {
                  question: "How can I get notified about new events?",
                  answer: "Sign up for an account and set your notification preferences to receive updates about new events in categories you're interested in."
                }
              ].map((faq, index) => (
                <div 
                  key={index} 
                  className="py-8 px-6 sm:px-8 hover:bg-gray-50/5 transition-colors duration-200 staggered-item" 
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <h3 className="text-xl font-medium elegant-text-primary mb-4">{faq.question}</h3>
                  <p className="elegant-text-secondary leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
