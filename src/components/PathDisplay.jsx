import React from 'react'
import { MapPin, ArrowRight } from 'lucide-react'

const PathDisplay = ({ directions }) => {
  if (!directions || directions.length === 0) {
    return (
      <div className="rounded-3xl bg-white border border-slate-100 shadow-xl p-6">
        <p className="text-slate-600">Select a destination to see the step-by-step AR route guidance.</p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl bg-white border border-slate-100 shadow-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-3xl bg-blue-50 p-3 text-blue-600">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Navigation path</p>
          <h3 className="text-2xl font-bold text-slate-900">Step-by-step directions</h3>
        </div>
      </div>

      <div className="space-y-4">
        {directions.map((step, index) => (
          <div key={`${step.from}-${step.to}-${index}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">Step {index + 1}</p>
                <p className="font-semibold text-slate-900">{step.instruction}</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                <ArrowRight className="w-3 h-3" />
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
