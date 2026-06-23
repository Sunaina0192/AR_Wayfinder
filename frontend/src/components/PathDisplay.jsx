import React from 'react'
import { MapPin, ArrowRight } from 'lucide-react'

const PathDisplay = ({ directions, isDarkMode }) => {
  if (!directions || directions.length === 0) {
    return null;
  }

  return (
    <div className={`rounded-[2.5rem] p-8 border transition-all duration-500 ${
      isDarkMode 
        ? 'bg-white/5 border-white/10 shadow-2xl' 
        : 'bg-white border-white shadow-xl shadow-slate-200/50'
    }`}>
      <div className="flex items-center gap-4 mb-8">
        <div className="rounded-2xl bg-blue-500 text-white p-4 shadow-lg shadow-blue-500/20">
          <MapPin className="w-6 h-6" />
        </div>
        <div>
          <p className={`text-[10px] uppercase tracking-[0.2em] font-black ${isDarkMode ? 'text-blue-400' : 'text-slate-400'}`}>
            Trajectory
          </p>
          <h3 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Route Execution
          </h3>
        </div>
      </div>

      <div className="space-y-4 relative">
        {/* Connection Line */}
        <div className="absolute left-[2.25rem] top-8 bottom-8 w-0.5 bg-linear-to-b from-blue-500/50 to-transparent"></div>
        
        {directions.map((step, index) => (
          <div key={`${step.from}-${step.to}-${index}`} className={`relative z-10 rounded-2xl p-5 border transition-all ${
            isDarkMode 
              ? 'bg-white/5 border-white/5 hover:bg-white/10' 
              : 'bg-slate-50/50 border-slate-100 hover:bg-blue-50/50 hover:border-blue-100'
          }`}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-5">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-600 text-white'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <p className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {step.instruction}
                  </p>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    Segment {index + 1}
                  </p>
                </div>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                isDarkMode ? 'bg-white/10 text-white/60' : 'bg-white border border-slate-100 text-slate-500 shadow-sm'
              }`}>
                {step.distance}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PathDisplay
