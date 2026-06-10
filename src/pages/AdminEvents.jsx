import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import {
  Calendar, Plus, Trash2, X, CheckCircle, XCircle, AlertTriangle, RefreshCw, CalendarDays, Clock, MapPin, Tag
} from 'lucide-react';

const AddEventModal = ({ onClose, onSave, saving }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'General',
    status: 'upcoming'
  });
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = () => {
    if (!form.title.trim() || !form.date.trim() || !form.time.trim() || !form.location.trim()) {
      return setError('Title, date, time, and location are required.');
    }
    onSave(form);
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
            <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">Add Event</p>
            <h3 className="text-lg font-black text-white mt-1">New University Event</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <input className={inputClass} value={form.title} onChange={e => handleChange('title', e.target.value)} placeholder="Event Title" />
          <textarea className={inputClass} value={form.description} onChange={e => handleChange('description', e.target.value)} placeholder="Description" rows="2" />
          
          <div className="grid grid-cols-2 gap-4">
            <input className={inputClass} type="date" value={form.date} onChange={e => handleChange('date', e.target.value)} />
            <input className={inputClass} type="time" value={form.time} onChange={e => handleChange('time', e.target.value)} />
          </div>

          <input className={inputClass} value={form.location} onChange={e => handleChange('location', e.target.value)} placeholder="Location (e.g., Main Auditorium)" />
          
          <div className="grid grid-cols-2 gap-4">
            <select className={inputClass} value={form.category} onChange={e => handleChange('category', e.target.value)}>
              <option value="General" className="bg-dark">General</option>
              <option value="Academic" className="bg-dark">Academic</option>
              <option value="Sports" className="bg-dark">Sports</option>
              <option value="Cultural" className="bg-dark">Cultural</option>
            </select>
            <select className={inputClass} value={form.status} onChange={e => handleChange('status', e.target.value)}>
              <option value="upcoming" className="bg-dark">Upcoming</option>
              <option value="ongoing" className="bg-dark">Ongoing</option>
              <option value="completed" className="bg-dark">Completed</option>
              <option value="cancelled" className="bg-dark">Cancelled</option>
            </select>
          </div>

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
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-accent to-cyan-500 text-dark font-black uppercase tracking-[0.15em] text-xs hover:opacity-90 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Add Event'}
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  if (!user || user.role !== 'Admin') return <Navigate to="/admin/dashboard" replace />;

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/events`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setEvents(res.data);
    } catch (err) {
      showToast('Failed to load events', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleAdd = async (formData) => {
    setSaving(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/admin/events`, formData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setEvents(prev => [...prev, res.data.event].sort((a,b) => new Date(a.date) - new Date(b.date)));
      setShowAddModal(false);
      showToast('Event added successfully!');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to add event', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/events/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setEvents(prev => prev.filter(e => e._id !== id));
      showToast('Event deleted successfully!');
    } catch (err) {
      showToast('Failed to delete event', 'error');
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {toast && (
          <div className={`fixed top-6 right-6 z-[60] flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-2xl animate-[slide-in_0.3s_ease-out] ${
            toast.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-green-500/10 border-green-500/30 text-green-400'
          }`}>
            <span className="text-sm font-bold">{toast.message}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-black tracking-widest uppercase mb-3">
              <Calendar className="w-3.5 h-3.5" /> Event Management
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tight">University Events</h1>
            <p className="text-slate-400 text-sm mt-1">Manage announcements, schedules, and upcoming events</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchEvents} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10">
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-black uppercase tracking-widest hover:opacity-90"
            >
              <Plus className="w-4 h-4" /> Add Event
            </button>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
          <div className="overflow-y-auto flex-1 max-h-[600px]">
            {loading ? (
              <div className="p-12 text-center text-slate-400">Loading events...</div>
            ) : events.length === 0 ? (
              <div className="p-12 text-center text-slate-400">No events found. Click "Add Event" to create one.</div>
            ) : (
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-[#161a23] z-10">
                  <tr className="border-b border-white/10">
                    <th className="px-5 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Title & Desc</th>
                    <th className="px-5 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Schedule</th>
                    <th className="px-5 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Location</th>
                    <th className="px-5 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
                    <th className="px-5 py-4 text-right text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((ev) => (
                    <tr key={ev._id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-5 py-4">
                        <p className="font-bold text-white mb-1">{ev.title}</p>
                        <p className="text-xs text-slate-400 line-clamp-1 max-w-xs">{ev.description}</p>
                        <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-slate-500 mt-2">
                          <Tag className="w-3 h-3" /> {ev.category}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-1.5 text-slate-300">
                          <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5 text-slate-500" /> {new Date(ev.date).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-500" /> {ev.time}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-300">
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {ev.location}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border 
                          ${ev.status === 'upcoming' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : ''}
                          ${ev.status === 'ongoing' ? 'bg-green-500/10 border-green-500/30 text-green-400' : ''}
                          ${ev.status === 'completed' ? 'bg-slate-500/10 border-slate-500/30 text-slate-400' : ''}
                          ${ev.status === 'cancelled' ? 'bg-red-500/10 border-red-500/30 text-red-400' : ''}
                        `}>
                          {ev.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button onClick={() => handleDelete(ev._id)} className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20">
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
      {showAddModal && <AddEventModal onClose={() => setShowAddModal(false)} onSave={handleAdd} saving={saving} />}
    </div>
  );
};

export default AdminEvents;
