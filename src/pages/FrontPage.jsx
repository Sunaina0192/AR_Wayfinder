import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { X, User, Lock, GraduationCap, Mail, KeyRound, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const FrontPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  
  // Login States
  const [loginStep, setLoginStep] = useState('login'); // 'login', 'forgot_email', 'forgot_reset'
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [resetData, setResetData] = useState({ email: '', otp: '', newPassword: '', confirmNewPassword: '' });
  
  // Registration States
  const [regStep, setRegStep] = useState('role_select'); // 'role_select', 'form', 'verify_otp'
  const [regRole, setRegRole] = useState(null);
  const [regData, setRegData] = useState({
    fullName: '', email: '', course: '', semester: '', rollNumber: '', 
    department: '', mobile: '', password: '', confirmPassword: ''
  });
  const [verifyOtp, setVerifyOtp] = useState('');

  // UI States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const { user, login, register, verifyOTP, forgotPassword, resetPassword } = useAuth();

  React.useEffect(() => {
    if (user && user.role !== 'Visitor') {
      routeBasedOnRole(user.role);
    }
  }, [user, navigate]);

  const routeBasedOnRole = (role) => {
    if (role === 'Student') navigate('/student/dashboard');
    else if (role === 'Teacher') navigate('/teacher/dashboard');
    else if (role === 'Admin') navigate('/admin/dashboard');
    else navigate('/home');
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
    resetForms();
  };

  const resetForms = () => {
    setActiveTab('login');
    setLoginStep('login');
    setRegStep('role_select');
    setRegRole(null);
    setLoginData({ email: '', password: '' });
    setRegData({ fullName: '', email: '', course: '', semester: '', rollNumber: '', department: '', mobile: '', password: '', confirmPassword: '' });
    setResetData({ email: '', otp: '', newPassword: '', confirmNewPassword: '' });
    setVerifyOtp('');
    setError('');
    setSuccess('');
  };

  // --- LOGIN FLOW ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    try {
      const loggedInUser = await login(loginData.email, loginData.password);
      setSuccess('Login successful!');
      setTimeout(() => routeBasedOnRole(loggedInUser.role), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    try {
      await forgotPassword(resetData.email);
      setSuccess('OTP sent to your email!');
      setTimeout(() => {
        setSuccess('');
        setLoginStep('forgot_reset');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (resetData.newPassword !== resetData.confirmNewPassword) {
      return setError('Passwords do not match.');
    }
    setError(''); setSuccess(''); setLoading(true);
    try {
      await resetPassword(resetData.email, resetData.otp, resetData.newPassword);
      setSuccess('Password reset successfully! You can now log in.');
      setTimeout(() => {
        setSuccess('');
        setLoginStep('login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed.');
    } finally {
      setLoading(false);
    }
  };

  // --- REGISTRATION FLOW ---
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (regData.password !== regData.confirmPassword) {
      return setError('Passwords do not match.');
    }
    setError(''); setSuccess(''); setLoading(true);
    
    let submitData = { role: regRole, password: regData.password, email: regData.email };
    if (regRole === 'Student') {
      submitData = { ...submitData, fullName: regData.fullName, course: regData.course, semester: regData.semester, rollNumber: regData.rollNumber };
    } else if (regRole === 'Teacher') {
      submitData = { ...submitData, name: regData.fullName, department: regData.department, mobile: regData.mobile };
    }

    try {
      const res = await register(submitData);
      setSuccess(res.message);
      setTimeout(() => {
        setSuccess('');
        setRegStep('verify_otp');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    try {
      await verifyOTP(regData.email, verifyOtp);
      setSuccess('Account verified successfully! You can now log in.');
      setTimeout(() => {
        resetForms();
        setShowLogin(true); // Keep modal open
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-dark text-white selection:bg-accent/30 flex flex-col">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="SBBS University Campus" className="w-full h-full object-cover scale-105 animate-pulse-slow opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/70 to-dark/95"></div>
      </div>

      <div className="relative z-20">
        <Header onStartClick={() => setShowLogin(true)} />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center -mt-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8 animate-float shadow-xl backdrop-blur-md">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Welcome to the Future</span>
        </div>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tighter uppercase leading-none drop-shadow-2xl">
          Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">SBBSU</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed mb-12 drop-shadow-lg">
          Experience world-class education, cutting-edge research, and an immersive AR-guided campus environment. Your journey begins here.
        </p>
      </div>

      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-[fade-in_0.3s_ease-out]">
          <div className="absolute inset-0 bg-dark/80 backdrop-blur-xl" onClick={handleCloseLogin}></div>
          
          <div className="relative w-full max-w-md p-8 sm:p-10 rounded-[3rem] glass border-white/10 shadow-2xl animate-[slide-up_0.4s_ease-out] overflow-hidden">
            <button onClick={handleCloseLogin} className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all z-10"><X className="w-5 h-5" /></button>

            {/* Tabs */}
            <div className="flex mb-6 border-b border-white/10 relative">
              <div className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 w-1/2 ${activeTab === 'register' ? 'translate-x-full' : 'translate-x-0'}`}></div>
              <button onClick={() => { setActiveTab('login'); setError(''); setSuccess(''); }} className={`flex-1 pb-4 font-black uppercase tracking-widest text-sm transition-colors ${activeTab === 'login' ? 'text-accent' : 'text-slate-500 hover:text-slate-300'}`}>Login</button>
              <button onClick={() => { setActiveTab('register'); setError(''); setSuccess(''); }} className={`flex-1 pb-4 font-black uppercase tracking-widest text-sm transition-colors ${activeTab === 'register' ? 'text-accent' : 'text-slate-500 hover:text-slate-300'}`}>Register</button>
            </div>

            <div className="relative" style={{ minHeight: '380px' }}>
              
              {/* === LOGIN SECTION === */}
              {activeTab === 'login' && (
                <div className="animate-[fade-in_0.3s_ease-out]">
                  {error && <div className="p-3 mb-4 bg-red-500/20 border border-red-500/50 text-red-400 rounded-xl text-xs font-bold text-center">{error}</div>}
                  {success && <div className="p-3 mb-4 bg-green-500/20 border border-green-500/50 text-green-400 rounded-xl text-xs font-bold text-center">{success}</div>}

                  {loginStep === 'login' && (
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="text-center mb-6">
                        <div className="w-14 h-14 mx-auto bg-accent/10 border border-accent/20 text-accent rounded-2xl flex items-center justify-center mb-3"><Lock className="w-6 h-6" /></div>
                        <h2 className="text-xl font-black text-white uppercase tracking-tight">Unified Login</h2>
                        <p className="text-xs text-slate-400 mt-1">Students, Faculty & Admins</p>
                      </div>
                      
                      <div className="relative">
                        <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="email" required value={loginData.email} onChange={e=>setLoginData({...loginData, email:e.target.value})} placeholder="Email Address" className="w-full glass border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-accent" />
                      </div>
                      <div className="relative">
                        <KeyRound className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="password" required value={loginData.password} onChange={e=>setLoginData({...loginData, password:e.target.value})} placeholder="Password" className="w-full glass border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-accent" />
                      </div>
                      
                      <div className="text-right">
                        <button type="button" onClick={() => { setLoginStep('forgot_email'); setError(''); }} className="text-xs font-bold text-accent hover:text-white transition-colors">Forgot Password?</button>
                      </div>

                      <button type="submit" disabled={loading} className="w-full py-3 mt-2 rounded-xl bg-accent text-dark font-black uppercase tracking-widest text-xs hover:bg-accent/90 transition-all">
                        {loading ? 'Logging in...' : 'Login securely'}
                      </button>
                    </form>
                  )}

                  {loginStep === 'forgot_email' && (
                    <form onSubmit={handleForgotPassword} className="space-y-4">
                      <div className="text-center mb-6">
                        <h2 className="text-xl font-black text-white uppercase tracking-tight">Reset Password</h2>
                        <p className="text-xs text-slate-400 mt-1">Enter your registered email to receive an OTP.</p>
                      </div>
                      <input type="email" required value={resetData.email} onChange={e=>setResetData({...resetData, email:e.target.value})} placeholder="Registered Email" className="w-full glass border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent" />
                      <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-accent text-dark font-black uppercase tracking-widest text-xs hover:bg-accent/90 transition-all">{loading ? 'Sending...' : 'Send OTP'}</button>
                      <button type="button" onClick={() => setLoginStep('login')} className="w-full py-2 text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest">&larr; Back to Login</button>
                    </form>
                  )}

                  {loginStep === 'forgot_reset' && (
                    <form onSubmit={handleResetPassword} className="space-y-4">
                      <div className="text-center mb-6">
                        <h2 className="text-xl font-black text-white uppercase tracking-tight">Create New Password</h2>
                        <p className="text-xs text-slate-400 mt-1">Enter the OTP sent to {resetData.email}</p>
                      </div>
                      <input type="text" required value={resetData.otp} onChange={e=>setResetData({...resetData, otp:e.target.value})} placeholder="6-digit OTP" className="w-full glass border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent tracking-[0.5em] font-mono text-center" maxLength={6} />
                      <input type="password" required value={resetData.newPassword} onChange={e=>setResetData({...resetData, newPassword:e.target.value})} placeholder="New Password" className="w-full glass border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent" />
                      <input type="password" required value={resetData.confirmNewPassword} onChange={e=>setResetData({...resetData, confirmNewPassword:e.target.value})} placeholder="Confirm New Password" className="w-full glass border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent" />
                      <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-accent text-dark font-black uppercase tracking-widest text-xs hover:bg-accent/90 transition-all">{loading ? 'Resetting...' : 'Reset Password'}</button>
                      <button type="button" onClick={() => setLoginStep('login')} className="w-full py-2 text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest">&larr; Back to Login</button>
                    </form>
                  )}
                </div>
              )}

              {/* === REGISTER SECTION === */}
              {activeTab === 'register' && (
                <div className="animate-[fade-in_0.3s_ease-out]">
                  {error && <div className="p-3 mb-4 bg-red-500/20 border border-red-500/50 text-red-400 rounded-xl text-xs font-bold text-center">{error}</div>}
                  {success && <div className="p-3 mb-4 bg-green-500/20 border border-green-500/50 text-green-400 rounded-xl text-xs font-bold text-center">{success}</div>}

                  {regStep === 'role_select' && (
                    <div className="space-y-4">
                      <div className="text-center mb-6">
                        <h2 className="text-xl font-black text-white uppercase tracking-tight">Create Account</h2>
                        <p className="text-xs text-slate-400 mt-1">Select your role to begin</p>
                      </div>
                      <button onClick={() => { setRegRole('Student'); setRegStep('form'); setError(''); }} className="w-full group px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all flex items-center gap-4 text-left">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform"><GraduationCap className="w-6 h-6" /></div>
                        <div><h3 className="text-white font-bold tracking-wider text-sm">Student</h3><p className="text-[10px] text-slate-400 mt-1">Join as a student</p></div>
                      </button>
                      <button onClick={() => { setRegRole('Teacher'); setRegStep('form'); setError(''); }} className="w-full group px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-all flex items-center gap-4 text-left">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform"><User className="w-6 h-6" /></div>
                        <div><h3 className="text-white font-bold tracking-wider text-sm">Faculty Member</h3><p className="text-[10px] text-slate-400 mt-1">Join as a teacher</p></div>
                      </button>
                    </div>
                  )}

                  {regStep === 'form' && (
                    <form onSubmit={handleRegisterSubmit} className="space-y-3 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                      <div className="text-center mb-4">
                        <h2 className="text-lg font-black text-white uppercase tracking-tight">{regRole} Details</h2>
                      </div>

                      <input type="text" required value={regData.fullName} onChange={e=>setRegData({...regData, fullName: e.target.value})} placeholder="Full Name" className="w-full glass border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent" />
                      <input type="email" required value={regData.email} onChange={e=>setRegData({...regData, email: e.target.value})} placeholder="Email Address" className="w-full glass border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent" />
                      
                      {regRole === 'Student' && (
                        <>
                          <input type="text" required value={regData.course} onChange={e=>setRegData({...regData, course: e.target.value})} placeholder="Course (e.g. B.Tech CSE)" className="w-full glass border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent" />
                          <div className="flex gap-2">
                            <input type="text" required value={regData.semester} onChange={e=>setRegData({...regData, semester: e.target.value})} placeholder="Sem (e.g. 1st)" className="w-1/2 glass border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent" />
                            <input type="text" required value={regData.rollNumber} onChange={e=>setRegData({...regData, rollNumber: e.target.value})} placeholder="Roll No" className="w-1/2 glass border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent" />
                          </div>
                        </>
                      )}

                      {regRole === 'Teacher' && (
                        <>
                          <input type="text" required value={regData.department} onChange={e=>setRegData({...regData, department: e.target.value})} placeholder="Department (e.g. CS)" className="w-full glass border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent" />
                          <input type="text" required value={regData.mobile} onChange={e=>setRegData({...regData, mobile: e.target.value})} placeholder="Mobile Number" className="w-full glass border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent" />
                        </>
                      )}

                      <input type="password" required value={regData.password} onChange={e=>setRegData({...regData, password: e.target.value})} placeholder="Password" className="w-full glass border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent" />
                      <input type="password" required value={regData.confirmPassword} onChange={e=>setRegData({...regData, confirmPassword: e.target.value})} placeholder="Confirm Password" className="w-full glass border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent" />

                      <button type="submit" disabled={loading} className="w-full py-3 mt-2 rounded-xl bg-accent text-dark font-black uppercase tracking-widest text-xs hover:bg-accent/90 transition-all">{loading ? 'Processing...' : 'Create Account'}</button>
                      <button type="button" onClick={() => setRegStep('role_select')} className="w-full py-2 text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest">&larr; Back to Roles</button>
                    </form>
                  )}

                  {regStep === 'verify_otp' && (
                    <form onSubmit={handleVerifyOTP} className="space-y-4">
                      <div className="text-center mb-6">
                        <div className="w-14 h-14 mx-auto bg-green-500/10 border border-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-3"><Mail className="w-6 h-6" /></div>
                        <h2 className="text-xl font-black text-white uppercase tracking-tight">Verify Email</h2>
                        <p className="text-xs text-slate-400 mt-1">Enter the OTP sent to {regData.email}</p>
                      </div>
                      <input type="text" required value={verifyOtp} onChange={e=>setVerifyOtp(e.target.value)} placeholder="6-digit OTP" className="w-full glass border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent tracking-[0.5em] font-mono text-center" maxLength={6} />
                      <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-accent text-dark font-black uppercase tracking-widest text-xs hover:bg-accent/90 transition-all">{loading ? 'Verifying...' : 'Verify & Activate'}</button>
                    </form>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FrontPage;
