import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Maximize2, RotateCcw, Zap } from 'lucide-react';

interface ThreeInteractiveWallpaperProps {
  shaderType?: 'cyber-grid' | 'cosmic-particles' | 'liquid-neon' | 'quantum-crystal' | 'hyperdrive' | 'matrix-rain';
  className?: string;
  isInteractive?: boolean;
  showControls?: boolean;
}

export const ThreeInteractiveWallpaper: React.FC<ThreeInteractiveWallpaperProps> = ({
  shaderType = 'quantum-crystal',
  className = '',
  isInteractive = true,
  showControls = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeTheme, setActiveTheme] = useState<'cyan' | 'purple' | 'gold' | 'emerald'>('cyan');
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const mousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06060c, 0.02);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // Color definitions
    const themeColors = {
      cyan: { primary: 0x06b6d4, secondary: 0x3b82f6, ambient: 0x0284c7 },
      purple: { primary: 0xa855f7, secondary: 0xec4899, ambient: 0x7c3aed },
      gold: { primary: 0xf59e0b, secondary: 0xef4444, ambient: 0xd97706 },
      emerald: { primary: 0x10b981, secondary: 0x06b6d4, ambient: 0x059669 }
    }[activeTheme];

    // Objects container
    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(themeColors.primary, 3, 50);
    pointLight1.position.set(10, 15, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(themeColors.secondary, 2.5, 50);
    pointLight2.position.set(-10, -15, 10);
    scene.add(pointLight2);

    let mainMesh: THREE.Object3D | null = null;
    let particleSystem: THREE.Points | null = null;
    let gridHelper: THREE.GridHelper | null = null;
    const animatedLines: THREE.LineSegments[] = [];

    // Construct Visuals Based on Shader Type
    if (shaderType === 'quantum-crystal') {
      // 1. Quantum 3D Polyhedron Crystal
      const geometry = new THREE.IcosahedronGeometry(7, 1);
      const wireGeometry = new THREE.IcosahedronGeometry(7.2, 1);

      const material = new THREE.MeshPhysicalMaterial({
        color: themeColors.primary,
        metalness: 0.2,
        roughness: 0.1,
        transmission: 0.85,
        thickness: 2.5,
        clearcoat: 1.0,
        wireframe: false,
        emissive: themeColors.secondary,
        emissiveIntensity: 0.2,
      });

      const wireMaterial = new THREE.MeshBasicMaterial({
        color: themeColors.secondary,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });

      const crystal = new THREE.Mesh(geometry, material);
      const wire = new THREE.Mesh(wireGeometry, wireMaterial);
      sceneGroup.add(crystal);
      sceneGroup.add(wire);
      mainMesh = crystal;

      // Orbiting Rings
      const ringGeo = new THREE.TorusGeometry(12, 0.1, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({ color: themeColors.primary, transparent: true, opacity: 0.6 });
      const ring1 = new THREE.Mesh(ringGeo, ringMat);
      ring1.rotation.x = Math.PI / 3;
      sceneGroup.add(ring1);

      const ring2 = new THREE.Mesh(ringGeo, ringMat);
      ring2.rotation.y = Math.PI / 4;
      sceneGroup.add(ring2);

      // Dust Particles
      const pGeo = new THREE.BufferGeometry();
      const pCount = 1200;
      const pos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount * 3; i += 3) {
        pos[i] = (Math.random() - 0.5) * 50;
        pos[i + 1] = (Math.random() - 0.5) * 50;
        pos[i + 2] = (Math.random() - 0.5) * 50;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const pMat = new THREE.PointsMaterial({
        size: 0.35,
        color: themeColors.primary,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });
      particleSystem = new THREE.Points(pGeo, pMat);
      sceneGroup.add(particleSystem);

    } else if (shaderType === 'cosmic-particles') {
      // 2. Cosmic Galaxy Vortex with 4,000 Particles
      const pCount = 4000;
      const pGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(pCount * 3);
      const colors = new Float32Array(pCount * 3);

      const col1 = new THREE.Color(themeColors.primary);
      const col2 = new THREE.Color(themeColors.secondary);
      const col3 = new THREE.Color(0xffffff);

      for (let i = 0; i < pCount; i++) {
        const i3 = i * 3;
        const radius = Math.random() * 22 + 1;
        const spinAngle = radius * 1.5;
        const branchAngle = ((i % 4) * 2 * Math.PI) / 4;

        const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.8;
        const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.8;
        const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.8;

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = (Math.random() - 0.5) * 4 + randomY;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        // Mixed Colors
        const mixedCol = col1.clone().lerp(col2, radius / 22);
        if (Math.random() > 0.85) mixedCol.lerp(col3, 0.8);
        colors[i3] = mixedCol.r;
        colors[i3 + 1] = mixedCol.g;
        colors[i3 + 2] = mixedCol.b;
      }

      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const pMat = new THREE.PointsMaterial({
        size: 0.28,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.9,
      });

      particleSystem = new THREE.Points(pGeo, pMat);
      sceneGroup.add(particleSystem);
      sceneGroup.rotation.x = Math.PI / 4;

    } else if (shaderType === 'cyber-grid') {
      // 3. Cyber Wireframe Terrain & Floating Hexagons
      gridHelper = new THREE.GridHelper(60, 40, themeColors.primary, themeColors.secondary);
      gridHelper.position.y = -8;
      gridHelper.rotation.x = 0;
      sceneGroup.add(gridHelper);

      // Top inverted grid for tunnel ceiling
      const topGrid = new THREE.GridHelper(60, 40, themeColors.secondary, 0x111122);
      topGrid.position.y = 12;
      sceneGroup.add(topGrid);

      // Monolithic central obelisk
      const towerGeo = new THREE.BoxGeometry(4, 18, 4);
      const towerMat = new THREE.MeshStandardMaterial({
        color: 0x090915,
        metalness: 0.9,
        roughness: 0.2,
      });
      const tower = new THREE.Mesh(towerGeo, towerMat);
      sceneGroup.add(tower);
      mainMesh = tower;

      // Surrounding floating cubes
      for (let i = 0; i < 20; i++) {
        const boxGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
        const boxMat = new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? themeColors.primary : themeColors.secondary,
          wireframe: true,
        });
        const box = new THREE.Mesh(boxGeo, boxMat);
        box.position.set(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 20
        );
        sceneGroup.add(box);
      }

    } else if (shaderType === 'hyperdrive') {
      // 4. Lightspeed Warp Lines
      const lineCount = 400;
      const lineGeo = new THREE.BufferGeometry();
      const linePositions = new Float32Array(lineCount * 6);

      for (let i = 0; i < lineCount; i++) {
        const i6 = i * 6;
        const x = (Math.random() - 0.5) * 40;
        const y = (Math.random() - 0.5) * 40;
        const z = (Math.random() - 0.5) * 80;
        const length = Math.random() * 8 + 4;

        linePositions[i6] = x;
        linePositions[i6 + 1] = y;
        linePositions[i6 + 2] = z;

        linePositions[i6 + 3] = x;
        linePositions[i6 + 4] = y;
        linePositions[i6 + 5] = z - length;
      }

      lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      const lineMat = new THREE.LineBasicMaterial({
        color: themeColors.primary,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });
      const lines = new THREE.LineSegments(lineGeo, lineMat);
      sceneGroup.add(lines);
      animatedLines.push(lines);

    } else {
      // Default: Liquid Neon Waves or Matrix Rain
      const planeGeo = new THREE.PlaneGeometry(30, 40, 40, 40);
      const planeMat = new THREE.MeshStandardMaterial({
        color: themeColors.primary,
        wireframe: true,
        emissive: themeColors.secondary,
        emissiveIntensity: 0.3,
      });
      const plane = new THREE.Mesh(planeGeo, planeMat);
      plane.rotation.x = -Math.PI / 3;
      sceneGroup.add(plane);
      mainMesh = plane;
    }

    // Interactive event listeners
    const handleMouseMove = (e: MouseEvent) => {
      if (!isInteractive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePos.current = { x, y };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isInteractive || !e.touches[0]) return;
      const rect = container.getBoundingClientRect();
      const touch = e.touches[0];
      const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
      mousePos.current = { x, y };
    };

    // Device Gyroscope Support (if available on mobile)
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!isInteractive || e.gamma === null || e.beta === null) return;
      // Gamma is left-to-right (-90 to 90), Beta is front-to-back (-180 to 180)
      const x = Math.min(Math.max(e.gamma / 35, -1), 1);
      const y = Math.min(Math.max((e.beta - 45) / 35, -1), 1);
      mousePos.current = { x, y };
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove);
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime() * speedMultiplier;

      // Parallax smooth interpolation
      sceneGroup.rotation.y += (mousePos.current.x * 0.4 - sceneGroup.rotation.y) * 0.05;
      sceneGroup.rotation.x += (-mousePos.current.y * 0.3 - sceneGroup.rotation.x) * 0.05;

      if (mainMesh) {
        mainMesh.rotation.y = elapsedTime * 0.4;
        mainMesh.rotation.x = elapsedTime * 0.2;
      }

      if (particleSystem) {
        particleSystem.rotation.y = elapsedTime * 0.15;
      }

      if (gridHelper) {
        gridHelper.position.z = (elapsedTime * 8) % 2;
      }

      // Warp speed line movement
      if (animatedLines.length > 0) {
        const line = animatedLines[0];
        const posAttr = line.geometry.attributes.position as THREE.BufferAttribute;
        const arr = posAttr.array as Float32Array;
        for (let i = 2; i < arr.length; i += 6) {
          arr[i] += 1.2 * speedMultiplier;
          arr[i + 3] += 1.2 * speedMultiplier;
          if (arr[i] > 30) {
            arr[i] = -50;
            arr[i + 3] = -50 - (Math.random() * 8 + 4);
          }
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [shaderType, activeTheme, speedMultiplier, isInteractive]);

  return (
    <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Interaction Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-lg">
        <Zap className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
        <span>3D REALTIME WEBGL</span>
      </div>

      {/* Touch / Tilt Guide */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-slate-400 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/5 pointer-events-none">
        <span>📱 Move finger / tilt phone for 3D parallax</span>
        <span className="text-cyan-400 font-mono">60 FPS</span>
      </div>

      {/* Optional Theme Controls in Preview Mode */}
      {showControls && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-black/70 backdrop-blur-md p-1.5 rounded-xl border border-white/10">
          {(['cyan', 'purple', 'gold', 'emerald'] as const).map((theme) => (
            <button
              key={theme}
              onClick={() => setActiveTheme(theme)}
              className={`w-5 h-5 rounded-full transition-transform ${
                theme === 'cyan' ? 'bg-cyan-400' :
                theme === 'purple' ? 'bg-purple-500' :
                theme === 'gold' ? 'bg-amber-400' : 'bg-emerald-400'
              } ${activeTheme === theme ? 'scale-125 ring-2 ring-white' : 'opacity-60 hover:opacity-100'}`}
              title={`${theme} color theme`}
            />
          ))}
          <button
            onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 2 : prev === 2 ? 0.5 : 1))}
            className="ml-1 px-2 py-0.5 text-[10px] font-mono rounded bg-white/10 text-white hover:bg-white/20"
          >
            {speedMultiplier}x
          </button>
        </div>
      )}
    </div>
  );
};
