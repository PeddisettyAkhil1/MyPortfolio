import React, { useRef, useState } from 'react';
import { Canvas, useFrame, type RootState } from '@react-three/fiber';
import { OrbitControls, Float, Text, ContactShadows, RoundedBox, Grid, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  activeFocus?: 'overview' | 'projects' | 'skills' | 'contact';
}

function CreativeStudioRoom({ cameraMode }: { cameraMode?: 'overview' | 'desk' | 'arcade' | 'shelf' }) {
  const arcadeRef = useRef<THREE.Group>(null);
  const monitorScreenRef = useRef<THREE.Mesh>(null);
  const holoRingRef = useRef<THREE.Group>(null);
  const gem1Ref = useRef<THREE.Mesh>(null);
  const gem2Ref = useRef<THREE.Mesh>(null);
  const gem3Ref = useRef<THREE.Mesh>(null);

  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  const screenTitles = ['AKHIL PEDDISETTY', 'BLOCK DASH 2D', 'UNITY & UI/UX STUDIO'];

  useFrame((state: RootState, delta: number) => {
    // Subtle rotation animations
    if (holoRingRef.current) {
      holoRingRef.current.rotation.y += delta * 0.4;
      holoRingRef.current.rotation.x += delta * 0.2;
    }

    if (gem1Ref.current) gem1Ref.current.rotation.y += delta * 0.8;
    if (gem2Ref.current) gem2Ref.current.rotation.x += delta * 0.6;
    if (gem3Ref.current) gem3Ref.current.rotation.z += delta * 0.7;

    // Screen color pulse
    if (monitorScreenRef.current) {
      const material = monitorScreenRef.current.material as THREE.MeshBasicMaterial;
      if (material) {
        material.color.setHSL((state.clock.elapsedTime * 0.05) % 1, 0.75, 0.55);
      }
    }
  });

  return (
    <group position={[0, -0.4, 0]}>
      {/* 1. ROOM BASE PLATFORM & GRID */}
      <mesh position={[0, -0.9, 0]} receiveShadow>
        <boxGeometry args={[7.6, 0.2, 5.6]} />
        <meshStandardMaterial color="#E2DFD5" roughness={0.6} />
      </mesh>

      {/* Tiled Floor Surface */}
      <mesh position={[0, -0.79, 0]} receiveShadow>
        <boxGeometry args={[7.5, 0.02, 5.5]} />
        <meshStandardMaterial color="#FAF8F3" roughness={0.5} />
      </mesh>

      {/* Grid Overlay */}
      <Grid
        position={[0, -0.77, 0]}
        args={[7.5, 5.5]}
        cellSize={0.5}
        cellThickness={1.2}
        cellColor="#D6D1C4"
        sectionSize={1.5}
        sectionThickness={1.8}
        sectionColor="#C4BFAFA"
        fadeDistance={25}
        fadeStrength={1}
      />

      {/* Modern Hexagonal Studio Carpet */}
      <group position={[-0.3, -0.76, 0.7]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[1.35, 6]} />
          <meshStandardMaterial color="#1B1E23" roughness={0.8} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.001]} receiveShadow>
          <circleGeometry args={[1.2, 6]} />
          <meshStandardMaterial color="#E65F2B" roughness={0.8} />
        </mesh>
      </group>

      {/* 2. ROOM WALLS WITH NEON ACCENT STRIPS */}
      {/* Back Wall */}
      <mesh position={[0, 1.45, -2.75]} receiveShadow castShadow>
        <boxGeometry args={[7.6, 4.5, 0.15]} />
        <meshStandardMaterial color="#E8E5DC" roughness={0.8} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-3.8, 1.45, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.15, 4.5, 5.6]} />
        <meshStandardMaterial color="#DFDCCF" roughness={0.8} />
      </mesh>

      {/* Cyber Neon Tube Accent on Back Wall */}
      <mesh position={[0, 3.2, -2.66]}>
        <boxGeometry args={[6.8, 0.04, 0.04]} />
        <meshStandardMaterial color="#E65F2B" emissive="#E65F2B" emissiveIntensity={2.5} />
      </mesh>
      <mesh position={[-3.71, 3.2, 0]}>
        <boxGeometry args={[0.04, 0.04, 5.0]} />
        <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={2.5} />
      </mesh>

      {/* 3. WALL SHELF & TROPHIES (Top Left Wall) */}
      <group position={[-2.4, 2.2, -2.65]}>
        {/* Wooden Shelf */}
        <RoundedBox args={[1.6, 0.06, 0.4]} radius={0.01} smoothness={2} castShadow>
          <meshStandardMaterial color="#1B1E23" />
        </RoundedBox>

        {/* IGDC Award Trophy on Shelf */}
        <group position={[-0.5, 0.22, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.05, 0.07, 0.1, 16]} />
            <meshStandardMaterial color="#1B1E23" />
          </mesh>
          <mesh position={[0, 0.14, 0]} castShadow>
            <octahedronGeometry args={[0.09, 0]} />
            <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.1} />
          </mesh>
          <Text position={[0, -0.01, 0.08]} fontSize={0.035} color="#F59E0B" anchorX="center">
            IGDC
          </Text>
        </group>

        {/* Mini Plant Pot on Shelf */}
        <group position={[0.4, 0.18, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.08, 0.06, 0.14, 16]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          {/* Green Plant Foliage */}
          <mesh position={[0, 0.14, 0]} castShadow>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshStandardMaterial color="#10B981" roughness={0.6} />
          </mesh>
        </group>
      </group>

      {/* 4. FLOOR LAMP & COZY READING CORNER (Left Rear) */}
      <group position={[-2.8, -0.8, -1.6]}>
        {/* Metallic Base */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.26, 0.3, 0.04, 16]} />
          <meshStandardMaterial color="#1B1E23" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Arched Lamp Pole */}
        <mesh position={[0.1, 1.3, 0]} rotation={[0, 0, -0.1]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 2.6, 12]} />
          <meshStandardMaterial color="#1B1E23" />
        </mesh>
        {/* Warm Lamp Shade Cone */}
        <mesh position={[0.25, 2.45, 0]} rotation={[0, 0, -0.2]} castShadow>
          <coneGeometry args={[0.4, 0.5, 16, 1, true]} />
          <meshStandardMaterial color="#E65F2B" side={THREE.DoubleSide} roughness={0.3} />
        </mesh>
        {/* Glow PointLight */}
        <pointLight position={[0.25, 2.3, 0]} intensity={2.5} color="#FFD199" distance={5} />
      </group>

      {/* 5. WALL POSTER FRAME (Center Wall) */}
      <group position={[0.8, 2.3, -2.65]}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 0.9, 0.04]} />
          <meshStandardMaterial color="#1B1E23" />
        </mesh>
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[1.1, 0.8]} />
          <meshBasicMaterial color="#F7F6F3" />
        </mesh>
        <Text position={[0, 0.15, 0.035]} fontSize={0.09} color="#1B1E23" anchorX="center">
          AKHIL PEDDISETTY
        </Text>
        <Text position={[0, -0.05, 0.035]} fontSize={0.05} color="#E65F2B" anchorX="center">
          UI/UX Designer & Unity Developer
        </Text>
        <Text position={[0, -0.22, 0.035]} fontSize={0.04} color="#6E6A62" anchorX="center">
          Vijayawada, IN • 60 FPS Interactive Studio
        </Text>
      </group>

      {/* 6. ADVANCED STUDIO DESK SETUP (Center) */}
      <group position={[-0.4, -0.8, -0.8]}>
        {/* Desk Surface */}
        <RoundedBox args={[3.2, 0.1, 1.5]} radius={0.04} smoothness={4} position={[0, 0.78, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#1B1E23" roughness={0.3} metalness={0.4} />
        </RoundedBox>

        {/* Desk Legs */}
        {[-1.4, 1.4].map((x) =>
          [-0.6, 0.6].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0.38, z]} castShadow>
              <boxGeometry args={[0.08, 0.76, 0.08]} />
              <meshStandardMaterial color="#111317" metalness={0.8} />
            </mesh>
          ))
        )}

        {/* Ultra-Wide Curved Monitor */}
        <group position={[0, 1.38, -0.3]}>
          <mesh position={[0, -0.44, 0]} castShadow>
            <cylinderGeometry args={[0.26, 0.3, 0.03, 16]} />
            <meshStandardMaterial color="#111317" metalness={0.9} />
          </mesh>
          <mesh position={[0, -0.2, -0.05]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.44, 12]} />
            <meshStandardMaterial color="#2B2F36" />
          </mesh>
          {/* Curved Frame */}
          <RoundedBox args={[2.1, 0.95, 0.06]} radius={0.02} smoothness={4} castShadow>
            <meshStandardMaterial color="#111317" roughness={0.2} metalness={0.8} />
          </RoundedBox>
          {/* Active Screen Display */}
          <mesh
            ref={monitorScreenRef}
            position={[0, 0, 0.032]}
            onClick={() => setActiveScreenIndex((prev) => (prev + 1) % screenTitles.length)}
          >
            <planeGeometry args={[2.0, 0.86]} />
            <meshBasicMaterial color="#E65F2B" />
          </mesh>

          <Text position={[0, 0.1, 0.04]} fontSize={0.11} color="#FFFFFF" anchorX="center">
            {screenTitles[activeScreenIndex]}
          </Text>
          <Text position={[0, -0.12, 0.04]} fontSize={0.055} color="#FFFFFF" anchorX="center">
            Click Monitor To Toggle Display
          </Text>
        </group>

        {/* Illuminated Mechanical Keyboard */}
        <group position={[-0.2, 0.84, 0.2]}>
          <mesh castShadow>
            <boxGeometry args={[0.85, 0.03, 0.28]} />
            <meshStandardMaterial color="#22252A" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[0.8, 0.01, 0.24]} />
            <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={0.8} />
          </mesh>
        </group>

        {/* Mouse & RGB Mousepad */}
        <group position={[0.65, 0.84, 0.2]}>
          <mesh position={[0, -0.005, 0]}>
            <boxGeometry args={[0.4, 0.005, 0.35]} />
            <meshStandardMaterial color="#111317" />
          </mesh>
          <mesh position={[0, 0.02, 0]} castShadow>
            <boxGeometry args={[0.1, 0.035, 0.16]} />
            <meshStandardMaterial color="#E65F2B" />
          </mesh>
        </group>

        {/* Graphics Drawing Tablet */}
        <group position={[-0.95, 0.84, 0.2]}>
          <mesh rotation={[0, 0.1, 0]} castShadow>
            <boxGeometry args={[0.55, 0.02, 0.4]} />
            <meshStandardMaterial color="#1B1E23" roughness={0.2} />
          </mesh>
          <mesh position={[0.2, 0.012, -0.12]}>
            <circleGeometry args={[0.015, 12]} />
            <meshBasicMaterial color="#10B981" />
          </mesh>
        </group>

        {/* Ceramic Coffee Mug */}
        <group position={[1.2, 0.9, 0.3]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.18, 16]} />
            <meshStandardMaterial color="#E65F2B" roughness={0.3} />
          </mesh>
        </group>

        {/* Studio Chair */}
        <group position={[-0.4, 0, 0.95]}>
          <mesh position={[0, 0.02, 0]} castShadow>
            <cylinderGeometry args={[0.32, 0.35, 0.04, 16]} />
            <meshStandardMaterial color="#111317" />
          </mesh>
          <mesh position={[0, 0.35, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.65, 12]} />
            <meshStandardMaterial color="#2B2F36" />
          </mesh>
          {/* Cushion */}
          <mesh position={[0, 0.68, 0]} castShadow>
            <cylinderGeometry args={[0.38, 0.38, 0.1, 24]} />
            <meshStandardMaterial color="#E65F2B" roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* 7. RETRO ARCADE CABINET (Right Side Corner) */}
      <group position={[2.1, -0.8, -0.1]} rotation={[0, -0.45, 0]} ref={arcadeRef}>
        {/* Arcade Cabinet Body */}
        <RoundedBox args={[1.2, 2.3, 1.1]} radius={0.04} smoothness={4} position={[0, 1.15, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#111317" roughness={0.3} metalness={0.6} />
        </RoundedBox>

        {/* Neon Marquee Top Banner */}
        <mesh position={[0, 2.15, 0.38]} castShadow>
          <boxGeometry args={[1.05, 0.28, 0.22]} />
          <meshStandardMaterial color="#E65F2B" emissive="#E65F2B" emissiveIntensity={1.8} />
        </mesh>
        <Text position={[0, 2.15, 0.5]} fontSize={0.09} color="#FFFFFF" anchorX="center" anchorY="middle">
          BLOCK DASH 2D
        </Text>

        {/* Glowing Arcade CRT Screen */}
        <mesh position={[0, 1.5, 0.42]} rotation={[-0.18, 0, 0]}>
          <planeGeometry args={[0.92, 0.7]} />
          <meshBasicMaterial color="#0284C7" />
        </mesh>
        <Text position={[0, 1.5, 0.43]} fontSize={0.08} color="#FFFFFF" anchorX="center" anchorY="middle">
          ★ PLAYABLE DEMO ★
        </Text>

        {/* Joystick & Arcade Buttons Panel */}
        <mesh position={[0, 0.98, 0.48]} rotation={[0.1, 0, 0]} castShadow>
          <boxGeometry args={[1.05, 0.12, 0.38]} />
          <meshStandardMaterial color="#2B2F36" />
        </mesh>

        {/* Joystick */}
        <mesh position={[-0.28, 1.12, 0.45]} castShadow>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color="#EF4444" roughness={0.2} />
        </mesh>
        <mesh position={[-0.28, 1.03, 0.45]} castShadow>
          <cylinderGeometry args={[0.014, 0.014, 0.14, 12]} />
          <meshStandardMaterial color="#9CA3AF" />
        </mesh>

        {/* Buttons */}
        <mesh position={[0.1, 1.05, 0.45]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.04, 16]} />
          <meshStandardMaterial color="#3B82F6" />
        </mesh>
        <mesh position={[0.26, 1.03, 0.45]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.04, 16]} />
          <meshStandardMaterial color="#10B981" />
        </mesh>

        {/* Glowing Coin Slot LED */}
        <mesh position={[0, 0.5, 0.56]}>
          <boxGeometry args={[0.15, 0.25, 0.02]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={1.2} />
        </mesh>
      </group>

      {/* 8. FLOATING HOLOGRAPHIC RINGS & POLYHEDRON GEMS */}
      <group ref={holoRingRef} position={[-0.4, 2.7, -0.6]}>
        <mesh>
          <torusGeometry args={[0.65, 0.015, 16, 64]} />
          <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={2} />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.8, 0.01, 16, 64]} />
          <meshStandardMaterial color="#E65F2B" emissive="#E65F2B" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* Floating Interactive Skill Gems */}
      <Float speed={2.5} rotationIntensity={1} floatIntensity={1} position={[-2.2, 1.9, 0.2]}>
        <mesh ref={gem1Ref} castShadow>
          <icosahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial color="#E65F2B" roughness={0.1} metalness={0.8} />
        </mesh>
        <Text position={[0, -0.4, 0]} fontSize={0.08} color="#1B1E23" anchorX="center">
          UI/UX
        </Text>
      </Float>

      <Float speed={3} rotationIntensity={1.2} floatIntensity={1.2} position={[0.2, 2.5, -0.2]}>
        <mesh ref={gem2Ref} castShadow>
          <octahedronGeometry args={[0.24, 0]} />
          <meshStandardMaterial color="#38BDF8" roughness={0.2} metalness={0.9} />
        </mesh>
        <Text position={[0, -0.38, 0]} fontSize={0.08} color="#1B1E23" anchorX="center">
          UNITY 3D
        </Text>
      </Float>

      <Float speed={2.2} rotationIntensity={0.8} floatIntensity={0.9} position={[2.2, 2.4, 0.5]}>
        <mesh ref={gem3Ref} castShadow>
          <dodecahedronGeometry args={[0.26, 0]} />
          <meshStandardMaterial color="#10B981" roughness={0.1} metalness={0.8} />
        </mesh>
        <Text position={[0, -0.4, 0]} fontSize={0.08} color="#1B1E23" anchorX="center">
          C# ENGINE
        </Text>
      </Float>

      {/* Floating Ambient Sparkles Dust Particles */}
      <Sparkles count={45} scale={6} size={2.5} speed={0.4} color="#E65F2B" />
      <Sparkles count={35} scale={6} size={2.0} speed={0.3} color="#38BDF8" />
    </group>
  );
}

