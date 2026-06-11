import React, { useState } from 'react';
import { Calendar as CalendarIcon, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EventsSection = () => {
  const navigate = useNavigate();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

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

  // Helper to generate a mock calendar for June 2026
  const generateCalendarDays = () => {
    const days = [];
    const daysInMonth = 30; // June has 30 days
    const startDayOfWeek = 1; // June 1, 2026 is a Monday (0=Sun, 1=Mon)

    // Add empty slots for days before the 1st
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push({ empty: true });
    }

    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      const dayOfWeek = (startDayOfWeek + i - 1) % 7;
      
      // Determine day type
      let type = 'college'; // default
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        type = 'holiday'; // Weekends are holidays
      }
      // Specific mock holidays
      if (i === 15) type = 'event'; // Cultural Fest
      if (i === 24) type = 'holiday'; // Random holiday

      days.push({
        date: i,
        type: type, // 'college', 'holiday', 'event'
        empty: false
      });
    }
    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden flex flex-col items-center w-full">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
              <CalendarIcon className="w-4 h-4 text-accent" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Upcoming Highlights</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
              Latest <span className="text-accent">Events</span>
            </h2>
          </div>
          <button 
            onClick={() => setIsCalendarOpen(true)}
            className="px-8 py-3 glass rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-accent hover:text-dark transition-all duration-300"
          >
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

      {/* Calendar Modal */}
      {isCalendarOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-dark/90 backdrop-blur-sm" 
            onClick={() => setIsCalendarOpen(false)}
          ></div>
          
          <div className="relative glass bg-[#0a0a0a]/95 border border-white/10 rounded-3xl w-full max-w-4xl shadow-2xl animate-fade-in-up overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20">
                  <CalendarIcon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight uppercase">Academic Calendar</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">June 2026</p>
                </div>
              </div>
              
              <button 
                onClick={() => setIsCalendarOpen(false)}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Calendar Body */}
            <div className="p-6 md:p-8">
              {/* Controls */}
              <div className="flex justify-between items-center mb-8">
                <button className="p-2 glass rounded-full hover:bg-white/10 transition-colors">
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <h4 className="text-xl font-black text-white tracking-widest uppercase">June 2026</h4>
                <button className="p-2 glass rounded-full hover:bg-white/10 transition-colors">
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Legends */}
              <div className="flex flex-wrap gap-6 mb-8 justify-center bg-black/30 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-green-500 bg-green-500/10"></div>
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">College Day</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Holiday</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-accent shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Event</span>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 md:gap-4 text-center">
                {weekDays.map((day) => (
                  <div key={day} className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">
                    {day}
                  </div>
                ))}

                {calendarDays.map((dayObj, index) => {
                  if (dayObj.empty) {
                    return <div key={`empty-${index}`} className="aspect-square"></div>;
                  }

                  // Determine dynamic classes based on user requirements
                  let bgClass = "bg-white/5";
                  let borderClass = "border-white/5";
                  let textClass = "text-white";
                  let extraEffects = "";

                  if (dayObj.type === 'holiday') {
                    bgClass = "bg-red-500/10";
                    borderClass = "border-red-500/50";
                    textClass = "text-red-400 font-black";
                    extraEffects = "shadow-[inset_0_0_15px_rgba(239,68,68,0.2)]";
                  } else if (dayObj.type === 'college') {
                    borderClass = "border-2 border-green-500/70";
                    extraEffects = "hover:bg-green-500/10";
                  } else if (dayObj.type === 'event') {
                    bgClass = "bg-accent/20";
                    borderClass = "border-accent";
                    textClass = "text-accent font-black";
                    extraEffects = "shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-105 z-10";
                  }

                  return (
                    <div 
                      key={`day-${dayObj.date}`} 
                      className={`relative aspect-square flex flex-col items-center justify-center rounded-2xl glass ${bgClass} ${borderClass} ${extraEffects} transition-all duration-300 cursor-pointer group`}
                    >
                      <span className={`text-lg md:text-2xl font-bold ${textClass}`}>
                        {dayObj.date}
                      </span>
                      
                      {/* Tooltip on hover */}
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-dark border border-white/20 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-lg pointer-events-none z-20 whitespace-nowrap">
                        {dayObj.type === 'holiday' ? 'Holiday / Weekend' : dayObj.type === 'event' ? 'Cultural Fest' : 'Regular College Day'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventsSection;
