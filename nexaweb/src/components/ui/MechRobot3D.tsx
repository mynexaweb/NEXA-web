'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const R = '#ef4444';
const metal  = { color: '#161616' as const, metalness: 0.92, roughness: 0.14 };
const panel  = { color: '#222222' as const, metalness: 0.86, roughness: 0.22 };
const bright = { color: '#2a2a2a' as const, metalness: 0.80, roughness: 0.30 };

function ReactorCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const m = ref.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 2.8 + Math.sin(clock.elapsedTime * 2.4) * 1.2;
    }
  });
  return (
    <mesh ref={ref} position={[0, 1.07, 0.37]}>
      <sphereGeometry args={[0.13, 20, 20]} />
      <meshStandardMaterial color="#050505" emissive={R} emissiveIntensity={3} metalness={0.5} roughness={0.4} />
    </mesh>
  );
}

function RobotMesh() {
  const root = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (root.current) {
      root.current.rotation.y = Math.sin(clock.elapsedTime * 0.38) * 0.32;
    }
  });

  return (
    <group ref={root}>
      {/* Reactor lights */}
      <pointLight color={R} intensity={5}   distance={5}  position={[0, 1.07, 0.8]} />
      <pointLight color={R} intensity={1.4} distance={7}  position={[0, -1.5, 1.2]} />

      {/* ── HEAD ── */}
      <RoundedBox args={[0.63, 0.55, 0.53]} radius={0.045} position={[0, 2.46, 0]}>
        <meshStandardMaterial {...metal} />
      </RoundedBox>
      {/* brow ridge */}
      <RoundedBox args={[0.61, 0.09, 0.11]} radius={0.02} position={[0, 2.59, 0.24]}>
        <meshStandardMaterial {...panel} />
      </RoundedBox>
      {/* visor — full glow */}
      <RoundedBox args={[0.51, 0.15, 0.055]} radius={0.012} position={[0, 2.46, 0.275]}>
        <meshStandardMaterial color="#050505" emissive={R} emissiveIntensity={4} metalness={0.5} roughness={0.4} />
      </RoundedBox>
      {/* chin */}
      <RoundedBox args={[0.45, 0.11, 0.09]} radius={0.02} position={[0, 2.25, 0.24]}>
        <meshStandardMaterial {...panel} />
      </RoundedBox>

      {/* ── NECK ── */}
      <RoundedBox args={[0.24, 0.20, 0.24]} radius={0.03} position={[0, 2.04, 0]}>
        <meshStandardMaterial {...metal} />
      </RoundedBox>

      {/* ── CHEST ── */}
      <RoundedBox args={[1.60, 1.08, 0.68]} radius={0.065} position={[0, 1.1, 0]}>
        <meshStandardMaterial {...metal} />
      </RoundedBox>
      {/* left pec plate */}
      <RoundedBox args={[0.62, 0.46, 0.095]} radius={0.04} position={[-0.35, 1.36, 0.33]}>
        <meshStandardMaterial {...panel} />
      </RoundedBox>
      {/* right pec plate */}
      <RoundedBox args={[0.62, 0.46, 0.095]} radius={0.04} position={[0.35, 1.36, 0.33]}>
        <meshStandardMaterial {...panel} />
      </RoundedBox>
      {/* center spine stripe */}
      <RoundedBox args={[0.11, 0.92, 0.075]} radius={0.02} position={[0, 1.1, 0.34]}>
        <meshStandardMaterial {...bright} />
      </RoundedBox>

      {/* ── REACTOR ── */}
      <ReactorCore />
      {/* inner ring */}
      <mesh position={[0, 1.07, 0.345]}>
        <torusGeometry args={[0.20, 0.026, 8, 30]} />
        <meshStandardMaterial color={R} emissive={R} emissiveIntensity={2.5} metalness={0.6} roughness={0.3} />
      </mesh>
      {/* outer ring */}
      <mesh position={[0, 1.07, 0.34]}>
        <torusGeometry args={[0.27, 0.013, 6, 30]} />
        <meshStandardMaterial color={R} emissive={R} emissiveIntensity={1.4} metalness={0.5} roughness={0.4} />
      </mesh>

      {/* ── SHOULDER PADS — massive ── */}
      {/* left */}
      <RoundedBox args={[0.60, 0.32, 0.68]} radius={0.055} position={[-1.08, 1.71, 0]}>
        <meshStandardMaterial {...metal} />
      </RoundedBox>
      <RoundedBox args={[0.46, 0.16, 0.58]} radius={0.03} position={[-1.09, 1.79, 0]}>
        <meshStandardMaterial {...panel} />
      </RoundedBox>
      {/* right */}
      <RoundedBox args={[0.60, 0.32, 0.68]} radius={0.055} position={[1.08, 1.71, 0]}>
        <meshStandardMaterial {...metal} />
      </RoundedBox>
      <RoundedBox args={[0.46, 0.16, 0.58]} radius={0.03} position={[1.09, 1.79, 0]}>
        <meshStandardMaterial {...panel} />
      </RoundedBox>

      {/* ── ARMS — grouped with outward lean ── */}
      {/* LEFT ARM GROUP (pivot at left shoulder) */}
      <group position={[-1.08, 1.62, 0]} rotation={[0, 0, 0.16]}>
        {/* upper arm */}
        <RoundedBox args={[0.44, 0.84, 0.44]} radius={0.06} position={[0, -0.42, 0]}>
          <meshStandardMaterial {...metal} />
        </RoundedBox>
        {/* bicep front plate */}
        <RoundedBox args={[0.31, 0.44, 0.10]} radius={0.03} position={[0, -0.28, 0.23]}>
          <meshStandardMaterial {...panel} />
        </RoundedBox>
        {/* elbow ball */}
        <mesh position={[0, -0.84, 0]}>
          <sphereGeometry args={[0.185, 14, 14]} />
          <meshStandardMaterial {...bright} />
        </mesh>
        {/* forearm */}
        <RoundedBox args={[0.38, 0.68, 0.38]} radius={0.05} position={[0, -1.19, 0]}>
          <meshStandardMaterial {...metal} />
        </RoundedBox>
        {/* forearm accent stripe */}
        <RoundedBox args={[0.25, 0.32, 0.085]} radius={0.02} position={[0, -1.12, 0.20]}>
          <meshStandardMaterial color={R} emissive={R} emissiveIntensity={0.7} metalness={0.6} roughness={0.4} />
        </RoundedBox>
        {/* fist */}
        <RoundedBox args={[0.41, 0.37, 0.41]} radius={0.055} position={[0, -1.68, 0]}>
          <meshStandardMaterial {...metal} />
        </RoundedBox>
      </group>

      {/* RIGHT ARM GROUP */}
      <group position={[1.08, 1.62, 0]} rotation={[0, 0, -0.16]}>
        <RoundedBox args={[0.44, 0.84, 0.44]} radius={0.06} position={[0, -0.42, 0]}>
          <meshStandardMaterial {...metal} />
        </RoundedBox>
        <RoundedBox args={[0.31, 0.44, 0.10]} radius={0.03} position={[0, -0.28, 0.23]}>
          <meshStandardMaterial {...panel} />
        </RoundedBox>
        <mesh position={[0, -0.84, 0]}>
          <sphereGeometry args={[0.185, 14, 14]} />
          <meshStandardMaterial {...bright} />
        </mesh>
        <RoundedBox args={[0.38, 0.68, 0.38]} radius={0.05} position={[0, -1.19, 0]}>
          <meshStandardMaterial {...metal} />
        </RoundedBox>
        <RoundedBox args={[0.25, 0.32, 0.085]} radius={0.02} position={[0, -1.12, 0.20]}>
          <meshStandardMaterial color={R} emissive={R} emissiveIntensity={0.7} metalness={0.6} roughness={0.4} />
        </RoundedBox>
        <RoundedBox args={[0.41, 0.37, 0.41]} radius={0.055} position={[0, -1.68, 0]}>
          <meshStandardMaterial {...metal} />
        </RoundedBox>
      </group>

      {/* ── ABS ── */}
      <RoundedBox args={[1.06, 0.42, 0.60]} radius={0.055} position={[0, 0.57, 0]}>
        <meshStandardMaterial {...metal} />
      </RoundedBox>
      {/* ab plates (4) */}
      <RoundedBox args={[0.30, 0.13, 0.085]} radius={0.02} position={[-0.27, 0.61, 0.31]}>
        <meshStandardMaterial {...panel} />
      </RoundedBox>
      <RoundedBox args={[0.30, 0.13, 0.085]} radius={0.02} position={[0.27, 0.61, 0.31]}>
        <meshStandardMaterial {...panel} />
      </RoundedBox>
      <RoundedBox args={[0.30, 0.13, 0.085]} radius={0.02} position={[-0.27, 0.76, 0.31]}>
        <meshStandardMaterial {...panel} />
      </RoundedBox>
      <RoundedBox args={[0.30, 0.13, 0.085]} radius={0.02} position={[0.27, 0.76, 0.31]}>
        <meshStandardMaterial {...panel} />
      </RoundedBox>

      {/* ── HIP ── */}
      <RoundedBox args={[1.10, 0.36, 0.58]} radius={0.055} position={[0, 0.25, 0]}>
        <meshStandardMaterial {...metal} />
      </RoundedBox>

      {/* ── THIGHS ── */}
      {/* left */}
      <RoundedBox args={[0.47, 0.92, 0.47]} radius={0.065} position={[-0.38, -0.27, 0]}>
        <meshStandardMaterial {...metal} />
      </RoundedBox>
      <RoundedBox args={[0.33, 0.55, 0.10]} radius={0.03} position={[-0.38, -0.10, 0.25]}>
        <meshStandardMaterial {...panel} />
      </RoundedBox>
      {/* right */}
      <RoundedBox args={[0.47, 0.92, 0.47]} radius={0.065} position={[0.38, -0.27, 0]}>
        <meshStandardMaterial {...metal} />
      </RoundedBox>
      <RoundedBox args={[0.33, 0.55, 0.10]} radius={0.03} position={[0.38, -0.10, 0.25]}>
        <meshStandardMaterial {...panel} />
      </RoundedBox>

      {/* ── KNEECAPS ── */}
      <RoundedBox args={[0.41, 0.24, 0.26]} radius={0.055} position={[-0.38, -0.74, 0.12]}>
        <meshStandardMaterial {...bright} />
      </RoundedBox>
      <RoundedBox args={[0.41, 0.24, 0.26]} radius={0.055} position={[0.38, -0.74, 0.12]}>
        <meshStandardMaterial {...bright} />
      </RoundedBox>

      {/* ── CALVES ── */}
      <RoundedBox args={[0.39, 0.76, 0.41]} radius={0.055} position={[-0.38, -1.14, 0]}>
        <meshStandardMaterial {...metal} />
      </RoundedBox>
      <RoundedBox args={[0.39, 0.76, 0.41]} radius={0.055} position={[0.38, -1.14, 0]}>
        <meshStandardMaterial {...metal} />
      </RoundedBox>

      {/* ── FEET ── */}
      <RoundedBox args={[0.47, 0.175, 0.72]} radius={0.04} position={[-0.38, -1.58, 0.11]}>
        <meshStandardMaterial {...metal} />
      </RoundedBox>
      <RoundedBox args={[0.47, 0.175, 0.72]} radius={0.04} position={[0.38, -1.58, 0.11]}>
        <meshStandardMaterial {...metal} />
      </RoundedBox>
    </group>
  );
}

export function JackedMechVisual() {
  return (
    <Canvas
      camera={{ position: [0, 0.35, 7.0], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <ambientLight intensity={0.07} />
      <directionalLight position={[3.5, 6, 4]} intensity={2.4} color="#ffffff" castShadow />
      <directionalLight position={[-4, 2, -3]} intensity={0.55} color="#4488ff" />

      <Suspense fallback={null}>
        <RobotMesh />
        <Environment preset="city" />
        <ContactShadows
          position={[0, -1.72, 0]}
          opacity={0.55}
          scale={6}
          blur={3}
          far={3.5}
          color={R}
        />
      </Suspense>
    </Canvas>
  );
}
