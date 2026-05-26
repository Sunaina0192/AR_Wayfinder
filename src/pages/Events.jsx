import React from 'react';
import { Calendar, MapPin, Users, ArrowRight, Bell, ChevronRight, LayoutGrid } from 'lucide-react';

const Events = () => {
  const events = [
    {
      title: 'Annual Convocation',
      date: 'March 15, 2026',
      time: '10:00 AM',
      location: 'Main Auditorium',
      category: 'Academic',
      description: 'Degree awarding ceremony for graduating students across all faculties.',
      gradient: 'from-blue-600 to-indigo-600'
    },
    {
      title: 'Tech Summit 2026',
      date: 'April 5-6, 2026',
      time: '9:00 AM',
      location: 'Block 5 (UIET)',
      category: 'Workshop',
      description: 'Latest trends in technology, innovation and sustainable development.',
      gradient: 'from-purple-600 to-blue-600'
    },
    {
      title: 'Sports Festival',
      date: 'April 20, 2026',
      time: '8:00 AM',
      location: 'Sports Stadium',
      category: 'Sports',
      description: 'Inter-college sports competitions and athletic meets.',
      gradient: 'from-emerald-600 to-teal-600'
    },
    {
      title: 'Freshers Welcome',
      date: 'May 1, 2026',
      time: '2:00 PM',
      location: 'Auditorium & Grounds',
      category: 'Social',
      description: 'Welcome program and orientation for new students.',
      gradient: 'from-pink-600 to-rose-600'
    },
    {
      title: 'Innovation Challenge',
      date: 'May 10-12, 2026',
      time: '9:00 AM',
      location: 'Workshop Center',
      category: 'Innovation',
      description: 'University-wide hackathon and innovative project competition.',
      gradient: 'from-orange-600 to-amber-600'
    },
    {
      title: 'Cultural Fest',
      date: 'June 1, 2026',
      time: '5:00 PM',
      location: 'Main Campus Grounds',
      category: 'Cultural',
      description: 'A celebration of music, dance, and creative performances.',
      gradient: 'from-indigo-600 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-dark text-white pt-24 pb-20 selection:bg-accent/30 selection:text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-accent/10 rounded-full blur-[150px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8 animate-float">
            <Calendar className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Campus Pulse</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
            University <span className="text-accent">Events</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Join the vibrant community events, academic summits, and cultural festivals at Sant Baba Bhag Singh University.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 -mt-20 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Upcoming <span className="text-accent">Timeline</span></h2>
              <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Academic Year 2025-2026</p>
            </div>
            <button className="px-8 py-4 rounded-2xl glass border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:border-accent transition-all flex items-center gap-3">
              <Bell className="w-4 h-4" />
              Get Notifications
            </button>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, idx) => (
              <div key={idx} className="group relative rounded-[3rem] glass border-white/5 overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent/5 flex flex-col h-full">
                {/* Visual Header */}
                <div className={`h-40 bg-gradient-to-br ${event.gradient} p-8 flex flex-col justify-between relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                  <div className="flex justify-between items-start relative z-10">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-white border border-white/10">
                      {event.category}
                    </span>
                    <Calendar className="w-5 h-5 text-white/50" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-[10px] font-black text-white/70 uppercase tracking-widest leading-none mb-1">Starts at</p>
                    <p className="text-lg font-black text-white tracking-tighter">{event.time}</p>
                  </div>
                </div>

                {/* Event Info */}
                <div className="p-8 space-y-6 flex-grow">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-tight group-hover:text-accent transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-4 text-slate-400">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:text-accent transition-colors">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Date</p>
                        <p className="text-white font-bold text-sm tracking-tight">{event.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-slate-400">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:text-accent transition-colors">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Location</p>
                        <p className="text-white font-bold text-sm tracking-tight">{event.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="p-8 pt-0 mt-auto">
                  <button className="w-full py-5 rounded-[2rem] bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] group-hover:bg-accent group-hover:text-dark group-hover:border-accent transition-all flex items-center justify-center gap-3">
                    Register Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Past Events Footer */}
          <div className="pt-24 border-t border-white/5 text-center space-y-8">
            <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Legacy of Excellence</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { l: "Total Events", v: "450+" },
                { l: "Participants", v: "12k+" },
                { l: "Workshops", v: "120+" },
                { l: "Festivals", v: "24" }
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-3xl glass border-white/5">
                  <p className="text-3xl font-black text-accent mb-1">{stat.v}</p>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{stat.l}</p>
                </div>
              ))}
            </div>
            <button className="text-[10px] font-black text-accent uppercase tracking-widest flex items-center gap-2 mx-auto hover:text-white transition-colors group">
              View Archive <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
