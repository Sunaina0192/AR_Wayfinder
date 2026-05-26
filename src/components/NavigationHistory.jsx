import React from 'react'
import { History, Clock3, ArrowRight } from 'lucide-react'

const NavigationHistory = ({ history, onSelect, isDarkMode }) => {
  return (
    <div className={`rounded-[2.5rem] p-8 border transition-all duration-500 ${
      isDarkMode 
        ? 'bg-white/5 border-white/10 shadow-2xl' 
        : 'bg-white border-white shadow-xl shadow-slate-200/50'
    }`}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className={`text-[10px] uppercase tracking-[0.2em] font-black ${isDarkMode ? 'text-blue-400' : 'text-slate-400'}`}>
            Audit Trail
          </p>
          <h3 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Recent Trips
          </h3>
        </div>
        <History className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
      </div>

      {history.length > 0 ? (
        <div className="space-y-3">
          {history.map((record) => (
            <button
              type="button"
              key={`${record.id}-${record.createdAt}`}
              onClick={() => onSelect(record.destinationId || record.id)}
              className={`w-full rounded-2xl p-4 text-left transition-all duration-300 flex items-center justify-between group border ${
                isDarkMode 
                  ? 'bg-white/5 border-white/5 hover:bg-white/10' 
                  : 'bg-slate-50 border-slate-100 hover:bg-blue-50 hover:border-blue-100'
              }`}
            >
              <div>
                <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{record.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock3 className="w-3 h-3 text-slate-500" />
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                    {new Date(record.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </button>
          ))}
        </div>
      ) : (
        <div className={`rounded-3xl p-6 text-center border-2 border-dashed ${isDarkMode ? 'bg-white/5 border-white/10 text-slate-500' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
          <p className="text-sm font-bold">No recent activity detected.</p>
        </div>
      )}
    </div>
  )
}

export default NavigationHistory
