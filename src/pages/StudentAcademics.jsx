import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { BookOpen, CheckSquare, Award, DownloadCloud, FileText, Activity } from 'lucide-react';

const StudentAcademics = () => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('attendance');
  const [loading, setLoading] = useState(false);

  // Data States
  const [attendance, setAttendance] = useState({ records: [], summary: { total: 0, present: 0, percentage: 0 } });
  const [results, setResults] = useState([]);
  const [materials, setMaterials] = useState([]);

  if (!user || user.role !== 'Student') return <Navigate to="/" replace />;

  useEffect(() => {
    if (activeTab === 'attendance') fetchAttendance();
    if (activeTab === 'results') fetchResults();
    if (activeTab === 'materials') fetchMaterials();
  }, [activeTab]);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/student/attendance', { headers: { Authorization: `Bearer ${token}` } });
      setAttendance(res.data);
    } catch (err) {
      console.error('Failed to fetch attendance', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/student/results', { headers: { Authorization: `Bearer ${token}` } });
      setResults(res.data);
    } catch (err) {
      console.error('Failed to fetch results', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/student/materials', { headers: { Authorization: `Bearer ${token}` } });
      setMaterials(res.data);
    } catch (err) {
      console.error('Failed to fetch materials', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight flex items-center gap-3">
              <Activity className="w-10 h-10 text-blue-500" />
              My Academics
            </h1>
            <p className="text-slate-400 mt-1">Track your attendance, view semester results, and access study materials.</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 bg-white/5 p-2 rounded-2xl border border-white/10 w-fit">
          <button onClick={() => setActiveTab('attendance')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'attendance' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <CheckSquare className="w-5 h-5" /> Attendance
          </button>
          <button onClick={() => setActiveTab('results')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'results' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <Award className="w-5 h-5" /> Semester Results
          </button>
          <button onClick={() => setActiveTab('materials')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'materials' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <BookOpen className="w-5 h-5" /> Study Materials
          </button>
        </div>

        {/* ============================== */}
        {/* ATTENDANCE TAB */}
        {/* ============================== */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Overall Attendance</p>
                <div className="w-24 h-24 rounded-full border-8 border-blue-500 flex items-center justify-center">
                  <span className="text-2xl font-black text-white">{attendance.summary.percentage}%</span>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Total Classes</p>
                <span className="text-5xl font-black text-white">{attendance.summary.total}</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Classes Attended</p>
                <span className="text-5xl font-black text-green-400">{attendance.summary.present}</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-lg font-black uppercase tracking-widest text-white">Recent Records</h3>
              </div>
              {loading ? (
                <div className="p-8 text-center text-slate-500">Loading...</div>
              ) : attendance.records.length === 0 ? (
                <div className="p-8 text-center text-slate-500">No attendance records found.</div>
              ) : (
                <div className="divide-y divide-white/5">
                  {attendance.records.map((rec, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                      <div>
                        <p className="font-bold text-white">{rec.subject}</p>
                        <p className="text-xs text-slate-400">{new Date(rec.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                      <div>
                        {rec.status === 'Present' && <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-lg text-sm font-bold">Present</span>}
                        {rec.status === 'Absent' && <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-lg text-sm font-bold">Absent</span>}
                        {rec.status === 'Leave' && <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-lg text-sm font-bold">Leave</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================== */}
        {/* RESULTS TAB */}
        {/* ============================== */}
        {activeTab === 'results' && (
          <div className="space-y-6">
            {loading ? (
              <p className="text-slate-400">Loading results...</p>
            ) : results.length === 0 ? (
              <div className="p-8 text-center bg-white/5 border border-white/10 rounded-3xl text-slate-500">
                <Award className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No results have been declared yet.</p>
              </div>
            ) : (
              results.map((res) => (
                <div key={res._id} className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-white/10">
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-widest text-white">Semester {res.semester} Result</h3>
                      <p className="text-slate-400">{res.course}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">SGPA</p>
                      <p className="text-4xl font-black text-blue-400">{res.sgpa}</p>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest ${
                        res.status === 'Pass' ? 'bg-green-500/20 text-green-400' :
                        res.status === 'Fail' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {res.status}
                      </span>
                    </div>
                  </div>
                  
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="pb-3 text-xs font-black text-slate-400 uppercase tracking-widest">Subject</th>
                        <th className="pb-3 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Credits</th>
                        <th className="pb-3 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {res.subjects.map((sub, i) => (
                        <tr key={i}>
                          <td className="py-3 font-bold text-slate-200">{sub.name}</td>
                          <td className="py-3 text-center text-slate-400">{sub.credits}</td>
                          <td className="py-3 text-right font-black text-white">{sub.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            )}
          </div>
        )}

        {/* ============================== */}
        {/* MATERIALS TAB */}
        {/* ============================== */}
        {activeTab === 'materials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p className="text-slate-400 col-span-full">Loading materials...</p>
            ) : materials.length === 0 ? (
              <div className="col-span-full p-8 text-center bg-white/5 border border-white/10 rounded-3xl text-slate-500">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No study materials available for your course and semester right now.</p>
              </div>
            ) : (
              materials.map(mat => (
                <div key={mat._id} className="bg-black/30 border border-white/10 rounded-3xl p-6 hover:border-blue-500/30 transition-all group flex flex-col h-full">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                        <FileText className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-slate-400 bg-white/5 px-3 py-1 rounded-lg">{mat.type}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{mat.title}</h3>
                    <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">{mat.subject}</p>
                    {mat.description && <p className="text-slate-400 text-sm mb-6">{mat.description}</p>}
                  </div>
                  
                  <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                    <p className="text-xs text-slate-500">By {mat.teacherName || 'Faculty'}</p>
                    <a href={mat.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition-colors">
                      <DownloadCloud className="w-4 h-4" /> Open
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default StudentAcademics;
