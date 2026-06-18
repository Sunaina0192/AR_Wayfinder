import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import { 
  LayoutDashboard, BookOpen, UploadCloud, CheckSquare, 
  Award, Megaphone, Users, Calendar, User, DownloadCloud, 
  Trash2, Check, X, Search, Lock, BookMarked, Activity, FileText, LogOut
} from 'lucide-react';

const TeacherDashboard = () => {
  const { user, token, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');
  const [loading, setLoading] = useState(false);

  // Data States
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // Attendance State
  const [attCourse, setAttCourse] = useState('');
  const [attSemester, setAttSemester] = useState('');
  const [attSubject, setAttSubject] = useState('');
  const [attDate, setAttDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState({});

  // Material State
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
    if (activeTab === 'Upload Resources' || activeTab === 'Overview') fetchMaterials();
  }, [activeTab]);

  const fetchDropdowns = async () => {
    try {
      const [curRes, subRes] = await Promise.all([
        axios.get('/api/academic/courses'),
        axios.get('/api/academic/subjects')
      ]);
      setCourses(curRes.data);
      const assignedSubjects = user.subjects || [];
      const filteredSubjects = assignedSubjects.length > 0 
        ? subRes.data.filter(s => assignedSubjects.includes(s.name))
        : subRes.data;
      setSubjects(filteredSubjects);
    } catch (err) { console.error(err); }
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
      const initialAtt = {};
      res.data.forEach(s => initialAtt[s.studentId] = 'Present');
      setAttendanceRecords(initialAtt);
    } catch (err) { alert('Failed to fetch students'); } finally { setLoading(false); }
  };

  const submitAttendance = async () => {
    if (!attSubject || students.length === 0) return alert('Fill all details');
    setLoading(true);
    const records = students.map(s => ({
      studentId: s.studentId, studentName: s.fullName, status: attendanceRecords[s.studentId]
    }));
    try {
      await axios.post('/api/teacher/attendance', {
        course: attCourse, semester: attSemester, subject: attSubject, date: attDate, records
      }, { headers: { Authorization: `Bearer ${token}` } });
      alert('Attendance marked successfully! ✅');
      setStudents([]);
    } catch (err) { alert('Failed to submit attendance'); } finally { setLoading(false); }
  };

  // ============================
  // MATERIAL LOGIC
  // ============================
  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/teacher/materials', { headers: { Authorization: `Bearer ${token}` } });
      setMaterials(res.data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const submitMaterial = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/teacher/materials', matForm, { headers: { Authorization: `Bearer ${token}` } });
      alert('Material uploaded! 📚');
      setMatForm({ title: '', description: '', subject: '', course: '', semester: '', link: '', type: 'Notes' });
      fetchMaterials();
    } catch (err) { alert('Failed to upload material'); }
  };

  const deleteMaterial = async (id) => {
    if(!window.confirm('Delete this material?')) return;
    try {
      await axios.delete(`/api/teacher/materials/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchMaterials();
    } catch (err) { alert('Failed to delete'); }
  };

  // ============================
  // RESULTS LOGIC
  // ============================
  const submitResult = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/teacher/results', {
        studentId: resStudentId, studentName: resStudentName, course: resCourse, semester: resSemester,
        sgpa: resSgpa, status: resStatus, subjects: resSubjects
      }, { headers: { Authorization: `Bearer ${token}` } });
      alert('Result uploaded successfully! 🏆');
      setResStudentId(''); setResStudentName(''); setResSgpa(''); setResSubjects([{ name: '', credits: 3, grade: 'A' }]);
    } catch (err) { alert(err.response?.data?.message || 'Failed to upload result'); }
  };

  const menuItems = [
    { id: 'Overview', icon: LayoutDashboard },
    { id: 'Manage Subjects', icon: BookOpen },
    { id: 'Upload Resources', icon: UploadCloud },
    { id: 'Attendance Management', icon: CheckSquare },
    { id: 'Marks Management', icon: Award },
    { id: 'Announcements', icon: Megaphone },
    { id: 'Student Management', icon: Users },
    { id: 'Schedule', icon: Calendar },
    { id: 'Profile', icon: User },
  ];

  // =====================================
  // TAB RENDERERS
  // =====================================

  const renderOverview = () => (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-tight">Faculty Portal</h1>
        <p className="text-slate-400 mt-1">Welcome back, {user.name} • {user.department || 'Department of Computer Science'}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4"><BookOpen className="w-6 h-6" /></div>
          <p className="text-4xl font-black text-white">{subjects.length || 4}</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Assigned Subjects</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all">
          <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center mb-4"><Users className="w-6 h-6" /></div>
          <p className="text-4xl font-black text-white">120+</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Total Students</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4"><CheckSquare className="w-6 h-6" /></div>
          <p className="text-4xl font-black text-white">2</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Pending Attendance</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4"><Megaphone className="w-6 h-6" /></div>
          <p className="text-4xl font-black text-white">1</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Active Notices</p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
        <h2 className="text-xl font-black uppercase tracking-widest text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button onClick={()=>setActiveTab('Attendance Management')} className="flex items-center gap-4 bg-black/30 border border-white/5 p-4 rounded-2xl hover:border-accent/50 transition-colors text-left group">
            <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform"><CheckSquare className="w-5 h-5" /></div>
            <div><p className="font-bold text-white">Mark Attendance</p><p className="text-xs text-slate-400">Record daily presence</p></div>
          </button>
          <button onClick={()=>setActiveTab('Marks Management')} className="flex items-center gap-4 bg-black/30 border border-white/5 p-4 rounded-2xl hover:border-accent/50 transition-colors text-left group">
            <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform"><Award className="w-5 h-5" /></div>
            <div><p className="font-bold text-white">Upload Results</p><p className="text-xs text-slate-400">Add semester marks</p></div>
          </button>
          <button onClick={()=>setActiveTab('Upload Resources')} className="flex items-center gap-4 bg-black/30 border border-white/5 p-4 rounded-2xl hover:border-accent/50 transition-colors text-left group">
            <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform"><UploadCloud className="w-5 h-5" /></div>
            <div><p className="font-bold text-white">Share Material</p><p className="text-xs text-slate-400">Upload notes & PPTs</p></div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderManageSubjects = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-black text-white uppercase tracking-tight">Manage Subjects</h2>
      
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest text-sm">Assigned Subjects</h3>
        {subjects.length === 0 ? (
          <p className="text-slate-400">No subjects currently assigned.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.map(s => (
              <div key={s._id} className="bg-black/30 border border-white/5 p-4 rounded-2xl flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-white text-lg">{s.name}</h4>
                  <p className="text-xs text-slate-400 mt-1">{s.course} • Sem {s.semester}</p>
                </div>
                <div className="text-accent bg-accent/10 p-2 rounded-lg">
                  <BookMarked className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderUploadResources = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-black text-white uppercase tracking-tight">Upload Resources</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest text-sm">New Material</h3>
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
                <option value="PPTs">PPTs</option>
                <option value="Lab Manuals">Lab Manuals</option>
                <option value="Assignment">Assignment</option>
                <option value="Syllabus">Syllabus</option>
              </select>
              <button type="submit" className="w-full bg-accent hover:bg-accent-light text-white font-bold py-3 rounded-xl transition-all mt-4">
                Upload Material
              </button>
            </form>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-white uppercase tracking-widest text-sm mb-4">Your Uploads</h3>
          {loading ? <p className="text-slate-400">Loading uploads...</p> : materials.length === 0 ? (
            <div className="p-8 text-center bg-white/5 border border-white/10 rounded-3xl text-slate-500">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>You haven't uploaded anything yet.</p>
            </div>
          ) : (
            materials.map(mat => (
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
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-lg">{mat.type}</span>
                  <a href={mat.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300">
                    <DownloadCloud className="w-4 h-4" /> Open Link
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const renderAttendanceManagement = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-black text-white uppercase tracking-tight">Attendance Management</h2>
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end mb-8">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Course</label>
            <select value={attCourse} onChange={(e)=>setAttCourse(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:border-accent">
              <option value="">Course</option>
              {courses.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Semester</label>
            <select value={attSemester} onChange={(e)=>setAttSemester(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:border-accent">
              <option value="">Sem</option>
              {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s.toString()}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Subject</label>
            <select value={attSubject} onChange={(e)=>setAttSubject(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:border-accent">
              <option value="">Subject</option>
              {subjects.map(s => <option key={s._id} value={s.name}>{s.name}</option>)}
            </select>
          </div>
          <button onClick={fetchStudentsForAttendance} disabled={loading} className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-colors">
            Fetch Students
          </button>
        </div>

        {students.length > 0 && (
          <div className="animate-fade-in border-t border-white/10 pt-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Mark for {attDate}</h3>
              <input type="date" value={attDate} onChange={(e)=>setAttDate(e.target.value)} className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white" />
            </div>
            <div className="space-y-3 mb-8">
              {students.map(s => (
                <div key={s.studentId} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-black/30 rounded-2xl border border-white/5">
                  <div className="mb-3 sm:mb-0">
                    <p className="font-bold text-white text-lg">{s.fullName}</p>
                    <p className="text-sm text-slate-400 font-mono">{s.studentId}</p>
                  </div>
                  <div className="flex gap-2">
                    {['Present', 'Absent', 'Leave'].map(status => {
                      const isSel = attendanceRecords[s.studentId] === status;
                      const colors = { Present: 'green', Absent: 'red', Leave: 'amber' };
                      const col = colors[status];
                      return (
                        <button key={status} onClick={() => setAttendanceRecords(p => ({...p, [s.studentId]: status}))} 
                          className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors ${isSel ? `bg-${col}-500/20 text-${col}-400 border border-${col}-500/50` : 'bg-white/5 text-slate-400 border border-transparent hover:bg-white/10'}`}>
                          {isSel && <Check className="w-4 h-4" />} {status}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={submitAttendance} className="w-full bg-accent hover:bg-accent-light text-white font-black py-4 rounded-2xl text-lg transition-all">Submit Final Attendance</button>
          </div>
        )}
      </div>
    </div>
  );

  const renderMarksManagement = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-black text-white uppercase tracking-tight">Marks Management</h2>
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 max-w-3xl">
        <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest text-sm">Upload Result</h3>
        <form onSubmit={submitResult} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Student ID *</label>
              <input type="text" value={resStudentId} onChange={e=>setResStudentId(e.target.value)} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Student Name *</label>
              <input type="text" value={resStudentName} onChange={e=>setResStudentName(e.target.value)} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Course *</label>
              <select value={resCourse} onChange={(e)=>setResCourse(e.target.value)} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:border-accent">
                <option value="">Course</option>
                {courses.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Semester *</label>
              <select value={resSemester} onChange={(e)=>setResSemester(e.target.value)} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:border-accent">
                <option value="">Sem</option>
                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s.toString()}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Final SGPA *</label>
              <input type="number" step="0.01" value={resSgpa} onChange={e=>setResSgpa(e.target.value)} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Status *</label>
              <select value={resStatus} onChange={(e)=>setResStatus(e.target.value)} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:border-accent">
                <option value="Pass">Pass</option><option value="Fail">Fail</option>
              </select>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-xs font-bold text-slate-400 uppercase">Subject Grades</label>
              <button type="button" onClick={()=>setResSubjects([...resSubjects, { name:'', credits:3, grade:'A'}])} className="text-accent text-sm font-bold">+ Add</button>
            </div>
            <div className="space-y-3">
              {resSubjects.map((sub, idx) => (
                <div key={idx} className="flex gap-2 items-center bg-black/30 p-2 rounded-xl">
                  <select value={sub.name} onChange={e=>{let n=[...resSubjects]; n[idx].name=e.target.value; setResSubjects(n)}} required className="flex-1 bg-transparent text-white focus:outline-none text-sm p-2">
                    <option value="" className="bg-dark text-slate-400">Subject</option>
                    {subjects.map(s => <option key={s._id} value={s.name} className="bg-dark">{s.name}</option>)}
                  </select>
                  <input type="number" placeholder="Credits" value={sub.credits} onChange={e=>{let n=[...resSubjects]; n[idx].credits=e.target.value; setResSubjects(n)}} required className="w-20 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-accent text-sm text-center" />
                  <select value={sub.grade} onChange={e=>{let n=[...resSubjects]; n[idx].grade=e.target.value; setResSubjects(n)}} required className="w-20 bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-white focus:border-accent text-sm text-center appearance-none">
                    {['O','A+','A','B+','B','C','F'].map(g => <option key={g} value={g} className="bg-dark">{g}</option>)}
                  </select>
                  <button type="button" onClick={()=>setResSubjects(resSubjects.filter((_, i)=>i!==idx))} className="p-2 text-slate-500 hover:text-red-400"><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="w-full bg-accent hover:bg-accent-light text-white font-black py-4 rounded-2xl text-lg transition-all">Upload Result</button>
        </form>
      </div>
    </div>
  );

  const renderAnnouncements = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-black text-white uppercase tracking-tight">Announcements</h2>
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 max-w-2xl">
        <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest text-sm">Post New Notice</h3>
        <form className="space-y-4" onSubmit={e=>e.preventDefault()}>
          <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none">
            <option>General Notice</option>
            <option>Assignment Deadline</option>
            <option>Exam Information</option>
          </select>
          <input type="text" placeholder="Announcement Title" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white" />
          <textarea placeholder="Description" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white resize-none h-32" />
          <div className="flex gap-4">
            <select className="w-1/2 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none">
              <option>All Semesters</option>
              <option>Semester 1</option>
            </select>
            <button className="w-1/2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition-all">Publish</button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderStudentManagement = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-black text-white uppercase tracking-tight">Student Management</h2>
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input type="text" placeholder="Search by name or ID..." className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-accent" />
        </div>
        <p className="text-slate-400">Search functionality will connect to backend soon. Use Marks Management to evaluate students.</p>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-black text-white uppercase tracking-tight">Your Schedule</h2>
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest text-sm flex items-center gap-2"><Calendar className="w-5 h-5 text-blue-400" /> Today's Timetable</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-white/5">
            <div><p className="font-bold text-white text-lg">Machine Learning</p><p className="text-slate-400 text-sm">Sem 6 • B.Tech CSE</p></div>
            <div className="text-right"><p className="font-bold text-blue-400">10:00 AM</p><p className="text-xs text-slate-500">Room 304</p></div>
          </div>
          <div className="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-white/5">
            <div><p className="font-bold text-white text-lg">Web Tech Lab</p><p className="text-slate-400 text-sm">Sem 4 • B.Tech CSE</p></div>
            <div className="text-right"><p className="font-bold text-blue-400">01:00 PM</p><p className="text-xs text-slate-500">Lab 2</p></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-black text-white uppercase tracking-tight">Faculty Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
          <div className="w-24 h-24 mx-auto bg-accent/20 rounded-full flex items-center justify-center mb-4"><User className="w-12 h-12 text-accent" /></div>
          <h3 className="text-2xl font-black text-white mb-1">{user.name}</h3>
          <p className="text-accent font-bold text-sm uppercase tracking-widest mb-6">Assistant Professor</p>
          <div className="space-y-3 text-left bg-black/30 p-4 rounded-2xl border border-white/5">
            <div className="flex justify-between"><span className="text-slate-400">Department</span><span className="font-bold text-white">{user.department || 'Computer Science'}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Employee ID</span><span className="font-bold text-white">EMP{Math.floor(Math.random()*1000)}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Email</span><span className="font-bold text-white">{user.email}</span></div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest text-sm flex items-center gap-2"><Lock className="w-4 h-4" /> Change Password</h3>
          <form className="space-y-4" onSubmit={e=>e.preventDefault()}>
            <input type="password" placeholder="Current Password" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white" />
            <input type="password" placeholder="New Password" required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white" />
            <button className="bg-accent hover:bg-accent-light text-white font-bold py-3 px-6 rounded-xl transition-all">Update Settings</button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-100px)] bg-dark text-white pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-72 shrink-0 bg-white/5 border border-white/10 rounded-3xl p-4 h-fit sticky top-24 z-10">
          <div className="mb-6 px-4">
            <h2 className="text-xl font-black text-white uppercase tracking-wider">Faculty Hub</h2>
          </div>
          <nav className="space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
                    isActive ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.id}
                </button>
              );
            })}
            <button
              onClick={() => { logout(); window.location.href = '/'; }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all text-red-400 hover:bg-red-500/10 hover:text-red-300 mt-4"
            >
              <LogOut className="w-5 h-5" />
              Log Out
            </button>
          </nav>
        </aside>
        <main className="flex-1 min-w-0">
          {activeTab === 'Overview' && renderOverview()}
          {activeTab === 'Manage Subjects' && renderManageSubjects()}
          {activeTab === 'Upload Resources' && renderUploadResources()}
          {activeTab === 'Attendance Management' && renderAttendanceManagement()}
          {activeTab === 'Marks Management' && renderMarksManagement()}
          {activeTab === 'Announcements' && renderAnnouncements()}
          {activeTab === 'Student Management' && renderStudentManagement()}
          {activeTab === 'Schedule' && renderSchedule()}
          {activeTab === 'Profile' && renderProfile()}
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
