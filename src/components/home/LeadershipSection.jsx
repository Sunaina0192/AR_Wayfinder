import React from 'react';

const LeadershipSection = () => {
  const leaders = [
    { name: "Sant Baba Dilawar Singh Ji", role: "Hon'ble Chancellor", image: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=500&auto=format&fit=crop" },
    { name: "Sant Baba Sarwan Singh Ji", role: "Hon'ble Vice-Chancellor", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop" },
    { name: "S. Hardaman Singh", role: "Hon'ble Secretary", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop" }
  ];

  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 bg-[#111827] relative border-t border-b border-cyan-500/10 flex flex-col items-center w-full">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.02)_50%,transparent_75%)] bg-[size:20px_20px]"></div>
      
      <div className="max-w-6xl mx-auto relative z-10 w-full flex flex-col items-center">
        <h2 className="text-3xl font-black text-white mb-16 text-center uppercase tracking-widest">
          Our Esteemed Leadership
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {leaders.map((leader, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="relative group w-48 h-48 mb-6">
                {/* Futuristic Hex/Circle Frame */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-full group-hover:border-cyan-300 transition-colors animate-[spin_10s_linear_infinite] group-hover:animate-none"></div>
                
                <img 
                  src={leader.image} 
                  alt={leader.name} 
                  className="w-full h-full object-cover rounded-full p-2 bg-slate-900 grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h3 className="text-lg font-bold text-white text-center">{leader.name}</h3>
              <p className="text-cyan-400 text-sm mt-1 uppercase tracking-wider font-semibold">{leader.role}</p>
              
              <div className="w-12 h-0.5 bg-slate-700 mt-4 group-hover:bg-cyan-500 transition-colors"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
