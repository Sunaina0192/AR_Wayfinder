import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, AlertTriangle, Play, ArrowUp, ArrowRight, ArrowLeft, ArrowDown, Map, Camera as CameraIcon } from 'lucide-react';
import { calculateDistance, calculateBearing } from '../utils/geo';
const formatDist = (m) => {
  if (m === null) return 'Getting location...';
  if (m < 1000) return `${m}m away`;
  return `${(m / 1000).toFixed(1)}km away`;
};

const calculateCompassHeading = (alpha, beta, gamma) => {
  const degToRad = Math.PI / 180;
  const alphaRad = alpha * degToRad;
  const betaRad = beta * degToRad;
  const gammaRad = gamma * degToRad;

  const cA = Math.cos(alphaRad);
  const sA = Math.sin(alphaRad);
  const cB = Math.cos(betaRad);
  const sB = Math.sin(betaRad);
  const cG = Math.cos(gammaRad);
  const sG = Math.sin(gammaRad);

  let heading = 0;
  // If the device is held upright/vertical (beta > 45 or beta < -45)
  if (Math.abs(beta) > 45) {
    const rA = -sA * cG - cA * sB * sG;
    const rB = cA * cG - sA * sB * sG;
    heading = Math.atan2(rA, rB) * (180 / Math.PI);
  } else {
    // If the device is held flat/horizontal
    const rA = -cA * sG - sA * sB * cG;
    const rB = -sA * sG + cA * sB * cG;
    heading = Math.atan2(rA, rB) * (180 / Math.PI);
  }

  if (heading < 0) {
    heading += 360;
  }
  return heading;
};

