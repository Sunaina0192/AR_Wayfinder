import React, { useState } from 'react';
import { ChevronRight, ArrowRight, Building2, Target, Users, BookOpen, Award, Shield, UserCircle, Briefcase, FileText, Quote, LayoutGrid } from 'lucide-react';

const SIDEBAR_LINKS = [
  { id: 'about', label: 'About University', icon: Building2 },
  { id: 'vision', label: 'Vision & Mission', icon: Target },
  { id: 'objectives', label: 'Objectives', icon: BookOpen },
  { id: 'reason', label: 'Reason to Join SBBSU', icon: Award },
  { id: 'chancellor', label: 'Chancellor desk', icon: UserCircle },
  { id: 'society', label: 'Society Members', icon: Users },
  { id: 'governing', label: 'Governing body', icon: Shield },
  { id: 'board', label: 'Board of Management', icon: Briefcase },
  { id: 'vice-chancellor', label: 'Vice-Chancellor', icon: UserCircle },
  { id: 'registrar', label: 'Registrar', icon: FileText },
  { id: 'dean', label: 'Dean Academics', icon: BookOpen },
  { id: 'administration', label: 'Administration', icon: Building2 },
];

const About = () => {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="min-h-screen bg-dark text-white pt-24 pb-20 selection:bg-accent/30 selection:text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="SBBS University Campus" 
            className="w-full h-full object-cover scale-110 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/90 to-dark"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8 animate-float">
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Established 2014</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
            Our <span className="text-accent">Legacy</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Empowering minds and building the future through academic excellence and innovative leadership.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-1/3 shrink-0 lg:sticky lg:top-32">
            <div className="glass p-6 rounded-[2.5rem] border-white/5 shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 mb-8 px-4">
                <div className="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Institutional Menu</h3>
              </div>
              
              <nav className="flex flex-col gap-2">
                {SIDEBAR_LINKS.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeTab === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => setActiveTab(link.id)}
                      className={`
                        w-full group flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-500
                        ${isActive 
                          ? 'bg-accent text-dark shadow-2xl shadow-accent/20 scale-[1.02]' 
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'}
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <Icon className={`w-5 h-5 transition-transform duration-500 ${isActive ? 'rotate-12' : 'group-hover:rotate-6'}`} />
                        <span className="font-black text-[11px] uppercase tracking-widest">{link.label}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-all duration-500 ${isActive ? 'translate-x-1 opacity-100' : 'opacity-0 -translate-x-2'}`} />
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Sidebar Promo Card */}
            <div className="mt-8 p-8 rounded-[2.5rem] bg-gradient-to-br from-accent/20 to-secondary/20 border border-white/5 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150"></div>
              <h4 className="text-xl font-black text-white mb-4 leading-tight">Apply for <br />Admission 2026</h4>
              <button className="flex items-center gap-2 text-[10px] font-black text-accent uppercase tracking-widest group/btn">
                Get Started 
                <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center group-hover/btn:bg-accent group-hover/btn:text-dark transition-all">
                  →
                </span>
              </button>
            </div>
          </div>

          {/* Dynamic Content Panel */}
          <div className="flex-1 min-h-[800px]">
            <div className="glass p-10 md:p-16 rounded-[3.5rem] border-white/5 shadow-2xl">
                
                {activeTab === 'about' ? (
                <div className="animate-[fade-in_0.5s_ease-out]">
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                      <Building2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">SBBS University</h2>
                      <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mt-2">Foundations of Excellence</p>
                    </div>
                  </div>

                  <div className="space-y-10 text-slate-400 text-lg leading-relaxed font-medium">
                    <p className="first-letter:text-7xl first-letter:font-black first-letter:text-accent first-letter:mr-4 first-letter:float-left first-letter:leading-none">
                      The Sant Baba Bhag Singh Memorial Charitable Society, under the dynamic leadership of Sant Baba Malkit Singh Ji, has been providing essential infrastructure facilities to the people living in the vicinity of Dera Sant Pura Jabbar, near Adampur Doaba, Distt. Jalandhar. This includes constructing bridges and roads and providing street lights to villages.
                    </p>

                    <div className="p-10 rounded-[2.5rem] bg-accent/5 border-l-4 border-accent italic text-white/90 my-12 relative overflow-hidden group">
                      <Quote className="absolute -top-6 -left-6 w-32 h-32 text-accent/5 -rotate-12" />
                      <p className="text-2xl font-medium leading-relaxed relative z-10">
                        "To encourage each and every child to get educated, acquire knowledge and wisdom so as to learn the art of leading a happy, successful, and meaningful life."
                      </p>
                    </div>

                    <p>
                      The institutions have made significant contributions in the field of education, as evidenced by excellent results and placement records. With state-of-the-art infrastructure catering to the needs of students, a pollution-free and drug-free campus, a focus on excellence in teaching, and the active involvement of students and faculty in co-curricular and extracurricular activities.
                    </p>
                  </div>

                  <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all duration-500">
                      <Award className="w-10 h-10 text-accent mb-6 group-hover:scale-110 transition-transform" />
                      <h4 className="text-2xl font-black text-white mb-3">Academic Prowess</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">Dedicated faculty focused on practical and theoretical mastery of modern industry standards.</p>
                    </div>
                    <div className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all duration-500">
                      <Target className="w-10 h-10 text-accent mb-6 group-hover:scale-110 transition-transform" />
                      <h4 className="text-2xl font-black text-white mb-3">Holistic Vision</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">Strong emphasis on sports, NCC, NSS, and ethical values alongside rigorous academic training.</p>
                    </div>
                  </div>
                </div>
              ) : activeTab === 'vision' ? (
                <div className="animate-[fade-in_0.5s_ease-out] space-y-16">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">Vision & <span className="text-accent">Mission</span></h2>
                    <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
                  </div>

                  {/* Vision Card */}
                  <div className="group relative p-12 rounded-[3rem] glass border-white/5 hover:border-accent/30 transition-all duration-500 overflow-hidden">
                    <div className="absolute -right-20 -top-20 w-80 h-80 bg-accent/5 rounded-full blur-[100px] transition-all duration-700 group-hover:scale-125"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-6 mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                          <Target className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Vision</h3>
                      </div>
                      <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed italic">
                        "To inspire learners to pursue education, gain knowledge, and wisdom, ultimately leading to a fulfilling, successful, and purposeful life."
                      </p>
                    </div>
                  </div>

                  {/* Mission Card */}
                  <div className="group relative p-12 rounded-[3rem] glass border-white/5 hover:border-accent/30 transition-all duration-500 overflow-hidden">
                    <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-accent/5 rounded-full blur-[100px] transition-all duration-700 group-hover:scale-125"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-6 mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                          <BookOpen className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Mission</h3>
                      </div>
                      <p className="text-xl text-slate-400 font-medium leading-relaxed">
                        To ensure each student receives a well-rounded education in a lively and engaging setting, aiming for the highest academic excellence. Our goal is to nurture self-expression, independence, confidence, and self-esteem.
                      </p>
                    </div>
                  </div>
                </div>
              ) : activeTab === 'objectives' ? (
                <div className="animate-[fade-in_0.5s_ease-out] space-y-12">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">Core <span className="text-accent">Objectives</span></h2>
                    <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {[
                      {
                        text: "To address the educational needs of the society through participatory mechanisms.",
                        icon: <Users className="w-6 h-6" />,
                        idx: "01"
                      },
                      {
                        text: "To develop curriculum addressing challenges of the stakeholders for finding appropriate technology options.",
                        icon: <Target className="w-6 h-6" />,
                        idx: "02"
                      },
                      {
                        text: "To develop a pool of researchers and academicians across the disciplines working for rural communities.",
                        icon: <Briefcase className="w-6 h-6" />,
                        idx: "03"
                      },
                      {
                        text: "To train manpower to meet with the scientific and industrial needs locally and globally.",
                        icon: <Award className="w-6 h-6" />,
                        idx: "04"
                      }
                    ].map((obj, i) => (
                      <div 
                        key={i} 
                        className="group relative flex items-start gap-8 p-10 rounded-[2.5rem] glass border-white/5 hover:border-accent/30 transition-all duration-500"
                      >
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-accent group-hover:scale-110 transition-transform shrink-0 shadow-2xl">
                          {obj.icon}
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-black text-accent/50 uppercase tracking-[0.3em]">{obj.idx} Objective</span>
                          <p className="text-xl text-white font-medium leading-relaxed tracking-tight">
                            {obj.text}
                          </p>
                        </div>
                        <div className="absolute bottom-6 right-10 text-6xl font-black text-white/5 select-none pointer-events-none group-hover:text-accent/10 transition-colors">
                          {obj.idx}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                ) : activeTab === 'reason' ? (
                <div className="animate-[fade-in_0.5s_ease-out] space-y-16">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">Why Join <span className="text-accent">SBBSU?</span></h2>
                    <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { title: "Statutory Recognition", desc: "Established vide Sant Baba Bhag Singh University Act 2014, Punjab Act No. 8 of 2015." },
                      { title: "Proven Legacy", desc: "9+ years of commitment in the service of Quality Education with spiritual foundations." },
                      { title: "Expert Faculty", desc: "Highly qualified faculty with 75% holding Ph.D. degrees from premier institutions." },
                      { title: "Digital Campus", desc: "1Gbps high-speed connectivity with advanced computing resources." },
                      { title: "Modern Infrastructure", desc: "State-of-the-art labs, smart classrooms, and premium residential facilities." },
                      { title: "Career Placement", desc: "Dedicated corporate relations team ensuring 100% placement support." }
                    ].map((reason, idx) => (
                      <div key={idx} className="group p-8 rounded-[2.5rem] glass border-white/5 hover:border-accent/30 transition-all duration-500">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-dark transition-all">
                            <Award className="w-5 h-5" />
                          </div>
                          <h4 className="text-2xl font-black text-white tracking-tight">{reason.title}</h4>
                        </div>
                        <p className="text-slate-500 font-medium leading-relaxed">{reason.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : activeTab === 'society' ? (
                <div className="animate-[fade-in_0.5s_ease-out] space-y-12">
                   <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">Society <span className="text-accent">Members</span></h2>
                    <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
                  </div>

                  <div className="overflow-hidden rounded-[2.5rem] glass border-white/5 shadow-2xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white/5 text-accent uppercase text-[10px] tracking-[0.3em] font-black">
                          <th className="px-8 py-6 border-b border-white/5">#</th>
                          <th className="px-8 py-6 border-b border-white/5">Name</th>
                          <th className="px-8 py-6 border-b border-white/5">Designation</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-300">
                        {[
                          { name: "Sant Manmohan Singh Ji", designation: "President" },
                          { name: "S. Hardaman Singh Minhas", designation: "Secretary" },
                          { name: "Sant Baba Sarwan Singh Ji", designation: "Vice President" },
                          { name: "Mr. Sunil Vats", designation: "Member" },
                          { name: "S. Amarjit Singh", designation: "Member" },
                          { name: "S. Joginder Singh", designation: "Member" }
                        ].map((member, idx) => (
                          <tr key={idx} className="group hover:bg-white/5 transition-colors">
                            <td className="px-8 py-5 border-b border-white/5 font-bold text-slate-600">{idx + 1}</td>
                            <td className="px-8 py-5 border-b border-white/5 font-black text-white">{member.name}</td>
                            <td className="px-8 py-5 border-b border-white/5">
                              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter bg-accent/10 text-accent border border-accent/20">
                                {member.designation}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : activeTab === 'administration' ? (
                <div className="animate-[fade-in_0.5s_ease-out] space-y-12">
                   <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">University <span className="text-accent">Admin</span></h2>
                    <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
                  </div>

                  <div className="overflow-hidden rounded-[2.5rem] glass border-white/5 shadow-2xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white/5 text-accent uppercase text-[10px] tracking-[0.3em] font-black">
                          <th className="px-8 py-6 border-b border-white/5">Designation</th>
                          <th className="px-8 py-6 border-b border-white/5">Name</th>
                          <th className="px-8 py-6 border-b border-white/5">Contact</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-300">
                        {[
                          { des: "Vice-Chancellor", name: "Dr. Vijay Dhir", phone: "8558939400", email: "vc@sbbsuniversity.ac.in" },
                          { des: "Registrar", name: "Mr. Rajinder Kumar", phone: "0181-2711535", email: "registrar@sbbsuniversity.ac.in" },
                          { des: "Dean Academics", name: "Dr. Vijay Dhir", phone: "8558939400", email: "deanacademics@sbbsu.ac.in" }
                        ].map((admin, idx) => (
                          <tr key={idx} className="group hover:bg-white/5 transition-colors">
                            <td className="px-8 py-6 border-b border-white/5 text-xs font-black text-white uppercase tracking-widest">{admin.des}</td>
                            <td className="px-8 py-6 border-b border-white/5 font-black text-accent">{admin.name}</td>
                            <td className="px-8 py-6 border-b border-white/5">
                              <p className="text-xs font-bold text-white">{admin.phone}</p>
                              <p className="text-[10px] text-slate-500">{admin.email}</p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : activeTab === 'chancellor' ? (
                <div className="animate-[fade-in_0.5s_ease-out]">
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                      <UserCircle className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Chancellor's Desk</h2>
                      <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mt-2">Visionary Leadership</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-1">
                      <div className="relative rounded-[2rem] overflow-hidden glass border-white/10 group shadow-2xl">
                        <img 
                          src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=500&auto=format&fit=crop" 
                          alt="Chancellor" 
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6 text-center">
                          <h4 className="text-xl font-black text-white">Sant Baba Dilawar Singh Ji</h4>
                          <p className="text-accent font-bold text-[10px] uppercase tracking-[0.2em] mt-1">Hon'ble Chancellor</p>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-2 space-y-6 text-slate-400 leading-relaxed font-medium">
                      <div className="p-8 rounded-[2rem] bg-accent/5 border-l-4 border-accent italic text-white/90 relative overflow-hidden mb-8">
                        <Quote className="absolute -top-4 -left-4 w-24 h-24 text-accent/10 -rotate-12" />
                        <p className="text-xl font-medium relative z-10">
                          "Education is the most powerful weapon which you can use to change the world. We aim to instill values, ethics, and world-class knowledge in every student."
                        </p>
                      </div>
                      <p>
                        Under the divine guidance and visionary leadership of Hon'ble Chancellor Sant Baba Dilawar Singh Ji, Sant Baba Bhag Singh University is scaling new heights of academic excellence.
                      </p>
                      <p>
                        The university is committed to providing a holistic environment where traditional values meet modern technological advancements, ensuring students are well-prepared for global challenges.
                      </p>
                    </div>
                  </div>
                </div>
              ) : activeTab === 'vice-chancellor' ? (
                <div className="animate-[fade-in_0.5s_ease-out]">
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                      <UserCircle className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Vice-Chancellor</h2>
                      <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mt-2">Academic Leadership</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-1">
                      <div className="relative rounded-[2rem] overflow-hidden glass border-white/10 group shadow-2xl">
                        <img 
                          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop" 
                          alt="Vice Chancellor" 
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6 text-center">
                          <h4 className="text-xl font-black text-white">Dr. Vijay Dhir</h4>
                          <p className="text-accent font-bold text-[10px] uppercase tracking-[0.2em] mt-1">Vice-Chancellor</p>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-2 space-y-6 text-slate-400 leading-relaxed font-medium">
                      <div className="p-8 rounded-[2rem] bg-accent/5 border-l-4 border-accent italic text-white/90 relative overflow-hidden mb-8">
                        <Quote className="absolute -top-4 -left-4 w-24 h-24 text-accent/10 -rotate-12" />
                        <p className="text-xl font-medium relative z-10">
                          "Our mission is to transform potential into practical skills essential for overcoming life's challenges through quality education and research."
                        </p>
                      </div>
                      <p>
                        Sant Baba Bhag Singh University stands as a living embodiment of the noble vision, spiritual wisdom, and selfless service of the revered saints.
                      </p>
                      <p>
                        We are steadfast in our pursuit of academic excellence, impactful research, and meaningful community engagement. Together, we are shaping the future of education in a drug-free, value-oriented environment.
                      </p>
                    </div>
                  </div>
                </div>
              ) : activeTab === 'registrar' ? (
                <div className="animate-[fade-in_0.5s_ease-out]">
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Registrar Desk</h2>
                      <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mt-2">Administrative Head</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-1">
                      <div className="relative rounded-[2rem] overflow-hidden glass border-white/10 group shadow-2xl p-8 flex flex-col items-center text-center">
                        <div className="w-32 h-32 rounded-full bg-accent/10 border-4 border-white/5 flex items-center justify-center text-accent mb-6">
                          <UserCircle className="w-16 h-16" />
                        </div>
                        <h4 className="text-xl font-black text-white">Mr. Rajinder Kumar</h4>
                        <p className="text-accent font-bold text-[10px] uppercase tracking-[0.2em] mt-1 mb-6">Registrar</p>
                        <div className="w-full space-y-3 text-left">
                          <div className="bg-dark/50 p-3 rounded-xl border border-white/5 flex items-center gap-3">
                            <FileText className="w-4 h-4 text-accent" />
                            <span className="text-xs text-slate-300">0181-2711535</span>
                          </div>
                          <div className="bg-dark/50 p-3 rounded-xl border border-white/5 flex items-center gap-3">
                            <FileText className="w-4 h-4 text-accent" />
                            <span className="text-xs text-slate-300 truncate">registrar@sbbsuniversity.ac.in</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-2 space-y-6 text-slate-400 leading-relaxed font-medium flex flex-col justify-center">
                      <p className="text-xl text-white/90 font-medium leading-relaxed mb-4">
                        Ensuring seamless administrative operations and fostering an environment conducive to academic growth.
                      </p>
                      <p>
                        The Registrar's office is dedicated to maintaining the highest standards of university governance, student records, and institutional compliance.
                      </p>
                      <p>
                        We strive to provide efficient and transparent services to all stakeholders, including students, faculty, staff, and the community.
                      </p>
                    </div>
                  </div>
                </div>
              ) : activeTab === 'dean' ? (
                <div className="animate-[fade-in_0.5s_ease-out]">
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                      <BookOpen className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Dean Academics</h2>
                      <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em] mt-2">Academic Excellence</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-1">
                      <div className="relative rounded-[2rem] overflow-hidden glass border-white/10 group shadow-2xl p-8 flex flex-col items-center text-center">
                        <div className="w-32 h-32 rounded-full bg-accent/10 border-4 border-white/5 flex items-center justify-center text-accent mb-6">
                          <UserCircle className="w-16 h-16" />
                        </div>
                        <h4 className="text-xl font-black text-white">Dr. Vijay Dhir</h4>
                        <p className="text-accent font-bold text-[10px] uppercase tracking-[0.2em] mt-1 mb-6">Dean Academics</p>
                        <div className="w-full space-y-3 text-left">
                          <div className="bg-dark/50 p-3 rounded-xl border border-white/5 flex items-center gap-3">
                            <FileText className="w-4 h-4 text-accent" />
                            <span className="text-xs text-slate-300">8558939400</span>
                          </div>
                          <div className="bg-dark/50 p-3 rounded-xl border border-white/5 flex items-center gap-3">
                            <FileText className="w-4 h-4 text-accent" />
                            <span className="text-xs text-slate-300 truncate">deanacademics@sbbsu.ac.in</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-2 space-y-6 text-slate-400 leading-relaxed font-medium flex flex-col justify-center">
                      <p className="text-xl text-white/90 font-medium leading-relaxed mb-4">
                        Cultivating a dynamic learning environment through rigorous curriculum design and innovative pedagogical approaches.
                      </p>
                      <p>
                        The Office of the Dean Academics oversees all educational programs, ensuring they align with industry standards and the university's core objectives.
                      </p>
                      <p>
                        Our focus is on interdisciplinary learning, research integration, and comprehensive student development to prepare graduates for a rapidly evolving global landscape.
                      </p>
                    </div>
                  </div>
                </div>
              ) : activeTab === 'governing' ? (
                <div className="animate-[fade-in_0.5s_ease-out] space-y-12">
                   <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">Governing <span className="text-accent">Body</span></h2>
                    <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
                  </div>
                  <div className="overflow-hidden rounded-[2.5rem] glass border-white/5 shadow-2xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white/5 text-accent uppercase text-[10px] tracking-[0.3em] font-black">
                          <th className="px-8 py-6 border-b border-white/5">Position / Description</th>
                          <th className="px-8 py-6 border-b border-white/5 text-right">Role</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-300">
                        {[
                          { pos: "The Chancellor", role: "Chairman" },
                          { pos: "The Vice-Chancellor", role: "Member" },
                          { pos: "Three persons nominated by the society", role: "Members" },
                          { pos: "One expert of management or IT", role: "Member" },
                          { pos: "One finance expert nominated by Chancellor", role: "Member" },
                          { pos: "Secretary Govt. of Punjab (Higher Ed.)", role: "Member" },
                          { pos: "One eminent educationist", role: "Member" },
                          { pos: "Registrar, SBBSU", role: "Member, Secretary" }
                        ].map((item, idx) => (
                          <tr key={idx} className="group hover:bg-white/5 transition-colors">
                            <td className="px-8 py-5 border-b border-white/5 font-black text-white">{item.pos}</td>
                            <td className="px-8 py-5 border-b border-white/5 text-right">
                              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter bg-accent/10 text-accent border border-accent/20">
                                {item.role}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : activeTab === 'board' ? (
                <div className="animate-[fade-in_0.5s_ease-out] space-y-12">
                   <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">Board of <span className="text-accent">Management</span></h2>
                    <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
                  </div>
                  <div className="overflow-hidden rounded-[2.5rem] glass border-white/5 shadow-2xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white/5 text-accent uppercase text-[10px] tracking-[0.3em] font-black">
                          <th className="px-8 py-6 border-b border-white/5">Position / Description</th>
                          <th className="px-8 py-6 border-b border-white/5 text-right">Role</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-300">
                        {[
                          { pos: "The Chancellor or his nominee", role: "Chairperson" },
                          { pos: "The Vice-Chancellor", role: "Member" },
                          { pos: "Two members nominated by the Society", role: "Members" },
                          { pos: "Director (Education) - State Govt Rep.", role: "Member" },
                          { pos: "Three persons not members of Society", role: "Members" },
                          { pos: "Two teachers nominated by the Society", role: "Members" },
                          { pos: "Two teachers nominated by Chancellor", role: "Members" },
                          { pos: "Registrar, SBBSU", role: "Member, Secretary" }
                        ].map((item, idx) => (
                          <tr key={idx} className="group hover:bg-white/5 transition-colors">
                            <td className="px-8 py-5 border-b border-white/5 font-black text-white">{item.pos}</td>
                            <td className="px-8 py-5 border-b border-white/5 text-right">
                              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter bg-accent/10 text-accent border border-accent/20">
                                {item.role}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center animate-[fade-in_0.3s_ease-out]">
                  <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 animate-pulse">
                    <Building2 className="w-10 h-10 text-slate-700" />
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
                    {SIDEBAR_LINKS.find(l => l.id === activeTab)?.label}
                  </h3>
                  <p className="text-slate-500 max-w-md font-medium">
                    This section is currently being modernized. Please check back soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

