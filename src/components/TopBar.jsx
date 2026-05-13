import React from 'react';

const TopBar = () => {
  return (
    <div className="bg-gradient-to-r from-[#003135] via-[#024950] to-[#003135] border-b border-[#0FA4AF]/30 overflow-hidden relative">

      {/* Glow */}
      <div className="absolute left-0 top-0 w-52 h-52 bg-[#0FA4AF]/10 blur-3xl rounded-full"></div>

      <div className="whitespace-nowrap animate-scroll-text py-2 text-[11px] font-bold tracking-[0.25em] uppercase text-[#AFDDE5] relative z-10 text-center">
        ✦ Admission Open 2026-27 ✦ NAAC Accredited ✦ Innovation • Research • Excellence ✦
      </div>
    </div>
  );
};

export default TopBar;