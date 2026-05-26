import React from 'react';
import { BookOpen, Clock, Users, ArrowRight } from 'lucide-react';

const Courses = () => {
  const programs = [
    {
      name: 'B.Tech Engineering',
      duration: '4 Years',
      specializations: ['CSE', 'UIET', 'ECE', 'Mechanical'],
      icon: '🔧',
      color: 'from-accent to-blue-600'
    },
    {
      name: 'BBA - Management',
      duration: '3 Years',
      specializations: ['Finance', 'Marketing', 'HR', 'Operations'],
      icon: '💼',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      name: 'BA/B.Sc - Sciences',
      duration: '3 Years',
      specializations: ['Science', 'Humanities', 'Commerce'],
      icon: '📚',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      name: 'M.Tech Engineering',
      duration: '2 Years',
      specializations: ['Various Engineering Disciplines'],
      icon: '🎓',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      name: 'MBA - Master of Business',
      duration: '2 Years',
      specializations: ['Full Time', 'Executive Track'],
      icon: '📈',
      color: 'from-amber-500 to-orange-600'
    },
    {
      name: 'Ph.D. Programs',
      duration: 'Research Based',
      specializations: ['Engineering', 'Science', 'Humanities'],
      icon: '🔬',
      color: 'from-rose-500 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-dark text-white pt-24 pb-20">
      {/* Hero Header */}
      <section className="relative py-24 md:py-32 overflow-hidden flex justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] animate-pulse-slow delay-700"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8">
            <BookOpen className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Academic Excellence</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-none">
            Global <span className="text-accent">Programs</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            Discover a diverse range of undergraduate and postgraduate courses designed for the future.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-24 relative flex justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {programs.map((program, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col glass rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <div className={`h-4 w-full bg-gradient-to-r ${program.color}`}></div>
                
                <div className="p-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-5xl group-hover:scale-110 transition-transform duration-500">{program.icon}</div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      <Clock className="w-3 h-3 text-accent" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{program.duration}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black text-white group-hover:text-accent transition-colors leading-tight mb-6">
                    {program.name}
                  </h3>
                  
                  <div className="mb-10 flex-grow">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Focus Areas</p>
                    <div className="flex flex-wrap gap-2">
                      {program.specializations.map((spec, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300 group-hover:border-accent/30 transition-colors">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] group-hover:bg-accent group-hover:text-dark group-hover:border-accent transition-all duration-300">
                    Syllabus & Details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-24 relative flex justify-center">
        <div className="max-w-5xl mx-auto px-4 w-full">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">
              The Admission <span className="text-accent">Journey</span>
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
          </div>
          
          <div className="space-y-6 relative">
            {/* Timeline Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent md:-translate-x-1/2"></div>

            {[
              { step: 1, title: 'Apply Online', desc: 'Secure your place by filling out our digital application portal.' },
              { step: 2, title: 'Document Audit', desc: 'Our team verifies your academic credentials and test scores.' },
              { step: 3, title: 'Entrance Assessment', desc: 'Demonstrate your potential through our specialized entrance tests.' },
              { step: 4, title: 'Merit Selection', desc: 'Receive your formal offer based on holistic performance.' },
              { step: 5, title: 'Final Onboarding', desc: 'Complete registration and join the global SBBSU community.' }
            ].map((item, idx) => (
              <div key={item.step} className={`flex items-center gap-8 md:gap-0 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} relative z-10`}>
                <div className="flex-1 hidden md:block"></div>
                
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 glass border-white/20 text-accent rounded-full flex items-center justify-center font-black text-xl md:text-2xl shadow-2xl relative z-20">
                  {item.step}
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-lg -z-10 group-hover:bg-accent/40 transition-colors"></div>
                </div>

                <div className="flex-1 md:px-12 py-4">
                  <div className="p-8 glass rounded-3xl border-white/5 hover:border-accent/30 transition-all duration-500">
                    <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{item.title}</h3>
                    <p className="text-slate-400 font-medium">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
