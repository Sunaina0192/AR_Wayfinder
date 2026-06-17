import React from 'react';
import { Users, BookOpen, GraduationCap, Trophy } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { number: "500+", label: "Expert Faculty", icon: <Users className="w-6 h-6" /> },
    { number: "50+", label: "Programs Offered", icon: <BookOpen className="w-6 h-6" /> },
    { number: "10k+", label: "Alumni Worldwide", icon: <GraduationCap className="w-6 h-6" /> },
    { number: "100+", label: "Awards Won", icon: <Trophy className="w-6 h-6" /> }
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden flex justify-center w-full">
      {/* Background with Motion */}
      <div className="absolute inset-0 bg-dark z-0">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="group relative flex flex-col items-center justify-center text-center p-10 glass rounded-[2.5rem] border-white/5 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2">
              {/* Floating Decoration */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors"></div>
              
              <div className="text-accent mb-8 w-16 h-16 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                {stat.icon}
              </div>
              
              <h3 className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tighter drop-shadow-2xl">
                {stat.number}
              </h3>
              
              <div className="flex items-center gap-3 w-full justify-center">
                <div className="w-4 h-[1px] bg-accent/30"></div>
                <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-[0.3em] font-black">{stat.label}</p>
                <div className="w-4 h-[1px] bg-accent/30"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
