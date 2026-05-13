import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Bell, Newspaper, Briefcase, Users, Globe, Landmark, 
  ShieldCheck, GraduationCap, FileCheck, Calculator, FileWarning, 
  ClipboardList, Info, ChevronRight, Send, Shield, User, Trash2, Clock
} from 'lucide-react';

const InformationCorner = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', priority: 'normal' });

  // Load announcements from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sbbsu_announcements');
    if (saved) {
      setAnnouncements(JSON.parse(saved));
    } else {
      const initial = [
        { id: 1, title: 'End Semester Examinations', content: 'The end semester examination schedule for June 2026 has been released.', date: new Date().toLocaleDateString(), priority: 'high' },
        { id: 2, title: 'Annual Convocation 2026', content: 'Registrations are now open for the 2026 Annual Convocation.', date: new Date().toLocaleDateString(), priority: 'normal' }
      ];
      setAnnouncements(initial);
      localStorage.setItem('sbbsu_announcements', JSON.stringify(initial));
    }
  }, []);

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
    <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full pt-24 pb-20 flex-grow flex flex-col items-center justify-center relative z-10 animate-[fade-in_0.8s_ease-out]">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-indigo-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Role Switcher (Mock Auth) */}
        <div className="flex justify-end mb-12">
          <div className="p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex gap-1 shadow-2xl">
            <button 
              onClick={() => setIsAdmin(false)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${!isAdmin ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <User className="w-3.5 h-3.5" />
              Student View
            </button>
            <button 
              onClick={() => setIsAdmin(true)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${isAdmin ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Shield className="w-3.5 h-3.5" />
              Admin Portal
            </button>
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

            {/* Announcement Feed */}
            <div className="space-y-6">
              {announcements.length > 0 ? announcements.map((ann) => (
                <div 
                  key={ann.id} 
                  className={`p-8 rounded-[2.5rem] bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-500 group relative overflow-hidden shadow-xl`}
                >
                  {ann.priority === 'high' && (
                    <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-orange-500/10 blur-[50px] pointer-events-none"></div>
                  )}
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-slate-500" />
                      </div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{ann.date}</span>
                    </div>
                    {isAdmin && (
                      <button 
                        onClick={() => deleteAnnouncement(ann.id)}
                        className="p-3 rounded-xl bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <h3 className={`text-lg font-black uppercase tracking-wider mb-3 leading-tight ${ann.priority === 'high' ? 'text-orange-400' : 'text-white'}`}>
                    {ann.title}
                    {ann.priority === 'high' && <span className="ml-3 inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]"></span>}
                  </h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">
                    {ann.content}
                  </p>
                </div>
              )) : (
                <div className="py-24 text-center space-y-6 bg-slate-900/20 rounded-[3rem] border-2 border-dashed border-slate-800/50">
                   <div className="w-16 h-16 rounded-[2rem] bg-slate-900 flex items-center justify-center mx-auto text-slate-700 shadow-inner">
                     <Bell className="w-8 h-8" />
                   </div>
                   <div className="space-y-1">
                     <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">No Active Broadcasts</p>
                     <p className="text-slate-700 text-[8px] font-bold uppercase tracking-widest">Waiting for Admin updates...</p>
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default InformationCorner;
