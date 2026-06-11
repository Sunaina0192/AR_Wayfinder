import React, { useState } from 'react';
import { Calendar as CalendarIcon, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EventsSection = () => {
  const navigate = useNavigate();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // Start at Jan 2026

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

  // Helper to generate a dynamic calendar for the current selected month
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sun, 1 = Mon
    
    const days = [];

    // Add empty slots for days before the 1st
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push({ empty: true });
    }

    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDayDate = new Date(year, month, i);
      const dayOfWeek = currentDayDate.getDay();
      
      // Determine day type
      let type = 'college'; // default
      let description = 'Regular College Day';
      
      // Weekends are holidays
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        type = 'holiday'; 
        description = 'Weekend';
      }
      
      // Some mock specific events/holidays across the year
      if (month === 0 && i === 26) { type = 'holiday'; description = 'Republic Day'; } // Jan 26
      if (month === 4 && i === 20) { type = 'event'; description = 'Inter-College Sports Meet'; } // May 20
      if (month === 5 && i === 15) { type = 'event'; description = 'Cultural Fest - Rhythm'; } // June 15
      if (month === 6 && i === 10) { type = 'event'; description = 'AI Trends Seminar'; } // July 10
      if (month === 7 && i === 5) { type = 'event'; description = 'Alumni Meet'; } // Aug 5
      if (month === 7 && i === 15) { type = 'holiday'; description = 'Independence Day'; } // Aug 15
      if (month === 9 && i === 2) { type = 'holiday'; description = 'Gandhi Jayanti'; } // Oct 2
      if (month === 11 && i === 25) { type = 'holiday'; description = 'Christmas'; } // Dec 25

      days.push({
        date: i,
        type: type, 
        description: description,
        empty: false
      });
    }
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-dark/90 backdrop-blur-sm" 
            onClick={() => setIsCalendarOpen(false)}
          ></div>
          
          <div className="relative glass bg-[#0a0a0a]/95 border border-white/10 rounded-2xl md:rounded-3xl w-full max-w-2xl shadow-2xl animate-fade-in-up overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20">
                  <CalendarIcon className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-black text-white tracking-tight uppercase">Academic Calendar</h3>
                  <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-0.5 md:mt-1">Full Year Access</p>
                </div>
              </div>
              
              <button 
                onClick={() => setIsCalendarOpen(false)}
                className="p-2 md:p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* Calendar Body */}
            <div className="p-4 md:p-6 overflow-y-auto overflow-x-hidden flex-1">
              {/* Controls */}
              <div className="flex justify-between items-center mb-6">
                <button onClick={handlePrevMonth} className="p-2 glass rounded-full hover:bg-white/10 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <h4 className="text-lg md:text-xl font-black text-white tracking-widest uppercase">{currentMonthName} {currentYear}</h4>
                <button onClick={handleNextMonth} className="p-2 glass rounded-full hover:bg-white/10 transition-colors">
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Legends */}
              <div className="flex flex-wrap gap-3 md:gap-6 mb-6 justify-center bg-black/30 p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full border-2 border-green-500 bg-green-500/10"></div>
                  <span className="text-[10px] md:text-xs font-bold text-slate-300 uppercase tracking-widest">College Day</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                  <span className="text-[10px] md:text-xs font-bold text-slate-300 uppercase tracking-widest">Holiday</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                  <span className="text-[10px] md:text-xs font-bold text-slate-300 uppercase tracking-widest">Event</span>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 md:gap-2 text-center w-full">
                {weekDays.map((day) => (
                  <div key={day} className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
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
                    borderClass = "border md:border-2 border-green-500/70";
                    extraEffects = "hover:bg-green-500/10";
                  } else if (dayObj.type === 'event') {
                    bgClass = "bg-accent/20";
                    borderClass = "border md:border-2 border-accent";
                    textClass = "text-accent font-black";
                    extraEffects = "shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-105 z-10";
                  }

                  return (
                    <div 
                      key={`day-${dayObj.date}`} 
                      className={`relative aspect-square flex flex-col items-center justify-center rounded-lg md:rounded-xl glass ${bgClass} ${borderClass} ${extraEffects} transition-all duration-300 cursor-pointer group`}
                    >
                      <span className={`text-base md:text-xl font-bold ${textClass}`}>
                        {dayObj.date}
                      </span>
                      
                      {/* Tooltip on hover */}
                      <div className="absolute -top-8 md:-top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-dark border border-white/20 text-white text-[8px] md:text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded-md md:rounded-lg pointer-events-none z-20 whitespace-nowrap hidden sm:block">
                        {dayObj.description}
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
