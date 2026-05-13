import React from 'react';
import { Search } from 'lucide-react';

const Header = () => {

  const linkGroups = [
    ['NAAC Visit', 'Online DMC/Degree', 'NIRF'],
    ['Other Fee Payment', 'IQAC', 'SBBSU Alumni'],
    ['NAD Cell', 'Job Vacancies']
  ];

  return (

    <header className="bg-gradient-to-br from-dark via-primary to-secondary text-white border-b border-accent/20 overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-accent/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-highlight/10 blur-3xl rounded-full"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 py-8">
        <div className="relative z-10 flex flex-col xl:flex-row justify-between items-center gap-10">

          {/* LEFT */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">

            {/* Logo */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-4 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-300 shrink-0">

              <img
                src="https://tse4.mm.bing.net/th/id/OIP.CFPv_z6BL9jQYhCuuqtsBQAAAA?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="SBBSU Logo"
                className="h-20 object-contain"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col items-center sm:items-start">

              <h1 className="text-2xl md:text-4xl font-black leading-none tracking-tight">
                <span className="text-white">SANT BABA</span>{' '}
                <span className="text-accent">BHAG SINGH</span>
              </h1>

              <h2 className="text-xl md:text-3xl font-bold mt-2 text-soft">
                UNIVERSITY
              </h2>

              <p className="text-[10px] uppercase tracking-[0.3em] mt-3 text-gray-400">
                Established vide Punjab Govt. Act No. 6 of 2015
              </p>

              <div className="mt-4 h-[4px] w-full max-w-[400px] rounded-full bg-gradient-to-r from-accent to-highlight"></div>
            </div>

            {/* NAAC Logo */}
            <div className="hidden md:flex hover:scale-105 transition-all duration-300 shrink-0 ml-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-2xl">
              <img
                src="https://tse1.mm.bing.net/th/id/OIP.-Yov1hPq-vfLkjP2VR_LQgHaE6?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="NAAC Accredited Logo"
                className="h-16 object-contain mix-blend-multiply"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col lg:flex-row items-center gap-8 w-full xl:w-auto">

            {/* Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

              {linkGroups.map((group, idx) => (

                <div key={idx} className="flex flex-col gap-3">

                  {group.map((link) => (

                    <button
                      key={link}
                      className="
                      px-4 py-2
                      rounded-2xl
                      bg-white/5
                      border border-accent/20
                      backdrop-blur-xl
                      text-soft
                      text-[11px]
                      font-semibold
                      hover:bg-accent
                      hover:text-dark
                      hover:-translate-y-1
                      hover:shadow-[0_0_25px_rgba(15,164,175,0.7)]
                      transition-all duration-300
                      "
                    >
                      {link}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {/* Search */}
            <div className="relative group w-full sm:w-80">

              <input
                type="text"
                placeholder="Search resources..."
                className="
                w-full
                py-3
                pl-5
                pr-16
                rounded-2xl
                bg-white/5
                border border-accent/20
                backdrop-blur-xl
                text-white
                placeholder:text-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-accent
                transition-all duration-300
                "
              />

              <button
                className="
                absolute
                top-1.5
                right-1.5
                bottom-1.5
                px-5
                rounded-xl
                bg-gradient-to-r
                from-accent
                to-secondary
                hover:shadow-[0_0_30px_rgba(15,164,175,0.8)]
                transition-all duration-300
                "
              >
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;