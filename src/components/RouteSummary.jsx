import React from 'react'
import { Clock3, MapPin } from 'lucide-react'
import { getLocationById } from '../data/locations'

const RouteSummary = ({ selectedLocation, distance, stepCount }) => {
  const location = selectedLocation ? getLocationById(selectedLocation) : null
  const estimatedTime = selectedLocation ? Math.max(3, Math.round(distance / 45)) : 0

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-7 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-3xl bg-blue-100 text-blue-600">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Route summary</p>
            <h3 className="text-2xl font-bold text-slate-900">Destination overview</h3>
          </div>
        </div>

        {selectedLocation ? (
          <div className="space-y-5">
            <div>
              <p className="text-sm text-slate-500">Destination</p>
              <p className="text-xl font-semibold text-slate-900">{location?.name}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Distance</p>
              <p className="text-xl font-semibold text-slate-900">{distance} meters</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Estimated time</p>
              <p className="text-xl font-semibold text-slate-900">{estimatedTime} min</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Route steps</p>
              <p className="text-xl font-semibold text-slate-900">{stepCount || 0} stops</p>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl bg-slate-50 p-5 text-slate-600">
            <p className="text-base font-medium">Choose a destination to preview your AR route details.</p>
          </div>
        )}
      </div>

      <div className="mt-7 rounded-3xl bg-slate-50 p-5">
        <div className="flex items-center gap-3 text-slate-600">
          <Clock3 className="w-4 h-4" />
          <span className="text-sm">Real-time direction updates, AR-ready path preview.</span>
        </div>
      </div>
    </div>
  )
}

export default RouteSummary
