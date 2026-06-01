import React from 'react';
import { BookOpen, Clock, Users, ArrowRight, ClipboardList, Layers } from 'lucide-react';

const programs = [
  {
    id: 'btech',
    name: 'B.Tech Engineering',
    duration: '4 Years / 8 Semesters',
    specializations: ['CSE', 'UIET', 'ECE', 'Mechanical'],
    icon: '🔧',
    color: 'from-accent to-blue-600',
    description: 'A hands-on engineering program blending theory, lab work, and industry-ready design.',
    semesters: [
      {
        title: 'Semester 1',
        focus: 'Engineering foundations and programming',
        subjects: [
          { name: 'Engineering Mathematics I', teacher: 'Prof. Suman Sharma', syllabus: 'Calculus, matrices, and vector algebra.' },
          { name: 'Engineering Physics', teacher: 'Dr. Meera Reddy', syllabus: 'Mechanics, waves, thermodynamics and optics.' },
          { name: 'Computer Programming', teacher: 'Mr. Ravi Patel', syllabus: 'C programming, algorithms, and problem solving.' }
        ]
      },
      {
        title: 'Semester 2',
        focus: 'Core electronics and mechanics',
        subjects: [
          { name: 'Engineering Mathematics II', teacher: 'Prof. Suman Sharma', syllabus: 'Differential equations and complex analysis.' },
          { name: 'Basic Electrical Engineering', teacher: 'Dr. Kavita Singh', syllabus: 'Circuits, networks and electromagnetic principles.' },
          { name: 'Engineering Graphics', teacher: 'Mr. Arjun Bedi', syllabus: 'Technical drawing, CAD fundamentals and modeling.' }
        ]
      },
      {
        title: 'Semester 3',
        focus: 'Discipline-specific core subjects',
        subjects: [
          { name: 'Data Structures', teacher: 'Ms. Nisha Verma', syllabus: 'Arrays, lists, trees, hashing and complexity analysis.' },
          { name: 'Digital Logic Design', teacher: 'Dr. Amit Kumar', syllabus: 'Boolean algebra, logic gates and sequential circuits.' },
          { name: 'Mechanics of Solids', teacher: 'Prof. Rajesh Gupta', syllabus: 'Stress, strain and deformation of structural elements.' }
        ]
      },
      {
        title: 'Semester 4',
        focus: 'Applied engineering and systems',
        subjects: [
          { name: 'Database Systems', teacher: 'Ms. Priya Malhotra', syllabus: 'ER modeling, SQL, normalization and transactions.' },
          { name: 'Signals and Systems', teacher: 'Dr. Neeraj Joshi', syllabus: 'Fourier transforms, LTI systems and sampling theory.' },
          { name: 'Fluid Mechanics', teacher: 'Prof. Amitabh Sen', syllabus: 'Fluid statics, dynamics, and flow behavior.' }
        ]
      },
      {
        title: 'Semester 5',
        focus: 'Professional elective and lab integration',
        subjects: [
          { name: 'Software Engineering', teacher: 'Ms. Shweta Desai', syllabus: 'SDLC, design patterns, testing and project management.' },
          { name: 'Microprocessor Systems', teacher: 'Dr. Pradeep Nair', syllabus: 'Assembly, interfacing and embedded control.' },
          { name: 'Thermodynamics', teacher: 'Prof. Geeta Arora', syllabus: 'Laws of thermodynamics and energy systems.' }
        ]
      },
      {
        title: 'Semester 6',
        focus: 'Advanced subjects and project work',
        subjects: [
          { name: 'Machine Learning Basics', teacher: 'Mr. Varun Aggarwal', syllabus: 'Supervised learning, regression and classification methods.' },
          { name: 'Communication Networks', teacher: 'Dr. Ritu Saxena', syllabus: 'Network models, protocols and wireless systems.' },
          { name: 'Manufacturing Processes', teacher: 'Prof. Neha Kapoor', syllabus: 'Production technology, quality and lean manufacturing.' }
        ]
      },
      {
        title: 'Semester 7',
        focus: 'Industrial internship and electives',
        subjects: [
          { name: 'Cloud Computing', teacher: 'Ms. Aarti Chawla', syllabus: 'Virtualization, services and distributed platforms.' },
          { name: 'Design of Experiments', teacher: 'Dr. Mohammad Ali', syllabus: 'Statistical design, analysis and optimization.' },
          { name: 'Elective Project', teacher: 'Prof. Rakesh Menon', syllabus: 'Industry-aligned project with mentor support.' }
        ]
      },
      {
        title: 'Semester 8',
        focus: 'Final capstone and research',
        subjects: [
          { name: 'Capstone Project', teacher: 'Prof. Rakesh Menon', syllabus: 'End-to-end product design, testing and deployment.' },
          { name: 'Entrepreneurship', teacher: 'Ms. Poonam Singh', syllabus: 'Business model creation, startup finance and IP fundamentals.' },
          { name: 'Professional Ethics', teacher: 'Dr. Sunita Rao', syllabus: 'Ethical decision making and engineering governance.' }
        ]
      }
    ]
  },
  {
    id: 'mba',
    name: 'MBA - Master of Business',
    duration: '2 Years / 4 Semesters',
    specializations: ['Finance', 'Marketing', 'HR', 'Operations'],
    icon: '📈',
    color: 'from-amber-500 to-orange-600',
    description: 'A leadership and management program focused on business strategy, analytics, and organizational excellence.',
    semesters: [
      {
        title: 'Semester 1',
        focus: 'Core business fundamentals',
        subjects: [
          { name: 'Managerial Economics', teacher: 'Dr. Arvind Kumar', syllabus: 'Micro and macroeconomic analysis for decision making.' },
          { name: 'Financial Accounting', teacher: 'Ms. Neetu Jain', syllabus: 'Statement preparation, ratios and financial analysis.' },
          { name: 'Organizational Behavior', teacher: 'Prof. Rekha Goyal', syllabus: 'Team dynamics, leadership and culture.' }
        ]
      },
      {
        title: 'Semester 2',
        focus: 'Analytics and marketing strategy',
        subjects: [
          { name: 'Marketing Management', teacher: 'Mr. Vishal Mehta', syllabus: 'Market segmentation, branding and digital campaigns.' },
          { name: 'Operations Management', teacher: 'Dr. Meenal Khanna', syllabus: 'Process design, supply chain and quality control.' },
          { name: 'Business Analytics', teacher: 'Ms. Richa Bhardwaj', syllabus: 'Data-driven decision making with Excel and BI tools.' }
        ]
      },
      {
        title: 'Semester 3',
        focus: 'Finance and strategic electives',
        subjects: [
          { name: 'Corporate Finance', teacher: 'Dr. Sanjay Arora', syllabus: 'Valuation, capital budgeting and risk management.' },
          { name: 'Human Resource Strategy', teacher: 'Ms. Priyanka Sood', syllabus: 'Talent planning, performance management and culture.' },
          { name: 'Digital Business Models', teacher: 'Mr. Amit Joshi', syllabus: 'Platform strategy, e-commerce and innovation.' }
        ]
      },
      {
        title: 'Semester 4',
        focus: 'Capstone and live project immersion',
        subjects: [
          { name: 'Strategic Management', teacher: 'Prof. Nilesh Desai', syllabus: 'Long-term planning, corporate governance and competitive advantage.' },
          { name: 'Business Research Project', teacher: 'Dr. Anita Verma', syllabus: 'Research design, analysis and executive report.' },
          { name: 'Leadership Lab', teacher: 'Ms. Sonal Gupta', syllabus: 'Simulation-based leadership and negotiation practice.' }
        ]
      }
    ]
  },
  {
    id: 'ba',
    name: 'BA/B.Sc - Sciences',
    duration: '3 Years / 6 Semesters',
    specializations: ['Science', 'Humanities', 'Commerce'],
    icon: '📚',
    color: 'from-emerald-500 to-teal-600',
    description: 'A flexible arts and science degree with semester-wise depth across core subjects and electives.',
    semesters: [
      {
        title: 'Semester 1',
        focus: 'Foundational liberal arts and quantitative skills',
        subjects: [
          { name: 'English Communication', teacher: 'Ms. Radhika Sharma', syllabus: 'Writing, speaking and comprehension skills.' },
          { name: 'Introduction to Psychology', teacher: 'Dr. Pooja Kulkarni', syllabus: 'Behavior, cognition and social influences.' },
          { name: 'Basic Statistics', teacher: 'Mr. Arjun Singh', syllabus: 'Descriptive statistics and probability basics.' }
        ]
      },
      {
        title: 'Semester 2',
        focus: 'Science methods and critical thinking',
        subjects: [
          { name: 'Environmental Studies', teacher: 'Dr. Anjali Rao', syllabus: 'Ecosystems, sustainability and climate action.' },
          { name: 'Political Theory', teacher: 'Prof. Vivek Joshi', syllabus: 'Governance, rights and political institutions.' },
          { name: 'Applied Mathematics', teacher: 'Ms. Seema Patel', syllabus: 'Functions, matrices and practical modeling.' }
        ]
      },
      {
        title: 'Semester 3',
        focus: 'Depth in core disciplinary knowledge',
        subjects: [
          { name: 'Microeconomics', teacher: 'Dr. Ravi Nair', syllabus: 'Demand, supply and market structures.' },
          { name: 'Research Methods', teacher: 'Ms. Neha Chopra', syllabus: 'Survey design, sampling and analysis.' },
          { name: 'Modern History', teacher: 'Prof. Karan Batra', syllabus: 'Colonialism, independence and post-colonial change.' }
        ]
      },
      {
        title: 'Semester 4',
        focus: 'Interdisciplinary exploration',
        subjects: [
          { name: 'Data Literacy', teacher: 'Mr. Arun Das', syllabus: 'Data interpretation, visualization and ethics.' },
          { name: 'Contemporary Literature', teacher: 'Ms. Mitali Deshmukh', syllabus: 'Modern literary movements and analysis.' },
          { name: 'Business Law', teacher: 'Dr. Ravi Rai', syllabus: 'Legal environment, contracts and compliance.' }
        ]
      },
      {
        title: 'Semester 5',
        focus: 'Specialization electives',
        subjects: [
          { name: 'Science Communication', teacher: 'Ms. Tanvi Patel', syllabus: 'Writing, multimedia and outreach strategies.' },
          { name: 'Cultural Studies', teacher: 'Prof. Meera Jain', syllabus: 'Identity, media and social change.' },
          { name: 'Analytical Techniques', teacher: 'Dr. Sanjay Mehta', syllabus: 'Lab methods, data interpretation and reporting.' }
        ]
      },
      {
        title: 'Semester 6',
        focus: 'Project-based learning and capstone',
        subjects: [
          { name: 'Capstone Project', teacher: 'Prof. Shalini Khurana', syllabus: 'Independent research, presentation and portfolio.' },
          { name: 'Public Policy', teacher: 'Dr. Anupama Sen', syllabus: 'Policy design, implementation and evaluation.' },
          { name: 'Entrepreneurial Thinking', teacher: 'Mr. Nishant Verma', syllabus: 'Ideas to venture, pitching and business planning.' }
        ]
      }
    ]
  },
  {
    id: 'mtech',
    name: 'M.Tech Engineering',
    duration: '2 Years / 4 Semesters',
    specializations: ['Electrical', 'Computer Science', 'Mechanical'],
    icon: '🎓',
    color: 'from-blue-500 to-cyan-600',
    description: 'An advanced engineering masters that combines applied coursework with research projects.',
    semesters: [
      {
        title: 'Semester 1',
        focus: 'Advanced foundations and research methods',
        subjects: [
          { name: 'Advanced Mathematics', teacher: 'Prof. Sandeep Jain', syllabus: 'Matrix analysis, optimization and numerical methods.' },
          { name: 'Research Methodology', teacher: 'Dr. Nidhi Agarwal', syllabus: 'Experimental design, academic writing and ethics.' },
          { name: 'Elective I', teacher: 'Ms. Ananya Roy', syllabus: 'Specialized topic based on chosen discipline.' }
        ]
      },
      {
        title: 'Semester 2',
        focus: 'Specialized engineering depth',
        subjects: [
          { name: 'Advanced Algorithms', teacher: 'Dr. Manish Tiwari', syllabus: 'Complexity, approximation and optimization techniques.' },
          { name: 'Embedded Systems', teacher: 'Mr. Rakesh Chandra', syllabus: 'Real-time constraints and hardware-software integration.' },
          { name: 'Elective II', teacher: 'Prof. Neha Sinha', syllabus: 'Deep dive into a core area of study.' }
        ]
      },
      {
        title: 'Semester 3',
        focus: 'Industrial project and labs',
        subjects: [
          { name: 'Lab Practicum', teacher: 'Ms. Asha Khanna', syllabus: 'Advanced experimentation, diagnostics and reporting.' },
          { name: 'Seminar', teacher: 'Dr. Prakash Roy', syllabus: 'Technical presentation, literature review and peer feedback.' },
          { name: 'Project Proposal', teacher: 'Prof. Sudhir Sharma', syllabus: 'Project planning, milestones and feasibility.' }
        ]
      },
      {
        title: 'Semester 4',
        focus: 'Thesis and industry integration',
        subjects: [
          { name: 'Master Thesis', teacher: 'Dr. Aarti Joshi', syllabus: 'Research execution, analysis and dissertation submission.' },
          { name: 'Industry Internship', teacher: 'Mr. Vijay Nair', syllabus: 'Real-world application and mentorship from partner companies.' },
          { name: 'Professional Elective', teacher: 'Ms. Kritika Bansal', syllabus: 'Emerging technology or management topic.' }
        ]
      }
    ]
  },
  {
    id: 'phd',
    name: 'Ph.D. Programs',
    duration: '3 - 5 Years / Research Focused',
    specializations: ['Engineering', 'Science', 'Humanities'],
    icon: '🔬',
    color: 'from-rose-500 to-pink-600',
    description: 'A research-led doctorate program with structured coursework and dissertation mentoring.',
    semesters: [
      {
        title: 'Year 1',
        focus: 'Coursework and research alignment',
        subjects: [
          { name: 'Research Methodology', teacher: 'Dr. Alok Verma', syllabus: 'Qualitative and quantitative research practices.' },
          { name: 'Domain Seminar', teacher: 'Prof. Deepa Nair', syllabus: 'Scholarship review and critical analysis.' },
          { name: 'Ethics and Publication', teacher: 'Ms. Kavita Menon', syllabus: 'Research ethics, plagiarism and publishing.' }
        ]
      },
      {
        title: 'Year 2',
        focus: 'Proposal development and pilot studies',
        subjects: [
          { name: 'Dissertation Proposal', teacher: 'Dr. Neeraj Sen', syllabus: 'Research design, objectives and methodology.' },
          { name: 'Advanced Seminar', teacher: 'Prof. Lata Das', syllabus: 'Peer review, feedback and interdisciplinary exchange.' },
          { name: 'Research Tools Lab', teacher: 'Mr. Suresh Pandey', syllabus: 'Statistical software and experimental tools.' }
        ]
      },
      {
        title: 'Year 3+',
        focus: 'Thesis completion and defense',
        subjects: [
          { name: 'Thesis Research', teacher: 'Research Supervisor', syllabus: 'Data collection, analysis and dissertation writing.' },
          { name: 'Publication Workshop', teacher: 'Dr. Parminder Kaur', syllabus: 'Journal selection, peer review and impact factors.' },
          { name: 'Viva Preparation', teacher: 'Prof. Madhav Sharma', syllabus: 'Defense strategy, presentation and questioning.' }
        ]
      }
    ]
  }
];

