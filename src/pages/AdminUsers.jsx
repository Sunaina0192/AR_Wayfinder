import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { User } from 'lucide-react';

const AdminUsers = () => {
  const { user } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOnline = async () => {
      try {
        const res = await fetch('/api/admin/online-users');
        if (res.ok) {
          const data = await res.json();
          setOnlineUsers(data || []);
        }
      } catch (err) {
        console.error('Failed to load online users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOnline();
    const id = setInterval(fetchOnline, 10000); // refresh every 10s
    return () => clearInterval(id);
  }, []);

  if (!user) return <Navigate to="/" replace />;
  if (user.role !== 'Admin') return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-white mb-4">Online Users</h1>
        {loading ? (
          <p className="text-slate-400">Loading...</p>
        ) : (
          <div className="space-y-3">
            {onlineUsers.length === 0 && <p className="text-slate-400">No users online.</p>}
            {onlineUsers.map((u) => (
              <div key={u.userId || u.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center text-slate-400">
                  {u.avatar ? <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" /> : <User className="w-6 h-6" />}
                </div>
                <div>
                  <p className="font-bold text-white">{u.name}</p>
                  <p className="text-xs text-slate-400">{u.email || u.userId}</p>
                </div>
                <div className="ml-auto text-xs text-slate-400">Last: {u.lastLogin ? new Date(u.lastLogin).toLocaleString() : '—'}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