const ARNavigator = ({ destination, locationData, onExit }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);
  const watchIdRef = useRef(null);
  const isFirstHeading = useRef(true);

  const [phase, setPhase] = useState('launch'); // 'launch' | 'ar'
  const [viewMode, setViewMode] = useState('camera'); // 'camera' | 'map'
  const [cameraReady, setCameraReady] = useState(false);
  const [error, setError] = useState(null);
  const [starting, setStarting] = useState(false);

  const [userHeading, setUserHeading] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [bearing, setBearing] = useState(0);

  const [routeData, setRouteData] = useState(null);
  const [nextStep, setNextStep] = useState(null);
  const [hasRouteError, setHasRouteError] = useState(false);
  const lastFetchLoc = useRef(null);
  
  const [showDescription, setShowDescription] = useState(false);

  // Lazy-load Leaflet only when needed
  const [LeafletMap, setLeafletMap] = useState(null);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Track window resizing and orientation changes dynamically
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const rawX = locationData?.coordinates?.x ?? 0;
  const rawY = locationData?.coordinates?.y ?? 0;
  const hasRealGPS = locationData?.fromBackend === true ||
    (rawX >= -90 && rawX <= 90 && rawY >= -180 && rawY <= 180 && rawX !== 0);
  const destLat = hasRealGPS ? rawX : null;
  const destLng = hasRealGPS ? rawY : null;
  const displayName = locationData?.name || destination;

  // Stop camera & cancel animation
  const stopAll = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (watchIdRef.current) {
      navigator.geolocation?.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }, []);

  // Exit handler
  const handleExit = useCallback(() => {
    stopAll();
    onExit?.();
  }, [stopAll, onExit]);

  // Start GPS & orientation tracking only when in AR phase
  useEffect(() => {
    if (phase !== 'ar') return;

    const handleOrientation = (e) => {
      let heading = null;
      const screenAngle = window.screen?.orientation?.angle ?? window.orientation ?? 0;
      const normalizedScreenAngle = screenAngle < 0 ? screenAngle + 360 : screenAngle;

      if (e.webkitCompassHeading !== undefined && e.webkitCompassHeading !== null) {
        // iOS Safari webkitCompassHeading is absolute, but needs correction for screen orientation angle
        heading = (e.webkitCompassHeading + normalizedScreenAngle) % 360;
      } else if (e.alpha !== null && e.alpha !== undefined) {
        // Android / general browsers
        if (e.beta !== null && e.beta !== undefined && e.gamma !== null && e.gamma !== undefined) {
          // Compute correct 3D compass heading from Euler angles
          heading = calculateCompassHeading(e.alpha, e.beta, e.gamma);
        } else {
          // Fallback if beta/gamma are missing
          heading = 360 - e.alpha;
        }
        // Adjust for screen orientation angle
        heading = (heading + normalizedScreenAngle) % 360;
      }

      if (heading !== null) {
        if (isFirstHeading.current) {
          setUserHeading(heading);
          isFirstHeading.current = false;
        } else {
          setUserHeading(prev => {
            let diff = heading - prev;
            if (diff < -180) diff += 360;
            if (diff > 180) diff -= 360;
            return (prev + diff * 0.15 + 360) % 360; // Exponential moving average (smooths out jitter)
          });
        }
      }
    };

    isFirstHeading.current = true;

    // Use absolute orientation events if supported (preferred on Android for absolute heading)
    const hasAbsoluteEvent = 'ondeviceorientationabsolute' in window;
    const eventName = hasAbsoluteEvent ? 'deviceorientationabsolute' : 'deviceorientation';
    window.addEventListener(eventName, handleOrientation, true);

    if ('geolocation' in navigator) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        ({ coords: { latitude, longitude } }) => {
          setUserLocation({ lat: latitude, lng: longitude });
          if (destLat && destLng) {
            setDistance(Math.round(calculateDistance(latitude, longitude, destLat, destLng)));
            setBearing(calculateBearing(latitude, longitude, destLat, destLng));
          }
        },
        (err) => console.warn('GPS error:', err),
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    }

    return () => {
      window.removeEventListener(eventName, handleOrientation, true);
      isFirstHeading.current = true;
      if (watchIdRef.current) {
        navigator.geolocation?.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [phase, destLat, destLng]);

  // Fetch real map route from OSRM
  useEffect(() => {
    if (!userLocation || !destLat || !destLng || phase !== 'ar') return;
    
    let shouldFetch = false;
    if (!lastFetchLoc.current) {
      shouldFetch = true;
    } else {
      const distSinceLastFetch = calculateDistance(userLocation.lat, userLocation.lng, lastFetchLoc.current.lat, lastFetchLoc.current.lng);
      if (distSinceLastFetch > 5) { // refetch every 5 meters for responsive updates
        shouldFetch = true;
      }
    }

    if (!shouldFetch) return;
    lastFetchLoc.current = userLocation;

    const fetchRoute = async () => {
      try {
        const res = await fetch(`https://router.project-osrm.org/route/v1/foot/${userLocation.lng},${userLocation.lat};${destLng},${destLat}?overview=full&geometries=geojson&steps=true`);
        const data = await res.json();
        if (data.code === 'Ok' && data.routes.length > 0) {
          const route = data.routes[0];
          const coords = route.geometry.coordinates.map(c => [c[1], c[0]]);
          setRouteData(coords);
          setHasRouteError(false);
          
          if (route.legs && route.legs.length > 0) {
            const steps = route.legs[0].steps;
            if (steps.length > 1) {
              setNextStep(steps[1]); // The immediate next turn
            } else if (steps.length > 0) {
              setNextStep(steps[0]);
            }
          }
        } else {
          setHasRouteError(true);
          setNextStep(null);
        }
      } catch (e) {
        console.error('OSRM fetch error', e);
        setHasRouteError(true);
        setNextStep(null);
      }
    };
    
    fetchRoute();
  }, [userLocation, destLat, destLng, phase]);

  const targetBearing = React.useMemo(() => {
    if (nextStep && nextStep.maneuver && userLocation) {
      const nextLng = nextStep.maneuver.location[0];
      const nextLat = nextStep.maneuver.location[1];
      return calculateBearing(userLocation.lat, userLocation.lng, nextLat, nextLng);
    }
    return bearing;
  }, [nextStep, userLocation, bearing]);

  // Draw AR arrows on canvas
  const drawArrows = useCallback(() => {
    if (!canvasRef.current || viewMode !== 'camera') return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      if (!canvasRef.current || viewMode !== 'camera') return;
      const w = canvasRef.current.width;
      const h = canvasRef.current.height;
      ctx.clearRect(0, 0, w, h);

      let diff = targetBearing - userHeading;
      if (diff < -180) diff += 360;
      if (diff > 180) diff -= 360;

      const cx = w / 2;
      const cy = h / 2 + 80;
      const timeOffset = (Date.now() % 2000) / 2000;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((diff * Math.PI) / 180);

      for (let i = 4; i >= 0; i--) {
        const progress = (i + timeOffset) / 4;
        if (progress > 1) continue;
        const y = progress * 200;
        const opacity = 1 - progress;
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.moveTo(0, -y - 30);
        ctx.lineTo(30, -y + 10);
        ctx.lineTo(0, -y);
        ctx.lineTo(-30, -y + 10);
        ctx.closePath();
        ctx.fillStyle = hasRouteError ? '#EF4444' : (Math.abs(diff) < 30 ? '#60A5FA' : '#34D399');
        ctx.fill();
      }
      ctx.restore();
      animationRef.current = requestAnimationFrame(animate);
    };

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(animate);
  }, [targetBearing, userHeading, viewMode, hasRouteError]);

  // Start/stop arrow animation
  useEffect(() => {
    if (phase === 'ar' && cameraReady && viewMode === 'camera') {
      drawArrows();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
  }, [phase, cameraReady, viewMode, drawArrows]);

  // Lazy load Leaflet map component when in AR navigation mode
  useEffect(() => {
    if (phase !== 'ar' || LeafletMap) return;
    import('react-leaflet').then(({ MapContainer, TileLayer, Marker, Polyline, useMap }) => {
      import('leaflet').then((L) => {
        import('leaflet/dist/leaflet.css');

        const destIcon = new L.default.Icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          iconSize: [25, 41], iconAnchor: [12, 41],
        });

        const Recenter = ({ lat, lng }) => {
          const map = useMap();
          useEffect(() => { if (lat && lng) map.setView([lat, lng]); }, [lat, lng, map]);
          return null;
        };

        const MapComp = ({ userLoc, dLat, dLng, rData, heading, routeError, isMiniMap }) => {
          const [mapType, setMapType] = useState('street');
          const tileUrl = mapType === 'street' 
            ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

          if (!userLoc) return (
            <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-400 font-bold text-lg">
              Acquiring GPS signal...
            </div>
          );
          if (!dLat || !dLng) return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-center p-8">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-white font-black text-xl mb-2">GPS Map Unavailable</h3>
              <p className="text-slate-400 text-sm max-w-xs">This location was added without GPS coordinates. Ask your admin to re-add it using the "Get My Location" button.</p>
            </div>
          );

          const defaultZoom = isMiniMap ? 15 : 16;

          // Dynamic user icon with a rotating direction beam/cone (Google Maps style)
          const userIcon = L.default.divIcon({
            className: 'bg-transparent',
            html: `<div class="relative flex h-16 w-16 items-center justify-center">
                     <!-- Dynamic rotating heading cone/beam -->
                     <svg class="absolute w-16 h-16 pointer-events-none" viewBox="0 0 100 100" style="transform: rotate(${heading || 0}deg); transform-origin: 50% 50%; z-index: 1;">
                       <defs>
                         <radialGradient id="beamGrad" cx="50%" cy="50%" r="50%">
                           <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.85"/>
                           <stop offset="30%" stop-color="#3B82F6" stop-opacity="0.45"/>
                           <stop offset="100%" stop-color="#3B82F6" stop-opacity="0"/>
                         </radialGradient>
                       </defs>
                       <path d="M 50 50 L 32 12 A 40 40 0 0 1 68 12 Z" fill="url(#beamGrad)"/>
                     </svg>
                     <!-- Pulsing outer ring -->
                     <span class="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-blue-400 opacity-75 z-10"></span>
                     <!-- Core blue location dot -->
                     <span class="relative inline-flex rounded-full h-5 w-5 bg-blue-500 border-[3px] border-white shadow-lg z-20"></span>
                   </div>`,
            iconSize: [64, 64],
            iconAnchor: [32, 32],
          });

          return (
            <div className="relative w-full h-full overflow-hidden bg-slate-950">
              <MapContainer center={[userLoc.lat, userLoc.lng]} zoom={defaultZoom} className="w-full h-full" zoomControl={false}>
                <TileLayer url={tileUrl} />
                <Recenter lat={userLoc.lat} lng={userLoc.lng} />
                <Marker position={[userLoc.lat, userLoc.lng]} icon={userIcon} />
                <Marker position={[dLat, dLng]} icon={destIcon} />
                {rData && !routeError ? (
                  <Polyline positions={rData} color={mapType === 'satellite' ? "#60A5FA" : "#3B82F6"} weight={6} opacity={0.8} />
                ) : (
                  <Polyline positions={[[userLoc.lat, userLoc.lng], [dLat, dLng]]} color="#EF4444" weight={5} opacity={0.8} dashArray="12, 8" />
                )}
              </MapContainer>
              
              {!isMiniMap && (
                <div className="absolute top-4 right-4 z-[999] flex flex-col gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setMapType(prev => prev === 'street' ? 'satellite' : 'street'); }}
                    className="bg-white text-black px-4 py-2 rounded-xl shadow-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all text-center"
                  >
                    {mapType === 'street' ? '🌳 Green Map' : '🗺️ Street Map'}
                  </button>
                </div>
              )}
            </div>
          );
        };

        setLeafletMap(() => MapComp);
      });
    });
  }, [phase, LeafletMap]);

  // Cleanup on unmount
  useEffect(() => () => stopAll(), [stopAll]);

  // Start camera
  const startCamera = async () => {
    setError(null);
    setStarting(true);
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Camera requires HTTPS connection');
      }

      // Request device orientation permission for iOS 13+
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission !== 'granted') {
            throw new Error('Orientation/Motion sensor access was denied.');
          }
        } catch (perr) {
          throw new Error('Sensor permission failed: ' + perr.message);
        }
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, audio: false,
      });
      streamRef.current = stream;
      setCameraReady(true);
      setPhase('ar');
    } catch (err) {
      setError(err.message || 'Camera access denied.');
    } finally {
      setStarting(false);
    }
  };

  // Attach video stream when video element mounts
  useEffect(() => {
    if (phase === 'ar' && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(e => console.error('Video play error:', e));
    }
  }, [phase]);

  // Instruction text
  const getInstruction = () => {
    if (!userLocation || distance === null) return { text: 'Locating you...', color: 'text-slate-300', arrow: '⊙' };
    
    if (hasRouteError) {
      return { text: 'No path ahead: follow straight line', color: 'text-red-500', arrow: '⚠' };
    }
    
    let instructionText = 'Go Straight';
    if (nextStep && nextStep.maneuver) {
      const { type, modifier } = nextStep.maneuver;
      if (type === 'depart') instructionText = `Head ${modifier || 'forward'}`;
      else if (type === 'arrive') instructionText = 'You will arrive soon';
      else if (type === 'turn') instructionText = `Turn ${modifier}`;
      else if (type === 'continue') instructionText = `Continue ${modifier || 'straight'}`;
      else instructionText = `${type} ${modifier || ''}`.trim();
      
      if (nextStep.name && nextStep.name.trim() !== '') {
        instructionText += ` onto ${nextStep.name}`;
      }
      instructionText = instructionText.charAt(0).toUpperCase() + instructionText.slice(1);
    }

    let diff = targetBearing - userHeading;
    if (diff < -180) diff += 360;
    if (diff > 180) diff -= 360;
    
    let arrow = '↑';
    let color = 'text-blue-400';
    if (Math.abs(diff) < 30) { arrow = '↑'; color = 'text-blue-400'; }
    else if (diff >= 30 && diff < 150) { arrow = '→'; color = 'text-emerald-400'; }
    else if (diff <= -30 && diff > -150) { arrow = '←'; color = 'text-emerald-400'; }
    else { arrow = '↓'; color = 'text-red-400'; }

    return { text: instructionText, color, arrow };
  };

  if (!destination) return null;

  const instr = getInstruction();

  // Audio instruction
  const lastSpokenText = useRef('');
  useEffect(() => {
    if (phase !== 'ar' || !window.speechSynthesis) return;
    if (instr.text && instr.text !== lastSpokenText.current && instr.text !== 'Locating you...') {
      lastSpokenText.current = instr.text;
      
      const distSpeech = distance !== null ? (distance < 1000 ? `${distance} meters away` : `${(distance / 1000).toFixed(1)} kilometers away`) : '';
      const utterance = new SpeechSynthesisUtterance(`${instr.text}. ${distSpeech}`);
      
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Google'))) || voices.find(v => v.lang.startsWith('en'));
      if (englishVoice) utterance.voice = englishVoice;
      
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }, [instr.text, phase, distance]);

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col overflow-hidden select-none">

      {/* ── LAUNCH SCREEN ── */}
      {phase === 'launch' && (
        <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white p-6 md:p-8 text-center">
          <div className="text-5xl md:text-7xl mb-4 md:mb-6">🧭</div>
          <h1 className="text-3xl md:text-4xl font-black mb-2 md:mb-3">AR Wayfinder</h1>
          <p className="text-slate-400 mb-1 md:mb-2 max-w-sm text-sm md:text-base">Navigate to</p>
          <p className="text-blue-400 font-black text-xl md:text-2xl mb-8 md:mb-10">{displayName}</p>

          {error && (
            <div className="mb-8 p-4 bg-red-500/20 text-red-400 rounded-2xl flex items-center gap-3 max-w-sm">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <button
            onClick={startCamera}
            disabled={starting}
            className="py-4 px-8 md:py-5 md:px-12 bg-blue-600 hover:bg-blue-700 font-black rounded-full text-lg md:text-xl shadow-2xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mb-4 disabled:opacity-60 w-full max-w-xs justify-center"
          >
            {starting ? 'Starting...' : 'Launch AR'}
            <Play className="w-5 h-5 md:w-6 md:h-6 fill-current" />
          </button>

          <button onClick={handleExit} className="text-slate-500 hover:text-white font-bold transition-colors py-3">
            Cancel
          </button>
        </div>
      )}

      {/* ── AR NAVIGATION SCREEN ── */}
      {phase === 'ar' && (
        <div className="flex-1 relative">

          {/* Camera video (always present, hidden in map mode as PiP) */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`absolute inset-0 object-cover transition-all duration-500 ${
              viewMode === 'camera' ? 'w-full h-full z-0' : 'w-24 h-36 md:w-36 md:h-52 top-4 left-4 md:top-6 md:left-6 z-50 rounded-2xl border-2 border-white/20 shadow-2xl cursor-pointer'
            }`}
            onClick={() => viewMode === 'map' && setViewMode('camera')}
          />

          {/* AR canvas overlay (camera mode) */}
          {viewMode === 'camera' && (
            <canvas
              ref={canvasRef}
              width={dimensions.width}
              height={dimensions.height}
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
            />
          )}

          {/* Map (map mode) */}
          {viewMode === 'map' && (
            <div className="absolute inset-0 z-0">
              {LeafletMap ? (
                <LeafletMap userLoc={userLocation} dLat={destLat} dLng={destLng} rData={routeData} heading={userHeading} routeError={hasRouteError} isMiniMap={false} />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-400">Loading map...</div>
              )}
            </div>
          )}

          {/* PiP map (camera mode) */}
          {viewMode === 'camera' && (
            <div
              className="absolute top-4 right-4 md:top-8 md:right-6 z-20 w-28 h-28 md:w-40 md:h-40 rounded-[1rem] md:rounded-[1.5rem] border-2 md:border-4 border-white/20 shadow-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setViewMode('map')}
            >
              {LeafletMap ? (
                <LeafletMap userLoc={userLocation} dLat={destLat} dLng={destLng} rData={routeData} heading={userHeading} routeError={hasRouteError} isMiniMap={true} />
              ) : (
                <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500 text-[10px] md:text-xs font-bold">MAP</div>
              )}
            </div>
          )}

          {/* Top instruction bar */}
          <div className={`absolute top-4 md:top-8 ${viewMode === 'camera' ? 'left-4 md:left-6 max-w-[calc(100vw-9rem)]' : 'left-1/2 -translate-x-1/2'} z-30 flex items-center gap-2 md:gap-3 bg-black/70 backdrop-blur-xl rounded-2xl md:rounded-3xl px-4 py-3 md:px-5 md:py-4 shadow-2xl border border-white/10`}>
            <span className={`text-2xl md:text-3xl font-black ${instr.color}`}>{instr.arrow}</span>
            <div className="truncate">
              <p className={`font-black text-sm md:text-lg truncate ${instr.color}`}>{instr.text}</p>
              <p className="text-white/60 text-xs md:text-sm truncate">{formatDist(distance)}</p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={handleExit}
            className="absolute top-4 right-4 md:top-8 md:right-6 z-50 p-2 md:p-3 bg-red-500/90 hover:bg-red-500 text-white rounded-full shadow-2xl transition-all"
            style={{ display: viewMode === 'camera' ? 'none' : 'flex' }}
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          {viewMode === 'camera' && (
            <button onClick={handleExit} className="absolute bottom-24 right-4 md:bottom-8 md:right-6 z-20 p-3 md:p-4 bg-red-500/80 hover:bg-red-500 text-white rounded-full shadow-2xl">
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          )}

          {/* Mode toggle */}
          <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex bg-black/60 backdrop-blur-xl p-1.5 rounded-full border border-white/10 shadow-2xl gap-1 w-max">
            <button
              onClick={() => setViewMode('camera')}
              className={`flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-xs md:text-sm transition-all ${viewMode === 'camera' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-300 hover:text-white'}`}
            >
              <CameraIcon className="w-4 h-4" /> AR
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-xs md:text-sm transition-all ${viewMode === 'map' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-300 hover:text-white'}`}
            >
              <Map className="w-4 h-4" /> Map
            </button>
          </div>

          {/* Arrived modal */}
          {distance !== null && distance < 10 && distance > 0 && (
            <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-6">
              <div className="bg-white rounded-[2rem] md:rounded-[3rem] w-full max-w-sm p-6 md:p-10 text-center shadow-2xl flex flex-col items-center">
                <div className="text-5xl md:text-6xl mb-3 md:mb-4">🏁</div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-1 md:mb-2">You Arrived!</h2>
                <p className="text-slate-500 mb-4 text-sm md:text-base">Welcome to <strong>{displayName}</strong></p>
                
                {showDescription && (
                  <div className="w-full bg-slate-50 p-4 rounded-2xl mb-6 text-sm text-slate-600 text-left border border-slate-100 max-h-40 overflow-y-auto">
                    {locationData?.description || "No description available for this location."}
                  </div>
                )}
                
                <button 
                  onClick={() => setShowDescription(!showDescription)} 
                  className="w-full py-3 mb-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-colors"
                >
                  {showDescription ? 'Hide Description' : 'Show Description'}
                </button>
                
                <button onClick={handleExit} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl text-lg shadow-xl shadow-blue-500/20 transition-all">
                  Finish Route
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>,
    document.body
  );
};

export default ARNavigator;
