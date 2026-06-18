import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import {
  MapPin, Plus, Trash2, X, CheckCircle, XCircle, Navigation, AlertTriangle, RefreshCw, UploadCloud, Map, LocateFixed, Maximize, Minimize, Search, Edit
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const { BaseLayer } = LayersControl;

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LocationMapPicker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return position ? <Marker position={position} icon={markerIcon} /> : null;
};

const ResizeMap = ({ isFullScreen }) => {
  const map = useMap();
  useEffect(() => {
    // Wait for DOM layout to settle, then invalidate map size
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [isFullScreen, map]);
  return null;
};

const MapFlyTo = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom() < 18 ? 18 : map.getZoom());
    }
  }, [position, map]);
  return null;
};

const MapStateSaver = () => {
  useMapEvents({
    moveend: (e) => {
      const map = e.target;
      const center = map.getCenter();
      localStorage.setItem('lastAdminMapCenter', JSON.stringify([center.lat, center.lng]));
    }
  });
  return null;
};

const LocationModal = ({ onClose, onSave, saving, initialData }) => {
  const [form, setForm] = useState(initialData ? {
    locationId: initialData.locationId || '',
    name: initialData.name || '',
    description: initialData.description || '',
    category: initialData.category || 'Facilities',
    icon: initialData.icon || '📍',
    x: initialData.coordinates?.x || 0,
    y: initialData.coordinates?.y || 0
  } : {
    locationId: '',
    name: '',
    description: '',
    category: 'Facilities',
    icon: '📍',
    x: 0,
    y: 0
  });
  const [error, setError] = useState('');
  const [mapPosition, setMapPosition] = useState(initialData?.coordinates ? [initialData.coordinates.x, initialData.coordinates.y] : null);
  const [isMapFullScreen, setIsMapFullScreen] = useState(false);
  const [mapType, setMapType] = useState('street');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const tileUrl = mapType === 'street' 
    ? "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
    : "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}";

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setMapPosition([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert("Location not found");
      }
    } catch (err) {
      console.error("Search error", err);
    } finally {
      setIsSearching(false);
    }
  };

  const defaultCenter = (() => {
    try {
      const saved = localStorage.getItem('lastAdminMapCenter');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [31.3364, 75.6888];
  })();

  useEffect(() => {
    if (mapPosition) {
      setForm(prev => ({ ...prev, x: parseFloat(mapPosition[0].toFixed(6)), y: parseFloat(mapPosition[1].toFixed(6)) }));
    }
  }, [mapPosition]);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapPosition([latitude, longitude]);
        setError('');
      },
      (err) => {
        setError('Unable to retrieve your location. Please check permissions.');
      }
    );
  };

  const handleChange = (field, value) => {
    setForm(prev => {
      const updatedForm = { ...prev, [field]: value };
      if (field === 'category') {
        switch (value) {
          case 'Academic': updatedForm.icon = '🏫'; break;
          case 'Administrative': updatedForm.icon = '🏢'; break;
          case 'Library': updatedForm.icon = '📚'; break;
          case 'Hostels': updatedForm.icon = '🏨'; break;
          case 'Sports': updatedForm.icon = '⚽'; break;
          case 'Cafeteria': updatedForm.icon = '🍽️'; break;
          case 'Parking': updatedForm.icon = '🅿️'; break;
          case 'Facilities': 
          default: updatedForm.icon = '📍'; break;
        }
      }
      return updatedForm;
    });
    if (field === 'x' || field === 'y') {
      const val = parseFloat(value);
      if (!isNaN(val)) {
        const newX = field === 'x' ? val : form.x;
        const newY = field === 'y' ? val : form.y;
        setMapPosition([newX, newY]);
      }
    }
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
            <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">{initialData ? 'Edit Location' : 'Add Location'}</p>
            <h3 className="text-lg font-black text-white mt-1">{initialData ? 'Update Campus Point' : 'New Campus Point'}</h3>
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
          
          <div className="space-y-3 pt-2 border-t border-white/5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Coordinates (Lat / Lng)</label>
              <button 
                type="button"
                onClick={handleGetLocation} 
                className="text-[10px] font-black text-accent bg-accent/10 px-3 py-1.5 rounded-lg hover:bg-accent/20 transition-colors flex items-center gap-1.5 uppercase tracking-wider"
              >
                <LocateFixed className="w-3 h-3" /> Live Location
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <input className={inputClass} type="number" step="any" value={form.x} onChange={e => handleChange('x', e.target.value)} placeholder="Latitude (X)" />
              <input className={inputClass} type="number" step="any" value={form.y} onChange={e => handleChange('y', e.target.value)} placeholder="Longitude (Y)" />
            </div>

            <div className={isMapFullScreen ? "fixed top-16 lg:top-0 inset-x-0 bottom-0 z-[100] bg-black/95 p-4 sm:p-8 flex flex-col" : "h-[240px] rounded-2xl overflow-hidden border border-white/10 relative z-0"}>
              {isMapFullScreen && (
                <div className="flex justify-between items-center mb-4 z-[400]">
                  <div>
                    <h3 className="text-xl font-black text-white">Set Map</h3>
                    <p className="text-sm text-slate-400">Click on the map to pin the coordinates.</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setIsMapFullScreen(false)}
                    className="p-3 bg-accent text-dark rounded-xl hover:bg-accent/90 font-black transition-all flex items-center gap-2 shadow-lg shadow-accent/20"
                  >
                    <Minimize className="w-5 h-5" /> <span className="hidden sm:block">Set Map</span>
                  </button>
                </div>
              )}
              
              <div className={`relative ${isMapFullScreen ? 'flex-1 rounded-3xl overflow-hidden border border-white/20 shadow-2xl' : 'w-full h-full'}`}>
                {/* Search Bar */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-[400] w-[55%] sm:w-[50%] max-w-sm">
                  <form onSubmit={handleSearch} className="flex items-center bg-black/80 backdrop-blur-md rounded-xl border border-white/20 p-1 shadow-2xl">
                    <input 
                      type="text" 
                      value={searchQuery} 
                      onChange={(e) => setSearchQuery(e.target.value)} 
                      placeholder="Search location..." 
                      className="bg-transparent border-none text-white text-xs sm:text-sm px-3 py-1.5 w-full focus:outline-none placeholder:text-slate-400"
                    />
                    <button type="submit" disabled={isSearching} className="p-1.5 text-white hover:text-accent disabled:opacity-50">
                      <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </form>
                </div>
                
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setMapType(prev => prev === 'street' ? 'satellite' : 'street'); }}
                  className={`absolute right-2 z-[400] bg-white text-black px-3 py-1.5 rounded-lg shadow-xl font-bold text-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 ${isMapFullScreen ? 'top-2' : 'top-14'}`}
                >
                  {mapType === 'street' ? <><Map className="w-3.5 h-3.5"/> Satellite</> : <><MapPin className="w-3.5 h-3.5"/> Street</>}
                </button>
                {!isMapFullScreen && (
                  <button 
                    type="button" 
                    onClick={() => setIsMapFullScreen(true)}
                    className="absolute top-2 right-2 z-[400] p-2 bg-black/50 backdrop-blur-md rounded-lg hover:bg-black/70 border border-white/10 text-white shadow-xl transition-all"
                    title="Expand Map"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                )}
                <MapContainer 
                  center={mapPosition || defaultCenter} 
                  zoom={18} 
                  style={{ height: '100%', width: '100%', zIndex: 0 }}
                  scrollWheelZoom={true}
                >
                  <TileLayer url={tileUrl} attribution='&copy; Google Maps' />
                  <LocationMapPicker position={mapPosition} setPosition={setMapPosition} />
                  <ResizeMap isFullScreen={isMapFullScreen} />
                  <MapFlyTo position={mapPosition} />
                  <MapStateSaver />
                </MapContainer>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 text-center">Click anywhere on the map to pin a location manually.</p>
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
            {saving ? 'Saving...' : (initialData ? 'Update Location' : 'Add Location')}
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
  const [editingLocation, setEditingLocation] = useState(null);
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

  const handleSaveLocation = async (formData) => {
    setSaving(true);
    try {
      if (editingLocation) {
        const res = await axios.put(`${API_BASE_URL}/api/admin/locations/${editingLocation._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setLocations(prev => prev.map(l => l._id === editingLocation._id ? res.data.location : l));
        setEditingLocation(null);
        showToast('Location updated successfully!');
      } else {
        const res = await axios.post(`${API_BASE_URL}/api/admin/locations`, formData, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setLocations(prev => [...prev, res.data.location]);
        setShowAddModal(false);
        showToast('Location added successfully!');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save location', 'error');
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
          {/* Locations Table */}
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl lg:col-span-3 flex flex-col">
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
                        <td className="px-5 py-4 text-right flex justify-end gap-2">
                          <button onClick={() => setEditingLocation(loc)} className="p-2 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20">
                            <Edit className="w-3.5 h-3.5" />
                          </button>
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
      {(showAddModal || editingLocation) && <LocationModal onClose={() => {setShowAddModal(false); setEditingLocation(null);}} onSave={handleSaveLocation} saving={saving} initialData={editingLocation} />}
    </div>
  );
};

export default AdminNavigation;
