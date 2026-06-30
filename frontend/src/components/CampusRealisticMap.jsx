import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Info,
  Maximize2,
  Navigation as NavIcon,
  RotateCw,
  Sparkles,
} from 'lucide-react';
import { campusLocations, pathGraph } from '../data/locations';

const campusBuildings = [
  { id: 'entry-gate', num: 1, pos: [-18, 0.7, 14], size: [4.8, 1.4, 1], color: 0x22d3ee, type: 'gate' },
  { id: 'school', num: 2, pos: [-11, 1.9, 6], size: [4.5, 3.8, 3.2], color: 0x38bdf8, type: 'academic' },
  { id: 'school-admin', num: 3, pos: [-14, 1.5, 10], size: [3.4, 3, 2.6], color: 0xf472b6, type: 'admin' },
  { id: 'dispensary', num: 4, pos: [5, 1.25, 6.5], size: [2.8, 2.5, 2.2], color: 0x34d399, type: 'facility' },
  { id: 'auditorium', num: 5, pos: [11, 1.8, 1.5], size: [5.2, 3.6, 3.8], color: 0xa78bfa, type: 'facility' },
  { id: 'football-ground', num: 6, pos: [4.5, 0.08, -3.5], size: [7.5, 0.16, 4.7], color: 0x22c55e, type: 'field' },
  { id: 'block5-uiet', num: 7, pos: [-4.5, 2.3, 4.5], size: [5.2, 4.6, 3.8], color: 0x06b6d4, type: 'academic' },
  { id: 'stadium', num: 8, pos: [13.5, 0.45, -6.5], size: [6.8, 0.9, 5.2], color: 0x84cc16, type: 'stadium' },
  { id: 'block3', num: 9, pos: [-3.5, 1.8, 10], size: [4.6, 3.6, 3.2], color: 0x60a5fa, type: 'academic' },
  { id: 'girls-hostel', num: 10, pos: [-13, 3, -9.5], size: [4.2, 6, 3.4], color: 0xfb7185, type: 'hostel' },
  { id: 'nursing-block', num: 11, pos: [1.5, 2.2, -10], size: [4, 4.4, 3.2], color: 0x2dd4bf, type: 'academic' },
  { id: 'girls-canteen', num: 12, pos: [-9, 1.2, -4.8], size: [3.2, 2.4, 2.5], color: 0xfbbf24, type: 'facility' },
  { id: 'library', num: 13, pos: [1, 2.6, 2.2], size: [4.8, 5.2, 3.8], color: 0x818cf8, type: 'library' },
  { id: 'admission-cell', num: 14, pos: [-17, 1.05, 9.2], size: [2.6, 2.1, 2.1], color: 0x0ea5e9, type: 'admin' },
  { id: 'boys-hostel', num: 15, pos: [13.5, 3.2, -11], size: [4.2, 6.4, 3.4], color: 0x3b82f6, type: 'hostel' },
  { id: 'main-parking', num: 16, pos: [-15, 0.08, 2], size: [7.2, 0.16, 4.6], color: 0xfacc15, type: 'parking' },
  { id: 'law-block', num: 17, pos: [10, 1.9, 7], size: [4.2, 3.8, 3.4], color: 0xc084fc, type: 'academic' },
  { id: 'gurudwara', num: 18, pos: [18, 1.7, 4], size: [3.8, 3.4, 3.8], color: 0xffffff, type: 'spiritual' },
  { id: 'main-ground', num: 19, pos: [-0.5, 0.08, -3.7], size: [8, 0.16, 5.2], color: 0x16a34a, type: 'field' },
  { id: 'room-112', num: 20, pos: [-10, 1.9, 8], size: [2, 2, 2], color: 0x38bdf8, type: 'academic' },
].map((building) => ({
  ...building,
  ...campusLocations.find((location) => location.id === building.id),
}));

const createNumberTexture = (number, color) => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const hex = `#${color.toString(16).padStart(6, '0')}`;

  ctx.clearRect(0, 0, 256, 256);
  ctx.fillStyle = 'rgba(2, 6, 23, 0.9)';
  ctx.beginPath();
  ctx.arc(128, 128, 112, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = hex;
  ctx.lineWidth = 12;
  ctx.shadowColor = hex;
  ctx.shadowBlur = 24;
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 104px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(number, 128, 132);

  return new THREE.CanvasTexture(canvas);
};

