import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const HomeFooter = () => {
  const navigate = useNavigate();
  const importantLinks = [
    "Counselling Appointment Request",
    "Statutory Declaration under Section 4 (1) (b) of the RTI Act 2005",
    "National Academic Depository",
    "SBBSU National Academic Depository Cell",
    "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013",
    "University Grant Commission (Prevention, Prohibition and Redressal of Sexual Harassment of Women Employees and Students in Higher Education Institutions) Regulations, 2015",
    "Internal Complaint Committee",
    "UGC guidelines regarding gender champion as implemented at SBBS University",
    "Nirmal Samparday Ate Dera Santpura Jabarh Da Itihaas",
    "Free Vaccination for 18 Years and Above Age Group ( F.No.1-1/2021 (Secy.) 20th June, 2021 Subject Action taken with respect to display of hoarding)",
    "Agromet Observatory",
    "Public Notice: Certificate Verification & Fraud Prevention",
    "Members for IIC SBBS University",
    <span className="font-bold underline decoration-1 underline-offset-4">Kisan Sahayak Website</span>,
    <span className="font-bold underline decoration-1 underline-offset-4">Smart Shiksha Website</span>
  ];

  const quickLinks = [
    "University Grants Commission(UGC)",
    "UGC E-Recources Portal",
    "Academic Bank of Credits(ABC)",
    "Bar Council of India(BCI)",
    "NCTE",
    "SWAYAM",
    "Skill Test",
    "COVID-19 Helpline and Instructions",
    "Register Complaint",
    "Student Grievance Redressal Cell",
    "Women Grievance Redressal Cell",
    "Student Grievance Redressal Cell Portal",
    "UGC e-Samadhan Link for Student Grievance",
    "Socio-Economically Disadvantaged Groups Cell (SEDG)",
    "E-Content",
    "SBBSU IMS",
    "Policy Equal Opportunity Cell",
    "Policy SMHMC",
    "Mentorship Guidelines Handbook",
    "Octopod ERP Access (Login, Academic Fee, Transport Fee & Hostel Fee) - Batch 2025 onwards"
  ];

  return (
    <div className="w-full relative z-30">
      {/* Map Section - Enhanced with Overlay */}
      <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative group overflow-hidden">
        <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors duration-700 pointer-events-none z-10"></div>
        <iframe
          src="https://maps.google.com/maps?q=Sant%20Baba%20Bhag%20Singh%20University,%20Khiala,%20Jalandhar,%20Punjab&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Sant Baba Bhag Singh University Map"
          className="grayscale opacity-80 contrast-125 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
        ></iframe>
        
        {/* Map Float Overlay */}
        <div 
          onClick={() => navigate('/explore-campus')}
          className="absolute bottom-8 left-8 p-6 glass rounded-3xl max-w-sm hidden md:block z-20 animate-float cursor-pointer hover:bg-white/10 hover:scale-105 transition-all shadow-2xl"
        >
          <h4 className="text-accent text-lg font-black mb-2 tracking-widest uppercase flex items-center gap-2">
            Our Campus 
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </h4>
          <p className="text-white text-sm font-medium leading-relaxed">
            Visit our state-of-the-art campus in Jalandhar. Modern facilities integrated with spiritual wisdom.
          </p>
        </div>
      </div>

      {/* Main Footer Section */}
      <footer className="bg-dark text-slate-300 pt-20 md:pt-32 pb-12 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-accent/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] right-[-5%] w-[20%] h-[40%] bg-secondary/5 blur-[100px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            
            {/* Branding Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex flex-col">
                  <span className="text-white font-black text-3xl tracking-tighter">SBBSU</span>
                  <span className="text-xs text-accent font-bold tracking-[0.3em] uppercase">University</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-8 text-slate-400 font-medium">
                Established vide Punjab Govt. Act No. 6 of 2015. A premier institution dedicated to academic excellence and holistic development.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-blue-500 hover:text-white hover:-translate-y-1 transition-all duration-300 text-slate-400">
                  <span className="sr-only">Facebook</span>
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-pink-500 hover:text-white hover:-translate-y-1 transition-all duration-300 text-slate-400">
                  <span className="sr-only">Instagram</span>
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-red-500 hover:text-white hover:-translate-y-1 transition-all duration-300 text-slate-400">
                  <span className="sr-only">YouTube</span>
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-sky-500 hover:text-white hover:-translate-y-1 transition-all duration-300 text-slate-400">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-black text-white mb-8 tracking-widest uppercase border-l-4 border-accent pl-4">Important</h3>
              <ul className="space-y-4">
                {importantLinks.slice(0, 8).map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-xs font-bold text-slate-400 hover:text-accent transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-accent/30 group-hover:bg-accent transition-colors"></span>
                      {typeof link === 'string' ? link : link.props.children}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-1">
              <h3 className="text-lg font-black text-white mb-8 tracking-widest uppercase border-l-4 border-accent pl-4">Quick Links</h3>
              <ul className="space-y-4">
                {quickLinks.slice(0, 8).map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-xs font-bold text-slate-400 hover:text-accent transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-accent/30 group-hover:bg-accent transition-colors"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-black text-white mb-8 tracking-widest uppercase border-l-4 border-accent pl-4">Contact</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-accent">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <p className="text-xs font-medium leading-relaxed">
                    Village Khiala, P.O Padhiana, Distt. Jalandhar-144030, Punjab
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-accent">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </div>
                  <p className="text-xs font-medium">info@sbbsuniversity.ac.in</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-accent">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </div>
                  <div className="text-xs font-medium space-y-1">
                    <p>+91 181-2711163</p>
                    <p>+91 81466-20135</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500 font-bold tracking-widest uppercase">
              © 2026 Sant Baba Bhag Singh University
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-xs text-slate-500 hover:text-accent font-bold uppercase tracking-widest transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-slate-500 hover:text-accent font-bold uppercase tracking-widest transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeFooter;
