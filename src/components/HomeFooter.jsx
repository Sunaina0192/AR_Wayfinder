import React from 'react';

const HomeFooter = () => {
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
      {/* Map Section */}
      <div className="w-full h-[400px]">
        <iframe
          src="https://maps.google.com/maps?q=Sant%20Baba%20Bhag%20Singh%20University,%20Khiala,%20Jalandhar,%20Punjab&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Sant Baba Bhag Singh University Map"
        ></iframe>
      </div>

      {/* Footer Content */}
      <div className="bg-[#05133e] text-white pt-12 md:pt-24 pb-12 md:pb-24 px-4 sm:px-6 md:px-12 flex justify-center">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 text-center md:text-left">
          
          {/* Important Links */}
          <div>
            <h3 className="text-[22px] font-bold mb-6 text-white tracking-wide">Important Links</h3>
            <ul className="flex flex-col">
              {importantLinks.map((link, idx) => (
                <li key={idx} className="border-b border-dashed border-[#1a2d64] py-3.5 last:border-0 leading-snug">
                  <a href="#" className="text-[13px] text-slate-300 hover:text-cyan-400 transition-colors duration-300 inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[22px] font-bold mb-6 text-white tracking-wide">Quick Links</h3>
            <ul className="flex flex-col">
              {quickLinks.map((link, idx) => (
                <li key={idx} className="border-b border-dashed border-[#1a2d64] py-3.5 last:border-0 leading-snug">
                  <a href="#" className="text-[13px] text-slate-300 hover:text-cyan-400 transition-colors duration-300 inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-[22px] font-bold mb-6 text-white tracking-wide">Contact Details</h3>
            
            <div className="space-y-0 text-[13px] leading-snug text-slate-300">
              <p className="border-b border-dashed border-[#1a2d64] pb-4 pt-1">
                Sant Baba Bhag Singh University, Village Khiala,P.O<br />
                Padhiana, Distt. Jalandhar-144030
              </p>

              <div className="flex gap-2 py-4 border-b border-dashed border-[#1a2d64]">
                <a href="#" className="w-[30px] h-[30px] rounded-[3px] bg-white flex items-center justify-center hover:bg-cyan-400 transition-all text-[#05133e] font-bold text-lg leading-none pt-0.5">
                  f
                </a>
                <a href="#" className="w-[30px] h-[30px] rounded-[3px] bg-white flex items-center justify-center hover:bg-cyan-400 transition-all text-[#05133e] font-bold text-lg leading-none">
                  𝕏
                </a>
                <a href="#" className="w-[30px] h-[30px] rounded-[3px] bg-white flex items-center justify-center hover:bg-cyan-400 transition-all text-[#05133e] font-bold text-[16px] leading-none">
                  🌐
                </a>
                <a href="#" className="w-[30px] h-[30px] rounded-[3px] bg-white flex items-center justify-center hover:bg-cyan-400 transition-all text-[#05133e] font-bold text-lg leading-none pt-0.5">
                  P
                </a>
              </div>

              <div className="flex flex-col">
                <p className="border-b border-dashed border-[#1a2d64] py-4">info@sbbsuniversity.ac.in</p>
                <p className="border-b border-dashed border-[#1a2d64] py-4">University Reception : +91 181-2711163</p>
                <p className="border-b border-dashed border-[#1a2d64] py-4">Admission Cell : +91 181-2711622,+91 8146620135-39</p>
                <p className="border-b border-dashed border-[#1a2d64] py-4">Placement Office : +91 181-2711655, +91 98768-<br />43382</p>
                <p className="border-b border-dashed border-[#1a2d64] py-4">Registrar Office : +91 181-2711162</p>
                <p className="border-b border-dashed border-[#1a2d64] py-4">Anti Ragging Committee:Dr. Amarjeet Singh (+91<br />7888734770)</p>
                <p className="py-4">National Ragging Prevention Programme</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="bg-[#030b24] py-4 text-center text-xs text-slate-500 border-t border-[#0d1f54]">
        <p>All Rights Reserved © 2026 Sant Baba Bhag Singh University</p>
      </div>
    </div>
  );
};

export default HomeFooter;