const createFacadeTexture = (color, type) => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const base = `#${color.toString(16).padStart(6, '0')}`;

  const gradient = ctx.createLinearGradient(0, 0, 256, 256);
  gradient.addColorStop(0, '#07111f');
  gradient.addColorStop(0.45, base);
  gradient.addColorStop(1, '#020617');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  ctx.fillStyle = type === 'hostel' ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.46)';
  for (let y = 28; y < 230; y += 36) {
    for (let x = 22; x < 230; x += 42) {
      ctx.fillRect(x, y, 18, 13);
    }
  }

  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 2;
  ctx.strokeRect(4, 4, 248, 248);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const createFieldTexture = (primary, secondary = '#0f3f2e') => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = primary;
  ctx.fillRect(0, 0, 512, 256);
  ctx.fillStyle = secondary;
  for (let x = 0; x < 512; x += 64) {
    ctx.fillRect(x, 0, 32, 256);
  }
  ctx.strokeStyle = 'rgba(255,255,255,0.75)';
  ctx.lineWidth = 5;
  ctx.strokeRect(22, 22, 468, 212);
  ctx.beginPath();
  ctx.arc(256, 128, 38, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(256, 22);
  ctx.lineTo(256, 234);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const createRoad = (scene, points) => {
  const curve = new THREE.CatmullRomCurve3(points.map(([x, z]) => new THREE.Vector3(x, 0.04, z)));
  const geometry = new THREE.TubeGeometry(curve, 48, 0.18, 8, false);
  const material = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.42,
  });
  const road = new THREE.Mesh(geometry, material);
  scene.add(road);
};

