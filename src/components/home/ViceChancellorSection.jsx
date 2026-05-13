import React from 'react';
import { Quote } from 'lucide-react';

const ViceChancellorSection = () => {
  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 bg-[#0B1120] relative flex justify-center w-full">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 md:gap-20 w-full">
        
        {/* Text Content */}
        <div className="flex-1 relative z-10">
          <div className="absolute -top-10 -left-10 text-cyan-500/10 rotate-180 pointer-events-none">
            <Quote className="w-32 h-32" />
          </div>
          
          <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-widest border-l-4 border-cyan-500 pl-4">
            Vice-Chancellor's Message
          </h2>
          
          <div className="space-y-6 text-slate-300 font-light leading-relaxed text-lg">
            <p>
              Sant Baba Bhag Singh University is dedicated to transforming lives through innovative 
              education and research. Our futuristic campus is designed to foster creativity, 
              critical thinking, and global awareness.
            </p>
            <p>
              We believe in nurturing talent and providing our students with the skills required 
              to thrive in a rapidly evolving technological landscape. Join us in our journey 
              towards excellence and let's shape a brighter future together.
            </p>
          </div>
          
          <div className="mt-10">
            <button className="px-6 py-3 bg-cyan-500 text-slate-900 font-bold uppercase tracking-wider rounded hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              Read Full Message
            </button>
          </div>
        </div>

        {/* Image / Video placeholder */}
        <div className="lg:w-1/3 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl transform rotate-3 scale-105 opacity-50 blur-sm"></div>
          <div className="relative bg-slate-800 p-2 rounded-2xl border border-cyan-500/30 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop" 
              alt="Vice Chancellor" 
              className="w-full h-auto rounded-xl object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-white/10 text-center">
              <h4 className="text-white font-bold">Dr. John Doe</h4>
              <p className="text-cyan-400 text-xs uppercase tracking-widest mt-1">Vice-Chancellor</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ViceChancellorSection;
