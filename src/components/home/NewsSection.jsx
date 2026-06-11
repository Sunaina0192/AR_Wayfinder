import React, { useState } from 'react';
import { Newspaper, X } from 'lucide-react';

const NewsSection = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const news = [
    { 
      title: "SBBSU hosts International Conference on AI & Future Tech", 
      date: "May 10, 2026", 
      image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=500&auto=format&fit=crop",
      category: "Research",
      content: "Sant Baba Bhag Singh University recently hosted a 3-day International Conference on Artificial Intelligence and Future Technologies. Renowned scholars and industry experts from around the globe gathered to discuss the transformative potential of AI in various sectors including healthcare, education, and autonomous systems. The event featured keynote speeches, panel discussions, and interactive workshops, providing our students with unparalleled exposure to cutting-edge research."
    },
    { 
      title: "Students win National Robotics Championship 2026", 
      date: "April 28, 2026", 
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=500&auto=format&fit=crop",
      category: "Achievement",
      content: "Our exceptional engineering students have secured the first position at the National Robotics Championship 2026 held in New Delhi. Competing against top universities across the country, the SBBSU team showcased their innovative autonomous rover design, which successfully navigated complex terrains and completed all assigned tasks. This victory highlights our commitment to practical, hands-on learning and technological excellence."
    },
    { 
      title: "New Research Grant awarded to Science Dept for AI Lab", 
      date: "April 15, 2026", 
      image: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=500&auto=format&fit=crop",
      category: "Department",
      content: "The Department of Computer Science has been awarded a prestigious research grant to establish a state-of-the-art AI and Machine Learning Laboratory. This new facility will be equipped with high-performance computing clusters and advanced software tools, enabling students and faculty to conduct groundbreaking research in deep learning, natural language processing, and computer vision. The lab is expected to be operational by the next academic semester."
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
                  <button 
                    onClick={() => setSelectedArticle(item)}
                    className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest group/btn"
                  >
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

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm" onClick={() => setSelectedArticle(null)}></div>
          <div className="relative w-full max-w-2xl glass border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl animate-fade-in-up">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-dark/50 hover:bg-accent hover:text-dark rounded-full flex items-center justify-center transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="h-64 overflow-hidden relative">
              <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
              <div className="absolute bottom-6 left-8 right-8">
                <span className="px-3 py-1 bg-accent/20 border border-accent/30 text-accent text-[10px] font-black uppercase tracking-widest rounded-full mb-3 inline-block">
                  {selectedArticle.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">{selectedArticle.title}</h3>
              </div>
            </div>
            <div className="p-8">
              <p className="text-slate-400 text-sm font-black uppercase tracking-widest mb-6">{selectedArticle.date}</p>
              <p className="text-slate-300 leading-relaxed font-medium">
                {selectedArticle.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewsSection;
