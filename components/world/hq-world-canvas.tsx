'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  ContactShadows,
  Float,
  OrbitControls,
  PerspectiveCamera,
  RoundedBox,
  Sparkles,
  Stars,
} from '@react-three/drei';
import type { OfficeSnapshot, ProjectSummary } from '@/lib/domain/types';
import { memo, useMemo, useRef } from 'react';
import * as THREE from 'three';

interface DistrictNode {
  project: ProjectSummary;
  position: [number, number, number];
  height: number;
  width: number;
  depth: number;
}

function buildDistrictLayout(snapshot: OfficeSnapshot): DistrictNode[] {
  return snapshot.projects.map((project, index) => {
    const column = index % 3;
    const row = Math.floor(index / 3);
    const activeAgents = project.agents.filter((agent) => agent.status === 'active').length;

    return {
      project,
      position: [column * 3.15 - 3.15, 0.5, row * -2.75 + 1.15],
      width: 1.52,
      depth: 1.52,
      height: 1.15 + activeAgents * 0.26 + (project.urgency === 'high' ? 0.52 : project.urgency === 'medium' ? 0.3 : 0.16),
    };
  });
}

function hexToRgb(hex: string) {
  const value = hex.replace('#', '');
  const normalized = value.length === 3 ? value.split('').map((token) => token + token).join('') : value;
  const parsed = Number.parseInt(normalized, 16);

  return {
    r: ((parsed >> 16) & 255) / 255,
    g: ((parsed >> 8) & 255) / 255,
    b: (parsed & 255) / 255,
  };
}

