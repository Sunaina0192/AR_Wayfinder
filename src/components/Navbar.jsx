import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'SBBSU' },
    { path: '/about', label: 'ABOUT HEI' },
    { path: '/administration', label: 'ADMINISTRATION' },
    { path: '/academics', label: 'ACADEMICS' },
    { path: '/admissions', label: 'ADMISSIONS & FEE' },
    { path: '/navigator', label: 'NAVIGATOR' },
    { path: '/history', label: 'HISTORY' },
    { path: '/alumni', label: 'ALUMNI' },
    { path: '/gallery', label: 'GALLERY' },
    { path: '/information-corner', label: 'INFORMATION CORNER' },
    { path: '/contact', label: 'CONTACT' }
  ];

  return (

    <nav className="
    sticky top-0 z-50
    bg-primary/80
    backdrop-blur-2xl
    border-b border-accent/20
    shadow-2xl
    ">

      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">

        <div className="flex justify-between items-center h-16">

          {/* Desktop */}
          <div className="hidden xl:flex items-center w-full gap-12 justify-center">
            <Link to="/" className="shrink-0 flex items-center">
              <img src="https://tse4.mm.bing.net/th/id/OIP.CFPv_z6BL9jQYhCuuqtsBQAAAA?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3" alt="SBBSU Logo" className="h-12 w-auto object-contain hover:scale-105 transition-transform" />
            </Link>

            <div className="flex items-center gap-6">
            {navLinks.map((link) => {

              const active = location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                  px-2 py-5
                  text-[11px]
                  font-black
                  tracking-[0.15em]
                  transition-all duration-300
                  border-b-2
                  whitespace-nowrap
                  ${
                    active
                      ? 'text-accent border-accent drop-shadow-[0_0_10px_rgba(15,164,175,0.8)]'
                      : 'text-soft/80 border-transparent hover:text-accent'
                  }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
            </div>
          </div>

          {/* Mobile */}
          <div className="xl:hidden flex justify-between items-center w-full">

            <Link to="/" className="flex items-center gap-3">
              <img src="https://sbbsuniversity.ac.in/images/logo.png" alt="SBBSU Logo" className="h-10 w-auto object-contain" />
              <span className="text-white font-black text-xl tracking-widest">
                SBBSU
              </span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
            >
              {
                isOpen
                  ? <X className="w-6 h-6" />
                  : <Menu className="w-6 h-6" />
              }
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (

          <div className="xl:hidden py-4 space-y-2 border-t border-accent/20">

            {navLinks.map((link) => (

              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="
                block
                px-4 py-3
                rounded-xl
                text-soft
                hover:bg-accent
                hover:text-dark
                transition-all duration-300
                "
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;