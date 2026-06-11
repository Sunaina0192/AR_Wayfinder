import React, { useState } from 'react';
import { Quote, X } from 'lucide-react';

const ViceChancellorSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const vcDetails = {
    name: "Dr. Vijay Dhir",
    role: "Vice-Chancellor, SBBSU",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop",
    bio: "Dr. Vijay Dhir is a distinguished academician and visionary leader with extensive experience in higher education administration, research, and institutional development. Under his dynamic leadership, SBBSU is making remarkable strides towards academic excellence, fostering innovation, and building strong industry-academia partnerships to empower students for a global future."
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden flex flex-col items-center justify-center w-full">
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
                  src={vcDetails.image} 
                  alt="Vice Chancellor" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/10 to-transparent"></div>
              </div>
              
              <div className="absolute bottom-10 left-10 right-10 p-6 glass rounded-2xl border-white/20 text-center animate-float">
                <h4 className="text-xl font-black text-white tracking-tight">{vcDetails.name}</h4>
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
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-10 py-4 bg-accent text-dark font-black uppercase tracking-widest rounded-2xl hover:shadow-[0_20px_40px_-10px_rgba(6,182,212,0.5)] transition-all duration-300 hover:-translate-y-1"
            >
              Full Profile
            </button>
            <div className="flex flex-col">
              <span className="text-white font-black text-lg tracking-tight leading-none">{vcDetails.name}</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Vice-Chancellor, SBBSU</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-dark/90 backdrop-blur-sm" 
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative glass bg-dark/80 border border-white/10 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10 shadow-2xl">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex flex-col md:flex-row min-h-[400px]">
              <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                <img src={vcDetails.image} alt={vcDetails.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent md:hidden"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark/80 hidden md:block"></div>
              </div>
              
              <div className="p-8 md:p-12 md:w-3/5 flex flex-col justify-center relative">
                <span className="text-accent text-xs font-bold uppercase tracking-widest mb-3">{vcDetails.role}</span>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-6">{vcDetails.name}</h3>
                <div className="w-16 h-1 bg-accent/50 rounded-full mb-8"></div>
                <p className="text-slate-300 leading-relaxed text-sm md:text-base mb-8">
                  {vcDetails.bio}
                </p>
                
                <div className="mt-auto">
                  <button 
                    onClick={() => setIsModalOpen(false)} 
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

export default ViceChancellorSection;
