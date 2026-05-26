import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Globe, MessageSquare, Clock, ArrowRight, Search, Landmark, ChevronRight } from 'lucide-react';

const TelephoneDirectory = () => {
  const [search, setSearch] = useState('');
  
  const contacts = [
    { des: "Chancellor Office", name: "Sant Manmohan Singh Ji", phone: "0181-2711166" },
    { des: "Vice Chancellor Office", name: "Prof. (Dr.) Vijay Dhir", phone: "0181-2711167" },
    { des: "Dean Academics", name: "Prof. (Dr.) Vijay Dhir", phone: "82840-55442" },
    { des: "Controller of Examination", name: "Mr. Roop Singh", phone: "0181-2711613" },
    { des: "Registrar Office", name: "Mr. Rajinder Kumar", phone: "0181-2711535" },
    { des: "Chief Accounts & Finance Officer (CAFO)", name: "D.V. Pathak", phone: "0181-2711699" },
    { des: "Director, R&D", name: "Dr. Nisha Sharma", phone: "89688-11812" },
    { des: "Dean, UIL", name: "Dr. Pooja Bali", phone: "8580719332" },
    { des: "Dean, UIET", name: "Dr. Jagdeep Kaur", phone: "9501030920" },
    { des: "Dean, UIH", name: "Dr. Mandeep Singh", phone: "9417412445" },
    { des: "Dean, UICA & UICM", name: "Dr. Vijay Dhir", phone: "8558939400" },
    { des: "Dean, UIS", name: "Dr. Shweta Singh", phone: "7696210956" },
    { des: "Training & Placement Officer", name: "Dr. Jagteshwar Singh", phone: "0181-2711653" },
    { des: "Assistant Placement Officer", name: "Mr. Harminder Singh", phone: "98768-43382" },
    { des: "Admission Controller", name: "Mr. Karamjeet Singh", phone: "81466-20137" },
    { des: "Deputy Registrar", name: "Mr. Roop Singh", phone: "81466-53898" },
    { des: "Manager (Facilities)", name: "Capt. Sukhdev Singh", phone: "81466-53899" },
    { des: "Manager (Facilities)", name: "Capt. Sukhdev Singh", phone: "0181-2711161" },
    { des: "Girls Hostel Chief Warden", name: "Dr. Gurmanik Kaur", phone: "9878172836" },
    { des: "Boys Hostel Chief Warden", name: "Mr. Jujhar Singh", phone: "9023755954" },
    { des: "Girls Hostel Warden", name: "Ms. Mandeep Kaur", phone: "9876243382" },
    { des: "Boys Hostel Warden", name: "Mr. Pawan Kumar", phone: "9816572569" },
    { des: "Technical, Main Office", name: "Mr. Kamaljit Kaur", phone: "0181-2711162" },
    { des: "Receptionist", name: "Ms. Kuldip Kaur", phone: "89687-34072, 0181-2711163" },
    { des: "Purchase Supervisor", name: "Mr. Major Singh", phone: "81466-20311" },
    { des: "Main Gate", name: "Security Guard", phone: "81466-20310" }
  ];

  const filtered = contacts.filter(c => 
    c.des.toLowerCase().includes(search.toLowerCase()) || 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Telephone <span className="text-accent">Directory</span></h2>
          <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Direct lines to institutional nodes</p>
        </div>

        <div className="relative group w-full max-w-md">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-slate-500 group-focus-within:text-accent transition-colors" />
          </div>
          <input 
            type="text"
            placeholder="Search by name, office or number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full glass border-white/5 rounded-2xl pl-16 pr-6 py-5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-accent/50 transition-all shadow-2xl"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-[3rem] glass border-white/5 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-accent uppercase text-[10px] tracking-[0.3em] font-black">
                <th className="px-10 py-8 border-b border-white/5">Designation</th>
                <th className="px-10 py-8 border-b border-white/5">Officer Name</th>
                <th className="px-10 py-8 border-b border-white/5 text-right">Contact Line</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {filtered.length > 0 ? filtered.map((c, idx) => (
                <tr key={idx} className="group hover:bg-white/5 transition-all">
                  <td className="px-10 py-6 border-b border-white/5 font-black text-white uppercase tracking-wider text-xs">
                    {c.des}
                  </td>
                  <td className="px-10 py-6 border-b border-white/5 font-bold text-slate-500 group-hover:text-white transition-colors">
                    {c.name}
                  </td>
                  <td className="px-10 py-6 border-b border-white/5 text-right">
                    <span className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-accent font-mono text-sm group-hover:bg-accent group-hover:text-dark transition-all">
                      <Phone className="w-3.5 h-3.5" />
                      {c.phone}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="3" className="px-10 py-20 text-center text-slate-600 font-black uppercase tracking-widest italic">
                    No matching signal line found...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Your message has been transmitted successfully to our command center!');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

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
            <MessageSquare className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Global Liaison</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
            Get in <span className="text-accent">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Connect with the future of education. Our dedicated team is ready to assist you with any inquiries regarding SBBSU.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 -mt-20 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-8 rounded-[2.5rem] glass border-white/5 hover:border-accent/30 transition-all duration-500 group">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-dark transition-all">
                    <Phone className="w-6 h-6 text-accent group-hover:text-dark" />
                  </div>
                  <h3 className="text-white font-black uppercase tracking-tight text-lg mb-1">Call Us</h3>
                  <p className="text-slate-500 text-xs font-medium">+91 181-2711163</p>
                </div>

                <div className="p-8 rounded-[2.5rem] glass border-white/5 hover:border-blue-500/30 transition-all duration-500 group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Mail className="w-6 h-6 text-blue-400 group-hover:text-white" />
                  </div>
                  <h3 className="text-white font-black uppercase tracking-tight text-lg mb-1">Email Us</h3>
                  <p className="text-slate-500 text-[10px] font-medium break-all">info@sbbsuniversity.ac.in</p>
                </div>
              </div>

              <div className="p-10 rounded-[3rem] glass border-white/5 relative overflow-hidden group">
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl transition-all duration-700 group-hover:bg-accent/10"></div>
                <div className="flex gap-8 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3">Campus Location</h3>
                    <p className="text-slate-400 leading-relaxed font-medium">
                      Sant Baba Bhag Singh University<br/>
                      Village Khiala, Padhiana,<br/>
                      Distt. Jalandhar, Punjab - 144030
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-10 rounded-[3rem] glass border-white/5 group">
                <div className="flex gap-8 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-dark transition-all">
                    <Clock className="w-7 h-7 text-slate-500 group-hover:text-dark" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">Working Hours</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Mon - Sat</span>
                        <span className="text-white font-black">9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Sunday</span>
                        <span className="text-accent font-black uppercase tracking-widest text-[10px]">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Message Form */}
            <div className="lg:col-span-7">
              <div className="p-8 md:p-16 rounded-[4rem] glass border-white/5 shadow-2xl relative">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-2 h-10 bg-accent rounded-full"></div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight">Send a Message</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full glass border-white/5 rounded-2xl px-8 py-5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-accent/50 transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Signal Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full glass border-white/5 rounded-2xl px-8 py-5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-accent/50 transition-all"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Objective</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full glass border-white/5 rounded-2xl px-8 py-5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-accent/50 transition-all"
                      placeholder="Brief subject"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Message Data</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full glass border-white/5 rounded-2xl px-8 py-5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-accent/50 transition-all resize-none"
                      placeholder="Describe your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 rounded-[2rem] bg-accent text-dark font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:scale-[1.02] transition-all shadow-2xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 group"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-4 border-dark/30 border-t-dark rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Transmit Signal
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Telephone Directory Section */}
          <TelephoneDirectory />
        </div>
      </section>
    </div>
  );
};

export default Contact;
