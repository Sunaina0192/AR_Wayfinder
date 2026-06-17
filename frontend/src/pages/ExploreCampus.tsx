import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  Stars, 
  Text, 
  Float, 
  MeshDistortMaterial, 
  Grid, 
  ContactShadows,
  PerspectiveCamera,
  Line,
  Html
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

interface CampusLocation {
  name: string;
  pos: [number, number, number];
  color: string;
}

const locations: CampusLocation[] = [
  { name: "Main Entry Gate", pos: [0, 0, 25], color: "#00ffcc" },
  { name: "Admission Cell", pos: [0, 0, 18], color: "#00ccff" },
  { name: "Main Parking", pos: [12, 0, 22], color: "#ffcc00" },
  { name: "School Admin", pos: [0, 0, 10], color: "#ff00ff" },
  { name: "School", pos: [-10, 0, 10], color: "#00ffcc" },
  { name: "Law Block", pos: [10, 0, 10], color: "#00ffcc" },
  { name: "Gurudwara", pos: [20, 0, 5], color: "#ffffff" },
  { name: "Library", pos: [0, 0, 0], color: "#3366ff" },
  { name: "Block 5 Engineering", pos: [-15, 0, 0], color: "#ff3300" },
  { name: "Block 3 Physical Ed & Fashion", pos: [-15, 0, -8], color: "#ff3300" },
  { name: "Dispensary", pos: [10, 0, 0], color: "#00ff00" },
  { name: "Auditorium", pos: [18, 0, -5], color: "#cc00ff" },
  { name: "Nursing Block", pos: [-8, 0, -15], color: "#00ffcc" },
  { name: "Girls Canteen", pos: [-15, 0, -15], color: "#ff99cc" },
  { name: "Girls Hostel", pos: [-20, 0, -25], color: "#ff99cc" },
  { name: "Boys Hostel", pos: [20, 0, -25], color: "#3366ff" },
  { name: "Main Ground", pos: [0, 0, -15], color: "#00ff00" },
  { name: "Football Ground", pos: [8, 0, -15], color: "#00ff00" },
  { name: "Stadium", pos: [18, 0, -18], color: "#00ff00" },
  { name: "Room 112", pos: [-8, 0, 10], color: "#00ffcc" },
];

const LocationMarker = ({ location, isSelected, isHovered, onHover, onClick }: { 
  location: CampusLocation, 
  isSelected: boolean,
  isHovered: boolean,
  onHover: (hovered: boolean) => void,
  onClick: () => void 
}) => {
  const scale = isSelected ? 1.4 : isHovered ? 1.2 : 1;

  return (
    <Float speed={isSelected ? 4 : 2} rotationIntensity={0.5} floatIntensity={isSelected ? 1 : 0.5}>
      <group 
        position={location.pos} 
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={() => onHover(true)}
        onPointerOut={() => onHover(false)}
      >
        <mesh scale={scale}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <MeshDistortMaterial 
            color={location.color} 
            speed={isSelected || isHovered ? 5 : 2} 
            distort={0.4} 
            emissive={location.color}
            emissiveIntensity={isSelected ? 2 : 1}
          />
        </mesh>
        
        {/* Futuristic Scanner Ring */}
        <mesh rotation-x={Math.PI / 2} position-y={-0.4}>
          <ringGeometry args={[0.7 * scale, 0.9 * scale, 32]} />
          <meshBasicMaterial color={location.color} transparent opacity={0.5} side={2} />
        </mesh>

        {/* Hover Label */}
        {isHovered && !isSelected && (
          <Html distanceFactor={15}>
            <div style={{ 
              color: 'white', 
              background: 'rgba(0,0,0,0.85)', 
              padding: '4px 12px', 
              border: `1px solid ${location.color}`, 
              whiteSpace: 'nowrap', 
              pointerEvents: 'none',
              fontFamily: 'monospace',
              fontSize: '12px'
            }}>
              {location.name}
            </div>
          </Html>
        )}

        <Text
          position={[0, 1.5, 0]}
          fontSize={0.7}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          visible={isSelected}
          outlineColor={location.color}
        >
          {location.name}
        </Text>
      </group>
    </Float>
  );
};

