import React from 'react';
import { Users, BookOpen, GraduationCap, Trophy } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { number: "500+", label: "Expert Faculty", icon: <Users /> },
    { number: "50+", label: "Programs Offered", icon: <BookOpen /> },
    { number: "10k+", label: "Alumni Worldwide", icon: <GraduationCap /> },
    { number: "100+", label: "Awards Won", icon: <Trophy /> }
  ];

  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 bg-gradient-to-r from-cyan-900 via-blue-900 to-cyan-900 relative overflow-hidden border-y border-cyan-400/30 flex justify-center w-full">
      {/* Animated glowing orbs */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-400/20 rounded-full blur-[80px] -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-[80px] -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center text-center p-6 bg-slate-950/40 backdrop-blur-md rounded-2xl border border-white/10 hover:border-cyan-400/50 hover:-translate-y-2 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="text-cyan-400 mb-4 w-12 h-12 flex items-center justify-center bg-white/5 rounded-full border border-cyan-400/20">
              {stat.icon}
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              {stat.number}
            </h3>
            <p className="text-sm md:text-base text-cyan-100 uppercase tracking-widest font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
