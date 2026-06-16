import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { MapPin, Navigation, X, Compass, AlertTriangle, Play, Zap, ArrowUp, ArrowRight, ArrowLeft, ArrowDown, Map, Camera as CameraIcon } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { calculateDistance, calculateBearing } from '../utils/geo';

const userIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
const destIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

const ARNavigator = ({ destination, locationData, onExit }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [showAR, setShowAR] = useState(false);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [userHeading, setUserHeading] = useState(0);
  const [error, setError] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [viewMode, setViewMode] = useState('camera'); // 'camera' or 'map'
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(0);
  const [bearing, setBearing] = useState(0);
  
  const streamRef = useRef(null);
  const animationRef = useRef(null);
  const watchIdRef = useRef(null);
  
  // Check if coordinates are real GPS (lat is between -90 and 90, lng between -180 and 180)
  // Static campusLocations use SVG pixel coords (x: 0-400, y: 0-300) so they won't pass GPS validation
  const rawX = locationData?.coordinates?.x || 0;
  const rawY = locationData?.coordinates?.y || 0;
  const hasRealGPS = locationData?.fromBackend === true ||
    (rawX >= -90 && rawX <= 90 && rawY >= -180 && rawY <= 180 && rawX !== 0);
  const destLat = hasRealGPS ? rawX : null;
  const destLng = hasRealGPS ? rawY : null;

  const stopCamera = useCallback(() => {
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
  }, []);

  const getArrowInstruction = () => {
    // Relative bearing
    let diff = bearing - userHeading;
    if (diff < -180) diff += 360;
    if (diff > 180) diff -= 360;

    if (Math.abs(diff) < 30) return { text: 'Go Straight', Icon: ArrowUp, color: 'text-blue-400' };
    if (diff >= 30 && diff < 150) return { text: 'Turn Right', Icon: ArrowRight, color: 'text-emerald-400' };
    if (diff <= -30 && diff > -150) return { text: 'Turn Left', Icon: ArrowLeft, color: 'text-emerald-400' };
    return { text: 'Turn Around', Icon: ArrowDown, color: 'text-red-400' };
  };

  const drawArrows = useCallback(() => {
    if (!canvasRef.current || !videoRef.current || viewMode !== 'camera') return;
    const ctx = canvasRef.current.getContext('2d');

    const animate = () => {
      if (!canvasRef.current || viewMode !== 'camera') return;
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      if (userLocation) {
        const centerX = canvasRef.current.width / 2;
        const centerY = canvasRef.current.height / 2 + 100;
        
        let diff = bearing - userHeading;
        if (diff < -180) diff += 360;
        if (diff > 180) diff -= 360;

        // Draw animated chevron
        const timeOffset = (Date.now() % 2000) / 2000;
        ctx.save();
        ctx.translate(centerX, centerY);
        
        // Rotate arrow based on relative bearing (simplified 2D)
        ctx.rotate((diff * Math.PI) / 180);

        for (let i = 4; i >= 0; i--) {
          const progress = (i + timeOffset) / 4;
          if (progress > 1) continue;
          const yOffset = progress * 200;
          const opacity = 1 - progress;
          
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.moveTo(0, -yOffset - 30);
          ctx.lineTo(30, -yOffset + 10);
          ctx.lineTo(0, -yOffset);
          ctx.lineTo(-30, -yOffset + 10);
          ctx.closePath();
          ctx.fillStyle = Math.abs(diff) < 30 ? '#60A5FA' : '#34D399';
          ctx.fill();
        }
        ctx.restore();
      }

      if (showAR && viewMode === 'camera') {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (!animationRef.current) {
      animate();
    }
  }, [userHeading, bearing, showAR, userLocation, viewMode]);

  useEffect(() => {
    const handleOrientation = (e) => {
      // For iOS Safari, webkitCompassHeading is absolute. For android, alpha is relative.
      let h = e.webkitCompassHeading || Math.abs(e.alpha - 360);
      if (h !== null) setUserHeading(h);
    };
    window.addEventListener('deviceorientation', handleOrientation, true);

    if ("geolocation" in navigator) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          if (destLat && destLng) {
            setDistance(Math.round(calculateDistance(latitude, longitude, destLat, destLng)));
            setBearing(calculateBearing(latitude, longitude, destLat, destLng));
          }
        },
        (err) => console.warn('Geolocation error:', err),
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    }

    return () => {
      stopCamera();
      window.removeEventListener('deviceorientation', handleOrientation);
      if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, [destLat, destLng, stopCamera]);

  const startCamera = async () => {
    setError(null);
    setIsTransitioning(true);
    
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setIsTransitioning(false);
      setError('Secure connection (HTTPS) required for camera access.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraStarted(true);
        setShowAR(true);
        setTimeout(() => setIsTransitioning(false), 300);
      }
    } catch (err) {
      setIsTransitioning(false);
      setError('Camera access denied.');
    }
  };

  useEffect(() => {
    if (showAR && cameraStarted && viewMode === 'camera') {
      drawArrows();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, [showAR, cameraStarted, drawArrows, viewMode]);

  const finishNavigation = () => {
    stopCamera();
    if (onExit) onExit();
  };

  if (!destination) return null;
  const displayName = locationData?.name || destination;

  const instr = getArrowInstruction();
  const MapElement = (
    <div className="w-full h-full relative">
      {(userLocation && destLat && destLng) ? (
        <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={18} className="w-full h-full" zoomControl={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <RecenterMap lat={userLocation.lat} lng={userLocation.lng} />
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon} />
          <Marker position={[destLat, destLng]} icon={destIcon} />
          <Polyline positions={[[userLocation.lat, userLocation.lng], [destLat, destLng]]} color="blue" weight={5} opacity={0.6} dashArray="10, 10" />
        </MapContainer>
      ) : !hasRealGPS ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-center p-8">
          <div className="text-5xl mb-4">📍</div>
          <h3 className="text-white font-black text-xl mb-2">GPS Map Not Available</h3>
          <p className="text-slate-400 text-sm max-w-xs">This location uses the campus map. To enable GPS routing on the map view, ask your admin to re-add <span className="text-blue-400 font-bold">{displayName}</span> with real GPS coordinates.</p>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-400 font-bold">Acquiring GPS signal...</div>
      )}
    </div>
  );

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col font-sans overflow-hidden select-none">
      <div className="flex-1 relative">
        {/* The Camera Feed */}
        <video 
          ref={videoRef} 
          className={`absolute inset-0 object-cover transition-all duration-700 ${
            cameraStarted ? 'opacity-100' : 'opacity-0'
          } ${viewMode === 'camera' ? 'w-full h-full' : 'w-32 h-48 rounded-2xl shadow-2xl border-2 border-white/20 top-6 left-6 z-[60]'}`} 
          playsInline 
          onClick={() => viewMode === 'map' && setViewMode('camera')}
        />
        
        {/* The Map Background for Map Mode */}
        {viewMode === 'map' && (
          <div className="absolute inset-0 z-0">
            {MapElement}
          </div>
        )}

        {/* The Canvas Overlay for AR Arrows (Camera Mode Only) */}
        {viewMode === 'camera' && (
          <canvas
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
            className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ${cameraStarted ? 'opacity-100' : 'opacity-0'} z-10`}
          />
        )}

        {cameraStarted ? (
          <>
            {/* Top-Right: PiP Map (Camera Mode Only) */}
            {viewMode === 'camera' && (
              <div 
                className="absolute top-8 right-6 z-20 w-40 h-40 rounded-[2rem] border-4 border-white/20 shadow-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setViewMode('map')}
              >
                {MapElement}
              </div>
            )}

            {/* Top-Right: Close Button in Map Mode */}
            {viewMode === 'map' && (
              <button 
                onClick={finishNavigation}
                className="absolute top-8 right-6 z-50 p-4 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-2xl transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            )}

            {/* Center-Top: Current Instruction */}
            <div className={`absolute top-8 ${viewMode === 'camera' ? 'left-6' : 'left-1/2 -translate-x-1/2'} z-20 flex items-center gap-4 bg-black/60 backdrop-blur-xl rounded-3xl p-4 pr-6 shadow-2xl border border-white/10`}>
              <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-2xl">
                <instr.Icon className={`w-8 h-8 ${instr.color}`} />
              </div>
              <div>
                <h3 className="text-white text-xl font-black">{instr.text}</h3>
                <p className="text-white/70 text-sm font-bold">{distance} meters away</p>
              </div>
            </div>

            {/* Bottom-Center: Mode Toggle */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex bg-black/50 backdrop-blur-xl p-2 rounded-full border border-white/10 shadow-2xl">
              <button
                onClick={() => setViewMode('camera')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${viewMode === 'camera' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'}`}
              >
                <CameraIcon className="w-5 h-5" /> AR
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${viewMode === 'map' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'}`}
              >
                <Map className="w-5 h-5" /> Map
              </button>
            </div>

            {/* Close Button in Camera Mode */}
            {viewMode === 'camera' && (
              <button 
                onClick={finishNavigation}
                className="absolute bottom-8 right-6 z-20 p-4 bg-red-500/80 hover:bg-red-500 text-white rounded-full shadow-2xl"
              >
                <X className="w-6 h-6" />
              </button>
            )}

            {/* Destination Reached Modal */}
            {distance < 5 && distance > 0 && userLocation && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-[100] p-6">
                <div className="bg-white rounded-[3rem] w-full max-w-sm p-10 text-center shadow-2xl">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🏁</div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2">You Arrived!</h2>
                  <p className="text-slate-500 mb-8 font-medium">Welcome to {displayName}</p>
                  <button onClick={finishNavigation} className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl">Finish Route</button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-black text-white p-8 text-center relative z-10">
            <h1 className="text-5xl font-black mb-4">AR Wayfinder</h1>
            <p className="text-slate-400 mb-10 max-w-sm">Use your camera to find your way to <span className="text-blue-400 font-bold">{displayName}</span>.</p>
            {error && (
              <div className="mb-8 p-4 bg-red-500/20 text-red-400 rounded-2xl flex items-center gap-3">
                <AlertTriangle className="w-6 h-6" /> {error}
              </div>
            )}
            <button
              onClick={startCamera}
              disabled={isTransitioning}
              className="py-5 px-10 bg-blue-600 font-black rounded-full text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            >
              {isTransitioning ? 'Starting...' : 'Launch Navigator'}
              <Play className="w-6 h-6 fill-current" />
            </button>
            <button onClick={onExit} className="mt-6 text-slate-500 hover:text-white font-bold transition-colors">Cancel</button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ARNavigator;
