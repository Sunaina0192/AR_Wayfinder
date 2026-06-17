import React, { useState } from 'react';
import { BookOpen, ArrowLeft, ChevronRight, Layers, FileText, X } from 'lucide-react';
import { institutesData } from '../data/academicsData';

const Courses = () => {
  // Navigation State
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null); // Used for Syllabus Modal

  // --- Handlers ---
  const handleSelectDepartment = (dept) => setSelectedDepartment(dept);
  const handleSelectCourse = (course) => setSelectedCourse(course);
  const handleSelectSemester = (semester) => setSelectedSemester(semester);
  const handleSelectSubject = (subject) => setSelectedSubject(subject);

  const handleBackToDepartments = () => setSelectedDepartment(null);
  const handleBackToCourses = () => setSelectedCourse(null);
  const handleBackToSemesters = () => setSelectedSemester(null);
  const handleCloseSyllabus = () => setSelectedSubject(null);

  // --- Render Views ---

  // View 1: List all Institutes and their Departments
  const renderDepartmentsView = () => (
    <div className="space-y-16 animate-fade-in-up">
      {institutesData.map((institute) => (
        <div key={institute.id} className="glass p-8 rounded-[2rem] border border-white/10 shadow-2xl">
          <h2 className="text-3xl font-black text-white mb-8 border-b border-white/10 pb-4">{institute.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {institute.departments.map((dept) => (
              <div 
                key={dept.id} 
                onClick={() => handleSelectDepartment(dept)}
                className="group relative bg-black/40 border border-white/5 p-6 rounded-2xl hover:border-accent/40 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-bl-full group-hover:bg-accent/20 transition-colors"></div>
                <Layers className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-xl font-bold text-slate-200 group-hover:text-white transition-colors">{dept.name}</h3>
                <div className="mt-6 flex items-center text-xs font-black uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  View Courses <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  // View 2: List Courses for Selected Department
  const renderCoursesView = () => (
    <div className="animate-fade-in-up">
      <button onClick={handleBackToDepartments} className="mb-8 flex items-center text-sm font-bold text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Departments
      </button>
      
      <div className="mb-10">
        <span className="text-accent text-xs font-black tracking-[0.3em] uppercase">Department</span>
        <h2 className="text-4xl font-black text-white">{selectedDepartment.name}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedDepartment.courses && selectedDepartment.courses.length > 0 ? (
          selectedDepartment.courses.map((course) => (
            <div 
              key={course.id} 
              onClick={() => handleSelectCourse(course)}
              className="group glass border border-white/10 p-8 rounded-3xl hover:border-accent/50 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-2xl"
            >
              <BookOpen className="w-10 h-10 text-accent mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-black text-white mb-2">{course.name}</h3>
              <p className="text-slate-400 text-sm">Explore semesters, subjects, and complete syllabus details.</p>
              <div className="mt-8 flex items-center text-xs font-black uppercase tracking-widest text-accent">
                View Semesters <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))
        ) : (
          <p className="text-slate-400 italic">No courses currently listed for this department.</p>
        )}
      </div>
    </div>
  );

  // View 3: List Semesters for Selected Course
  const renderSemestersView = () => (
    <div className="animate-fade-in-up">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={handleBackToCourses} className="flex items-center text-sm font-bold text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Courses
        </button>
      </div>

      <div className="mb-10 glass p-6 rounded-3xl border border-white/10 border-l-4 border-l-accent">
        <span className="text-slate-400 text-xs font-black tracking-[0.2em] uppercase block mb-1">{selectedDepartment.name}</span>
        <h2 className="text-3xl font-black text-white">{selectedCourse.name}</h2>
      </div>

      <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">Select Semester</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {selectedCourse.semesters && selectedCourse.semesters.length > 0 ? (
          selectedCourse.semesters.map((sem) => (
            <div 
              key={sem.id} 
              onClick={() => handleSelectSemester(sem)}
              className="bg-black/40 border border-white/10 p-6 rounded-2xl text-center cursor-pointer hover:bg-accent/10 hover:border-accent/50 transition-all duration-300 shadow-lg"
            >
              <span className="block text-xl font-black text-white">{sem.name}</span>
            </div>
          ))
        ) : (
          <p className="text-slate-400 italic col-span-2">No semesters listed for this course.</p>
        )}
      </div>
    </div>
  );

  // View 4: List Subjects for Selected Semester
  const renderSubjectsView = () => (
    <div className="animate-fade-in-up">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={handleBackToSemesters} className="flex items-center text-sm font-bold text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Semesters
        </button>
      </div>

      <div className="mb-10 glass p-6 rounded-3xl border border-white/10">
        <span className="text-accent text-xs font-black tracking-[0.2em] uppercase block mb-1">{selectedCourse.name}</span>
        <h2 className="text-3xl font-black text-white">{selectedSemester.name} Subjects</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {selectedSemester.subjects && selectedSemester.subjects.length > 0 ? (
          selectedSemester.subjects.map((sub) => (
            <div 
              key={sub.id} 
              onClick={() => handleSelectSubject(sub)}
              className="group glass border border-white/10 p-6 rounded-2xl cursor-pointer hover:border-accent transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between shadow-xl"
            >
              <div>
                <span className="inline-block px-2 py-1 bg-white/5 rounded text-xs font-mono text-slate-400 mb-2 border border-white/5">{sub.code}</span>
                <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">{sub.name}</h3>
                <p className="text-slate-400 text-sm mt-1">Credits: <span className="text-slate-200 font-bold">{sub.credits}</span></p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-accent/10 rounded-xl text-accent text-xs font-black uppercase tracking-widest group-hover:bg-accent group-hover:text-dark transition-all">
                <FileText className="w-4 h-4 mr-2" /> View Syllabus
              </div>
            </div>
          ))
        ) : (
          <p className="text-slate-400 italic">No subjects listed for this semester.</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-dark text-white pt-24 pb-20">
      <section className="relative py-16 md:py-24 overflow-hidden flex justify-center">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
            <BookOpen className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Academic Structure</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">
            Explore <span className="text-accent">Academics</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
            Navigate through our institutes, departments, courses, and detailed semester-wise syllabus.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {!selectedDepartment && renderDepartmentsView()}
        {selectedDepartment && !selectedCourse && renderCoursesView()}
        {selectedCourse && !selectedSemester && renderSemestersView()}
        {selectedSemester && renderSubjectsView()}
      </section>

      {/* Syllabus Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-dark/90 backdrop-blur-sm" 
            onClick={handleCloseSyllabus}
          ></div>
          <div className="relative glass bg-[#0a0a0a] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto z-10 shadow-2xl animate-fade-in-up">
            <div className="sticky top-0 bg-[#0a0a0a]/90 backdrop-blur border-b border-white/10 p-6 flex justify-between items-start z-20">
              <div>
                <span className="inline-block px-2 py-1 bg-white/10 rounded text-xs font-mono text-accent mb-2">{selectedSubject.code}</span>
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight pr-8">{selectedSubject.name}</h3>
                <p className="text-slate-400 text-sm mt-2">Credits: <span className="text-white font-bold">{selectedSubject.credits}</span></p>
              </div>
              <button 
                onClick={handleCloseSyllabus}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8">
              <h4 className="text-sm font-black uppercase tracking-widest text-accent mb-6 border-b border-white/10 pb-2">Complete Syllabus</h4>
              <div className="prose prose-invert prose-slate max-w-none">
                {selectedSubject.syllabus.split('\n').map((line, idx) => (
                  <p key={idx} className="text-slate-300 leading-relaxed mb-4">{line}</p>
                ))}
              </div>
            </div>
            
            <div className="p-6 border-t border-white/10 bg-black/50 text-right">
              <button 
                onClick={handleCloseSyllabus}
                className="px-6 py-2 glass rounded-xl text-xs font-bold text-white uppercase tracking-wider hover:bg-accent hover:text-dark transition-all"
              >
                Close Syllabus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
