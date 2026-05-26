import React from 'react';
import { ShieldCheck, Gavel, Landmark, Target, Users, Mail, Phone, Globe, ChevronRight, LayoutGrid } from 'lucide-react';

const OrganoNode = ({ label, color, isRoot, size = 'normal' }) => {
  const colors = {
    blue: 'from-blue-600 to-blue-900 border-blue-400 text-white shadow-blue-500/20',
    yellow: 'from-yellow-400 to-yellow-600 border-yellow-300 text-slate-950 shadow-yellow-500/20',
    purple: 'from-purple-600 to-purple-900 border-purple-400 text-white shadow-purple-500/20',
    emerald: 'from-emerald-600 to-emerald-900 border-emerald-400 text-white shadow-emerald-500/20',
    green: 'from-green-600 to-green-900 border-green-400 text-white shadow-green-500/20',
    indigo: 'from-indigo-600 to-indigo-900 border-indigo-400 text-white shadow-indigo-500/20',
    cyan: 'from-cyan-500 to-cyan-800 border-cyan-300 text-white shadow-cyan-500/20',
    orange: 'from-orange-600 to-orange-900 border-orange-400 text-white shadow-orange-500/20',
    teal: 'from-teal-600 to-teal-900 border-teal-400 text-white shadow-teal-500/20',
    pink: 'from-pink-600 to-pink-900 border-pink-400 text-white shadow-pink-500/20',
    amber: 'from-amber-500 to-amber-700 border-amber-400 text-slate-950 shadow-amber-500/20',
    slate: 'from-slate-800 to-slate-950 border-slate-700 text-slate-300 shadow-slate-900/50'
  };

  const sizes = {
    normal: 'px-8 py-4 text-sm min-w-[180px]',
    small: 'px-4 py-3 text-[10px] min-w-[120px]',
    mini: 'px-3 py-2 text-[9px] min-w-[100px]'
  };

  return (
    <div className={`
      relative bg-gradient-to-br rounded-2xl border-2 font-black uppercase tracking-widest text-center shadow-lg transition-all duration-300 hover:scale-105 hover:z-20
      ${colors[color] || colors.slate}
      ${sizes[size]}
    `}>
      {label}
      {isRoot && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-white text-blue-600 text-[8px] rounded-full">HEAD</div>
      )}
    </div>
  );
};