function CameraRig({ mode }: { mode: 'overview' | 'desk' | 'arcade' | 'shelf' }) {
  useFrame((state: RootState) => {
    let targetPos = new THREE.Vector3(
      state.pointer.x * 0.5,
      2.5 + state.pointer.y * 0.35,
      6.4
    );
    let targetLook = new THREE.Vector3(state.pointer.x * 0.25, 0.3 + state.pointer.y * 0.15, 0);

    if (mode === 'arcade') {
      targetPos = new THREE.Vector3(2.5 + state.pointer.x * 0.2, 1.2 + state.pointer.y * 0.2, 2.2);
      targetLook = new THREE.Vector3(2.1, 0.7, -0.1);
    } else if (mode === 'desk') {
      targetPos = new THREE.Vector3(-0.4 + state.pointer.x * 0.2, 1.2 + state.pointer.y * 0.2, 2.3);
      targetLook = new THREE.Vector3(-0.4, 0.6, -0.8);
    } else if (mode === 'shelf') {
      targetPos = new THREE.Vector3(-2.2 + state.pointer.x * 0.2, 2.0 + state.pointer.y * 0.2, 1.8);
      targetLook = new THREE.Vector3(-2.4, 2.2, -2.65);
    }

    state.camera.position.lerp(targetPos, 0.05);
    state.camera.lookAt(targetLook);
  });

  return null;
}

class CanvasErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('WebGL Canvas failed to initialize, rendering 2D fallback view:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full min-h-[360px] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#1B1E23] to-[#0F1117] rounded-3xl text-white text-center border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-[#E65F2B]/20 flex items-center justify-center mb-4 border border-[#E65F2B]/40 shadow-lg">
            <span className="text-2xl font-bold text-[#E65F2B]">3D</span>
          </div>
          <h3 className="text-lg font-bold font-heading mb-1 text-white">Interactive Studio Workspace</h3>
          <p className="text-xs text-zinc-400 max-w-sm mb-4 font-mono">
            Unity Game Dev & UX/UI Design Interactive Environment
          </p>
          <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-[11px] font-mono text-zinc-300">
            WebGL Context Accelerated
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export const HeroScene3D: React.FC<SceneProps> = () => {
  const [cameraMode, setCameraMode] = useState<'overview' | 'desk' | 'arcade' | 'shelf'>('overview');

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing bg-[#F7F6F3]">
      {/* Top Right Camera Preset View Buttons */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex flex-col space-y-1 sm:space-y-1.5 pointer-events-auto">
        <button
          onClick={() => setCameraMode('arcade')}
          className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase transition-all shadow-sm cursor-pointer ${
            cameraMode === 'arcade'
              ? 'bg-[#E65F2B] text-white border border-[#E65F2B]'
              : 'bg-white/90 text-[#1B1E23] hover:bg-white border border-[#E5E2DC]'
          }`}
        >
          ARCADE VIEW
        </button>
        <button
          onClick={() => setCameraMode('desk')}
          className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase transition-all shadow-sm cursor-pointer ${
            cameraMode === 'desk'
              ? 'bg-[#E65F2B] text-white border border-[#E65F2B]'
              : 'bg-white/90 text-[#1B1E23] hover:bg-white border border-[#E5E2DC]'
          }`}
        >
          STUDIO DESK VIEW
        </button>
        <button
          onClick={() => setCameraMode('shelf')}
          className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase transition-all shadow-sm cursor-pointer ${
            cameraMode === 'shelf'
              ? 'bg-[#E65F2B] text-white border border-[#E65F2B]'
              : 'bg-white/90 text-[#1B1E23] hover:bg-white border border-[#E5E2DC]'
          }`}
        >
          TROPHY SHELF VIEW
        </button>
        <button
          onClick={() => setCameraMode('overview')}
          className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase bg-[#1B1E23] text-white shadow-md hover:bg-[#E65F2B] transition-colors cursor-pointer"
        >
          RESET ORBIT
        </button>
      </div>

      {/* Floating Interactive 3D Canvas */}
      <CanvasErrorBoundary>
        <Canvas
          camera={{ position: [0, 2.5, 6.4], fov: 45 }}
          shadows
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.9} />
          <directionalLight
            position={[6, 10, 6]}
            intensity={1.4}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <directionalLight position={[-5, 7, -4]} intensity={0.5} color="#38BDF8" />
          <pointLight position={[0, 4, 2]} intensity={0.8} color="#E65F2B" />

          <CreativeStudioRoom cameraMode={cameraMode} />

          <ContactShadows position={[0, -0.9, 0]} opacity={0.6} scale={7.5} blur={2.2} far={4.5} />

          <CameraRig mode={cameraMode} />
          <OrbitControls
            enableZoom={true}
            maxPolarAngle={Math.PI / 2 - 0.05}
            minPolarAngle={Math.PI / 8}
            rotateSpeed={0.5}
          />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
};
