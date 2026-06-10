import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import {
  Shield, Database, HardDrive, RefreshCw, AlertTriangle, ShieldCheck, DownloadCloud, Activity
} from 'lucide-react';

const AdminSecurity = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backupLoading, setBackupLoading] = useState(false);
  const [toast, setToast] = useState(null);

  if (!user || user.role !== 'Admin' || !user.isSuperAdmin) return <Navigate to="/admin/dashboard" replace />;

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/logs`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setLogs(res.data);
    } catch (err) {
      showToast('Failed to load system logs', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(); }, []);

  const handleBackup = async () => {
    setBackupLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/admin/backup`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      showToast('System Backup Initiated Successfully!');
      setTimeout(fetchLogs, 2000); // Refresh logs to show backup log
    } catch (err) {
      showToast('Failed to initiate backup', 'error');
    } finally {
      setBackupLoading(false);
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black tracking-widest uppercase mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> Super Admin Only
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tight">System Security</h1>
            <p className="text-slate-400 text-sm mt-1">Audit logs, system health, and database backups</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={fetchLogs} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10">
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleBackup}
              disabled={backupLoading}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-dark text-sm font-black uppercase tracking-widest hover:opacity-90 disabled:opacity-50"
            >
              {backupLoading ? 'Initiating...' : <><Database className="w-4 h-4" /> Trigger Backup</>}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Status</p>
              <p className="text-2xl font-black text-white">Secure</p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <HardDrive className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Database Size</p>
              <p className="text-2xl font-black text-white">~45 MB</p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
              <Activity className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">API Health</p>
              <p className="text-2xl font-black text-white">99.9%</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-xl font-black text-white">Audit Logs</h3>
            <span className="text-xs text-slate-500 font-bold">Showing last {logs.length} events</span>
          </div>
          <div className="overflow-y-auto flex-1 max-h-[500px]">
            {loading ? (
              <div className="p-12 text-center text-slate-400">Loading audit logs...</div>
            ) : logs.length === 0 ? (
              <div className="p-12 text-center text-slate-400">No logs available.</div>
            ) : (
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-[#161a23] z-10">
                  <tr className="border-b border-white/10">
                    <th className="px-5 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Timestamp</th>
                    <th className="px-5 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Level</th>
                    <th className="px-5 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Action</th>
                    <th className="px-5 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-5 py-4 text-slate-400 font-mono text-xs">{new Date(log.timestamp).toLocaleString()}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                          log.level === 'INFO' ? 'bg-blue-500/10 text-blue-400' :
                          log.level === 'WARN' ? 'bg-amber-500/10 text-amber-400' :
                          'bg-red-500/10 text-red-400'
                        }`}>
                          {log.level}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-bold text-white">{log.action}</td>
                      <td className="px-5 py-4 text-slate-400 text-xs">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminSecurity;
