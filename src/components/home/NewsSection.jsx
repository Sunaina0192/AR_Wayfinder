import React from 'react';
import { Newspaper } from 'lucide-react';

const NewsSection = () => {
  const news = [
    { 
      title: "SBBSU hosts International Conference on AI & Future Tech", 
      date: "May 10, 2026", 
      image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=500&auto=format&fit=crop",
      category: "Research"
    },
    { 
      title: "Students win National Robotics Championship 2026", 
      date: "April 28, 2026", 
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=500&auto=format&fit=crop",
      category: "Achievement"
    },
    { 
      title: "New Research Grant awarded to Science Dept for AI Lab", 
      date: "April 15, 2026", 
      image: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=500&auto=format&fit=crop",
      category: "Department"
    }
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden flex justify-center w-full">
      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
            <Newspaper className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Media Center</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
            University <span className="text-accent">Insights</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {news.map((item, idx) => (
            <div key={idx} className="group relative flex flex-col glass rounded-[2rem] overflow-hidden border-white/5 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt="News" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/10 to-transparent"></div>
                <div className="absolute top-6 left-6 px-4 py-1.5 glass rounded-full text-[8px] font-black text-accent uppercase tracking-widest border-accent/20">
                  {item.category}
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-[1px] bg-accent/30"></span>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{item.date}</p>
                </div>
                
                <h3 className="text-xl font-black text-white group-hover:text-accent transition-colors leading-tight mb-8">
                  {item.title}
                </h3>
                
                <div className="mt-auto">
                  <button className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest group/btn">
                    Read Article 
                    <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover/btn:bg-accent group-hover/btn:text-dark transition-all">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
