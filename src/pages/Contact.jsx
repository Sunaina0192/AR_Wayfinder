import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Globe, MessageSquare, Clock, ArrowRight, Search } from 'lucide-react';

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
    <div className="mt-32 space-y-10 animate-[fade-in-up_1.5s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-indigo-500 rounded-full"></div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">Telephone Directory</h2>
          </div>
          <p className="text-slate-500 font-medium ml-4 uppercase tracking-widest text-xs">Direct Signal Lines to University Nodes</p>
        </div>

        <div className="relative group max-w-sm w-full">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-slate-500 group-focus-within:text-accent transition-colors" />
          </div>
          <input 
            type="text"
            placeholder="Search designation, name or number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl pl-14 pr-6 py-4 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all text-white font-medium"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-[3rem] border border-slate-800 bg-slate-900/40 backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/60 text-indigo-300 uppercase text-[10px] tracking-[0.2em] font-black">
              <th className="px-8 py-6 border-b border-slate-800 w-20 text-center">S.No.</th>
              <th className="px-8 py-6 border-b border-slate-800">Designation</th>
              <th className="px-8 py-6 border-b border-slate-800">Officer Name</th>
              <th className="px-8 py-6 border-b border-slate-800 text-right">Contact Number</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {filtered.length > 0 ? filtered.map((c, idx) => (
              <tr key={idx} className="group hover:bg-indigo-500/5 transition-all duration-300">
                <td className="px-8 py-5 border-b border-slate-800 text-center font-bold text-slate-600 group-hover:text-indigo-400 transition-colors">
                  {idx + 1}
                </td>
                <td className="px-8 py-5 border-b border-slate-800">
                  <div className="font-black text-white text-xs uppercase tracking-wider group-hover:text-indigo-200 transition-colors">{c.des}</div>
                </td>
                <td className="px-8 py-5 border-b border-slate-800 font-bold text-slate-400 group-hover:text-white transition-colors">
                  {c.name}
                </td>
                <td className="px-8 py-5 border-b border-slate-800 text-right">
                  <span className="inline-flex items-center gap-2 bg-slate-950/50 px-4 py-2 rounded-xl border border-slate-800 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 transition-all font-mono text-sm text-indigo-300">
                    <Phone className="w-3.5 h-3.5 opacity-50" />
                    {c.phone}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="px-8 py-20 text-center text-slate-500 font-bold italic">
                  No direct signal line found matching your query...
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
    // Simulate API call
    setTimeout(() => {
      alert('Your message has been transmitted successfully to our command center!');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full pt-24 pb-20 flex-grow flex flex-col items-center justify-center relative z-10 animate-[fade-in_0.8s_ease-out]">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-24 relative z-10 flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-20 animate-[fade-in_0.8s_ease-out]">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white">
            GET IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">TOUCH</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Have questions about SBBSU? Our team is ready to assist you. 
            Connect with the future of education today.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6 animate-[fade-in-left_1s_ease-out]">
            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 hover:border-accent/50 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-white font-bold mb-1">Call Us</h3>
                <p className="text-slate-400 text-sm font-medium">+91 181-2711163</p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 hover:border-blue-500/50 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-bold mb-1">Email Us</h3>
                <p className="text-slate-400 text-sm font-medium break-all">info@sbbsuniversity.ac.in</p>
              </div>
            </div>

            {/* Address Card */}
            <div className="p-8 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl"></div>
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-7 h-7 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Campus Location</h3>
                  <p className="text-slate-400 leading-relaxed font-medium">
                    Sant Baba Bhag Singh University<br/>
                    Village Khiala, Padhiana,<br/>
                    Distt. Jalandhar, Punjab - 144030
                  </p>
                </div>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="p-8 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 group">
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Clock className="w-7 h-7 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Working Hours</h3>
                  <div className="space-y-1">
                    <p className="text-slate-400 font-medium flex justify-between gap-8">
                      <span>Mon - Sat:</span>
                      <span className="text-white">9:00 AM - 5:00 PM</span>
                    </p>
                    <p className="text-slate-400 font-medium flex justify-between gap-8">
                      <span>Sunday:</span>
                      <span className="text-emerald-400">Closed</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Connect */}
            <div className="flex justify-between items-center p-6 rounded-3xl bg-slate-900/20 border border-slate-800/50">
              <span className="text-sm font-black text-slate-500 uppercase tracking-widest">Follow Command Center</span>
              <div className="flex gap-3">
                {[
                  { icon: Globe, color: "hover:bg-blue-600" },
                  { icon: MessageSquare, color: "hover:bg-sky-400" },
                  { icon: Mail, color: "hover:bg-pink-600" },
                  { icon: Phone, color: "hover:bg-blue-700" }
                ].map((social, i) => (

                  <a key={i} href="#" className={`w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center transition-all duration-300 ${social.color} hover:text-white group`}>
                    <social.icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Message Form */}
          <div className="lg:col-span-7 animate-[fade-in-right_1s_ease-out]">
            <div className="p-8 md:p-12 rounded-[3rem] bg-slate-900/40 backdrop-blur-2xl border border-slate-800/80 shadow-2xl relative">
              <div className="absolute top-0 right-12 w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
              
              <div className="flex items-center gap-4 mb-10">
                <div className="w-2 h-10 bg-accent rounded-full"></div>
                <h2 className="text-3xl font-black text-white">SEND A MESSAGE</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Your Name</label>
                    <div className="relative group">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all text-white font-medium"
                        placeholder="Enter full name"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Signal Address</label>
                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all text-white font-medium"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Objective</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all text-white font-medium"
                    placeholder="Brief subject"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Message Data</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all text-white font-medium resize-none"
                    placeholder="Describe your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group relative overflow-hidden bg-accent hover:bg-accent/90 text-slate-950 font-black py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(34,211,238,0.3)] hover:shadow-[0_15px_40px_rgba(34,211,238,0.4)] disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-4 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span className="uppercase tracking-[0.2em]">Transmit Signal</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
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

      {/* Global CSS for custom animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  </div>
  );
};

export default Contact;
