import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import axios from '../api/axiosConfig';
import { 
  LayoutDashboard, BookOpen, FileText, Calendar, 
  TrendingUp, Bell, Map, User, Download, 
  Activity, Award, CheckSquare, Clock, DownloadCloud, 
  Lock, Building, BookMarked, MapPin, Search, LogOut
} from 'lucide-react';

const StudentDashboard = () => {
  const { user, token, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');
  const [loading, setLoading] = useState(false);

  // States
  const [attendance, setAttendance] = useState({ records: [], summary: { total: 0, present: 0, percentage: 0 } });
  const [results, setResults] = useState([]);
  const [materials, setMaterials] = useState([]);

  if (!user || user.role !== 'Student') return <Navigate to="/" replace />;

  useEffect(() => {
    if (activeTab === 'Study Material' || activeTab === 'Overview') fetchMaterials();
    if (activeTab === 'Academic Progress' || activeTab === 'Overview') {
      fetchAttendance();
      fetchResults();
    }
  }, [activeTab]);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get('/api/student/attendance', { headers: { Authorization: `Bearer ${token}` } });
      setAttendance(res.data);
    } catch (err) { console.error('Error fetching attendance:', err); }
  };

  const fetchResults = async () => {
    try {
      const res = await axios.get('/api/student/results', { headers: { Authorization: `Bearer ${token}` } });
      setResults(res.data);
    } catch (err) { console.error('Error fetching results:', err); }
  };

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/student/materials', { headers: { Authorization: `Bearer ${token}` } });
      setMaterials(res.data);
    } catch (err) { console.error('Error fetching materials:', err); } finally { setLoading(false); }
  };

  const menuItems = [
    { id: 'Overview', icon: LayoutDashboard },
    { id: 'Academic', icon: BookOpen },
    { id: 'Study Material', icon: FileText },
    { id: 'Timetable', icon: Calendar },
    { id: 'Academic Progress', icon: TrendingUp },
    { id: 'Notifications', icon: Bell },
    { id: 'AR Navigation', icon: Map },
    { id: 'Profile', icon: User },
  ];

  // =====================================
  // TAB RENDERERS
  // =====================================

  const renderOverview = () => (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-tight">Welcome, {user.name}</h1>
        <p className="text-slate-400 mt-1">Student ID: {user.id} • {user.course}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all">
          <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center mb-4">
            <CheckSquare className="w-6 h-6" />
          </div>
          <p className="text-4xl font-black text-white">{attendance.summary.percentage}%</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Current Attendance</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
            <Award className="w-6 h-6" />
          </div>
          <p className="text-4xl font-black text-white">{results.length > 0 ? results[0].sgpa : 'N/A'}</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Latest SGPA</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
            <Clock className="w-6 h-6" />
          </div>
          <p className="text-4xl font-black text-white">0</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Pending Assignments</p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
        <h2 className="text-xl font-black uppercase tracking-widest text-white mb-6">Recent Materials</h2>
        {materials.length === 0 ? (
          <p className="text-slate-400">No recent materials found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {materials.slice(0, 3).map(mat => (
              <a key={mat._id} href={mat.link} target="_blank" rel="noreferrer" className="block bg-black/30 p-4 rounded-2xl border border-white/5 hover:border-blue-500/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold bg-blue-500/20 text-blue-400 px-2 py-1 rounded">{mat.type}</span>
                  <DownloadCloud className="w-4 h-4 text-slate-500" />
                </div>
                <h3 className="font-bold text-white text-lg">{mat.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{mat.subject}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderAcademic = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-black text-white uppercase tracking-tight">Academic Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Building className="w-5 h-5 text-blue-400" /> Department Details</h3>
          <ul className="space-y-3 text-slate-300">
            <li className="flex justify-between border-b border-white/5 pb-2"><span>Department</span> <span className="font-bold text-white">Computer Science</span></li>
            <li className="flex justify-between border-b border-white/5 pb-2"><span>Course</span> <span className="font-bold text-white">{user.course || 'B.Tech CSE'}</span></li>
            <li className="flex justify-between border-b border-white/5 pb-2"><span>Current Semester</span> <span className="font-bold text-white">Semester 6</span></li>
            <li className="flex justify-between pb-2"><span>HOD</span> <span className="font-bold text-white">Dr. Sarah Johnson</span></li>
          </ul>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><BookMarked className="w-5 h-5 text-green-400" /> Current Subjects</h3>
          <div className="space-y-2">
            {['Software Engineering', 'Computer Networks', 'Machine Learning', 'Web Technologies', 'Compiler Design'].map((sub, idx) => (
              <div key={idx} className="bg-black/30 p-3 rounded-xl border border-white/5 flex justify-between items-center">
                <span className="font-bold text-white">{sub}</span>
                <span className="text-xs text-slate-400 bg-white/5 px-2 py-1 rounded">Core</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-black text-white mb-2">Complete Course Syllabus</h3>
          <p className="text-blue-200">Download the comprehensive syllabus for all semesters in PDF format.</p>
        </div>
        <button className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors">
          <Download className="w-5 h-5" /> Download PDF
        </button>
      </div>
    </div>
  );

  const renderStudyMaterial = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight">Study Materials</h2>
        <div className="relative w-full sm:w-64">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="text" placeholder="Search materials..." className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {['All', 'Notes', 'PPTs', 'Lab Manuals', 'PYQs', 'Assignments'].map(cat => (
          <button key={cat} className="bg-white/5 hover:bg-white/10 text-slate-300 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-slate-400">Loading materials...</p>
      ) : materials.length === 0 ? (
        <div className="p-12 text-center bg-white/5 border border-white/10 rounded-3xl">
          <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 font-bold">No study materials available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map(mat => (
            <div key={mat._id} className="bg-black/30 border border-white/10 rounded-3xl p-6 flex flex-col h-full hover:border-blue-500/50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-400 bg-white/5 px-3 py-1 rounded-lg">{mat.type}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{mat.title}</h3>
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">{mat.subject}</p>
              {mat.description && <p className="text-slate-400 text-sm mb-6 flex-1">{mat.description}</p>}
              
              <div className="pt-4 border-t border-white/10 mt-auto">
                <a href={mat.link} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl transition-colors">
                  <DownloadCloud className="w-4 h-4" /> Access Material
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderTimetable = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-black text-white uppercase tracking-tight">Timetables</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Calendar className="w-5 h-5 text-purple-400" /> Class Schedule (Today)</h3>
          <div className="space-y-4">
            {[
              { time: '09:00 AM - 10:00 AM', sub: 'Machine Learning', room: 'Room 301' },
              { time: '10:00 AM - 11:00 AM', sub: 'Computer Networks', room: 'Room 302' },
              { time: '11:15 AM - 12:15 PM', sub: 'Software Engineering', room: 'Room 305' },
              { time: '01:00 PM - 03:00 PM', sub: 'Web Tech Lab', room: 'Lab 2' },
            ].map((slot, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-black/30 rounded-2xl border border-white/5">
                <div className="w-24 shrink-0 text-right text-xs font-bold text-slate-400 mt-1">{slot.time}</div>
                <div className="w-3 h-3 rounded-full bg-purple-500 mt-1.5 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                <div>
                  <p className="font-bold text-white">{slot.sub}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {slot.room}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-red-400" /> Upcoming Exams</h3>
            <div className="space-y-3">
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-red-100">Mid-Term: Computer Networks</h4>
                  <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded font-bold">In 5 Days</span>
                </div>
                <p className="text-sm text-red-200/70">18 June 2026 • 10:00 AM • Main Hall</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
             <h3 className="text-lg font-bold text-white mb-2">Download Full Timetable</h3>
             <p className="text-slate-400 text-sm mb-4">Get the complete semester schedule including all theory and lab sessions.</p>
             <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl flex justify-center items-center gap-2 transition-colors">
              <Download className="w-5 h-5" /> Save PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAcademicProgress = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-black text-white uppercase tracking-tight">Academic Progress</h2>

      {/* Attendance Summary */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest text-sm">Attendance Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-black/30 rounded-2xl p-6 text-center border border-white/5">
            <p className="text-4xl font-black text-blue-400">{attendance.summary.percentage}%</p>
            <p className="text-xs text-slate-400 font-bold mt-2 uppercase">Overall Percentage</p>
          </div>
          <div className="bg-black/30 rounded-2xl p-6 text-center border border-white/5">
            <p className="text-4xl font-black text-white">{attendance.summary.total}</p>
            <p className="text-xs text-slate-400 font-bold mt-2 uppercase">Total Classes</p>
          </div>
          <div className="bg-black/30 rounded-2xl p-6 text-center border border-white/5">
            <p className="text-4xl font-black text-green-400">{attendance.summary.present}</p>
            <p className="text-xs text-slate-400 font-bold mt-2 uppercase">Classes Attended</p>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white uppercase tracking-widest text-sm ml-2">Semester Results</h3>
        {results.length === 0 ? (
          <div className="p-8 text-center bg-white/5 border border-white/10 rounded-3xl text-slate-500">
            <p>No results declared yet.</p>
          </div>
        ) : (
          results.map((res) => (
            <div key={res._id} className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-black text-white">Semester {res.semester}</h3>
                  <p className="text-slate-400 text-sm">{res.course}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">SGPA</p>
                  <p className="text-4xl font-black text-blue-400">{res.sgpa}</p>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-lg text-xs font-bold uppercase ${res.status === 'Pass' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {res.status}
                  </span>
                </div>
              </div>
              
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="pb-3 text-xs font-black text-slate-500 uppercase">Subject</th>
                    <th className="pb-3 text-xs font-black text-slate-500 uppercase text-center">Credits</th>
                    <th className="pb-3 text-xs font-black text-slate-500 uppercase text-right">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {res.subjects.map((sub, i) => (
                    <tr key={i}>
                      <td className="py-3 font-bold text-slate-300">{sub.name}</td>
                      <td className="py-3 text-center text-slate-400">{sub.credits}</td>
                      <td className="py-3 text-right font-black text-white">{sub.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-black text-white uppercase tracking-tight">Notifications</h2>
      
      <div className="bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6 space-y-4">
        {[
          { type: 'Exam Notice', title: 'Mid-Term Examination Schedule Released', date: '2 days ago', color: 'red' },
          { type: 'Assignment', title: 'Upload Software Engineering SRS Document', date: '4 days ago', color: 'amber' },
          { type: 'Announcement', title: 'Guest Lecture on AI next Friday', date: '1 week ago', color: 'blue' },
          { type: 'Holiday Notice', title: 'Campus closed on 25th June for Festival', date: '1 week ago', color: 'green' }
        ].map((notif, idx) => (
          <div key={idx} className="flex gap-4 p-4 bg-black/30 border border-white/5 rounded-2xl hover:bg-white/5 transition-colors">
            <div className={`w-12 h-12 shrink-0 rounded-xl bg-${notif.color}-500/10 text-${notif.color}-400 flex items-center justify-center`}>
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <span className={`text-xs font-bold text-${notif.color}-400 mb-1 block`}>{notif.type}</span>
              <h4 className="font-bold text-white text-lg leading-tight">{notif.title}</h4>
              <p className="text-slate-500 text-sm mt-1">{notif.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderARNavigation = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-3xl p-8 text-center">
        <Map className="w-16 h-16 text-blue-400 mx-auto mb-4" />
        <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-2">AR Wayfinder</h2>
        <p className="text-blue-200 max-w-xl mx-auto mb-8">Navigate the campus effortlessly using Augmented Reality. Select a destination below to launch the navigator.</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {['Classroom', 'Laboratory', 'Library', 'Faculty Cabin', 'Hostel', 'Auditorium'].map(dest => (
            <Link key={dest} to="/navigator" className="bg-black/40 hover:bg-blue-600/30 border border-white/10 hover:border-blue-500/50 p-4 rounded-2xl transition-all group">
              <MapPin className="w-6 h-6 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-white">{dest}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-black text-white uppercase tracking-tight">Student Profile</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ID Card */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-b from-blue-600 to-blue-900 rounded-3xl p-6 text-center shadow-2xl relative overflow-hidden border border-blue-400/50">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
            <h3 className="text-lg font-black text-white/80 tracking-widest uppercase mb-6">Student ID</h3>
            
            <div className="w-32 h-32 mx-auto bg-white/10 rounded-full border-4 border-white/20 mb-4 overflow-hidden backdrop-blur-sm flex items-center justify-center">
              <User className="w-16 h-16 text-white/50" />
            </div>
            
            <h2 className="text-2xl font-black text-white mb-1">{user.name}</h2>
            <p className="text-blue-200 font-mono mb-6">{user.id}</p>
            
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md text-left space-y-2 text-sm text-blue-100">
              <div className="flex justify-between border-b border-white/10 pb-1">
                <span>Course:</span> <span className="font-bold text-white">{user.course || 'B.Tech CSE'}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-1">
                <span>DOB:</span> <span className="font-bold text-white">15 May 2003</span>
              </div>
              <div className="flex justify-between">
                <span>Validity:</span> <span className="font-bold text-white">2024 - 2028</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details & Settings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest text-sm">Personal Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-slate-500 font-bold uppercase mb-1">Full Name</label>
                <div className="bg-black/30 border border-white/5 rounded-xl px-4 py-3 text-white">{user.name}</div>
              </div>
              <div>
                <label className="block text-xs text-slate-500 font-bold uppercase mb-1">Email Address</label>
                <div className="bg-black/30 border border-white/5 rounded-xl px-4 py-3 text-white">{user.email}</div>
              </div>
              <div>
                <label className="block text-xs text-slate-500 font-bold uppercase mb-1">Phone Number</label>
                <div className="bg-black/30 border border-white/5 rounded-xl px-4 py-3 text-white">+91 9876543210</div>
              </div>
              <div>
                <label className="block text-xs text-slate-500 font-bold uppercase mb-1">Address</label>
                <div className="bg-black/30 border border-white/5 rounded-xl px-4 py-3 text-white">Hostel Block A, Campus</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-widest text-sm">
              <Lock className="w-4 h-4 text-slate-400" /> Security Settings
            </h3>
            <form className="space-y-4 max-w-md" onSubmit={e => e.preventDefault()}>
              <input type="password" placeholder="Current Password" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500" />
              <input type="password" placeholder="New Password" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500" />
              <input type="password" placeholder="Confirm New Password" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500" />
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-100px)] bg-dark text-white pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-6">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-72 shrink-0 bg-white/5 border border-white/10 rounded-3xl p-4 h-fit sticky top-24 z-10">
          <div className="mb-6 px-4">
            <h2 className="text-xl font-black text-white uppercase tracking-wider">Student Hub</h2>
          </div>
          <nav className="space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                      : 'text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.id}
                </button>
              );
            })}
            <button
              onClick={() => { logout(); window.location.href = '/'; }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-red-400 hover:bg-red-500/10 hover:text-red-300 mt-4"
            >
              <LogOut className="w-5 h-5" />
              Log Out
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {activeTab === 'Overview' && renderOverview()}
          {activeTab === 'Academic' && renderAcademic()}
          {activeTab === 'Study Material' && renderStudyMaterial()}
          {activeTab === 'Timetable' && renderTimetable()}
          {activeTab === 'Academic Progress' && renderAcademicProgress()}
          {activeTab === 'Notifications' && renderNotifications()}
          {activeTab === 'AR Navigation' && renderARNavigation()}
          {activeTab === 'Profile' && renderProfile()}
        </main>
        
      </div>
    </div>
  );
};

export default StudentDashboard;
