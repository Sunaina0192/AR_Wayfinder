import React from 'react';

const RecruitersSection = () => {
  const logos = [
    { name: "Wipro", url: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" },
    { name: "Justdial", url: "https://upload.wikimedia.org/wikipedia/commons/2/23/Justdial_logo.png" },
    { name: "TCS", url: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg" },
    { name: "Infosys", url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" },
    { name: "Tech Mahindra", url: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Tech_Mahindra_New_Logo.svg" }
  ];

  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 bg-[#020817] border-t border-slate-800 flex justify-center w-full">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-black text-white mb-12 text-center uppercase tracking-widest text-slate-400">
          Our Top Recruiters
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 hover:opacity-100 transition-opacity duration-500">
          {logos.map((logo, idx) => (
            <div key={idx} className="w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110">
              <img src={logo.url} alt={logo.name} className="max-w-full max-h-full object-contain filter brightness-200 contrast-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecruitersSection;
