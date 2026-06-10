import React, { useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Briefcase, GraduationCap, 
  IndianRupee, Map, Calendar, ClipboardList, FileCheck, 
  Bell, Info, Shield, LogOut, ChevronLeft, Menu, X, ArrowLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If not admin, redirect to home
  if (!user || (user.role !== 'Admin' && !user.isSuperAdmin)) {
    return <Navigate to="/" replace />;
  }

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Students', path: '/admin/students', icon: Users },
    { name: 'Teachers', path: '/admin/teachers', icon: Briefcase },
    { name: 'Academics', path: '/admin/academics', icon: GraduationCap },
    { name: 'Fees / ERP', path: '/admin/erp', icon: IndianRupee },
    { name: 'AR Navigation', path: '/admin/navigation', icon: Map },
    { name: 'Events', path: '/admin/events', icon: Calendar },
    { name: 'Admissions', path: '/admin/admissions', icon: ClipboardList },
    { name: 'Results', path: '/admin/results', icon: FileCheck },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell },
    { name: 'Info Corner', path: '/admin/information-corner', icon: Info },
  ];

  if (user.isSuperAdmin) {
    adminLinks.push({ name: 'Security & Logs', path: '/admin/security', icon: Shield });
  }

  return (
    <div className="flex h-screen bg-dark overflow-hidden selection:bg-accent/30 text-white">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-950 border-r border-white/5
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Area */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/5 bg-black/20">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-accent" />
            <div>
              <h1 className="font-black tracking-widest uppercase text-white">Admin Panel</h1>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">{user.isSuperAdmin ? 'Super Admin' : 'System Admin'}</p>
            </div>
          </Link>
          <button className="lg:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar space-y-1">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname.startsWith(link.path);
            
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300
                  ${isActive 
                    ? 'bg-accent/10 border border-accent/20 text-accent shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-accent' : 'text-slate-500'}`} />
                <span className="font-bold text-sm tracking-wide">{link.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/5 bg-black/20 space-y-2">
          {/* Back to Home Button */}
          <Link 
            to="/home" 
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all font-bold text-xs uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Website
          </Link>

          {/* User Profile / Logout */}
          <div className="flex items-center justify-between mt-4 px-2">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30 flex-shrink-0">
                <span className="font-black text-accent">{user.name?.charAt(0) || 'A'}</span>
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">{user.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
              </div>
            </div>
            <button 
              onClick={() => { logout(); window.location.href = '/'; }} 
              className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all ml-2"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#0A0D14]">
        {/* Background ambient light */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
        
        {/* Mobile Header */}
        <header className="lg:hidden h-16 flex items-center justify-between px-4 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl z-30">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-accent" />
            <span className="font-black uppercase tracking-widest text-sm text-white">Admin Panel</span>
          </div>
          <button 
            className="p-2 bg-white/5 rounded-lg border border-white/10 text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto relative z-10 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