function SkylineBand() {
  return (
    <group position={[0, 0.2, -7.2]}>
      {[-6.8, -5.5, -4.7, -3.5, -2.7, -1.4, -0.3, 1.2, 2.4, 3.8, 5.1, 6.5].map((x, index) => {
        const width = 0.9 + (index % 3) * 0.25;
        const height = 1.6 + (index % 5) * 0.48;
        const depth = 0.8 + (index % 2) * 0.16;

        return (
          <group key={`skyline-${x}`} position={[x, height / 2, (index % 2) * -0.5]}>
            <RoundedBox args={[width, height, depth]} radius={0.12} smoothness={4} castShadow receiveShadow>
              <meshStandardMaterial color={index % 2 === 0 ? '#111b30' : '#0d1526'} metalness={0.35} roughness={0.62} />
            </RoundedBox>
            <mesh position={[0, 0.02, depth / 2 + 0.01]}>
              <planeGeometry args={[width * 0.78, height * 0.8]} />
              <meshBasicMaterial color={index % 3 === 0 ? '#8bdcff' : '#7668ff'} transparent opacity={0.14} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function AtmosphereRings() {
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  return (
    <group ref={ringRef} position={[0, 2.8, -1.8]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[5.2, 0.03, 16, 180]} />
        <meshBasicMaterial color="#63d5ff" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
        <torusGeometry args={[6.6, 0.025, 16, 180]} />
        <meshBasicMaterial color="#9d7bff" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function LightColumns() {
  return (
    <group>
      {[
        { position: [-5.5, 0, -5.7], color: '#63d5ff', scale: 1.1 },
        { position: [5.5, 0, -5.2], color: '#9d7bff', scale: 1.25 },
        { position: [0, 0, -6.4], color: '#ffbf72', scale: 0.95 },
      ].map((beam) => (
        <mesh key={`${beam.position[0]}-${beam.position[2]}`} position={[beam.position[0], 2.8, beam.position[2]]}>
          <cylinderGeometry args={[0.18 * beam.scale, 1.05 * beam.scale, 5.8, 32, 1, true]} />
          <meshBasicMaterial color={beam.color} transparent opacity={0.08} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function DataStreams({ node }: { node: DistrictNode }) {
  const streamRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!streamRef.current) return;
    streamRef.current.rotation.y = state.clock.elapsedTime * 0.18;
  });

  const { r, g, b } = hexToRgb(node.project.accent);

  return (
    <group ref={streamRef} position={[node.position[0], node.height + 0.38, node.position[2]]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.72, 0.025, 16, 64]} />
        <meshBasicMaterial color={[r, g, b]} transparent opacity={0.45} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0.8, 0]}>
        <torusGeometry args={[0.96, 0.02, 16, 64]} />
        <meshBasicMaterial color={[r * 0.8 + 0.2, g * 0.8 + 0.2, b * 0.8 + 0.2]} transparent opacity={0.24} />
      </mesh>
    </group>
  );
}

function ProjectTower({ node }: { node: DistrictNode }) {
  const { r, g, b } = hexToRgb(node.project.accent);
  const activeAgents = node.project.agents.filter((agent) => agent.status === 'active').length;

  return (
    <group position={node.position}>
      <Float speed={1.5} rotationIntensity={0.12} floatIntensity={0.26}>
        <mesh position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <cylinderGeometry args={[1.22, 1.36, 0.1, 6]} />
          <meshStandardMaterial color="#121d34" metalness={0.4} roughness={0.58} />
        </mesh>
        <RoundedBox args={[node.width, node.height, node.depth]} radius={0.18} smoothness={6} position={[0, node.height / 2, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={[r * 0.65 + 0.16, g * 0.68 + 0.16, b * 0.74 + 0.18]} metalness={0.5} roughness={0.2} />
        </RoundedBox>
        <mesh position={[0, node.height / 2, node.depth / 2 + 0.012]}>
          <planeGeometry args={[node.width * 0.72, node.height * 0.82]} />
          <meshBasicMaterial color={[r * 0.65 + 0.35, g * 0.65 + 0.35, b * 0.65 + 0.35]} transparent opacity={0.2} />
        </mesh>
        {Array.from({ length: 4 }).map((_, windowIndex) => (
          <mesh key={`${node.project.id}-window-${windowIndex}`} position={[0, 0.5 + windowIndex * 0.42, node.depth / 2 + 0.018]}>
            <planeGeometry args={[node.width * 0.56, 0.09]} />
            <meshBasicMaterial color="#d8f7ff" transparent opacity={0.18 + windowIndex * 0.04} />
          </mesh>
        ))}
        <mesh position={[0, node.height + 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[0.58, 40]} />
          <meshStandardMaterial color={[r, g, b]} emissive={[r * 0.9, g * 0.9, b * 0.9]} emissiveIntensity={1.8} transparent opacity={0.94} />
        </mesh>
        {Array.from({ length: Math.max(activeAgents, 1) }).map((_, beaconIndex) => (
          <mesh
            key={`${node.project.id}-beacon-${beaconIndex}`}
            position={[-0.44 + beaconIndex * 0.28, node.height + 0.32, 0.46]}
            castShadow
          >
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color={[r, g, b]} emissive={[r, g, b]} emissiveIntensity={2.6} />
          </mesh>
        ))}
        <DataStreams node={node} />
      </Float>
    </group>
  );
}

function AgentRail({ count }: { count: number }) {
  return (
    <group position={[0, 0.14, 2.95]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4.8, 0.32]} />
        <meshStandardMaterial color="#11203a" emissive="#10223e" emissiveIntensity={0.4} metalness={0.42} roughness={0.32} />
      </mesh>
      {Array.from({ length: Math.max(count, 1) }).map((_, index) => (
        <mesh key={`rail-agent-${index}`} position={[index * 0.52 - Math.max(count - 1, 0) * 0.26, 0.14, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.14, 0.24, 20]} />
          <meshStandardMaterial color="#63d5ff" emissive="#63d5ff" emissiveIntensity={1.8} metalness={0.24} roughness={0.28} />
        </mesh>
      ))}
    </group>
  );
}

function AlertBeacon({ count }: { count: number }) {
  return (
    <group position={[4.45, 0.22, -1.95]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.22, 0.32, 0.24, 24]} />
        <meshStandardMaterial color="#1c2437" metalness={0.22} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.34, 0]} castShadow>
        <sphereGeometry args={[0.18 + Math.min(count, 4) * 0.02, 24, 24]} />
        <meshStandardMaterial color="#ff7b87" emissive="#ff7b87" emissiveIntensity={2.2} />
      </mesh>
      <mesh position={[0, 0.34, 0]}>
        <sphereGeometry args={[0.38 + Math.min(count, 4) * 0.04, 24, 24]} />
        <meshBasicMaterial color="#ff7b87" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function CommandFloor() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <cylinderGeometry args={[6.3, 7.1, 0.28, 8]} />
        <meshStandardMaterial color="#0a1326" metalness={0.28} roughness={0.84} />
      </mesh>
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[2.3, 5.45, 8]} />
        <meshStandardMaterial color="#111f38" emissive="#17315a" emissiveIntensity={0.9} metalness={0.58} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.1, 48]} />
        <meshStandardMaterial color="#0e1b31" metalness={0.62} roughness={0.18} />
      </mesh>
      <mesh position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.25, 1.95, 48]} />
        <meshBasicMaterial color="#63d5ff" transparent opacity={0.24} />
      </mesh>
      <mesh position={[0, 0.12, -3.95]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8.2, 0.28]} />
        <meshStandardMaterial color="#63d5ff" emissive="#63d5ff" emissiveIntensity={0.82} transparent opacity={0.88} />
      </mesh>
    </group>
  );
}

