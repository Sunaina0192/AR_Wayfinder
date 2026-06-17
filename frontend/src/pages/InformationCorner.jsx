import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Bell, Newspaper, Briefcase, Users, Globe, Landmark, 
  ShieldCheck, GraduationCap, FileCheck, Calculator, FileWarning, 
  ClipboardList, Info, ChevronRight, Send, Shield, User, Trash2, Clock,
  Download, FileSpreadsheet, Image
} from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

const InformationCorner = () => {
  const { user } = useAuth();
  const isAdmin = user && user.role === 'Admin';
  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('sbbsu_announcements');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    const initial = [
      { id: 1, title: 'End Semester Examinations', content: 'The end semester examination schedule for June 2026 has been released.', date: new Date().toLocaleDateString(), priority: 'high' },
      { id: 2, title: 'Annual Convocation 2026', content: 'Registrations are now open for the 2026 Annual Convocation.', date: new Date().toLocaleDateString(), priority: 'normal' }
    ];
    localStorage.setItem('sbbsu_announcements', JSON.stringify(initial));
    return initial;
  });
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', priority: 'normal' });
  const [documents, setDocuments] = useState([]);
  const { onNewAnnouncement, markAllRead } = useNotifications();

  const fetchDocuments = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/upload`);
      setDocuments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Mark all announcements as read when user visits this page
  useEffect(() => {
    markAllRead();
    fetchDocuments();
  }, [markAllRead]);

  const handlePost = (e) => {
    e.preventDefault();
    if (!newAnnouncement.title || !newAnnouncement.content) return;
    
    const updated = [
      { 
        id: Date.now(), 
        ...newAnnouncement, 
        date: new Date().toLocaleDateString() 
      }, 
      ...announcements
    ];
    setAnnouncements(updated);
    localStorage.setItem('sbbsu_announcements', JSON.stringify(updated));
    setNewAnnouncement({ title: '', content: '', priority: 'normal' });
    // Notify the system about the new announcement
    onNewAnnouncement();
  };

  const deleteAnnouncement = (id) => {
    const updated = announcements.filter(a => a.id !== id);
    setAnnouncements(updated);
    localStorage.setItem('sbbsu_announcements', JSON.stringify(updated));
  };

  const sections = [
    {
      category: "Administrative Transparency",
      items: [
        { icon: <ShieldCheck className="w-6 h-6" />, title: "RTI Disclosure", desc: "Statutory disclosure under Section 4(1)(b) of RTI Act.", link: "/rti" },
        { icon: <FileText className="w-6 h-6" />, title: "University Act", desc: "The Sant Baba Bhag Singh University Act, 2014.", link: "#" },
        { icon: <Globe className="w-6 h-6" />, title: "Statutory Approvals", desc: "Recognition and approvals from regulatory bodies.", link: "#" },
      ]
    },
    {
      category: "Academic Resources",
      items: [
        { icon: <GraduationCap className="w-6 h-6" />, title: "Academic Calendar", desc: "Schedules for exams, holidays, and academic events.", link: "#" },
        { icon: <FileCheck className="w-6 h-6" />, title: "Result Portal", desc: "Check semester results and examination records.", link: "#" },
        { icon: <ClipboardList className="w-6 h-6" />, title: "Forms & Downloads", desc: "Download applications, certificates, and ID forms.", link: "#" },
      ]
    },
    {
      category: "Student Services",
      items: [
        { icon: <Calculator className="w-6 h-6" />, title: "Fee Structure", desc: "Detailed breakdown of tuition and hostel fees.", link: "#" },
        { icon: <FileWarning className="w-6 h-6" />, title: "Anti-Ragging", desc: "Policies and helpline for a safe campus environment.", link: "#" },
        { icon: <Briefcase className="w-6 h-6" />, title: "Placement Cell", desc: "Career guidance and recruitment opportunities.", link: "#" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden flex flex-col items-center px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="w-full pt-24 pb-12 md:pb-20 flex-grow flex flex-col items-center justify-center relative z-10 animate-[fade-in_0.8s_ease-out]">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-indigo-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Session view status */}
        <div className="flex justify-end mb-12 md:mb-16">
          <div className="px-6 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex items-center gap-2 shadow-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            {isAdmin ? (
              <>
                <Shield className="w-3.5 h-3.5 text-orange-400" />
                <span>Admin View (Broadcast Enabled)</span>
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5 text-indigo-400" />
                <span>Student View (Read-Only Mode)</span>
              </>
            )}
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center mb-24 animate-[fade-in_0.8s_ease-out]">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-8">
            <Info className="w-4 h-4" />
            Central Knowledge Hub
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6">
            INFORMATION <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">CORNER</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 font-medium text-lg leading-relaxed">
            Access official university documents, statutory disclosures, and essential academic resources in one secure location.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          {/* Main Content Areas */}
          <div className="lg:col-span-2 space-y-20">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-10">
                <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] pl-4 border-l-4 border-indigo-500/50">
                  {section.category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {section.items.map((item, i) => (
                    <Link 
                      key={i} 
                      to={item.link}
                      className="group p-10 rounded-[3rem] bg-slate-900/40 border border-slate-800 backdrop-blur-xl hover:border-indigo-500/40 transition-all duration-500 flex flex-col gap-6 shadow-xl hover:shadow-indigo-500/5"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500 shadow-inner">
                        {item.icon}
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                          {item.title}
                          <ChevronRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </h3>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Dynamic Documents Section */}
            {documents.length > 0 && (
              <div className="space-y-10 mt-20">
                <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] pl-4 border-l-4 border-blue-500/50">
                  Official Documents & Downloads
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {documents.map(doc => (
                    <div key={doc._id} className="bg-slate-900/40 border border-slate-800 backdrop-blur-xl rounded-3xl p-6 hover:border-blue-500/40 transition-all group relative overflow-hidden shadow-xl">
                      <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                          {doc.type === 'PDF' ? <FileText className="w-5 h-5" /> : doc.type === 'Excel' ? <FileSpreadsheet className="w-5 h-5" /> : doc.type === 'Image' ? <Image className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                        </div>
                        <a href={`${API_BASE_URL}${doc.fileUrl}`} target="_blank" rel="noreferrer" className="p-2 bg-white/5 hover:bg-blue-500 hover:text-white rounded-lg text-slate-400 transition-all shadow-md">
                          <Download className="w-4 h-4" />
                        </a>
                      </div>
                      <h3 className="text-lg font-black text-white uppercase tracking-wider mb-2 relative z-10">{doc.title}</h3>
                      {doc.description && <p className="text-sm text-slate-400 line-clamp-2 mb-4 relative z-10">{doc.description}</p>}
                      <div className="mt-auto pt-4 border-t border-slate-800 flex justify-between items-center relative z-10">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{doc.size || 'Unknown'}</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{new Date(doc.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar: Announcements */}
          <div className="space-y-10 lg:sticky lg:top-32">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.4em]">
                Live Stream
              </h2>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-black text-red-400 animate-pulse uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                Announcements
              </div>
            </div>

            {/* Admin Post Box */}
            {isAdmin && (
              <div className="p-10 rounded-[3rem] bg-gradient-to-br from-orange-600/10 to-orange-900/10 border border-orange-500/20 backdrop-blur-xl space-y-8 animate-[fade-in_0.5s_ease-out] shadow-2xl">
                <div className="flex items-center gap-4 border-b border-orange-500/10 pb-6">
                  <div className="w-10 h-10 rounded-2xl bg-orange-500/20 flex items-center justify-center shadow-inner">
                    <Send className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="text-base font-black text-white uppercase tracking-widest">Post Broadcast</h3>
                </div>
                
                <form onSubmit={handlePost} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Subject</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Holiday Notice"
                      value={newAnnouncement.title}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-orange-500/50 transition-all shadow-inner"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Details</label>
                    <textarea 
                      placeholder="Write your announcement here..."
                      rows="4"
                      value={newAnnouncement.content}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-orange-500/50 transition-all resize-none shadow-inner"
                    ></textarea>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setNewAnnouncement({...newAnnouncement, priority: 'normal'})}
                      className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${newAnnouncement.priority === 'normal' ? 'bg-slate-800 text-white shadow-lg' : 'bg-slate-950 text-slate-600 hover:text-slate-400'}`}
                    >
                      Normal
                    </button>
                    <button 
                      type="button"
                      onClick={() => setNewAnnouncement({...newAnnouncement, priority: 'high'})}
                      className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${newAnnouncement.priority === 'high' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-slate-950 text-slate-600 hover:text-slate-400'}`}
                    >
                      Urgent
                    </button>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-5 rounded-2xl bg-white text-slate-950 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-orange-400 hover:text-white transition-all shadow-2xl active:scale-95"
                  >
                    Broadcast Now
                  </button>
                </form>
              </div>
            )}

            {/* Creative Announcement Feed */}
            <div className="relative group perspective-1000">
              {/* Outer Glowing Aura for the entire feed */}
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/20 via-purple-500/20 to-blue-500/20 blur-3xl opacity-40 group-hover:opacity-80 transition-opacity duration-700"></div>
              
              <div className="relative bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden transform transition-all duration-500">
                {/* Subtle animated border top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>

                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center shadow-inner">
                      <div className="absolute inset-0 bg-indigo-500/20 blur-md rounded-2xl animate-pulse"></div>
                      <Bell className="w-6 h-6 text-indigo-400 relative z-10" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white uppercase tracking-wider drop-shadow-md">Campus Feed</h3>
                      <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.3em]">Live Updates</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-indigo-500/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-indigo-500/50 transition-colors">
                  {announcements.length > 0 ? announcements.map((ann) => (
                    <div 
                      key={ann.id} 
                      className={`relative p-6 rounded-[2rem] backdrop-blur-xl border transition-all duration-500 group/card overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 ${ann.priority === 'high' ? 'bg-gradient-to-br from-orange-500/10 to-red-500/5 border-orange-500/30 hover:border-orange-500/60' : 'bg-gradient-to-br from-white/5 to-white/0 border-white/10 hover:border-indigo-500/40'}`}
                    >
                      {/* Decorative corner glow */}
                      {ann.priority === 'high' ? (
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/30 rounded-full blur-[40px] pointer-events-none group-hover/card:bg-orange-500/40 transition-colors"></div>
                      ) : (
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-[40px] pointer-events-none group-hover/card:bg-indigo-500/30 transition-colors"></div>
                      )}
                      
                      <div className="relative z-10 flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-inner ${ann.priority === 'high' ? 'bg-orange-500/20 text-orange-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
                            {ann.priority === 'high' ? <Bell className="w-4 h-4 animate-bounce" /> : <Newspaper className="w-4 h-4" />}
                          </div>
                          <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${ann.priority === 'high' ? 'text-orange-400' : 'text-slate-400'}`}>{ann.date}</span>
                        </div>
                        {isAdmin && (
                          <button 
                            onClick={() => deleteAnnouncement(ann.id)}
                            className="p-2 rounded-xl bg-red-500/10 text-red-400 opacity-0 group-hover/card:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <h3 className={`relative z-10 text-lg font-black uppercase tracking-wider mb-2 leading-tight ${ann.priority === 'high' ? 'text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'text-white'}`}>
                        {ann.title}
                        {ann.priority === 'high' && <span className="ml-3 inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]"></span>}
                      </h3>
                      <p className="relative z-10 text-slate-300 text-sm font-medium leading-relaxed">
                        {ann.content}
                      </p>
                    </div>
                  )) : (
                    <div className="py-20 text-center space-y-6 bg-white/5 rounded-[2rem] border-2 border-dashed border-white/10 backdrop-blur-sm">
                       <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto text-indigo-400 shadow-inner">
                         <Bell className="w-8 h-8 opacity-50" />
                       </div>
                       <div className="space-y-1">
                         <p className="text-indigo-300 text-[10px] font-black uppercase tracking-[0.3em]">No Active Broadcasts</p>
                         <p className="text-slate-500 text-[8px] font-bold uppercase tracking-widest">Feed is empty</p>
                       </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default InformationCorner;