const CampusRealisticMap = ({ onBuildingSelect }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const interactablesRef = useRef([]);
  const selectedMeshRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const hoveredIdRef = useRef(null);
  const [hoveredBuilding, setHoveredBuilding] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const navigate = useNavigate();

  const locationCount = useMemo(() => campusBuildings.length, []);

  useEffect(() => {
    if (!containerRef.current) return undefined;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617);
    scene.fog = new THREE.Fog(0x020617, 28, 76);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(52, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(-7, 20, 29);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent camera from going below ground
    controls.minDistance = 1; // Allows zooming in very close
    controls.maxDistance = 150; // Allows zooming out further
    controlsRef.current = controls;

    const ambient = new THREE.AmbientLight(0x9cc9ff, 0.55);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.15);
    keyLight.position.set(16, 28, 18);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    keyLight.shadow.camera.left = -30;
    keyLight.shadow.camera.right = 30;
    keyLight.shadow.camera.top = 30;
    keyLight.shadow.camera.bottom = -30;
    scene.add(keyLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 2.2, 46);
    cyanLight.position.set(-12, 8, 12);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 1.6, 38);
    violetLight.position.set(14, 7, -10);
    scene.add(violetLight);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(48, 36),
      new THREE.MeshStandardMaterial({
        color: 0x07111f,
        metalness: 0.2,
        roughness: 0.82,
      })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const grid = new THREE.GridHelper(48, 48, 0x22d3ee, 0x1e293b);
    grid.material.transparent = true;
    grid.material.opacity = 0.22;
    grid.position.y = 0.06;
    scene.add(grid);

    createRoad(scene, [[-19, 14], [-15, 10], [-10, 6], [-4, 4.5], [1, 2.2], [5, 6.5], [10, 7], [18, 4]]);
    createRoad(scene, [[-15, 2], [-9, -4.8], [-0.5, -3.7], [4.5, -3.5], [13.5, -6.5]]);
    createRoad(scene, [[-13, -9.5], [-9, -4.8], [1.5, -10], [13.5, -11]]);
    createRoad(scene, [[-3.5, 10], [1, 2.2], [11, 1.5], [13.5, -6.5]]);

    const buildings = [];
    const markers = [];
    const rings = [];

    campusBuildings.forEach((buildingData) => {
      const isFlat = ['field', 'parking'].includes(buildingData.type);
      const isStadium = buildingData.type === 'stadium';
      const color = buildingData.color;

      let building;
      if (isFlat) {
        building = new THREE.Mesh(
          new THREE.BoxGeometry(...buildingData.size),
          new THREE.MeshStandardMaterial({
            map: createFieldTexture(buildingData.type === 'parking' ? '#334155' : '#15803d', buildingData.type === 'parking' ? '#1f2937' : '#166534'),
            emissive: color,
            emissiveIntensity: buildingData.type === 'parking' ? 0.1 : 0.16,
            roughness: 0.72,
          })
        );
      } else if (isStadium) {
        building = new THREE.Mesh(
          new THREE.CylinderGeometry(buildingData.size[0] / 2, buildingData.size[0] / 2, buildingData.size[1], 48, 1, true),
          new THREE.MeshStandardMaterial({
            color,
            emissive: color,
            emissiveIntensity: 0.2,
            metalness: 0.25,
            roughness: 0.45,
            transparent: true,
            opacity: 0.88,
          })
        );
        building.scale.z = buildingData.size[2] / buildingData.size[0];
      } else {
        building = new THREE.Mesh(
          new THREE.BoxGeometry(...buildingData.size),
          new THREE.MeshStandardMaterial({
            map: createFacadeTexture(color, buildingData.type),
            emissive: color,
            emissiveIntensity: 0.16,
            metalness: 0.28,
            roughness: 0.38,
          })
        );
      }

      building.position.set(...buildingData.pos);
      building.castShadow = !isFlat;
      building.receiveShadow = true;
      building.userData = buildingData;
      scene.add(building);
      buildings.push(building);

      if (buildingData.type === 'gate') {
        const arch = new THREE.Mesh(
          new THREE.TorusGeometry(1.8, 0.14, 12, 36, Math.PI),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95 })
        );
        arch.position.set(buildingData.pos[0], 1.7, buildingData.pos[2]);
        arch.rotation.z = Math.PI;
        arch.userData = buildingData;
        scene.add(arch);
        buildings.push(arch);
      }

      const edgeGeometry = new THREE.EdgesGeometry(building.geometry);
      const edge = new THREE.LineSegments(
        edgeGeometry,
        new THREE.LineBasicMaterial({ color, transparent: true, opacity: isFlat ? 0.2 : 0.42 })
      );
      edge.position.copy(building.position);
      edge.rotation.copy(building.rotation);
      edge.scale.copy(building.scale);
      scene.add(edge);

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.85, 1.12, 42),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.34,
          side: THREE.DoubleSide,
        })
      );
      ring.position.set(buildingData.pos[0], 0.12, buildingData.pos[2]);
      ring.rotation.x = -Math.PI / 2;
      ring.userData = buildingData;
      scene.add(ring);
      rings.push(ring);

      const marker = new THREE.Mesh(
        new THREE.PlaneGeometry(1.45, 1.45),
        new THREE.MeshBasicMaterial({
          map: createNumberTexture(buildingData.num, color),
          transparent: true,
          depthWrite: false,
        })
      );
      marker.position.set(
        buildingData.pos[0],
        buildingData.pos[1] + Math.max(buildingData.size[1] / 2, 0.7) + 1.25,
        buildingData.pos[2]
      );
      marker.userData = buildingData;
      scene.add(marker);
      markers.push(marker);
    });

    interactablesRef.current = [...buildings, ...markers];

    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(280 * 3);
    for (let i = 0; i < 280; i += 1) {
      positions[i * 3] = THREE.MathUtils.randFloatSpread(44);
      positions[i * 3 + 1] = THREE.MathUtils.randFloat(1.5, 13);
      positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(32);
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0x67e8f9,
        size: 0.045,
        transparent: true,
        opacity: 0.55,
      })
    );
    scene.add(particles);

    const scan = new THREE.Mesh(
      new THREE.RingGeometry(2, 2.08, 96),
      new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide,
      })
    );
    scan.rotation.x = -Math.PI / 2;
    scan.position.y = 0.16;
    scene.add(scan);

    const updateMouse = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const pickBuilding = () => {
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(interactablesRef.current, false);
      return intersects.find((hit) => hit.object.userData?.id)?.object.userData || null;
    };

    const onMouseMove = (event) => {
      updateMouse(event);
      const buildingData = pickBuilding();
      hoveredIdRef.current = buildingData?.id || null;
      setHoveredBuilding(buildingData);
      renderer.domElement.style.cursor = buildingData ? 'pointer' : 'grab';
    };

    const onMouseClick = () => {
      const buildingData = pickBuilding();
      if (!buildingData) return;
      setSelectedBuilding(buildingData);
      selectedMeshRef.current = buildings.find((mesh) => mesh.userData?.id === buildingData.id) || null;
    };

    const onWindowResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onMouseClick);
    window.addEventListener('resize', onWindowResize);

    let animationId;
    const clock = new THREE.Clock();
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 1.5;
      controls.update();

      markers.forEach((marker, index) => {
        marker.quaternion.copy(camera.quaternion);
        marker.position.y += Math.sin(elapsed * 2.4 + index) * 0.0025;
      });

      rings.forEach((ring, index) => {
        const active = selectedMeshRef.current?.userData?.id === ring.userData?.id;
        const pulse = 1 + Math.sin(elapsed * 2.6 + index) * 0.08;
        ring.scale.setScalar(active ? pulse * 1.45 : pulse);
        ring.material.opacity = active ? 0.68 : 0.3;
      });

      buildings.forEach((mesh) => {
        const isSelected = selectedMeshRef.current?.userData?.id === mesh.userData?.id;
        const isHovered = hoveredIdRef.current === mesh.userData?.id;
        if (mesh.material?.emissiveIntensity !== undefined) {
          mesh.material.emissiveIntensity = isSelected ? 0.75 : isHovered ? 0.48 : 0.16;
        }
      });

      scan.scale.setScalar(1 + ((elapsed * 0.22) % 1) * 9);
      scan.material.opacity = 0.28 * (1 - ((elapsed * 0.22) % 1));
      particles.rotation.y = elapsed * 0.018;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('click', onMouseClick);
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [autoRotate]);

  const handleResetView = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(-7, 20, 29);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
      setAutoRotate(true);
    }
  };

  const selectBuilding = (building) => {
    setSelectedBuilding(building);
    selectedMeshRef.current = interactablesRef.current.find((mesh) => mesh.userData?.id === building.id) || null;
  };

  const handleNavigate = () => {
    if (selectedBuilding?.id) {
      navigate(`/navigator?location=${selectedBuilding.id}`);
      if (onBuildingSelect) onBuildingSelect(selectedBuilding);
    }
  };

  return (
    <div className="w-full bg-dark rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      <div className="bg-gradient-to-r from-accent/10 via-secondary/10 to-cyan-500/10 border-b border-accent/20 px-6 py-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/20 border border-accent/50 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            Futuristic 3D Campus Map
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {locationCount} numbered landmarks with animated AR-style route intelligence
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setAutoRotate((value) => !value)}
            className="p-2.5 bg-accent/10 border border-accent/30 text-accent rounded-lg hover:bg-accent/20 transition-all"
            title="Toggle auto rotate"
            type="button"
          >
            <RotateCw className="w-5 h-5" />
          </button>
          <button
            onClick={handleResetView}
            className="p-2.5 bg-accent/10 border border-accent/30 text-accent rounded-lg hover:bg-accent/20 transition-all"
            title="Reset view"
            type="button"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex relative h-[600px]">
        <div className="flex-1 relative min-w-0">
          <div ref={containerRef} className="w-full h-full" />

          <div className="absolute top-4 left-4 text-xs text-slate-300 font-bold bg-dark/70 backdrop-blur border border-white/10 px-3 py-2 rounded-lg">
            Drag to orbit - Hover markers - Click to inspect
          </div>

          {hoveredBuilding && (
            <div className="absolute bottom-4 left-4 bg-dark/85 backdrop-blur border border-accent/50 rounded-lg p-4 max-w-sm animate-fade-in">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-xs border border-white/40"
                  style={{ backgroundColor: `#${hoveredBuilding.color.toString(16).padStart(6, '0')}` }}
                >
                  {hoveredBuilding.num}
                </div>
                <div>
                  <h3 className="font-black text-white text-sm">{hoveredBuilding.name}</h3>
                  <p className="text-xs text-slate-400">{hoveredBuilding.category}</p>
                </div>
              </div>
              <p className="text-xs text-slate-300">{hoveredBuilding.description}</p>
            </div>
          )}
        </div>

        <div className="w-72 bg-dark/60 backdrop-blur border-l border-white/10 overflow-y-auto flex flex-col">
          <div className="p-5 flex-1 overflow-y-auto space-y-2">
            <h3 className="text-xs font-black text-accent uppercase tracking-[0.3em] mb-4 sticky top-0 bg-dark/90 py-2 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Campus Nodes
            </h3>
            {campusBuildings.map((building) => (
              <button
                key={building.id}
                onClick={() => selectBuilding(building)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-3 ${
                  selectedBuilding?.id === building.id
                    ? 'bg-accent/20 border-accent/50 text-accent'
                    : 'border-white/10 text-slate-300 hover:border-accent/30 hover:bg-white/5'
                }`}
                type="button"
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white font-black text-[10px] flex-shrink-0 border border-white/30"
                  style={{ backgroundColor: `#${building.color.toString(16).padStart(6, '0')}` }}
                >
                  {building.num}
                </div>
                <div className="min-w-0">
                  <p className="truncate">{building.name}</p>
                  <p className="text-[10px] text-slate-500">{building.category}</p>
                </div>
              </button>
            ))}
          </div>

          {selectedBuilding && (
            <div className="border-t border-white/10 p-5 bg-gradient-to-t from-accent/10 to-transparent">
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mb-1 flex items-center gap-2">
                    <Info className="w-3.5 h-3.5" />
                    Selected Node
                  </p>
                  <h3 className="text-lg font-black text-white">{selectedBuilding.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Connected routes: {pathGraph[selectedBuilding.id]?.neighbors?.length || 0}
                  </p>
                </div>
                <button
                  onClick={handleNavigate}
                  className="w-full py-3 bg-gradient-to-r from-accent to-cyan-500 text-dark font-black uppercase tracking-wider rounded-lg hover:shadow-[0_0_20px_rgba(0,212,255,0.6)] transition-all hover:scale-105 text-xs flex items-center justify-center gap-2"
                  type="button"
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
