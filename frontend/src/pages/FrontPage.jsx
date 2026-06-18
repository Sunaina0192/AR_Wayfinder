import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { ArrowRight, X, User, Lock, LogIn, GraduationCap, ShieldCheck, Users, ClipboardList } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const FrontPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  
  const [showRegPopup, setShowRegPopup] = useState(false);
  const [regCredentials, setRegCredentials] = useState(null);
  
  // Login State
  const [loginRole, setLoginRole] = useState(null);
  const [visitorName, setVisitorName] = useState('');
  const [visitorPurpose, setVisitorPurpose] = useState('');
  const [userId, setUserId] = useState('');
  const [passkey, setPasskey] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Registration State
  const [regRole, setRegRole] = useState(null);
  const [regData, setRegData] = useState({
    fullName: '', email: '', course: '', semester: '', rollNumber: '', password: '', phoneNumber: '', fatherName: '', motherName: '', // Student
    name: '', department: '', mobile: '', // Teacher & Admin
  });
  const [regSuccess, setRegSuccess] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate();
  const { user, login, register } = useAuth();

  React.useEffect(() => {
    if (user && !showRegPopup) {
      if (user.role === 'Student') navigate('/home');
      else if (user.role === 'Teacher') navigate('/teacher/dashboard');
      else if (user.role === 'Admin') navigate('/admin/dashboard');
      else navigate('/home');
    }
  }, [user, navigate, showRegPopup]);

  const handleCloseLogin = () => {
    setShowLogin(false);
    setActiveTab('login');
    setLoginRole(null);
    setRegRole(null);
    setVisitorName('');
    setVisitorPurpose('');
    setUserId('');
    setPasskey('');
    setShowRegPopup(false);
    setRegCredentials(null);
    setErrors({});
    setRegSuccess('');
    setRegData({
      fullName: '', email: '', course: '', semester: '', rollNumber: '', password: '', phoneNumber: '', fatherName: '', motherName: '',
      name: '', department: '', mobile: ''
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let newErrors = {};
    const lettersOnlyRegex = /^[a-zA-Z\s]+$/;
    
    if (loginRole === 'Visitor') {
      if (!lettersOnlyRegex.test(visitorName)) {
        newErrors.visitorName = "Name must contain only letters.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoggingIn(true);
    
    const extraData = loginRole === 'Visitor' 
      ? { name: visitorName || 'Guest Visitor', purpose: visitorPurpose } 
      : { userId, password: passkey };
      
    try {
      await login(loginRole, extraData);
      setIsLoggingIn(false);
      if (loginRole === 'Student') navigate('/home');
      else if (loginRole === 'Teacher') navigate('/teacher/dashboard');
      else if (loginRole === 'Admin') navigate('/admin/dashboard');
      else navigate('/home');
    } catch (error) {
      console.error('Login error', error);
      setIsLoggingIn(false);
      setErrors({ submit: error.response?.data?.message || 'Login failed. Please verify credentials.' });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    setRegSuccess('');
    setIsRegistering(true);
    
    // Prepare data based on role
    let submitData = { role: regRole, password: regData.password, email: regData.email };
    if (regRole === 'Student') {
      submitData = { ...submitData, fullName: regData.fullName, course: regData.course, semester: regData.semester, rollNumber: regData.rollNumber, phoneNumber: regData.phoneNumber, fatherName: regData.fatherName, motherName: regData.motherName };
    } else if (regRole === 'Teacher') {
      submitData = { ...submitData, name: regData.name, department: regData.department, mobile: regData.mobile };
    } else if (regRole === 'Admin') {
      submitData = { ...submitData, name: regData.name };
    }

    try {
      const res = await register(submitData);
      setIsRegistering(false);
      setRegSuccess('Registration successful!');
      
      let generatedId = '';
      if (regRole === 'Admin') generatedId = submitData.email;
      else generatedId = res.user?.id || '';

      setRegCredentials({
        role: regRole,
        id: generatedId,
        password: submitData.password
      });
      setShowRegPopup(true);
      
    } catch (error) {
      console.error('Registration error', error);
      setIsRegistering(false);
      setErrors({ submit: error.response?.data?.message || 'Registration failed.' });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-dark text-white selection:bg-accent/30 flex flex-col">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="SBBS University Campus" 
          className="w-full h-full object-cover scale-105 animate-pulse-slow opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/70 to-dark/95"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      </div>

      <div className="relative z-20">
        <Header onStartClick={() => setShowLogin(true)} />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center -mt-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8 animate-float shadow-xl backdrop-blur-md">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Welcome to the Future</span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white mb-4 sm:mb-6 tracking-tighter uppercase leading-none drop-shadow-2xl">
          Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">SBBSU</span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed mb-8 sm:mb-12 drop-shadow-lg px-2">
          Experience world-class education, cutting-edge research, and an immersive AR-guided campus environment. Your journey begins here.
        </p>
      </div>

      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-[fade-in_0.3s_ease-out]">
          <div className="absolute inset-0 bg-dark/80 backdrop-blur-xl" onClick={handleCloseLogin}></div>
          
          <div className="relative w-full max-w-md p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] glass border-white/10 shadow-2xl animate-[slide-up_0.4s_ease-out] overflow-hidden group max-h-[90vh] flex flex-col">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl group-hover:bg-accent/30 transition-colors duration-500 pointer-events-none"></div>
            
            <button onClick={handleCloseLogin} className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all z-10">
              <X className="w-5 h-5" />
            </button>

            <div className="flex mb-6 border-b border-white/10 relative shrink-0">
              <div className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 w-1/2 ${activeTab === 'register' ? 'translate-x-full' : 'translate-x-0'}`}></div>
              <button onClick={() => { setActiveTab('login'); setLoginRole(null); setRegRole(null); setErrors({}); }} className={`flex-1 pb-4 font-black uppercase tracking-widest text-xs sm:text-sm transition-colors ${activeTab === 'login' ? 'text-accent' : 'text-slate-500 hover:text-slate-300'}`}>Login</button>
              <button onClick={() => { setActiveTab('register'); setLoginRole(null); setRegRole(null); setErrors({}); }} className={`flex-1 pb-4 font-black uppercase tracking-widest text-xs sm:text-sm transition-colors ${activeTab === 'register' ? 'text-accent' : 'text-slate-500 hover:text-slate-300'}`}>Register</button>
            </div>

            <div className="relative overflow-hidden flex-1 overflow-y-auto custom-scrollbar" style={{ minHeight: '350px' }}>
              
              {/* === LOGIN TAB === */}
              <div className={`absolute w-full transition-transform duration-500 ease-in-out ${activeTab === 'login' ? 'translate-x-0' : '-translate-x-full'}`}>
                {!loginRole ? (
                  <div className="space-y-3">
                    {/* Role Selection for Login */}
                    <button onClick={() => { setLoginRole('Student'); setErrors({}); }} className="w-full group relative px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all flex items-center gap-4 text-left">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0"><GraduationCap className="w-5 h-5" /></div>
                      <div><h3 className="text-white font-bold tracking-wider text-sm">Student Login</h3><p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-wider">Access academic records</p></div>
                    </button>
                    <button onClick={() => { setLoginRole('Teacher'); setErrors({}); }} className="w-full group relative px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 hover:bg-white/10 transition-all flex items-center gap-4 text-left">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0"><User className="w-5 h-5" /></div>
                      <div><h3 className="text-white font-bold tracking-wider text-sm">Teacher Login</h3><p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-wider">Manage academics</p></div>
                    </button>
                    <button onClick={() => { setLoginRole('Admin'); setErrors({}); }} className="w-full group relative px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all flex items-center gap-4 text-left">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0"><ShieldCheck className="w-5 h-5" /></div>
                      <div><h3 className="text-white font-bold tracking-wider text-sm">Admin Login</h3><p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-wider">Staff and faculty portal</p></div>
                    </button>
                    <button onClick={() => navigate('/explore-campus')} className="w-full group relative px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10 transition-all flex items-center gap-4 text-left">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0"><Users className="w-5 h-5" /></div>
                      <div><h3 className="text-white font-bold tracking-wider text-sm">New User / Visitor</h3><p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-wider">Explore campus directly</p></div>
                    </button>
                  </div>
                ) : (
                  <div className="animate-[fade-in_0.3s_ease-out]">
                    <div className="flex justify-center mb-6 mt-2">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${loginRole === 'Student' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : loginRole === 'Admin' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : loginRole === 'Teacher' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'} border`}>
                        {loginRole === 'Student' ? <GraduationCap className="w-6 h-6" /> : loginRole === 'Admin' ? <ShieldCheck className="w-6 h-6" /> : loginRole === 'Teacher' ? <User className="w-6 h-6" /> : <Users className="w-6 h-6" />}
                      </div>
                    </div>
                    
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-black text-white uppercase tracking-tight mb-1">{loginRole} Login</h2>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                      {errors.submit && <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-400 rounded-xl text-xs font-bold text-center">{errors.submit}</div>}
                      
                      {loginRole === 'Visitor' ? (
                        <>
                          <div>
                            <input type="text" required value={visitorName} onChange={(e) => setVisitorName(e.target.value)} placeholder="Full Name" className="w-full glass border-white/10 rounded-xl px-5 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-accent/50" />
                          </div>
                          <div>
                            <input type="text" required value={visitorPurpose} onChange={(e) => setVisitorPurpose(e.target.value)} placeholder="Purpose of Visit" className="w-full glass border-white/10 rounded-xl px-5 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-accent/50" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <input type="text" required value={userId} onChange={(e) => setUserId(e.target.value)} placeholder={loginRole === 'Student' ? "Student ID" : loginRole === 'Teacher' ? "Teacher ID" : "Email ID"} className="w-full glass border-white/10 rounded-xl px-5 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-accent/50" />
                          </div>
                          <div>
                            <input type="password" required value={passkey} onChange={(e) => setPasskey(e.target.value)} placeholder="Password" className="w-full glass border-white/10 rounded-xl px-5 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-accent/50" />
                          </div>
                        </>
                      )}

                      <button type="submit" disabled={isLoggingIn} className="w-full py-3 mt-2 rounded-xl bg-white/10 border border-white/5 text-white font-black uppercase tracking-widest text-xs hover:bg-accent hover:text-dark hover:border-accent transition-all disabled:opacity-50 flex items-center justify-center h-12">
                        {isLoggingIn ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div> : 'Login'}
                      </button>
                      <button type="button" onClick={() => { setLoginRole(null); setErrors({}); }} className="w-full py-2 text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest">&larr; Back to Role Selection</button>
                    </form>
                  </div>
                )}
              </div>

              {/* === REGISTER TAB === */}
              <div className={`absolute w-full transition-transform duration-500 ease-in-out ${activeTab === 'register' ? 'translate-x-0' : 'translate-x-full'}`}>
                {!regRole ? (
                  <div className="space-y-3">
                    <button onClick={() => navigate('/apply')} className="w-full group relative px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all flex items-center gap-4 text-left">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0"><GraduationCap className="w-5 h-5" /></div>
                      <div><h3 className="text-white font-bold tracking-wider text-sm">Register as Student</h3><p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-wider">Quick student setup</p></div>
                    </button>
                    <button onClick={() => { setRegRole('Teacher'); setErrors({}); }} className="w-full group relative px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 hover:bg-white/10 transition-all flex items-center gap-4 text-left">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0"><User className="w-5 h-5" /></div>
                      <div><h3 className="text-white font-bold tracking-wider text-sm">Register as Teacher</h3><p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-wider">Faculty onboarding</p></div>
                    </button>
                    <button onClick={() => { setRegRole('Admin'); setErrors({}); }} className="w-full group relative px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all flex items-center gap-4 text-left">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0"><ShieldCheck className="w-5 h-5" /></div>
                      <div><h3 className="text-white font-bold tracking-wider text-sm">Register as Admin</h3><p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-wider">Staff onboarding</p></div>
                    </button>
                  </div>
                ) : (
                  <div className="animate-[fade-in_0.3s_ease-out]">
                    <div className="text-center mb-4">
                      <h2 className="text-lg font-black text-white uppercase tracking-tight mb-1">{regRole} Registration</h2>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {regSuccess && <div className="p-3 bg-green-500/20 border border-green-500/50 text-green-400 rounded-xl text-xs font-bold text-center">{regSuccess}</div>}
                      {errors.submit && <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-400 rounded-xl text-xs font-bold text-center">{errors.submit}</div>}
                      
                      {/* Common Email & Password */}
                      <input type="email" required value={regData.email} onChange={(e) => setRegData({...regData, email: e.target.value})} placeholder="Email Address" className="w-full glass border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-accent/50" />
                      
                      {/* Dynamic Fields */}
                      {regRole === 'Student' && (
                        <>
                          <input type="text" required value={regData.fullName} onChange={(e) => setRegData({...regData, fullName: e.target.value})} placeholder="Full Name" className="w-full glass border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-accent/50" />
                          <input type="text" required value={regData.rollNumber} onChange={(e) => setRegData({...regData, rollNumber: e.target.value})} placeholder="Roll Number" className="w-full glass border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-accent/50" />
                          <input type="text" required value={regData.course} onChange={(e) => setRegData({...regData, course: e.target.value})} placeholder="Course (e.g. B.Tech CSE)" className="w-full glass border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-accent/50" />
                          <input type="text" required value={regData.semester} onChange={(e) => setRegData({...regData, semester: e.target.value})} placeholder="Semester (e.g. 1st)" className="w-full glass border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-accent/50" />
                          <input type="text" required value={regData.phoneNumber} onChange={(e) => setRegData({...regData, phoneNumber: e.target.value})} placeholder="Phone Number" className="w-full glass border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-accent/50" />
                          <input type="text" required value={regData.fatherName} onChange={(e) => setRegData({...regData, fatherName: e.target.value})} placeholder="Father's Name" className="w-full glass border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-accent/50" />
                          <input type="text" required value={regData.motherName} onChange={(e) => setRegData({...regData, motherName: e.target.value})} placeholder="Mother's Name" className="w-full glass border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-accent/50" />
                        </>
                      )}

                      {regRole === 'Teacher' && (
                        <>
                          <input type="text" required value={regData.name} onChange={(e) => setRegData({...regData, name: e.target.value})} placeholder="Full Name" className="w-full glass border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-accent/50" />
                          <input type="text" required value={regData.department} onChange={(e) => setRegData({...regData, department: e.target.value})} placeholder="Department (e.g. Computer Science)" className="w-full glass border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-accent/50" />
                          <input type="text" required value={regData.mobile} onChange={(e) => setRegData({...regData, mobile: e.target.value})} placeholder="Mobile Number" className="w-full glass border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-accent/50" />
                        </>
                      )}

                      {regRole === 'Admin' && (
                        <>
                          <input type="text" required value={regData.name} onChange={(e) => setRegData({...regData, name: e.target.value})} placeholder="Full Name" className="w-full glass border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-accent/50" />
                        </>
                      )}

                      <input type="password" required value={regData.password} onChange={(e) => setRegData({...regData, password: e.target.value})} placeholder="Password" className="w-full glass border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-accent/50" />

                      <button type="submit" disabled={isRegistering} className="w-full py-3 mt-2 rounded-xl bg-accent text-dark font-black uppercase tracking-widest text-xs hover:bg-accent/90 transition-all disabled:opacity-50 flex items-center justify-center h-12">
                        {isRegistering ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div> : 'Complete Registration'}
                      </button>
                      <button type="button" onClick={() => { setRegRole(null); setErrors({}); }} className="w-full py-2 text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest">&larr; Back to Role Selection</button>
                    </form>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {showRegPopup && regCredentials && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 animate-[fade-in_0.3s_ease-out]">
          <div className="absolute inset-0 bg-dark/90 backdrop-blur-xl"></div>
          <div className="relative w-full max-w-md p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] glass border-white/10 shadow-2xl animate-[slide-up_0.4s_ease-out] overflow-hidden text-center max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Registration Successful!</h2>
            <p className="text-sm text-slate-300 mb-8">Please save your login credentials for future access.</p>
            
            <div className="bg-black/30 border border-white/5 rounded-2xl p-6 text-left space-y-4 mb-8">
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Your Login ID</p>
                <p className="text-lg font-mono text-accent font-black tracking-wider bg-white/5 px-4 py-2 rounded-xl">{regCredentials.id}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Your Password</p>
                <p className="text-lg font-mono text-white tracking-wider bg-white/5 px-4 py-2 rounded-xl">{regCredentials.password}</p>
              </div>
            </div>

            <button onClick={() => setShowRegPopup(false)} className="w-full py-4 rounded-xl bg-accent text-dark font-black uppercase tracking-widest text-sm hover:bg-accent/90 transition-all">
              Proceed to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FrontPage;
