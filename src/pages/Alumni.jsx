import React, { useState } from 'react';
import { 
  Users, UserPlus, Info, BookOpen, Link as LinkIcon, 
  CreditCard, Phone, ChevronRight, GraduationCap, 
  Globe, Award, Heart, MessageSquare, Mail, Shield
} from 'lucide-react';

const Alumni = () => {
  const [activeTab, setActiveTab] = useState('about');

  const menuItems = [
    { id: 'about', label: 'About Alumni', icon: <Info className="w-4 h-4" /> },
    { id: 'dean', label: 'Dean Alumni', icon: <Award className="w-4 h-4" /> },
    { id: 'register', label: 'Registration', icon: <UserPlus className="w-4 h-4" /> },
    { id: 'links', label: 'Related Links', icon: <LinkIcon className="w-4 h-4" /> },
    { id: 'committee', label: 'Managing Committee', icon: <Users className="w-4 h-4" /> },
    { id: 'account', label: 'Account Details', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact Us', icon: <Phone className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full pt-24 pb-20 flex-grow flex flex-col items-center justify-center relative z-10 animate-[fade-in_0.8s_ease-out]">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Premium Header */}
        <div className="text-center mb-24 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest animate-pulse">
            <Globe className="w-4 h-4" />
            Global Network
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase">
            SBBSU <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">ALUMNI</span> ASSOCIATION
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-xs">Connecting Generations of Excellence Across the Globe</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
          {/* Futuristic Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-4">
             <div className="p-4 rounded-[2.5rem] bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-2xl">
                <div className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-500 group ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`transition-transform duration-500 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                          {item.icon}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 transition-all ${activeTab === item.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                    </button>
                  ))}
                </div>
             </div>

             {/* Sidebar Info Card */}
             <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-600/20 to-blue-900/20 border border-indigo-500/20 backdrop-blur-xl space-y-4">
                <Heart className="w-8 h-8 text-indigo-400" />
                <h4 className="text-sm font-black text-white uppercase tracking-widest leading-tight">Giving Back to the Roots</h4>
                <p className="text-slate-400 text-[10px] font-medium leading-relaxed">Your contribution helps build the infrastructure for future generations at SBBSU.</p>
             </div>
          </div>

          {/* Dynamic Content Area */}
          <div className="lg:col-span-3 min-h-[600px]">
            <div className="p-12 rounded-[3.5rem] bg-slate-900/40 border border-slate-800 backdrop-blur-xl shadow-2xl animate-[fade-in_0.5s_ease-out]">
              
              {activeTab === 'about' && (
                <div className="space-y-12">
                  <div className="space-y-6">
                    <div className="inline-block p-3 rounded-2xl bg-blue-500/10 text-blue-400 mb-2">
                      <MessageSquare className="w-8 h-8" />
                    </div>
                    <blockquote className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
                      "Nobody is bothered about an Institute more than its <span className="text-blue-400 italic">Alumni.</span>"
                    </blockquote>
                    <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-xs">— N.R. Narayan Murthy</p>
                  </div>

                  <div className="w-20 h-1.5 bg-blue-500 rounded-full"></div>

                  <div className="space-y-8 text-slate-300 text-lg leading-relaxed font-medium">
                    <p>
                      <span className="text-blue-400 font-black uppercase tracking-widest">Sant Baba Bhag Singh University Worldwide Alumni Association (SWAA)</span> aims to serve all over the world by promoting, contacting, and communicating amongst members.
                    </p>
                    <p>
                      SWAA is a platform to assist students and scholars of the Institute and members of the Association in their academic and professional careers pursuits. It intends to fulfill its objectives through holding meetings, conferences, and social gatherings.
                    </p>
                    <p>
                      Our goal is to build a bridge for 'haves and haves not' through this Alumni Association. We are moving ahead to accomplish the humanitarian goals set by the predecessors of the university.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
                    {[
                      { l: "Global Outreach", v: "850+", i: <Globe /> },
                      { l: "Successful Careers", v: "15k+", i: <GraduationCap /> },
                      { l: "Legacy Projects", v: "12", i: <Award /> }
                    ].map((stat, i) => (
                      <div key={i} className="p-6 rounded-3xl bg-slate-950/50 border border-slate-800 text-center space-y-2 group hover:border-blue-500/30 transition-colors">
                        <div className="text-blue-400 w-6 h-6 mx-auto mb-2 opacity-50 group-hover:opacity-100 transition-opacity">{stat.i}</div>
                        <div className="text-3xl font-black text-white">{stat.v}</div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'dean' && (
                <div className="space-y-16 animate-[fade-in_0.5s_ease-out]">
                   <div className="flex flex-col md:flex-row gap-12 items-center md:items-start border-b border-slate-800 pb-16">
                      <div className="relative group shrink-0">
                         <div className="absolute inset-0 bg-blue-500/20 blur-[30px] rounded-full group-hover:bg-blue-500/40 transition-all duration-700"></div>
                         <img 
                           src="/dr_indu_sharma_portrait_1778492025455.png" 
                           alt="Dr. Indu Sharma" 
                           className="relative w-64 h-80 object-cover rounded-[3rem] border-2 border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]" 
                         />
                         <div className="absolute bottom-6 -right-6 p-4 rounded-2xl bg-white text-slate-950 shadow-2xl">
                            <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Dean</p>
                            <p className="text-xs font-black uppercase tracking-tight">SBBSU Alumni</p>
                         </div>
                      </div>
                      
                      <div className="space-y-6 text-center md:text-left">
                         <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
                            Dr. <span className="text-blue-400">Indu</span> Sharma
                         </h2>
                         <div className="flex flex-col gap-2">
                           <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">Dean Alumni and Extension Activities</p>
                           <p className="text-slate-600 font-bold uppercase tracking-widest text-[10px]">Sant Baba Bhag Singh University</p>
                         </div>
                         <div className="flex justify-center md:justify-start gap-4 pt-4">
                            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-blue-400 transition-colors">
                               <Mail className="w-5 h-5" />
                            </div>
                            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-blue-400 transition-colors">
                               <Globe className="w-5 h-5" />
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-12">
                      <div className="space-y-8">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight border-l-4 border-blue-500 pl-6">A Message from the Dean</h3>
                        <p className="text-slate-400 text-lg font-medium leading-relaxed italic">
                          "Distinguished alumni, esteemed colleagues, and valued members of our community, it is with immense pleasure that I address you on behalf of the Office of Alumni and Extension Activities..."
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                         {[
                           { t: "Academic Engagement", d: "We actively facilitate the involvement of alumni in academic endeavors, such as mentorship programs and critical research opportunities." },
                           { t: "Institutional Advancement", d: "We strategically engage the collective expertise and philanthropic spirit of our alumni to secure substantial contributions." },
                           { t: "Comprehensive Outreach", d: "Through principled leadership, we meticulously devise and oversee initiatives aimed at fostering enduring connections." },
                           { t: "Alumni Relations", d: "Cultivating a strong, interconnected alumni network, fostering a profound sense of community across all batches." }
                         ].map((point, i) => (
                           <div key={i} className="p-8 rounded-3xl bg-slate-950/50 border border-slate-800 space-y-3 hover:border-blue-500/30 transition-all group shadow-inner">
                              <div className="w-2 h-2 rounded-full bg-blue-500 mb-4 group-hover:scale-150 transition-transform"></div>
                              <h4 className="text-sm font-black text-white uppercase tracking-widest">{point.t}</h4>
                              <p className="text-slate-500 text-xs font-medium leading-relaxed">{point.d}</p>
                           </div>
                         ))}
                      </div>

                      <div className="p-10 rounded-[3rem] bg-gradient-to-br from-blue-600/5 to-transparent border border-blue-500/10 space-y-8">
                        <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                           <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                              <Shield className="w-5 h-5" />
                           </div>
                           <h4 className="text-xl font-black text-white uppercase tracking-tight">Operational Purview</h4>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                           <div className="space-y-4">
                              <h5 className="text-blue-400 font-black uppercase tracking-widest text-xs">Alumni Engagement</h5>
                              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                Developing and sustaining robust relationships with our alumni through a diverse portfolio of events, targeted networking opportunities, and consistent, multi-channel communication strategies.
                              </p>
                           </div>
                           <div className="space-y-4">
                              <h5 className="text-blue-400 font-black uppercase tracking-widest text-xs">Alumni Relations</h5>
                              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                Cultivating a strong, interconnected alumni network, fostering a profound sense of community, and actively encouraging their sustained involvement with the institution's strategic objectives.
                              </p>
                           </div>
                        </div>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'register' && (
                <div className="space-y-12">
                   <div className="flex items-center justify-between">
                     <h3 className="text-3xl font-black text-white uppercase tracking-tight">Join the Association</h3>
                     <span className="px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">Digital Enrollment</span>
                   </div>
                   
                   <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                        <input type="text" placeholder="Your Name" className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Batch Year</label>
                        <input type="text" placeholder="e.g. 2018-2022" className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Department</label>
                        <input type="text" placeholder="e.g. Computer Science" className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                        <input type="email" placeholder="example@email.com" className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Current Organization & Position</label>
                        <input type="text" placeholder="e.g. Senior Developer at Google" className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all" />
                      </div>
                      <div className="md:col-span-2 pt-6">
                        <button className="w-full py-5 rounded-3xl bg-white text-slate-950 font-black uppercase tracking-[0.3em] text-xs hover:bg-blue-500 hover:text-white transition-all shadow-2xl active:scale-95">
                          Submit Application
                        </button>
                      </div>
                   </form>
                </div>
              )}

              {activeTab === 'account' && (
                <div className="space-y-12 animate-[fade-in_0.5s_ease-out]">
                   <h3 className="text-3xl font-black text-white uppercase tracking-tight">Alumni Account Detail</h3>
                   <div className="p-12 rounded-[3rem] bg-slate-950/50 border border-slate-800 space-y-10 shadow-3xl">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-2 lg:col-span-2">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Account Holder Name</p>
                          <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                            <p className="text-white text-xl font-black uppercase tracking-tight leading-tight">Sant Baba Bhag Singh University <br className="hidden md:block"/> Worldwide Alumni Association</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Bank Name</p>
                          <p className="text-white text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                            State Bank of India
                            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] border border-blue-500/20">SBI</span>
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Branch Name</p>
                          <p className="text-white text-2xl font-black uppercase tracking-tight">Daroli Kalan</p>
                        </div>

                        <div className="space-y-2">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Account Number</p>
                          <div className="flex items-center gap-4">
                            <p className="text-blue-400 text-4xl font-black tracking-tighter">40932912192</p>
                            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 hover:text-blue-400 cursor-pointer transition-all active:scale-90">
                              <ClipboardList className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">IFSC Code</p>
                          <p className="text-white text-4xl font-black tracking-tighter">SBIN0003278</p>
                        </div>
                      </div>

                      <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3 text-slate-500 text-xs font-medium italic">
                          <Info className="w-5 h-5 text-blue-400" />
                          Please provide your Name, Batch, and Purpose in the transaction remarks.
                        </div>
                        <button className="px-8 py-3 rounded-2xl bg-white text-slate-950 text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-xl">
                          Download Fee Challan
                        </button>
                      </div>
                   </div>

                   <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20 flex items-center justify-between">
                      <div className="space-y-1">
                         <h4 className="text-white font-black uppercase tracking-widest text-sm">Need Help with Payment?</h4>
                         <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Connect with our Finance Desk</p>
                      </div>
                      <LinkIcon className="w-6 h-6 text-blue-400 animate-pulse" />
                   </div>
                </div>
              )}

              {activeTab === 'committee' && (
                <div className="space-y-16 animate-[fade-in_0.5s_ease-out]">
                   <div className="space-y-6">
                     <h3 className="text-3xl font-black text-white uppercase tracking-tight">Managing Committee</h3>
                     <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Worldwide Alumni Association Executive Council</p>
                   </div>

                   <div className="w-full overflow-hidden rounded-[3rem] border border-slate-800 bg-slate-900/40 backdrop-blur-xl shadow-2xl">
                     <table className="w-full text-center border-collapse">
                       <thead>
                         <tr className="bg-slate-800/60 text-blue-300 uppercase text-[10px] tracking-[0.2em] font-black">
                           <th className="px-10 py-8 border-b border-slate-800 w-24">S.No.</th>
                           <th className="px-10 py-8 border-b border-slate-800">Full Name</th>
                           <th className="px-10 py-8 border-b border-slate-800">Designation</th>
                         </tr>
                       </thead>
                       <tbody className="text-slate-300">
                         {[
                           { n: "Dr. Indu Sharma", r: "Chairperson" },
                           { n: "Dr. Gurmanik Kaur", r: "General Secretary" },
                           { n: "Mr. Dharam Vir Pathak", r: "Treasurer" },
                           { n: "Dr. Manjit Kaur", r: "Joint Treasurer" },
                           { n: "Mr. Harminder Singh", r: "Executive Member" },
                           { n: "Dr. Mandeep Singh", r: "Executive Member" },
                           { n: "Mr. Prabhjot Singh", r: "Executive Member" }
                         ].map((member, idx) => (
                           <tr key={idx} className="group hover:bg-blue-500/5 transition-all duration-300">
                             <td className="px-10 py-8 border-b border-slate-800/50 text-center font-bold text-slate-600 group-hover:text-blue-400 transition-colors">
                               0{idx + 1}
                             </td>
                             <td className="px-10 py-8 border-b border-slate-800/50">
                               <div className="font-black text-white text-base uppercase tracking-wider">{member.n}</div>
                             </td>
                             <td className="px-10 py-8 border-b border-slate-800/50">
                               <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${member.r === 'Chairperson' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-950 text-slate-400 group-hover:text-blue-300 transition-colors border border-slate-800'}`}>
                                 {member.r}
                               </span>
                             </td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>

                   <div className="flex items-center justify-center gap-2 text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
                      <Users className="w-4 h-4 opacity-30" />
                      Institutional Leadership Node
                   </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="space-y-16 animate-[fade-in_0.5s_ease-out]">
                   <div className="space-y-6">
                     <h3 className="text-3xl font-black text-white uppercase tracking-tight">Connect with SWAA</h3>
                     <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Worldwide Alumni Association Liaison Desk</p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      {/* Direct Contact Cards */}
                      <div className="p-10 rounded-[3rem] bg-slate-900/40 border border-slate-800 backdrop-blur-xl space-y-8">
                         <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                               <Users className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                               <h4 className="text-white font-black uppercase tracking-widest text-sm">Dr. Indu Sharma</h4>
                               <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Chairperson, SWAA</p>
                            </div>
                         </div>

                         <div className="space-y-6">
                            <a href="tel:+919356142931" className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-slate-800">
                               <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center text-slate-500 group-hover:text-blue-400 transition-colors">
                                  <Phone className="w-5 h-5" />
                               </div>
                               <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mobile Hotline</p>
                                  <p className="text-white text-xl font-black tracking-tighter">+91 9356142931</p>
                                </div>
                            </a>

                            <a href="tel:0181-2711163" className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-slate-800">
                               <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center text-slate-500 group-hover:text-blue-400 transition-colors">
                                  <Phone className="w-5 h-5" />
                               </div>
                               <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Office Landline</p>
                                  <p className="text-white text-xl font-black tracking-tighter">0181-2711163</p>
                                </div>
                            </a>

                            <a href="mailto:deanalumni.ae@gmail.com" className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-slate-800">
                               <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center text-slate-500 group-hover:text-blue-400 transition-colors">
                                  <Mail className="w-5 h-5" />
                               </div>
                               <div className="space-y-1">
                                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Official Email</p>
                                  <p className="text-white text-lg font-black tracking-tighter">deanalumni.ae@gmail.com</p>
                                </div>
                            </a>
                         </div>
                      </div>

                      {/* Map/Location Mini Card */}
                      <div className="p-10 rounded-[3rem] bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20 backdrop-blur-xl flex flex-col justify-between">
                         <div className="space-y-6">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                               <Globe className="w-6 h-6" />
                            </div>
                            <h4 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">Visit the Alumni Office</h4>
                            <p className="text-slate-300 font-medium leading-relaxed">
                               Sant Baba Bhag Singh University Campus, <br/>
                               Village Khiala, P.O. Padhiana, <br/>
                               Distt. Jalandhar, Punjab - 144030
                            </p>
                         </div>
                         <div className="pt-10">
                            <div className="p-6 rounded-2xl bg-slate-950/50 border border-white/5">
                               <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 text-center">Office Hours</p>
                               <div className="flex justify-between text-xs font-bold text-white uppercase tracking-widest">
                                  <span>Mon - Fri</span>
                                  <span>09:00 - 16:30</span>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'links' && (
                <div className="flex flex-col items-center justify-center h-full py-20 text-center space-y-6">
                   <div className="w-20 h-20 rounded-[2.5rem] bg-slate-950 flex items-center justify-center text-slate-800 shadow-inner">
                     <BookOpen className="w-10 h-10" />
                   </div>
                   <div className="space-y-2">
                     <h3 className="text-xl font-black text-white uppercase tracking-widest">Section Under Update</h3>
                     <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em]">Latest Data is being migrated...</p>
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

export default Alumni;
