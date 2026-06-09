import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { FileText, BookOpen, Clock, Activity, Calendar, Download, Building, Award, CheckSquare } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'Student') return <Navigate to="/" replace />;

  const statCards = [
    { label: 'Attendance', value: '85%', icon: CheckSquare, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Pending Fees', value: '₹0', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { label: 'Latest SGPA', value: '8.4', icon: Award, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  ];

  return (
    <div className="min-h-screen bg-dark text-white pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tight">Student Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Welcome back, {user.name} ({user.id})</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

        {/* Quick Actions */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-black uppercase tracking-widest text-white mb-6">My Academics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/student/academics" className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all group block">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white mb-1">Attendance</h3>
              <p className="text-xs text-slate-500">Track your daily presence</p>
            </Link>
            
            <Link to="/student/academics" className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all group block">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white mb-1">Results</h3>
              <p className="text-xs text-slate-500">View semester grades</p>
            </Link>
            
            <Link to="/student/academics" className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all group block">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white mb-1">Study Material</h3>
              <p className="text-xs text-slate-500">Download course notes</p>
            </Link>

            <button className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all group text-left cursor-not-allowed opacity-70">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white mb-1">Fee Receipt</h3>
              <p className="text-xs text-slate-500">Phase 4 Feature</p>
            </button>
          </div>
          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400 text-sm text-center font-bold">
            ✅ Phase 3 Modules are live! You can now track your attendance, results, and study materials!
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
