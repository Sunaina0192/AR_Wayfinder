import React from 'react';

const RecruitersSection = () => {
  const logos = [
    { name: "Wipro", url: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" },
    { name: "Tech Mahindra", url: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Tech_Mahindra_New_Logo.svg" },
    { name: "Justdial", url: "https://upload.wikimedia.org/wikipedia/commons/2/23/Justdial_logo.png" },
    { name: "Infosys", url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" },
    { name: "Infotech", url: "https://upload.wikimedia.org/wikipedia/commons/4/4c/LTI_Let%27s_Solve_Logo.svg" },
    { name: "Alpha", url: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Alphabet_Inc_logo.svg" },
    { name: "TCS", url: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg" },
    { name: "Cognizant", url: "https://upload.wikimedia.org/wikipedia/commons/4/43/Cognizant_logo_2022.svg" },
    { name: "Accenture", url: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture_2017.svg" },
    { name: "IBM", url: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
    { name: "Capgemini", url: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Capgemini_201x_logo.svg" },
    { name: "HCL", url: "https://upload.wikimedia.org/wikipedia/commons/2/22/HCL_Technologies_logo.svg" }
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden flex justify-center w-full">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-500">Industry Partners</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">
            Top <span className="text-accent">Recruiters</span>
          </h2>
        </div>
        
        <div className="relative group">
          {/* Fading Edges for Carousel Feel */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-dark to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-dark to-transparent z-10"></div>
          
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 lg:gap-32">
            {logos.map((logo, idx) => (
              <div key={idx} className="w-32 md:w-40 h-20 flex items-center justify-center group/logo">
                <img 
                  src={logo.url} 
                  alt={logo.name} 
                  className="max-w-full max-h-full object-contain filter grayscale brightness-[5] opacity-20 group-hover/logo:opacity-100 group-hover/logo:grayscale-0 group-hover/logo:brightness-100 transition-all duration-700 hover:scale-110" 
                />
              </div>
            ))}
          </div>
        </div>
        
        <p className="text-center mt-16 text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em]">
          & Over 500+ More Global Partners
        </p>
      </div>
    </section>
  );
};

export default RecruitersSection;
