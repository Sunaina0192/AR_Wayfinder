import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useNavigate } from 'react-router-dom';
import { MapPin, RotateCw, Maximize2, Navigation as NavIcon } from 'lucide-react';

const Campus3DMap = ({ onBuildingSelect }) => {
  const containerRef = useRef(null);
  const minimapRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const minimapCameraRef = useRef(null);
  const minimapRendererRef = useRef(null);
  const buildingsRef = useRef([]);
  const markersRef = useRef([]);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const [hoveredBuilding, setHoveredBuilding] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const navigate = useNavigate();

  const campusBuildings = [
    { id: 'entry-gate', name: 'Entry Gate', num: 1, pos: [0, 0.8, -8], size: [1, 1.2, 1], color: 0x00d4ff },
    { id: 'school-block', name: 'School Block', num: 2, pos: [-5, 1.2, -3], size: [2.5, 2.5, 2.5], color: 0xff00ff },
    { id: 'block-5-uiet', name: 'Block 5 (UIET)', num: 7, pos: [5, 1.5, -2], size: [2, 3, 2], color: 0x00ff88 },
    { id: 'library', name: 'Library', num: 13, pos: [-7, 1.8, 4], size: [2, 3.5, 2], color: 0xffaa00 },
    { id: 'admission-cell', name: 'Admission Cell', num: 14, pos: [-3, 0.6, 6], size: [1.5, 1.5, 1.5], color: 0xff0055 },
    { id: 'block-3', name: 'Block 3', num: 3, pos: [4, 1.3, 5], size: [2, 2.5, 2], color: 0x00ffff },
    { id: 'girls-hostel', name: 'Girls Hostel', num: 10, pos: [-8, 1.5, 1], size: [2, 3, 2], color: 0xff1493 },
    { id: 'boys-hostel', name: 'Boys Hostel', num: 15, pos: [8, 1.5, 2], size: [2, 3, 2], color: 0x0088ff },
    { id: 'stadium', name: 'Stadium', num: 8, pos: [0, 0.4, -11], size: [4, 0.8, 3.5], color: 0x00ff00 },
    { id: 'canteen-block-7', name: 'Canteen', num: 12, pos: [-2, 0.9, -7], size: [1.2, 1.8, 1.2], color: 0xffff00 },
    { id: 'workshop-center', name: 'Workshop', num: 11, pos: [2, 0.9, -7], size: [1.2, 1.8, 1.2], color: 0xff6600 },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Main Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f1419);
    scene.fog = new THREE.Fog(0x0f1419, 40, 80);
    sceneRef.current = scene;

    // Main Camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / (window.innerHeight - 200), 0.1, 1000);
    camera.position.set(0, 12, 18);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight - 150);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent camera from going below ground
    controls.minDistance = 1; // Allows zooming in very close
    controls.maxDistance = 150; // Allows zooming out further
    controlsRef.current = controls;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x4488ff, 0.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(15, 25, 15);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.left = -30;
    mainLight.shadow.camera.right = 30;
    mainLight.shadow.camera.top = 30;
    mainLight.shadow.camera.bottom = -30;
    scene.add(mainLight);

    const accentLight = new THREE.PointLight(0xff00ff, 0.5, 60);
    accentLight.position.set(-20, 10, -20);
    scene.add(accentLight);

    // Ground with gradient
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a2332,
      metalness: 0.2,
      roughness: 0.9,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Enhanced Grid
    const gridHelper = new THREE.GridHelper(50, 50, 0x00ffff, 0x003355);
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.3;
    gridHelper.position.y = 0.02;
    scene.add(gridHelper);

    // Create Buildings
    const buildings = [];
    const markers = [];
    
    campusBuildings.forEach((buildingData) => {
      // Building geometry
      const geometry = new THREE.BoxGeometry(buildingData.size[0], buildingData.size[1], buildingData.size[2]);
      
      // Main material
      const material = new THREE.MeshStandardMaterial({
        color: buildingData.color,
        metalness: 0.6,
        roughness: 0.3,
        emissive: buildingData.color,
        emissiveIntensity: 0.3,
      });

      const building = new THREE.Mesh(geometry, material);
      building.position.set(buildingData.pos[0], buildingData.pos[1], buildingData.pos[2]);
      building.castShadow = true;
      building.receiveShadow = true;
      building.userData = buildingData;
      
      scene.add(building);
      buildings.push(building);

      // Create glow sphere (outline effect)
      const outlineGeometry = new THREE.SphereGeometry(2, 8, 8);
      const outlineMaterial = new THREE.MeshBasicMaterial({
        color: buildingData.color,
        transparent: true,
        opacity: 0,
      });
      const outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
      outline.position.copy(building.position);
      outline.userData.mainBuilding = building;
      scene.add(outline);

      // Create floating number marker
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#' + buildingData.color.toString(16).padStart(6, '0');
      ctx.fillRect(0, 0, 256, 256);
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 150px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(buildingData.num, 128, 128);

      const texture = new THREE.CanvasTexture(canvas);
      const markerGeometry = new THREE.PlaneGeometry(1.5, 1.5);
      const markerMaterial = new THREE.MeshBasicMaterial({ map: texture });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(building.position);
      marker.position.y += buildingData.size[1] / 2 + 1;
      marker.userData = buildingData;
      scene.add(marker);
      markers.push(marker);
    });

    buildingsRef.current = buildings;
    markersRef.current = markers;

    // Minimap Setup
    if (minimapRef.current) {
      const minimapScene = new THREE.Scene();
      minimapScene.background = new THREE.Color(0x0a0e1f);

      const minimapCamera = new THREE.OrthographicCamera(-30, 30, 30, -30, 0.1, 100);
      minimapCamera.position.set(0, 50, 0);
      minimapCamera.lookAt(0, 0, 0);
      minimapCameraRef.current = minimapCamera;

      const minimapRenderer = new THREE.WebGLRenderer({ antialias: true });
      minimapRenderer.setSize(200, 200);
      minimapRef.current.appendChild(minimapRenderer.domElement);
      minimapRendererRef.current = minimapRenderer;

      // Minimap ground
      const minimapGround = new THREE.Mesh(
        new THREE.PlaneGeometry(50, 50),
        new THREE.MeshBasicMaterial({ color: 0x1a2332 })
      );
      minimapGround.rotation.x = -Math.PI / 2;
      minimapScene.add(minimapGround);

      // Minimap buildings
      buildings.forEach((building) => {
        const miniBuilding = new THREE.Mesh(
          new THREE.BoxGeometry(building.geometry.parameters.width * 0.8, 0.5, building.geometry.parameters.depth * 0.8),
          new THREE.MeshBasicMaterial({ color: building.userData.color })
        );
        miniBuilding.position.copy(building.position);
        miniBuilding.position.y = 0.3;
        minimapScene.add(miniBuilding);
      });

      // Minimap animation
      const miniAnimate = () => {
        requestAnimationFrame(miniAnimate);
        const angle = (Date.now() * 0.0001) % (Math.PI * 2);
        minimapCamera.position.x = Math.sin(angle) * 35;
        minimapCamera.position.z = Math.cos(angle) * 35;
        minimapCamera.lookAt(0, 0, 0);
        minimapRenderer.render(minimapScene, minimapCamera);
      };
      miniAnimate();
    }

    // Mouse interaction
    const onMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -((event.clientY - 150) / (window.innerHeight - 200)) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects([...buildings, ...markers]);

      buildings.forEach((building) => {
        building.material.emissiveIntensity = 0.3;
        building.scale.set(1, 1, 1);
      });

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const buildingData = hit.userData;
        
        if (buildingData.id) {
          setHoveredBuilding(buildingData);
          const mainBuilding = buildings.find(b => b.userData.id === buildingData.id);
          if (mainBuilding) {
            mainBuilding.material.emissiveIntensity = 1;
            mainBuilding.scale.set(1.08, 1.04, 1.08);
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
      const intersects = raycasterRef.current.intersectObjects([...buildings, ...markers]);

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
        const height = containerRef.current.clientHeight - 150;
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

      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 1.5;
      controls.update();

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('click', onMouseClick);
      window.removeEventListener('resize', onWindowResize);
      containerRef.current?.removeChild(renderer.domElement);
      minimapRef.current?.firstChild && minimapRef.current.removeChild(minimapRef.current.firstChild);
    };
  }, [onBuildingSelect, autoRotate]);

  const handleResetView = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 12, 18);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
      setAutoRotate(true);
    }
  };

  const handleNavigate = () => {
    if (selectedBuilding && selectedBuilding.id) {
      navigate(`/navigator?location=${selectedBuilding.id}`);
    }
  };

  return (
    <div className="w-full bg-dark rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-dark to-dark/80 border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-3">
            <div className="w-8 h-8 bg-accent/20 border border-accent rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            3D Interactive Campus Map
          </h2>
          <p className="text-xs text-slate-500 mt-1">Explore all 11 locations • Hover & Click to interact</p>
        </div>
        <div className="flex gap-2">
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
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* 3D Canvas */}
        <div className="flex-1 relative">
          <div ref={containerRef} className="w-full h-96" />

          {/* Instructions */}
          <div className="absolute top-4 left-4 text-xs text-slate-400 font-medium bg-dark/60 backdrop-blur border border-white/10 px-3 py-2 rounded-lg">
            🖱️ Drag to rotate • Hover to select • Click to navigate
          </div>

          {/* Minimap */}
          <div className="absolute bottom-4 right-4 border-2 border-accent/50 rounded-lg overflow-hidden shadow-lg" ref={minimapRef} />
        </div>

        {/* Sidebar */}
        <div className="w-64 bg-dark/50 backdrop-blur border-l border-white/10 overflow-y-auto">
          {/* Location List */}
          <div className="p-4 space-y-2">
            <h3 className="text-xs font-black text-accent uppercase tracking-[0.2em] mb-3">Campus Locations</h3>
            {campusBuildings.map((building) => (
              <button
                key={building.id}
                onClick={() => {
                  setSelectedBuilding(building);
                  if (onBuildingSelect) {
                    onBuildingSelect(building);
                  }
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-all border ${
                  selectedBuilding?.id === building.id
                    ? 'bg-accent/20 border-accent/50 text-accent'
                    : 'border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-black"
                    style={{ backgroundColor: '#' + building.color.toString(16).padStart(6, '0') }}
                  >
                    {building.num}
                  </div>
                  <div>
                    <p className="text-xs font-black">{building.name}</p>
                    <p className="text-[10px] text-slate-500">Location {building.num}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Building Info */}
          {selectedBuilding && (
            <div className="border-t border-white/10 p-4 sticky bottom-0 bg-dark/60 backdrop-blur">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Selected Location</p>
                  <h3 className="text-lg font-black text-white">{selectedBuilding.name}</h3>
                </div>
                <button
                  onClick={handleNavigate}
                  className="w-full py-2.5 bg-gradient-to-r from-accent to-cyan-500 text-dark font-black uppercase tracking-wider rounded-lg hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] transition-all hover:scale-105 text-xs flex items-center justify-center gap-2"
                >
                  <NavIcon className="w-4 h-4" />
                  Launch Navigator
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Campus3DMap;
