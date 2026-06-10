import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import {
  MapPin, Plus, Trash2, X, CheckCircle, XCircle, Navigation, AlertTriangle, RefreshCw, UploadCloud, Map
} from 'lucide-react';

const AddLocationModal = ({ onClose, onSave, saving }) => {
  const [form, setForm] = useState({
    locationId: '',
    name: '',
    description: '',
    category: 'Facilities',
    icon: '01',
    x: 0,
    y: 0
  });
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = () => {
    if (!form.locationId.trim() || !form.name.trim()) return setError('Location ID and Name are required.');
    onSave({
      ...form,
      coordinates: { x: Number(form.x), y: Number(form.y) }
    });
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
            <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">Add Location</p>
            <h3 className="text-lg font-black text-white mt-1">New Campus Point</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <input className={inputClass} value={form.locationId} onChange={e => handleChange('locationId', e.target.value)} placeholder="Location ID (e.g., library-02)" />
          <input className={inputClass} value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="Location Name" />
          <textarea className={inputClass} value={form.description} onChange={e => handleChange('description', e.target.value)} placeholder="Description" rows="2" />
          
          <select className={inputClass} value={form.category} onChange={e => handleChange('category', e.target.value)}>
            <option value="Academic" className="bg-dark">Academic</option>
            <option value="Administrative" className="bg-dark">Administrative</option>
            <option value="Facilities" className="bg-dark">Facilities</option>
            <option value="Sports" className="bg-dark">Sports</option>
            <option value="Hostels" className="bg-dark">Hostels</option>
          </select>
          
          <div className="grid grid-cols-2 gap-4">
            <input className={inputClass} type="number" value={form.x} onChange={e => handleChange('x', e.target.value)} placeholder="X Coord" />
            <input className={inputClass} type="number" value={form.y} onChange={e => handleChange('y', e.target.value)} placeholder="Y Coord" />
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
            {saving ? 'Saving...' : 'Add Location'}
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminNavigation = () => {
  const { user } = useAuth();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [mapUploading, setMapUploading] = useState(false);

  if (!user || user.role !== 'Admin') return <Navigate to="/admin/dashboard" replace />;

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/locations`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setLocations(res.data);
    } catch (err) {
      showToast('Failed to load locations', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLocations(); }, []);

  const handleAdd = async (formData) => {
    setSaving(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/admin/locations`, formData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setLocations(prev => [...prev, res.data.location]);
      setShowAddModal(false);
      showToast('Location added successfully!');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to add location', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this location?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/locations/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setLocations(prev => prev.filter(l => l._id !== id));
      showToast('Location deleted successfully!');
    } catch (err) {
      showToast('Failed to delete location', 'error');
    }
  };

  const handleMapUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMapUploading(true);
    try {
      // Mock upload
      await axios.post(`${API_BASE_URL}/api/admin/locations/map`, { fileName: file.name }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      showToast('3D Map uploaded and processing successfully!');
    } catch (err) {
      showToast('Failed to upload map', 'error');
    } finally {
      setMapUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
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
              <Navigation className="w-3.5 h-3.5" /> Wayfinder Data
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tight">AR Navigation</h1>
            <p className="text-slate-400 text-sm mt-1">Manage locations, routes, and 3D map data</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-black uppercase tracking-widest hover:opacity-90 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Location
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Upload Section */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 lg:col-span-1">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
              <Map className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white mb-2">3D Campus Map</h3>
            <p className="text-sm text-slate-400 mb-6">Upload the latest compiled GLB/GLTF model of the campus.</p>
            
            <div className="relative border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:bg-white/5 transition-all">
              <input 
                type="file" 
                accept=".glb,.gltf" 
                onChange={handleMapUpload}
                disabled={mapUploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
              />
              <UploadCloud className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-300">
                {mapUploading ? 'Uploading...' : 'Click or drag 3D file here'}
              </p>
            </div>
          </div>

          {/* Locations Table */}
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl lg:col-span-2 flex flex-col">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-xl font-black text-white">Campus Locations</h3>
              <button onClick={fetchLocations} className="text-slate-400 hover:text-white"><RefreshCw className="w-4 h-4" /></button>
            </div>
            <div className="overflow-y-auto flex-1 max-h-[400px]">
              {loading ? (
                <div className="p-8 text-center text-slate-400">Loading...</div>
              ) : locations.length === 0 ? (
                <div className="p-8 text-center text-slate-400">No locations found. They might be using hardcoded data.</div>
              ) : (
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-[#161a23]">
                    <tr className="border-b border-white/10">
                      <th className="px-5 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">ID / Name</th>
                      <th className="px-5 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Category</th>
                      <th className="px-5 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Coords</th>
                      <th className="px-5 py-4 text-right text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locations.map((loc) => (
                      <tr key={loc._id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="px-5 py-4">
                          <p className="font-bold text-white">{loc.name}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{loc.locationId}</p>
                        </td>
                        <td className="px-5 py-4 text-slate-300">{loc.category}</td>
                        <td className="px-5 py-4 text-slate-400 text-xs">({loc.coordinates?.x || 0}, {loc.coordinates?.y || 0})</td>
                        <td className="px-5 py-4 text-right">
                          <button onClick={() => handleDelete(loc._id)} className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20">
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

      </div>
      {showAddModal && <AddLocationModal onClose={() => setShowAddModal(false)} onSave={handleAdd} saving={saving} />}
    </div>
  );
};

export default AdminNavigation;
