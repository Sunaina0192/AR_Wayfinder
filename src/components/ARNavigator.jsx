import React, { useEffect, useRef, useState } from 'react';
import { getLocationById, findShortestPath, generateDirections } from '../data/locations';
import { MapPin, Navigation, ChevronLeft, ChevronRight, Volume2, X } from 'lucide-react';
import MapView from './MapView';

const ARNavigator = ({ destination, onExit }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [path, setPath] = useState(null);
  const [directions, setDirections] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showAR, setShowAR] = useState(false);
  const [cameraStarted, setCameraStarted] = useState(false);
  const streamRef = useRef(null);
  const animationRef = useRef(null);

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
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const constraints = {
        video: { facingMode: 'environment' },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraStarted(true);
        setShowAR(true);
      }
    } catch (error) {
      alert('Unable to access camera. Please check permissions.');
      console.error('Camera error:', error);
    }
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
    setCameraStarted(false);
    setShowAR(false);
  };

  useEffect(() => {
    if (showAR && cameraStarted) {
      drawAROverlay();
    }
  }, [showAR, cameraStarted, currentStep]);

  const drawAROverlay = () => {
    if (!canvasRef.current || !videoRef.current) return;

    const ctx = canvasRef.current.getContext('2d');

    const animate = () => {
      if (!canvasRef.current) return;
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      if (currentStep < directions.length) {
        const centerX = canvasRef.current.width / 2;
        const centerY = canvasRef.current.height / 2;
        drawArrow(ctx, centerX, centerY + 100);
      }

      if (showAR) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (!animationRef.current) {
      animate();
    }
  };

  const drawArrow = (ctx, x, y) => {
    const time = Date.now() * 0.005;
    const bounce = Math.sin(time) * 20;

    ctx.save();
    ctx.translate(x, y + bounce);

    const gradient = ctx.createRadialGradient(0, 0, 10, 0, 0, 80);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, 80, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, -40);
    ctx.lineTo(-20, 0);
    ctx.lineTo(-10, 0);
    ctx.lineTo(-10, 40);
    ctx.lineTo(10, 40);
    ctx.lineTo(10, 0);
    ctx.lineTo(20, 0);
    ctx.closePath();

    ctx.fillStyle = '#3B82F6';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
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

  const speakDirection = () => {
    if (currentStep < directions.length && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(directions[currentStep].instruction);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const finishNavigation = () => {
    stopCamera();
    setCurrentStep(0);
    setPath(null);
    setDirections([]);
    if (onExit) {
      onExit();
    }
  };

  if (!destination) return null;

  const destLocation = getLocationById(destination);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col font-sans">
      <div className="flex-1 relative overflow-hidden">
        {cameraStarted ? (
          <>
            <video ref={videoRef} className="w-full h-full object-cover" playsInline />
            <canvas
              ref={canvasRef}
              width={window.innerWidth}
              height={window.innerHeight}
              className="absolute inset-0 w-full h-full pointer-events-none"
            />

            {directions.length > 0 && currentStep < directions.length && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-black/40 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-6 shadow-2xl">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-blue-500/50">
                    <Navigation className="w-8 h-8 fill-current" />
                  </div>
                  <div className="flex-1">
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Current Step</p>
                    <h3 className="text-white text-xl font-bold leading-tight">
                      {directions[currentStep].instruction}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] text-white/70 font-bold uppercase">
                        {directions[currentStep].distance}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="absolute bottom-40 right-6 w-32 h-32 rounded-3xl border-2 border-white/30 shadow-2xl overflow-hidden backdrop-blur-md opacity-80 hover:opacity-100 transition-opacity">
              <div className="w-full h-full scale-[0.3] origin-top-left -translate-x-12 -translate-y-8 pointer-events-none">
                <MapView selectedLocation={destination} activePath={path} />
              </div>
            </div>

            {currentStep >= directions.length && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="bg-white rounded-[3rem] p-10 text-center shadow-2xl transform scale-110">
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2">You've Arrived!</h2>
                  <p className="text-slate-500 mb-8">You have reached {destLocation?.name}</p>
                  <button
                    onClick={finishNavigation}
                    className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:scale-105 transition"
                  >
                    Finish
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-blue-600 to-indigo-900 text-white p-10 text-center">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center mb-8 border border-white/20">
              <MapPin className="w-12 h-12" />
            </div>
            <h1 className="text-4xl font-black mb-4">Ready to Navigate?</h1>
            <p className="text-blue-100 text-lg mb-12 max-w-md">
              We'll use your camera to show AR directions to <span className="font-bold text-white">{destLocation?.name}</span>.
            </p>
            <button
              onClick={startCamera}
              className="w-full max-w-xs py-5 bg-white text-blue-600 font-black rounded-2xl text-xl shadow-2xl hover:scale-105 transition active:scale-95"
            >
              Start AR View
            </button>
            <button
              onClick={() => {
                stopCamera();
                if (onExit) onExit();
              }}
              className="mt-6 text-white/60 font-bold hover:text-white transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {cameraStarted && (
        <div className="bg-black/80 backdrop-blur-3xl border-t border-white/10 px-6 py-8 pb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 bg-white/10 h-3 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-700 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                style={{ width: `${((currentStep + 1) / Math.max(directions.length, 1)) * 100}%` }}
              />
            </div>
            <span className="text-white/40 text-xs font-black tabular-nums">
              {currentStep + 1} / {Math.max(directions.length, 1)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <button
              onClick={previousStep}
              disabled={currentStep === 0}
              className="rounded-3xl border border-white/10 bg-white/10 py-4 text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="w-5 h-5 mx-auto" />
              Previous
            </button>
            <button
              onClick={speakDirection}
              className="rounded-3xl border border-white/10 bg-white/10 py-4 text-white transition hover:bg-white/20"
            >
              <Volume2 className="w-5 h-5 mx-auto" />
              Voice
            </button>
            <button
              onClick={nextStep}
              disabled={currentStep >= directions.length - 1}
              className="rounded-3xl border border-white/10 bg-white/10 py-4 text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="w-5 h-5 mx-auto" />
              Next
            </button>
            <button
              onClick={finishNavigation}
              className="rounded-3xl border border-blue-500 bg-blue-600 py-4 text-white font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700"
            >
              <X className="w-5 h-5 mx-auto" />
              Exit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ARNavigator;


