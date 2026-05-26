import React from 'react';
import { Quote } from 'lucide-react';

const ViceChancellorSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden flex justify-center w-full">
      {/* Background Decor */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 md:gap-24 relative z-10 w-full">
        
        {/* VC Profile Card - Left Side for variety */}
        <div className="w-full lg:w-1/3 group">
          <div className="relative">
            {/* Animated Glow Back */}
            <div className="absolute inset-[-10px] bg-gradient-to-br from-accent via-secondary to-accent rounded-[3rem] opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-700"></div>
            
            <div className="relative glass p-4 rounded-[2.5rem] border-white/10 group-hover:scale-[1.02] transition-transform duration-500 shadow-2xl overflow-hidden">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop" 
                  alt="Vice Chancellor" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/10 to-transparent"></div>
              </div>
              
              <div className="absolute bottom-10 left-10 right-10 p-6 glass rounded-2xl border-white/20 text-center animate-float">
                <h4 className="text-xl font-black text-white tracking-tight">Dr. Vijay Dhir</h4>
                <p className="text-accent font-bold text-[10px] uppercase tracking-[0.3em] mt-2">Vice-Chancellor</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Content */}
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8">
            <Quote className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Leadership Message</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-10 leading-tight">
            Nurturing <span className="text-accent">Excellence</span> <br />
            Through Innovation
          </h2>
          
          <div className="space-y-8 text-slate-400 font-medium leading-relaxed text-lg italic relative">
            <div className="absolute -top-10 -left-10 text-white/5 text-[15rem] font-black pointer-events-none select-none italic">"</div>
            <p className="relative z-10">
              Sant Baba Bhag Singh University stands as a living embodiment of the noble vision, spiritual wisdom, and selfless service of the revered saints. Our mission is to transform potential into practical skills essential for overcoming life's challenges.
            </p>
            <p className="relative z-10">
              We are steadfast in our pursuit of academic excellence, impactful research, and meaningful community engagement. Together, we are shaping the future of education in a drug-free, value-oriented environment.
            </p>
          </div>
          
          <div className="mt-12 flex items-center gap-8">
            <button className="px-10 py-4 bg-accent text-dark font-black uppercase tracking-widest rounded-2xl hover:shadow-[0_20px_40px_-10px_rgba(6,182,212,0.5)] transition-all duration-300 hover:-translate-y-1">
              Full Profile
            </button>
            <div className="flex flex-col">
              <span className="text-white font-black text-lg tracking-tight leading-none">Dr. Vijay Dhir</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Vice-Chancellor, SBBSU</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViceChancellorSection;
