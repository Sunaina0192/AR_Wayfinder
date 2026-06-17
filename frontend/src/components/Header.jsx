import React from 'react';
import { ArrowRight } from 'lucide-react';

const Header = ({ onStartClick }) => {

  return (

    <header className="bg-dark border-b border-white/5 overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-primary/50 to-dark opacity-80"></div>
      
      {/* Animated Glow Elements */}
      <div className="absolute top-[-50%] left-[-10%] w-[60%] h-[150%] bg-accent/10 blur-[100px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-[-50%] right-[-10%] w-[60%] h-[150%] bg-secondary/10 blur-[100px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 relative z-10">
        <div className="flex flex-col xl:flex-row justify-between items-center gap-8 md:gap-12">

          {/* LEFT: Logo & Branding */}
          <div className="flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">

            {/* Logo Container */}
            <div className="relative group">
              <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="bg-white/5 border border-white/10 backdrop-blur-2xl p-4 rounded-[2rem] shadow-2xl hover:scale-105 transition-all duration-500 shrink-0 relative z-10">
                <img
                  src="https://tse4.mm.bing.net/th/id/OIP.CFPv_z6BL9jQYhCuuqtsBQAAAA?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="SBBSU Logo"
                  className="h-20 object-contain brightness-110"
                />
              </div>
            </div>

            {/* Text Branding */}
            <div className="flex flex-col items-center sm:items-start">
              <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tighter">
                <span className="text-white">SANT BABA</span>{' '}
                <span className="text-accent drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">BHAG SINGH</span>
              </h1>

              <h2 className="text-2xl md:text-3xl font-bold mt-1 text-slate-400 tracking-wide uppercase">
                UNIVERSITY
              </h2>

              <div className="flex items-center gap-3 mt-4">
                <div className="h-[2px] w-12 bg-gradient-to-r from-accent to-transparent"></div>
                <p className="text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] text-accent/80">
                  Established vide Punjab Govt. Act No. 6 of 2015
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Start Now Button */}
          {onStartClick && (
            <div className="flex items-center">
              <button 
                onClick={onStartClick}
                className="group relative px-8 py-4 rounded-2xl bg-accent text-dark font-black uppercase tracking-[0.2em] text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                <span className="relative z-10">Start Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;