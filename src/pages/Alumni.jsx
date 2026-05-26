import React, { useState } from 'react';
import { 
  Users, UserPlus, Info, BookOpen, Link as LinkIcon, 
  CreditCard, Phone, ChevronRight, GraduationCap, 
  Globe, Award, Heart, MessageSquare, Mail, Shield
} from 'lucide-react';

const Alumni = () => {
  const [activeTab, setActiveTab] = useState('about');

  const menuItems = [
    { id: 'about', label: 'About Alumni', icon: Info },
    { id: 'dean', label: 'Dean Alumni', icon: Award },
    { id: 'register', label: 'Registration', icon: UserPlus },
    { id: 'committee', label: 'Managing Committee', icon: Users },
    { id: 'account', label: 'Account Details', icon: CreditCard },
    { id: 'contact', label: 'Contact Us', icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-dark text-white pt-24 pb-20 selection:bg-accent/30 selection:text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-accent/10 rounded-full blur-[150px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8 animate-float">
            <Globe className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Global Network</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
            SBBSU <span className="text-accent">Alumni</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Connecting generations of excellence and fostering a lifelong bond with your alma mater.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 -mt-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-3 space-y-6">
              <div className="sticky top-32 p-4 rounded-[2.5rem] glass border-white/5 shadow-2xl">
                <div className="flex items-center gap-4 p-4 mb-4 border-b border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Alumni Portal</h3>
                </div>

                <div className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 group ${
                        activeTab === item.id 
                        ? 'bg-accent text-dark shadow-xl shadow-accent/20' 
                        : 'text-slate-500 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 transition-transform duration-500 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats Card */}
              <div className="p-8 rounded-[2.5rem] glass border-accent/20 bg-accent/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-700"></div>
                <Heart className="w-8 h-8 text-accent mb-6" />
                <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-2 leading-tight">Giving Back</h4>
                <p className="text-slate-400 text-xs font-medium leading-relaxed">
                  Support the infrastructure and scholarships for future generations at SBBSU.
                </p>
                <button className="mt-6 text-[10px] font-black uppercase tracking-widest text-accent flex items-center gap-2 group/btn">
                  Donate Now <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Content Panel */}
            <div className="lg:col-span-9">
              <div className="p-8 md:p-16 rounded-[3.5rem] glass border-white/5 min-h-[700px] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
              
              {activeTab === 'about' && (
                <div className="animate-[fade-in_0.5s_ease-out] space-y-16">
                  <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                      Our Mission
                    </div>
                    <blockquote className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase">
                      "Nobody is bothered about an Institute more than its <span className="text-accent italic">Alumni.</span>"
                    </blockquote>
                    <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-xs">— N.R. Narayan Murthy</p>
                  </div>

                  <div className="w-24 h-1 bg-accent rounded-full"></div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-400 text-lg leading-relaxed font-medium">
                    <p>
                      <span className="text-white font-black uppercase tracking-widest block mb-4">SWAA Vision</span>
                      The Sant Baba Bhag Singh University Worldwide Alumni Association (SWAA) serves as a global nexus, uniting graduates across continents through continuous engagement and shared purpose.
                    </p>
                    <p>
                      <span className="text-white font-black uppercase tracking-widest block mb-4">Professional Growth</span>
                      SWAA provides a dynamic platform for academic and professional advancement, facilitating mentorship, networking, and collaborative opportunities for our global community.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { l: "Global Network", v: "2500+", i: Globe },
                      { l: "Career Success", v: "15k+", i: GraduationCap },
                      { l: "Impact Projects", v: "24", i: Award }
                    ].map((stat, i) => (
                      <div key={i} className="group p-8 rounded-[2.5rem] glass border-white/5 hover:border-accent/30 transition-all duration-500">
                        <stat.i className="w-8 h-8 text-accent mb-6 group-hover:scale-110 transition-transform" />
                        <div className="text-4xl font-black text-white mb-2">{stat.v}</div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{stat.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'dean' && (
                <div className="animate-[fade-in_0.5s_ease-out] space-y-16">
                  <div className="flex flex-col md:flex-row gap-12 items-center md:items-start border-b border-white/5 pb-16">
                    <div className="relative group shrink-0">
                      <div className="absolute inset-0 bg-accent/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      <div className="w-64 h-80 rounded-[3rem] overflow-hidden border-2 border-white/10 group-hover:border-accent transition-all duration-500 shadow-2xl relative">
                        <img 
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop" 
                          alt="Dr. Indu Sharma" 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent"></div>
                      </div>
                      <div className="absolute -bottom-6 -right-6 p-6 rounded-3xl bg-accent text-dark shadow-2xl animate-float">
                        <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Dean</p>
                        <p className="text-xs font-black uppercase tracking-tight">SBBSU Alumni</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6 text-center md:text-left pt-8">
                      <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                        Dr. <span className="text-accent">Indu</span> Sharma
                      </h2>
                      <div className="space-y-2">
                        <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-xs">Dean Alumni and Extension Activities</p>
                        <p className="text-accent font-bold uppercase tracking-widest text-[10px]">Sant Baba Bhag Singh University</p>
                      </div>
                      <div className="flex justify-center md:justify-start gap-4 pt-4">
                        <button className="w-12 h-12 rounded-xl glass border-white/5 flex items-center justify-center text-slate-400 hover:text-accent hover:border-accent/50 transition-all">
                          <Mail className="w-5 h-5" />
                        </button>
                        <button className="w-12 h-12 rounded-xl glass border-white/5 flex items-center justify-center text-slate-400 hover:text-accent hover:border-accent/50 transition-all">
                          <Globe className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { t: "Academic Engagement", d: "Facilitating alumni involvement in mentorship programs and research initiatives." },
                      { t: "Institutional Growth", d: "Strategically engaging collective expertise to secure substantial contributions." },
                      { t: "Global Outreach", d: "Overseeing initiatives aimed at fostering enduring connections worldwide." },
                      { t: "Community Building", d: "Cultivating a strong, interconnected network across all academic batches." }
                    ].map((point, i) => (
                      <div key={i} className="group p-8 rounded-[2.5rem] glass border-white/5 hover:border-accent/30 transition-all duration-500">
                        <div className="w-10 h-1 rounded-full bg-accent/20 mb-6 group-hover:w-full transition-all duration-500"></div>
                        <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4">{point.t}</h4>
                        <p className="text-slate-500 text-xs font-medium leading-relaxed">{point.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'register' && (
                <div className="animate-[fade-in_0.5s_ease-out] space-y-12">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-black text-white uppercase tracking-tight">Registration</h3>
                    <span className="px-4 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">Digital Enrollment</span>
                  </div>
                  
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { label: "Full Name", placeholder: "Your Name" },
                      { label: "Batch Year", placeholder: "e.g. 2018-2022" },
                      { label: "Department", placeholder: "e.g. Computer Science" },
                      { label: "Email Address", placeholder: "example@email.com", type: "email" }
                    ].map((field, i) => (
                      <div key={i} className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">{field.label}</label>
                        <input 
                          type={field.type || "text"} 
                          placeholder={field.placeholder} 
                          className="w-full glass border-white/5 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-accent/50 transition-all" 
                        />
                      </div>
                    ))}
                    <div className="md:col-span-2 space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Current Organization & Position</label>
                      <input type="text" placeholder="e.g. Senior Developer at Google" className="w-full glass border-white/5 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-accent/50 transition-all" />
                    </div>
                    <div className="md:col-span-2 pt-6">
                      <button className="w-full py-6 rounded-[2rem] bg-accent text-dark font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:scale-[1.02] transition-all shadow-2xl active:scale-95">
                        Submit Application
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'account' && (
                <div className="animate-[fade-in_0.5s_ease-out] space-y-12">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-3xl font-black text-white uppercase tracking-tight">Financial Portal</h3>
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                      <CreditCard className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="p-8 md:p-12 rounded-[3rem] glass border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                      <div className="md:col-span-2 space-y-3">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Account Holder</p>
                        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5">
                          <p className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-tight">
                            Sant Baba Bhag Singh University <br/> Worldwide Alumni Association
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Bank Details</p>
                        <div className="space-y-1">
                          <p className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                            State Bank of India <span className="text-[10px] text-accent px-2 py-0.5 rounded-full bg-accent/10">SBI</span>
                          </p>
                          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Daroli Kalan Branch</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Account Credentials</p>
                        <div className="space-y-4">
                          <div>
                            <p className="text-slate-500 text-[10px] font-black uppercase mb-1">Account Number</p>
                            <p className="text-2xl md:text-4xl font-black text-accent tracking-tighter">40932912192</p>
                          </div>
                          <div>
                            <p className="text-slate-500 text-[10px] font-black uppercase mb-1">IFSC Code</p>
                            <p className="text-2xl md:text-4xl font-black text-white tracking-tighter">SBIN0003278</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                        <Info className="w-4 h-4 text-accent" />
                        Mention Name & Batch in remarks
                      </div>
                      <button className="px-8 py-4 rounded-2xl bg-white text-dark text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-all shadow-xl">
                        Download Fee Challan
                      </button>
                    </div>
                  </div>
                </div>
              )}              {activeTab === 'committee' && (
                <div className="animate-[fade-in_0.5s_ease-out] space-y-16">
                  <div className="text-center mb-16">
                    <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">Managing <span className="text-accent">Committee</span></h3>
                    <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
                  </div>

                  <div className="overflow-hidden rounded-[2.5rem] glass border-white/5 shadow-2xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white/5 text-accent uppercase text-[10px] tracking-[0.3em] font-black">
                          <th className="px-8 py-6 border-b border-white/5">#</th>
                          <th className="px-8 py-6 border-b border-white/5">Full Name</th>
                          <th className="px-8 py-6 border-b border-white/5 text-right">Designation</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-300">
                        {[
                          { n: "Dr. Indu Sharma", r: "Chairperson" },
                          { n: "Dr. Gurmanik Kaur", r: "General Secretary" },
                          { n: "Mr. Dharam Vir Pathak", r: "Treasurer" },
                          { n: "Dr. Manjit Kaur", r: "Joint Treasurer" },
                          { n: "Mr. Harminder Singh", r: "Executive Member" }
                        ].map((member, idx) => (
                          <tr key={idx} className="group hover:bg-white/5 transition-colors">
                            <td className="px-8 py-5 border-b border-white/5 font-bold text-slate-600">{idx + 1}</td>
                            <td className="px-8 py-5 border-b border-white/5 font-black text-white">{member.n}</td>
                            <td className="px-8 py-5 border-b border-white/5 text-right">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${member.r === 'Chairperson' ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-white/5 text-slate-500'}`}>
                                {member.r}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="animate-[fade-in_0.5s_ease-out] space-y-16">
                  <div className="text-center mb-16">
                    <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">Get in <span className="text-accent">Touch</span></h3>
                    <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group p-10 rounded-[3rem] glass border-white/5 hover:border-accent/30 transition-all duration-500">
                      <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-8">Liaison Office</h4>
                      <div className="space-y-6">
                        {[
                          { label: "Hotline", val: "+91 9356142931", icon: Phone },
                          { label: "Landline", val: "0181-2711163", icon: Phone },
                          { label: "Email", val: "deanalumni.ae@gmail.com", icon: Mail }
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-dark transition-all">
                              <item.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</p>
                              <p className="text-white font-black">{item.val}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-10 rounded-[3rem] glass border-accent/20 bg-accent/5 flex flex-col justify-between">
                      <div>
                        <Globe className="w-12 h-12 text-accent mb-8" />
                        <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Campus Location</h4>
                        <p className="text-slate-400 font-medium leading-relaxed">
                          Sant Baba Bhag Singh University Campus,<br/>
                          Village Khiala, P.O. Padhiana,<br/>
                          Distt. Jalandhar, Punjab - 144030
                        </p>
                      </div>
                      <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Office Hours</p>
                          <p className="text-white font-black">09:00 - 16:30 (Mon-Fri)</p>
                        </div>
                        <button className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-dark">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
};

export default Alumni;
