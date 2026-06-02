import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { ArrowRight, X, User, Lock, LogIn, GraduationCap, ShieldCheck, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const FrontPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loginRole, setLoginRole] = useState(null);
  const [visitorName, setVisitorName] = useState('');
  const [visitorPurpose, setVisitorPurpose] = useState('');
  const [userId, setUserId] = useState('');
  const [passkey, setPasskey] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { user, login } = useAuth();

  React.useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);
  const handleCloseLogin = () => {
    setShowLogin(false);
    setLoginRole(null);
    setVisitorName('');
    setVisitorPurpose('');
    setUserId('');
    setPasskey('');
    setErrors({});
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validations
    let newErrors = {};
    const lettersOnlyRegex = /^[a-zA-Z\s]+$/;
    const passkeyRegex = /^[\d\W_]+$/; // Only digits and special characters

    if (loginRole === 'Visitor') {
      if (!lettersOnlyRegex.test(visitorName)) {
        newErrors.visitorName = "Name must contain only letters.";
      }
    } else {
      if (!lettersOnlyRegex.test(userId)) {
        newErrors.userId = "Username must contain only letters.";
      }
      if (!passkeyRegex.test(passkey)) {
        newErrors.passkey = "Passkey must contain only numbers and special characters.";
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
      alert('Login failed. Please make sure the backend is running.');
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
          
          <div className="relative w-full max-w-md p-10 rounded-[3rem] glass border-white/10 shadow-2xl animate-[slide-up_0.4s_ease-out] overflow-hidden group">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl group-hover:bg-accent/30 transition-colors duration-500"></div>
            
            <button 
              onClick={handleCloseLogin}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {!loginRole ? (
              /* Role Selection */
              <div className="space-y-4">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Select Portal</h2>
                  <p className="text-xs text-slate-400 font-bold tracking-[0.2em] uppercase">Choose your access level</p>
                </div>

                <button onClick={() => { setLoginRole('Student'); setErrors({}); }} className="w-full group relative px-6 py-5 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/50 hover:bg-white/10 transition-all flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold tracking-wider">Student Login</h3>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">Access academic records</p>
                  </div>
                </button>

                <button onClick={() => { setLoginRole('Admin'); setErrors({}); }} className="w-full group relative px-6 py-5 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/50 hover:bg-white/10 transition-all flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold tracking-wider">Admin Login</h3>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">Staff and faculty portal</p>
                  </div>
                </button>

                <button onClick={() => { setLoginRole('Visitor'); setErrors({}); }} className="w-full group relative px-6 py-5 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/50 hover:bg-white/10 transition-all flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold tracking-wider">New User / Visitor</h3>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">Explore campus directly</p>
                  </div>
                </button>
              </div>
            ) : (
              /* Login Form */
              <div className="animate-[fade-in_0.3s_ease-out]">
                <div className="flex justify-center mb-6 mt-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${loginRole === 'Student' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : loginRole === 'Admin' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'} border`}>
                    {loginRole === 'Student' ? <GraduationCap className="w-8 h-8" /> : loginRole === 'Admin' ? <ShieldCheck className="w-8 h-8" /> : <Users className="w-8 h-8" />}
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
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Username</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-500">
                            <User className="w-4 h-4" />
                          </div>
                          <input 
                            type="text" 
                            required
                            value={userId}
                            onChange={(e) => { setUserId(e.target.value); setErrors({...errors, userId: null}); }}
                            placeholder="Enter Username"
                            className={`w-full glass rounded-2xl pl-14 pr-6 py-4 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all shadow-inner bg-black/20 ${errors.userId ? 'border border-red-500 focus:border-red-500' : 'border-white/10 border focus:border-accent/50'}`}
                          />
                        </div>
                        {errors.userId && <p className="text-red-500 text-xs mt-1 ml-4">{errors.userId}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">Passkey</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-500">
                            <Lock className="w-4 h-4" />
                          </div>
                          <input 
                            type="password" 
                            required
                            maxLength={6}
                            value={passkey}
                            onChange={(e) => { setPasskey(e.target.value); setErrors({...errors, passkey: null}); }}
                            placeholder="Enter passkey (max 6 chars)"
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
