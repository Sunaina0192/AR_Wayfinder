import React, { useState } from 'react';
import { ChevronRight, ArrowRight, Building2, Target, Users, BookOpen, Award, Shield, UserCircle, Briefcase, FileText } from 'lucide-react';

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
    <div className="min-h-screen bg-primary text-slate-300 font-sans selection:bg-accent/30 selection:text-white pt-24 flex flex-col px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="SBBS University Campus" 
            className="w-full h-full object-cover scale-105 animate-[pulse_10s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/80 to-primary"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 animate-fade-in-up">
          <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-semibold tracking-wider text-sm mb-6 backdrop-blur-md">
            EST. 2014
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">SBBSU</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium">
            Empowering minds and building the future through academic excellence and innovative leadership.
          </p>
        </div>
      </section>

      {/* Main Content Area - Vertically & Horizontally Centered Container */}
      <div className="flex-grow flex items-center justify-center py-12 md:py-24">
        <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
            
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-1/3 xl:w-1/4 shrink-0">
              <div className="sticky top-24 bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-4 shadow-2xl shadow-black/50 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-blue-500 to-purple-500 opacity-50"></div>
                <h3 className="text-xl font-bold text-white mb-6 px-4 pt-2">Quick Links</h3>
                <nav className="flex flex-col gap-2.5 px-1">
                  {SIDEBAR_LINKS.map((link) => {
                    const Icon = link.icon;
                    const isActive = activeTab === link.id;
                    return (
                      <button
                        key={link.id}
                        onClick={() => setActiveTab(link.id)}
                        className={`
                          w-full group flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300
                          ${isActive 
                            ? 'bg-accent/15 border-accent/40 text-accent shadow-[0_4px_20px_rgba(6,182,212,0.15)] scale-[1.02]' 
                            : 'border-transparent text-slate-400 hover:bg-slate-800/80 hover:text-white hover:translate-x-1'}
                          border backdrop-blur-sm
                        `}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`
                            p-2.5 rounded-xl transition-all duration-300
                            ${isActive 
                              ? 'bg-accent text-dark shadow-[0_0_15px_rgba(6,182,212,0.4)] rotate-3' 
                              : 'bg-slate-800 text-slate-500 group-hover:bg-accent/20 group-hover:text-accent group-hover:rotate-6'}
                          `}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="font-bold text-[13px] tracking-tight text-left">{link.label}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-all duration-300 ${isActive ? 'translate-x-1 opacity-100 text-accent' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Dynamic Content Panel */}
            <div className="w-full lg:w-2/3 xl:w-3/4">
              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/20 min-h-[600px] transition-all duration-500 text-left">
                
                {activeTab === 'about' ? (
                  <div className="animate-[fade-in_0.5s_ease-out]">
                    <div className="flex items-center gap-4 mb-8 border-b border-slate-700/50 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center shadow-lg shadow-accent/20 shrink-0">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">SBBS University</h2>
                        <p className="text-accent font-medium mt-1">A Legacy of Excellence</p>
                      </div>
                    </div>

                    <div className="space-y-8 text-slate-300 text-lg leading-relaxed">
                      <p className="first-letter:text-5xl first-letter:font-black first-letter:text-accent first-letter:mr-3 first-letter:float-left first-line:tracking-widest first-line:uppercase">
                        The Sant Baba Bhag Singh Memorial Charitable Society, under the dynamic leadership of Sant Baba Malkit Singh Ji, has been providing essential infrastructure facilities to the people living in the vicinity of Dera Sant Pura Jabbar, near Adampur Doaba, Distt. Jalandhar. This includes constructing bridges and roads and providing street lights to villages. The Society began offering formal education by establishing the SBBS Institute of Engineering & Technology in 2003. This was followed by the establishment of SBBS International School in 2004, SBBS Institute of Education in 2005, SBBS Institute of Nursing in 2005, SBBS Research & Development Centre in 2010, SBBS Post Graduate College in 2011, and SBBS Public School, Dinjan in 2011. Rural healthcare has been provided through Guru Nanak Sadh Sangat Charitable Hospital, Kalra, since 2003.
                      </p>

                      <div className="relative p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 my-10 overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors duration-500"></div>
                        <p className="text-xl font-medium text-white/90 italic relative z-10">
                          "To encourage each and every child to get educated, acquire knowledge and wisdom so as to learn the art of leading a happy, successful, and meaningful life,"
                        </p>
                        <p className="mt-4 text-base relative z-10">
                          all these institutions established their presence in the field of education, leading to their flowering into Sant Baba Bhag Singh University, established under the Sant Baba Bhag Singh University Act, 2014.
                        </p>
                      </div>

                      <p>
                        The institutions have made significant contributions in the field of education, as evidenced by excellent results and placement records. With state-of-the-art infrastructure catering to the needs of students, a pollution-free and drug-free campus, a focus on excellence in teaching, and the active involvement of students and faculty in co-curricular and extracurricular activities - including NCC, NSS, industrial visits, and a remarkable presence in sports among educational institutions - along with a culture of imbibing ethical values, Sant Baba Bhag Singh University is an ideal choice for quality education.
                      </p>
                    </div>

                    {/* Call to action or dynamic cards inside content */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-accent/30 transition-all duration-300">
                        <Award className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                        <h4 className="text-xl font-bold text-white mb-2">Excellence in Teaching</h4>
                        <p className="text-sm text-slate-400">Dedicated faculty focused on practical and theoretical mastery.</p>
                      </div>
                      <div className="group p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300">
                        <Target className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                        <h4 className="text-xl font-bold text-white mb-2">Holistic Development</h4>
                        <p className="text-sm text-slate-400">Strong emphasis on sports, NCC, NSS, and ethical values.</p>
                      </div>
                    </div>
                  </div>
                ) : activeTab === 'vision' ? (
                  <div className="animate-[fade-in_0.5s_ease-out] space-y-12">
                    <div className="flex items-center gap-4 mb-8 border-b border-slate-700/50 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-accent flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Vision & Mission</h2>
                        <p className="text-accent font-medium mt-1">Our North Star for the Future</p>
                      </div>
                    </div>

                    {/* Vision Card */}
                    <div className="group relative p-8 md:p-10 rounded-[2rem] bg-slate-800/40 border border-slate-700/50 hover:border-accent/50 transition-all duration-500 overflow-hidden">
                      <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent/5 rounded-full blur-[100px] group-hover:bg-accent/10 transition-all duration-700"></div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-5 mb-6">
                          <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20 text-accent group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                          </div>
                          <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Vision</h3>
                        </div>
                        <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-medium">
                          To inspire learners to pursue education, gain knowledge, and wisdom, ultimately leading to a fulfilling, successful, and purposeful life.
                        </p>
                      </div>
                    </div>

                    {/* Mission Card */}
                    <div className="group relative p-8 md:p-10 rounded-[2rem] bg-slate-800/40 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 overflow-hidden">
                      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] group-hover:bg-blue-500/10 transition-all duration-700"></div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-5 mb-6">
                          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 13V2l8 4-8 4Z"/><path d="m20 21-1.707-1.707a.5.5 0 0 0-.707 0L15.5 21.414a.5.5 0 0 1-.707 0L12.5 19.12a.5.5 0 0 0-.707 0L9.5 21.414a.5.5 0 0 1-.707 0L6.5 19.12a.5.5 0 0 0-.707 0L4 21V3h8"/></svg>
                          </div>
                          <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Mission</h3>
                        </div>
                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                          To ensure each student receives a well-rounded education in a lively and engaging setting, aiming for the highest academic excellence. Our goal is to nurture self-expression, independence, confidence, and self-esteem, fostering a culture of self-directed learning that prepares students for success in today's ever-evolving world.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : activeTab === 'objectives' ? (
                  <div className="animate-[fade-in_0.5s_ease-out] space-y-10">
                    <div className="flex items-center gap-4 mb-8 border-b border-slate-700/50 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-accent flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Objectives of SBBS University</h2>
                        <p className="text-accent font-medium mt-1">Our Commitment to Society & Excellence</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {[
                        {
                          text: "To address the educational needs of the society through participatory mechanisms.",
                          icon: <Users className="w-5 h-5" />,
                          color: "from-blue-500/20 to-blue-600/5",
                          borderColor: "border-blue-500/30"
                        },
                        {
                          text: "To develop curriculum addressing challenges of the stakeholders for finding appropriate technology options to promote a just and equitable economic and social development.",
                          icon: <Target className="w-5 h-5" />,
                          color: "from-accent/20 to-accent/5",
                          borderColor: "border-accent/30"
                        },
                        {
                          text: "To develop a pool of researchers and academicians across the disciplines interested in and working for rural communities leveraging academic inputs for higher education.",
                          icon: <Briefcase className="w-5 h-5" />,
                          color: "from-purple-500/20 to-purple-600/5",
                          borderColor: "border-purple-500/30"
                        },
                        {
                          text: "To train manpower to meet with the scientific and industrial needs- locally and globally.",
                          icon: <Award className="w-5 h-5" />,
                          color: "from-amber-500/20 to-amber-600/5",
                          borderColor: "border-amber-500/30"
                        },
                        {
                          text: "To pay special attention to the improvement of the social and economic conditions and welfare of the people of the region.",
                          icon: <Shield className="w-5 h-5" />,
                          color: "from-emerald-500/20 to-emerald-600/5",
                          borderColor: "border-emerald-500/30"
                        },
                        {
                          text: "To inculcate entrepreneurial spirit among the girls belonging to rural areas.",
                          icon: <ArrowRight className="w-5 h-5" />,
                          color: "from-pink-500/20 to-pink-600/5",
                          borderColor: "border-pink-500/30"
                        }
                      ].map((obj, idx) => (
                        <div 
                          key={idx} 
                          className={`group relative flex items-start gap-5 p-6 rounded-2xl bg-gradient-to-r ${obj.color} border ${obj.borderColor} hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-black/20`}
                        >
                          <div className="mt-1 p-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 group-hover:text-white group-hover:bg-slate-800 transition-colors shrink-0">
                            {obj.icon}
                          </div>
                          <p className="text-lg text-slate-200 leading-relaxed font-medium">
                            {obj.text}
                          </p>
                          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-30 transition-opacity">
                            <div className="text-4xl font-black italic select-none">0{idx + 1}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : activeTab === 'reason' ? (
                  <div className="animate-[fade-in_0.5s_ease-out] space-y-12">
                    <div className="flex items-center gap-4 mb-8 border-b border-slate-700/50 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Why SBBS University?</h2>
                        <p className="text-accent font-medium mt-1">Excellence in Every Dimension</p>
                      </div>
                    </div>

                    {/* Reasons Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { title: "Statutory Recognition", desc: "Established vide Sant Baba Bhag Singh University Act 2014, Punjab Act No. 8 of 2015." },
                        { title: "Proven Legacy", desc: "9+ years of commitment in the service of Quality Education." },
                        { title: "Expert Faculty", desc: "Highly qualified, research-oriented faculty from India and abroad (75% hold Ph.D. degrees)." },
                        { title: "High-Speed Connectivity", desc: "Well-equipped computer labs with 1Gbps wifi connectivity across campus." },
                        { title: "World-Class Infrastructure", desc: "State-of-the-art academic buildings and fully furnished separate hostels." },
                        { title: "Skill Development", desc: "Regular guest lectures by experts equipping learners with life skills." },
                        { title: "Financial Support", desc: "Significant support for needy and meritorious students; no capitation fee." },
                        { title: "Eco-Friendly Campus", desc: "24-hr power backup, sewerage treatment plant, and green hygienic environment." },
                        { title: "Diverse Programs", desc: "Offers more than 50 specialized programs across various disciplines." },
                        { title: "Career Success", desc: "100% placement assistance for eligible students in reputable companies." }
                      ].map((reason, idx) => (
                        <div key={idx} className="group p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-accent/40 transition-all duration-300">
                          <h4 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                            {reason.title}
                          </h4>
                          <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                            {reason.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Facilities Section */}
                    <div className="mt-16 p-8 rounded-[2.5rem] bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px]"></div>
                      <h3 className="text-2xl font-bold text-white mb-10 text-center uppercase tracking-widest">Campus Facilities</h3>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {[
                          { icon: "🛡️", label: "NCC" },
                          { icon: "🚌", label: "Transport" },
                          { icon: "🤝", label: "NSS" },
                          { icon: "📶", label: "Wifi" },
                          { icon: "📚", label: "Library" },
                          { icon: "⚡", label: "24x7 Power" },
                          { icon: "🌿", label: "Clean & Green" },
                          { icon: "🏟️", label: "Stadium" },
                          { icon: "☕", label: "Cafeteria" },
                          { icon: "🏋️", label: "Gymnasium" },
                          { icon: "🏥", label: "Medical" },
                          { icon: "🏠", label: "Hostels" }
                        ].map((facility, idx) => (
                          <div key={idx} className="flex flex-col items-center gap-3 group">
                            <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-3xl group-hover:bg-accent/20 group-hover:border-accent/50 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-black/20">
                              {facility.icon}
                            </div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter group-hover:text-white transition-colors text-center">
                              {facility.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : activeTab === 'chancellor' ? (
                  <div className="animate-[fade-in_0.5s_ease-out] space-y-12">
                    <div className="flex items-center gap-4 mb-8 border-b border-slate-700/50 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
                        <UserCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Chancellor's Desk</h2>
                        <p className="text-accent font-medium mt-1">Visionary Leadership at SBBSU</p>
                      </div>
                    </div>

                    {/* Chancellor Profiles */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                      {[
                        {
                          name: "Sant Baba Malkit Singh Ji",
                          title: "Founder Chancellor (2015)",
                          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        },
                        {
                          name: "Sant Baba Dlawar Singh Ji (Brahm Ji)",
                          title: "Chancellor (2015-2021)",
                          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        },
                        {
                          name: "Sant Manmohan Singh Ji",
                          title: "Hon'ble Chancellor",
                          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        }
                      ].map((person, idx) => (
                        <div key={idx} className="group flex flex-col items-center text-center">
                          <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden border-2 border-slate-700/50 group-hover:border-accent transition-all duration-500 shadow-2xl relative">
                            <img src={person.image} alt={person.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                          </div>
                          <div className="mt-6">
                            <h4 className="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors">{person.name}</h4>
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">{person.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chancellor's Message */}
                    <div className="relative p-8 md:p-12 rounded-[3rem] bg-slate-900/60 border border-slate-700/50 overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-indigo-500 to-purple-600"></div>
                      <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-accent/5 rounded-full blur-[100px]"></div>
                      
                      <div className="prose prose-invert max-w-none space-y-6 text-slate-300 leading-relaxed text-lg">
                        <p className="first-letter:text-6xl first-letter:font-black first-letter:text-accent first-letter:mr-3 first-letter:float-left">
                          Golden era of a nation is earmarked by the establishment of higher education traditions. Indian subcontinent emphasized on all encompassing knowledge, creation and its transmission of higher education and created the then world renowned universities and educational centers like Takshila; Nalanda; Ujjain and Kashi. Recognizing this fact the strength of a society lies in all-round development of its youth, Sant Baba Bhag Singh Ji adopted flash rivulet devastated rural area of Jabbar/Manko (Jalandhar). Baba Ji taught people to identify their problems and then solve by self help. Baba Ji carried forward the mission of "NIRMALA PANTH" which was developed by Guru Gobind Singh Ji, the Tenth Guru of Sikhs. It was visualized that education and self help are the transforming force for upliftment of common man.
                        </p>
                        <p>
                          To achieve this, foundation was laid to encourage education for excellence of human development, knowledge, culture, information, wellness and spiritualism. In this direction, a programme of "Girl Education" was initiated in 1954 with a view that girl education empowers the family and hence the society. To begin with, the government schools of this area were helped by strengthening its infrastructure like classrooms and laboratories. But it was realized that quality education was going out of reach for the rural youth. Hence, this flash flood prone area was developed by building "Bridges and Roads" through self help and full participation of local public.
                        </p>
                        <p>
                          Further, to inculcate healthy culture in the rural youth, sports were also encouraged. In the year 2000, Sant Baba Bhag Singh Memorial Charitable Society (SBBSMCS) was established to achieve the vision and mission of Sant Baba Bhag Singh Ji for quality education in technical and professional streams in Doaba region of Punjab by producing students with excellence in academics, sports, human values and other extra-curricular activities. It is the strong academic heritage of the Complex, and adherence to principles that has seen it growing from strength to strength in such a short span of time to be a duly Punjab Government enacted University in 2014 which has been included in UGC list of universities.
                        </p>
                        <div className="bg-slate-800/50 p-6 rounded-2xl border border-accent/20 border-l-4 border-l-accent italic font-medium text-white/90">
                          "It gives me immense pleasure to record that Sant Baba Bhag Singh University is considered as first Rural University of Punjab offering internationally recognized courses in all streams of education."
                        </div>
                        <p>
                          The courses are so designed that one gets not only degree but skill certification too. Equipped with blend of experience (Senior Faculty) and Energy (Young Faculty) outstanding faculty of International standards, Sant Baba Bhag Singh University is committed to ensure bright future of the learners and solicit your participation in this endeavor.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : activeTab === 'society' ? (
                  <div className="animate-[fade-in_0.5s_ease-out] space-y-8">
                    <div className="flex items-center gap-4 mb-8 border-b border-slate-700/50 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">Sant Baba Bhag Singh Memorial Charitable Society Members</h2>
                        <p className="text-accent font-medium mt-1">The Pillars of our Foundation</p>
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-[2rem] border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-800/60 text-accent uppercase text-xs tracking-widest font-black">
                            <th className="px-6 py-5 border-b border-slate-700/50">S.No.</th>
                            <th className="px-6 py-5 border-b border-slate-700/50">Name</th>
                            <th className="px-6 py-5 border-b border-slate-700/50">Occupation</th>
                            <th className="px-6 py-5 border-b border-slate-700/50">Designation</th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-300">
                          {[
                            { name: "Sant Manmohan Singh Ji", occupation: "Saint", designation: "President" },
                            { name: "S. Hardaman Singh Minhas", occupation: "Ex.Serviceman", designation: "Secretary" },
                            { name: "Sant Baba Sarwan Singh Ji", occupation: "Social Service", designation: "Vice President" },
                            { name: "Mr. Sunil Vats", occupation: "Legal & Finance Advisor", designation: "Member cum L&FA" },
                            { name: "S. Amarjit Singh", occupation: "Ex.Serviceman", designation: "Member" },
                            { name: "S. Joginder Singh", occupation: "Ex.Serviceman", designation: "Member" },
                            { name: "S. Kulwant Singh", occupation: "Agriculturist", designation: "Member" },
                            { name: "S. Gian Singh", occupation: "Ex.Serviceman", designation: "Member" },
                            { name: "S. Harjinder Singh", occupation: "Agriculturist", designation: "Member" },
                            { name: "S. Joginder Singh Ajram", occupation: "Agriculturist", designation: "Member" },
                            { name: "S. Manohar Singh", occupation: "Agriculturist", designation: "Member" },
                            { name: "S. Manpreet Singh", occupation: "Agriculturist", designation: "Member" }
                          ].map((member, idx) => (
                            <tr key={idx} className="group hover:bg-white/5 transition-colors duration-300">
                              <td className="px-6 py-4 border-b border-slate-800/50 font-bold text-slate-500 group-hover:text-accent transition-colors">{idx + 1}</td>
                              <td className="px-6 py-4 border-b border-slate-800/50">
                                <div className="font-bold text-white group-hover:translate-x-1 transition-transform duration-300">{member.name}</div>
                              </td>
                              <td className="px-6 py-4 border-b border-slate-800/50 font-medium">{member.occupation}</td>
                              <td className="px-6 py-4 border-b border-slate-800/50">
                                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter ${member.designation === 'President' || member.designation === 'Vice President' ? 'bg-accent/20 text-accent border border-accent/30' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                                  {member.designation}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : activeTab === 'governing' ? (
                  <div className="animate-[fade-in_0.5s_ease-out] space-y-8">
                    <div className="flex items-center gap-4 mb-8 border-b border-slate-700/50 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Governing Body</h2>
                        <p className="text-accent font-medium mt-1">Strategic Leadership & Oversight</p>
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-[2rem] border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-800/60 text-indigo-300 uppercase text-xs tracking-widest font-black">
                            <th className="px-6 py-5 border-b border-slate-700/50 w-16">S.No.</th>
                            <th className="px-6 py-5 border-b border-slate-700/50">Name & Details</th>
                            <th className="px-6 py-5 border-b border-slate-700/50">Representation</th>
                            <th className="px-6 py-5 border-b border-slate-700/50">Designation</th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-300">
                          {[
                            { name: "Sant Manmohan Singh Ji", details: "Chancellor", rep: "", des: "Chairperson" },
                            { name: "S. Manpreet Singh", details: "", rep: "Member SBBSMCS (Nominated by SBBSMCS)", des: "Member" },
                            { name: "Dr. Vijay Dhir", details: "Vice-Chancellor (Interim)", rep: "", des: "Member" },
                            { name: "Dr. Pritpal Singh", details: "Vice-Chancellor SGGSW University, Fatehgarh Sahib", rep: "Eminent Educationist (Nominated by SBBSMCS)", des: "Member" },
                            { name: "S. Balwinder Singh Minhas IAS (Retd.)", details: "Jaipur", rep: "Eminent Educationist (Nominated by SBBSMCS)", des: "Member" },
                            { name: "Dr. Jagdeep Kaur", details: "Professor, Head of Department and Dean UIET, SBBSU", rep: "Expert of Management or Information Technology", des: "Member" },
                            { name: "Mr. Sunil Vats", details: "", rep: "Expert Finance (Nominated by Chancellor)", des: "Member" },
                            { name: "Government Nominee", details: "To be nominated (Request sent to Govt.)", rep: "One eminent educationist nominated by the Secretary to Govt. of Punjab", des: "Member" },
                            { name: "The Secretary to Govt. of Punjab", details: "Department of Higher Education", rep: "Or his representative (not below the rank of joint Secretary)", des: "Member" },
                            { name: "Mr. Rajinder Kumar", details: "Registrar, SBBSU", rep: "", des: "Member Secretary" }
                          ].map((member, idx) => (
                            <tr key={idx} className="group hover:bg-indigo-500/5 transition-colors duration-300">
                              <td className="px-6 py-5 border-b border-slate-800/50 font-bold text-slate-500 group-hover:text-indigo-400 transition-colors">{idx + 1}</td>
                              <td className="px-6 py-5 border-b border-slate-800/50 max-w-xs">
                                <div className="font-bold text-white group-hover:text-indigo-200 transition-colors">{member.name}</div>
                                {member.details && <div className="text-xs text-slate-500 mt-1 italic leading-tight">{member.details}</div>}
                              </td>
                              <td className="px-6 py-5 border-b border-slate-800/50 text-sm italic text-slate-400 leading-tight">
                                {member.rep}
                              </td>
                              <td className="px-6 py-5 border-b border-slate-800/50">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${member.des.includes('Chair') ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                                  {member.des}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : activeTab === 'board' ? (
                  <div className="animate-[fade-in_0.5s_ease-out] space-y-8">
                    <div className="flex items-center gap-4 mb-8 border-b border-slate-700/50 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">The Board of Management</h2>
                        <p className="text-accent font-medium mt-1">Operational Governance & Strategic Management</p>
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-[2rem] border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-800/60 text-emerald-300 uppercase text-xs tracking-widest font-black">
                            <th className="px-6 py-5 border-b border-slate-700/50 w-16">S.No.</th>
                            <th className="px-6 py-5 border-b border-slate-700/50">Name & Details</th>
                            <th className="px-6 py-5 border-b border-slate-700/50">Representation</th>
                            <th className="px-6 py-5 border-b border-slate-700/50">Designation</th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-300">
                          {[
                            { name: "Sant Manmohan Singh Ji", details: "Chancellor", rep: "", des: "Chairman" },
                            { name: "Dr. Vijay Dhir", details: "Vice-Chancellor (Interim)", rep: "", des: "Member" },
                            { name: "S. Gian Singh", details: "", rep: "Member of Society Nominated by SBBSMCS", des: "Member" },
                            { name: "Mr. Sunil Vats", details: "", rep: "Member of Society Nominated by SBBSMCS", des: "Member" },
                            { name: "Directorate of Higher Education", details: "Director (or Representative)", rep: "Representative of the State Govt.", des: "Member" },
                            { name: "S. Jatinder Jay Minhas", details: "President & CEO Elegant Development Inc., Canada", rep: "Nominated by SBBSMCS (Non-member)", des: "Member" },
                            { name: "S. Jujhar Singh Minhas", details: "VPO - Daroli Kalan Distt - Jal.", rep: "Nominated by SBBSMCS (Non-member)", des: "Member" },
                            { name: "S. Kuldeep Singh Parmar", details: "VPO - Binjom Distt - Hoshiarpur", rep: "Nominated by SBBSMCS (Non-member)", des: "Member" },
                            { name: "Mr. Roop Singh", details: "Asst. Professor, Dept. of Management, UICM", rep: "Teacher, Nominated by SBBSMCS", des: "Member" },
                            { name: "Dr. Jagteshwar Singh", details: "Assoc. Professor, Dept. of Mechanical Eng., UIET", rep: "Teacher, Nominated by SBBSMCS", des: "Member" },
                            { name: "Dr. Vijay Dhir", details: "Dean Academics", rep: "Teacher, Nominated by the Chancellor", des: "Member" },
                            { name: "Dr. Sandeep Randhawa", details: "Assoc. Professor, Dept. of Management, UICM", rep: "Teacher, Nominated by the Chancellor", des: "Member" },
                            { name: "Mr. Rajinder Kumar", details: "Registrar", rep: "", des: "Member Secretary" }
                          ].map((member, idx) => (
                            <tr key={idx} className="group hover:bg-emerald-500/5 transition-colors duration-300">
                              <td className="px-6 py-4 border-b border-slate-800/50 font-bold text-slate-500 group-hover:text-emerald-400 transition-colors">{idx + 1}</td>
                              <td className="px-6 py-4 border-b border-slate-800/50 max-w-xs">
                                <div className="font-bold text-white group-hover:text-emerald-200 transition-colors">{member.name}</div>
                                {member.details && <div className="text-xs text-slate-500 mt-1 italic leading-tight">{member.details}</div>}
                              </td>
                              <td className="px-6 py-4 border-b border-slate-800/50 text-sm italic text-slate-400 leading-tight">
                                {member.rep}
                              </td>
                              <td className="px-6 py-4 border-b border-slate-800/50">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${member.des.includes('Chair') ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                                  {member.des}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : activeTab === 'vice-chancellor' ? (
                  <div className="animate-[fade-in_0.5s_ease-out] space-y-12">
                    <div className="flex items-center gap-4 mb-8 border-b border-slate-700/50 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-600/20 shrink-0">
                        <UserCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Vice-Chancellor's Desk</h2>
                        <p className="text-accent font-medium mt-1">Leading Academic Excellence</p>
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-10 items-start">
                      {/* VC Profile Card */}
                      <div className="w-full lg:w-1/3 shrink-0">
                        <div className="group relative rounded-3xl overflow-hidden border-2 border-slate-700/50 hover:border-accent transition-all duration-500 shadow-2xl">
                          <div className="aspect-[3/4] relative overflow-hidden bg-slate-800">
                            <img 
                              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                              alt="Dr. Vijay Dhir" 
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                          </div>
                          <div className="absolute bottom-0 left-0 w-full p-6 text-center">
                            <h4 className="text-2xl font-black text-white mb-1">Dr. Vijay Dhir</h4>
                            <p className="text-xs font-bold text-accent uppercase tracking-[0.2em]">Vice-Chancellor (Interim)</p>
                          </div>
                        </div>
                      </div>

                      {/* VC Message */}
                      <div className="w-full lg:w-2/3 relative">
                        <div className="absolute -top-10 -left-10 text-9xl font-black text-accent/5 select-none pointer-events-none italic">"</div>
                        <div className="prose prose-invert max-w-none space-y-6 text-slate-300 leading-relaxed text-lg italic">
                          <p className="relative z-10">
                            Sant Baba Bhag Singh University stands as a living embodiment of the noble vision, spiritual wisdom, and selfless service of the revered saints of Dera Santpura Jabbar—Sant Baba Bhag Singh Ji, Sant Baba Hardyal Singh Mussafir Ji, and Sant Baba Malkit Singh Ji.
                          </p>
                          <p>
                            The educational journey of the Dera began humbly yet resolutely in 1954 with the establishment of primary education for girls—a progressive step far ahead of its time. This initiative gradually expanded into a senior secondary school and later into colleges and professional institutes, ultimately culminating in the establishment of a full-fledged university.
                          </p>
                          <p>
                            Today, Sant Baba Bhag Singh University offers a wide spectrum of academic programmes spanning Engineering, Management, Sciences, Humanities, Commerce, Education, Law, Sports, Rural Development, and Agriculture.
                          </p>
                          <p>
                            Special emphasis is laid on nurturing responsible citizens who are academically competent, socially sensitive, and morally grounded. Together with a dedicated team of faculty and administrators, we are steadfast in our pursuit of academic excellence, impactful research, and meaningful community engagement.
                          </p>
                          <p>
                            If you aspire to receive a quality education in a drug-free, value-oriented, and spiritually enriching environment, Sant Baba Bhag Singh University is the right place for you. We warmly invite you to become a part of our academic family.
                          </p>
                          <div className="not-italic pt-4">
                            <h5 className="text-white font-bold text-xl">Dr. Vijay Dhir</h5>
                            <p className="text-slate-500 font-semibold uppercase tracking-widest text-xs">Vice-Chancellor</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : activeTab === 'registrar' ? (
                  <div className="animate-[fade-in_0.5s_ease-out] space-y-12">
                    <div className="flex items-center gap-4 mb-8 border-b border-slate-700/50 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg shadow-slate-600/20 shrink-0">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Registrar's Desk</h2>
                        <p className="text-accent font-medium mt-1">Operational Excellence & Student Support</p>
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-10 items-start">
                      {/* Registrar Profile Card */}
                      <div className="w-full lg:w-1/3 shrink-0">
                        <div className="group relative rounded-3xl overflow-hidden border-2 border-slate-700/50 hover:border-accent transition-all duration-500 shadow-2xl">
                          <div className="aspect-[4/5] relative overflow-hidden bg-slate-800">
                            <img 
                              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                              alt="Mr. Rajinder Kumar" 
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                          </div>
                          <div className="absolute bottom-0 left-0 w-full p-6 text-center">
                            <h4 className="text-2xl font-black text-white mb-1">Mr. Rajinder Kumar</h4>
                            <p className="text-xs font-bold text-accent uppercase tracking-[0.2em]">Registrar</p>
                          </div>
                        </div>
                      </div>

                      {/* Registrar Message */}
                      <div className="w-full lg:w-2/3">
                        <div className="prose prose-invert max-w-none space-y-6 text-slate-300 leading-relaxed text-lg">
                          <div className="p-8 rounded-3xl bg-slate-800/30 border border-slate-700/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-1 h-full bg-accent/30"></div>
                            <p className="relative z-10 font-medium text-white/90">
                              "The vision of this university is to provide quality education and assistance to economically weaker students. While every student possesses potential, it's crucial to develop these abilities into practical skills to navigate life's challenges independently."
                            </p>
                          </div>
                          <p>
                            Achieving life's goals requires consistent effort and academic excellence. To aid your journey towards success, we offer a diverse range of disciplines including Engineering, Management, Education, Physical Education, Agriculture, Hotel Management, Computer Sciences, Health Sciences, Physiotherapy, Fashion Designing, Humanities, and Law.
                          </p>
                          <p>
                            At our university, you'll find abundant opportunities to hone your skills and thrive. I express heartfelt gratitude to the students and parents who have entrusted us with their education. Wishing you all success and continuous advancement in your careers.
                          </p>
                          <div className="pt-4 border-t border-slate-700/50">
                            <h5 className="text-white font-bold text-xl">Mr. Rajinder Kumar</h5>
                            <p className="text-slate-500 font-semibold uppercase tracking-widest text-xs">Registrar, SBBSU</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : activeTab === 'dean' ? (
                  <div className="animate-[fade-in_0.5s_ease-out] space-y-12">
                    <div className="flex items-center gap-4 mb-8 border-b border-slate-700/50 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-600/20 shrink-0">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Dean Academics' Desk</h2>
                        <p className="text-accent font-medium mt-1">Academic Innovation & Excellence</p>
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-10 items-start">
                      {/* Dean Profile Card */}
                      <div className="w-full lg:w-1/3 shrink-0">
                        <div className="group relative rounded-3xl overflow-hidden border-2 border-slate-700/50 hover:border-accent transition-all duration-500 shadow-2xl">
                          <div className="aspect-[4/5] relative overflow-hidden bg-slate-800">
                            <img 
                              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                              alt="Dr. Vijay Dhir" 
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                          </div>
                          <div className="absolute bottom-0 left-0 w-full p-6 text-center">
                            <h4 className="text-2xl font-black text-white mb-1">Dr. Vijay Dhir</h4>
                            <p className="text-xs font-bold text-accent uppercase tracking-[0.2em]">Dean Academics</p>
                          </div>
                        </div>
                      </div>

                      {/* Dean Message */}
                      <div className="w-full lg:w-2/3">
                        <div className="prose prose-invert max-w-none space-y-6 text-slate-300 leading-relaxed text-lg">
                          <p className="first-letter:text-5xl first-letter:font-black first-letter:text-emerald-500 first-letter:mr-3 first-letter:float-left">
                            At our university, we are deeply committed to fostering an environment that prioritizes quality education and support for economically disadvantaged students. We recognize that each student holds immense potential, and our mission is to transform this potential into practical skills essential for overcoming life's challenges and achieving independence.
                          </p>
                          <p>
                            Our esteemed faculty, proficient in both traditional and contemporary teaching methodologies, is dedicated to guiding you towards your fullest potential. They bring a wealth of knowledge and a passion for teaching that ensures every student receives a comprehensive and enriching education.
                          </p>
                          <p>
                            Success in life is built upon a foundation of sustained effort and academic excellence. Our goal is to develop raw talent into disciplined and accomplished professionals across our diverse disciplines.
                          </p>
                          <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-100 italic">
                            "I extend my sincere appreciation to the students and parents for choosing our institution as your partner in education. I wish you all continued success and progression in your academic and professional journeys."
                          </div>
                          <div className="pt-4">
                            <h5 className="text-white font-bold text-xl">Dr. Vijay Dhir</h5>
                            <p className="text-slate-500 font-semibold uppercase tracking-widest text-xs">Dean Academics, SBBSU</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : activeTab === 'administration' ? (
                  <div className="animate-[fade-in_0.5s_ease-out] space-y-8">
                    <div className="flex items-center gap-4 mb-8 border-b border-slate-700/50 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center shadow-lg shadow-slate-500/20 shrink-0">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">University Administration</h2>
                        <p className="text-accent font-medium mt-1">Directory of Officials & Support</p>
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-[2rem] border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-800/60 text-slate-300 uppercase text-[10px] tracking-widest font-black">
                            <th className="px-6 py-5 border-b border-slate-700/50 w-16 text-center">S.No.</th>
                            <th className="px-6 py-5 border-b border-slate-700/50">Designation</th>
                            <th className="px-6 py-5 border-b border-slate-700/50">Name</th>
                            <th className="px-6 py-5 border-b border-slate-700/50">Contact Number</th>
                            <th className="px-6 py-5 border-b border-slate-700/50">Email ID</th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-300">
                          {[
                            { des: "Vice-Chancellor (Interim)", name: "Dr. Vijay Dhir", phone: "8558939400", email: "vc@sbbsuniversity.ac.in" },
                            { des: "Registrar", name: "Mr. Rajinder Kumar", phone: "0181-2711535", email: "registrar@sbbsuniversity.ac.in" },
                            { des: "Dean Academics", name: "Dr. Vijay Dhir", phone: "8558939400", email: "deanacademicsbbbsu@gmail.com" },
                            { des: "Dy. Dean Academics", name: "Dr. Gurmanik Kaur", phone: "9878172836", email: "electrical.sbbsu@gmail.com" },
                            { des: "Dean FA", name: "Dr. Kulbir Singh", phone: "9463131081", email: "" },
                            { des: "Dean UIET", name: "Dr. Jagdeep Kaur", phone: "9501030920", email: "sbbsuietcse@gmail.com" },
                            { des: "Dean UIE", name: "Dr. Amarjeet Singh", phone: "7888734770", email: "deansbbsuie@gmail.com" },
                            { des: "Dean UIH", name: "Dr. Mandeep Singh", phone: "9417412445", email: "deansbbsuie@gmail.com" },
                            { des: "Dean UICA & UICM", name: "Dr. Vijay Dhir", phone: "8558939400", email: "deanacademicsbbbsu@gmail.com" },
                            { des: "Dean UIAHS", name: "Dr. Shweta Singh", phone: "7696210956", email: "duishsbbsu@gmail.com" },
                            { des: "Dean UIS", name: "Dr. Indu Sharma", phone: "9356142931", email: "" },
                            { des: "Dean UIL", name: "Dr. Pooja Bali", phone: "8580719332", email: "poojabalithakur@gmail.com" },
                            { des: "Director R & D", name: "Dr. Nisha Sharma", phone: "9592517070", email: "research.sbbsu@gmail.com" },
                            { des: "Director IQAC", name: "Dr. Anil K. Singh", phone: "8219976153", email: "iqac@sbbsuniversity.ac.in" },
                            { des: "Director Sports & Physical Education", name: "Dr. Amarjit Singh", phone: "7888734770", email: "sportssbbsu@gmail.com" },
                            { des: "Director Training & Placement", name: "Dr. Jagteshwar Singh", phone: "9780519511", email: "placements@sbbsuniversity.ac.in" },
                            { des: "Controller of Examination", name: "Mr. Roop Singh", phone: "9463360383", email: "exam.sbbsu@gmail.com" },
                            { des: "Deputy Registrar", name: "Mr. Roop Singh", phone: "9463360383", email: "roopsingh25@gmail.com" },
                            { des: "Dean Alumni and Extension Activities", name: "Dr. Indu Sharma", phone: "9356142931", email: "deanalumni.ae@gmail.com" }
                          ].map((admin, idx) => (
                            <tr key={idx} className="group hover:bg-white/5 transition-colors duration-300">
                              <td className="px-6 py-4 border-b border-slate-800/50 text-center font-bold text-slate-500 group-hover:text-accent transition-colors">{idx + 1}</td>
                              <td className="px-6 py-4 border-b border-slate-800/50">
                                <div className="font-black text-white group-hover:text-accent transition-colors text-xs uppercase tracking-tighter">{admin.des}</div>
                              </td>
                              <td className="px-6 py-4 border-b border-slate-800/50 font-bold text-slate-200">{admin.name}</td>
                              <td className="px-6 py-4 border-b border-slate-800/50 text-sm font-medium text-slate-400 group-hover:text-white transition-colors">{admin.phone}</td>
                              <td className="px-6 py-4 border-b border-slate-800/50 text-sm text-accent/80 hover:text-accent transition-colors underline decoration-accent/20 underline-offset-4">{admin.email}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center animate-[fade-in_0.3s_ease-out]">
                    <div className="w-20 h-20 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center mb-6">
                      <ArrowRight className="w-8 h-8 text-slate-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {SIDEBAR_LINKS.find(l => l.id === activeTab)?.label}
                    </h3>
                    <p className="text-slate-400 max-w-md">
                      Content for this section is currently being updated. Please check back later or explore other sections of our university profile.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Global simple animations for Tailwind if not present in index.css */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}} />
    </div>
  );
};

export default About;
