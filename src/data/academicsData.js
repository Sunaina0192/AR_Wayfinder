export const institutesData = [
  {
    id: "uiet",
    name: "University Institute of Engineering & Technology",
    departments: [
      {
        id: "cse",
        name: "Department of Computer Science & Engineering",
        courses: [
          {
            id: "btech-cse",
            name: "B.Tech Computer Science & Engineering",
            semesters: [
              {
                id: "sem-1",
                name: "Semester 1",
                subjects: [
                  { id: "sub-1", name: "Engineering Mathematics-I", code: "MAT101", credits: 4, syllabus: "Unit 1: Matrices\nUnit 2: Differential Calculus\nUnit 3: Integral Calculus\nUnit 4: Vector Calculus." },
                  { id: "sub-2", name: "Engineering Physics", code: "PHY101", credits: 4, syllabus: "Unit 1: Optics\nUnit 2: Quantum Mechanics\nUnit 3: Solid State Physics\nUnit 4: Electromagnetism." },
                  { id: "sub-3", name: "Programming for Problem Solving", code: "CSE101", credits: 3, syllabus: "Unit 1: Introduction to Programming\nUnit 2: Algorithms\nUnit 3: Functions and Arrays\nUnit 4: Pointers and Structures." },
                  { id: "sub-4", name: "Physics Lab", code: "PHY103", credits: 1, syllabus: "Experiments based on Optics, Electricity, and Modern Physics." },
                  { id: "sub-5", name: "Programming Lab", code: "CSE103", credits: 1.5, syllabus: "C programming practice: basics, loops, arrays, pointers, file handling." }
                ]
              },
              {
                id: "sem-2",
                name: "Semester 2",
                subjects: [
                  { id: "sub-6", name: "Engineering Mathematics-II", code: "MAT102", credits: 4, syllabus: "Unit 1: Differential Equations\nUnit 2: Complex Variables\nUnit 3: Laplace Transforms." },
                  { id: "sub-7", name: "Basic Electrical Engineering", code: "EE101", credits: 4, syllabus: "DC Circuits, AC Circuits, Transformers, Electrical Machines." },
                  { id: "sub-8", name: "Engineering Graphics & Design", code: "ME101", credits: 3, syllabus: "Projections, Solid Geometry, CAD Basics." }
                ]
              },
              { id: "sem-3", name: "Semester 3", subjects: [{ id: "sub-9", name: "Data Structures & Algorithms", code: "CSE201", credits: 4, syllabus: "Arrays, Linked Lists, Trees, Graphs, Sorting, Searching." }] },
              { id: "sem-4", name: "Semester 4", subjects: [{ id: "sub-10", name: "Operating Systems", code: "CSE202", credits: 4, syllabus: "Process Management, Memory Management, File Systems." }] },
              { id: "sem-5", name: "Semester 5", subjects: [{ id: "sub-11", name: "Database Management Systems", code: "CSE301", credits: 4, syllabus: "ER Model, Relational Algebra, SQL, Normalization, Transactions." }] },
              { id: "sem-6", name: "Semester 6", subjects: [{ id: "sub-12", name: "Computer Networks", code: "CSE302", credits: 4, syllabus: "OSI Model, TCP/IP, Routing, Wireless Networks." }] },
              { id: "sem-7", name: "Semester 7", subjects: [{ id: "sub-13", name: "Cloud Computing", code: "CSE401", credits: 3, syllabus: "Virtualization, IaaS, PaaS, SaaS, AWS/Azure Basics." }] },
              { id: "sem-8", name: "Semester 8", subjects: [{ id: "sub-14", name: "Major Project", code: "CSE402", credits: 6, syllabus: "End-to-end software development life cycle implementation." }] }
            ]
          },
          {
            id: "mtech-cse",
            name: "M.Tech Computer Science & Engineering",
            semesters: [
              { id: "sem-1", name: "Semester 1", subjects: [{ id: "sub-m1", name: "Advanced Data Structures", code: "MCS101", credits: 4, syllabus: "Advanced Trees, Graphs, Hashing, Amortized Analysis." }] },
              { id: "sem-2", name: "Semester 2", subjects: [{ id: "sub-m2", name: "Machine Learning", code: "MCS102", credits: 4, syllabus: "Supervised Learning, Unsupervised Learning, Neural Networks." }] },
              { id: "sem-3", name: "Semester 3", subjects: [{ id: "sub-m3", name: "Dissertation Part I", code: "MCS201", credits: 6, syllabus: "Literature Review and Problem Formulation." }] },
              { id: "sem-4", name: "Semester 4", subjects: [{ id: "sub-m4", name: "Dissertation Part II", code: "MCS202", credits: 10, syllabus: "Research Implementation and Thesis Defense." }] }
            ]
          }
        ]
      },
      {
        id: "ee",
        name: "Department of Electrical Engineering",
        courses: [{ id: "btech-ee", name: "B.Tech Electrical Engineering", semesters: [{ id: "sem-1", name: "Semester 1", subjects: [{ id: "ee-sub", name: "Basic Electrical", code: "EE101", credits: 4, syllabus: "Ohm's Law, KCL, KVL, AC Fundamentals." }] }] }]
      },
      {
        id: "me",
        name: "Department of Mechanical Engineering",
        courses: [{ id: "btech-me", name: "B.Tech Mechanical Engineering", semesters: [{ id: "sem-1", name: "Semester 1", subjects: [{ id: "me-sub", name: "Engineering Graphics", code: "ME101", credits: 4, syllabus: "Projections, AutoCAD basics." }] }] }]
      },
      {
        id: "ce",
        name: "Department of Civil Engineering",
        courses: [{ id: "btech-ce", name: "B.Tech Civil Engineering", semesters: [{ id: "sem-1", name: "Semester 1", subjects: [{ id: "ce-sub", name: "Mechanics of Solids", code: "CE101", credits: 4, syllabus: "Stress, Strain, Bending Moment." }] }] }]
      }
    ]
  },
  {
    id: "uicm",
    name: "University Institute of Commerce & Management",
    departments: [
      {
        id: "commerce",
        name: "Department of Commerce",
        courses: [
          {
            id: "bcom",
            name: "B.Com (Hons.)",
            semesters: [
              { id: "sem-1", name: "Semester 1", subjects: [{ id: "com-sub", name: "Financial Accounting", code: "COM101", credits: 4, syllabus: "Journal, Ledger, Trial Balance, Final Accounts." }] }
            ]
          }
        ]
      },
      {
        id: "management",
        name: "Department of Management & Hotel Management",
        courses: [
          {
            id: "mba",
            name: "Master of Business Administration (MBA)",
            semesters: [
              { id: "sem-1", name: "Semester 1", subjects: [{ id: "mba-sub", name: "Principles of Management", code: "MBA101", credits: 4, syllabus: "Planning, Organizing, Staffing, Directing, Controlling." }] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "uih",
    name: "University Institute of Humanities",
    departments: [
      {
        id: "humanities",
        name: "Department of Humanities & Fashion Designing",
        courses: [
          { id: "ba-eng", name: "B.A. English (Hons.)", semesters: [{ id: "sem-1", name: "Semester 1", subjects: [{ id: "eng-sub", name: "British Literature", code: "ENG101", credits: 4, syllabus: "Chaucer to Shakespeare." }] }] }
        ]
      }
    ]
  },
  {
    id: "agri",
    name: "Faculty of Agriculture",
    departments: [
      {
        id: "agriculture",
        name: "Department of Agriculture",
        courses: [
          { id: "bsc-agri", name: "B.Sc (Hons.) Agriculture", semesters: [{ id: "sem-1", name: "Semester 1", subjects: [{ id: "agr-sub", name: "Fundamentals of Agronomy", code: "AGR101", credits: 3, syllabus: "Crop seasons, tillage, seeds, sowing." }] }] }
        ]
      }
    ]
  },
  {
    id: "uis",
    name: "University Institute of Sciences",
    departments: [
      { id: "life-sci", name: "Department of Life Sciences", courses: [{ id: "bsc-life", name: "B.Sc Life Sciences", semesters: [{ id: "sem-1", name: "Semester 1", subjects: [{ id: "ls-sub", name: "Cell Biology", code: "BIO101", credits: 4, syllabus: "Cell structure, organelles, division." }] }] }] },
      { id: "phy-sci", name: "Department of Physical Sciences", courses: [{ id: "bsc-phy", name: "B.Sc Physical Sciences", semesters: [{ id: "sem-1", name: "Semester 1", subjects: [{ id: "ps-sub", name: "Mechanics", code: "PHY101", credits: 4, syllabus: "Newton's laws, work, energy." }] }] }] }
    ]
  },
  {
    id: "uiahs",
    name: "University Institute of Allied Health Sciences",
    departments: [
      { id: "allied-health", name: "Department of Allied Health Sciences", courses: [{ id: "bsc-mlt", name: "B.Sc Medical Lab Technology", semesters: [{ id: "sem-1", name: "Semester 1", subjects: [{ id: "mlt-sub", name: "Human Anatomy", code: "MLT101", credits: 4, syllabus: "Bones, tissues, organ systems." }] }] }] },
      { id: "physio", name: "Department of Physiotherapy", courses: [{ id: "bpt", name: "Bachelor of Physiotherapy (BPT)", semesters: [{ id: "sem-1", name: "Semester 1", subjects: [{ id: "bpt-sub", name: "Biomechanics", code: "BPT101", credits: 4, syllabus: "Joint movements, muscle mechanics." }] }] }] }
    ]
  },
  {
    id: "uicais",
    name: "University Institute of Computer Applications & Information Sciences",
    departments: [
      { id: "bca", name: "Department of Computer Science & Applications", courses: [{ id: "bca-course", name: "Bachelor of Computer Applications (BCA)", semesters: [{ id: "sem-1", name: "Semester 1", subjects: [{ id: "bca-sub", name: "Programming in C", code: "BCA101", credits: 4, syllabus: "Basics of C programming." }] }] }] }
    ]
  },
  {
    id: "uil",
    name: "University Institute of Law",
    departments: [
      { id: "law", name: "Department of Law", courses: [{ id: "llb", name: "LL.B", semesters: [{ id: "sem-1", name: "Semester 1", subjects: [{ id: "law-sub", name: "Constitutional Law", code: "LAW101", credits: 4, syllabus: "Preamble, Fundamental Rights." }] }] }] }
    ]
  },
  {
    id: "uie",
    name: "University Institute of Education",
    departments: [
      { id: "phy-edu", name: "Department of Physical Education", courses: [{ id: "bped", name: "B.P.Ed", semesters: [{ id: "sem-1", name: "Semester 1", subjects: [{ id: "pe-sub", name: "History of Physical Education", code: "PED101", credits: 4, syllabus: "Ancient and modern Olympics." }] }] }] },
      { id: "edu", name: "Department of Education", courses: [{ id: "bed", name: "B.Ed", semesters: [{ id: "sem-1", name: "Semester 1", subjects: [{ id: "bed-sub", name: "Childhood and Growing Up", code: "EDU101", credits: 4, syllabus: "Psychological development of children." }] }] }] }
    ]
  }
];