function WorldScene({ snapshot }: { snapshot: OfficeSnapshot }) {
  const districts = useMemo(() => buildDistrictLayout(snapshot), [snapshot]);
  const activeAgents = snapshot.projects.flatMap((project) => project.agents).filter((agent) => agent.status === 'active').length;

  return (
    <>
      <color attach="background" args={['#040816']} />
      <fog attach="fog" args={['#040816', 10, 28]} />
      <ambientLight intensity={0.75} />
      <hemisphereLight args={['#a8c5ff', '#030711', 1.15]} />
      <directionalLight position={[8, 11, 6]} intensity={1.6} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <pointLight position={[-5, 4.5, 3]} intensity={26} distance={18} color="#63d5ff" />
      <pointLight position={[4.5, 3.8, -1]} intensity={18} distance={16} color="#9d7bff" />
      <pointLight position={[0, 4.2, -5.8]} intensity={14} distance={18} color="#ffbf72" />

      <Stars radius={40} depth={30} count={2400} factor={4.2} saturation={0} fade speed={0.55} />
      <Sparkles count={38} scale={[15, 5, 15]} size={2.4} speed={0.28} color="#7ddcff" position={[0, 2.5, -1.5]} />

      <LightColumns />
      <SkylineBand />
      <AtmosphereRings />
      <CommandFloor />

      {districts.map((node) => (
        <ProjectTower key={node.project.id} node={node} />
      ))}

      <AgentRail count={activeAgents} />
      <AlertBeacon count={snapshot.alerts.length} />

      <ContactShadows position={[0, -0.001, 0]} opacity={0.52} scale={19} blur={2.8} far={10} resolution={1024} color="#000000" />
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={0.9} maxPolarAngle={1.12} minAzimuthAngle={-0.56} maxAzimuthAngle={0.56} />
      <PerspectiveCamera makeDefault position={[8.1, 7.1, 8.8]} fov={33} />
    </>
  );
}

function HQWorldCanvasComponent({ snapshot }: { snapshot: OfficeSnapshot }) {
  return (
    <Canvas shadows dpr={[1, 1.75]} className="hq-world-canvas" gl={{ antialias: true, alpha: true }}>
      <WorldScene snapshot={snapshot} />
    </Canvas>
  );
}

export const HQWorldCanvas = memo(HQWorldCanvasComponent);
