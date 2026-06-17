import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { 
  User, Settings as SettingsIcon, Bell, Shield, 
  Smartphone, Monitor, Volume2, Map, Lock, LogOut,
  Moon, Sun, Check, ChevronRight, Loader2, AlertCircle, Save
} from 'lucide-react';
import { saveProfile } from '../api/profileApi';

const Settings = () => {
  const { user, logout, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const fileInputRef = useRef(null);
  
  // Profile settings state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success', 'error', or null
  const [toast, setToast] = useState(null); // { message, type } or null

  // Mock settings state
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState({ push: true, email: false, sms: true });
  const [arPrefs, setArPrefs] = useState({ voice: true, highContrast: false, haptic: true });

  // Sync state with authenticated user details
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || `${user.name?.toLowerCase().replace(/\s+/g, '.')}@sbbsu.ac.in`);
      setAvatar(user.avatar || '');
    }
  }, [user]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 819200) {
        showToast('File size must be under 800KB.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Name cannot be empty.', 'error');
      return;
    }
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const payload = {
        userId: user.id,
        name: name.trim(),
        email: email.trim(),
        avatar,
        department: user.department || ''
      };
      const updatedProfile = await saveProfile(payload);
      updateUser(updatedProfile);
      setSaveStatus('success');
      showToast('Settings saved successfully!');
      setTimeout(() => setSaveStatus(null), 2000);
    } catch (error) {
      console.error('Failed to save profile:', error);
      setSaveStatus('error');
      showToast(error.message || 'Failed to save settings.', 'error');
      setTimeout(() => setSaveStatus(null), 2000);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user || user.role === 'Visitor') {
    return <Navigate to="/" replace />;
  }

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  const Toggle = ({ checked, onChange }) => (
    <button 
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${checked ? 'bg-accent' : 'bg-slate-600'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto animate-fade-in-up">
        
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white tracking-wider mb-2">Settings</h1>
          <p className="text-slate-400 font-medium">Manage your account preferences and AR configuration.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 space-y-2 shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all font-bold ${
                  activeTab === tab.id 
                  ? 'bg-accent text-dark shadow-lg shadow-accent/20 translate-x-2' 
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </div>
                {activeTab === tab.id && <ChevronRight className="w-4 h-4" />}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden min-h-[500px]">
            
            {/* Account Tab */}
            {activeTab === 'account' && (
              <form onSubmit={handleSave} className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Personal Information</h2>
                  <div className="flex items-center gap-6 mb-6">
                    <img src={avatar || 'https://i.pravatar.cc/150?img=11'} alt="Profile" className="w-20 h-20 rounded-full border-2 border-accent/50 object-cover" />
                    <div>
                      <button type="button" onClick={handleTriggerUpload} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl transition-colors border border-white/10 mb-2">Change Avatar</button>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleAvatarChange} 
                        accept="image/*" 
                        className="hidden" 
                      />
                      <p className="text-xs text-slate-400">JPG, GIF or PNG. Max size of 800K</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-accent uppercase tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-accent uppercase tracking-widest">University ID</label>
                      <input type="text" value={user.id} disabled className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-slate-400 cursor-not-allowed" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-accent uppercase tracking-widest">Email Address</label>
                      <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors" 
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-3 bg-accent text-dark font-black rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : saveStatus === 'success' ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Save className="w-5 h-5" />
                    )}
                    {isSaving ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Display & Interface</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-accent/10 rounded-xl text-accent"><Moon className="w-5 h-5" /></div>
                        <div>
                          <p className="font-bold text-white">App Theme</p>
                          <p className="text-xs text-slate-400">Select your preferred color scheme</p>
                        </div>
                      </div>
                      <div className="flex bg-black/40 p-1 rounded-xl">
                        <button onClick={() => setTheme('light')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${theme === 'light' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>Light</button>
                        <button onClick={() => setTheme('dark')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${theme === 'dark' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}>Dark</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4 flex items-center gap-3">
                    <Map className="w-6 h-6 text-accent" /> AR Navigator Settings
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400"><Volume2 className="w-5 h-5" /></div>
                        <div>
                          <p className="font-bold text-white">Voice Guidance</p>
                          <p className="text-xs text-slate-400">Audio directions during AR navigation</p>
                        </div>
                      </div>
                      <Toggle checked={arPrefs.voice} onChange={() => setArPrefs({...arPrefs, voice: !arPrefs.voice})} />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400"><Smartphone className="w-5 h-5" /></div>
                        <div>
                          <p className="font-bold text-white">Haptic Feedback</p>
                          <p className="text-xs text-slate-400">Vibrate when approaching waypoints</p>
                        </div>
                      </div>
                      <Toggle checked={arPrefs.haptic} onChange={() => setArPrefs({...arPrefs, haptic: !arPrefs.haptic})} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Notification Channels</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors">
                      <div>
                        <p className="font-bold text-white">Push Notifications</p>
                        <p className="text-xs text-slate-400">Receive alerts directly on your device</p>
                      </div>
                      <Toggle checked={notifications.push} onChange={() => setNotifications({...notifications, push: !notifications.push})} />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors">
                      <div>
                        <p className="font-bold text-white">Email Notifications</p>
                        <p className="text-xs text-slate-400">Weekly digests and important updates</p>
                      </div>
                      <Toggle checked={notifications.email} onChange={() => setNotifications({...notifications, email: !notifications.email})} />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors">
                      <div>
                        <p className="font-bold text-white">SMS Alerts</p>
                        <p className="text-xs text-slate-400">Critical campus alerts and emergencies</p>
                      </div>
                      <Toggle checked={notifications.sms} onChange={() => setNotifications({...notifications, sms: !notifications.sms})} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-5 bg-accent/5 border border-accent/20 rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-accent/20 rounded-full text-accent">
                          <Lock className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-lg">Change Password</p>
                          <p className="text-sm text-slate-400">It's a good idea to use a strong password</p>
                        </div>
                      </div>
                      <button className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors border border-white/10">Update</button>
                    </div>

                    <div className="bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
                      <div className="p-4 bg-white/5 border-b border-white/5">
                        <p className="font-bold text-white">Active Sessions</p>
                      </div>
                      <div className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Monitor className="w-5 h-5 text-accent" />
                            <div>
                              <p className="text-sm font-bold text-white">Windows PC • Chrome</p>
                              <p className="text-xs text-slate-400">Jalandhar, India • Active Now</p>
                            </div>
                          </div>
                          <span className="flex items-center gap-1 text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded"><Check className="w-3 h-3" /> Current</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Smartphone className="w-5 h-5 text-slate-400" />
                            <div>
                              <p className="text-sm font-bold text-slate-300">iPhone 13 • Safari</p>
                              <p className="text-xs text-slate-500">Chandigarh, India • Yesterday at 10:45 AM</p>
                            </div>
                          </div>
                          <button className="text-xs font-bold text-red-400 hover:text-red-300">Revoke</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-red-500/10">
                   <button onClick={() => { logout(); window.location.href = '/'; }} className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-400 font-black rounded-xl hover:bg-red-500/20 transition-colors border border-red-500/20">
                     <LogOut className="w-5 h-5" /> Log Out of All Devices
                   </button>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-24 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 ${
          toast.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          {toast.type === 'success' ? <Check className="w-5 h-5 animate-bounce" /> : <AlertCircle className="w-5 h-5 animate-bounce" />}
          <span className="font-bold text-sm tracking-wide">{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default Settings;
