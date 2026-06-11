import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { getLocationById, findShortestPath, generateDirections } from '../data/locations';
/* eslint-disable react-hooks/set-state-in-effect */
import { MapPin, Navigation, ChevronLeft, ChevronRight, Volume2, VolumeX, X, Compass, Radio, AlertTriangle, Play, Pause, Camera, Maximize, Minimize, RotateCcw, Zap, ArrowUp } from 'lucide-react';
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
  const userLocationRef = useRef(null);

  const destLocation = useMemo(() => getLocationById(destination), [destination]);

  const stopCamera = useCallback(() => {
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
  }, []);

  const drawSmoothArrow = useCallback((ctx, x, y, scaleMult = 1, opacity = 1) => {
    const time = Date.now() * 0.004;
    const bounce = Math.sin(time) * 5 * scaleMult;
    const scale = (1 + Math.sin(time * 0.5) * 0.05) * scaleMult;

    ctx.save();
    ctx.translate(x, y + bounce);
    ctx.scale(scale, scale);
    ctx.globalAlpha = opacity;

    if (facingMode === 'user') {
      ctx.scale(-1, 1);
    }

    ctx.shadowBlur = 15 * scaleMult;
    ctx.shadowColor = 'rgba(59, 130, 246, 0.8)';

    const gradient = ctx.createLinearGradient(0, -30, 0, 30);
    gradient.addColorStop(0, '#60A5FA');
    gradient.addColorStop(1, '#0284C7');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(0, -30);
    ctx.lineTo(40, 30);
    ctx.lineTo(20, 30);
    ctx.lineTo(0, 0);
    ctx.lineTo(-20, 30);
    ctx.lineTo(-40, 30);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }, [facingMode]);

  const drawAROverlay = useCallback(() => {
    if (!canvasRef.current || !videoRef.current) return;
    const ctx = canvasRef.current.getContext('2d');

    const animate = () => {
      if (!canvasRef.current) return;
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      if (currentStep < directions.length) {
        const centerX = canvasRef.current.width / 2;
        const centerY = canvasRef.current.height / 2 + 150;
        const headingOffset = (userHeading % 360) / 10;
        
        const timeOffset = (Date.now() % 2000) / 2000; 
        for (let i = 5; i >= 0; i--) {
          const progress = (i + timeOffset) / 5; 
          if (progress > 1) continue;
          
          const scaleMult = 1 - (progress * 0.7); 
          const yOffset = progress * 300; 
          const opacity = 1 - progress; 
          
          drawSmoothArrow(ctx, centerX - headingOffset, centerY - yOffset, scaleMult, opacity);
        }
      }

      if (showAR) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (!animationRef.current) {
      animate();
    }
  }, [currentStep, directions.length, userHeading, showAR, drawSmoothArrow]);

  const speakDirection = useCallback(() => {
    if (currentStep < directions.length && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(directions[currentStep].instruction);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  }, [currentStep, directions]);

  const resetARView = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    drawAROverlay();
    speakDirection();
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
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
          userLocationRef.current = { lat: latitude, lng: longitude };
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
  }, [stopCamera]);

  useEffect(() => {
    if (isVoiceEnabled && directions.length > 0 && currentStep < directions.length) {
      speakDirection();
    }
  }, [currentStep, directions, isVoiceEnabled, speakDirection]);

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

  useEffect(() => {
    if (showAR && cameraStarted) {
      drawAROverlay();
    }
  }, [showAR, cameraStarted, drawAROverlay]);

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
            {/* Top-Left: Direction Box */}
            {directions.length > 0 && currentStep < directions.length && (
              <div className="absolute top-8 left-6 z-20 flex items-center gap-4 bg-[#1a1a1a] rounded-3xl p-4 pr-6 shadow-2xl border border-white/5">
                <div className="w-12 h-12 flex items-center justify-center bg-transparent">
                  <ArrowUp className="w-10 h-10 text-white font-bold" />
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold leading-tight">{directions[currentStep].instruction}</h3>
                  <p className="text-white/70 text-sm font-medium mt-1">{directions[currentStep].distance}</p>
                </div>
              </div>
            )}

            {/* Top-Right: MapView */}
            <div className="absolute top-8 right-6 z-20 flex flex-col items-end gap-4">
              <button 
                onClick={finishNavigation}
                className="p-3 bg-red-500/90 hover:bg-red-500 text-white rounded-full shadow-2xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-40 h-40 bg-[#ebe5df] rounded-[2rem] border-4 border-[#1a1a1a] shadow-2xl overflow-hidden relative">
                <div className="absolute inset-0 w-[400px] h-[300px] scale-[0.4] origin-top-left -translate-x-10 -translate-y-6 pointer-events-none">
                  <MapView selectedLocation={destination} activePath={path} />
                </div>
                {/* Overlay pointer on map */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                </div>
              </div>
            </div>

            {/* Bottom-Left: Tools */}
            <div className="absolute bottom-8 left-6 z-20 flex gap-4">
              <div className="w-14 h-14 bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-2xl border border-white/5">
                 <Compass className="w-7 h-7 text-white" style={{ transform: `rotate(${userHeading}deg)` }} />
              </div>
              <button onClick={() => setIsVoiceEnabled(!isVoiceEnabled)} className="w-14 h-14 bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-2xl border border-white/5 transition-all active:scale-90">
                 {isVoiceEnabled ? <Volume2 className="w-7 h-7 text-white" /> : <VolumeX className="w-7 h-7 text-white" />}
              </button>
              <button onClick={() => {
                if (isSimulating) {
                  setIsSimulating(false);
                  if (simIntervalRef.current) { clearInterval(simIntervalRef.current); simIntervalRef.current = null; }
                } else {
                  setIsSimulating(true);
                  simIntervalRef.current = setInterval(() => {
                    setCurrentStep(s => {
                      if (s < directions.length - 1) return s + 1;
                      if (simIntervalRef.current) { clearInterval(simIntervalRef.current); simIntervalRef.current = null; }
                      setIsSimulating(false);
                      return s;
                    });
                  }, 4000);
                }
              }} className="w-14 h-14 bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-2xl border border-white/5 transition-all active:scale-90">
                 {isSimulating ? <Pause className="w-7 h-7 text-emerald-400" /> : <Play className="w-7 h-7 text-white" />}
              </button>
            </div>

            {/* Bottom-Right: Distance & Time */}
            {directions.length > 0 && currentStep < directions.length && (
              <div className="absolute bottom-8 right-6 z-20 bg-[#1a1a1a] rounded-3xl p-5 px-7 shadow-2xl border border-white/5 flex flex-col gap-1">
                <p className="text-white text-sm font-bold tracking-wide">Distance : <span className="font-normal text-white/80">{directions[currentStep].distance}</span></p>
                <p className="text-white text-sm font-bold tracking-wide">Time : <span className="font-normal text-white/80">{calculateETA()}</span></p>
              </div>
            )}

            {/* Hidden Controls for progression so we don't lose functionality */}
            <div className="absolute inset-y-0 left-0 w-24 z-10 flex items-center justify-start" onClick={previousStep}>
               <div className="w-full h-full opacity-0 hover:opacity-10 bg-linear-to-r from-white/20 to-transparent transition-opacity cursor-pointer" />
            </div>
            <div className="absolute inset-y-0 right-0 w-24 z-10 flex items-center justify-end" onClick={nextStep}>
               <div className="w-full h-full opacity-0 hover:opacity-10 bg-linear-to-l from-white/20 to-transparent transition-opacity cursor-pointer" />
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
    </div>,
    document.body
  );
};

export default ARNavigator;
