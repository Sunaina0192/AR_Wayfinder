import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import {
  Users, Search, BookOpen, Clock, AlertTriangle, CheckCircle, 
  Shield, Calendar, IndianRupee, Hash, Bell, RefreshCw, BarChart2,
  Database, Settings, GraduationCap, Briefcase, Map, User
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  if (!user || (user.role !== 'Admin' && !user.isSuperAdmin)) return <Navigate to="/" replace />;

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/overview`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setData(res.data);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark text-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const stats = data?.stats || {};
  const recentAdmissions = data?.recentAdmissions || [];
  const recentPayments = data?.recentPayments || [];
  const recentNotifications = data?.recentNotifications || [];

  const statCards = [
    { label: 'Total Students', value: stats.totalStudents || 0, icon: Users, color: 'blue', link: '/admin/students' },
    { label: 'Total Teachers', value: stats.totalTeachers || 0, icon: Briefcase, color: 'purple', link: '/admin/teachers' },
    { label: 'Total Courses', value: stats.totalCourses || 0, icon: BookOpen, color: 'cyan', link: '/admin/academics' },
    { label: 'Fee Collection', value: `₹${(stats.totalFeeCollection || 0).toLocaleString()}`, icon: IndianRupee, color: 'emerald', link: '/admin/fees' },
    { label: 'Pending Fees', value: `₹${(stats.pendingFeeAmount || 0).toLocaleString()}`, icon: AlertTriangle, color: 'amber', link: '/admin/fees' },
    { label: 'Admissions', value: stats.totalAdmissions || 0, icon: Hash, color: 'indigo', link: '/admin/admissions' },
    { label: 'Attendance', value: stats.attendanceRecords || 0, icon: CheckCircle, color: 'green', link: '/admin/attendance' },
    { label: 'Notifications', value: stats.notificationsSent || 0, icon: Bell, color: 'rose', link: '/admin/notifications' },
  ];

  // Dummy chart data for demonstration, normally would come from API
  const admissionTrend = [
    { name: 'Jan', value: 40 }, { name: 'Feb', value: 30 }, { name: 'Mar', value: 45 },
    { name: 'Apr', value: 80 }, { name: 'May', value: 120 }, { name: 'Jun', value: 150 },
  ];

  const feeTrend = [
    { name: 'Jan', value: 40000 }, { name: 'Feb', value: 30000 }, { name: 'Mar', value: 45000 },
    { name: 'Apr', value: 80000 }, { name: 'May', value: 120000 }, { name: 'Jun', value: 150000 },
  ];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-black tracking-widest uppercase mb-3">
              <Shield className="w-3.5 h-3.5" /> {user.isSuperAdmin ? 'Super Admin' : 'Admin'} Dashboard
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tight">System Overview</h1>
            <p className="text-slate-400 text-sm mt-1">College ERP real-time statistics and activities</p>
          </div>
          <button
            onClick={fetchDashboardData}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-slate-300 hover:bg-white/10 transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Refresh Data
          </button>
        </div>

        {/* 8-Grid Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link to={card.link} key={idx} className="bg-white/5 border border-white/10 rounded-3xl p-5 hover:bg-white/10 hover:border-white/20 transition-all group relative overflow-hidden">
                <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-${card.color}-500/20 blur-3xl group-hover:bg-${card.color}-500/30 transition-all`}></div>
                <div className="flex items-start justify-between relative z-10">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{card.label}</p>
                    <h3 className={`text-3xl font-black text-${card.color}-400`}>{card.value}</h3>
                  </div>
                  <div className={`p-3 rounded-2xl bg-${card.color}-500/10 border border-${card.color}-500/20`}>
                    <Icon className={`w-5 h-5 text-${card.color}-400`} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-lg font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-accent" /> Admissions Trend
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <LineChart data={admissionTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#0f1219', borderColor: '#ffffff20', borderRadius: '12px' }} />
                  <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4, fill: '#06b6d4' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-lg font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-emerald-400" /> Fee Collection (₹)
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <BarChart data={feeTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#0f1219', borderColor: '#ffffff20', borderRadius: '12px' }} cursor={{ fill: '#ffffff05' }} />
                  <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activities Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Admissions */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">Recent Admissions</h3>
              <Link to="/admin/admissions" className="text-xs text-accent hover:underline">View All</Link>
            </div>
            <div className="space-y-4 flex-1">
              {recentAdmissions.length === 0 ? <p className="text-slate-500 text-sm">No recent admissions.</p> : recentAdmissions.map((app, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/[0.02] p-3 rounded-2xl border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-white truncate">{app.fullName}</p>
                    <p className="text-[10px] text-slate-400 truncate">{app.course}</p>
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${app.status === 'Approved' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Payments */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">Recent Payments</h3>
              <Link to="/admin/fees" className="text-xs text-accent hover:underline">View All</Link>
            </div>
            <div className="space-y-4 flex-1">
              {recentPayments.length === 0 ? <p className="text-slate-500 text-sm">No recent payments.</p> : recentPayments.map((pay, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/[0.02] p-3 rounded-2xl border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <IndianRupee className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-white truncate">STU-{pay.studentId.slice(-4)}</p>
                    <p className="text-[10px] text-slate-400 truncate">Sem: {pay.semester}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-emerald-400">+₹{pay.paidAmount}</p>
                    <p className="text-[10px] text-slate-500">{new Date(pay.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">Notifications</h3>
              <Link to="/admin/notifications" className="text-xs text-accent hover:underline">View All</Link>
            </div>
            <div className="space-y-4 flex-1">
              {recentNotifications.length === 0 ? <p className="text-slate-500 text-sm">No recent notifications.</p> : recentNotifications.map((notif, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/[0.02] p-3 rounded-2xl border border-white/5">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bell className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-white leading-tight mb-1">{notif.title}</p>
                    <p className="text-[10px] text-slate-400">To: {notif.target}</p>
                  </div>
                  <p className="text-[9px] text-slate-500 whitespace-nowrap">{new Date(notif.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Quick Actions & Super Admin */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-8">
          <Link to="/admin/students" className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl p-5 flex items-center justify-between hover:opacity-90 transition-all shadow-lg shadow-blue-500/20">
            <span className="font-black uppercase tracking-widest text-sm text-white">Manage Students</span>
            <Users className="w-5 h-5 text-white/80" />
          </Link>
          <Link to="/admin/teachers" className="bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-3xl p-5 flex items-center justify-between hover:opacity-90 transition-all shadow-lg shadow-purple-500/20">
            <span className="font-black uppercase tracking-widest text-sm text-white">Manage Teachers</span>
            <Briefcase className="w-5 h-5 text-white/80" />
          </Link>
          <Link to="/admin/navigation" className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-5 flex items-center justify-between hover:opacity-90 transition-all shadow-lg shadow-emerald-500/20">
            <span className="font-black uppercase tracking-widest text-sm text-white">AR Navigation</span>
            <Map className="w-5 h-5 text-white/80" />
          </Link>
          <Link to="/admin/events" className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl p-5 flex items-center justify-between hover:opacity-90 transition-all shadow-lg shadow-rose-500/20">
            <span className="font-black uppercase tracking-widest text-sm text-white">Manage Events</span>
            <Calendar className="w-5 h-5 text-white/80" />
          </Link>

          {user.isSuperAdmin && (
            <>
              <Link to="/admin/security" className="bg-black/50 border border-amber-500/30 rounded-3xl p-5 flex items-center justify-between hover:bg-black/70 transition-all group">
                <span className="font-black uppercase tracking-widest text-sm text-amber-400 group-hover:text-amber-300">System Security</span>
                <Database className="w-5 h-5 text-amber-400/80" />
              </Link>
              <Link to="/admin/users" className="bg-black/50 border border-amber-500/30 rounded-3xl p-5 flex items-center justify-between hover:bg-black/70 transition-all group">
                <span className="font-black uppercase tracking-widest text-sm text-amber-400 group-hover:text-amber-300">Manage Admins</span>
                <Settings className="w-5 h-5 text-amber-400/80" />
              </Link>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
