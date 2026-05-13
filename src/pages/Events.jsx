import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';

const Events = () => {
  const events = [
    {
      title: 'Annual Convocation',
      date: 'March 15, 2026',
      time: '10:00 AM',
      location: 'Main Auditorium',
      category: 'Academic',
      description: 'Degree awarding ceremony for graduating students'
    },
    {
      title: 'Tech Summit 2026',
      date: 'April 5-6, 2026',
      time: '9:00 AM',
      location: 'Block 5 (UIET)',
      category: 'Workshop',
      description: 'Latest trends in technology and innovation'
    },
    {
      title: 'Sports Festival',
      date: 'April 20, 2026',
      time: '8:00 AM',
      location: 'Sports Stadium',
      category: 'Sports',
      description: 'Inter-college sports competitions and events'
    },
    {
      title: 'Freshers Welcome',
      date: 'May 1, 2026',
      time: '2:00 PM',
      location: 'Auditorium & Grounds',
      category: 'Social',
      description: 'Welcome program for new students'
    },
    {
      title: 'Innovation Challenge',
      date: 'May 10-12, 2026',
      time: '9:00 AM',
      location: 'Workshop Center',
      category: 'Innovation',
      description: 'Hackathon and innovation competition'
    },
    {
      title: 'Cultural Fest',
      date: 'June 1, 2026',
      time: '5:00 PM',
      location: 'Main Campus Grounds',
      category: 'Cultural',
      description: 'Music, dance, drama, and cultural performances'
    }
  ];

  const categoryColors = {
    Academic: 'bg-blue-100 text-blue-800',
    Workshop: 'bg-purple-100 text-purple-800',
    Sports: 'bg-green-100 text-green-800',
    Social: 'bg-pink-100 text-pink-800',
    Innovation: 'bg-orange-100 text-orange-800',
    Cultural: 'bg-red-100 text-red-800'
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 md:py-24 flex justify-center w-full">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Campus Events</h1>
          <p className="text-xl opacity-90">Join us for exciting events throughout the academic year</p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-12 md:py-24 bg-gray-50 flex justify-center w-full">
        <div className="max-w-4xl mx-auto px-4 w-full">
          <div className="space-y-6">
            {events.map((event, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:scale-102"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Date Section */}
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 md:w-40 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm font-semibold opacity-90">📅</div>
                      <div className="text-2xl font-bold">{event.date.split(' ')[0]}</div>
                      <div className="text-sm">{event.date.split(' ').slice(1).join(' ')}</div>
                      <div className="text-xs opacity-75 mt-2">{event.time}</div>
                    </div>
                  </div>
                  
                  {/* Event Details */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${categoryColors[event.category] || 'bg-gray-100 text-gray-800'}`}>
                        {event.category}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-gray-700">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Register Button */}
                  <div className="p-6 flex items-center justify-center md:border-l border-gray-200">
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition transform hover:scale-105">
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex justify-center">
        <div className="max-w-2xl mx-auto text-center px-4 w-full">
          <h2 className="text-3xl font-bold mb-4">Don't Miss Any Event</h2>
          <p className="text-lg mb-6 opacity-90">Subscribe to receive event updates and announcements</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
