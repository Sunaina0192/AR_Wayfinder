import React from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Users, CheckSquare, UploadCloud, Bell } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'Teacher') return <Navigate to="/" replace />;

  const statCards = [
    { label: 'Assigned Classes', value: '4', icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Total Students', value: '120', icon: Users, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Pending Attendance', value: '2', icon: CheckSquare, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { label: 'New Notifications', value: '1', icon: Bell, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ];

  return (
    <div className="min-h-screen bg-dark text-white pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tight">Teacher Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Welcome back, {user.name} ({user.department})</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {statCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-3xl font-black text-white">{stat.value}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions Placeholder */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-black uppercase tracking-widest text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/teacher/academics" className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-accent/50 hover:bg-accent/10 transition-all group block">
              <CheckSquare className="w-6 h-6 text-slate-400 group-hover:text-accent transition-colors" />
              <div className="text-left">
                <p className="font-bold text-white">Mark Attendance</p>
                <p className="text-xs text-slate-500">Record daily student attendance</p>
              </div>
            </Link>
            <Link to="/teacher/academics" className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-accent/50 hover:bg-accent/10 transition-all group block">
              <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-accent transition-colors" />
              <div className="text-left">
                <p className="font-bold text-white">Upload Marks</p>
                <p className="text-xs text-slate-500">Add results for assignments</p>
              </div>
            </Link>
            <Link to="/teacher/academics" className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-accent/50 hover:bg-accent/10 transition-all group block">
              <BookOpen className="w-6 h-6 text-slate-400 group-hover:text-accent transition-colors" />
              <div className="text-left">
                <p className="font-bold text-white">Study Material</p>
                <p className="text-xs text-slate-500">Upload notes and syllabus</p>
              </div>
            </Link>
          </div>
          <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400 text-sm text-center font-bold">
            ✅ Phase 3 Modules are now live! Click any action above to manage academics.
          </div>
        </div>

      </div>
    </div>
  );
};

export default TeacherDashboard;
