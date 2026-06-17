import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import { 
  FileCheck, Search, Plus, Trash2, Edit, Save, X, BookOpen, GraduationCap
} from 'lucide-react';

const AdminResults = () => {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    studentId: '', studentName: '', course: '', semester: '', sgpa: '', status: 'Pass', subjects: []
  });
  
  const [subjectInput, setSubjectInput] = useState({ name: '', credits: '', grade: '' });

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/results`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setResults(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this result record?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/results/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchResults();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/results`, formData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setShowModal(false);
      fetchResults();
      setFormData({ studentId: '', studentName: '', course: '', semester: '', sgpa: '', status: 'Pass', subjects: [] });
    } catch (err) {
      console.error(err);
      alert('Failed to save result');
    }
  };

  const addSubject = () => {
    if (!subjectInput.name || !subjectInput.credits || !subjectInput.grade) return;
    setFormData({
      ...formData,
      subjects: [...formData.subjects, { ...subjectInput, credits: Number(subjectInput.credits) }]
    });
    setSubjectInput({ name: '', credits: '', grade: '' });
  };

  const removeSubject = (index) => {
    const newSubs = [...formData.subjects];
    newSubs.splice(index, 1);
    setFormData({ ...formData, subjects: newSubs });
  };

  const filteredResults = results.filter(r => 
    r.studentName?.toLowerCase().includes(search.toLowerCase()) || 
    r.studentId?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-wider flex items-center gap-3">
            <FileCheck className="w-8 h-8 text-accent" />
            Results Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage and publish semester results for students</p>
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-dark font-black uppercase tracking-widest text-sm hover:bg-accent/90 transition-all"
        >
          <Plus className="w-5 h-5" /> Add Result
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <div className="flex items-center gap-4 mb-6 bg-dark/50 border border-white/10 rounded-2xl px-4 py-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by Student Name or ID..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-none text-white focus:outline-none placeholder:text-slate-500"
          />
        </div>

        {loading ? (
          <div className="text-center py-10"><div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-slate-400">
                  <th className="pb-4 pl-4 font-black">Student</th>
                  <th className="pb-4 font-black">Course / Sem</th>
                  <th className="pb-4 font-black">SGPA</th>
                  <th className="pb-4 font-black">Status</th>
                  <th className="pb-4 font-black">Date</th>
                  <th className="pb-4 pr-4 font-black text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredResults.length === 0 ? (
                  <tr><td colSpan="6" className="py-8 text-center text-slate-500 font-bold">No results found</td></tr>
                ) : filteredResults.map((res) => (
                  <tr key={res._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 pl-4">
                      <p className="font-bold text-white">{res.studentName}</p>
                      <p className="text-xs text-slate-500">{res.studentId}</p>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-slate-400" /> {res.course}
                        <span className="px-2 py-0.5 rounded bg-white/10 text-xs">{res.semester} Sem</span>
                      </div>
                    </td>
                    <td className="py-4 font-black text-accent">{res.sgpa}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-black uppercase ${res.status === 'Pass' ? 'bg-green-500/10 text-green-400' : res.status === 'Promoted' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'}`}>
                        {res.status}
                      </span>
                    </td>
                    <td className="py-4 text-slate-400 text-xs">{new Date(res.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 pr-4 text-right">
                      <button onClick={() => handleDelete(res._id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-all ml-2"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white uppercase tracking-wide">Add Student Result</h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:text-white bg-white/5 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Student ID</label>
                  <input type="text" required value={formData.studentId} onChange={(e) => setFormData({...formData, studentId: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Student Name</label>
                  <input type="text" required value={formData.studentName} onChange={(e) => setFormData({...formData, studentName: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Course</label>
                  <input type="text" required value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})} placeholder="e.g. B.Tech CSE" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Semester</label>
                  <input type="text" required value={formData.semester} onChange={(e) => setFormData({...formData, semester: e.target.value})} placeholder="e.g. 4" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">SGPA</label>
                  <input type="number" step="0.01" required value={formData.sgpa} onChange={(e) => setFormData({...formData, sgpa: e.target.value})} placeholder="e.g. 8.5" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent">
                    <option value="Pass">Pass</option>
                    <option value="Fail">Fail</option>
                    <option value="Promoted">Promoted</option>
                  </select>
                </div>
              </div>

              {/* Subjects Table */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4">Subjects / Grades</h3>
                <div className="flex gap-2 mb-4">
                  <input type="text" placeholder="Subject Name" value={subjectInput.name} onChange={e => setSubjectInput({...subjectInput, name: e.target.value})} className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-sm text-white" />
                  <input type="number" placeholder="Credits" value={subjectInput.credits} onChange={e => setSubjectInput({...subjectInput, credits: e.target.value})} className="w-20 bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-sm text-white" />
                  <input type="text" placeholder="Grade (A+)" value={subjectInput.grade} onChange={e => setSubjectInput({...subjectInput, grade: e.target.value})} className="w-24 bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-sm text-white" />
                  <button type="button" onClick={addSubject} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold"><Plus className="w-5 h-5" /></button>
                </div>
                {formData.subjects.length > 0 && (
                  <div className="bg-black/30 rounded-xl p-3 border border-white/5">
                    {formData.subjects.map((sub, i) => (
                      <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                        <span className="text-sm text-white">{sub.name} <span className="text-slate-500 ml-2">({sub.credits} CR)</span></span>
                        <div className="flex items-center gap-4">
                          <span className="text-accent font-black">{sub.grade}</span>
                          <button type="button" onClick={() => removeSubject(i)} className="text-red-400 hover:text-red-300"><X className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10">
                <button type="submit" className="w-full py-4 rounded-xl bg-accent text-dark font-black uppercase tracking-[0.2em] hover:bg-accent/90 transition-all flex justify-center gap-2">
                  <Save className="w-5 h-5" /> Publish Result
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminResults;
