import React from 'react'
import { Search, Sparkles, MapPin } from 'lucide-react'
import { campusLocations } from '../data/locations'

const popularDestinationIds = ['library', 'admission-cell', 'workshop-center', 'stadium']

const popularDestinations = campusLocations.filter((location) => 
  popularDestinationIds.includes(location.id)
)

const LocationSearch = ({ query, onChange, results, onSelect }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-4 bg-blue-500 text-white rounded-3xl shadow-md">
          <Search className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Find your destination</h2>
          <p className="text-slate-500 mt-1">Search campus landmarks or choose from popular spots.</p>
        </div>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for classroom, lab, office, or building"
          className="w-full border border-slate-200 rounded-2xl px-5 py-4 pr-12 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
      </div>

      <div className="grid gap-3">
        {results.length > 0 ? (
          results.slice(0, 5).map((location) => (
            <button
              key={location.id}
              onClick={() => onSelect(location.id)}
              className="text-left bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 hover:bg-blue-50 transition"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-slate-900">{location.name}</p>
                  <p className="text-sm text-slate-500">{location.description}</p>
                </div>
                <div className="text-xl">{location.icon}</div>
              </div>
            </button>
          ))
        ) : (
          <div className="grid gap-3">
            <p className="text-sm text-slate-500">No matching locations yet. Try one of these:</p>
            {popularDestinations.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => onSelect(item.id)}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 hover:bg-blue-50 transition"
              >
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-slate-700">{item.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 rounded-3xl bg-blue-50 border border-blue-100 p-4">
        <div className="flex items-center gap-3 text-blue-700 font-semibold">
          <Sparkles className="w-5 h-5" />
          <span>Quick campus search helps visitors reach places faster.</span>
        </div>
      </div>
    </div>
  )
}

export default LocationSearch
