import React from 'react'
import { Navigation, Cpu, Globe, ShieldCheck } from 'lucide-react'

const features = [
  {
    title: 'Real-time AR guidance',
    description: 'Live overlay arrows and navigation prompts directly on the camera feed.',
    icon: Navigation,
  },
  {
    title: 'Smart route optimization',
    description: 'Generate the best path based on campus layout and current position.',
    icon: Cpu,
  },
  {
    title: 'GPS and map integration',
    description: 'Build-in campus map and location intelligence for quick route planning.',
    icon: Globe,
  },
  {
    title: 'Accessible navigation',
    description: 'Designed for new students, visitors and everyone exploring the campus.',
    icon: ShieldCheck,
  },
]

const FeatureHighlights = () => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {features.map((feature) => {
        const Icon = feature.icon
        return (
          <div key={feature.title} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-5 inline-flex items-center justify-center rounded-3xl bg-blue-50 p-4 text-blue-600">
              <Icon className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h4>
            <p className="text-sm text-slate-500 leading-6">{feature.description}</p>
          </div>
        )
      })}
    </div>
  )
}

export default FeatureHighlights
