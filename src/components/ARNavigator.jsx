import React, { useEffect, useRef, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { getLocationById, findShortestPath, generateDirections, campusLocations } from '../data/locations';
import { MapPin, Navigation, ChevronLeft, ChevronRight, Volume2, X, Compass, Radio, AlertTriangle, Play, Pause, Camera, Maximize, Minimize, RotateCcw, Zap } from 'lucide-react';
import MapView from './MapView';

const ARNavigator = ({ destination, onExit }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [path, setPath] = useState(null);
  const [directions, setDirections] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showAR, setShowAR] = useState(false);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [userHeading, setUserHeading] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [error, setError] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [facingMode, setFacingMode] = useState('environment');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const streamRef = useRef(null);
  const animationRef = useRef(null);
  const watchIdRef = useRef(null);
  const simIntervalRef = useRef(null);

  const destLocation = useMemo(() => getLocationById(destination), [destination]);

  useEffect(() => {
    if (destination) {
      const newPath = findShortestPath('entry-gate', destination);
      if (newPath) {
        setPath(newPath);
        setDirections(generateDirections(newPath));
        setCurrentStep(0);
      }
    }
  }, [destination]);

  useEffect(() => {
    const handleOrientation = (e) => {
      if (e.alpha !== null) {
        setUserHeading(e.alpha);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    
    if ("geolocation" in navigator) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (err) => console.warn('Geolocation error:', err),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      stopCamera();
      window.removeEventListener('deviceorientation', handleOrientation);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
      if (simIntervalRef.current) clearInterval(simIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (isVoiceEnabled && directions.length > 0 && currentStep < directions.length) {
      speakDirection();
    }
  }, [currentStep, directions]);

  const startCamera = async (mode = facingMode) => {
    setError(null);
    setIsTransitioning(true);
    
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setIsTransitioning(false);
      setError('Secure connection (HTTPS) or Localhost is required for camera access. Please check your browser address bar.');
      return;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    try {
      const constraints = {
        video: { 
          facingMode: mode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraStarted(true);
        setShowAR(true);
        setFacingMode(mode);
        
        setTimeout(() => setIsTransitioning(false), 300);
      }
    } catch (err) {
      setIsTransitioning(false);
      setError('Camera access denied. Please ensure you have granted permission and are using HTTPS.');
      console.error('Camera error:', err);
    }
  };

  const toggleCamera = () => {
    const newMode = facingMode === 'environment' ? 'user' : 'environment';
    startCamera(newMode);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Fullscreen error: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const resetARView = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    drawAROverlay();
    speakDirection();
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (simIntervalRef.current) {
      clearInterval(simIntervalRef.current);
      simIntervalRef.current = null;
    }
    setIsSimulating(false);
    setCameraStarted(false);
    setShowAR(false);
  };

  useEffect(() => {
    if (showAR && cameraStarted) {
      drawAROverlay();
    }
  }, [showAR, cameraStarted, currentStep, userHeading]);

  const drawAROverlay = () => {
    if (!canvasRef.current || !videoRef.current) return;
    const ctx = canvasRef.current.getContext('2d');

    const animate = () => {
      if (!canvasRef.current) return;
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      if (currentStep < directions.length) {
        const centerX = canvasRef.current.width / 2;
        const centerY = canvasRef.current.height / 2;
        const headingOffset = (userHeading % 360) / 10; 
        drawSmoothArrow(ctx, centerX - headingOffset, centerY + 100);
      }

      if (showAR) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (!animationRef.current) {
      animate();
    }
  };

  const drawSmoothArrow = (ctx, x, y) => {
    const time = Date.now() * 0.004;
    const bounce = Math.sin(time) * 15;
    const scale = 1 + Math.sin(time * 0.5) * 0.05;

    ctx.save();
    ctx.translate(x, y + bounce);
    ctx.scale(scale, scale);
    
    if (facingMode === 'user') {
      ctx.scale(-1, 1);
    }

    ctx.shadowBlur = 30;
    ctx.shadowColor = 'rgba(59, 130, 246, 0.8)';

    const gradient = ctx.createLinearGradient(0, -40, 0, 40);
    gradient.addColorStop(0, '#60A5FA');
    gradient.addColorStop(1, '#2563EB');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(0, -50);
    ctx.lineTo(-25, 0);
    ctx.lineTo(-12, 0);
    ctx.lineTo(-12, 45);
    ctx.lineTo(12, 45);
    ctx.lineTo(12, 0);
    ctx.lineTo(25, 0);
    ctx.closePath();
    ctx.fill();
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(0, 60, 40 * scale, 15 * scale, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.restore();
  };

  const speakDirection = () => {
    if (currentStep < directions.length && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(directions[currentStep].instruction);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const calculateETA = () => {
    const remainingSteps = directions.length - currentStep;
    const totalSeconds = remainingSteps * 25;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
  };

  const nextStep = () => {
    if (currentStep < directions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const finishNavigation = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    stopCamera();
    if (onExit) onExit();
  };

  if (!destination) return null;

  return createPortal(
    <div ref={containerRef} className="fixed inset-0 z-[9999] bg-black flex flex-col font-sans overflow-hidden select-none">
      <div className="flex-1 relative">
        {/* Always render video and canvas so refs are available, but hide them initially */}
        <video 
          ref={videoRef} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${cameraStarted && !isTransitioning ? 'opacity-100' : 'opacity-0'} ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`} 
          playsInline 
        />
        <canvas
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
          className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ${cameraStarted ? 'opacity-100' : 'opacity-0'}`}
        />

        {cameraStarted ? (
          <>
            <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-start z-20">
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <div className="px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center gap-2">
                    <Compass className="w-4 h-4 text-blue-400" style={{ transform: `rotate(${userHeading}deg)` }} />
                    <span className="text-[10px] text-white font-black uppercase tracking-widest">{Math.round(userHeading)}°</span>
                  </div>
                  <div className="px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${facingMode === 'environment' ? 'bg-blue-500' : 'bg-emerald-500'} animate-pulse`} />
                    <span className="text-[10px] text-white font-black uppercase tracking-widest">{facingMode === 'environment' ? 'Back Cam' : 'Front Cam'}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={toggleCamera}
                    className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 rounded-2xl text-white transition-all shadow-xl"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={resetARView}
                    className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 rounded-2xl text-white transition-all shadow-xl"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={toggleFullscreen}
                    className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 rounded-2xl text-white transition-all shadow-xl"
                  >
                    {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <button 
                onClick={finishNavigation}
                className="p-4 bg-red-500 text-white rounded-2xl shadow-2xl shadow-red-500/40 hover:scale-105 active:scale-95 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {directions.length > 0 && currentStep < directions.length && (
              <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-10">
                <div className="bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-7 shadow-2xl">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-blue-500/40 shrink-0">
                      <Navigation className="w-8 h-8 fill-current" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">Next Move</p>
                        <span className="text-white/40 text-[10px] font-bold">ETA: {calculateETA()}</span>
                      </div>
                      <h3 className="text-white text-xl font-black leading-tight mb-2">
                        {directions[currentStep].instruction}
                      </h3>
                      <div className="px-3 py-1 bg-white/10 rounded-full inline-block text-[10px] text-white/90 font-black uppercase tracking-wider">
                        {directions[currentStep].distance}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="absolute bottom-44 right-6 w-36 h-36 rounded-[2.5rem] border-2 border-white/20 shadow-2xl overflow-hidden backdrop-blur-md transition-all hover:scale-110 active:scale-95 group">
              <div className="w-full h-full scale-[0.4] origin-top-left -translate-x-14 -translate-y-10 pointer-events-none">
                <MapView selectedLocation={destination} activePath={path} />
              </div>
              <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-transparent transition-colors"></div>
            </div>

            {currentStep >= directions.length && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-2xl z-[60] p-6">
                <div className="bg-white rounded-[4rem] w-full max-w-sm p-12 text-center shadow-2xl border-8 border-blue-500/10">
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl">🏁</div>
                  <h2 className="text-4xl font-black text-slate-900 mb-4">You Made It!</h2>
                  <p className="text-slate-500 text-lg mb-10">Arrived at <span className="font-bold text-blue-600">{destLocation?.name}</span></p>
                  <button
                    onClick={finishNavigation}
                    className="w-full py-6 bg-blue-600 text-white text-xl font-black rounded-3xl shadow-2xl shadow-blue-500/30 hover:scale-105 transition active:scale-95"
                  >
                    Finish Journey
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-black text-white p-8 text-center relative z-10">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10">
              <div className="w-32 h-32 bg-white/5 backdrop-blur-3xl rounded-[3.5rem] flex items-center justify-center mx-auto mb-10 border border-white/10 shadow-2xl">
                <Zap className="w-16 h-16 text-blue-400 fill-blue-400/20" />
              </div>
              
              <h1 className="text-6xl font-black mb-6 tracking-tighter leading-none">Activate AR</h1>
              <p className="text-slate-400 text-xl mb-12 max-w-md font-medium leading-relaxed">
                Step into the future of campus navigation. Using your camera to guide you to <span className="text-blue-400 font-bold">{destLocation?.name}</span>.
              </p>

              {error && (
                <div className="mb-10 p-6 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center gap-4 text-left max-w-sm mx-auto">
                  <AlertTriangle className="w-8 h-8 text-red-500 shrink-0" />
                  <p className="text-red-400 text-sm font-bold leading-snug">{error}</p>
                </div>
              )}

              <div className="flex flex-col w-full max-w-xs gap-5 mx-auto">
                <button
                  onClick={() => startCamera('environment')}
                  disabled={isTransitioning}
                  className="w-full py-6 bg-blue-600 text-white font-black rounded-[2.2rem] text-2xl shadow-2xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isTransitioning ? (
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Play className="w-7 h-7 fill-current" />
                  )}
                  {isTransitioning ? 'Initializing...' : 'Launch AR'}
                </button>
                <button
                  onClick={onExit}
                  className="py-4 text-white/30 font-bold hover:text-white transition-colors"
                >
                  Back to Campus Overview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {cameraStarted && (
        <div className="bg-black/90 backdrop-blur-3xl border-t border-white/10 px-8 py-10 pb-14 shadow-[0_-20px_50px_rgba(0,0,0,0.8)] z-20">
          <div className="flex items-center gap-6 mb-10">
            <div className="flex-1 bg-white/5 h-4 rounded-full overflow-hidden p-0.5 border border-white/5">
              <div
                className="h-full bg-linear-to-r from-blue-600 via-indigo-500 to-blue-400 rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(59,130,246,0.8)]"
                style={{ width: `${((currentStep + 1) / Math.max(directions.length, 1)) * 100}%` }}
              />
            </div>
            <span className="text-white/40 text-xs font-black tabular-nums tracking-widest uppercase shrink-0">
              {currentStep + 1} / {Math.max(directions.length, 1)}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-5">
            <button
              onClick={previousStep}
              disabled={currentStep === 0}
              className="h-20 rounded-3xl bg-white/5 border border-white/10 text-white transition hover:bg-white/10 active:scale-90 disabled:opacity-10 flex flex-col items-center justify-center gap-2"
            >
              <ChevronLeft className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-wider">Prev</span>
            </button>
            
            <button
              onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
              className={`h-20 rounded-3xl border transition-all active:scale-90 flex flex-col items-center justify-center gap-2 ${
                isVoiceEnabled 
                  ? 'bg-blue-600/20 border-blue-500 text-blue-400 shadow-xl shadow-blue-500/10' 
                  : 'bg-white/5 border-white/10 text-white/30'
              }`}
            >
              <Volume2 className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-wider">{isVoiceEnabled ? 'Voice On' : 'Muted'}</span>
            </button>

            <button
              onClick={() => {
                if (isSimulating) {
                  setIsSimulating(false);
                  if (simIntervalRef.current) {
                    clearInterval(simIntervalRef.current);
                    simIntervalRef.current = null;
                  }
                } else {
                  setIsSimulating(true);
                  simIntervalRef.current = setInterval(() => {
                    setCurrentStep(s => {
                      if (s < directions.length - 1) return s + 1;
                      if (simIntervalRef.current) {
                        clearInterval(simIntervalRef.current);
                        simIntervalRef.current = null;
                      }
                      setIsSimulating(false);
                      return s;
                    });
                  }, 4000);
                }
              }}
              className={`h-20 rounded-3xl border transition-all active:scale-90 flex flex-col items-center justify-center gap-2 ${
                isSimulating 
                  ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400' 
                  : 'bg-white/5 border-white/10 text-white/30'
              }`}
            >
              {isSimulating ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              <span className="text-[10px] font-black uppercase tracking-wider">{isSimulating ? 'Active' : 'Auto'}</span>
            </button>

            <button
              onClick={nextStep}
              disabled={currentStep >= directions.length - 1}
              className="h-20 rounded-3xl bg-blue-600 text-white font-black shadow-2xl shadow-blue-500/40 hover:bg-blue-700 transition active:scale-90 disabled:opacity-10 flex flex-col items-center justify-center gap-2"
            >
              <ChevronRight className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-wider">Next</span>
            </button>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};

export default ARNavigator;
