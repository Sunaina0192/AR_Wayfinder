import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User, Settings, GraduationCap, ShieldCheck, ClipboardList } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();

  const navLinks = [
    { path: '/home', label: 'SBBSU' },
    { path: '/about', label: 'ABOUT US' },
    { path: '/academics', label: 'ACADEMICS' },
    { path: '/admissions', label: 'ADMISSIONS & FEE' },
    { path: '/navigator', label: 'NAVIGATOR' },
    { path: '/history', label: 'HISTORY' },
    { path: '/gallery', label: 'GALLERY' },
    { path: '/information-corner', label: 'INFORMATION CORNER' }
  ];

  return (

    <nav className="
    sticky top-0 z-50
    bg-dark/80
    backdrop-blur-3xl
    border-b border-white/5
    shadow-2xl
    ">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16 md:h-20">

          {/* Desktop Branding & Links */}
          <div className="hidden xl:flex items-center w-full gap-12 justify-between">
            <Link to="/" className="shrink-0 flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 blur-md rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                <img src="https://tse4.mm.bing.net/th/id/OIP.CFPv_z6BL9jQYhCuuqtsBQAAAA?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3" alt="SBBSU Logo" className="h-10 w-auto object-contain hover:rotate-12 transition-transform duration-500 relative z-10" />
              </div>
              <span className="text-white font-black text-xl tracking-[0.2em] group-hover:text-accent transition-colors">SBBSU</span>
            </Link>

            <div className="flex items-center gap-2">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                  px-4 py-2
                  rounded-xl
                  text-[10px]
                  font-black
                  tracking-[0.2em]
                  transition-all duration-300
                  whitespace-nowrap
                  relative group/item
                  ${
                    active
                      ? 'text-accent bg-accent/10 shadow-[0_0_20px_rgba(6,182,212,0.15)] border border-accent/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }
                  `}
                >
                  {link.label}
                  {/* Notification badge for Information Corner */}
                  {link.path === '/information-corner' && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center px-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-[9px] font-black leading-none shadow-[0_0_12px_rgba(239,68,68,0.6)] animate-pulse z-10">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                  {!active && (
                    <span className="absolute bottom-1 left-4 right-4 h-[1px] bg-accent scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left"></span>
                  )}
                </Link>
              );
            })}

              {user && user.role !== 'Visitor' && (
                <div className="relative ml-4 pl-4 border-l border-white/10" onMouseEnter={() => setShowProfileMenu(true)} onMouseLeave={() => setShowProfileMenu(false)}>
                  <div className="flex items-center gap-3 cursor-pointer group/profile">
                    <div className="text-right hidden 2xl:block">
                      <p className="text-[11px] font-black text-white tracking-widest">{user.name}</p>
                      <p className="text-[9px] text-accent font-bold tracking-widest uppercase">{user.role}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-accent/30 overflow-hidden group-hover/profile:border-accent transition-all">
                      {user.avatar ? (
                        <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-accent/10 flex items-center justify-center text-accent">
                          <User className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Profile Dropdown */}
                  {showProfileMenu && (
                    <div className="absolute top-full right-0 pt-2 w-64 z-50">
                      <div className="bg-dark/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden animate-[slide-up_0.2s_ease-out]">
                        <div className="p-4 border-b border-white/5 bg-white/5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${user.role === 'Student' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                            {user.role === 'Student' ? <GraduationCap className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{user.name}</p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-wider">{user.id}</p>
                          </div>
                        </div>
                        <div className="px-2 py-1.5 rounded bg-black/30 border border-white/5">
                          <p className="text-[10px] text-accent uppercase tracking-widest text-center font-bold">{user.department}</p>
                        </div>
                      </div>
                      
                      <div className="p-2 space-y-1">
                        <Link to="/profile" onClick={() => setShowProfileMenu(false)} className="w-full flex items-center gap-3 px-3 py-2 text-xs text-slate-300 font-bold hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                          <User className="w-4 h-4" /> My Profile
                        </Link>
                        <Link to="/settings" onClick={() => setShowProfileMenu(false)} className="w-full flex items-center gap-3 px-3 py-2 text-xs text-slate-300 font-bold hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                          <Settings className="w-4 h-4" /> Settings
                        </Link>
                        {user.role === 'Student' && (
                          <Link to="/student/dashboard" onClick={() => setShowProfileMenu(false)} className="w-full flex items-center gap-3 px-3 py-2 text-xs text-blue-400 font-bold hover:text-white hover:bg-blue-500/10 rounded-lg transition-colors">
                            <GraduationCap className="w-4 h-4" /> Student Dashboard
                          </Link>
                        )}
                        {user.role === 'Teacher' && (
                          <Link to="/teacher/dashboard" onClick={() => setShowProfileMenu(false)} className="w-full flex items-center gap-3 px-3 py-2 text-xs text-amber-400 font-bold hover:text-white hover:bg-amber-500/10 rounded-lg transition-colors">
                            <User className="w-4 h-4" /> Teacher Dashboard
                          </Link>
                        )}
                        {user.role === 'Admin' && (
                          <>
                            <Link to="/admin/dashboard" onClick={() => setShowProfileMenu(false)} className="w-full flex items-center gap-3 px-3 py-2 text-xs text-purple-400 font-bold hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors">
                              <ShieldCheck className="w-4 h-4" /> Admin Dashboard
                            </Link>
                            <Link to="/admin/admissions" onClick={() => setShowProfileMenu(false)} className="w-full flex items-center gap-3 px-3 py-2 text-xs text-purple-400 font-bold hover:text-white hover:bg-purple-500/10 rounded-lg transition-colors">
                              <ClipboardList className="w-4 h-4" /> Admission Applications
                            </Link>
                          </>
                        )}
                      </div>

                      <div className="p-2 border-t border-white/5">
                        <button onClick={() => { logout(); window.location.href = '/'; }} className="w-full flex items-center gap-3 px-3 py-2 text-xs text-red-400 font-bold hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                          <LogOut className="w-4 h-4" /> Log Out
                        </button>
                      </div>
                    </div>
                  </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Branding */}
          <div className="xl:hidden flex justify-between items-center w-full">
            <Link to="/" className="flex items-center gap-3">
              <img src="https://sbbsuniversity.ac.in/images/logo.png" alt="SBBSU Logo" className="h-10 w-auto object-contain" />
              <span className="text-white font-black text-xl tracking-[0.2em]">
                SBBSU
              </span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-accent hover:text-dark transition-all"
            >
              {
                isOpen
                  ? <X className="w-6 h-6" />
                  : <Menu className="w-6 h-6" />
              }
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="xl:hidden py-6 space-y-2 animate-fade-in">
            <div className="grid grid-cols-1 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                  block
                  px-6 py-4
                  rounded-2xl
                  font-bold
                  tracking-widest
                  text-[12px]
                  transition-all duration-300
                  ${
                    location.pathname === link.path
                      ? 'bg-accent text-dark shadow-xl'
                      : 'bg-white/5 text-slate-300 border border-white/5 hover:bg-white/10 hover:translate-x-2'
                  }
                  `}
                >
                  <span className="flex items-center gap-2">
                    {link.label}
                    {link.path === '/information-corner' && unreadCount > 0 && (
                      <span className="min-w-[20px] h-[20px] flex items-center justify-center px-1.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-black leading-none shadow-[0_0_12px_rgba(239,68,68,0.6)] animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </span>
                </Link>
              ))}
              
              {user && user.role !== 'Visitor' && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center justify-between px-6 py-3 mb-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full border border-accent/50" />
                      <div>
                        <p className="text-sm font-bold text-white">{user.name}</p>
                        <p className="text-[10px] text-accent uppercase tracking-widest">{user.role}</p>
                      </div>
                    </div>
                    <User className="w-5 h-5 text-slate-400" />
                  </Link>
                  
                  <Link to="/settings" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-6 py-3 mb-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-sm font-bold text-slate-300">
                    <Settings className="w-4 h-4" /> Settings
                  </Link>

                  {user.role === 'Student' && (
                    <Link to="/student/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-6 py-3 mb-4 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all text-sm font-bold text-blue-400">
                      <GraduationCap className="w-4 h-4" /> Student Dashboard
                    </Link>
                  )}
                  {user.role === 'Teacher' && (
                    <Link to="/teacher/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-6 py-3 mb-4 rounded-xl bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all text-sm font-bold text-amber-400">
                      <User className="w-4 h-4" /> Teacher Dashboard
                    </Link>
                  )}
                  {user.role === 'Admin' && (
                    <>
                      <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-6 py-3 mb-4 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-all text-sm font-bold text-purple-400">
                        <ShieldCheck className="w-4 h-4" /> Admin Dashboard
                      </Link>
                      <Link to="/admin/admissions" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-6 py-3 mb-4 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-all text-sm font-bold text-purple-400">
                        <ClipboardList className="w-4 h-4" /> Admission Applications
                      </Link>
                    </>
                  )}

                  <button onClick={() => { logout(); window.location.href = '/'; }} className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-red-500/10 text-red-400 font-bold hover:bg-red-500/20 transition-all text-xs tracking-widest uppercase">
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;