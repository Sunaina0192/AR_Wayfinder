import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { BookOpen, CheckSquare, Award, UploadCloud, DownloadCloud, FileText, ChevronDown, Check, X, Users } from 'lucide-react';

const TeacherAcademics = () => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('attendance');
  const [loading, setLoading] = useState(false);

  // Common Academic Data
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // Attendance State
  const [attCourse, setAttCourse] = useState('');
  const [attSemester, setAttSemester] = useState('');
  const [attSubject, setAttSubject] = useState('');
  const [attDate, setAttDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState({});

  // Study Material State
  const [materials, setMaterials] = useState([]);
  const [matForm, setMatForm] = useState({ title: '', description: '', subject: '', course: '', semester: '', link: '', type: 'Notes' });

  // Results State
  const [resCourse, setResCourse] = useState('');
  const [resSemester, setResSemester] = useState('');
  const [resStudentId, setResStudentId] = useState('');
  const [resStudentName, setResStudentName] = useState('');
  const [resSgpa, setResSgpa] = useState('');
  const [resStatus, setResStatus] = useState('Pass');
  const [resSubjects, setResSubjects] = useState([{ name: '', credits: 3, grade: 'A' }]);

  if (!user || user.role !== 'Teacher') return <Navigate to="/" replace />;

  useEffect(() => {
    fetchDropdowns();
    if (activeTab === 'materials') fetchMaterials();
  }, [activeTab]);

  const fetchDropdowns = async () => {
    try {
      // Fetch common courses and subjects to populate dropdowns
      const [curRes, subRes] = await Promise.all([
        axios.get('/api/academic/courses'),
        axios.get('/api/academic/subjects')
      ]);
      setCourses(curRes.data);
      // Filter subjects to only those assigned to the teacher if possible, but for now show all to let them pick
      // Actually, let's filter subjects based on what's assigned to them if user.subjects is populated
      const assignedSubjects = user.subjects || [];
      const filteredSubjects = assignedSubjects.length > 0 
        ? subRes.data.filter(s => assignedSubjects.includes(s.name))
        : subRes.data;
      setSubjects(filteredSubjects);
    } catch (err) {
      console.error('Failed to fetch dropdowns', err);
    }
  };

  // ============================
  // ATTENDANCE LOGIC
  // ============================
  const fetchStudentsForAttendance = async () => {
    if (!attCourse || !attSemester) return alert('Select course and semester first');
    setLoading(true);
    try {
      const res = await axios.get(`/api/teacher/students?course=${attCourse}&semester=${attSemester}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(res.data);
      // Initialize all to Present
      const initialAtt = {};
      res.data.forEach(s => initialAtt[s.studentId] = 'Present');
      setAttendanceRecords(initialAtt);
    } catch (err) {
      alert('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceRecords(prev => ({ ...prev, [studentId]: status }));
  };

  const submitAttendance = async () => {
    if (!attSubject) return alert('Select a subject');
    if (students.length === 0) return alert('Fetch students first');
    setLoading(true);
    
    const records = students.map(s => ({
      studentId: s.studentId,
      studentName: s.fullName,
      status: attendanceRecords[s.studentId]
    }));

    try {
      await axios.post('/api/teacher/attendance', {
        course: attCourse, semester: attSemester, subject: attSubject, date: attDate, records
      }, { headers: { Authorization: `Bearer ${token}` } });
      alert('Attendance marked successfully! ✅');
      setStudents([]); // Reset
    } catch (err) {
      alert('Failed to submit attendance');
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // MATERIAL LOGIC
  // ============================
  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/teacher/materials', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMaterials(res.data);
    } catch (err) {
      console.error('Failed to fetch materials', err);
    } finally {
      setLoading(false);
    }
  };

  const submitMaterial = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/teacher/materials', matForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Material uploaded! 📚');
      setMatForm({ title: '', description: '', subject: '', course: '', semester: '', link: '', type: 'Notes' });
      fetchMaterials();
    } catch (err) {
      alert('Failed to upload material');
    }
  };

  const deleteMaterial = async (id) => {
    if(!window.confirm('Delete this material?')) return;
    try {
      await axios.delete(`/api/teacher/materials/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMaterials();
    } catch (err) {
      alert('Failed to delete material');
    }
  };

  // ============================
  // RESULTS LOGIC
  // ============================
  const handleAddResultSubject = () => {
    setResSubjects([...resSubjects, { name: '', credits: 3, grade: 'A' }]);
  };

  const submitResult = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/teacher/results', {
        studentId: resStudentId, studentName: resStudentName, course: resCourse, semester: resSemester,
        sgpa: resSgpa, status: resStatus, subjects: resSubjects
      }, { headers: { Authorization: `Bearer ${token}` } });
      alert('Result uploaded successfully! 🏆');
      setResStudentId(''); setResStudentName(''); setResSgpa(''); setResSubjects([{ name: '', credits: 3, grade: 'A' }]);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to upload result');
    }
  };


  return (
    <div className="min-h-screen bg-dark text-white pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight flex items-center gap-3">
              <BookOpen className="w-10 h-10 text-accent" />
              Academic Operations
            </h1>
            <p className="text-slate-400 mt-1">Manage attendance, results, and study materials for your classes.</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 bg-white/5 p-2 rounded-2xl border border-white/10 w-fit">
          <button onClick={() => setActiveTab('attendance')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'attendance' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <CheckSquare className="w-5 h-5" /> Attendance
          </button>
          <button onClick={() => setActiveTab('materials')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'materials' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <UploadCloud className="w-5 h-5" /> Study Materials
          </button>
          <button onClick={() => setActiveTab('results')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'results' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <Award className="w-5 h-5" /> Results
          </button>
        </div>

        {/* ============================== */}
        {/* ATTENDANCE TAB */}
        {/* ============================== */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-black uppercase tracking-widest text-white mb-6">Select Class</h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Course</label>
                  <select value={attCourse} onChange={(e)=>setAttCourse(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent appearance-none">
                    <option value="">Select Course</option>
                    {courses.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Semester</label>
                  <select value={attSemester} onChange={(e)=>setAttSemester(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent appearance-none">
                    <option value="">Select Sem</option>
                    {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s.toString()}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Subject</label>
                  <select value={attSubject} onChange={(e)=>setAttSubject(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent appearance-none">
                    <option value="">Select Subject</option>
                    {subjects.map(s => <option key={s._id} value={s.name}>{s.name}</option>)}
                  </select>
                </div>
                <button onClick={fetchStudentsForAttendance} disabled={loading} className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Users className="w-5 h-5" /> Fetch Students
                </button>
              </div>
            </div>

            {students.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-black uppercase tracking-widest text-white">Mark Attendance</h2>
                  <input type="date" value={attDate} onChange={(e)=>setAttDate(e.target.value)} className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-accent" />
                </div>
                
                <div className="space-y-3 mb-8">
                  {students.map(student => (
                    <div key={student.studentId} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-black/30 border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
                      <div className="mb-3 sm:mb-0">
                        <p className="font-bold text-white text-lg">{student.fullName}</p>
                        <p className="text-sm text-slate-400 font-mono">{student.studentId} | Roll: {student.rollNumber}</p>
                      </div>
                      <div className="flex gap-2">
                        {['Present', 'Absent', 'Leave'].map(status => {
                          const isSelected = attendanceRecords[student.studentId] === status;
                          const colorMap = { Present: 'green', Absent: 'red', Leave: 'amber' };
                          const color = colorMap[status];
                          return (
                            <button
                              key={status}
                              onClick={() => handleAttendanceChange(student.studentId, status)}
                              className={`px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2
                                ${isSelected 
                                  ? `bg-${color}-500/20 text-${color}-400 border border-${color}-500/50` 
                                  : 'bg-white/5 text-slate-400 border border-transparent hover:bg-white/10'}`}
                            >
                              {isSelected && <Check className="w-4 h-4" />} {status}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={submitAttendance} disabled={loading} className="w-full bg-accent hover:bg-accent-light text-white font-black py-4 rounded-2xl text-lg uppercase tracking-widest transition-all shadow-lg shadow-accent/20">
                  {loading ? 'Submitting...' : 'Submit Final Attendance'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============================== */}
        {/* MATERIALS TAB */}
        {/* ============================== */}
        {activeTab === 'materials' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sticky top-24">
                <h2 className="text-xl font-black uppercase tracking-widest text-white mb-6">Upload Material</h2>
                <form onSubmit={submitMaterial} className="space-y-4">
                  <input type="text" placeholder="Title" value={matForm.title} onChange={e=>setMatForm({...matForm, title: e.target.value})} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent" />
                  <textarea placeholder="Description" value={matForm.description} onChange={e=>setMatForm({...matForm, description: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent resize-none h-24" />
                  <input type="url" placeholder="Resource Link (Drive, PDF url...)" value={matForm.link} onChange={e=>setMatForm({...matForm, link: e.target.value})} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent" />
                  
                  <div className="grid grid-cols-2 gap-2">
                    <select value={matForm.course} onChange={e=>setMatForm({...matForm, course: e.target.value})} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent appearance-none">
                      <option value="">Course</option>
                      {courses.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                    </select>
                    <select value={matForm.semester} onChange={e=>setMatForm({...matForm, semester: e.target.value})} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent appearance-none">
                      <option value="">Sem</option>
                      {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s.toString()}>{s}</option>)}
                    </select>
                  </div>
                  <select value={matForm.subject} onChange={e=>setMatForm({...matForm, subject: e.target.value})} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent appearance-none">
                    <option value="">Subject</option>
                    {subjects.map(s => <option key={s._id} value={s.name}>{s.name}</option>)}
                  </select>
                  <select value={matForm.type} onChange={e=>setMatForm({...matForm, type: e.target.value})} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent appearance-none">
                    <option value="Notes">Notes</option>
                    <option value="Assignment">Assignment</option>
                    <option value="Syllabus">Syllabus</option>
                  </select>
                  <button type="submit" className="w-full bg-accent hover:bg-accent-light text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-accent/20 mt-4">
                    Share Material
                  </button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-4">
              {loading && <p className="text-slate-400">Loading your uploads...</p>}
              {!loading && materials.length === 0 && (
                <div className="p-8 text-center bg-white/5 border border-white/10 rounded-3xl text-slate-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>You haven't shared any materials yet.</p>
                </div>
              )}
              {materials.map(mat => (
                <div key={mat._id} className="bg-black/30 border border-white/10 rounded-3xl p-6 hover:border-accent/30 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{mat.title}</h3>
                        <p className="text-sm text-slate-400">{mat.course} • Sem {mat.semester} • {mat.subject}</p>
                      </div>
                    </div>
                    <button onClick={() => deleteMaterial(mat._id)} className="p-2 text-slate-500 hover:text-red-400 bg-white/5 rounded-xl transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  {mat.description && <p className="text-slate-300 mb-4">{mat.description}</p>}
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-lg">{mat.type}</span>
                    <a href={mat.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
                      <DownloadCloud className="w-4 h-4" /> Access Link
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================== */}
        {/* RESULTS TAB */}
        {/* ============================== */}
        {activeTab === 'results' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
              <h2 className="text-xl font-black uppercase tracking-widest text-white mb-6">Upload Semester Result</h2>
              <form onSubmit={submitResult} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Student ID *</label>
                    <input type="text" placeholder="e.g. STU123" value={resStudentId} onChange={e=>setResStudentId(e.target.value)} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Student Name *</label>
                    <input type="text" placeholder="e.g. John Doe" value={resStudentName} onChange={e=>setResStudentName(e.target.value)} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Course *</label>
                    <select value={resCourse} onChange={(e)=>setResCourse(e.target.value)} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent appearance-none">
                      <option value="">Select Course</option>
                      {courses.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Semester *</label>
                    <select value={resSemester} onChange={(e)=>setResSemester(e.target.value)} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent appearance-none">
                      <option value="">Select Sem</option>
                      {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s.toString()}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Final SGPA *</label>
                    <input type="number" step="0.01" min="0" max="10" placeholder="e.g. 8.5" value={resSgpa} onChange={e=>setResSgpa(e.target.value)} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Status *</label>
                    <select value={resStatus} onChange={(e)=>setResStatus(e.target.value)} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent appearance-none">
                      <option value="Pass">Pass</option>
                      <option value="Fail">Fail</option>
                      <option value="Promoted">Promoted</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Subject Grades</label>
                    <button type="button" onClick={handleAddResultSubject} className="text-accent text-sm font-bold hover:text-white transition-colors">+ Add Subject</button>
                  </div>
                  
                  <div className="space-y-3">
                    {resSubjects.map((sub, idx) => (
                      <div key={idx} className="flex gap-2 items-center bg-black/30 p-2 rounded-xl">
                        <select 
                          value={sub.name} 
                          onChange={e => {
                            const newSubs = [...resSubjects];
                            newSubs[idx].name = e.target.value;
                            setResSubjects(newSubs);
                          }}
                          required 
                          className="flex-1 bg-transparent text-white focus:outline-none text-sm p-2"
                        >
                          <option value="" className="bg-dark text-slate-400">Select Subject</option>
                          {subjects.map(s => <option key={s._id} value={s.name} className="bg-dark text-white">{s.name}</option>)}
                        </select>
                        <input 
                          type="number" 
                          placeholder="Credits" 
                          value={sub.credits} 
                          onChange={e => {
                            const newSubs = [...resSubjects];
                            newSubs[idx].credits = e.target.value;
                            setResSubjects(newSubs);
                          }}
                          required 
                          className="w-20 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-accent text-sm text-center" 
                        />
                        <select 
                          value={sub.grade} 
                          onChange={e => {
                            const newSubs = [...resSubjects];
                            newSubs[idx].grade = e.target.value;
                            setResSubjects(newSubs);
                          }}
                          required 
                          className="w-20 bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-white focus:border-accent text-sm text-center appearance-none"
                        >
                          {['O','A+','A','B+','B','C','F'].map(g => <option key={g} value={g} className="bg-dark">{g}</option>)}
                        </select>
                        <button type="button" onClick={() => setResSubjects(resSubjects.filter((_, i) => i !== idx))} className="p-2 text-slate-500 hover:text-red-400">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button type="submit" className="w-full bg-accent hover:bg-accent-light text-white font-black py-4 rounded-2xl text-lg uppercase tracking-widest transition-all shadow-lg shadow-accent/20">
                  Upload Result
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TeacherAcademics;
