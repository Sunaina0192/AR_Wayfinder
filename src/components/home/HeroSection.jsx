import React from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image & Overlays */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
          alt="Students learning" 
          className="w-full h-full object-cover object-center brightness-75"
        />
        {/* Futuristic Gradient Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(6,20,60,0.4)_0%,rgba(6,20,60,0.8)_100%)]"></div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <div className="inline-block px-6 py-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 backdrop-blur-md mb-6 animate-pulse">
          <span className="text-cyan-300 font-bold tracking-widest uppercase text-sm">Future Ready Education</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">
          INNOVATE.<br/>EMPOWER.<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"> EXCEL.</span>
        </h1>
        <p className="text-lg text-cyan-50/80 mb-10 max-w-2xl font-light">
          Experience a next-generation campus with world-class facilities, advanced research, and a global perspective.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/admissions" className="group relative px-8 py-4 bg-cyan-500 text-slate-900 font-bold uppercase tracking-wider rounded-md overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]">
            <span className="relative z-10 flex items-center gap-2">Admissions 2026 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
          </Link>
          <button className="px-8 py-4 bg-transparent border border-cyan-500/50 text-cyan-400 font-bold uppercase tracking-wider rounded-md hover:bg-cyan-500/10 hover:border-cyan-400 transition-all backdrop-blur-sm">
            Enquire Now
          </button>
        </div>
      </div>

      {/* Slider Controls (Decorative for now) */}
      <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#0c2363]/80 border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 hover:bg-cyan-500 hover:text-slate-900 transition-all hover:scale-110 backdrop-blur-sm">
        <ChevronLeft />
      </button>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#0c2363]/80 border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-400 hover:bg-cyan-500 hover:text-slate-900 transition-all hover:scale-110 backdrop-blur-sm">
        <ChevronRight />
      </button>
    </section>
  );
};

export default HeroSection;
