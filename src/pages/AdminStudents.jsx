import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import {
  Users, Search, Pencil, Trash2, X, CheckCircle, XCircle, Clock,
  GraduationCap, Shield, AlertTriangle, RefreshCw, ChevronDown,
  User, Mail, Phone, BookOpen, Hash, Calendar, Settings, Database, Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';

const statusStyles = {
  pending:  { bg: 'bg-amber-400/10', border: 'border-amber-400/30', text: 'text-amber-400', icon: Clock },
  approved: { bg: 'bg-green-400/10', border: 'border-green-400/30', text: 'text-green-400', icon: CheckCircle },
  rejected: { bg: 'bg-red-400/10',   border: 'border-red-400/30',   text: 'text-red-400',   icon: XCircle },
};

const COURSES = [
  'B.Tech Computer Science Engineering',
  'B.Tech Electronics & Communication',
  'B.Tech Mechanical Engineering',
  'B.Tech Civil Engineering',
  'MBA - Master of Business Administration',
  'M.Tech Engineering',
  'BA / B.Sc Sciences',
  'BBA - Management',
  'Ph.D Programs',
];

const SEMESTERS = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

// ─── Edit Modal ─────────────────────────────────────────────────────────────

const EditModal = ({ student, onClose, onSave, saving }) => {
  const [form, setForm] = useState({
    fullName: student.fullName || '',
    fatherName: student.fatherName || '',
    email: student.email || '',
    phoneNumber: student.phoneNumber || '',
    course: student.course || '',
    semester: student.semester || '',
    rollNumber: student.rollNumber || '',
    status: student.status || 'pending',
  });
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = () => {
    if (!form.fullName.trim()) return setError('Full name is required.');
    if (!form.email.trim()) return setError('Email is required.');
    if (!form.phoneNumber.trim()) return setError('Phone number is required.');
    if (!form.course) return setError('Course is required.');
    if (!form.semester) return setError('Semester is required.');
    if (!form.rollNumber.trim()) return setError('Roll number is required.');
    onSave(student._id, form);
  };

  const Field = ({ label, icon: Icon, children }) => (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-1.5">
        {Icon && <Icon className="w-3 h-3" />} {label}
      </label>
      {children}
    </div>
  );

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-accent/60 transition-all";
  const selectClass = "w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent/60 transition-all appearance-none";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      {/* Modal */}
      <div
        className="relative w-full max-w-lg bg-[#0f1219] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-[scale-in_0.2s_ease-out]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">Edit Student</p>
            <h3 className="text-lg font-black text-white mt-1">{student.studentId}</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name" icon={User}>
              <input className={inputClass} value={form.fullName} onChange={e => handleChange('fullName', e.target.value)} placeholder="Student full name" />
            </Field>
            <Field label="Father's Name" icon={User}>
              <input className={inputClass} value={form.fatherName} onChange={e => handleChange('fatherName', e.target.value)} placeholder="Father's name" />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Email" icon={Mail}>
              <input className={inputClass} type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} placeholder="Email address" />
            </Field>
            <Field label="Phone Number" icon={Phone}>
              <input className={inputClass} type="tel" value={form.phoneNumber} onChange={e => handleChange('phoneNumber', e.target.value)} placeholder="10-digit mobile" maxLength={10} />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Course" icon={BookOpen}>
              <select className={selectClass} value={form.course} onChange={e => handleChange('course', e.target.value)}>
                <option value="" className="bg-gray-900">-- Select Course --</option>
                {COURSES.map(c => <option key={c} value={c} className="bg-gray-900">{c}</option>)}
              </select>
            </Field>
            <Field label="Semester" icon={GraduationCap}>
              <select className={selectClass} value={form.semester} onChange={e => handleChange('semester', e.target.value)}>
                <option value="" className="bg-gray-900">-- Select --</option>
                {SEMESTERS.map(s => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Roll Number" icon={Hash}>
              <input className={inputClass} value={form.rollNumber} onChange={e => handleChange('rollNumber', e.target.value)} placeholder="Roll number" />
            </Field>
            <Field label="Status" icon={Shield}>
              <select className={selectClass} value={form.status} onChange={e => handleChange('status', e.target.value)}>
                <option value="pending" className="bg-gray-900">Pending</option>
                <option value="approved" className="bg-gray-900">Approved</option>
                <option value="rejected" className="bg-gray-900">Rejected</option>
              </select>
            </Field>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm font-bold text-center flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4" /> {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-slate-300 hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-accent to-cyan-500 text-dark font-black uppercase tracking-[0.15em] text-xs hover:opacity-90 transition-all disabled:opacity-50"
          >
            {saving ? (
              <><div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin" /> Saving...</>
            ) : (
              <><CheckCircle className="w-4 h-4" /> Save Changes</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Delete Confirmation Modal ──────────────────────────────────────────────

const DeleteModal = ({ student, onClose, onConfirm, deleting }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
    <div
      className="relative w-full max-w-sm bg-[#0f1219] border border-white/10 rounded-3xl shadow-2xl p-8 text-center animate-[scale-in_0.2s_ease-out]"
      onClick={e => e.stopPropagation()}
    >
      <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center mb-5">
        <Trash2 className="w-7 h-7 text-red-400" />
      </div>
      <h3 className="text-xl font-black text-white mb-2">Delete Student?</h3>
      <p className="text-slate-400 text-sm mb-2">You're about to permanently delete:</p>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
        <p className="text-white font-black">{student.fullName}</p>
        <p className="text-xs text-slate-500 mt-1">{student.studentId} · {student.email}</p>
      </div>
      <p className="text-red-400 text-xs font-bold mb-6 flex items-center justify-center gap-1.5">
        <AlertTriangle className="w-3.5 h-3.5" /> This action cannot be undone.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-slate-300 hover:bg-white/10 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm(student._id)}
          disabled={deleting}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400 text-sm font-black hover:bg-red-500/30 transition-all disabled:opacity-50"
        >
          {deleting ? (
            <><div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" /> Deleting...</>
          ) : (
            <><Trash2 className="w-4 h-4" /> Delete</>
          )}
        </button>
      </div>
    </div>
  </div>
);

// ─── Main Dashboard Component ───────────────────────────────────────────────

const AdminDashboard = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [editStudent, setEditStudent] = useState(null);
  const [deleteStudent, setDeleteStudent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  if (!user || user.role !== 'Admin') return <Navigate to="/" replace />;

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/students`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setStudents(res.data);
    } catch (err) {
      console.error('Failed to fetch students:', err);
      showToast('Failed to load students. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleEdit = async (id, formData) => {
    setSaving(true);
    try {
      const res = await axios.put(`${API_BASE_URL}/api/admin/students/${id}`, formData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setStudents(prev => prev.map(s => s._id === id ? res.data.student : s));
      setEditStudent(null);
      showToast('Student updated successfully!');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update student.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/students/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setStudents(prev => prev.filter(s => s._id !== id));
      setDeleteStudent(null);
      showToast('Student deleted successfully!');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete student.', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/api/admin/students/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setStudents(prev => prev.map(s => s._id === id ? { ...s, status: newStatus } : s));
      showToast(`Student ${newStatus} successfully!`);
    } catch (err) {
      showToast(err.response?.data?.message || `Failed to ${newStatus} student.`, 'error');
    }
  };

  // ── Filtering & Search ──────────────────────────────────────────────────

  const filtered = useMemo(() => {
    return students.filter(s => {
      const matchFilter = filter === 'All' || s.status === filter.toLowerCase();
      const q = search.toLowerCase();
      const matchSearch = !q ||
        s.fullName?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q) ||
        s.studentId?.toLowerCase().includes(q) ||
        s.rollNumber?.toLowerCase().includes(q) ||
        s.course?.toLowerCase().includes(q) ||
        s.phoneNumber?.includes(q);
      return matchFilter && matchSearch;
    });
  }, [students, filter, search]);

  const counts = useMemo(() => ({
    All: students.length,
    Pending: students.filter(s => s.status === 'pending').length,
    Approved: students.filter(s => s.status === 'approved').length,
    Rejected: students.filter(s => s.status === 'rejected').length,
  }), [students]);

  const statCards = [
    { key: 'All',      icon: Users,       color: 'accent',  gradient: 'from-accent/20 to-cyan-500/10' },
    { key: 'Pending',  icon: Clock,       color: 'amber-400',  gradient: 'from-amber-400/20 to-orange-500/10' },
    { key: 'Approved', icon: CheckCircle,  color: 'green-400',  gradient: 'from-green-400/20 to-emerald-500/10' },
    { key: 'Rejected', icon: XCircle,      color: 'red-400',    gradient: 'from-red-400/20 to-rose-500/10' },
  ];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Toast Notification */}
        {toast && (
          <div className={`fixed top-6 right-6 z-[60] flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-2xl animate-[slide-in_0.3s_ease-out] ${
            toast.type === 'error'
              ? 'bg-red-500/10 border-red-500/30 text-red-400'
              : 'bg-green-500/10 border-green-500/30 text-green-400'
          }`}>
            {toast.type === 'error' ? <XCircle className="w-5 h-5 flex-shrink-0" /> : <CheckCircle className="w-5 h-5 flex-shrink-0" />}
            <span className="text-sm font-bold">{toast.message}</span>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-black tracking-widest uppercase mb-3">
              <Shield className="w-3.5 h-3.5" /> Admin Dashboard
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tight">Student Management</h1>
            <p className="text-slate-400 text-sm mt-1">View, edit, and manage all registered students</p>
          </div>
          <button
            onClick={fetchStudents}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-slate-300 hover:bg-white/10 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {statCards.map(({ key, icon: Icon, color, gradient }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`relative overflow-hidden p-5 rounded-2xl border text-left transition-all duration-300 group ${
                filter === key
                  ? 'border-accent/50 bg-accent/10 shadow-[0_0_40px_rgba(6,182,212,0.1)]'
                  : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              {/* Background gradient blob */}
              <div className={`absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br ${gradient} blur-2xl opacity-50 group-hover:opacity-80 transition-opacity`} />
              
              <div className="relative">
                <Icon className={`w-5 h-5 mb-3 ${filter === key ? 'text-accent' : `text-${color}`}`} />
                <p className="text-3xl font-black text-white">{counts[key]}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">{key}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, student ID, roll number, email, phone, or course..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-5 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-accent/60 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-white/10 transition-all"
            >
              <X className="w-3.5 h-3.5 text-slate-500" />
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
            Showing <span className="text-white">{filtered.length}</span> of <span className="text-white">{students.length}</span> students
          </p>
        </div>

        {/* Students Table / Cards */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-400 font-medium">Loading students...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 font-bold">No students found</p>
              <p className="text-slate-600 text-sm mt-1">Try adjusting your search or filter</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      {['Student ID', 'Name', 'Email', 'Phone', 'Course', 'Sem', 'Roll No.', 'Status', 'Registered', 'Actions'].map(h => (
                        <th key={h} className="px-5 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((s, idx) => {
                      const st = statusStyles[s.status] || statusStyles.pending;
                      const StIcon = st.icon;
                      return (
                        <tr
                          key={s._id}
                          className={`border-b border-white/5 hover:bg-white/5 transition-colors ${idx % 2 === 0 ? '' : 'bg-white/[0.02]'}`}
                        >
                          <td className="px-5 py-4 font-black text-accent text-xs tracking-wider whitespace-nowrap">{s.studentId}</td>
                          <td className="px-5 py-4">
                            <p className="font-bold text-white whitespace-nowrap">{s.fullName}</p>
                            {s.fatherName && <p className="text-[10px] text-slate-500 mt-0.5">F: {s.fatherName}</p>}
                          </td>
                          <td className="px-5 py-4 text-slate-300 whitespace-nowrap">{s.email}</td>
                          <td className="px-5 py-4 text-slate-300 whitespace-nowrap">{s.phoneNumber}</td>
                          <td className="px-5 py-4 text-slate-300 max-w-[180px]">
                            <span className="truncate block">{s.course}</span>
                          </td>
                          <td className="px-5 py-4 text-slate-300 text-center">{s.semester}</td>
                          <td className="px-5 py-4 text-slate-300 font-mono text-xs">{s.rollNumber}</td>
                          <td className="px-5 py-4">
                            <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${st.bg} ${st.border} ${st.text}`}>
                              <StIcon className="w-3 h-3" />
                              {s.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-slate-500 text-xs whitespace-nowrap">
                            {s.registrationDate ? new Date(s.registrationDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              {s.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleStatusChange(s._id, 'approved')}
                                    className="p-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-all"
                                    title="Approve student"
                                  >
                                    <CheckCircle className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleStatusChange(s._id, 'rejected')}
                                    className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"
                                    title="Reject student"
                                  >
                                    <XCircle className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => setEditStudent(s)}
                                className="p-2 rounded-xl bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition-all"
                                title="Edit student"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeleteStudent(s)}
                                className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"
                                title="Delete student"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden divide-y divide-white/5">
                {filtered.map(s => {
                  const st = statusStyles[s.status] || statusStyles.pending;
                  const StIcon = st.icon;
                  return (
                    <div key={s._id} className="p-5 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="text-base font-black text-white">{s.fullName}</h3>
                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${st.bg} ${st.border} ${st.text}`}>
                              <StIcon className="w-2.5 h-2.5 inline mr-0.5" />{s.status}
                            </span>
                          </div>
                          <p className="text-xs text-accent font-bold">{s.studentId}</p>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {s.status === 'pending' && (
                            <>
                              <button onClick={() => handleStatusChange(s._id, 'approved')} className="p-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-all">
                                <CheckCircle className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => handleStatusChange(s._id, 'rejected')} className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all">
                                <XCircle className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                          <button onClick={() => setEditStudent(s)} className="p-2 rounded-xl bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition-all">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => setDeleteStudent(s)} className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-white/5 rounded-xl p-2.5">
                          <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wider">Course</p>
                          <p className="text-slate-200 mt-0.5 truncate">{s.course}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-2.5">
                          <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wider">Semester</p>
                          <p className="text-slate-200 mt-0.5">{s.semester}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-2.5">
                          <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wider">Roll No.</p>
                          <p className="text-slate-200 mt-0.5 font-mono">{s.rollNumber}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-2.5">
                          <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wider">Phone</p>
                          <p className="text-slate-200 mt-0.5">{s.phoneNumber}</p>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-500">
                        {s.email} · Registered {s.registrationDate ? new Date(s.registrationDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* ERP Quick Links (Phase 1 Expansion) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <Link to="/admin/teachers" className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-accent/30 transition-all cursor-pointer group block">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white mb-1">Teacher Management</h3>
            <p className="text-sm text-slate-400">Add, edit, and assign subjects to teachers.</p>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-4">Manage Now →</p>
          </Link>
          <Link to="/admin/academics" className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-accent/30 transition-all cursor-pointer group block">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white mb-1">Academic Setup</h3>
            <p className="text-sm text-slate-400">Manage courses, departments, and semesters.</p>
            <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-4">Manage Now →</p>
          </Link>
          <Link to="/admin/erp" className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-accent/30 transition-all cursor-pointer group block">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white mb-1">Fee & Finance</h3>
            <p className="text-sm text-slate-400">Track fee collections, pending dues, and receipts.</p>
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-4">Coming in Phase 4 →</p>
          </Link>
          <Link to="/admin/erp" className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-accent/30 transition-all cursor-pointer group block">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white mb-1">ERP Control Center</h3>
            <p className="text-sm text-slate-400">Dashboard stats, notifications, activity, hostel, and library roadmap.</p>
            <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest mt-4">Manage Now</p>
          </Link>
        </div>

        {/* Super Admin Section */}
        {user.isSuperAdmin && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-6 md:p-8 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-black uppercase tracking-widest text-amber-400">Super Admin Controls</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/admin/users" className="flex items-center justify-between p-4 bg-black/30 border border-amber-500/20 rounded-2xl hover:bg-black/50 transition-all">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-slate-400" />
                  <span className="font-bold text-slate-200">Manage System Admins</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">View</span>
              </Link>
              <button className="flex items-center justify-between p-4 bg-black/30 border border-amber-500/20 rounded-2xl hover:bg-black/50 transition-all">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-slate-400" />
                  <span className="font-bold text-slate-200">System Backup</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Run</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Modals */}
      {editStudent && (
        <EditModal
          student={editStudent}
          onClose={() => setEditStudent(null)}
          onSave={handleEdit}
          saving={saving}
        />
      )}
      {deleteStudent && (
        <DeleteModal
          student={deleteStudent}
          onClose={() => setDeleteStudent(null)}
          onConfirm={handleDelete}
          deleting={deleting}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
