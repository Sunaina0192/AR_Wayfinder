import React from 'react';
import { Quote } from 'lucide-react';

const TestimonialSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden flex justify-center w-full">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Student Voice</span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-20">
          Alumni <span className="text-accent">Success</span>
        </h2>

        <div className="relative group">
          {/* Animated Glow Back */}
          <div className="absolute inset-[-20px] bg-accent/10 blur-[100px] rounded-[5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          <div className="relative glass p-10 md:p-20 rounded-[3rem] border-white/5 shadow-2xl overflow-hidden">
            <Quote className="absolute top-10 left-10 w-24 h-24 text-white/5 -rotate-12 pointer-events-none" />
            
            <p className="text-2xl md:text-4xl text-white font-medium italic leading-[1.4] tracking-tight mb-16 relative z-10">
              "SBBSU gave me the <span className="text-accent font-black">100% placement assurance</span> I needed. The state-of-the-art labs and highly supportive faculty made my learning experience truly futuristic."
            </p>
            
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-[-4px] bg-gradient-to-r from-accent to-secondary rounded-full animate-[spin_5s_linear_infinite]"></div>
                <div className="relative w-full h-full rounded-full border-4 border-dark overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&auto=format&fit=crop" 
                    alt="Student" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
              
              <h4 className="text-2xl font-black text-white tracking-tight">Amit Kumar</h4>
              <p className="text-accent font-bold text-xs uppercase tracking-[0.3em] mt-2">B.Tech CSE • Class of 2025</p>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center gap-3 mt-16">
              {[1, 2, 3].map((dot) => (
                <button 
                  key={dot} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${dot === 1 ? 'w-12 bg-accent' : 'w-4 bg-white/10 hover:bg-white/30'}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
