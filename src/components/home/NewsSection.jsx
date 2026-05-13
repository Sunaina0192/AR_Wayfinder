import React from 'react';
import { Newspaper } from 'lucide-react';

const NewsSection = () => {
  const news = [
    { title: "SBBSU hosts International Conference on AI", date: "May 10, 2026", image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=500&auto=format&fit=crop" },
    { title: "Students win National Robotics Championship", date: "April 28, 2026", image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=500&auto=format&fit=crop" },
    { title: "New Research Grant awarded to Science Dept", date: "April 15, 2026", image: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=500&auto=format&fit=crop" }
  ];

  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 bg-[#020817] relative border-t border-cyan-500/10 flex justify-center w-full">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-black text-white mb-12 text-center uppercase tracking-widest flex items-center justify-center gap-4">
          <Newspaper className="text-cyan-500" /> University News
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {news.map((item, idx) => (
            <div key={idx} className="group flex flex-col bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-colors duration-300">
              <div className="h-40 overflow-hidden relative">
                <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors"></div>
                <img src={item.image} alt="News" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-cyan-400 text-xs font-mono mb-2">{item.date}</p>
                  <h3 className="text-lg font-bold text-slate-200 group-hover:text-white leading-snug">{item.title}</h3>
                </div>
                <button className="text-xs uppercase tracking-widest text-slate-400 hover:text-cyan-400 mt-6 text-left font-bold transition-colors w-max">
                  Read Article →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
