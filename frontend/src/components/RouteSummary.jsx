import React from 'react'
import { Clock3, MapPin, Navigation } from 'lucide-react'
import { getLocationById } from '../data/locations'

const RouteSummary = ({ selectedLocation, distance, isDarkMode }) => {
  const location = selectedLocation ? getLocationById(selectedLocation) : null
  const estimatedTime = selectedLocation ? Math.max(1, Math.round(distance / 50)) : 0

  return (
    <div className={`rounded-[2.5rem] transition-all duration-500 p-8 h-fit flex flex-col justify-between border ${
      isDarkMode 
        ? 'bg-white/5 border-white/10 shadow-2xl' 
        : 'bg-white border-white shadow-xl shadow-slate-200/50'
    }`}>
      <div>
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/20">
            <Navigation className="w-6 h-6 fill-current" />
          </div>
          <div>
            <p className={`text-[10px] uppercase tracking-[0.2em] font-black ${isDarkMode ? 'text-blue-400' : 'text-slate-400'}`}>
              Path Intel
            </p>
            <h3 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Route Details
            </h3>
          </div>
        </div>

        {selectedLocation ? (
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-5 rounded-2xl ${isDarkMode ? 'bg-white/5 border border-white/5' : 'bg-slate-50'}`}>
              <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>ETA</p>
              <p className="text-xl font-black">{estimatedTime} min</p>
            </div>
            <div className={`p-5 rounded-2xl ${isDarkMode ? 'bg-white/5 border border-white/5' : 'bg-slate-50'}`}>
              <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Distance</p>
              <p className="text-xl font-black">{distance}m</p>
            </div>
            <div className={`p-5 rounded-2xl col-span-2 ${isDarkMode ? 'bg-white/5 border border-white/5' : 'bg-slate-50'}`}>
              <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Destination</p>
              <p className="text-lg font-black truncate">{location?.name}</p>
            </div>
          </div>
        ) : (
          <div className={`rounded-3xl p-6 text-center border-2 border-dashed ${isDarkMode ? 'bg-white/5 border-white/10 text-slate-500' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
            <p className="text-sm font-bold">Choose a point to analyze route</p>
          </div>
        )}
      </div>

      <div className={`mt-8 rounded-2xl p-5 border flex items-center gap-4 ${
        isDarkMode 
          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
          : 'bg-emerald-50 border-emerald-100 text-emerald-700'
      }`}>
        <Clock3 className="w-5 h-5 shrink-0" />
        <p className="text-xs font-bold leading-tight">
          AR paths are optimized for walking. GPS precision: ±5m.
        </p>
      </div>
    </div>
  )
}

export default RouteSummary
