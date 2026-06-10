import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import {
  Activity,
  Banknote,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle,
  GraduationCap,
  Home,
  Library,
  Megaphone,
  Plus,
  ReceiptText,
  RefreshCw,
  Send,
  Shield,
  Users,
  WalletCards,
  Download
} from 'lucide-react';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(Number(value || 0));

const AdminERP = () => {
  const { user, token } = useAuth();
  const [overview, setOverview] = useState(null);
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingFee, setSavingFee] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');
  const [feeForm, setFeeForm] = useState({
    studentId: '',
    semester: '',
    totalAmount: '',
    paidAmount: '',
    dueDate: ''
  });
  const [noticeForm, setNoticeForm] = useState({
    title: 'Tomorrow Holiday',
    message: '',
    target: 'All',
    targetId: ''
  });

  const isAdmin = user?.role === 'Admin';

  const loadData = useCallback(async () => {
    if (!isAdmin) return;
    setLoading(true);
    try {
      const [overviewRes, feesRes] = await Promise.all([
        axios.get('/api/admin/overview', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/admin/fees', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setOverview(overviewRes.data);
      setFees(feesRes.data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to load ERP data');
    } finally {
      setLoading(false);
    }
  }, [isAdmin, token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const stats = useMemo(() => {
    const data = overview?.stats || {};
    return [
      { label: 'Total Students', value: data.totalStudents || 0, icon: Users, tone: 'text-cyan-300 bg-cyan-400/10' },
      { label: 'Total Teachers', value: data.totalTeachers || 0, icon: GraduationCap, tone: 'text-blue-300 bg-blue-400/10' },
      { label: 'Total Courses', value: data.totalCourses || 0, icon: BookOpen, tone: 'text-violet-300 bg-violet-400/10' },
      { label: 'Departments', value: data.totalDepartments || 0, icon: Building2, tone: 'text-emerald-300 bg-emerald-400/10' },
      { label: 'Admissions', value: data.totalAdmissions || 0, icon: CheckCircle, tone: 'text-lime-300 bg-lime-400/10' },
      { label: 'Fee Collection', value: formatCurrency(data.totalFeeCollection), icon: Banknote, tone: 'text-green-300 bg-green-400/10' },
      { label: 'Pending Fees', value: data.pendingFees || 0, icon: WalletCards, tone: 'text-amber-300 bg-amber-400/10' },
      { label: 'Hostels', value: data.totalHostels || 0, icon: Home, tone: 'text-rose-300 bg-rose-400/10' },
      { label: 'Notifications', value: data.notificationsSent || 0, icon: Bell, tone: 'text-fuchsia-300 bg-fuchsia-400/10' },
      { label: 'Attendance Logs', value: data.attendanceRecords || 0, icon: Activity, tone: 'text-orange-300 bg-orange-400/10' }
    ];
  }, [overview]);

  const quickActions = [
    { label: 'Students', to: '/admin/dashboard', icon: Users },
    { label: 'Teachers', to: '/admin/teachers', icon: GraduationCap },
    { label: 'Academics', to: '/admin/academics', icon: BookOpen },
    { label: 'Admissions', to: '/admin/admissions', icon: CalendarDays },
    { label: 'Library', to: '#library', icon: Library },
    { label: 'Hostel', to: '#hostel', icon: Home }
  ];

  if (!isAdmin) return <Navigate to="/" replace />;

  const handleFeeSubmit = async (event) => {
    event.preventDefault();
    setSavingFee(true);
    setMessage('');
    try {
      await axios.post('/api/admin/fees', feeForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFeeForm({ studentId: '', semester: '', totalAmount: '', paidAmount: '', dueDate: '' });
      setMessage('Fee record added successfully');
      loadData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add fee record');
    } finally {
      setSavingFee(false);
    }
  };

  const handleNotificationSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    setMessage('');
    try {
      await axios.post('/api/admin/notifications', noticeForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNoticeForm({ title: 'Tomorrow Holiday', message: '', target: 'All', targetId: '' });
      setMessage('Notification sent successfully');
      loadData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to send notification');
    } finally {
      setSending(false);
    }
  };

  const downloadReport = () => {
    if (!fees.length) return setMessage('No fee records to download.');
    const csvContent = [
      ['Student ID', 'Semester', 'Total Amount', 'Paid Amount', 'Pending Amount', 'Due Date', 'Status'],
      ...fees.map(f => [
        f.studentId,
        f.semester,
        f.totalAmount,
        f.paidAmount,
        (f.totalAmount || 0) - (f.paidAmount || 0),
        new Date(f.dueDate).toLocaleDateString(),
        f.status
      ])
    ].map(e => e.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "Fee_Report.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-dark text-white pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-black tracking-widest uppercase mb-3">
              <Shield className="w-3.5 h-3.5" /> Phase 4 ERP
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tight">College ERP Control Center</h1>
            <p className="text-slate-400 mt-1">Fees, notifications, recent activity, and admin operations in one place.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={downloadReport}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold hover:bg-amber-500/20 transition-all"
            >
              <Download className="w-4 h-4" /> Download Report
            </button>
            <button
              onClick={loadData}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-bold hover:bg-white/10 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
          </div>
        </div>

        {message && (
          <div className="bg-accent/10 border border-accent/20 text-accent rounded-2xl px-4 py-3 text-sm font-bold">
            {message}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((stat) => {
            const StatIcon = stat.icon;
            return (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className={`w-10 h-10 rounded-xl ${stat.tone} flex items-center justify-center mb-3`}>
                  <StatIcon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-black text-white truncate">{loading ? '...' : stat.value}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <section className="xl:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex items-center justify-between gap-4 mb-5">
              <h2 className="text-xl font-black uppercase tracking-widest">Fee Management</h2>
              <ReceiptText className="w-6 h-6 text-emerald-300" />
            </div>
            <form onSubmit={handleFeeSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
              <input required value={feeForm.studentId} onChange={(e) => setFeeForm({ ...feeForm, studentId: e.target.value })} placeholder="Student ID" className="bg-black/40 border border-white/10 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-accent" />
              <input required value={feeForm.semester} onChange={(e) => setFeeForm({ ...feeForm, semester: e.target.value })} placeholder="Semester" className="bg-black/40 border border-white/10 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-accent" />
              <input required type="number" value={feeForm.totalAmount} onChange={(e) => setFeeForm({ ...feeForm, totalAmount: e.target.value })} placeholder="Total Fee" className="bg-black/40 border border-white/10 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-accent" />
              <input type="number" value={feeForm.paidAmount} onChange={(e) => setFeeForm({ ...feeForm, paidAmount: e.target.value })} placeholder="Paid" className="bg-black/40 border border-white/10 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-accent" />
              <button disabled={savingFee} className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl px-4 py-3 text-sm font-black disabled:opacity-50">
                <Plus className="w-4 h-4" /> Add
              </button>
              <input required type="date" value={feeForm.dueDate} onChange={(e) => setFeeForm({ ...feeForm, dueDate: e.target.value })} className="md:col-span-2 bg-black/40 border border-white/10 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-accent" />
            </form>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {['Student', 'Sem', 'Total', 'Paid', 'Pending', 'Status'].map((head) => (
                      <th key={head} className="py-3 pr-4 text-left text-[10px] text-slate-500 font-black uppercase tracking-widest">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {fees.slice(0, 8).map((fee) => (
                    <tr key={fee._id}>
                      <td className="py-3 pr-4 font-mono text-accent">{fee.studentId}</td>
                      <td className="py-3 pr-4 text-slate-300">{fee.semester}</td>
                      <td className="py-3 pr-4">{formatCurrency(fee.totalAmount)}</td>
                      <td className="py-3 pr-4 text-green-300">{formatCurrency(fee.paidAmount)}</td>
                      <td className="py-3 pr-4 text-amber-300">{formatCurrency((fee.totalAmount || 0) - (fee.paidAmount || 0))}</td>
                      <td className="py-3 pr-4">
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-black uppercase tracking-widest">{fee.status}</span>
                      </td>
                    </tr>
                  ))}
                  {!fees.length && (
                    <tr><td colSpan="6" className="py-8 text-center text-slate-500">No fee records yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="flex items-center justify-between gap-4 mb-5">
              <h2 className="text-xl font-black uppercase tracking-widest">Send Notice</h2>
              <Megaphone className="w-6 h-6 text-amber-300" />
            </div>
            <form onSubmit={handleNotificationSubmit} className="space-y-3">
              <select value={noticeForm.title} onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-accent">
                <option>Tomorrow Holiday</option>
                <option>Fee Last Date</option>
                <option>Exam Schedule</option>
                <option>Placement Drive</option>
                <option>University Notice</option>
              </select>
              <select value={noticeForm.target} onChange={(e) => setNoticeForm({ ...noticeForm, target: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-accent">
                <option value="All">All Users</option>
                <option value="Student">Students</option>
                <option value="Teacher">Teachers</option>
                <option value="Course">Specific Department/Course</option>
              </select>
              <input value={noticeForm.targetId} onChange={(e) => setNoticeForm({ ...noticeForm, targetId: e.target.value })} placeholder="Department/Course name optional" className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-accent" />
              <textarea required value={noticeForm.message} onChange={(e) => setNoticeForm({ ...noticeForm, message: e.target.value })} rows="5" placeholder="Notification message" className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-accent resize-none" />
              <button disabled={sending} className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black rounded-xl px-4 py-3 text-sm font-black disabled:opacity-50">
                <Send className="w-4 h-4" /> Send Notification
              </button>
            </form>
          </section>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-lg font-black uppercase tracking-widest mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => {
                const ActionIcon = action.icon;
                return (
                <Link key={action.label} to={action.to} className="bg-black/30 border border-white/10 rounded-2xl p-4 hover:border-accent/40 hover:bg-accent/10 transition-all">
                  <ActionIcon className="w-5 h-5 text-accent mb-2" />
                  <p className="text-sm font-bold">{action.label}</p>
                </Link>
                );
              })}
            </div>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-lg font-black uppercase tracking-widest mb-4">Recent Admissions</h2>
            <div className="space-y-3">
              {(overview?.recentAdmissions || []).map((item) => (
                <div key={item._id} className="bg-black/25 border border-white/5 rounded-2xl p-3">
                  <p className="font-bold text-white">{item.fullName}</p>
                  <p className="text-xs text-slate-400">{item.applicationId} · {item.course}</p>
                </div>
              ))}
              {!overview?.recentAdmissions?.length && <p className="text-sm text-slate-500">No recent admissions.</p>}
            </div>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-lg font-black uppercase tracking-widest mb-4">Recent Notifications</h2>
            <div className="space-y-3">
              {(overview?.recentNotifications || []).map((item) => (
                <div key={item._id} className="bg-black/25 border border-white/5 rounded-2xl p-3">
                  <p className="font-bold text-white">{item.title}</p>
                  <p className="text-xs text-slate-400">Target: {item.target}</p>
                </div>
              ))}
              {!overview?.recentNotifications?.length && <p className="text-sm text-slate-500">No notifications sent yet.</p>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminERP;