const AuthoritySection = ({ title, desc, data }) => (
  <div className="space-y-6 w-full flex flex-col items-center">
    <div className="flex flex-col space-y-1 items-center">
      <h3 className="text-xl font-black text-white uppercase tracking-tight">{title}</h3>
      <p className="text-slate-500 text-xs font-medium italic">{desc}</p>
    </div>
    <div className="w-full overflow-hidden rounded-[2.5rem] glass border-white/5 shadow-2xl">
      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="bg-white/5 text-accent uppercase text-[9px] tracking-[0.2em] font-black">
            <th className="px-8 py-5 border-b border-white/5 w-16 text-left">#</th>
            <th className="px-8 py-5 border-b border-white/5 text-left">Position / Description</th>
            <th className="px-8 py-5 border-b border-white/5 text-right">Role</th>
          </tr>
        </thead>
        <tbody className="text-slate-400">
          {data.map((row, idx) => (
            <tr key={idx} className="group hover:bg-white/5 transition-colors">
              <td className="px-8 py-4 border-b border-white/5 font-bold text-slate-600 group-hover:text-accent transition-colors text-left">
                {idx + 1}
              </td>
              <td className="px-8 py-4 border-b border-white/5 font-bold text-slate-300 group-hover:text-white transition-colors text-left">
                {row.pos}
              </td>
              <td className="px-8 py-4 border-b border-white/5 font-black text-[10px] uppercase tracking-widest text-slate-500 group-hover:text-accent transition-colors text-right">
                {row.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const RTI = () => {
  const officers = [
    {
      no: 1,
      designation: "Registrar",
      position: "Public Information Officer (PIO)",
      contact: "registrar@sbbsuniversity.ac.in",
      phone: "0181-2711163"
    },
    {
      no: 2,
      designation: "Vice-Chancellor",
      position: "First Appellate Authority",
      contact: "vc@sbbsuniversity.ac.in",
      phone: "0181-2711167"
    }
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
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Statutory Disclosure</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
            Right to <span className="text-accent">Information</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Self-Disclosure under Section 4(1)(b) of RTI Act 2005. Ensuring transparency and accountability in higher education.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 -mt-20 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          {/* Section 1: Information Officers */}
          <div className="space-y-16">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">Information <span className="text-accent">Officers</span></h2>
              <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {officers.map((officer, idx) => (
                <div key={idx} className="group p-10 rounded-[3rem] glass border-white/5 hover:border-accent/30 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-dark transition-all">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{officer.position}</p>
                      <h4 className="text-2xl font-black text-white tracking-tight">{officer.designation}</h4>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-slate-400">
                      <Mail className="w-4 h-4 text-accent" />
                      <span className="font-medium">{officer.contact}</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-400">
                      <Phone className="w-4 h-4 text-accent" />
                      <span className="font-medium">{officer.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Objectives */}
          <div className="space-y-16">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">Core <span className="text-accent">Objectives</span></h2>
              <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Promote academic aspirations of rural students",
                "Undertake industry-oriented teaching and research",
                "Disseminate knowledge across all strata of society",
                "Advance Punjabi Language, Literature and Culture",
                "Foster academia-industry nexus with leading houses",
                "Provide instruction and research in all disciplines"
              ].map((obj, idx) => (
                <div key={idx} className="flex gap-6 p-8 rounded-[2.5rem] glass border-white/5 hover:border-accent/20 transition-all">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-black shrink-0">{idx + 1}</div>
                  <p className="text-slate-400 font-medium leading-relaxed">{obj}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Authorities */}
          <div className="space-y-24">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">Governing <span className="text-accent">Authorities</span></h2>
              <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
            </div>

            <div className="space-y-32">
              <AuthoritySection 
                title="Governing Body" 
                desc="As per clause 15.1 of the Act, the Governing Body consists of:"
                data={[
                  { pos: "The Chancellor", role: "Chairman" },
                  { pos: "The Vice-Chancellor", role: "Member" },
                  { pos: "Three persons nominated by the society", role: "Members" },
                  { pos: "One expert of management or information technology", role: "Member" },
                  { pos: "One finance expert nominated by the Chancellor", role: "Member" },
                  { pos: "Secretary Govt. of Punjab (Higher Education)", role: "Member" },
                  { pos: "One eminent educationist nominated by Govt. of Punjab", role: "Member" },
                  { pos: "Registrar, SBBSU", role: "Member, Secretary" }
                ]}
              />

              <AuthoritySection 
                title="Board of Management" 
                desc="As per clause 16.1 of the Act, the Board of Management consists of:"
                data={[
                  { pos: "The Chancellor or his nominee", role: "Chairperson" },
                  { pos: "The Vice-Chancellor", role: "Member" },
                  { pos: "Two members nominated by the Society", role: "Members" },
                  { pos: "The Director (Education) as State Govt Representative", role: "Member" },
                  { pos: "Three persons not members of the Society", role: "Members" },
                  { pos: "Two teachers nominated by the Society", role: "Members" },
                  { pos: "Two teachers nominated by the Chancellor", role: "Members" },
                  { pos: "Registrar, SBBSU", role: "Member, Secretary" }
                ]}
              />
            </div>
          </div>

          {/* Section 4: Organogram */}
          <div className="space-y-16 overflow-x-auto pb-12">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">Organizational <span className="text-accent">Structure</span></h2>
              <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
            </div>

            <div className="min-w-[1000px] flex flex-col items-center gap-12 py-10">
              <OrganoNode label="The Visitor" color="yellow" isRoot size="normal" />
              <div className="w-1 h-12 bg-white/10"></div>
              <OrganoNode label="The Chancellor" color="blue" size="normal" />
              <div className="w-1 h-12 bg-white/10"></div>
              <OrganoNode label="Vice-Chancellor" color="purple" size="normal" />
              
              <div className="grid grid-cols-4 gap-8 mt-12 w-full max-w-5xl text-center">
                <div className="flex flex-col items-center gap-8">
                  <OrganoNode label="Registrar" color="emerald" size="small" />
                  <div className="w-1 h-8 bg-white/5"></div>
                  <div className="space-y-4">
                    <OrganoNode label="Deputy Registrar" color="slate" size="mini" />
                    <OrganoNode label="Asst. Registrar" color="slate" size="mini" />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-8">
                  <OrganoNode label="Dean Academics" color="indigo" size="small" />
                  <div className="w-1 h-8 bg-white/5"></div>
                  <div className="space-y-4">
                    <OrganoNode label="Faculty Deans" color="slate" size="mini" />
                    <OrganoNode label="Heads of Dept" color="slate" size="mini" />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-8">
                  <OrganoNode label="COE" color="orange" size="small" />
                  <div className="w-1 h-8 bg-white/5"></div>
                  <OrganoNode label="Exam Branch" color="slate" size="mini" />
                </div>
                <div className="flex flex-col items-center gap-8">
                  <OrganoNode label="CF&AO" color="cyan" size="small" />
                  <div className="w-1 h-8 bg-white/5"></div>
                  <OrganoNode label="Finance Branch" color="slate" size="mini" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RTI;
