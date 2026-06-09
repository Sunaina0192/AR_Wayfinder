import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Search, Plus, Pencil, Trash2, X, CheckCircle, XCircle, Briefcase, GraduationCap, Phone, Mail } from 'lucide-react';

const AdminTeachers = () => {
  const { user, token } = useAuth();
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '', department: '', qualification: '', experience: '', mobile: '', email: '', salary: '', subjects: '', classesAssigned: '', password: '', status: 'active'
  });
  const [formError, setFormError] = useState('');

  if (!user || user.role !== 'Admin') return <Navigate to="/" replace />;

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get('/api/admin/teachers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTeachers(res.data);
    } catch (err) {
      console.error('Failed to fetch teachers', err);
      alert('Failed to fetch teachers');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setFormData({ name: '', department: '', qualification: '', experience: '', mobile: '', email: '', salary: '', subjects: '', classesAssigned: '', password: '', status: 'active' });
    setFormError('');
    setShowAddModal(true);
  };

  const openEditModal = (teacher) => {
    setSelectedTeacher(teacher);
    setFormData({
      name: teacher.name,
      department: teacher.department,
      qualification: teacher.qualification,
      experience: teacher.experience,
      mobile: teacher.mobile,
      email: teacher.email,
      salary: teacher.salary || '',
      subjects: teacher.subjects?.join(', ') || '',
      classesAssigned: teacher.classesAssigned?.join(', ') || '',
      status: teacher.status
    });
    setFormError('');
    setShowEditModal(true);
  };

  const openDeleteModal = (teacher) => {
    setSelectedTeacher(teacher);
    setShowDeleteModal(true);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      const dataToSubmit = {
        ...formData,
        subjects: formData.subjects.split(',').map(s => s.trim()).filter(Boolean),
        classesAssigned: formData.classesAssigned.split(',').map(s => s.trim()).filter(Boolean)
      };
      await axios.post('/api/admin/teachers', dataToSubmit, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Teacher added successfully');
      setShowAddModal(false);
      fetchTeachers();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to add teacher');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      const dataToSubmit = {
        ...formData,
        subjects: formData.subjects.split(',').map(s => s.trim()).filter(Boolean),
        classesAssigned: formData.classesAssigned.split(',').map(s => s.trim()).filter(Boolean)
      };
      await axios.put(`/api/admin/teachers/${selectedTeacher._id}`, dataToSubmit, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Teacher updated successfully');
      setShowEditModal(false);
      fetchTeachers();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to update teacher');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/admin/teachers/${selectedTeacher._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Teacher deleted successfully');
      setShowDeleteModal(false);
      fetchTeachers();
    } catch (err) {
      alert('Failed to delete teacher');
    }
  };

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.teacherId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-dark text-white pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight flex items-center gap-3">
              <Briefcase className="w-10 h-10 text-blue-500" />
              Teacher Management
            </h1>
            <p className="text-slate-400 mt-1">Manage faculty accounts, assign subjects, and track status.</p>
          </div>
          <button 
            onClick={openAddModal}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20"
          >
            <Plus className="w-5 h-5" />
            Add New Teacher
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by name, ID, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="text-sm text-slate-400 font-bold px-4">
            Total: {filteredTeachers.length}
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/40 border-b border-white/10">
                  <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">ID / Name</th>
                  <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Department</th>
                  <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Contact</th>
                  <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Subjects</th>
                  <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="p-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr><td colSpan="6" className="p-8 text-center text-slate-500">Loading teachers...</td></tr>
                ) : filteredTeachers.length === 0 ? (
                  <tr><td colSpan="6" className="p-8 text-center text-slate-500">No teachers found.</td></tr>
                ) : (
                  filteredTeachers.map(teacher => (
                    <tr key={teacher._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                            {teacher.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-white">{teacher.name}</p>
                            <p className="text-xs text-slate-400 font-mono">{teacher.teacherId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full font-medium">
                          {teacher.department}
                        </span>
                      </td>
                      <td className="p-4 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <Mail className="w-4 h-4 text-slate-500" /> {teacher.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <Phone className="w-4 h-4 text-slate-500" /> {teacher.mobile}
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-slate-400 line-clamp-1 max-w-[200px]">
                          {teacher.subjects?.join(', ') || '-'}
                        </p>
                      </td>
                      <td className="p-4">
                        {teacher.status === 'active' ? (
                          <span className="flex items-center gap-1.5 text-green-400 text-xs font-bold uppercase tracking-wider">
                            <CheckCircle className="w-4 h-4" /> Active
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-red-400 text-xs font-bold uppercase tracking-wider">
                            <XCircle className="w-4 h-4" /> Inactive
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEditModal(teacher)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-slate-300 hover:text-white" title="Edit">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => openDeleteModal(teacher)} className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300" title="Delete">
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

        {/* --- MODALS --- */}
        
        {/* Add / Edit Modal */}
        {(showAddModal || showEditModal) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-dark border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-dark/95 backdrop-blur-md border-b border-white/10 p-6 flex justify-between items-center z-10">
                <h3 className="text-xl font-black text-white uppercase tracking-widest">
                  {showAddModal ? 'Add New Teacher' : 'Edit Teacher'}
                </h3>
                <button onClick={() => { setShowAddModal(false); setShowEditModal(false); }} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={showAddModal ? handleAddSubmit : handleEditSubmit} className="p-6 space-y-6">
                {formError && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-medium">{formError}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Department *</label>
                    <input type="text" name="department" value={formData.department} onChange={handleInputChange} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Mobile *</label>
                    <input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Qualification *</label>
                    <input type="text" name="qualification" value={formData.qualification} onChange={handleInputChange} required placeholder="e.g. Ph.D Computer Science" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Experience *</label>
                    <input type="text" name="experience" value={formData.experience} onChange={handleInputChange} required placeholder="e.g. 5 Years" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Subjects (Comma separated)</label>
                    <input type="text" name="subjects" value={formData.subjects} onChange={handleInputChange} placeholder="Data Structures, Algorithms, OS" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Classes Assigned (Comma separated)</label>
                    <input type="text" name="classesAssigned" value={formData.classesAssigned} onChange={handleInputChange} placeholder="CSE-A 3rd Sem, CSE-B 3rd Sem" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                  
                  {showAddModal && (
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Initial Password *</label>
                      <input type="password" name="password" value={formData.password} onChange={handleInputChange} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                    </div>
                  )}

                  {showEditModal && (
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Status</label>
                      <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 appearance-none">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
                  <button type="button" onClick={() => { setShowAddModal(false); setShowEditModal(false); }} className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all">
                    {showAddModal ? 'Create Teacher' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-dark border border-white/10 rounded-3xl w-full max-w-md p-6 text-center shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-white mb-2">Delete Teacher?</h3>
              <p className="text-slate-400 text-sm mb-6">
                Are you sure you want to delete <span className="text-white font-bold">{selectedTeacher?.name}</span>? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-3">
                <button onClick={() => setShowDeleteModal(false)} className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all">
                  Cancel
                </button>
                <button onClick={handleDelete} className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-900/20">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// Simple alert icon since we missed importing it initially
const AlertTriangle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>
  </svg>
);

export default AdminTeachers;
