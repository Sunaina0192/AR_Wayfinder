import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EventsSection = () => {
  const navigate = useNavigate();
  const events = [
    { 
      title: "Inter-College Sports Meet 2026", 
      date: "May 20, 2026",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format&fit=crop" 
    },
    { 
      title: "Annual Cultural Fest - Rhythm", 
      date: "June 15, 2026",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop" 
    },
    { 
      title: "National Seminar on AI Trends", 
      date: "July 10, 2026",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&auto=format&fit=crop" 
    },
    { 
      title: "Alumni Meet & Networking", 
      date: "August 05, 2026",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&auto=format&fit=crop" 
    }
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden flex justify-center w-full">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
              <Calendar className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Upcoming Highlights</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
              Latest <span className="text-accent">Events</span>
            </h2>
          </div>
          <button className="px-8 py-3 glass rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-accent hover:text-dark transition-all duration-300">
            View All Calendar
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event, idx) => (
            <div key={idx} className="group relative glass rounded-[2.5rem] overflow-hidden border-white/5 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent"></div>
                <div className="absolute top-6 right-6 px-4 py-2 glass rounded-xl text-[10px] font-black text-white uppercase tracking-widest">
                  {event.date}
                </div>
              </div>
              
              <div className="p-8 relative">
                <h3 className="text-lg font-black text-white mb-6 leading-tight group-hover:text-accent transition-colors min-h-[3rem]">
                  {event.title}
                </h3>
                
                <button 
                  onClick={() => navigate('/apply')}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-accent hover:text-dark transition-all duration-300 group/btn"
                >
                  Registration Open
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
