import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import { MapPin, RotateCw, Maximize2, Navigation as NavIcon, Info } from 'lucide-react';

const CampusRealisticMap = ({ onBuildingSelect }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const buildingsRef = useRef([]);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const [hoveredBuilding, setHoveredBuilding] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const navigate = useNavigate();

  const campusBuildings = [
    { id: 'entry-gate', name: 'Main Entry Gate', num: 1, pos: [0, 0.5, -12], size: [2, 1, 2], color: 0x8B4513 },
    { id: 'school-block', name: 'School Block', num: 2, pos: [-6, 1.5, -4], size: [3, 3, 3], color: 0xA0522D },
    { id: 'block-5-uiet', name: 'Block 5 (UIET)', num: 7, pos: [6, 1.8, -2], size: [3.5, 3.5, 3.5], color: 0x8B7355 },
    { id: 'library', name: 'Library', num: 13, pos: [-8, 2, 5], size: [2.5, 4, 2.5], color: 0x654321 },
    { id: 'admission-cell', name: 'Admission Cell', num: 14, pos: [-3, 0.8, 7], size: [2, 1.5, 2], color: 0x996633 },
    { id: 'block-3', name: 'Block 3', num: 3, pos: [5, 1.5, 6], size: [3, 3, 3], color: 0xA0522D },
    { id: 'girls-hostel', name: 'Girls Hostel', num: 10, pos: [-10, 1.5, 2], size: [3, 3, 3], color: 0x8B4513 },
    { id: 'boys-hostel', name: 'Boys Hostel', num: 15, pos: [10, 1.5, 3], size: [3, 3, 3], color: 0x704214 },
    { id: 'stadium', name: 'Stadium', num: 8, pos: [0, 0.3, -14], size: [5, 0.5, 4], color: 0x228B22 },
    { id: 'canteen-block-7', name: 'Canteen', num: 12, pos: [-2, 1, -8], size: [2, 2, 2], color: 0xA0522D },
    { id: 'workshop-center', name: 'Workshop Center', num: 11, pos: [3, 1, -8], size: [2, 2, 2], color: 0x8B4513 },
  ];

  // Create canvas texture for numbers
  const createNumberTexture = (number, color) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#' + color.toString(16).padStart(6, '0');
    ctx.beginPath();
    ctx.arc(256, 256, 240, 0, Math.PI * 2);
    ctx.fill();

    // White border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.arc(256, 256, 240, 0, Math.PI * 2);
    ctx.stroke();

    // Number
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 300px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(number, 256, 256);

    return new THREE.CanvasTexture(canvas);
  };

  // Create ground texture
  const createGroundTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Grass gradient
    const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
    gradient.addColorStop(0, '#2d5016');
    gradient.addColorStop(0.5, '#3d6b1f');
    gradient.addColorStop(1, '#2d5016');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 1024);

    // Add some texture
    for (let i = 0; i < 200; i++) {
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.1})`;
      ctx.fillRect(
        Math.random() * 1024,
        Math.random() * 1024,
        Math.random() * 20,
        Math.random() * 20
      );
    }

    return new THREE.CanvasTexture(canvas);
  };

  // Create building texture
  const createBuildingTexture = (color) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Base color
    ctx.fillStyle = '#' + color.toString(16).padStart(6, '0');
    ctx.fillRect(0, 0, 256, 256);

    // Window pattern
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = 0.6;
    for (let i = 0; i < 256; i += 30) {
      for (let j = 0; j < 256; j += 30) {
        ctx.fillRect(i + 5, j + 5, 15, 15);
      }
    }

    // Shadows
    ctx.globalAlpha = 1;
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 256, 256);

    return new THREE.CanvasTexture(canvas);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    scene.fog = new THREE.Fog(0x87ceeb, 60, 100);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 18, 25);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting - like daytime
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(20, 30, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.left = -40;
    sunLight.shadow.camera.right = 40;
    sunLight.shadow.camera.top = 40;
    sunLight.shadow.camera.bottom = -40;
    scene.add(sunLight);

    // Sky
    const skyGeometry = new THREE.SphereGeometry(150, 32, 32);
    const skyMaterial = new THREE.MeshBasicMaterial({
      color: 0x87ceeb,
      side: THREE.BackSide,
    });
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(sky);

    // Ground with grass texture
    const groundGeometry = new THREE.PlaneGeometry(60, 60);
    const groundMaterial = new THREE.MeshStandardMaterial({
      map: createGroundTexture(),
      roughness: 0.8,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Create buildings with textures
    const buildings = [];
    
    campusBuildings.forEach((buildingData) => {
      const geometry = new THREE.BoxGeometry(buildingData.size[0], buildingData.size[1], buildingData.size[2]);
      
      const material = new THREE.MeshStandardMaterial({
        map: createBuildingTexture(buildingData.color),
        roughness: 0.7,
        metalness: 0.1,
      });

      const building = new THREE.Mesh(geometry, material);
      building.position.set(buildingData.pos[0], buildingData.pos[1], buildingData.pos[2]);
      building.castShadow = true;
      building.receiveShadow = true;
      building.userData = buildingData;

      scene.add(building);
      buildings.push(building);

      // Add floating number marker above building
      const markerGeometry = new THREE.PlaneGeometry(1.5, 1.5);
      const markerMaterial = new THREE.MeshBasicMaterial({
        map: createNumberTexture(buildingData.num, buildingData.color),
        transparent: true,
      });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(building.position);
      marker.position.y += buildingData.size[1] / 2 + 1.2;
      marker.lookAt(camera.position);
      marker.userData = buildingData;

      scene.add(marker);

      // Edge highlight (subtle)
      const edges = new THREE.EdgesGeometry(geometry);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1, transparent: true, opacity: 0.2 })
      );
      line.position.copy(building.position);
      scene.add(line);
    });

    buildingsRef.current = buildings;

    // Mouse interaction
    const onMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(scene.children);

      buildings.forEach((building) => {
        building.material.emissive.setHex(0x000000);
        building.scale.set(1, 1, 1);
      });

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData.id) {
          setHoveredBuilding(hit.userData);
          const mainBuilding = buildings.find(b => b.userData.id === hit.userData.id);
          if (mainBuilding) {
            mainBuilding.material.emissive.setHex(0x444444);
            mainBuilding.scale.set(1.05, 1.02, 1.05);
          }
          renderer.domElement.style.cursor = 'pointer';
        }
      } else {
        setHoveredBuilding(null);
        renderer.domElement.style.cursor = 'default';
      }
    };

    const onMouseClick = () => {
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(scene.children);

      if (intersects.length > 0) {
        const buildingData = intersects[0].object.userData;
        if (buildingData.id) {
          setSelectedBuilding(buildingData);
          if (onBuildingSelect) {
            onBuildingSelect(buildingData);
          }
        }
      }
    };

    const onWindowResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };

    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onMouseClick);
    window.addEventListener('resize', onWindowResize);

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (autoRotate) {
        camera.position.x = Math.sin(Date.now() * 0.0001) * 28;
        camera.position.z = Math.cos(Date.now() * 0.0001) * 28;
      }

      camera.lookAt(scene.position);

      // Update marker rotation to face camera
      scene.children.forEach((child) => {
        if (child.userData.num !== undefined && child.userData.num > 0) {
          child.quaternion.copy(camera.quaternion);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('click', onMouseClick);
      window.removeEventListener('resize', onWindowResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [onBuildingSelect, autoRotate]);

  const handleResetView = () => {
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 18, 25);
      setAutoRotate(true);
    }
  };

  const handleNavigate = () => {
    if (selectedBuilding?.id) {
      navigate(`/navigator?location=${selectedBuilding.id}`);
    }
  };

  return (
    <div className="w-full bg-dark rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent/10 to-cyan-500/10 border-b border-accent/20 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/30 border border-accent/50 rounded-lg flex items-center justify-center">
              <Info className="w-5 h-5 text-accent" />
            </div>
            Realistic 3D Campus Map
          </h2>
          <p className="text-xs text-slate-400 mt-1">Photorealistic view with numbered locations • Click buildings to navigate</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className="p-2.5 bg-accent/10 border border-accent/30 text-accent rounded-lg hover:bg-accent/20 transition-all"
            title="Toggle Auto Rotate"
          >
            <RotateCw className="w-5 h-5" />
          </button>
          <button
            onClick={handleResetView}
            className="p-2.5 bg-accent/10 border border-accent/30 text-accent rounded-lg hover:bg-accent/20 transition-all"
            title="Reset View"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex relative h-[600px]">
        {/* 3D Canvas */}
        <div className="flex-1 relative">
          <div ref={containerRef} className="w-full h-full" />

          {/* Instructions */}
          <div className="absolute top-4 left-4 text-xs text-slate-300 font-bold bg-dark/70 backdrop-blur border border-white/10 px-3 py-2 rounded-lg">
            🖱️ Drag to explore • Hover to highlight • Click to navigate
          </div>

          {/* Info Overlay */}
          {hoveredBuilding && (
            <div className="absolute bottom-4 left-4 bg-dark/80 backdrop-blur border border-accent/50 rounded-lg p-4 max-w-sm animate-fade-in">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black"
                  style={{ backgroundColor: '#' + hoveredBuilding.color.toString(16).padStart(6, '0') }}
                >
                  {hoveredBuilding.num}
                </div>
                <div>
                  <h3 className="font-black text-white text-sm">{hoveredBuilding.name}</h3>
                  <p className="text-xs text-slate-400">Location #{hoveredBuilding.num}</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 italic">Click to open in Navigator →</p>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-72 bg-dark/60 backdrop-blur border-l border-white/10 overflow-y-auto flex flex-col">
          {/* Location List */}
          <div className="p-5 flex-1 overflow-y-auto space-y-2">
            <h3 className="text-xs font-black text-accent uppercase tracking-[0.3em] mb-4 sticky top-0 bg-dark/80 py-2">
              🏢 Campus Buildings
            </h3>
            {campusBuildings.map((building) => (
              <button
                key={building.id}
                onClick={() => {
                  setSelectedBuilding(building);
                  if (onBuildingSelect) onBuildingSelect(building);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-3 ${
                  selectedBuilding?.id === building.id
                    ? 'bg-accent/20 border-accent/50 text-accent'
                    : 'border-white/10 text-slate-300 hover:border-accent/30 hover:bg-white/5'
                }`}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white font-black text-[10px] flex-shrink-0"
                  style={{ backgroundColor: '#' + building.color.toString(16).padStart(6, '0') }}
                >
                  {building.num}
                </div>
                <div className="min-w-0">
                  <p className="truncate">{building.name}</p>
                  <p className="text-[10px] text-slate-500">Loc #{building.num}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Building Card */}
          {selectedBuilding && (
            <div className="border-t border-white/10 p-5 bg-gradient-to-t from-accent/10 to-transparent">
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mb-1">Selected</p>
                  <h3 className="text-lg font-black text-white">{selectedBuilding.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">Location #{selectedBuilding.num}</p>
                </div>
                <button
                  onClick={handleNavigate}
                  className="w-full py-3 bg-gradient-to-r from-accent to-cyan-500 text-dark font-black uppercase tracking-wider rounded-lg hover:shadow-[0_0_20px_rgba(0,212,255,0.6)] transition-all hover:scale-105 text-xs flex items-center justify-center gap-2"
                >
                  <NavIcon className="w-4 h-4" />
                  Launch AR Navigator
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampusRealisticMap;
