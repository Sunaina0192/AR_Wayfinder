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
  const [loginRole, setLoginRole] = useState(null);
  const [visitorName, setVisitorName] = useState('');
  const [visitorPurpose, setVisitorPurpose] = useState('');
  const [userId, setUserId] = useState('');
  const [passkey, setPasskey] = useState('');
  
  // Registration State
  const [regData, setRegData] = useState({
    fullName: '', fatherName: '', email: '', phoneNumber: '', course: '', semester: '', rollNumber: '', password: ''
  });
  const [regSuccess, setRegSuccess] = useState('');
  
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { user, login, registerStudent } = useAuth();

  React.useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);
  const handleCloseLogin = () => {
    setShowLogin(false);
    setActiveTab('login');
    setLoginRole(null);
    setVisitorName('');
    setVisitorPurpose('');
    setUserId('');
    setPasskey('');
    setErrors({});
    setRegSuccess('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validations
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
      navigate('/home');
    } catch (error) {
      console.error('Login error', error);
      setIsLoggingIn(false);
      alert(error.response?.data?.message || 'Login failed. Please verify credentials.');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-dark text-white selection:bg-accent/30 flex flex-col">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="SBBS University Campus" 
          className="w-full h-full object-cover scale-105 animate-pulse-slow opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/70 to-dark/95"></div>
        {/* Subtle accent glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      </div>

      {/* Top Navbar */}
      <div className="relative z-20">
        <Header onStartClick={() => setShowLogin(true)} />
      </div>

      {/* Hero Content */}
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

      {/* Login Modal Overlay */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-[fade-in_0.3s_ease-out]">
          <div className="absolute inset-0 bg-dark/80 backdrop-blur-xl" onClick={handleCloseLogin}></div>
          
          <div className="relative w-full max-w-md p-8 sm:p-10 rounded-[3rem] glass border-white/10 shadow-2xl animate-[slide-up_0.4s_ease-out] overflow-hidden group">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl group-hover:bg-accent/30 transition-colors duration-500 pointer-events-none"></div>
            
            <button 
              onClick={handleCloseLogin}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {!loginRole ? (
              <div className="space-y-6">
                <div className="flex mb-6 border-b border-white/10 relative">
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-accent transition-all duration-300 w-1/2 ${activeTab === 'register' ? 'translate-x-full' : 'translate-x-0'}`}></div>
                  <button 
                    onClick={() => setActiveTab('login')} 
                    className={`flex-1 pb-4 font-black uppercase tracking-widest text-sm transition-colors ${activeTab === 'login' ? 'text-accent' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => setActiveTab('register')} 
                    className={`flex-1 pb-4 font-black uppercase tracking-widest text-sm transition-colors ${activeTab === 'register' ? 'text-accent' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    Register
                  </button>
                </div>

                <div className="relative overflow-hidden min-h-[300px]">
                  <div className={`absolute w-full transition-transform duration-500 ease-in-out ${activeTab === 'login' ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="space-y-3">
                      <button onClick={() => { setLoginRole('Student'); setErrors({}); }} className="w-full group relative px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all flex items-center gap-4 text-left">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold tracking-wider text-sm">Student Login</h3>
                          <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-wider">Access academic records</p>
                        </div>
                      </button>

                      <button onClick={() => { setLoginRole('Teacher'); setErrors({}); }} className="w-full group relative px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/50 hover:bg-white/10 transition-all flex items-center gap-4 text-left">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold tracking-wider text-sm">Teacher Login</h3>
                          <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-wider">Manage academics</p>
                        </div>
                      </button>

                      <button onClick={() => { setLoginRole('Admin'); setErrors({}); }} className="w-full group relative px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all flex items-center gap-4 text-left">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold tracking-wider text-sm">Admin Login</h3>
                          <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-wider">Staff and faculty portal</p>
                        </div>
                      </button>

                      <button onClick={() => { setLoginRole('Visitor'); setErrors({}); }} className="w-full group relative px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-white/10 transition-all flex items-center gap-4 text-left">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold tracking-wider text-sm">New User / Visitor</h3>
                          <p className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-wider">Explore campus directly</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className={`absolute w-full transition-transform duration-500 ease-in-out ${activeTab === 'register' ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="text-center py-6 px-4">
                      <div className="w-16 h-16 mx-auto bg-orange-500/10 text-orange-400 rounded-2xl flex items-center justify-center mb-6">
                        <ClipboardList className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-black text-white uppercase tracking-tight mb-3">Apply for Admission</h3>
                      <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                        Start your journey at SBBSU. Fill out the comprehensive admission form, upload your documents, and track your application status.
                      </p>
                      <button 
                        onClick={() => navigate('/apply')}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent to-cyan-500 text-dark font-black uppercase tracking-[0.2em] text-xs hover:opacity-90 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                      >
                        Go to Admission Portal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Login Form */
              <div className="animate-[fade-in_0.3s_ease-out]">
                <div className="flex justify-center mb-6 mt-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${loginRole === 'Student' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : loginRole === 'Admin' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : loginRole === 'Teacher' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'} border`}>
                    {loginRole === 'Student' ? <GraduationCap className="w-8 h-8" /> : loginRole === 'Admin' ? <ShieldCheck className="w-8 h-8" /> : loginRole === 'Teacher' ? <User className="w-8 h-8" /> : <Users className="w-8 h-8" />}
                  </div>
                </div>
                
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-1">{loginRole} Login</h2>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  {loginRole === 'Visitor' ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Full Name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-500">
                            <User className="w-4 h-4" />
                          </div>
                          <input 
                            type="text" 
                            required
                            value={visitorName}
                            onChange={(e) => { setVisitorName(e.target.value); setErrors({...errors, visitorName: null}); }}
                            placeholder="Enter your name"
                            className={`w-full glass rounded-2xl pl-14 pr-6 py-4 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all shadow-inner bg-black/20 ${errors.visitorName ? 'border border-red-500 focus:border-red-500' : 'border-white/10 border focus:border-accent/50'}`}
                          />
                        </div>
                        {errors.visitorName && <p className="text-red-500 text-xs mt-1 ml-4">{errors.visitorName}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Purpose of Visit</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-500">
                            <Users className="w-4 h-4" />
                          </div>
                          <input 
                            type="text" 
                            required
                            value={visitorPurpose}
                            onChange={(e) => setVisitorPurpose(e.target.value)}
                            placeholder="e.g. Campus Tour, Meeting"
                            className="w-full glass border-white/10 rounded-2xl pl-14 pr-6 py-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-accent/50 transition-all shadow-inner bg-black/20"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">
                          {loginRole === 'Student' ? 'Student ID' : loginRole === 'Teacher' ? 'Teacher ID' : 'Email ID'}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-500">
                            <User className="w-4 h-4" />
                          </div>
                          <input 
                            type="text" 
                            required
                            value={userId}
                            onChange={(e) => { setUserId(e.target.value); setErrors({...errors, userId: null}); }}
                            placeholder={loginRole === 'Student' ? "Enter Student ID (e.g., STU260001)" : loginRole === 'Teacher' ? "Enter Teacher ID" : "Enter Email"}
                            className={`w-full glass rounded-2xl pl-14 pr-6 py-4 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all shadow-inner bg-black/20 ${errors.userId ? 'border border-red-500 focus:border-red-500' : 'border-white/10 border focus:border-accent/50'}`}
                          />
                        </div>
                        {errors.userId && <p className="text-red-500 text-xs mt-1 ml-4">{errors.userId}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Password</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-500">
                            <Lock className="w-4 h-4" />
                          </div>
                          <input 
                            type="password" 
                            required
                            value={passkey}
                            onChange={(e) => { setPasskey(e.target.value); setErrors({...errors, passkey: null}); }}
                            placeholder="Enter password"
                            className={`w-full glass rounded-2xl pl-14 pr-6 py-4 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all shadow-inner bg-black/20 ${errors.passkey ? 'border border-red-500 focus:border-red-500' : 'border-white/10 border focus:border-accent/50'}`}
                          />
                        </div>
                        {errors.passkey && <p className="text-red-500 text-xs mt-1 ml-4">{errors.passkey}</p>}
                      </div>
                    </>
                  )}

                  <button 
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full py-4 mt-4 rounded-2xl bg-white/10 border border-white/5 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-accent hover:text-dark hover:border-accent transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {isLoggingIn ? (
                      <div className="w-5 h-5 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      'Login'
                    )}
                  </button>
                  
                  <button 
                    type="button" 
                    onClick={() => {
                      setLoginRole(null);
                      setUserId('');
                      setPasskey('');
                      setVisitorName('');
                      setVisitorPurpose('');
                      setErrors({});
                    }} 
                    className="w-full py-3 mt-2 text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors"
                  >
                    &larr; Back to Role Selection
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FrontPage;
