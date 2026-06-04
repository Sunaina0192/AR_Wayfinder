import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchLogins } from '../api/authApi';
import { fetchHistory } from '../api/historyApi';
import { fetchNotifications, fetchAttendance, fetchFees, fetchResults, fetchCourses } from '../api/dataApi';
import { 
  User, Mail, Phone, MapPin, Calendar, BookOpen, Clock, 
  Award, Activity, ShieldCheck, Users, Settings, Edit,
  GraduationCap, History, Database, CheckCircle, ArrowRight
} from 'lucide-react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);
  
  const [logins, setLogins] = useState([]);
  const [navHistory, setNavHistory] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [fees, setFees] = useState([]);
  const [results, setResults] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role === 'Visitor') return;

    const loadData = async () => {
      setIsLoading(true);
      try {
        const [loginsData, historyData, notificationsData, attendanceData, feesData, resultsData, coursesData] = await Promise.all([
          fetchLogins(user.id),
          fetchHistory(user.id),
          fetchNotifications().catch(()=>[]),
          fetchAttendance().catch(()=>[]),
          fetchFees().catch(()=>[]),
          fetchResults().catch(()=>[]),
          fetchCourses().catch(()=>[])
        ]);
        setLogins(loginsData || []);
        setNavHistory(historyData || []);
        setNotifications(notificationsData || []);
        setAttendance(attendanceData || []);
        setFees(feesData || []);
        setResults(resultsData || []);
        setCourses(coursesData || []);
      } catch (error) {
        console.error("Failed to load user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const avatarData = reader.result;
          // Optimistically update UI
          updateUser({ avatar: avatarData });
          
          // Save to backend permanently
          await axios.post(`${API_BASE_URL}/api/profile`, {
            userId: user.id,
            name: user.name,
            email: user.email,
            department: user.department,
            avatar: avatarData
          });
        } catch (error) {
          console.error("Failed to save avatar to database:", error);
          alert("Failed to permanently save avatar. Please try again.");
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
                  <div className="w-full h-full bg-slate-800/80 flex items-center justify-center text-slate-400">
                    <User className="w-16 h-16" />
                  </div>
                )}
              </div>
              <button onClick={handleTriggerUpload} className="absolute bottom-2 right-2 p-3 bg-accent text-dark rounded-full shadow-lg hover:scale-110 transition-transform">
                <Edit className="w-5 h-5" />
              </button>
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
            
            {/* Database Sync Status Indicator */}
            <div className="md:ml-auto flex flex-col items-center justify-center bg-white/5 p-4 rounded-2xl border border-white/10">
              <Database className={`w-8 h-8 mb-2 ${logins.length > 0 ? 'text-green-400' : 'text-slate-400'}`} />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Atlas Sync</span>
              <span className={`text-[10px] mt-1 font-bold ${logins.length > 0 ? 'text-green-500' : 'text-amber-500'}`}>
                {isLoading ? 'SYNCING...' : (logins.length > 0 ? 'CONNECTED' : 'LOCAL FALLBACK')}
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Content Area - 2 columns on desktop */}
          <div className="md:col-span-2 space-y-8">
            
            {/* MongoDB Navigation History */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-accent" /> Navigation History
                </h2>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{navHistory.length} Routes Saved</span>
              </div>
              
              <div className="space-y-4">
                {isLoading ? (
                  <p className="text-slate-400 text-sm font-medium animate-pulse">Loading navigation data from database...</p>
                ) : navHistory.length > 0 ? (
                  navHistory.slice(0, 5).map((route, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group">
                      <div>
                        <p className="text-sm font-bold text-accent mb-1">{route.name}</p>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <p className="text-xs text-slate-400 font-medium">
                            {new Date(route.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Link to="/navigator" state={{ destination: route.destinationId }} className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
                        <ArrowRight className="w-4 h-4 text-accent" />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-slate-400 text-sm font-bold mb-2">No navigation history found</p>
                    <Link to="/navigator" className="text-xs font-bold text-accent hover:underline">Start Exploring Campus</Link>
                  </div>
                )}
              </div>
            </div>

            {/* Academic Data for Students */}
            {isStudent && (
              <>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-3">
                      <BookOpen className="w-6 h-6 text-accent" /> Enrolled Courses
                    </h2>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{courses.length} Courses</span>
                  </div>
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {courses.length > 0 ? courses.map((course, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all">
                        <div>
                          <p className="text-sm font-bold text-accent mb-1">{course.courseCode}</p>
                          <p className="text-white font-medium">{course.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-400 font-bold">{course.credits} Credits</p>
                        </div>
                      </div>
                    )) : (
                      <p className="text-slate-400 text-sm font-bold text-center">No courses assigned</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-accent" /> Latest Result
                    </h2>
                    <div className="flex flex-col items-center justify-center p-6 bg-accent/5 rounded-2xl border border-accent/20">
                      {results.length > 0 ? (
                        <>
                          <span className="text-5xl font-black text-white mb-2">{results[0].sgpa.toFixed(2)}</span>
                          <span className="text-sm font-bold text-accent tracking-widest uppercase">SGPA (Sem {results[0].semester})</span>
                        </>
                      ) : (
                        <span className="text-sm font-bold text-slate-400">N/A</span>
                      )}
                    </div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-accent" /> Attendance
                    </h2>
                    <div className="flex flex-col items-center justify-center p-6 bg-green-500/10 rounded-2xl border border-green-500/20">
                      <span className="text-5xl font-black text-green-400 mb-2">
                        {attendance.length > 0 ? Math.round((attendance.filter(a => a.status === 'Present').length / attendance.length) * 100) : 0}%
                      </span>
                      <span className="text-sm font-bold text-green-500 tracking-widest uppercase">Overall</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Activity className="w-6 h-6 text-accent" /> Fee Status
                  </h2>
                  <div className="space-y-4">
                    {fees.length > 0 ? fees.map((fee, i) => (
                      <div key={i} className="flex flex-col sm:flex-row justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div>
                          <p className="text-sm font-bold text-white">Semester {fee.semester}</p>
                          <p className="text-xs text-slate-400">Due: {new Date(fee.dueDate).toLocaleDateString()}</p>
                        </div>
                        <div className="text-left sm:text-right mt-2 sm:mt-0">
                          <p className={`text-sm font-black ${fee.status === 'Paid' ? 'text-green-400' : 'text-red-400'}`}>₹{fee.totalAmount}</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{fee.status}</p>
                        </div>
                      </div>
                    )) : (
                      <p className="text-slate-400 text-sm font-bold text-center">No fee records</p>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Notifications */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-accent" /> Notifications
                </h2>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{notifications.length} Alerts</span>
              </div>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {notifications.length > 0 ? notifications.map((note, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white mb-1">{note.title}</p>
                      <p className="text-xs text-slate-300 leading-relaxed">{note.message}</p>
                      <p className="text-[10px] text-slate-500 mt-2 font-bold">{new Date(note.date).toLocaleString()}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-slate-400 text-sm font-bold text-center">No new notifications</p>
                )}
              </div>
            </div>

            {/* MongoDB Login History */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <Activity className="w-6 h-6 text-accent" /> Login Records
                </h2>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{logins.length} Recent Logins</span>
              </div>
              
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {isLoading ? (
                  <p className="text-slate-400 text-sm font-medium animate-pulse">Loading login data from database...</p>
                ) : logins.length > 0 ? (
                  logins.map((login, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors gap-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/10 rounded-full border border-green-500/20">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{login.role} Login</p>
                          <p className="text-xs text-slate-400 font-medium">{login.userId}</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-sm font-bold text-accent">
                          {new Date(login.loginTime).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-slate-400 font-medium">
                          {new Date(login.loginTime).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-slate-400 text-sm font-bold">No previous logins recorded</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Database className="w-5 h-5 text-accent" /> Data Overview
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-sm font-medium text-slate-300">Total Logins</span>
                  <span className="text-lg font-black text-white">{logins.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-sm font-medium text-slate-300">Saved Routes</span>
                  <span className="text-lg font-black text-white">{navHistory.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-sm font-medium text-slate-300">Profile Synced</span>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </div>

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

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
