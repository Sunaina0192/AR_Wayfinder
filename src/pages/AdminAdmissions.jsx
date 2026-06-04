import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import {
  ClipboardList, CheckCircle, XCircle, Clock,
  User, BookOpen, Mail, Phone, MapPin, Calendar,
  ChevronDown, ChevronUp, Search, Filter
} from 'lucide-react';

const statusColor = {
  'Pending Verification': 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  Pending:  'text-amber-400 border-amber-400/30 bg-amber-400/10',
  Approved: 'text-green-400 border-green-400/30 bg-green-400/10',
  Rejected: 'text-red-400 border-red-400/30 bg-red-400/10',
};
const statusIcon = { 'Pending Verification': Clock, Pending: Clock, Approved: CheckCircle, Rejected: XCircle };

const AdminAdmissions = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [updatingId, setUpdatingId] = useState(null);

  if (!user || user.role !== 'Admin') return <Navigate to="/" replace />;

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admissions`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setApplications(res.data);
    } catch (err) {
      console.error('Failed to load applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await axios.put(`${API_BASE_URL}/api/admissions/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setApplications(prev => prev.map(a => a._id === id ? { ...a, status } : a));
    } catch (err) {
      alert('Failed to update status. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = applications.filter(app => {
    const matchStatus = filter === 'All' || app.status === filter;
    const matchSearch = !search || app.fullName?.toLowerCase().includes(search.toLowerCase()) || app.applicationId?.toLowerCase().includes(search.toLowerCase()) || app.course?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const counts = { All: applications.length, Pending: applications.filter(a => a.status === 'Pending').length, Approved: applications.filter(a => a.status === 'Approved').length, Rejected: applications.filter(a => a.status === 'Rejected').length };

  return (
    <div className="min-h-screen bg-dark text-white pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-black tracking-widest uppercase mb-3">
              <ClipboardList className="w-3.5 h-3.5" /> Admin Panel
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tight">Admission Applications</h1>
            <p className="text-slate-400 text-sm mt-1">Review and manage all submitted admission applications</p>
          </div>
          <button onClick={fetchApplications} className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-slate-300 hover:bg-white/10 transition-all">
            ↻ Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.entries(counts).map(([status, count]) => {
            const Icon = status === 'All' ? ClipboardList : statusIcon[status];
            return (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`p-5 rounded-2xl border text-left transition-all ${filter === status ? 'border-accent/50 bg-accent/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
              >
                <Icon className={`w-5 h-5 mb-3 ${filter === status ? 'text-accent' : 'text-slate-400'}`} />
                <p className="text-2xl font-black text-white">{count}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{status}</p>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, application ID, or course..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-5 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-accent/60 transition-all"
          />
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-400 font-medium">Loading applications...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 bg-white/5 border border-white/10 rounded-3xl">
              <ClipboardList className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 font-bold">No applications found</p>
            </div>
          ) : filtered.map(app => {
            const Icon = statusIcon[app.status] || Clock;
            const isOpen = expanded === app._id;
            return (
              <div key={app._id} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden transition-all hover:border-white/20">
                {/* Summary Row */}
                <div
                  className="p-5 sm:p-6 flex flex-wrap items-center gap-4 cursor-pointer"
                  onClick={() => setExpanded(isOpen ? null : app._id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h3 className="text-base font-black text-white">{app.fullName}</h3>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${statusColor[app.status]}`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 font-medium">{app.course}</p>
                    <p className="text-xs text-slate-500 mt-1">ID: <span className="text-accent font-bold">{app.applicationId}</span> · {new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {app.status === 'Pending' && (
                      <>
                        <button
                          onClick={e => { e.stopPropagation(); updateStatus(app._id, 'Approved'); }}
                          disabled={updatingId === app._id}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-black hover:bg-green-500/20 transition-all disabled:opacity-50"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button
                          onClick={e => { e.stopPropagation(); updateStatus(app._id, 'Rejected'); }}
                          disabled={updatingId === app._id}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-black hover:bg-red-500/20 transition-all disabled:opacity-50"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                      </>
                    )}
                    {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                </div>

                {/* Expanded Details */}
                {isOpen && (
                  <div className="border-t border-white/10 p-5 sm:p-6 space-y-5 animate-[fade-in_0.2s_ease-out]">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-white/5 rounded-2xl p-4">
                        <p className="text-xs font-black text-accent uppercase tracking-[0.2em] mb-3 flex items-center gap-2"><User className="w-3.5 h-3.5" /> Personal</p>
                        <div className="space-y-2 text-sm">
                          <div><span className="text-slate-500 text-xs">Father:</span><p className="text-white font-medium">{app.fatherName}</p></div>
                          <div><span className="text-slate-500 text-xs">Mother:</span><p className="text-white font-medium">{app.motherName}</p></div>
                          <div><span className="text-slate-500 text-xs">DOB:</span><p className="text-white font-medium">{app.dob}</p></div>
                          <div><span className="text-slate-500 text-xs">Gender:</span><p className="text-white font-medium">{app.gender}</p></div>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-4">
                        <p className="text-xs font-black text-accent uppercase tracking-[0.2em] mb-3 flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> Contact & Address</p>
                        <div className="space-y-2 text-sm">
                          <div><span className="text-slate-500 text-xs">Mobile:</span><p className="text-white font-medium">{app.mobile}</p></div>
                          <div><span className="text-slate-500 text-xs">Email:</span><p className="text-white font-medium">{app.email}</p></div>
                          <div><span className="text-slate-500 text-xs">Address:</span><p className="text-white font-medium">{app.city}, {app.district}, {app.state}</p></div>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-4">
                        <p className="text-xs font-black text-accent uppercase tracking-[0.2em] mb-3 flex items-center gap-2"><BookOpen className="w-3.5 h-3.5" /> Academic</p>
                        <div className="space-y-2 text-sm">
                          <div><span className="text-slate-500 text-xs">10th Marks:</span><p className="text-white font-medium">{app.marks10}</p></div>
                          <div><span className="text-slate-500 text-xs">12th Marks:</span><p className="text-white font-medium">{app.marks12}</p></div>
                          <div><span className="text-slate-500 text-xs">Prev Qualification:</span><p className="text-white font-medium">{app.prevQualification}</p></div>
                        </div>
                      </div>
                    </div>
                    {/* Documents */}
                    <div>
                      <p className="text-xs font-black text-accent uppercase tracking-[0.2em] mb-3">Documents</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[['Passport Photo', app.documents?.passportPhoto], ['Aadhaar Card', app.documents?.aadhaarCard], ['10th Certificate', app.documents?.certificate10th], ['12th Certificate', app.documents?.certificate12th]].map(([label, doc]) => (
                          <div key={label} className="bg-white/5 rounded-2xl p-3 text-center">
                            {doc ? (
                              <>
                                <img src={doc} alt={label} className="w-full h-20 object-cover rounded-xl mb-2" onError={e => { e.target.style.display='none'; }} />
                                <a href={doc} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-accent hover:underline block">{label}</a>
                              </>
                            ) : (
                              <>
                                <div className="w-full h-20 bg-white/5 rounded-xl flex items-center justify-center mb-2">
                                  <XCircle className="w-6 h-6 text-slate-600" />
                                </div>
                                <p className="text-[10px] font-bold text-slate-500">{label}</p>
                                <p className="text-[9px] text-red-400">Not uploaded</p>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminAdmissions;
