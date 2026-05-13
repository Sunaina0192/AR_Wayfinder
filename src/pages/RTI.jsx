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

  const objectives = [
    "To provide for instruction, teaching, education, research and training at all levels in all disciplines of higher education including professional, medical, technical, general education and in any other stream and subject, as per the needs of the industry and the society in general, as may be deemed necessary by the University through all the modes of education as may emerge or become relevant in future;",
    "To promote the academic aspirations of the rural students;",
    "To undertake industry oriented teaching, training and research extension programmes and to provide employable skills with a view to contribute to the development of the society;",
    "To provide for research, creation, advancement and dissemination of knowledge, wisdom and understanding;",
    "To encourage and motivate leading industrial houses for setting up at the campuses their respective corporate institutes for academia industry nexus;",
    "To disseminate knowledge so as to make it accessible to all strata of the society;",
    "To promote the Punjabi studies to provide for research in Punjabi Language and Literature and to undertake measures for the development of Punjabi Language, Literature and Culture; and",
    "To do all such things as may be necessary or desirable to further the objects of the University."
  ];

  const universityOfficers = [
    "The Visitor",
    "The Chancellor",
    "The Vice-Chancellor",
    "The Registrar",
    "The Deans of the Faculties",
    "The Chief Finance and Accounts Officer; and",
    "Such other officers of the University, as may be declared by the statutes, to be the officers of the University."
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full pt-24 pb-20 flex-grow flex flex-col items-center justify-center relative z-10 animate-[fade-in_0.8s_ease-out]">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 relative z-10 flex flex-col items-center text-center space-y-48">
        {/* Header Section */}
        <div className="text-center animate-[fade-in_0.8s_ease-out] flex flex-col items-center pt-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-8">
            <ShieldCheck className="w-4 h-4" />
            Statutory Disclosure
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-8 uppercase">
            RIGHT TO <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-accent">INFORMATION</span>
          </h1>
          <div className="w-32 h-2 bg-accent rounded-full mb-8"></div>
          <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-xs">Self-Disclosure under Section 4(1)(b) of RTI Act 2005</p>
        </div>

        {/* Section 1: Information Officers */}
        <div className="w-full space-y-12 animate-[fade-in-up_1s_ease-out] flex flex-col items-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-[2rem] bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
              <Users className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">1. Information Officers</h2>
          </div>

          <div className="w-full max-w-5xl overflow-hidden rounded-[3rem] border border-slate-800 bg-slate-900/40 backdrop-blur-xl shadow-2xl">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-slate-800/60 text-blue-300 uppercase text-[10px] tracking-[0.2em] font-black text-center">
                  <th className="px-10 py-8 border-b border-slate-800 w-24">S.No.</th>
                  <th className="px-10 py-8 border-b border-slate-800">Designation</th>
                  <th className="px-10 py-8 border-b border-slate-800">Position</th>
                  <th className="px-10 py-8 border-b border-slate-800">Email & Contact</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {officers.map((off, idx) => (
                  <tr key={idx} className="group hover:bg-blue-500/5 transition-all duration-300">
                    <td className="px-10 py-8 border-b border-slate-800 text-center font-bold text-slate-600 group-hover:text-blue-400 transition-colors">
                      {off.no}
                    </td>
                    <td className="px-10 py-8 border-b border-slate-800 text-center">
                      <div className="font-black text-white text-base uppercase tracking-wider">{off.designation}</div>
                    </td>
                    <td className="px-10 py-8 border-b border-slate-800 text-center font-bold text-slate-400 group-hover:text-slate-300 transition-colors">
                      {off.position}
                    </td>
                    <td className="px-10 py-8 border-b border-slate-800 text-center space-y-2">
                      <div className="flex items-center justify-center gap-2 text-blue-400 font-mono text-xs">
                        <Mail className="w-4 h-4" />
                        {off.contact}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-slate-500 font-mono text-xs">
                        <Phone className="w-4 h-4" />
                        {off.phone}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-full max-w-5xl p-10 rounded-[2.5rem] bg-slate-900/60 border border-slate-800 leading-relaxed text-slate-400 font-medium text-sm italic shadow-xl">
            Sant Baba Bhag Singh University, Village Khiala, Post Office - Padhiana, District Jalandhar, Punjab - 144030 has been established vide The Sant Baba Bhag Singh University Act, 2014 (Punjab Govt Act No. 6 of 2015), and recognized by the Government of India under the provisions of Section 2(f) of the University Grants Commission (UGC) Act, 1956. Sant Baba Bhag Singh University is accredited by the NAAC with Grade - B+ (with a score of 2.64).
            <div className="mt-6 flex items-center justify-center gap-3 text-accent non-italic font-black text-xs uppercase tracking-[0.2em] pt-6 border-t border-slate-800/50">
              <Globe className="w-5 h-5" />
              Official Portal: sbbsuniversity.ac.in
            </div>
          </div>
        </div>

        {/* Section 2: Objectives */}
        <div className="w-full space-y-16 animate-[fade-in_up_1.2s_ease-out] flex flex-col items-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-[2rem] bg-accent/10 flex items-center justify-center border border-accent/20 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
              <Target className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">2. Objectives of the University</h2>
          </div>

          <div className="space-y-10 max-w-5xl border-l-2 border-slate-800/50 pl-12 text-left py-4">
            {objectives.map((obj, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute -left-[61px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-950 border-4 border-slate-800 group-hover:border-accent group-hover:scale-125 transition-all duration-500 shadow-2xl"></div>
                <div className="flex gap-6 p-6 rounded-[2rem] hover:bg-white/5 transition-all duration-500 border border-transparent hover:border-white/5">
                  <span className="text-accent font-black text-xl italic opacity-50 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                  <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-200 transition-colors text-lg">
                    {obj}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Officers */}
        <div className="w-full space-y-16 animate-[fade-in-up_1.4s_ease-out] flex flex-col items-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-[2rem] bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.1)]">
              <Gavel className="w-8 h-8 text-indigo-400" />
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">3. Officers of the University</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {universityOfficers.map((officer, idx) => (
              <div key={idx} className="flex items-center justify-center gap-5 p-8 rounded-[2rem] bg-slate-900/40 border border-slate-800 hover:border-indigo-500/30 transition-all duration-500 group shadow-lg hover:shadow-indigo-500/5">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-indigo-400 font-black text-sm group-hover:bg-indigo-500 group-hover:text-slate-950 transition-all shrink-0 shadow-inner">
                  {idx + 1}
                </div>
                <span className="font-black text-slate-300 group-hover:text-white uppercase tracking-widest text-xs transition-colors">
                  {officer}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Authorities */}
        <div className="w-full space-y-24 animate-[fade-in-up_1.6s_ease-out] flex flex-col items-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-[2rem] bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shadow-[0_0_30px_rgba(249,115,22,0.1)]">
              <Landmark className="w-8 h-8 text-orange-400" />
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">4. Authorities of the University</h2>
          </div>

          <div className="w-full max-w-6xl space-y-32">
            <AuthoritySection 
              title="Governing Body" 
              desc="As per clause 15.1 of the Act, the Governing Body consists of:"
              data={[
                { pos: "The Chancellor", role: "Chairman" },
                { pos: "The Vice-Chancellor", role: "Member" },
                { pos: "Three persons nominated by the society, including two eminent educationists", role: "Members" },
                { pos: "One expert of management or information technology", role: "Member" },
                { pos: "One finance expert nominated by the Chancellor", role: "Member" },
                { pos: "Secretary Govt. of Punjab (Higher Education) or representative", role: "Member" },
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
                { pos: "Three persons not members of the Society nominated by the Society", role: "Members" },
                { pos: "Two teachers nominated by the Society", role: "Members" },
                { pos: "Two teachers nominated by the Chancellor", role: "Members" },
                { pos: "Registrar, SBBSU", role: "Member, Secretary" }
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl pt-12">
            {/* Academic Council */}
            <div className="p-10 rounded-[3rem] bg-slate-900/40 border border-slate-800 backdrop-blur-xl space-y-8 text-center flex flex-col items-center shadow-2xl hover:border-orange-500/20 transition-all duration-500">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight border-b border-slate-800 pb-6 w-full">Academic Council</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Institutional Policy Engine</p>
              <ul className="space-y-6 text-left w-full">
                <li className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all">
                  <div className="w-2 h-2 rounded-full bg-orange-400 mt-2.5 shadow-[0_0_10px_rgba(251,146,60,0.5)]"></div>
                  <span className="text-slate-300 text-base font-medium">The Vice-Chancellor <br/><span className="text-orange-400 font-black text-xs uppercase tracking-widest mt-1 block">Chairperson</span></span>
                </li>
                <li className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all">
                  <div className="w-2 h-2 rounded-full bg-slate-700 mt-2.5"></div>
                  <span className="text-slate-300 text-base font-medium">One eminent academician nominated by State Government <br/><span className="text-slate-500 font-black text-xs uppercase tracking-widest mt-1 block">Member</span></span>
                </li>
                <li className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all">
                  <div className="w-2 h-2 rounded-full bg-slate-700 mt-2.5"></div>
                  <span className="text-slate-300 text-base font-medium">Such other members, as may be prescribed <br/><span className="text-slate-500 font-black text-xs uppercase tracking-widest mt-1 block">Members</span></span>
                </li>
              </ul>
            </div>

            {/* Finance Committee */}
            <div className="p-10 rounded-[3rem] bg-slate-900/40 border border-slate-800 backdrop-blur-xl space-y-8 text-center flex flex-col items-center shadow-2xl hover:border-orange-500/20 transition-all duration-500">
              <div className="flex items-center justify-between border-b border-slate-800 pb-6 w-full">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Finance Committee</h3>
                <span className="px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-black uppercase tracking-widest border border-orange-500/20">Audit Hub</span>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Fiscal Oversight Node</p>
              <ul className="space-y-4 text-left w-full">
                {[
                  { pos: "The Vice-Chancellor", role: "Chairperson" },
                  { pos: "The Dean, Academic Affairs", role: "Member" },
                  { pos: "The Registrar of the University", role: "Member" },
                  { pos: "Two persons nominated by the Society", role: "Members" },
                  { pos: "The Chief Finance and Accounts Officer", role: "Secretary" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start justify-between gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group">
                    <div className="flex gap-4">
                      <div className={`w-2 h-2 rounded-full mt-2.5 transition-colors ${item.role === 'Chairperson' ? 'bg-orange-500 shadow-[0_0_10px_rgba(251,146,60,0.5)]' : 'bg-slate-700 group-hover:bg-orange-400'}`}></div>
                      <span className="text-slate-300 text-base font-medium">{item.pos}</span>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest mt-1.5 ${item.role === 'Chairperson' ? 'text-orange-400' : 'text-slate-500 group-hover:text-slate-300'}`}>{item.role}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-slate-800/50 w-full">
                <p className="text-[10px] text-slate-500 italic font-medium">Note: Members nominated by the Society shall hold office for a period of two years.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Organizational Structure */}
        <div className="w-full space-y-24 animate-[fade-in_up_1.8s_ease-out] flex flex-col items-center">
          <div className="flex flex-col items-center gap-4 justify-center">
            <div className="w-16 h-16 rounded-[2rem] bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
              <LayoutGrid className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="space-y-1 text-center">
              <h2 className="text-4xl font-black text-white uppercase tracking-tight">5. Organizational Structure</h2>
              <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">Full Institutional Organogram</p>
            </div>
          </div>

          <div className="w-full max-w-7xl relative p-16 rounded-[4rem] bg-slate-900/40 border border-slate-800 backdrop-blur-xl overflow-hidden min-h-[900px] flex flex-col items-center shadow-3xl">
             {/* Dynamic Background */}
             <div className="absolute inset-0 bg-radial-at-t from-cyan-500/5 to-transparent pointer-events-none"></div>
             
             {/* Organogram Tree */}
             <div className="relative z-10 w-full space-y-20 flex flex-col items-center">
                {/* Level 1 */}
                <div className="flex justify-center">
                  <OrganoNode label="Chancellor" color="blue" isRoot />
                </div>

                {/* Vertical Line */}
                <div className="w-0.5 h-12 bg-slate-800 mx-auto"></div>

                {/* Level 2 */}
                <div className="flex justify-center">
                  <OrganoNode label="Vice Chancellor" color="yellow" />
                </div>

                {/* Level 3 Connectors */}
                <div className="relative h-12">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-slate-800"></div>
                   <div className="absolute bottom-0 left-[10%] right-[10%] h-0.5 bg-slate-800"></div>
                </div>

                {/* Level 3: Directors & Deans */}
                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
                  {[
                    { l: "Deans", c: "purple" },
                    { l: "Dean Academics", c: "emerald" },
                    { l: "Director R&D", c: "green" },
                    { l: "Director IQAC", c: "indigo" },
                    { l: "Director Sports", c: "cyan" },
                    { l: "Director DSW", c: "orange" },
                    { l: "Director T&P", c: "teal" },
                    { l: "COE", c: "pink" },
                    { l: "Registrar", c: "amber" }
                  ].map((node, i) => (
                    <div key={i} className="flex flex-col items-center space-y-4">
                      <div className="w-0.5 h-4 bg-slate-800"></div>
                      <OrganoNode label={node.l} color={node.c} size="small" />
                    </div>
                  ))}
                </div>

                {/* Level 4: Operational Units */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-10">
                   {/* Faculty Stream */}
                   <div className="space-y-6 flex flex-col items-center">
                      <div className="w-0.5 h-6 bg-slate-800"></div>
                      <OrganoNode label="HOD / COD" color="slate" size="mini" />
                      <div className="w-0.5 h-4 bg-slate-800"></div>
                      <OrganoNode label="Dept Incharges" color="slate" size="mini" />
                      <div className="w-0.5 h-4 bg-slate-800"></div>
                      <OrganoNode label="Faculty / Staff" color="slate" size="mini" />
                   </div>

                   {/* Admin Stream */}
                   <div className="space-y-6 flex flex-col items-center">
                      <div className="w-0.5 h-6 bg-slate-800"></div>
                      <OrganoNode label="Dy. Director DSW" color="slate" size="mini" />
                      <div className="w-0.5 h-4 bg-slate-800"></div>
                      <OrganoNode label="Asst. Director DSW" color="slate" size="mini" />
                   </div>

                   {/* Registry Stream */}
                   <div className="space-y-6 flex flex-col items-center">
                      <div className="w-0.5 h-6 bg-slate-800"></div>
                      <div className="grid grid-cols-2 gap-4">
                        <OrganoNode label="CFO" color="slate" size="mini" />
                        <OrganoNode label="Admissions" color="slate" size="mini" />
                        <OrganoNode label="Manager Facilities" color="slate" size="mini" />
                        <OrganoNode label="Asst. Registrar" color="slate" size="mini" />
                        <OrganoNode label="Chief Warden" color="slate" size="mini" />
                        <OrganoNode label="Warden" color="slate" size="mini" />
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center p-10 border-t border-slate-800">
           <button className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-accent hover:border-accent/30 transition-all">
              <Landmark className="w-4 h-4" />
              Institutional Transparency Node
              <ChevronRight className="w-4 h-4" />
           </button>
        </div>
      </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
};

const AuthoritySection = ({ title, desc, data }) => (
  <div className="space-y-6 w-full flex flex-col items-center">
    <div className="flex flex-col space-y-1 items-center">
      <h3 className="text-xl font-black text-white uppercase tracking-tight">{title}</h3>
      <p className="text-slate-500 text-xs font-medium italic">{desc}</p>
    </div>
    <div className="w-full overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/40 backdrop-blur-xl">
      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="bg-slate-800/40 text-orange-300 uppercase text-[9px] tracking-[0.2em] font-black">
            <th className="px-8 py-5 border-b border-slate-800 w-16">S.No.</th>
            <th className="px-8 py-5 border-b border-slate-800">Position / Description</th>
            <th className="px-8 py-5 border-b border-slate-800">Role</th>
          </tr>
        </thead>
        <tbody className="text-slate-400">
          {data.map((row, idx) => (
            <tr key={idx} className="group hover:bg-orange-500/5 transition-colors">
              <td className="px-8 py-4 border-b border-slate-800/50 font-bold text-slate-600 group-hover:text-orange-400 transition-colors">
                {idx + 1}
              </td>
              <td className="px-8 py-4 border-b border-slate-800/50 font-bold text-slate-300 group-hover:text-white transition-colors">
                {row.pos}
              </td>
              <td className="px-8 py-4 border-b border-slate-800/50 font-black text-xs uppercase tracking-widest text-slate-500 group-hover:text-orange-300 transition-colors">
                {row.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RTI;