const ExploreCampus: React.FC = () => {
  const [selectedLoc, setSelectedLoc] = useState<string | null>(null);
  const [hoveredLoc, setHoveredLoc] = useState<string | null>(null);

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', background: '#000', overflow: 'hidden' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[40, 40, 40]} fov={45} />
        <color attach="background" args={['#020205']} />
        <fog attach="fog" args={['#020205', 20, 100]} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ccff" />
        <pointLight position={[-10, 5, -10]} intensity={1} color="#ff00ff" />

        <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={1.5} />
        
        <Grid 
          infiniteGrid 
          fadeDistance={60} 
          sectionSize={10} 
          sectionColor="#222244" 
          cellSize={2} 
          cellColor="#111122" 
          position={[0, -0.5, 0]}
        />

        <Suspense fallback={null}>
          {locations.map((loc) => (
            <LocationMarker 
              key={loc.name} 
              location={loc} 
              isSelected={selectedLoc === loc.name}
              isHovered={hoveredLoc === loc.name}
              onHover={(hovered) => setHoveredLoc(hovered ? loc.name : null)}
              onClick={() => setSelectedLoc(loc.name)}
            />
          ))}
          
          {/* Low-opacity connecting lines for a network effect */}
          <Line
            points={locations.map(l => l.pos)}
            color="#333366"
            lineWidth={0.5}
            transparent
            opacity={0.2}
          />
        </Suspense>

        <ContactShadows position={[0, -0.5, 0]} opacity={0.4} scale={50} blur={2} far={4.5} />
        <OrbitControls makeDefault enableDamping dampingFactor={0.05} minDistance={15} maxDistance={70} />
      </Canvas>

      {/* UI Overlay */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          color: '#fff',
          fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          pointerEvents: 'none',
          borderLeft: '4px solid #00ccff',
          paddingLeft: '20px'
        }}
      >
        <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 300, letterSpacing: '4px', textTransform: 'uppercase' }}>
          Explore <span style={{ color: '#00ccff', fontWeight: 700 }}>Campus</span>
        </h1>
        <p style={{ margin: '5px 0', opacity: 0.6, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
          AR Wayfinder Integrated Core v2.0
        </p>
      </motion.div>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedLoc && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              background: 'rgba(5, 5, 20, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid #00ccff',
              padding: '25px',
              borderRadius: '2px',
              color: '#fff',
              width: '320px',
              boxShadow: '0 0 30px rgba(0, 204, 255, 0.15)'
            }}
          >
            <div style={{ fontSize: '0.65rem', color: '#00ccff', marginBottom: '5px', letterSpacing: '1px' }}>SECTOR IDENTIFIED</div>
            <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 600 }}>{selectedLoc}</h2>
            <div style={{ marginTop: '15px', height: '1px', background: 'rgba(0, 204, 255, 0.3)' }} />
            <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.6, marginTop: '15px' }}>
              Location data synced with WayFinder AR. Ready for navigation sequence. Scan QR code at nearest terminal to begin.
            </p>
            <button 
              onClick={() => setSelectedLoc(null)}
              style={{
                background: 'rgba(0, 204, 255, 0.1)',
                border: '1px solid #00ccff',
                color: '#00ccff',
                padding: '8px 18px',
                marginTop: '10px',
                cursor: 'pointer',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              Dismiss Intel
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(255,255,255,0.3)',
        fontSize: '0.65rem',
        textTransform: 'uppercase',
        letterSpacing: '2px'
      }}>
        Drag to Orbit • Scroll to Zoom • Select Nodes for Data
      </div>
    </div>
  );
};

export default ExploreCampus;