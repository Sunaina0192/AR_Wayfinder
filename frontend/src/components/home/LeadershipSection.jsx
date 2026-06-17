import React, { useState } from 'react';
import { X } from 'lucide-react';

const LeadershipSection = () => {
  const [selectedLeader, setSelectedLeader] = useState(null);

  const leaders = [
    { 
      name: "Sant Baba Dilawar Singh Ji", 
      role: "Hon'ble Chancellor", 
      image: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=500&auto=format&fit=crop",
      bio: "A visionary leader dedicated to spreading education and empowering the youth through spiritual wisdom and academic excellence. Their lifelong commitment to societal upliftment continues to guide the institution."
    },
    { 
      name: "Sant Baba Sarwan Singh Ji", 
      role: "Hon'ble Vice-Chancellor", 
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop",
      bio: "With a profound focus on integrating modern technology with traditional values, they have been instrumental in fostering a culture of innovation, research, and holistic development across the university."
    },
    { 
      name: "S. Hardaman Singh", 
      role: "Hon'ble Secretary", 
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop",
      bio: "An astute administrator and educationist, bringing years of expertise in institutional management and ensuring that SBBSU remains at the forefront of providing quality education and infrastructure."
    }
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden flex flex-col items-center w-full">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Visionary Leadership</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6">
            Our Esteemed <span className="text-accent">Council</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-medium">
            Guided by the wisdom of revered saints and academic visionaries, SBBSU continues to set benchmarks in higher education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {leaders.map((leader, idx) => (
            <div key={idx} className="group flex flex-col items-center text-center">
              <div className="relative mb-10">
                {/* Decorative Rings */}
                <div className="absolute inset-[-15px] border border-white/5 rounded-[3rem] group-hover:rotate-12 transition-transform duration-700"></div>
                <div className="absolute inset-[-8px] border border-accent/20 rounded-[2.5rem] group-hover:-rotate-6 transition-transform duration-700"></div>
                
                <div className="relative w-64 h-80 rounded-[2rem] overflow-hidden glass border-white/10 group-hover:scale-105 transition-all duration-500 shadow-2xl">
                  <img 
                    src={leader.image} 
                    alt={leader.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent"></div>
                  
                  {/* Bio Reveal Button */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button 
                      onClick={() => setSelectedLeader(leader)}
                      className="px-6 py-2 glass rounded-full text-[10px] font-black text-white uppercase tracking-widest border-accent/30 hover:bg-accent hover:text-dark transition-colors"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-black text-white mb-2 tracking-tight group-hover:text-accent transition-colors">{leader.name}</h3>
              <p className="text-accent font-bold text-xs uppercase tracking-[0.3em]">{leader.role}</p>
              
              <div className="mt-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-8 h-[1px] bg-accent/30"></div>
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                <div className="w-8 h-[1px] bg-accent/30"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Modal */}
      {selectedLeader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-dark/90 backdrop-blur-sm" 
            onClick={() => setSelectedLeader(null)}
          ></div>
          <div className="relative glass bg-dark/80 border border-white/10 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10 shadow-2xl">
            <button 
              onClick={() => setSelectedLeader(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex flex-col md:flex-row min-h-[400px]">
              <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                <img src={selectedLeader.image} alt={selectedLeader.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent md:hidden"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark/80 hidden md:block"></div>
              </div>
              
              <div className="p-8 md:p-12 md:w-3/5 flex flex-col justify-center relative">
                <span className="text-accent text-xs font-bold uppercase tracking-widest mb-3">{selectedLeader.role}</span>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-6">{selectedLeader.name}</h3>
                <div className="w-16 h-1 bg-accent/50 rounded-full mb-8"></div>
                <p className="text-slate-300 leading-relaxed text-sm md:text-base mb-8">
                  {selectedLeader.bio}
                </p>
                
                <div className="mt-auto">
                  <button 
                    onClick={() => setSelectedLeader(null)} 
                    className="px-6 py-3 glass rounded-xl text-xs font-bold text-white uppercase tracking-wider hover:bg-accent hover:text-dark transition-all border border-white/10"
                  >
                    Close Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LeadershipSection;