const Courses = () => {
  return (
    <div className="min-h-screen bg-dark text-white pt-24 pb-20">
      <section className="relative py-24 md:py-32 overflow-hidden flex justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-125 h-125 bg-accent/10 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-125 h-125 bg-secondary/10 rounded-full blur-[120px] animate-pulse-slow delay-700"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8">
            <BookOpen className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Academics Overview</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-none">
            All Courses <span className="text-accent">Academic Details</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            Explore every program with semester-wise subjects, teacher assignments, syllabus highlights, and outcome-focused academic pathways.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-12">
        {programs.map((program, idx) => (
          <div key={program.id} className="glass border border-white/10 rounded-4xl p-8 shadow-2xl">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="text-4xl">{program.icon}</div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400 font-bold">{program.duration}</p>
                    <h2 className="text-4xl font-black tracking-tight text-white">{program.name}</h2>
                  </div>
                </div>
                <p className="text-slate-300 max-w-3xl leading-relaxed">{program.description}</p>
              </div>

              <div className="rounded-4xl border border-white/10 bg-black/40 p-6 w-full xl:w-[320px]">
                <div className="flex items-center gap-3 text-slate-200 mb-4">
                  <Layers className="w-5 h-5 text-accent" />
                  <span className="font-black uppercase tracking-[0.25em] text-slate-400">Key features</span>
                </div>
                <ul className="space-y-3 text-slate-300 text-sm">
                  <li>Semester-based progress with hands-on labs.</li>
                  <li>Teacher-led subject mentoring for every class.</li>
                  <li>Dedicated capstone, internship and research milestones.</li>
                </ul>
              </div>
            </div>

            <div className="mt-10 grid gap-4">
              {program.semesters.map((semester) => (
                <div key={semester.title} className="rounded-4xl border border-white/10 bg-white/5 p-6">
                  <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center mb-6">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-accent font-bold">{semester.title}</p>
                      <h3 className="text-2xl font-black text-white">{semester.focus}</h3>
                    </div>
                    <div className="rounded-full bg-accent/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-accent font-black">{program.specializations.join(' · ')}</div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-3">
                    {semester.subjects.map((subject) => (
                      <div key={subject.name} className="rounded-3xl border border-white/10 bg-black/40 p-5">
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <h4 className="text-lg font-black text-white">{subject.name}</h4>
                          <span className="text-xs uppercase tracking-[0.25em] text-slate-400">Teacher</span>
                        </div>
                        <p className="text-slate-300 font-semibold">{subject.teacher}</p>
                        <p className="mt-4 text-slate-400 text-sm leading-relaxed">{subject.syllabus}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="py-16 bg-[#090b12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-4xl border border-white/10 bg-black/30 p-8">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-accent" />
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400 font-bold">Academic support</p>
              </div>
              <p className="text-slate-300">Each course includes faculty-led guidance, structured semester plans, and timely progression reviews.</p>
            </div>
            <div className="rounded-4xl border border-white/10 bg-black/30 p-8">
              <div className="flex items-center gap-3 mb-4">
                <ClipboardList className="w-5 h-5 text-accent" />
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400 font-bold">Detailed syllabus</p>
              </div>
              <p className="text-slate-300">Subject-level curriculum details and instructor assignments help students plan each semester clearly.</p>
            </div>
            <div className="rounded-4xl border border-white/10 bg-black/30 p-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-accent" />
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400 font-bold">Teacher assignments</p>
              </div>
              <p className="text-slate-300">Profiles of assigned teachers are linked to every course subject to keep academic ownership transparent.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
