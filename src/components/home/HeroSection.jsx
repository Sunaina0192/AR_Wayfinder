import React from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center justify-center">
      {/* Background with Depth and Motion */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-dark/60 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
          alt="SBBSU Campus Life" 
          className="w-full h-full object-cover scale-110 animate-[pulse_20s_ease-in-out_infinite_alternate]"
        />
        
        {/* Animated Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/20 via-dark/40 to-dark z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-transparent to-dark z-20 opacity-60"></div>
        
        {/* Cyber Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] z-30"></div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-accent/10 blur-[120px] rounded-full animate-float z-10"></div>
      <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-secondary/10 blur-[150px] rounded-full animate-float z-10" style={{ animationDelay: '3s' }}></div>

      {/* Hero Content */}
      <div className="relative z-40 text-center px-4 max-w-6xl mx-auto flex flex-col items-center">
        
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-xl mb-10 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-accent font-black tracking-[0.3em] uppercase text-[10px]">Future Ready Education</span>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-[0.9] tracking-tighter animate-fade-in-up">
          INNOVATE.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-secondary drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">EMPOWER.</span><br/>
          EXCEL.
        </h1>

        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl font-medium leading-relaxed animate-fade-in-up delay-100">
          Empowering the next generation of leaders through <span className="text-white font-bold">academic excellence</span> and <span className="text-accent font-bold">spiritual wisdom</span> in a tech-integrated campus.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up delay-200">
          <Link to="/admissions" className="group relative px-10 py-5 bg-accent text-dark font-black uppercase tracking-widest rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_20px_40px_-10px_rgba(6,182,212,0.5)]">
            <span className="relative z-10 flex items-center gap-3">
              Apply Now 2026 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </Link>
          <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 hover:border-accent/50 transition-all backdrop-blur-xl">
            Explore Campus
          </button>
        </div>

        {/* Stats Summary */}
        <div className="mt-20 grid grid-cols-3 gap-8 md:gap-16 border-t border-white/5 pt-10 w-full animate-fade-in-up delay-300">
          {[
            { label: 'Accreditation', value: 'NAAC A' },
            { label: 'Placement', value: '100%' },
            { label: 'Students', value: '10K+' }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-[10px] font-bold text-accent tracking-[0.2em] uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Navigation Arrows */}
      <button className="absolute left-8 bottom-12 w-14 h-14 glass rounded-2xl flex items-center justify-center text-white hover:bg-accent hover:text-dark transition-all hover:scale-110 z-50 group hidden md:flex">
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>
      <button className="absolute right-8 bottom-12 w-14 h-14 glass rounded-2xl flex items-center justify-center text-white hover:bg-accent hover:text-dark transition-all hover:scale-110 z-50 group hidden md:flex">
        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
      </button>
    </section>
  );
};

export default HeroSection;
