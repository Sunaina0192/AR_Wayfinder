import React from 'react';
import { Calendar } from 'lucide-react';

const EventsSection = () => {
  const events = [
    { title: "Inter-College Sports Meet 2026", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format&fit=crop" },
    { title: "Annual Cultural Fest - Rhythm", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop" },
    { title: "National Seminar on AI Trends", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&auto=format&fit=crop" },
    { title: "Alumni Meet & Networking", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&auto=format&fit=crop" }
  ];

  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 bg-[#020817] relative flex justify-center w-full">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-white mb-12 text-center uppercase tracking-widest relative">
          <span className="relative z-10">Latest Events</span>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] mt-4"></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {events.map((event, idx) => (
            <div key={idx} className="group relative bg-slate-900 rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400 transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:-translate-y-2">
              <div className="h-48 overflow-hidden relative">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900 to-transparent"></div>
              </div>
              <div className="p-5 relative z-10 bg-slate-900 h-full">
                <h3 className="text-sm font-bold text-slate-200 mb-4 group-hover:text-cyan-300 transition-colors">{event.title}</h3>
                <button className="text-xs flex items-center gap-2 bg-blue-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-md transition-colors w-max font-semibold tracking-wider">
                  <Calendar className="w-3 h-3" /> View Event
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-transparent border-2 border-cyan-500 text-cyan-400 font-bold uppercase tracking-widest rounded-md hover:bg-cyan-500 hover:text-slate-900 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]">
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
