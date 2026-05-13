import React from 'react';
import { BookOpen, Clock, Users } from 'lucide-react';

const Courses = () => {
  const programs = [
    {
      name: 'B.Tech Engineering',
      duration: '4 Years',
      specializations: ['CSE', 'UIET', 'ECE', 'Mechanical'],
      icon: '🔧'
    },
    {
      name: 'BBA - Business Administration',
      duration: '3 Years',
      specializations: ['Finance', 'Marketing', 'HR', 'Operations'],
      icon: '💼'
    },
    {
      name: 'BA/B.Sc - School Programs',
      duration: '3 Years',
      specializations: ['Science', 'Humanities', 'Commerce'],
      icon: '📚'
    },
    {
      name: 'M.Tech Engineering',
      duration: '2 Years',
      specializations: ['Various Engineering Disciplines'],
      icon: '🎓'
    },
    {
      name: 'MBA - Master of Business',
      duration: '2 Years',
      specializations: ['Full Time', 'Executive Track'],
      icon: '📈'
    },
    {
      name: 'Ph.D. Programs',
      duration: 'Research Based',
      specializations: ['Engineering', 'Science', 'Humanities'],
      icon: '🔬'
    }
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 md:py-24 flex justify-center">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Academic Programs</h1>
          <p className="text-xl opacity-90">Comprehensive range of undergraduate and postgraduate courses</p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-12 md:py-24 bg-gray-50 flex justify-center w-full">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {programs.map((program, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                  <div className="text-5xl mb-3">{program.icon}</div>
                  <h3 className="text-2xl font-bold">{program.name}</h3>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4 text-gray-700">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold">{program.duration}</span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-600 mb-2">Specializations:</p>
                    <div className="flex flex-wrap gap-2">
                      {program.specializations.map((spec, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Info */}
      <section className="py-12 md:py-24 bg-white flex justify-center w-full">
        <div className="max-w-4xl mx-auto px-4 w-full">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Admission Process</h2>
          
          <div className="space-y-6">
            {[
              { step: 1, title: 'Apply Online', desc: 'Fill out the application form with your academic details' },
              { step: 2, title: 'Submit Documents', desc: 'Upload qualifying exam scores and certificates' },
              { step: 3, title: 'Entrance Test', desc: 'Take the relevant entrance examination' },
              { step: 4, title: 'Merit List', desc: 'Check the merit list and accept your seat' },
              { step: 5, title: 'Registration', desc: 'Complete registration and pay admission fees' }
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                  <p className="text-gray-700">{item.desc}</p>
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
