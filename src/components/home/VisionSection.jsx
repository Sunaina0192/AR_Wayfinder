import React from 'react';
import { Eye, Target, BookOpen, ArrowRight } from 'lucide-react';

const VisionSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden flex flex-col items-center justify-center w-full">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-6">
            <Eye className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Our Core Philosophy</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 uppercase">
            Vision & <span className="text-accent">Mission</span>
          </h2>
          
          <div className="relative group max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-accent/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative glass p-8 md:p-12 rounded-[2.5rem] shadow-2xl overflow-hidden border-white/5">
              <div className="absolute top-0 left-0 w-2 h-full bg-accent"></div>
              <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed italic">
                "To inspire each and every learner to attain <span className="text-white font-black">excellence</span> in higher education by imparting quality knowledge, fostering research, and nurturing leadership for a meaningful life."
              </p>
            </div>
          </div>
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {[
            { 
              title: "Academic Excellence", 
              desc: "Integrated curriculum designed for future challenges.",
              icon: <BookOpen className="w-7 h-7" />, 
              color: "accent" 
            },
            { 
              title: "Admissions 2026", 
              desc: "Join a legacy of leadership and innovation.",
              icon: <Target className="w-7 h-7" />, 
              color: "secondary" 
            },
            { 
              title: "Campus Updates", 
              desc: "Stay informed with the latest university news.",
              icon: <Eye className="w-7 h-7" />, 
              color: "soft" 
            }
          ].map((card, idx) => (
            <div key={idx} className="group relative glass p-8 rounded-[2rem] hover:-translate-y-2 transition-all duration-500 overflow-hidden border-white/5 hover:border-accent/30 cursor-pointer">
              <div className={`absolute -right-4 -top-4 w-24 h-24 bg-${card.color}/10 rounded-full blur-2xl group-hover:bg-${card.color}/20 transition-colors`}></div>
              
              <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                {card.icon}
              </div>
              
              <h3 className="text-xl font-black text-white mb-4 tracking-tight uppercase">{card.title}</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8">
                {card.desc}
              </p>
              
              <div className="flex items-center gap-2 text-[10px] font-black text-accent tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                Learn More <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
