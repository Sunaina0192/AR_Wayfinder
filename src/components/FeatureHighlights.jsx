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

const FeatureHighlights = ({ isDarkMode }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {features.map((feature) => {
        const Icon = feature.icon
        return (
          <div 
            key={feature.title} 
            className={`rounded-[2rem] p-7 transition-all duration-500 transform hover:-translate-y-2 border ${
              isDarkMode 
                ? 'bg-white/5 border-white/10 hover:bg-white/10 shadow-2xl' 
                : 'bg-white border-white shadow-xl shadow-slate-200/40 hover:shadow-2xl'
            }`}
          >
            <div className={`mb-6 inline-flex items-center justify-center rounded-2xl p-4 transition-colors ${
              isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'
            }`}>
              <Icon className="w-6 h-6" />
            </div>
            <h4 className={`text-lg font-black mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {feature.title}
            </h4>
            <p className={`text-xs font-medium leading-relaxed ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
              {feature.description}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default FeatureHighlights
