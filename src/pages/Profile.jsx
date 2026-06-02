import React, { useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { saveProfile } from '../api/profileApi';
import { 
  User, Mail, Phone, MapPin, Calendar, BookOpen, Clock, 
  Award, Activity, ShieldCheck, Users, Settings, Edit,
  GraduationCap
} from 'lucide-react';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const avatarData = reader.result;
        updateUser({ avatar: avatarData });
        if (user?.id) {
          try {
            await saveProfile({
              userId: user.id,
              name: user.name,
              email: user.email,
              avatar: avatarData,
              department: user.department,
            });
          } catch (error) {
            console.error('Failed to save avatar:', error);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  if (!user || user.role === 'Visitor') {
    return <Navigate to="/" replace />;
  }

  const isStudent = user.role === 'Student';

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
        
        {/* Header Section */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
             {isStudent ? <GraduationCap size={200} /> : <ShieldCheck size={200} />}
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            {/* Avatar */}
            <div className="relative group/avatar">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-accent/30 overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.3)] group-hover/avatar:border-accent transition-all duration-500">
                {user.avatar ? (
                  <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-slate-700 flex items-center justify-center text-slate-400">
                    <User className="w-16 h-16" />
                  </div>
                )}
              </div>
              <button onClick={handleTriggerUpload} className="absolute bottom-2 right-2 p-3 bg-accent text-dark rounded-full shadow-lg hover:scale-110 transition-transform">
                <Edit className="w-5 h-5" />
              </button>
              <p className="mt-3 text-xs text-slate-400 text-center">Click the edit icon to choose an avatar from your phone or browser.</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleAvatarChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-widest uppercase mb-4">
                {isStudent ? <GraduationCap className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                {user.role}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-wider mb-2">{user.name}</h1>
              <p className="text-xl text-slate-300 font-medium tracking-wide mb-4 flex items-center justify-center md:justify-start gap-2">
                <BookOpen className="w-5 h-5 text-accent" /> {user.department}
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-bold text-slate-400">
                <span className="flex items-center gap-1.5"><Activity className="w-4 h-4" /> ID: {user.id}</span>
                <span className="hidden sm:block text-white/20">•</span>
                <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {user.name.toLowerCase().replace(' ', '.')}@sbbsu.ac.in</span>
                <span className="hidden sm:block text-white/20">•</span>
                <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> +91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Content Area - 2 columns on desktop */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Conditional Content based on Role */}
            {isStudent ? (
              <>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-accent" /> Enrolled Courses
                  </h2>
                  <div className="space-y-4">
                    {[
                      { code: 'CSE301', name: 'Database Management Systems', credits: 4, grade: 'A' },
                      { code: 'CSE302', name: 'Computer Networks', credits: 4, grade: 'B+' },
                      { code: 'CSE303', name: 'Operating Systems', credits: 4, grade: 'A' },
                      { code: 'MTH301', name: 'Applied Mathematics III', credits: 3, grade: 'A-' }
                    ].map((course, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all">
                        <div>
                          <p className="text-sm font-bold text-accent mb-1">{course.code}</p>
                          <p className="text-white font-medium">{course.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-black text-white">{course.grade}</p>
                          <p className="text-xs text-slate-400 font-bold">{course.credits} Credits</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-accent" /> Academic Standing
                    </h2>
                    <div className="flex flex-col items-center justify-center p-6 bg-accent/5 rounded-2xl border border-accent/20">
                      <span className="text-5xl font-black text-white mb-2">8.75</span>
                      <span className="text-sm font-bold text-accent tracking-widest uppercase">Current CGPA</span>
                    </div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-accent" /> Overall Attendance
                    </h2>
                    <div className="flex flex-col items-center justify-center p-6 bg-green-500/10 rounded-2xl border border-green-500/20">
                      <span className="text-5xl font-black text-green-400 mb-2">85%</span>
                      <span className="text-sm font-bold text-green-500 tracking-widest uppercase">Excellent</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Activity className="w-6 h-6 text-accent" /> System Overview
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Total Students', value: '3,420', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                      { label: 'Active Faculty', value: '185', icon: User, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                      { label: 'Pending Approvals', value: '12', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
                      { label: 'System Health', value: '99.9%', icon: ShieldCheck, color: 'text-green-400', bg: 'bg-green-500/10' }
                    ].map((stat, i) => (
                      <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl ${stat.bg} border border-white/5`}>
                        <div className={`p-3 rounded-xl bg-black/20 ${stat.color}`}>
                          <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-400 mb-1">{stat.label}</p>
                          <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Settings className="w-6 h-6 text-accent" /> Quick Actions
                  </h2>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group/btn">
                      <span className="font-bold text-white group-hover/btn:text-accent transition-colors">Manage User Roles</span>
                      <Edit className="w-4 h-4 text-slate-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group/btn">
                      <span className="font-bold text-white group-hover/btn:text-accent transition-colors">System Configuration</span>
                      <Settings className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" /> Address Info
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">Permanent Address</p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    123, Model Town<br />
                    Jalandhar, Punjab 144003<br />
                    India
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">Hostel/Local Address</p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {isStudent ? (
                      <>
                        Room 304, Boys Hostel A<br />
                        SBBSU Campus<br />
                        Khiala, Punjab
                      </>
                    ) : (
                      <>
                        Staff Quarters, Block B<br />
                        SBBSU Campus<br />
                        Khiala, Punjab
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" /> Upcoming Events
              </h2>
              <div className="space-y-4">
                {[
                  { date: '24 May', title: 'Mid-Term Examinations Begin' },
                  { date: '01 Jun', title: 'Tech Symposium 2026' }
                ].map((event, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center justify-center min-w-[50px] p-2 bg-accent/10 rounded-xl border border-accent/20">
                      <span className="text-lg font-black text-white">{event.date.split(' ')[0]}</span>
                      <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{event.date.split(' ')[1]}</span>
                    </div>
                    <div className="flex-1 flex items-center">
                      <p className="text-sm font-medium text-slate-300">{event.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
