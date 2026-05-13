import React from 'react';
import { Eye, Target, BookOpen } from 'lucide-react';

const VisionSection = () => {
  return (
    <section className="mx-auto max-w-7xl py-12 md:py-24 px-4 sm:px-6 relative bg-slate-950 overflow-hidden flex flex-col items-center justify-center w-full">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="w-full flex flex-col items-center relative z-10">
        
        {/* NAAC Badge */}
        {/* <div className="mb-12 relative group cursor-pointer">
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-white px-8 py-4 rounded-lg flex items-center gap-4 shadow-2xl border border-cyan-500/20">
            <h2 className="text-4xl font-black text-[#8b1a1a]">NAAC</h2>
            <div className="text-3xl font-black text-[#8b1a1a] border-l-2 border-[#8b1a1a] pl-4">A</div>
            <p className="text-xs font-bold text-slate-800 leading-tight uppercase tracking-widest">Accredited</p>
          </div>
        </div> */}

        {/* Vision Statement */}
        <div className="text-center mb-20 max-w-4xl">
          <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-[0.2em] flex items-center justify-center gap-3">
            <Eye className="text-cyan-400" /> Vision
          </h2>
          <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-cyan-500/20 p-8 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.05)]">
            <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed italic">
              "To encourage the students to achieve excellence in higher education by imparting quality 
              education, conducting research and providing consultancy."
            </p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full">
          {[
            { title: "Academic Calendar", icon: <BookOpen className="w-6 h-6" />, color: "from-blue-600 to-blue-400" },
            { title: "Admissions 2026", icon: <Target className="w-6 h-6" />, color: "from-cyan-500 to-blue-500" },
            { title: "Notice Board", icon: <Eye className="w-6 h-6" />, color: "from-slate-700 to-slate-600" }
          ].map((card, idx) => (
            <div key={idx} className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer">
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-90 transition-transform duration-500 group-hover:scale-105`}></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
              <div className="relative h-full flex flex-col items-center justify-center text-white p-6 border border-white/10 rounded-2xl">
                <div className="mb-4 p-3 bg-white/10 rounded-full backdrop-blur-md group-hover:bg-white/20 transition-all">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wider">{card.title}</h3>
                
                {/* Decorative lines */}
                <div className="mt-4 flex flex-col gap-2 w-full max-w-[150px] opacity-70">
                  <div className="h-px w-full bg-white/40"></div>
                  <div className="h-px w-3/4 mx-auto bg-white/40"></div>
                  <div className="h-px w-1/2 mx-auto bg-white/40"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
