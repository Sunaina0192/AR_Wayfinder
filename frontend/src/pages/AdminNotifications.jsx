import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import {
  Bell, Plus, Trash2, X, CheckCircle, AlertTriangle, RefreshCw, Send, Users, User
} from 'lucide-react';

const SendNotificationModal = ({ onClose, onSend, sending }) => {
  const [form, setForm] = useState({
    title: '',
    message: '',
    type: 'info',
    target: 'All',
    targetId: ''
  });
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = () => {
    if (!form.title.trim() || !form.message.trim()) return setError('Title and message are required.');
    if (form.target === 'Student' && !form.targetId.trim()) return setError('Student ID is required when targeting a specific student.');
    onSend(form);
  };

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
            <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">Compose</p>
            <h3 className="text-lg font-black text-white mt-1">Send Notification</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <input className={inputClass} value={form.title} onChange={e => handleChange('title', e.target.value)} placeholder="Notification Title" />
          <textarea className={inputClass} value={form.message} onChange={e => handleChange('message', e.target.value)} placeholder="Message content" rows="3" />
          
          <div className="grid grid-cols-2 gap-4">
            <select className={inputClass} value={form.type} onChange={e => handleChange('type', e.target.value)}>
              <option value="info" className="bg-dark">Info</option>
              <option value="warning" className="bg-dark">Warning</option>
              <option value="success" className="bg-dark">Success</option>
              <option value="error" className="bg-dark">Urgent/Error</option>
            </select>
            <select className={inputClass} value={form.target} onChange={e => handleChange('target', e.target.value)}>
              <option value="All" className="bg-dark">All Users</option>
              <option value="Student" className="bg-dark">Specific Student</option>
              <option value="Teacher" className="bg-dark">All Teachers</option>
            </select>
          </div>

          {form.target === 'Student' && (
            <input className={inputClass} value={form.targetId} onChange={e => handleChange('targetId', e.target.value)} placeholder="Enter Student ID (e.g., STU-2023-001)" />
          )}

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm font-bold text-center flex items-center gap-2">
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
            disabled={sending}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-black uppercase tracking-[0.15em] text-xs hover:opacity-90 disabled:opacity-50"
          >
            {sending ? 'Sending...' : <><Send className="w-4 h-4" /> Send Alert</>}
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);

  if (!user || user.role !== 'Admin') return <Navigate to="/admin/dashboard" replace />;

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/notifications`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setNotifications(res.data);
    } catch (err) {
      showToast('Failed to load notifications', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotifications(); }, []);

  const handleSend = async (formData) => {
    setSending(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/admin/notifications`, formData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setNotifications(prev => [res.data.notification, ...prev]);
      setShowModal(false);
      showToast('Notification sent successfully!');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to send notification', 'error');
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this notification?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/notifications/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setNotifications(prev => prev.filter(n => n._id !== id));
      showToast('Notification deleted');
    } catch (err) {
      showToast('Failed to delete notification', 'error');
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {toast && (
          <div className={`fixed top-6 right-6 z-[60] flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-2xl animate-[slide-in_0.3s_ease-out] ${
            toast.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-green-500/10 border-green-500/30 text-green-400'
          }`}>
            <span className="text-sm font-bold">{toast.message}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-widest uppercase mb-3">
              <Bell className="w-3.5 h-3.5" /> Communications
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tight">System Notifications</h1>
            <p className="text-slate-400 text-sm mt-1">Manage global alerts, student notifications, and messaging</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchNotifications} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10">
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-black uppercase tracking-widest hover:opacity-90"
            >
              <Send className="w-4 h-4" /> Send Alert
            </button>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
          <div className="overflow-y-auto flex-1 max-h-[600px]">
            {loading ? (
              <div className="p-12 text-center text-slate-400">Loading notifications...</div>
            ) : notifications.length === 0 ? (
              <div className="p-12 text-center text-slate-400">No recent notifications. Click "Send Alert" to broadcast.</div>
            ) : (
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-[#161a23] z-10">
                  <tr className="border-b border-white/10">
                    <th className="px-5 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Message</th>
                    <th className="px-5 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Audience</th>
                    <th className="px-5 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Type</th>
                    <th className="px-5 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Sent At</th>
                    <th className="px-5 py-4 text-right text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((notif) => (
                    <tr key={notif._id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-5 py-4">
                        <p className="font-bold text-white mb-1">{notif.title}</p>
                        <p className="text-xs text-slate-400 max-w-sm">{notif.message}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-full bg-white/5 border border-white/10 text-slate-300">
                          {notif.target === 'All' ? <Users className="w-3 h-3" /> : <User className="w-3 h-3" />}
                          {notif.target} {notif.targetId && `(${notif.targetId})`}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border 
                          ${notif.type === 'info' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : ''}
                          ${notif.type === 'warning' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : ''}
                          ${notif.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' : ''}
                          ${notif.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-400' : ''}
                        `}>
                          {notif.type}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-500 text-xs">
                        {new Date(notif.createdAt).toLocaleString()}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button onClick={() => handleDelete(notif._id)} className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
      {showModal && <SendNotificationModal onClose={() => setShowModal(false)} onSend={handleSend} sending={sending} />}
    </div>
  );
};

export default AdminNotifications;
