import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, X, GraduationCap, Building2, Book, Layers } from 'lucide-react';

const AdminAcademics = () => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('departments');
  const [data, setData] = useState({ departments: [], courses: [], subjects: [] });
  const [loading, setLoading] = useState(true);

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});

  if (!user || user.role !== 'Admin') return <Navigate to="/" replace />;

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [depRes, curRes, subRes] = await Promise.all([
        axios.get('/api/academic/departments'),
        axios.get('/api/academic/courses'),
        axios.get('/api/academic/subjects')
      ]);
      setData({
        departments: depRes.data,
        courses: curRes.data,
        subjects: subRes.data
      });
    } catch (err) {
      console.error('Failed to fetch academic data', err);
      alert('Failed to load academic data');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (item = null) => {
    setEditItem(item);
    if (item) {
      setFormData({ ...item });
    } else {
      // Default empty form depending on active tab
      if (activeTab === 'departments') setFormData({ name: '', code: '', description: '', hod: '' });
      if (activeTab === 'courses') setFormData({ name: '', courseCode: '', department: '', credits: 0, description: '' });
      if (activeTab === 'subjects') setFormData({ name: '', subjectCode: '', course: '', semester: '', credits: 0, type: 'Theory' });
    }
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        await axios.put(`/api/academic/${activeTab}/${editItem._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert(`${activeTab.slice(0, -1)} updated successfully`);
      } else {
        await axios.post(`/api/academic/${activeTab}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert(`${activeTab.slice(0, -1)} created successfully`);
      }
      setShowModal(false);
      fetchAllData();
    } catch (err) {
      alert(err.response?.data?.message || `Failed to save ${activeTab.slice(0, -1)}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await axios.delete(`/api/academic/${activeTab}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Item deleted successfully');
      fetchAllData();
    } catch (err) {
      alert('Failed to delete item');
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight flex items-center gap-3">
              <GraduationCap className="w-10 h-10 text-purple-500" />
              Academic Setup
            </h1>
            <p className="text-slate-400 mt-1">Manage departments, courses, and subjects.</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-900/20"
          >
            <Plus className="w-5 h-5" />
            Add New {activeTab === 'departments' ? 'Department' : activeTab === 'courses' ? 'Course' : 'Subject'}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 bg-white/5 p-2 rounded-2xl border border-white/10 w-fit">
          <button
            onClick={() => setActiveTab('departments')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'departments' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Building2 className="w-5 h-5" />
            Departments
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'courses' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Layers className="w-5 h-5" />
            Courses
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'subjects' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Book className="w-5 h-5" />
            Subjects
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/40 border-b border-white/10">
                  {activeTab === 'departments' && (
                    <>
                      <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Code</th>
                      <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Name</th>
                      <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">HOD</th>
                    </>
                  )}
                  {activeTab === 'courses' && (
                    <>
                      <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Code</th>
                      <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Name</th>
                      <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Department</th>
                      <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Credits</th>
                    </>
                  )}
                  {activeTab === 'subjects' && (
                    <>
                      <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Code</th>
                      <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Name</th>
                      <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Course</th>
                      <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Semester</th>
                      <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Type</th>
                    </>
                  )}
                  <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr><td colSpan="6" className="p-8 text-center text-slate-500">Loading data...</td></tr>
                ) : data[activeTab].length === 0 ? (
                  <tr><td colSpan="6" className="p-8 text-center text-slate-500">No {activeTab} found.</td></tr>
                ) : (
                  data[activeTab].map(item => (
                    <tr key={item._id} className="hover:bg-white/[0.02] transition-colors">
                      {activeTab === 'departments' && (
                        <>
                          <td className="p-4 font-mono text-purple-400 font-bold">{item.code}</td>
                          <td className="p-4 font-bold text-white">{item.name}</td>
                          <td className="p-4 text-slate-300">{item.hod || '-'}</td>
                        </>
                      )}
                      {activeTab === 'courses' && (
                        <>
                          <td className="p-4 font-mono text-purple-400 font-bold">{item.courseCode}</td>
                          <td className="p-4 font-bold text-white">{item.name}</td>
                          <td className="p-4"><span className="bg-white/10 px-3 py-1 rounded-full text-xs">{item.department}</span></td>
                          <td className="p-4 text-slate-300">{item.credits}</td>
                        </>
                      )}
                      {activeTab === 'subjects' && (
                        <>
                          <td className="p-4 font-mono text-purple-400 font-bold">{item.subjectCode}</td>
                          <td className="p-4 font-bold text-white">{item.name}</td>
                          <td className="p-4 text-slate-300">{item.course}</td>
                          <td className="p-4 text-slate-300">Sem {item.semester}</td>
                          <td className="p-4"><span className="bg-white/10 px-3 py-1 rounded-full text-xs">{item.type}</span></td>
                        </>
                      )}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openModal(item)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-slate-300 hover:text-white" title="Edit">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(item._id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-dark border border-white/10 rounded-3xl w-full max-w-md p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-white uppercase tracking-widest">
                  {editItem ? 'Edit' : 'Add'} {activeTab.slice(0, -1)}
                </h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === 'departments' && (
                  <>
                    <input type="text" name="name" placeholder="Department Name" value={formData.name} onChange={handleChange} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
                    <input type="text" name="code" placeholder="Code (e.g. CSE)" value={formData.code} onChange={handleChange} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
                    <input type="text" name="hod" placeholder="HOD Name" value={formData.hod} onChange={handleChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
                  </>
                )}
                {activeTab === 'courses' && (
                  <>
                    <input type="text" name="name" placeholder="Course Name" value={formData.name} onChange={handleChange} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
                    <input type="text" name="courseCode" placeholder="Course Code" value={formData.courseCode} onChange={handleChange} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
                    
                    <select name="department" value={formData.department} onChange={handleChange} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 appearance-none">
                      <option value="" disabled>Select Department</option>
                      {data.departments.map(d => <option key={d._id} value={d.name}>{d.name}</option>)}
                    </select>

                    <input type="number" name="credits" placeholder="Total Credits" value={formData.credits} onChange={handleChange} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
                  </>
                )}
                {activeTab === 'subjects' && (
                  <>
                    <input type="text" name="name" placeholder="Subject Name" value={formData.name} onChange={handleChange} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
                    <input type="text" name="subjectCode" placeholder="Subject Code" value={formData.subjectCode} onChange={handleChange} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
                    
                    <select name="course" value={formData.course} onChange={handleChange} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 appearance-none">
                      <option value="" disabled>Select Course</option>
                      {data.courses.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                    </select>

                    <input type="text" name="semester" placeholder="Semester (e.g. 3)" value={formData.semester} onChange={handleChange} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
                    <input type="number" name="credits" placeholder="Credits" value={formData.credits} onChange={handleChange} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
                    <select name="type" value={formData.type} onChange={handleChange} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 appearance-none">
                      <option value="Theory">Theory</option>
                      <option value="Practical">Practical</option>
                      <option value="Both">Both</option>
                    </select>
                  </>
                )}
                
                <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
                  <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold transition-all">
                    {editItem ? 'Save Changes' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminAcademics;
