import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import {
  Users, Plus, Trash2, X, CheckCircle, XCircle, Shield, AlertTriangle, RefreshCw, User, Mail
} from 'lucide-react';

// ─── Add Admin Modal ────────────────────────────────────────────────────────
const AddModal = ({ onClose, onSave, saving }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    isSuperAdmin: false,
  });
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return setError('Name is required.');
    if (!form.email.trim()) return setError('Email is required.');
    if (!form.password.trim() || form.password.length < 6) return setError('Password must be at least 6 characters.');
    onSave(form);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md bg-[#0f1219] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-[scale-in_0.2s_ease-out]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">Add New Admin</p>
            <h3 className="text-lg font-black text-white mt-1">System Administrators</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <Field label="Full Name" icon={User}>
            <input className={inputClass} value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="Admin full name" />
          </Field>
          
          <Field label="Email Address" icon={Mail}>
            <input className={inputClass} type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} placeholder="admin@university.edu" />
          </Field>
          
          <Field label="Password" icon={Shield}>
            <input className={inputClass} type="password" value={form.password} onChange={e => handleChange('password', e.target.value)} placeholder="Strong password (min 6 chars)" />
          </Field>
          
          <div className="flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
            <input 
              type="checkbox" 
              id="isSuperAdmin"
              className="w-4 h-4 accent-amber-500 rounded focus:ring-amber-500 focus:ring-2" 
              checked={form.isSuperAdmin}
              onChange={e => handleChange('isSuperAdmin', e.target.checked)}
            />
            <label htmlFor="isSuperAdmin" className="text-sm font-bold text-amber-400 cursor-pointer">
              Grant Super Admin Privileges
            </label>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm font-bold text-center flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4" /> {error}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
          <button onClick={onClose} className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-slate-300 hover:bg-white/10 transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-accent to-cyan-500 text-dark font-black uppercase tracking-[0.15em] text-xs hover:opacity-90 transition-all disabled:opacity-50"
          >
            {saving ? (
              <><div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin" /> Adding...</>
            ) : (
              <><Plus className="w-4 h-4" /> Add Admin</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Delete Confirmation Modal ──────────────────────────────────────────────
const DeleteModal = ({ admin, onClose, onConfirm, deleting }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
    <div
      className="relative w-full max-w-sm bg-[#0f1219] border border-white/10 rounded-3xl shadow-2xl p-8 text-center animate-[scale-in_0.2s_ease-out]"
      onClick={e => e.stopPropagation()}
    >
      <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center mb-5">
        <Trash2 className="w-7 h-7 text-red-400" />
      </div>
      <h3 className="text-xl font-black text-white mb-2">Delete Admin?</h3>
      <p className="text-slate-400 text-sm mb-2">You're about to permanently delete:</p>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
        <p className="text-white font-black">{admin.name}</p>
        <p className="text-xs text-slate-500 mt-1">{admin.email}</p>
      </div>
      <p className="text-red-400 text-xs font-bold mb-6 flex items-center justify-center gap-1.5">
        <AlertTriangle className="w-3.5 h-3.5" /> This action cannot be undone.
      </p>
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-slate-300 hover:bg-white/10 transition-all">
          Cancel
        </button>
        <button
          onClick={() => onConfirm(admin._id)}
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

// ─── Main Admin Users Component ───────────────────────────────────────────────
const AdminUsers = () => {
  const { user } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteAdmin, setDeleteAdmin] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  // Only SuperAdmins can manage other admins
  if (!user || user.role !== 'Admin' || !user.isSuperAdmin) return <Navigate to="/admin/dashboard" replace />;

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/users/admins`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setAdmins(res.data);
    } catch (err) {
      console.error('Failed to fetch admins:', err);
      showToast('Failed to load admins. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAdmins(); }, []);

  const handleAdd = async (formData) => {
    setSaving(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/admin/users/admins`, formData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setAdmins(prev => [res.data.admin, ...prev]);
      setShowAddModal(false);
      showToast('Admin created successfully!');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to create admin.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/users/admins/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setAdmins(prev => prev.filter(a => a._id !== id));
      setDeleteAdmin(null);
      showToast('Admin deleted successfully!');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete admin.', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black tracking-widest uppercase mb-3">
              <Shield className="w-3.5 h-3.5" /> Super Admin Access
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tight">System Admins</h1>
            <p className="text-slate-400 text-sm mt-1">Manage admin access and roles</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchAdmins}
              disabled={loading}
              className="p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-accent to-cyan-500 text-dark text-sm font-black uppercase tracking-widest hover:opacity-90 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Admin
            </button>
          </div>
        </div>

        {/* Admins List */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-400 font-medium">Loading admins...</p>
            </div>
          ) : admins.length === 0 ? (
            <div className="text-center py-20">
              <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 font-bold">No admins found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-5 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Name</th>
                    <th className="px-5 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Email</th>
                    <th className="px-5 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Role Level</th>
                    <th className="px-5 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Registered</th>
                    <th className="px-5 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((a, idx) => (
                    <tr key={a._id} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${idx % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                      <td className="px-5 py-4">
                        <p className="font-bold text-white whitespace-nowrap">{a.name}</p>
                      </td>
                      <td className="px-5 py-4 text-slate-300">{a.email}</td>
                      <td className="px-5 py-4">
                        {a.isSuperAdmin ? (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border bg-amber-500/10 border-amber-500/30 text-amber-400">
                            <Shield className="w-3 h-3" /> Super Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border bg-accent/10 border-accent/30 text-accent">
                            <User className="w-3 h-3" /> Admin
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-slate-500 text-xs whitespace-nowrap">
                        {new Date(a.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setDeleteAdmin(a)}
                            disabled={user.email === a.email}
                            className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Delete admin"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showAddModal && <AddModal onClose={() => setShowAddModal(false)} onSave={handleAdd} saving={saving} />}
      {deleteAdmin && <DeleteModal admin={deleteAdmin} onClose={() => setDeleteAdmin(null)} onConfirm={handleDelete} deleting={deleting} />}
    </div>
  );
};

export default AdminUsers;
