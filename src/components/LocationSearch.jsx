import React from 'react'
import { Search, Sparkles, MapPin } from 'lucide-react'
import { campusLocations } from '../data/locations'

const popularDestinationIds = ['library', 'admission-cell', 'workshop-center', 'stadium']

const popularDestinations = campusLocations.filter((location) => 
  popularDestinationIds.includes(location.id)
)

const LocationSearch = ({ query, onChange, results, onSelect, isDarkMode }) => {
  return (
    <div className={`rounded-[2.5rem] transition-all duration-500 p-8 border ${
      isDarkMode 
        ? 'bg-white/5 border-white/10 shadow-2xl' 
        : 'bg-white border-white shadow-2xl shadow-slate-200/60'
    }`}>
      <div className="flex items-start gap-5 mb-8">
        <div className="p-5 bg-linear-to-br from-blue-500 to-indigo-600 text-white rounded-[1.5rem] shadow-xl shadow-blue-500/20">
          <Search className="w-7 h-7" />
        </div>
        <div>
          <h2 className={`text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Find destination
          </h2>
          <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} mt-1 font-medium`}>
            Search landmarks or browse popular spots
          </p>
        </div>
      </div>

      <div className="relative mb-8 group">
        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Where would you like to go?"
          className={`w-full rounded-2xl px-6 py-5 pr-14 text-lg transition-all duration-300 focus:outline-none focus:ring-4 ${
            isDarkMode 
              ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:ring-blue-500/20 focus:bg-white/10' 
              : 'bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-400 focus:ring-blue-500/10 focus:bg-white focus:border-blue-200'
          }`}
        />
        <div className="absolute right-5 top-1/2 -translate-y-1/2 p-2">
          <Search className={`w-6 h-6 transition-colors duration-300 ${isDarkMode ? 'text-slate-600 group-focus-within:text-blue-400' : 'text-slate-300 group-focus-within:text-blue-500'}`} />
        </div>
      </div>

      <div className="grid gap-3">
        {results.length > 0 ? (
          results.slice(0, 5).map((location) => (
            <button
              key={location.id}
              onClick={() => onSelect(location.id)}
              className={`text-left rounded-2xl px-5 py-4 transition-all duration-300 flex items-center justify-between group ${
                isDarkMode 
                  ? 'bg-white/5 hover:bg-white/10 border border-white/5' 
                  : 'bg-slate-50/50 hover:bg-blue-50 border border-slate-100 hover:border-blue-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 ${
                  isDarkMode ? 'bg-white/5' : 'bg-white shadow-sm'
                }`}>
                  {location.icon}
                </div>
                <div>
                  <p className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{location.name}</p>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>{location.description}</p>
                </div>
              </div>
              <MapPin className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all text-blue-500 -translate-x-2 group-hover:translate-x-0" />
            </button>
          ))
        ) : (
          <div className="py-4">
            <p className={`text-xs font-black uppercase tracking-widest mb-4 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
              Recommended for you
            </p>
            <div className="grid gap-3">
              {popularDestinations.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 border ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/5 hover:bg-white/10 text-slate-400 hover:text-white' 
                      : 'bg-white border-slate-100 hover:bg-blue-50 hover:border-blue-100 text-slate-600 hover:text-blue-600 shadow-sm'
                  }`}
                >
                  <MapPin className={`w-5 h-5 ${isDarkMode ? 'text-slate-600' : 'text-blue-500'}`} />
                  <span className="text-sm font-bold">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={`mt-8 rounded-2xl p-5 border flex items-center gap-4 ${
        isDarkMode 
          ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' 
          : 'bg-blue-50 border-blue-100 text-blue-700'
      }`}>
        <Sparkles className="w-6 h-6 shrink-0" />
        <p className="text-sm font-bold leading-tight">
          Instant search with AR support. Just type and start your journey.
        </p>
      </div>
    </div>
  )
}

export default LocationSearch
