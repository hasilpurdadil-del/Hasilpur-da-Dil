import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Minimize2, 
  Eye, Zap, Shield, Sun, Moon, CloudRain, Sunset, Music, 
  Lightbulb, AlertTriangle, ArrowLeft, ArrowRight, Gauge, 
  Compass, MapPin, Sparkles, Flame
} from 'lucide-react';
import { LIVERIES, MAPS, BusLivery, MapConfig, WeatherType, CameraView } from './types';
import { gameSound } from './SoundEngine';

export const BussidGame: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Game state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedLivery, setSelectedLivery] = useState<BusLivery>(LIVERIES[0]);
  const [selectedMap, setSelectedMap] = useState<MapConfig>(MAPS[0]);
  const [weather, setWeather] = useState<WeatherType>('day');
  const [cameraView, setCameraView] = useState<CameraView>('chase');

  // Bus controls & telemetry
  const [speed, setSpeed] = useState<number>(0);
  const [gear, setGear] = useState<'D' | 'N' | 'R'>('D');
  const [distance, setDistance] = useState<number>(0);
  const [fuel, setFuel] = useState<number>(95);
  const [passengerSatisfaction, setPassengerSatisfaction] = useState<number>(98);

  // Lights state
  const [headlightMode, setHeadlightMode] = useState<'off' | 'low' | 'high'>('high');
  const [stroboActive, setStroboActive] = useState<boolean>(true);
  const [underglowActive, setUnderglowActive] = useState<boolean>(true);
  const [cabinLightActive, setCabinLightActive] = useState<boolean>(true);
  const [hazardActive, setHazardActive] = useState<boolean>(false);
  const [leftIndicator, setLeftIndicator] = useState<boolean>(false);
  const [rightIndicator, setRightIndicator] = useState<boolean>(false);
  const [hornType, setHornType] = useState<'basuri' | 'telolet' | 'pakistani'>('basuri');

  // Input states
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const mobileSteer = useRef<number>(0); // -1 to 1
  const mobileGas = useRef<boolean>(false);
  const mobileBrake = useRef<boolean>(false);

  // Three.js internal refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const busGroupRef = useRef<THREE.Group | null>(null);
  const wheelsRef = useRef<THREE.Mesh[]>([]);
  const steeringWheelRef = useRef<THREE.Mesh | null>(null);
  const roadSegmentsRef = useRef<THREE.Group[]>([]);
  const sceneryObjectsRef = useRef<THREE.Group[]>([]);
  const trafficVehiclesRef = useRef<{ mesh: THREE.Group; speed: number; lane: number }[]>([]);
  const rainSystemRef = useRef<THREE.Points | null>(null);
  const animFrameId = useRef<number | null>(null);

  // Lighting Three.js nodes
  const headLightsRef = useRef<THREE.SpotLight[]>([]);
  const stroboLightsRef = useRef<THREE.PointLight[]>([]);
  const underglowLightRef = useRef<THREE.PointLight | null>(null);
  const cabinLightRef = useRef<THREE.PointLight | null>(null);
  const tailLightsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  // Telemetry ref for 60fps loop
  const telemetry = useRef({
    speed: 0,
    maxSpeed: 135,
    acceleration: 0.35,
    braking: 0.65,
    friction: 0.08,
    steerAngle: 0,
    busX: 0,
    distance: 0,
    stroboTimer: 0,
    indicatorTimer: 0,
  });

  // Handle horn action
  const triggerHorn = useCallback((type = hornType) => {
    if (type === 'basuri') {
      gameSound.playBasuriTelolet();
    } else if (type === 'telolet') {
      gameSound.playOmTelolet();
    } else {
      gameSound.playPakistaniAirHorn();
    }
  }, [hornType]);

  // Build 3D Bus Mesh
  const buildBusMesh = useCallback((livery: BusLivery) => {
    const bus = new THREE.Group();
    wheelsRef.current = [];

    const bodyMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(livery.bodyColor),
      metalness: 0.4,
      roughness: 0.25,
    });

    const roofMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(livery.roofColor),
      metalness: 0.2,
      roughness: 0.5,
    });

    const glassMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x1e293b),
      transparent: true,
      opacity: 0.55,
      metalness: 0.9,
      roughness: 0.1,
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(livery.accentColor),
      metalness: 0.6,
      roughness: 0.3,
    });

    // 1. Lower Main Chassis
    const lowerBodyGeo = new THREE.BoxGeometry(2.6, 1.4, 8.8);
    const lowerBody = new THREE.Mesh(lowerBodyGeo, bodyMat);
    lowerBody.position.y = 1.0;
    lowerBody.castShadow = true;
    lowerBody.receiveShadow = true;
    bus.add(lowerBody);

    // 2. Upper Passenger Deck (Super High Deck SHD)
    const upperBodyGeo = new THREE.BoxGeometry(2.55, 1.3, 8.6);
    const upperBody = new THREE.Mesh(upperBodyGeo, bodyMat);
    upperBody.position.y = 2.3;
    upperBody.castShadow = true;
    bus.add(upperBody);

    // 3. Curved Roof
    const roofGeo = new THREE.BoxGeometry(2.5, 0.3, 8.5);
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 3.05;
    bus.add(roof);

    // Roof AC Unit
    const acGeo = new THREE.BoxGeometry(1.6, 0.35, 3.2);
    const acUnit = new THREE.Mesh(acGeo, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 }));
    acUnit.position.set(0, 3.3, -0.5);
    bus.add(acUnit);

    // 4. Large Panoramic Windshield
    const frontWindshieldGeo = new THREE.BoxGeometry(2.4, 1.8, 0.1);
    const frontWindshield = new THREE.Mesh(frontWindshieldGeo, glassMat);
    frontWindshield.position.set(0, 2.0, 4.41);
    frontWindshield.rotation.x = -0.12;
    bus.add(frontWindshield);

    // Side Passenger Windows (Left & Right)
    const sideWindowGeo = new THREE.BoxGeometry(0.08, 0.9, 7.2);
    const leftWindows = new THREE.Mesh(sideWindowGeo, glassMat);
    leftWindows.position.set(-1.28, 2.2, -0.3);
    bus.add(leftWindows);

    const rightWindows = new THREE.Mesh(sideWindowGeo, glassMat);
    rightWindows.position.set(1.28, 2.2, -0.3);
    bus.add(rightWindows);

    // 5. Front Grill & Bumpers
    const bumperGeo = new THREE.BoxGeometry(2.6, 0.45, 0.4);
    const bumper = new THREE.Mesh(bumperGeo, new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 }));
    bumper.position.set(0, 0.5, 4.45);
    bus.add(bumper);

    // Decorative Racing / Livery Stripes
    const stripeGeo = new THREE.BoxGeometry(2.62, 0.15, 8.7);
    const stripeMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(livery.stripeColor), metalness: 0.5 });
    const sideStripe = new THREE.Mesh(stripeGeo, stripeMat);
    sideStripe.position.y = 1.6;
    bus.add(sideStripe);

    // 6. Wheels (Front 2, Rear Dual Tandem 4)
    const wheelGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.35, 20);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.9 });
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.8, roughness: 0.2 });

    const wheelPositions = [
      [-1.25, 0.5, 2.8],  // Front Left
      [1.25, 0.5, 2.8],   // Front Right
      [-1.25, 0.5, -2.4], // Rear 1 Left
      [1.25, 0.5, -2.4],  // Rear 1 Right
      [-1.25, 0.5, -3.5], // Rear 2 Left
      [1.25, 0.5, -3.5],  // Rear 2 Right
    ];

    wheelPositions.forEach((pos) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(pos[0], pos[1], pos[2]);

      const tire = new THREE.Mesh(wheelGeo, wheelMat);
      tire.rotation.z = Math.PI / 2;
      tire.castShadow = true;
      wheelGroup.add(tire);

      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.36, 12), rimMat);
      rim.rotation.z = Math.PI / 2;
      wheelGroup.add(rim);

      bus.add(wheelGroup);
      wheelsRef.current.push(tire);
    });

    // 7. Headlight Projectors
    headLightsRef.current = [];
    const leftHeadlight = new THREE.SpotLight(0xfff5e6, 4, 45, Math.PI / 7, 0.3, 1);
    leftHeadlight.position.set(-0.9, 0.8, 4.4);
    leftHeadlight.target.position.set(-0.9, 0.2, 25);
    bus.add(leftHeadlight);
    bus.add(leftHeadlight.target);
    headLightsRef.current.push(leftHeadlight);

    const rightHeadlight = new THREE.SpotLight(0xfff5e6, 4, 45, Math.PI / 7, 0.3, 1);
    rightHeadlight.position.set(0.9, 0.8, 4.4);
    rightHeadlight.target.position.set(0.9, 0.2, 25);
    bus.add(rightHeadlight);
    bus.add(rightHeadlight.target);
    headLightsRef.current.push(rightHeadlight);

    // Front Headlight Lenses (Emissive)
    const lensGeo = new THREE.BoxGeometry(0.35, 0.2, 0.05);
    const lensMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xfff0aa,
      emissiveIntensity: 1.5,
    });
    const leftLens = new THREE.Mesh(lensGeo, lensMat);
    leftLens.position.set(-0.9, 0.8, 4.42);
    bus.add(leftLens);

    const rightLens = new THREE.Mesh(lensGeo, lensMat);
    rightLens.position.set(0.9, 0.8, 4.42);
    bus.add(rightLens);

    // 8. Rear Tail Lights
    tailLightsRef.current = [];
    const tailMat = new THREE.MeshStandardMaterial({
      color: 0x990000,
      emissive: 0xff0000,
      emissiveIntensity: 0.6,
    });
    tailLightsRef.current.push(tailMat);

    const leftTail = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.4, 0.05), tailMat);
    leftTail.position.set(-1.0, 1.2, -4.42);
    bus.add(leftTail);

    const rightTail = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.4, 0.05), tailMat);
    rightTail.position.set(1.0, 1.2, -4.42);
    bus.add(rightTail);

    // 9. Strobo Lights on Roof
    stroboLightsRef.current = [];
    const stroboColors = [0xec4899, 0x06b6d4, 0xa855f7, 0x3b82f6];
    for (let i = 0; i < 4; i++) {
      const pLight = new THREE.PointLight(stroboColors[i], 1.5, 12);
      pLight.position.set(-0.9 + i * 0.6, 3.25, 4.1);
      bus.add(pLight);
      stroboLightsRef.current.push(pLight);

      // Mini glowing beacon
      const beacon = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 8, 8),
        new THREE.MeshBasicMaterial({ color: stroboColors[i] })
      );
      beacon.position.copy(pLight.position);
      bus.add(beacon);
    }

    // 10. Underglow Neon Light
    const underglow = new THREE.PointLight(0x8b5cf6, 3.5, 8);
    underglow.position.set(0, 0.25, 0);
    bus.add(underglow);
    underglowLightRef.current = underglow;

    // 11. Interior Cabin Light
    const cabin = new THREE.PointLight(0xffeedd, 1.8, 9);
    cabin.position.set(0, 2.5, 0);
    bus.add(cabin);
    cabinLightRef.current = cabin;

    // 12. Cockpit Steering Wheel (Visible in cabin view)
    const steerGroup = new THREE.Group();
    steerGroup.position.set(-0.65, 1.6, 3.7);
    const steerTorus = new THREE.Mesh(
      new THREE.TorusGeometry(0.25, 0.04, 8, 20),
      new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 })
    );
    steerTorus.rotation.x = Math.PI / 4;
    steerGroup.add(steerTorus);
    bus.add(steerGroup);
    steeringWheelRef.current = steerTorus;

    return bus;
  }, []);

  // Initialize Three.js Scene
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 800;
    const height = containerRef.current.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(selectedMap.skyColor);
    scene.fog = new THREE.FogExp2(selectedMap.fogColor, 0.007);

    // Camera
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 800);
    cameraRef.current = camera;
    camera.position.set(0, 5, -9);
    camera.lookAt(0, 2, 8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'high-performance'
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Ambient & Directional Sun/Moon light
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.7);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(40, 70, 30);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // Build Road Segments
    roadSegmentsRef.current = [];
    const roadWidth = 14;
    const segLength = 80;
    const numSegs = 6;

    for (let i = 0; i < numSegs; i++) {
      const segGroup = new THREE.Group();
      segGroup.position.z = i * segLength - 40;

      // Road plane
      const roadGeo = new THREE.PlaneGeometry(roadWidth, segLength);
      const roadMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(selectedMap.roadColor),
        roughness: 0.8,
      });
      const roadPlane = new THREE.Mesh(roadGeo, roadMat);
      roadPlane.rotation.x = -Math.PI / 2;
      roadPlane.receiveShadow = true;
      segGroup.add(roadPlane);

      // Road Markings (Middle dashed lines)
      for (let m = -segLength / 2; m < segLength / 2; m += 8) {
        const lineGeo = new THREE.PlaneGeometry(0.35, 4.5);
        const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const line = new THREE.Mesh(lineGeo, lineMat);
        line.rotation.x = -Math.PI / 2;
        line.position.set(0, 0.02, m);
        segGroup.add(line);
      }

      // Yellow outer border lines
      const leftLine = new THREE.Mesh(new THREE.PlaneGeometry(0.3, segLength), new THREE.MeshBasicMaterial({ color: 0xf59e0b }));
      leftLine.rotation.x = -Math.PI / 2;
      leftLine.position.set(-roadWidth / 2 + 0.5, 0.02, 0);
      segGroup.add(leftLine);

      const rightLine = new THREE.Mesh(new THREE.PlaneGeometry(0.3, segLength), new THREE.MeshBasicMaterial({ color: 0xf59e0b }));
      rightLine.rotation.x = -Math.PI / 2;
      rightLine.position.set(roadWidth / 2 - 0.5, 0.02, 0);
      segGroup.add(rightLine);

      // Ground grass / terrain on sides
      const terrainGeo = new THREE.PlaneGeometry(120, segLength);
      const terrainMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(selectedMap.groundColor),
        roughness: 0.95,
      });
      const leftTerrain = new THREE.Mesh(terrainGeo, terrainMat);
      leftTerrain.rotation.x = -Math.PI / 2;
      leftTerrain.position.set(-67, -0.05, 0);
      segGroup.add(leftTerrain);

      const rightTerrain = new THREE.Mesh(terrainGeo, terrainMat);
      rightTerrain.rotation.x = -Math.PI / 2;
      rightTerrain.position.set(67, -0.05, 0);
      segGroup.add(rightTerrain);

      // Scenery: Streetlights & Trees / Buildings
      for (let s = -30; s <= 30; s += 30) {
        // Street lamp
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 6, 8), new THREE.MeshStandardMaterial({ color: 0x475569 }));
        pole.position.set(-roadWidth / 2 - 1.2, 3, s);
        segGroup.add(pole);

        const lampBulb = new THREE.PointLight(0xffd7aa, 0.8, 18);
        lampBulb.position.set(-roadWidth / 2 - 1.2, 6, s);
        segGroup.add(lampBulb);

        // Map Specific Scenery Objects (Dhaba / Palm tree / Sano Station / Pine Tree)
        if (selectedMap.id === 'pakistan') {
          // Pakistani Dhaba with truck art banner
          const dhaba = new THREE.Mesh(new THREE.BoxGeometry(7, 3.5, 10), new THREE.MeshStandardMaterial({ color: 0x78350f }));
          dhaba.position.set(roadWidth / 2 + 8, 1.75, s);
          segGroup.add(dhaba);

          // Pakistani flag pole
          const flagPole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 5), new THREE.MeshStandardMaterial({ color: 0xffffff }));
          flagPole.position.set(roadWidth / 2 + 3.5, 2.5, s);
          segGroup.add(flagPole);
        } else if (selectedMap.id === 'sano-oil') {
          // Sano Oil Petrol Station Pump
          const pump = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.8, 1.8), new THREE.MeshStandardMaterial({ color: 0x7e22ce, emissive: 0xa855f7, emissiveIntensity: 0.3 }));
          pump.position.set(roadWidth / 2 + 5, 1.4, s);
          segGroup.add(pump);
          const pumpGlow = new THREE.PointLight(0x06b6d4, 1.5, 10);
          pumpGlow.position.set(roadWidth / 2 + 5, 3, s);
          segGroup.add(pumpGlow);
        } else if (selectedMap.id === 'indonesia') {
          // Palm Tree Trunk & Leaves
          const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.35, 7, 7), new THREE.MeshStandardMaterial({ color: 0x451a03 }));
          trunk.position.set(roadWidth / 2 + 6, 3.5, s);
          segGroup.add(trunk);
          const foliage = new THREE.Mesh(new THREE.SphereGeometry(2.5, 8, 8), new THREE.MeshStandardMaterial({ color: 0x15803d }));
          foliage.position.set(roadWidth / 2 + 6, 7, s);
          segGroup.add(foliage);
        } else {
          // Snowy Pine Tree
          const pineTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 3, 6), new THREE.MeshStandardMaterial({ color: 0x3e2723 }));
          pineTrunk.position.set(roadWidth / 2 + 7, 1.5, s);
          segGroup.add(pineTrunk);
          const pineLeaves = new THREE.Mesh(new THREE.ConeGeometry(2.2, 6, 7), new THREE.MeshStandardMaterial({ color: 0x1e3a2b }));
          pineLeaves.position.set(roadWidth / 2 + 7, 5, s);
          segGroup.add(pineLeaves);
        }
      }

      scene.add(segGroup);
      roadSegmentsRef.current.push(segGroup);
    }

    // Traffic vehicles (Cars & Pakistani Trucks)
    trafficVehiclesRef.current = [];
    const trafficColors = [0xef4444, 0x3b82f6, 0xf59e0b, 0x10b981, 0x8b5cf6];
    const lanes = [-4, -1.5, 1.5, 4];

    for (let t = 0; t < 5; t++) {
      const trafficGroup = new THREE.Group();
      const isTruck = t % 2 === 0;

      const vGeo = isTruck ? new THREE.BoxGeometry(2.4, 2.8, 6.5) : new THREE.BoxGeometry(1.9, 1.2, 4.0);
      const vMat = new THREE.MeshStandardMaterial({ color: trafficColors[t % trafficColors.length], roughness: 0.4 });
      const vMesh = new THREE.Mesh(vGeo, vMat);
      vMesh.position.y = isTruck ? 1.5 : 0.7;
      vMesh.castShadow = true;
      trafficGroup.add(vMesh);

      const assignedLane = lanes[t % lanes.length];
      const startZ = 40 + t * 45;
      trafficGroup.position.set(assignedLane, 0, startZ);

      scene.add(trafficGroup);
      trafficVehiclesRef.current.push({
        mesh: trafficGroup,
        speed: 25 + Math.random() * 20,
        lane: assignedLane
      });
    }

    // Rain Particle System
    const rainCount = 1800;
    const rainGeo = new THREE.BufferGeometry();
    const rainPos = new Float32Array(rainCount * 3);
    for (let r = 0; r < rainCount * 3; r += 3) {
      rainPos[r] = (Math.random() - 0.5) * 80;
      rainPos[r + 1] = Math.random() * 40;
      rainPos[r + 2] = (Math.random() - 0.5) * 120;
    }
    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));
    const rainMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.25,
      transparent: true,
      opacity: 0.6,
    });
    const rainParticles = new THREE.Points(rainGeo, rainMat);
    scene.add(rainParticles);
    rainSystemRef.current = rainParticles;

    // Build and add Player Bus
    const busMesh = buildBusMesh(selectedLivery);
    busGroupRef.current = busMesh;
    scene.add(busMesh);

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      renderer.dispose();
      gameSound.stopEngine();
    };
  }, [selectedLivery, selectedMap, buildBusMesh]);

  // Update bus livery dynamically
  useEffect(() => {
    if (!sceneRef.current || !busGroupRef.current) return;
    sceneRef.current.remove(busGroupRef.current);
    const newBus = buildBusMesh(selectedLivery);
    busGroupRef.current = newBus;
    sceneRef.current.add(newBus);
  }, [selectedLivery, buildBusMesh]);

  // Update lighting on weather / time change
  useEffect(() => {
    if (!sceneRef.current) return;
    if (weather === 'night' || weather === 'rain') {
      sceneRef.current.background = new THREE.Color(0x060610);
      sceneRef.current.fog = new THREE.FogExp2(0x090918, 0.009);
    } else if (weather === 'sunset') {
      sceneRef.current.background = new THREE.Color(0x7c2d12);
      sceneRef.current.fog = new THREE.FogExp2(0x9a3412, 0.006);
    } else {
      sceneRef.current.background = new THREE.Color(selectedMap.skyColor);
      sceneRef.current.fog = new THREE.FogExp2(selectedMap.fogColor, 0.006);
    }
  }, [weather, selectedMap]);

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
      keysPressed.current[e.code] = true;

      if (e.key === 'h' || e.key === 'H') {
        triggerHorn();
      }
      if (e.key === 'l' || e.key === 'L') {
        setHeadlightMode(prev => prev === 'off' ? 'low' : prev === 'low' ? 'high' : 'off');
      }
      if (e.key === 'k' || e.key === 'K') {
        setStroboActive(prev => !prev);
      }
      if (e.key === 'u' || e.key === 'U') {
        setUnderglowActive(prev => !prev);
      }
      if (e.key === 'c' || e.key === 'C') {
        setCameraView(prev => prev === 'chase' ? 'cabin' : prev === 'cabin' ? 'drone' : 'chase');
      }
      if (e.key === 'j' || e.key === 'J') {
        setHazardActive(prev => !prev);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
      keysPressed.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [triggerHorn]);

  // Main 60FPS Game Loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const t = telemetry.current;
      const keys = keysPressed.current;

      if (isPlaying) {
        // Accelerate / Brake / Reverse
        const isGas = keys['w'] || keys['arrowup'] || mobileGas.current;
        const isBrake = keys['s'] || keys['arrowdown'] || keys['space'] || mobileBrake.current;
        const isLeft = keys['a'] || keys['arrowleft'] || mobileSteer.current < -0.2;
        const isRight = keys['d'] || keys['arrowright'] || mobileSteer.current > 0.2;

        if (isGas) {
          t.speed = Math.min(t.speed + t.acceleration, t.maxSpeed);
          setGear('D');
        } else if (isBrake) {
          if (t.speed > 0) {
            t.speed = Math.max(t.speed - t.braking, 0);
            if (t.speed < 2) gameSound.playAirBrake();
          } else {
            t.speed = Math.max(t.speed - 0.2, -18); // Reverse gear
            setGear('R');
          }
        } else {
          // Coasting friction
          if (t.speed > 0) {
            t.speed = Math.max(t.speed - t.friction, 0);
          } else if (t.speed < 0) {
            t.speed = Math.min(t.speed + t.friction, 0);
          }
        }

        // Steering input
        if (isLeft) {
          t.steerAngle = Math.max(t.steerAngle - 0.05, -0.45);
        } else if (isRight) {
          t.steerAngle = Math.min(t.steerAngle + 0.05, 0.45);
        } else {
          t.steerAngle *= 0.85; // Auto center
        }

        // Bus lateral movement
        const speedFactor = t.speed / 50;
        t.busX += t.steerAngle * speedFactor * 1.2;
        t.busX = Math.max(-5.5, Math.min(5.5, t.busX)); // Road boundaries

        // Distance & fuel
        const kmh = Math.round(t.speed);
        t.distance += (t.speed * dt) / 3600;
        setSpeed(kmh);
        setDistance(Number(t.distance.toFixed(1)));
        gameSound.updateEngine(kmh, isGas);

        // Slow fuel burn
        if (kmh > 10) {
          setFuel(prev => Math.max(prev - 0.005, 5));
        }

        // Rotate Bus mesh slightly with steering
        if (busGroupRef.current) {
          busGroupRef.current.position.x = t.busX;
          busGroupRef.current.rotation.y = -t.steerAngle * 0.35;
          busGroupRef.current.rotation.z = -t.steerAngle * 0.08 * (t.speed / 40); // Body lean
        }

        // Rotate Wheels
        const wheelRotSpeed = (t.speed * dt * 0.8);
        wheelsRef.current.forEach((w) => {
          w.rotation.x += wheelRotSpeed;
        });

        // Rotate Steering Wheel inside cockpit
        if (steeringWheelRef.current) {
          steeringWheelRef.current.rotation.z = -t.steerAngle * 3;
        }

        // Scroll Road Segments backwards based on speed
        const roadScroll = (t.speed * dt * 0.9);
        const segLength = 80;
        const totalLength = roadSegmentsRef.current.length * segLength;

        roadSegmentsRef.current.forEach((seg) => {
          seg.position.z -= roadScroll;
          if (seg.position.z < -segLength) {
            seg.position.z += totalLength;
          }
        });

        // Move Traffic vehicles
        trafficVehiclesRef.current.forEach((veh) => {
          const relativeSpeed = (veh.speed - t.speed) * dt * 0.8;
          veh.mesh.position.z += relativeSpeed;
          if (veh.mesh.position.z < -40) {
            veh.mesh.position.z += 220;
          } else if (veh.mesh.position.z > 220) {
            veh.mesh.position.z -= 260;
          }
        });

        // Rain particles
        if (rainSystemRef.current && (weather === 'rain' || selectedMap.id === 'sano-oil')) {
          const pos = rainSystemRef.current.geometry.attributes.position.array as Float32Array;
          for (let p = 1; p < pos.length; p += 3) {
            pos[p] -= 38 * dt;
            if (pos[p] < 0) pos[p] = 35;
          }
          rainSystemRef.current.geometry.attributes.position.needsUpdate = true;
          rainSystemRef.current.visible = true;
        } else if (rainSystemRef.current) {
          rainSystemRef.current.visible = false;
        }

        // Strobo Flashing Lights Cycle
        t.stroboTimer += dt * 12;
        if (stroboActive && stroboLightsRef.current.length > 0) {
          const activeIndex = Math.floor(t.stroboTimer) % stroboLightsRef.current.length;
          stroboLightsRef.current.forEach((light, idx) => {
            light.intensity = idx === activeIndex ? 3.5 : 0.2;
          });
        } else {
          stroboLightsRef.current.forEach(l => l.intensity = 0);
        }

        // Underglow & Cabin Light Intensity
        if (underglowLightRef.current) {
          underglowLightRef.current.intensity = underglowActive ? 4.0 : 0;
        }
        if (cabinLightRef.current) {
          cabinLightRef.current.intensity = cabinLightActive ? 1.8 : 0;
        }

        // Headlights
        headLightsRef.current.forEach((hl) => {
          hl.intensity = headlightMode === 'high' ? 5.5 : headlightMode === 'low' ? 2.5 : 0;
          hl.distance = headlightMode === 'high' ? 55 : 25;
        });

        // Brake Tail Lights
        tailLightsRef.current.forEach((mat) => {
          mat.emissiveIntensity = isBrake ? 2.8 : 0.6;
        });
      }

      // Camera Positioning based on CameraView
      if (cameraRef.current && busGroupRef.current) {
        const bx = busGroupRef.current.position.x;
        const bz = busGroupRef.current.position.z;

        if (cameraView === 'chase') {
          // Smooth third person chase behind bus
          cameraRef.current.position.x += (bx * 0.7 - cameraRef.current.position.x) * 0.1;
          cameraRef.current.position.y = 4.2;
          cameraRef.current.position.z = -9.5;
          cameraRef.current.lookAt(bx * 0.3, 1.8, 12);
        } else if (cameraView === 'cabin') {
          // First person cockpit driver seat looking forward through windshield
          cameraRef.current.position.set(bx - 0.65, 2.1, bz + 3.2);
          cameraRef.current.lookAt(bx - 0.65, 1.8, bz + 35);
        } else if (cameraView === 'drone') {
          // Cinematic drone aerial view
          cameraRef.current.position.set(bx + 8, 12, bz - 14);
          cameraRef.current.lookAt(bx, 1.5, bz + 10);
        } else {
          // Bumper Low view
          cameraRef.current.position.set(bx, 0.8, bz + 4.8);
          cameraRef.current.lookAt(bx, 0.8, bz + 30);
        }
      }

      // Render Scene
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isPlaying, cameraView, weather, selectedMap, headlightMode, stroboActive, underglowActive, cabinLightActive]);

  const togglePlay = () => {
    if (!isPlaying) {
      gameSound.startEngine();
      setIsPlaying(true);
    } else {
      gameSound.stopEngine();
      setIsPlaying(false);
    }
  };

  const handleReset = () => {
    telemetry.current.speed = 0;
    telemetry.current.busX = 0;
    telemetry.current.distance = 0;
    telemetry.current.steerAngle = 0;
    setSpeed(0);
    setDistance(0);
    setFuel(95);
  };

  return (
    <section id="game" className="relative py-20 bg-[#06060f] border-t-2 border-purple-500/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Game Title & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-600/30 via-purple-600/30 to-blue-600/30 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Flame className="w-3.5 h-3.5 text-red-400 fill-red-400 animate-pulse" />
              <span>Playable 3D Simulator Game</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              BUSSID & FlixBus <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-300 to-cyan-400">3D Simulator</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Drive on <span className="text-amber-400 font-semibold">Pakistan GT Road</span>, <span className="text-cyan-400 font-semibold">Indonesia Highway</span>, or <span className="text-purple-400 font-semibold">Sano Oil Midnight Expressway</span>. Full lighting control, air brakes, and viral Basuri Telolet horns!
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={togglePlay}
              className={`px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2.5 transition-all shadow-xl ${
                isPlaying
                  ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
                  : 'bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-emerald-600/30 animate-pulse'
              }`}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
              <span>{isPlaying ? 'Pause Simulator' : 'Start Engine & Drive'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
              title="Reset Position"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                if (containerRef.current) {
                  if (!document.fullscreenElement) {
                    containerRef.current.requestFullscreen().catch(() => {});
                    setIsFullscreen(true);
                  } else {
                    document.exitFullscreen().catch(() => {});
                    setIsFullscreen(false);
                  }
                }
              }}
              className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 3D Simulation Canvas Container */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[720px] rounded-3xl overflow-hidden bg-black border-2 border-purple-500/40 shadow-2xl shadow-purple-950/60 select-none"
        >
          {/* Three.js Canvas */}
          <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

          {/* Overlay: Game Start Splash Screen */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-30 animate-in fade-in">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-red-600 p-1 mb-4 shadow-2xl shadow-red-500/50">
                <button
                  onClick={togglePlay}
                  className="w-full h-full rounded-full bg-[#0c0c1b] flex items-center justify-center text-white hover:scale-105 transition-transform"
                >
                  <Play className="w-10 h-10 fill-white ml-1 text-white" />
                </button>
              </div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
                Press Start to Drive {selectedLivery.name}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-md">
                Controls: <span className="text-cyan-400 font-mono">W / Up</span> Gas, <span className="text-red-400 font-mono">S / Down</span> Brake, <span className="text-amber-400 font-mono">A / D</span> Steer, <span className="text-purple-400 font-mono">H</span> Telolet Horn, <span className="text-white font-mono">L</span> Lights
              </p>
              <button
                onClick={togglePlay}
                className="mt-6 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-bold text-base shadow-xl"
              >
                Launch 3D Game Engine
              </button>
            </div>
          )}

          {/* Top HUD: Speedometer, Gear, Distance, Map Landmark */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
            {/* Speed & Gear Badge */}
            <div className="flex items-center gap-2.5 bg-black/75 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-lg">
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-300 tracking-tighter">
                  {speed}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">KM/H</span>
              </div>
              <div className="h-8 w-px bg-white/20 mx-1" />
              <div className="flex flex-col items-center">
                <span className="text-xl font-extrabold text-purple-400 font-mono">
                  {gear}
                </span>
                <span className="text-[10px] font-bold text-slate-400">GEAR</span>
              </div>
            </div>

            {/* Current Route & Landmark */}
            <div className="hidden sm:flex flex-col items-end bg-black/75 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-lg">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>{selectedMap.name}</span>
              </div>
              <span className="text-[11px] text-slate-300 font-mono mt-0.5">
                Target: {selectedMap.landmarkName} • {distance} km
              </span>
            </div>

            {/* Fuel & Satisfaction */}
            <div className="flex items-center gap-3 bg-black/75 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/10 shadow-lg">
              <div className="text-right">
                <div className="text-[11px] font-bold text-slate-300">⛽ Fuel {Math.round(fuel)}%</div>
                <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-emerald-400 rounded-full"
                    style={{ width: `${fuel}%` }}
                  />
                </div>
              </div>
              <button
                onClick={() => setCameraView(prev => prev === 'chase' ? 'cabin' : prev === 'cabin' ? 'drone' : 'chase')}
                className="pointer-events-auto p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1"
                title="Switch Camera View"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="capitalize">{cameraView}</span>
              </button>
            </div>
          </div>

          {/* Interactive Horn Bar (Bottom Center) */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 pointer-events-auto">
            {/* Basuri Horn Button */}
            <button
              onClick={() => triggerHorn('basuri')}
              className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-purple-600/40 flex items-center gap-2 active:scale-95 transition-all"
            >
              <Music className="w-4 h-4" />
              <span>Basuri V3 Horn</span>
            </button>

            {/* Om Telolet Classic */}
            <button
              onClick={() => triggerHorn('telolet')}
              className="px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-600/30 flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <span>Om Telolet!</span>
            </button>

            {/* Pakistani Air Horn */}
            <button
              onClick={() => triggerHorn('pakistani')}
              className="px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-red-600/30 flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <span>🇵🇰 Pak Air Horn</span>
            </button>
          </div>

          {/* Mobile On-Screen Steering & Pedals */}
          <div className="md:hidden absolute inset-0 pointer-events-none z-20 flex flex-col justify-end p-4">
            <div className="flex items-end justify-between pointer-events-auto">
              {/* Steer Left / Right Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onTouchStart={() => (mobileSteer.current = -1)}
                  onTouchEnd={() => (mobileSteer.current = 0)}
                  onMouseDown={() => (mobileSteer.current = -1)}
                  onMouseUp={() => (mobileSteer.current = 0)}
                  className="w-14 h-14 rounded-2xl bg-black/80 border border-white/20 text-white flex items-center justify-center active:bg-purple-600"
                >
                  <ArrowLeft className="w-7 h-7" />
                </button>
                <button
                  onTouchStart={() => (mobileSteer.current = 1)}
                  onTouchEnd={() => (mobileSteer.current = 0)}
                  onMouseDown={() => (mobileSteer.current = 1)}
                  onMouseUp={() => (mobileSteer.current = 0)}
                  className="w-14 h-14 rounded-2xl bg-black/80 border border-white/20 text-white flex items-center justify-center active:bg-purple-600"
                >
                  <ArrowRight className="w-7 h-7" />
                </button>
              </div>

              {/* Brake & Gas Pedals */}
              <div className="flex items-center gap-2">
                <button
                  onTouchStart={() => (mobileBrake.current = true)}
                  onTouchEnd={() => (mobileBrake.current = false)}
                  onMouseDown={() => (mobileBrake.current = true)}
                  onMouseUp={() => (mobileBrake.current = false)}
                  className="w-14 h-14 rounded-2xl bg-red-600/80 text-white font-extrabold text-xs active:bg-red-500"
                >
                  BRAKE
                </button>
                <button
                  onTouchStart={() => (mobileGas.current = true)}
                  onTouchEnd={() => (mobileGas.current = false)}
                  onMouseDown={() => (mobileGas.current = true)}
                  onMouseUp={() => (mobileGas.current = false)}
                  className="w-14 h-16 rounded-2xl bg-emerald-600/90 text-white font-extrabold text-xs active:bg-emerald-500 shadow-lg"
                >
                  GAS
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Game Control Panels: Buses / Liveries, Routes, and Lights */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel 1: Select Bus & Livery */}
          <div className="p-5 rounded-2xl bg-[#0f0f22] border border-white/5 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 font-heading">
              <Zap className="w-4 h-4 text-purple-400" />
              <span>Choose Bus Livery</span>
            </h4>
            <div className="space-y-2">
              {LIVERIES.map((liv) => {
                const isSelected = selectedLivery.id === liv.id;
                return (
                  <button
                    key={liv.id}
                    onClick={() => setSelectedLivery(liv)}
                    className={`w-full p-3 rounded-xl text-left border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-purple-950/60 border-purple-500 shadow-md ring-1 ring-purple-400'
                        : 'bg-white/[0.02] border-white/5 hover:border-purple-500/30'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{liv.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{liv.subtitle}</div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-purple-300">
                      {liv.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panel 2: Select Map & Route */}
          <div className="p-5 rounded-2xl bg-[#0f0f22] border border-white/5 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 font-heading">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Select Road / Route</span>
            </h4>
            <div className="space-y-2">
              {MAPS.map((mp) => {
                const isSelected = selectedMap.id === mp.id;
                return (
                  <button
                    key={mp.id}
                    onClick={() => {
                      setSelectedMap(mp);
                      setWeather(mp.weatherDefault);
                    }}
                    className={`w-full p-3 rounded-xl text-left border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-500 shadow-md ring-1 ring-cyan-400'
                        : 'bg-white/[0.02] border-white/5 hover:border-cyan-500/30'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{mp.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{mp.urduName}</div>
                    </div>
                    <span className="text-xs text-cyan-400">→</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panel 3: Lights & Weather System */}
          <div className="p-5 rounded-2xl bg-[#0f0f22] border border-white/5 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 font-heading">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>BUSSID Lights & Weather System</span>
            </h4>

            {/* Lights Grid */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setHeadlightMode(prev => prev === 'off' ? 'low' : prev === 'low' ? 'high' : 'off')}
                className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                  headlightMode !== 'off'
                    ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                    : 'bg-white/5 border-white/5 text-slate-400'
                }`}
              >
                Headlights: {headlightMode.toUpperCase()}
              </button>

              <button
                onClick={() => setStroboActive(!stroboActive)}
                className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                  stroboActive
                    ? 'bg-pink-950/60 border-pink-500 text-pink-300 shadow-lg'
                    : 'bg-white/5 border-white/5 text-slate-400'
                }`}
              >
                Strobo Roof: {stroboActive ? 'FLASHING' : 'OFF'}
              </button>

              <button
                onClick={() => setUnderglowActive(!underglowActive)}
                className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                  underglowActive
                    ? 'bg-purple-950/60 border-purple-500 text-purple-300'
                    : 'bg-white/5 border-white/5 text-slate-400'
                }`}
              >
                Underglow Neon: {underglowActive ? 'ON' : 'OFF'}
              </button>

              <button
                onClick={() => setCabinLightActive(!cabinLightActive)}
                className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                  cabinLightActive
                    ? 'bg-blue-950/60 border-blue-500 text-cyan-300'
                    : 'bg-white/5 border-white/5 text-slate-400'
                }`}
              >
                Cabin Light: {cabinLightActive ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Weather Selector */}
            <div className="pt-2 border-t border-white/5">
              <div className="text-[11px] font-bold text-slate-300 mb-2">Weather Condition:</div>
              <div className="grid grid-cols-4 gap-1.5">
                {(['day', 'sunset', 'night', 'rain'] as WeatherType[]).map((w) => (
                  <button
                    key={w}
                    onClick={() => setWeather(w)}
                    className={`py-1.5 rounded-lg text-[11px] font-semibold capitalize border ${
                      weather === w
                        ? 'bg-purple-600 text-white border-purple-400'
                        : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
