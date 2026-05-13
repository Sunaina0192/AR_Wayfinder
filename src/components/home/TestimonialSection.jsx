import React from 'react';
import { Quote } from 'lucide-react';

const TestimonialSection = () => {
  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 bg-[#0B1120] relative flex justify-center w-full">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl font-black text-white mb-16 uppercase tracking-widest">
          What Our Students Say
        </h2>

        <div className="relative bg-slate-900/80 backdrop-blur-xl p-10 md:p-16 rounded-3xl border border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.05)]">
          <Quote className="absolute top-8 left-8 w-16 h-16 text-cyan-500/10 -rotate-12" />
          
          <p className="text-xl md:text-2xl text-slate-200 font-light italic leading-relaxed mb-10 relative z-10">
            "SBBSU gave me the 100% placement assurance I needed. The state-of-the-art labs and highly supportive faculty made my learning experience truly futuristic and practical."
          </p>
          
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full p-1 mb-4 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <img 
                src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&auto=format&fit=crop" 
                alt="Student" 
                className="w-full h-full object-cover rounded-full border-2 border-slate-900"
              />
            </div>
            <h4 className="text-white font-bold text-lg">Amit Kumar</h4>
            <p className="text-cyan-400 text-xs uppercase tracking-widest mt-1">B.Tech CSE (Batch 2025)</p>
          </div>

          {/* Carousel dots */}
          <div className="flex justify-center gap-2 mt-10">
            <button className="w-3 h-3 rounded-full bg-cyan-500"></button>
            <button className="w-3 h-3 rounded-full bg-slate-700 hover:bg-slate-500 transition-colors"></button>
            <button className="w-3 h-3 rounded-full bg-slate-700 hover:bg-slate-500 transition-colors"></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
