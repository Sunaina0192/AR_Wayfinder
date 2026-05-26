import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ChevronLeft, AlertCircle, History as HistoryIcon, Clock, Compass } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const History = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const loadHistory = async () => {
      try {
        setError(null);
        const response = await fetch(`/api/history?userId=${encodeURIComponent(user.id)}`);
        if (!response.ok) {
          throw new Error('Failed to load history');
        }
        const data = await response.json();
        setHistory(data);
      } catch (err) {
        console.error(err);
        setError('Could not load history. Backend may be offline.');
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [user]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-dark text-white pt-24 pb-20 selection:bg-accent/30 selection:text-white relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-accent/10 rounded-full blur-[150px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <button
              onClick={() => navigate(-1)}
              className="mt-1 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent/30 hover:text-accent transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-4">
                <HistoryIcon className="w-4 h-4 text-accent" />
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent">Activity Log</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
                Navigation <span className="text-accent">History</span>
              </h1>
              <p className="text-slate-400 mt-3 text-lg font-medium leading-relaxed max-w-xl">
                Review your recent campus routes and quickly open them again in the Campus Navigator.
              </p>
            </div>
          </div>
        </div>

        {/* Grid Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-[2.5rem] bg-white/5 border border-white/5 p-8 shadow-2xl backdrop-blur-3xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">Recent Routes</h2>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  {history.length} Saved Records
                </span>
              </div>

              {error && (
                <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-black text-red-400 uppercase tracking-wider">{error}</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Ensure the backend server is running correctly: <code className="bg-white/5 px-2 py-0.5 rounded text-white border border-white/5">npm run server</code>
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <div className="animate-spin w-10 h-10 border-2 border-accent border-t-transparent rounded-full"></div>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading activity logs...</p>
                  </div>
                ) : history.length > 0 ? (
                  history.map((record) => (
                    <button
                      key={`${record.id}-${record.createdAt}`}
                      onClick={() => navigate('/navigator', { state: { destination: record.destinationId } })}
                      className="w-full text-left rounded-[2rem] border border-white/5 p-6 bg-white/5 hover:bg-accent/5 hover:border-accent/30 hover:scale-[1.01] transition-all duration-300 relative group flex items-center justify-between gap-6"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-dark transition-all duration-300">
                          <Compass className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-lg font-black text-white group-hover:text-accent transition-colors">{record.name}</p>
                          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mt-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{new Date(record.createdAt).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <span className="shrink-0 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:bg-accent group-hover:text-dark group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300">
                        Open Route
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="rounded-[2rem] bg-white/5 border border-white/5 p-12 text-center space-y-6">
                    <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-600">
                      <HistoryIcon className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-black text-white uppercase tracking-tight">No Saved Routes Yet</p>
                      <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-md mx-auto">
                        Use the Campus Navigator to plan your first AR navigation route, and it will be recorded here automatically.
                      </p>
                    </div>
                    <button
                      onClick={() => navigate('/navigator')}
                      className="px-8 py-4 rounded-2xl bg-accent text-dark font-black uppercase tracking-widest text-xs hover:bg-white hover:scale-105 transition-all shadow-lg shadow-accent/15"
                    >
                      Go to Navigator
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column Context Panels */}
          <div className="space-y-6">
            <div className="rounded-[2.5rem] bg-white/5 border border-white/5 p-8 shadow-2xl backdrop-blur-3xl space-y-4">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Why history helps</h3>
              <p className="text-slate-400 font-medium leading-relaxed text-sm">
                Your route history keeps a secure log of your searched campuses, allowing you to instantly reopen any previous AR guidance mapping session.
              </p>
            </div>
            <div className="rounded-[2.5rem] bg-white/5 border border-white/5 p-8 shadow-2xl backdrop-blur-3xl space-y-4">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Next upgrade</h3>
              <p className="text-slate-400 font-medium leading-relaxed text-sm">
                Future updates will bring high-precision GPS tracking logs, custom bookmarking, and offline-compatible campus route check-in history.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
