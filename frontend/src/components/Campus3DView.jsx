import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useNavigate } from 'react-router-dom';
import { MapPin, RotateCw, Maximize2, X } from 'lucide-react';

const Campus3DView = ({ onBuildingSelect }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const buildingsRef = useRef([]);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const [hoveredBuilding, setHoveredBuilding] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const autoRotateRef = useRef(autoRotate);
  const onBuildingSelectRef = useRef(onBuildingSelect);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    onBuildingSelectRef.current = onBuildingSelect;
  }, [onBuildingSelect]);

  const campusBuildings = [
    { id: 'entry-gate', name: 'Entry Gate', pos: [0, 1, -5], color: 0x00d4ff, height: 1.5 },
    { id: 'school-block', name: 'School Block', pos: [-4, 1, -2], color: 0xff00ff, height: 3 },
    { id: 'block-5-uiet', name: 'Block 5 (UIET)', pos: [4, 1, -2], color: 0x00ff88, height: 3.5 },
    { id: 'library', name: 'Library', pos: [-6, 1, 3], color: 0xffaa00, height: 4 },
    { id: 'admission-cell', name: 'Admission Cell', pos: [-3, 0.5, 5], color: 0xff0055, height: 2 },
    { id: 'block-3', name: 'Block 3', pos: [3, 1, 5], color: 0x00ffff, height: 3 },
    { id: 'girls-hostel', name: 'Girls Hostel', pos: [-8, 1, -1], color: 0xff1493, height: 3.5 },
    { id: 'boys-hostel', name: 'Boys Hostel', pos: [8, 1, -1], color: 0x0088ff, height: 3.5 },
    { id: 'stadium', name: 'Stadium', pos: [0, 0.5, -8], color: 0x00ff00, height: 1.5 },
    { id: 'canteen-block-7', name: 'Canteen', pos: [-2, 0.8, -6], color: 0xffff00, height: 2 },
    { id: 'workshop-center', name: 'Workshop', pos: [2, 0.8, -6], color: 0xff6600, height: 2 },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e27);
    scene.fog = new THREE.Fog(0x0a0e27, 25, 50);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 6, 12);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent camera from going below ground
    controls.minDistance = 1;
    controls.maxDistance = 150;
    controlsRef.current = controls;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x0099ff, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(0x00ffff, 1, 50);
    mainLight.position.set(0, 15, 10);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    const accentLight = new THREE.PointLight(0xff00ff, 0.8, 40);
    accentLight.position.set(-15, 8, -15);
    scene.add(accentLight);

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(40, 40);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1f3a,
      metalness: 0.3,
      roughness: 0.8,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid Helper (subtle)
    const gridHelper = new THREE.GridHelper(40, 40, 0x00ffff, 0x00ffff);
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.15;
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // Create Buildings
    const buildings = [];
    campusBuildings.forEach((buildingData) => {
      const geometry = new THREE.BoxGeometry(1, buildingData.height, 1);
      
      // Create glowing material
      const material = new THREE.MeshStandardMaterial({
        color: buildingData.color,
        metalness: 0.7,
        roughness: 0.2,
        emissive: buildingData.color,
        emissiveIntensity: 0.5,
      });

      const building = new THREE.Mesh(geometry, material);
      building.position.set(buildingData.pos[0], buildingData.pos[1], buildingData.pos[2]);
      building.castShadow = true;
      building.receiveShadow = true;
      building.userData = { ...buildingData, originalColor: buildingData.color };
      
      scene.add(building);
      buildings.push(building);

      // Add glow effect
      const glowGeometry = new THREE.BoxGeometry(1.2, buildingData.height + 0.2, 1.2);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: buildingData.color,
        transparent: true,
        opacity: 0.2,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(building.position);
      glow.userData.isGlow = true;
      glow.userData.mainBuilding = building;
      scene.add(glow);
    });

    buildingsRef.current = buildings;

    // Mouse interaction
    const onMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(scene.children);

      buildings.forEach((building) => {
        building.material.emissiveIntensity = 0.5;
        building.scale.set(1, 1, 1);
      });

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData.id) {
          setHoveredBuilding(hit.userData);
          hit.material.emissiveIntensity = 1;
          hit.scale.set(1.1, 1.05, 1.1);
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
        const hit = intersects[0].object;
        if (hit.userData.id && onBuildingSelectRef.current) {
          onBuildingSelectRef.current(hit.userData);
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

      controls.autoRotate = autoRotateRef.current;
      controls.autoRotateSpeed = 1.5;
      controls.update();

      // Animate buildings
      buildings.forEach((building, i) => {
        building.position.y += Math.sin(Date.now() * 0.001 + i) * 0.001;
        building.rotation.z += 0.001;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('click', onMouseClick);
      window.removeEventListener('resize', onWindowResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  const handleResetView = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 6, 12);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
      setAutoRotate(true);
    }
  };

  const handleFullscreen = () => {
    if (!isFullscreen && containerRef.current) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="relative w-full h-96 bg-dark rounded-2xl overflow-hidden border border-white/10 group">
      {/* 3D Canvas */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Controls Overlay */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          title="Toggle Auto Rotate"
          className="p-2.5 bg-accent/10 border border-accent/30 text-accent rounded-lg hover:bg-accent/20 transition-all hover:scale-110"
        >
          <RotateCw className="w-5 h-5" />
        </button>
        <button
          onClick={handleResetView}
          title="Reset View"
          className="p-2.5 bg-accent/10 border border-accent/30 text-accent rounded-lg hover:bg-accent/20 transition-all hover:scale-110"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Hovered Building Info */}
      {hoveredBuilding && (
        <div className="absolute bottom-4 left-4 bg-dark/80 backdrop-blur border border-accent/50 rounded-lg p-3 max-w-xs animate-fade-in">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
            <h3 className="font-black text-white text-sm">{hoveredBuilding.name}</h3>
          </div>
          <p className="text-xs text-slate-400">Click to navigate or view details</p>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute top-4 left-4 text-xs text-slate-400 font-medium bg-dark/60 backdrop-blur border border-white/10 px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
        🖱️ Drag to rotate • Hover to highlight • Click to navigate
      </div>
    </div>
  );
};

export default Campus3DView;
