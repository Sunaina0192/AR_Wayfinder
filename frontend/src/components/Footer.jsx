import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  }

  return (

    <footer className="
    bg-slate-950
    text-slate-200
    border-t border-cyan-400/20
    relative overflow-hidden
    ">

      {/* Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-sky-400/10 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

        <div className="grid md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">

          {/* About */}
          <div>

            <h3 className="text-3xl font-black text-white">
              SBBSU
            </h3>

            <p className="mt-4 text-sm text-soft/70 leading-relaxed">
              Sant Baba Bhag Singh University is committed to academic excellence and innovation.
            </p>
          </div>

          {/* Links */}
          <div>

            <h3 className="text-white text-lg font-bold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li><Link to="/" className="hover:text-accent transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-accent transition">About</Link></li>
              <li><Link to="/courses" className="hover:text-accent transition">Courses</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>

            <h3 className="text-white text-lg font-bold mb-6">
              Contact
            </h3>

            <div className="space-y-4 text-sm">

              <div className="flex gap-3 items-center">
                <Phone className="text-accent w-4 h-4" />
                <span>+91 1673-505-505</span>
              </div>

              <div className="flex gap-3 items-center">
                <Mail className="text-accent w-4 h-4" />
                <span>info@sbbsuniversity.ac.in</span>
              </div>

              <div className="flex gap-3 items-center">
                <MapPin className="text-accent w-4 h-4" />
                <span>Punjab, India</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>

            <h3 className="text-white text-lg font-bold mb-6">
              Follow Us
            </h3>

            <div className="flex gap-4">

              <button className="
              p-3
              rounded-2xl
              bg-white/5
              border border-accent/20
              hover:bg-accent
              hover:text-dark
              hover:scale-110
              hover:shadow-[0_0_25px_rgba(15,164,175,0.7)]
              transition-all duration-300
              ">
                FB
              </button>

              <button className="
              p-3
              rounded-2xl
              bg-white/5
              border border-accent/20
              hover:bg-accent
              hover:text-dark
              hover:scale-110
              transition-all duration-300
              ">
                IG
              </button>

              <button className="
              p-3
              rounded-2xl
              bg-white/5
              border border-accent/20
              hover:bg-accent
              hover:text-dark
              hover:scale-110
              transition-all duration-300
              ">
                TW
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 md:pt-12 text-sm text-soft/70 flex flex-col md:flex-row justify-between">

          <p>
            © 2026 SBBSU. All rights reserved.
          </p>

          <div className="flex gap-6 mt-6 md:mt-0">

            <Link to="/">Privacy</Link>
            <Link to="/">Terms</Link>
            <Link to="/">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer


