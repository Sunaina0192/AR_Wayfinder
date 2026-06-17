import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import {
  Users, BookOpen, AlertTriangle, CheckCircle, 
  Shield, Calendar, IndianRupee, Hash, Bell, 
  Database, Settings, GraduationCap, Briefcase, Map
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();

  if (!user || (user.role !== 'Admin' && !user.isSuperAdmin)) return <Navigate to="/" replace />;

  const adminModules = [
    { name: 'Manage Students', path: '/admin/students', icon: Users, color: 'blue', desc: 'Add, edit, or remove students' },
    { name: 'Manage Teachers', path: '/admin/teachers', icon: Briefcase, color: 'purple', desc: 'Faculty directory and roles' },
    { name: 'Academics', path: '/admin/academics', icon: GraduationCap, color: 'cyan', desc: 'Courses, departments, classes' },
    { name: 'Fees & ERP', path: '/admin/erp', icon: IndianRupee, color: 'emerald', desc: 'Payment tracking and records' },
    { name: 'Admissions', path: '/admin/admissions', icon: Hash, color: 'indigo', desc: 'New applications processing' },
    { name: 'AR Navigation', path: '/admin/navigation', icon: Map, color: 'teal', desc: 'Manage campus locations' },
    { name: 'Events', path: '/admin/events', icon: Calendar, color: 'rose', desc: 'Campus events and schedules' },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell, color: 'amber', desc: 'Send alerts and announcements' }
  ];

  return (
    <div className="p-6 min-h-full">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-black tracking-widest uppercase mb-3">
              <Shield className="w-3.5 h-3.5" /> {user.isSuperAdmin ? 'Super Admin' : 'Admin'} Dashboard
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tight">Admin Panel</h1>
            <p className="text-slate-400 text-sm mt-1">Welcome, {user.name}. Select a module to manage the system.</p>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {adminModules.map((module, idx) => {
            const Icon = module.icon;
            return (
              <Link to={module.path} key={idx} className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:-translate-y-1 hover:shadow-xl transition-all group relative overflow-hidden flex flex-col items-center text-center gap-4">
                <div className={`absolute inset-0 bg-${module.color}-500/5 group-hover:bg-${module.color}-500/10 transition-colors`}></div>
                <div className={`p-4 rounded-2xl bg-${module.color}-500/20 border border-${module.color}-500/30 shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:scale-110 transition-transform relative z-10`}>
                  <Icon className={`w-8 h-8 text-${module.color}-400 drop-shadow-md`} />
                </div>
                <div className="relative z-10 mt-2">
                  <h3 className="text-lg font-black text-white mb-1">{module.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">{module.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Super Admin Options */}
        {user.isSuperAdmin && (
          <div className="mt-12 pt-8 border-t border-white/10">
            <h2 className="text-xl font-black text-white uppercase tracking-wide mb-6">Super Admin Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/admin/security" className="bg-black/50 border border-amber-500/30 rounded-3xl p-5 flex items-center justify-between hover:bg-black/70 transition-all group shadow-lg">
                <span className="font-black uppercase tracking-widest text-sm text-amber-400 group-hover:text-amber-300">System Security</span>
                <Database className="w-5 h-5 text-amber-400/80 group-hover:scale-110 transition-transform" />
              </Link>
              <Link to="/admin/users" className="bg-black/50 border border-amber-500/30 rounded-3xl p-5 flex items-center justify-between hover:bg-black/70 transition-all group shadow-lg">
                <span className="font-black uppercase tracking-widest text-sm text-amber-400 group-hover:text-amber-300">Manage Admins</span>
                <Settings className="w-5 h-5 text-amber-400/80 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
