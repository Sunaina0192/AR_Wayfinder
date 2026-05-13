import React from 'react'
import { History, Clock3, ArrowRight } from 'lucide-react'

const NavigationHistory = ({ history, onSelect }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-slate-400">History</p>
          <h3 className="text-2xl font-bold text-slate-900">Recent routes</h3>
        </div>
        <History className="w-6 h-6 text-blue-600" />
      </div>

      {history.length > 0 ? (
        <div className="space-y-4">
          {history.map((record) => (
            <button
              type="button"
              key={`${record.id}-${record.createdAt}`}
              onClick={() => onSelect(record.destinationId || record.id)}
              className="w-full rounded-3xl border border-slate-200 p-4 text-left hover:bg-blue-50 transition"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{record.name}</p>
                  <p className="text-sm text-slate-500">{new Date(record.createdAt).toLocaleString()}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl bg-slate-50 p-5 text-slate-600">
          No recent routes yet. Start by selecting a location on the map.
        </div>
      )}
    </div>
  )
}

export default NavigationHistory
