'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  ContactShadows,
  OrbitControls,
  PerspectiveCamera,
  RoundedBox,
} from '@react-three/drei';
import type { OfficeSnapshot, ProjectSummary } from '@/lib/domain/types';
import { memo, useMemo, useRef } from 'react';
import * as THREE from 'three';

interface DeskNode {
  project: ProjectSummary;
  position: [number, number, number];
  accent: string;
  row: number;
  column: number;
  activeAgents: number;
}

function buildDeskLayout(snapshot: OfficeSnapshot): DeskNode[] {
  return snapshot.projects.map((project, index) => {
    const column = index % 3;
    const row = Math.floor(index / 3);

    return {
      project,
      row,
      column,
      accent: project.accent,
      activeAgents: project.agents.filter((agent) => agent.status === 'active').length,
      position: [column * 2.72 - 2.72, 0, row * -2.75 + 1.35],
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

function CeilingLights() {
  const fixtures: Array<[number, number, number]> = [
    [-3.9, 4.28, 2.75],
    [0, 4.28, 2.75],
    [3.9, 4.28, 2.75],
    [-3.9, 4.28, 0.1],
    [0, 4.28, 0.1],
    [3.9, 4.28, 0.1],
    [-3.9, 4.28, -2.55],
    [0, 4.28, -2.55],
    [3.9, 4.28, -2.55],
  ];

  return (
    <group>
      {fixtures.map((position, index) => (
        <group key={`light-${index}`} position={position}>
          <RoundedBox args={[1.55, 0.09, 0.46]} radius={0.08} smoothness={4} castShadow>
            <meshStandardMaterial color="#f9fbff" emissive="#ffffff" emissiveIntensity={0.6} metalness={0.18} roughness={0.2} />
          </RoundedBox>
          <mesh position={[0, -0.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.55, 0.5]} />
            <meshBasicMaterial color="#f7fbff" transparent opacity={0.13} side={THREE.DoubleSide} depthWrite={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function WindowWall() {
  return (
    <group position={[0, 0, 4.78]}>
      <RoundedBox args={[9.3, 3.05, 0.14]} radius={0.06} smoothness={4} position={[0, 1.65, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#edf2f7" roughness={0.92} />
      </RoundedBox>
      {[-3.05, 0, 3.05].map((x) => (
        <group key={`window-bay-${x}`} position={[x, 1.58, 0.09]}>
          <RoundedBox args={[2.3, 2.2, 0.05]} radius={0.04} smoothness={4}>
            <meshStandardMaterial color="#c8d8ea" transparent opacity={0.3} metalness={0.45} roughness={0.08} />
          </RoundedBox>
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[2.05, 1.95]} />
            <meshBasicMaterial color="#dff3ff" transparent opacity={0.24} />
          </mesh>
          <mesh position={[0, 0.9, 0.04]}>
            <planeGeometry args={[1.7, 0.08]} />
            <meshBasicMaterial color="#f8fbff" transparent opacity={0.7} />
          </mesh>
          <mesh position={[0, -1.03, 0.04]}>
            <planeGeometry args={[2.08, 0.08]} />
            <meshBasicMaterial color="#d7dee8" transparent opacity={0.92} />
          </mesh>
          <mesh position={[-0.96, 0, 0.04]} rotation={[0, 0, Math.PI / 2]}>
            <planeGeometry args={[2.02, 0.06]} />
            <meshBasicMaterial color="#d7dee8" transparent opacity={0.72} />
          </mesh>
          <mesh position={[0.96, 0, 0.04]} rotation={[0, 0, Math.PI / 2]}>
            <planeGeometry args={[2.02, 0.06]} />
            <meshBasicMaterial color="#d7dee8" transparent opacity={0.72} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function OfficeShell() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12.2, 10.8]} />
        <meshStandardMaterial color="#d7dde6" metalness={0.05} roughness={0.9} />
      </mesh>

      <mesh position={[0, 0.01, 1.05]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10.6, 1.55]} />
        <meshStandardMaterial color="#626a78" metalness={0.15} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.012, 1.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.4, 1.12]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
      </mesh>

      {[-4.3, -1.45, 1.45, 4.3].map((x) => (
        <mesh key={`walk-line-${x}`} position={[x, 0.02, 1.05]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.11, 10.15]} />
          <meshStandardMaterial color="#eef4fb" roughness={0.92} />
        </mesh>
      ))}
      {[-3.15, 0, 3.15].map((x) => (
        <mesh key={`walk-marker-${x}`} position={[x, 0.021, 1.05]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.15, 0.14]} />
          <meshBasicMaterial color="#f8fbff" transparent opacity={0.3} />
        </mesh>
      ))}

      <RoundedBox args={[12.2, 0.18, 0.35]} radius={0.04} smoothness={2} position={[0, 0.09, 5.18]} receiveShadow>
        <meshStandardMaterial color="#f3f6fa" roughness={0.84} />
      </RoundedBox>
      <RoundedBox args={[12.2, 0.18, 0.35]} radius={0.04} smoothness={2} position={[0, 0.09, -5.18]} receiveShadow>
        <meshStandardMaterial color="#f3f6fa" roughness={0.84} />
      </RoundedBox>
      <RoundedBox args={[0.35, 0.18, 10.8]} radius={0.04} smoothness={2} position={[-5.92, 0.09, 0]} receiveShadow>
        <meshStandardMaterial color="#f3f6fa" roughness={0.84} />
      </RoundedBox>
      <RoundedBox args={[0.35, 0.18, 10.8]} radius={0.04} smoothness={2} position={[5.92, 0.09, 0]} receiveShadow>
        <meshStandardMaterial color="#f3f6fa" roughness={0.84} />
      </RoundedBox>

      <RoundedBox args={[11.5, 3.25, 0.16]} radius={0.06} smoothness={4} position={[0, 1.62, -5.02]} castShadow receiveShadow>
        <meshStandardMaterial color="#eef2f7" metalness={0.04} roughness={0.92} />
      </RoundedBox>
      <RoundedBox args={[0.16, 3.25, 10.1]} radius={0.05} smoothness={4} position={[-5.18, 1.62, -0.08]} castShadow receiveShadow>
        <meshStandardMaterial color="#eef2f7" metalness={0.04} roughness={0.92} />
      </RoundedBox>
      <RoundedBox args={[0.16, 3.25, 10.1]} radius={0.05} smoothness={4} position={[5.18, 1.62, -0.08]} castShadow receiveShadow>
        <meshStandardMaterial color="#eef2f7" metalness={0.04} roughness={0.92} />
      </RoundedBox>

      <RoundedBox args={[4.25, 2.5, 0.08]} radius={0.04} smoothness={4} position={[0, 1.28, -1.2]}>
        <meshStandardMaterial color="#d9f0ff" transparent opacity={0.24} metalness={0.52} roughness={0.05} />
      </RoundedBox>
      <RoundedBox args={[0.08, 2.5, 2.85]} radius={0.04} smoothness={4} position={[-2.12, 1.28, -2.55]}>
        <meshStandardMaterial color="#d9f0ff" transparent opacity={0.22} metalness={0.52} roughness={0.05} />
      </RoundedBox>
      <RoundedBox args={[0.08, 2.5, 2.85]} radius={0.04} smoothness={4} position={[2.12, 1.28, -2.55]}>
        <meshStandardMaterial color="#d9f0ff" transparent opacity={0.22} metalness={0.52} roughness={0.05} />
      </RoundedBox>

      <mesh position={[0, 3.34, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12.2, 10.8]} />
        <meshStandardMaterial color="#f8fbff" roughness={0.96} metalness={0.02} />
      </mesh>
      <mesh position={[0, 3.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[11.6, 10.2]} />
        <meshBasicMaterial color="#d9e2ec" transparent opacity={0.08} />
      </mesh>

      <WindowWall />
    </group>
  );
}

function ReceptionDesk({ alerts }: { alerts: number }) {
  return (
    <group position={[0, 0, 3.92]}>
      <mesh position={[0, 0.03, -0.18]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4.3, 1.85]} />
        <meshStandardMaterial color="#d4dbe4" roughness={0.97} metalness={0.02} />
      </mesh>
      <RoundedBox args={[3.2, 0.82, 0.96]} radius={0.14} smoothness={4} position={[0, 0.41, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#cfb28a" metalness={0.14} roughness={0.62} />
      </RoundedBox>
      <RoundedBox args={[1.82, 0.42, 0.5]} radius={0.1} smoothness={4} position={[0, 0.95, -0.05]} castShadow>
        <meshStandardMaterial color="#fafcff" roughness={0.32} metalness={0.06} />
      </RoundedBox>
      <mesh position={[0, 1.02, 0.2]}>
        <planeGeometry args={[0.85, 0.16]} />
        <meshBasicMaterial color="#58c8f6" transparent opacity={0.88} />
      </mesh>
      <mesh position={[0, 0.031, -0.18]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.84, 1.18, 40]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.24} />
      </mesh>
      {Array.from({ length: Math.max(1, Math.min(alerts, 4)) }).map((_, index) => (
        <mesh key={`reception-status-${index}`} position={[-0.48 + index * 0.32, 1.12, 0.2]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color={index < 2 ? '#63d5ff' : index === 2 ? '#ffbf72' : '#ff7b87'} emissive={index < 2 ? '#63d5ff' : index === 2 ? '#ffbf72' : '#ff7b87'} emissiveIntensity={1.8} />
        </mesh>
      ))}
    </group>
  );
}

function DeskCluster({ node }: { node: DeskNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const { r, g, b } = hexToRgb(node.accent);
  const seatCount = Math.max(2, Math.min(node.project.agents.length, 4));
  const activeSeats = Math.max(1, Math.min(node.activeAgents, seatCount));

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7 + node.row + node.column * 0.25) * 0.016;
  });

  return (
    <group ref={groupRef} position={node.position}>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.18, 2.25]} />
        <meshStandardMaterial color="#bac7d6" roughness={0.94} />
      </mesh>

      <RoundedBox args={[1.85, 0.12, 0.86]} radius={0.08} smoothness={4} position={[0, 0.74, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#d4b083" metalness={0.1} roughness={0.72} />
      </RoundedBox>

      <RoundedBox args={[1.82, 0.08, 0.16]} radius={0.05} smoothness={4} position={[0, 0.9, -0.3]} castShadow>
        <meshStandardMaterial color="#f7fbff" metalness={0.05} roughness={0.28} />
      </RoundedBox>

      {[-0.77, 0.77].map((x) =>
        [-0.3, 0.3].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.36, z]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.72, 12]} />
            <meshStandardMaterial color="#5f6470" metalness={0.44} roughness={0.44} />
          </mesh>
        )),
      )}

      {Array.from({ length: seatCount }).map((_, index) => {
        const offsetX = seatCount === 2 ? (index === 0 ? -0.45 : 0.45) : -0.68 + index * 0.45;
        const active = index < activeSeats;

        return (
          <group key={`${node.project.id}-seat-${index}`} position={[offsetX, 0, 0.74]}>
            <mesh position={[0, 0.32, 0]} castShadow>
              <cylinderGeometry args={[0.13, 0.13, 0.06, 18]} />
              <meshStandardMaterial color={active ? '#1e293c' : '#4b5563'} roughness={0.64} />
            </mesh>
            <mesh position={[0, 0.58, 0]} castShadow>
              <boxGeometry args={[0.34, 0.08, 0.34]} />
              <meshStandardMaterial color={active ? '#111827' : '#374151'} roughness={0.74} />
            </mesh>
            <mesh position={[0, 0.82, -0.1]} castShadow>
              <boxGeometry args={[0.3, 0.34, 0.08]} />
              <meshStandardMaterial color={active ? '#111827' : '#374151'} roughness={0.74} />
            </mesh>
            <mesh position={[0, 1.04, -0.56]} castShadow>
              <boxGeometry args={[0.36, 0.26, 0.05]} />
              <meshStandardMaterial color="#dbeafe" emissive={active ? new THREE.Color(r * 0.78, g * 0.78, b * 0.78) : '#9ca3af'} emissiveIntensity={active ? 1.18 : 0.08} roughness={0.12} metalness={0.08} />
            </mesh>
            <mesh position={[0, 0.92, -0.46]}>
              <boxGeometry args={[0.05, 0.22, 0.05]} />
              <meshStandardMaterial color="#6b7280" metalness={0.32} roughness={0.4} />
            </mesh>
          </group>
        );
      })}

      <mesh position={[0, 1.18, -0.25]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.2, 0.24]} />
        <meshBasicMaterial color={[r, g, b]} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function WarRoom() {
  const chairs = [-1.45, -0.5, 0.5, 1.45];

  return (
    <group position={[0, 0, -2.95]}>
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5.4, 2.75]} />
        <meshStandardMaterial color="#c7d2dd" roughness={0.96} metalness={0.02} />
      </mesh>
      <mesh position={[0, 0.031, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.72, 1.08, 48]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.22} />
      </mesh>
      <RoundedBox args={[4.2, 0.11, 1.45]} radius={0.08} smoothness={4} position={[0, 0.74, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#c6a073" metalness={0.08} roughness={0.72} />
      </RoundedBox>
      {[-1.78, 1.78].map((x) =>
        [-0.56, 0.56].map((z) => (
          <mesh key={`warroom-leg-${x}-${z}`} position={[x, 0.36, z]} castShadow>
            <cylinderGeometry args={[0.045, 0.045, 0.72, 12]} />
            <meshStandardMaterial color="#596171" metalness={0.42} roughness={0.46} />
          </mesh>
        )),
      )}

      {chairs.map((x, index) => (
        <group key={`warroom-seat-front-${index}`} position={[x, 0, 1.18]}>
          <mesh position={[0, 0.35, 0]} castShadow>
            <cylinderGeometry args={[0.14, 0.14, 0.06, 18]} />
            <meshStandardMaterial color="#1f2937" roughness={0.64} />
          </mesh>
          <mesh position={[0, 0.62, 0]} castShadow>
            <boxGeometry args={[0.36, 0.08, 0.36]} />
            <meshStandardMaterial color="#111827" roughness={0.72} />
          </mesh>
          <mesh position={[0, 0.86, -0.08]} castShadow>
            <boxGeometry args={[0.32, 0.36, 0.08]} />
            <meshStandardMaterial color="#111827" roughness={0.72} />
          </mesh>
        </group>
      ))}

      {chairs.map((x, index) => (
        <group key={`warroom-seat-back-${index}`} position={[x, 0, -1.18]} rotation={[0, Math.PI, 0]}>
          <mesh position={[0, 0.35, 0]} castShadow>
            <cylinderGeometry args={[0.14, 0.14, 0.06, 18]} />
            <meshStandardMaterial color="#1f2937" roughness={0.64} />
          </mesh>
          <mesh position={[0, 0.62, 0]} castShadow>
            <boxGeometry args={[0.36, 0.08, 0.36]} />
            <meshStandardMaterial color="#111827" roughness={0.72} />
          </mesh>
          <mesh position={[0, 0.86, -0.08]} castShadow>
            <boxGeometry args={[0.32, 0.36, 0.08]} />
            <meshStandardMaterial color="#111827" roughness={0.72} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 1.08, 0]}>
        <planeGeometry args={[2.4, 0.5]} />
        <meshBasicMaterial color="#d8f2ff" transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

function OperationsWall({ projects }: { projects: ProjectSummary[] }) {
  const featured = projects.slice(0, 4);

  return (
    <group position={[0, 0, -4.64]}>
      <RoundedBox args={[4.8, 0.24, 0.42]} radius={0.06} smoothness={4} position={[0, 0.22, 0.02]} castShadow receiveShadow>
        <meshStandardMaterial color="#e5e7eb" roughness={0.72} metalness={0.06} />
      </RoundedBox>
      <mesh position={[-1.68, 0.42, 0.12]}>
        <boxGeometry args={[0.42, 0.22, 0.16]} />
        <meshStandardMaterial color="#111827" roughness={0.46} metalness={0.12} />
      </mesh>
      <mesh position={[-1.05, 0.45, 0.14]}>
        <cylinderGeometry args={[0.07, 0.07, 0.28, 18]} />
        <meshStandardMaterial color="#dbeafe" roughness={0.16} metalness={0.04} />
      </mesh>
      <mesh position={[1.58, 0.4, 0.12]}>
        <boxGeometry args={[0.36, 0.18, 0.14]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.74} />
      </mesh>
      <RoundedBox args={[4.8, 1.9, 0.12]} radius={0.06} smoothness={4} position={[0, 1.58, 0]} castShadow>
        <meshStandardMaterial color="#101828" metalness={0.26} roughness={0.4} />
      </RoundedBox>
      <mesh position={[0, 1.58, 0.08]}>
        <planeGeometry args={[4.3, 1.48]} />
        <meshBasicMaterial color="#081322" />
      </mesh>
      {featured.map((project, index) => {
        const column = index % 2;
        const row = Math.floor(index / 2);
        const { r, g, b } = hexToRgb(project.accent);
        const x = column === 0 ? -1.05 : 1.05;
        const y = row === 0 ? 1.9 : 1.25;

        return (
          <group key={project.id} position={[x, y, 0.09]}>
            <RoundedBox args={[1.55, 0.48, 0.04]} radius={0.03} smoothness={4}>
              <meshStandardMaterial color="#0f1b2d" roughness={0.22} metalness={0.12} />
            </RoundedBox>
            <mesh position={[0, 0, 0.03]}>
              <planeGeometry args={[1.34, 0.32]} />
              <meshBasicMaterial color={[r, g, b]} transparent opacity={0.46} />
            </mesh>
            <mesh position={[0, -0.12, 0.04]}>
              <planeGeometry args={[1.2, 0.04]} />
              <meshBasicMaterial color="#dff3ff" transparent opacity={0.75} />
            </mesh>
          </group>
        );
      })}
      <mesh position={[0, 2.5, 0.09]}>
        <planeGeometry args={[1.45, 0.12]} />
        <meshBasicMaterial color="#63d5ff" transparent opacity={0.92} />
      </mesh>
    </group>
  );
}

function SideCredenza() {
  return (
    <group position={[-4.28, 0, -3.35]}>
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.5, 1.2]} />
        <meshStandardMaterial color="#d7dde4" roughness={0.97} metalness={0.02} />
      </mesh>
      <RoundedBox args={[1.7, 0.82, 0.56]} radius={0.08} smoothness={4} position={[0, 0.41, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#d2b187" roughness={0.7} />
      </RoundedBox>
      <RoundedBox args={[0.72, 0.06, 0.4]} radius={0.04} smoothness={4} position={[-0.38, 0.84, 0]} castShadow>
        <meshStandardMaterial color="#f7fafc" roughness={0.28} />
      </RoundedBox>
      <RoundedBox args={[0.72, 0.06, 0.4]} radius={0.04} smoothness={4} position={[0.38, 0.84, 0]} castShadow>
        <meshStandardMaterial color="#f7fafc" roughness={0.28} />
      </RoundedBox>
      <mesh position={[-0.42, 0.93, 0.02]}>
        <cylinderGeometry args={[0.08, 0.08, 0.16, 18]} />
        <meshStandardMaterial color="#dbeafe" roughness={0.16} metalness={0.04} />
      </mesh>
      <mesh position={[0.34, 0.93, -0.02]}>
        <boxGeometry args={[0.18, 0.12, 0.18]} />
        <meshStandardMaterial color="#e5e7eb" roughness={0.74} />
      </mesh>
    </group>
  );
}

function Lounge() {
  return (
    <group position={[4.05, 0, -2.95]}>
      <mesh position={[-0.18, 0.03, 0.02]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3.1, 2.1]} />
        <meshStandardMaterial color="#d8dde4" roughness={0.97} metalness={0.02} />
      </mesh>
      <RoundedBox args={[1.6, 0.52, 0.8]} radius={0.12} smoothness={4} position={[0, 0.35, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#7d889b" roughness={0.86} />
      </RoundedBox>
      <RoundedBox args={[1.6, 0.48, 0.14]} radius={0.08} smoothness={4} position={[0, 0.78, -0.32]} castShadow>
        <meshStandardMaterial color="#6a778a" roughness={0.84} />
      </RoundedBox>
      <RoundedBox args={[0.8, 0.08, 0.8]} radius={0.08} smoothness={4} position={[-1.22, 0.42, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#caa37b" roughness={0.72} />
      </RoundedBox>
      <mesh position={[-1.22, 0.67, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.46, 12]} />
        <meshStandardMaterial color="#5a616e" metalness={0.38} roughness={0.42} />
      </mesh>
      <mesh position={[-1.22, 0.85, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#f4eed9" emissive="#fff7cc" emissiveIntensity={0.38} roughness={0.5} />
      </mesh>
      <mesh position={[-1.03, 0.49, 0.1]}>
        <cylinderGeometry args={[0.06, 0.06, 0.12, 12]} />
        <meshStandardMaterial color="#d7e9f7" roughness={0.18} metalness={0.04} />
      </mesh>
      <mesh position={[-1.22, 0.46, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[0.22, 0.34, 28]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.26} />
      </mesh>
    </group>
  );
}

function Whiteboard() {
  return (
    <group position={[4.58, 1.6, -0.45]} rotation={[0, -Math.PI / 2, 0]}>
      <RoundedBox args={[2.2, 1.35, 0.08]} radius={0.05} smoothness={4} castShadow>
        <meshStandardMaterial color="#f7fafc" roughness={0.2} metalness={0.02} />
      </RoundedBox>
      <mesh position={[0, 0.2, 0.05]}>
        <planeGeometry args={[1.55, 0.08]} />
        <meshBasicMaterial color="#63d5ff" transparent opacity={0.55} />
      </mesh>
      <mesh position={[0, -0.1, 0.05]}>
        <planeGeometry args={[1.15, 0.04]} />
        <meshBasicMaterial color="#94a3b8" transparent opacity={0.52} />
      </mesh>
      <RoundedBox args={[0.62, 0.08, 0.12]} radius={0.03} smoothness={4} position={[0, -0.78, 0.02]} castShadow>
        <meshStandardMaterial color="#c6ced8" roughness={0.46} metalness={0.18} />
      </RoundedBox>
      <mesh position={[-0.16, -0.72, 0.08]} rotation={[0, 0, Math.PI / 9]}>
        <cylinderGeometry args={[0.018, 0.018, 0.22, 12]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} />
      </mesh>
      <mesh position={[0.08, -0.72, 0.08]} rotation={[0, 0, -Math.PI / 10]}>
        <cylinderGeometry args={[0.018, 0.018, 0.2, 12]} />
        <meshStandardMaterial color="#1d4ed8" roughness={0.36} />
      </mesh>
      <mesh position={[0.24, -0.72, 0.08]} rotation={[0, 0, Math.PI / 8]}>
        <cylinderGeometry args={[0.018, 0.018, 0.18, 12]} />
        <meshStandardMaterial color="#dc2626" roughness={0.36} />
      </mesh>
    </group>
  );
}

function Plant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[0.24, 0.36, 28]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.16} />
      </mesh>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.2, 0.35, 16]} />
        <meshStandardMaterial color="#8a623d" roughness={0.82} />
      </mesh>
      {[
        [0, 0.48, 0],
        [0.14, 0.44, 0.02],
        [-0.14, 0.42, -0.03],
        [0.08, 0.6, -0.04],
        [-0.08, 0.58, 0.06],
      ].map((leaf, index) => (
        <mesh key={`leaf-${index}`} position={leaf as [number, number, number]} castShadow>
          <sphereGeometry args={[0.12, 14, 14]} />
          <meshStandardMaterial color="#4b8b5d" roughness={0.92} />
        </mesh>
      ))}
    </group>
  );
}

function AccentPanels({ projects }: { projects: ProjectSummary[] }) {
  return (
    <group position={[0, 1.72, 4.68]}>
      {projects.slice(0, 3).map((project, index) => {
        const x = -2.35 + index * 2.35;
        const { r, g, b } = hexToRgb(project.accent);

        return (
          <group key={project.id} position={[x, 0, 0]}>
            <RoundedBox args={[1.62, 0.96, 0.08]} radius={0.06} smoothness={4}>
              <meshStandardMaterial color="#1e293b" metalness={0.28} roughness={0.42} />
            </RoundedBox>
            <mesh position={[0, 0, 0.05]}>
              <planeGeometry args={[1.16, 0.46]} />
              <meshBasicMaterial color={[r, g, b]} transparent opacity={0.58} />
            </mesh>
            <mesh position={[0, -0.46, 0.03]}>
              <boxGeometry args={[1.22, 0.08, 0.12]} />
              <meshStandardMaterial color="#d9e1ea" roughness={0.5} metalness={0.12} />
            </mesh>
            <mesh position={[-0.36, -0.36, 0.09]}>
              <cylinderGeometry args={[0.018, 0.018, 0.18, 12]} />
              <meshStandardMaterial color="#111827" roughness={0.42} />
            </mesh>
            <mesh position={[-0.18, -0.36, 0.09]}>
              <cylinderGeometry args={[0.018, 0.018, 0.18, 12]} />
              <meshStandardMaterial color="#2563eb" roughness={0.36} />
            </mesh>
            <mesh position={[0.02, -0.36, 0.09]}>
              <cylinderGeometry args={[0.018, 0.018, 0.18, 12]} />
              <meshStandardMaterial color="#dc2626" roughness={0.36} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function Atmosphere({ mobileOptimized }: { mobileOptimized?: boolean }) {
  const particles = useMemo(
    () =>
      Array.from({ length: mobileOptimized ? 18 : 30 }, (_, index) => ({
        id: index,
        position: [
          ((index * 37) % 100) / 10 - 5,
          1.2 + ((index * 19) % 40) / 20,
          ((index * 23) % 120) / 12 - 5,
        ] as [number, number, number],
        scale: 0.03 + ((index * 7) % 10) / 260,
      })),
    [mobileOptimized],
  );

  return (
    <group>
      <mesh position={[0, 3.18, -1.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10.4, 8.8]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={mobileOptimized ? 0.035 : 0.055} depthWrite={false} />
      </mesh>
      <mesh position={[0, 2.86, 3.85]}>
        <planeGeometry args={[8.8, 2.6]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={mobileOptimized ? 0.045 : 0.07} depthWrite={false} />
      </mesh>
      {particles.map((particle) => (
        <mesh key={particle.id} position={particle.position}>
          <sphereGeometry args={[particle.scale, 8, 8]} />
          <meshBasicMaterial color="#dbeafe" transparent opacity={0.24} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function CameraRig({ mobileOptimized }: { mobileOptimized?: boolean }) {
  const rigRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame((state) => {
    if (!rigRef.current) return;

    const t = state.clock.elapsedTime;
    const drift = mobileOptimized ? 0.1 : 0.16;
    rigRef.current.position.x = 8.3 + Math.sin(t * 0.22) * drift;
    rigRef.current.position.y = 6.45 + Math.sin(t * 0.18) * 0.08;
    rigRef.current.position.z = 8.95 + Math.cos(t * 0.16) * drift;
    rigRef.current.lookAt(0, 1.55, -0.75);
  });

  return <PerspectiveCamera ref={rigRef} makeDefault position={[8.3, 6.45, 8.95]} fov={mobileOptimized ? 35 : 33} />;
}

function WorldScene({ snapshot, mobileOptimized }: { snapshot: OfficeSnapshot; mobileOptimized?: boolean }) {
  const desks = useMemo(() => buildDeskLayout(snapshot), [snapshot]);
  const activeAgents = snapshot.projects.flatMap((project) => project.agents).filter((agent) => agent.status === 'active').length;

  return (
    <>
      <color attach="background" args={['#dce7f6']} />
      <fog attach="fog" args={['#dce7f6', 9.5, 24]} />
      <ambientLight intensity={mobileOptimized ? 1.0 : 1.08} />
      <hemisphereLight args={['#f8fbff', '#93a4bf', mobileOptimized ? 1.18 : 1.32]} />
      <directionalLight position={[6, 9, 6]} intensity={mobileOptimized ? 1.6 : 1.95} castShadow shadow-mapSize-width={mobileOptimized ? 1024 : 2048} shadow-mapSize-height={mobileOptimized ? 1024 : 2048} />
      <pointLight position={[0, 4.24, 1.5]} intensity={mobileOptimized ? 20 : 30} distance={20} color="#fdfefe" />
      <pointLight position={[-3.2, 2.7, 1.4]} intensity={mobileOptimized ? 4 : 7} distance={10} color="#8b5cf6" />
      <pointLight position={[3.4, 2.6, -1.6]} intensity={mobileOptimized ? 4 : 6} distance={9} color="#60a5fa" />
      <pointLight position={[0, 3.1, -4.1]} intensity={mobileOptimized ? 8 : 12} distance={12} color="#d6ecff" />

      <OfficeShell />
      <CeilingLights />
      <ReceptionDesk alerts={snapshot.alerts.length} />
      <WarRoom />
      <OperationsWall projects={snapshot.projects} />
      <SideCredenza />
      <Lounge />
      <Whiteboard />
      <Plant position={[-4.7, 0, 4.05]} />
      <Plant position={[4.7, 0, 4.05]} />
      <Plant position={[-4.82, 0, -4.18]} />
      <Plant position={[4.82, 0, -4.18]} />
      <AccentPanels projects={snapshot.projects} />
      <Atmosphere mobileOptimized={mobileOptimized} />

      {desks.map((node) => (
        <DeskCluster key={node.project.id} node={node} />
      ))}

      <mesh position={[0, 1.88, 4.18]}>
        <planeGeometry args={[2.45, 0.34]} />
        <meshBasicMaterial color="#0f172a" transparent opacity={0.92} />
      </mesh>
      <mesh position={[0, 1.88, 4.2]}>
        <planeGeometry args={[1.72, 0.12]} />
        <meshBasicMaterial color="#63d5ff" transparent opacity={0.96} />
      </mesh>
      <mesh position={[0, 1.1, 4.16]}>
        <planeGeometry args={[3.2, 1.55]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
      </mesh>
      <mesh position={[0, 0.64, 4.14]}>
        <boxGeometry args={[2.2, 0.08, 0.24]} />
        <meshStandardMaterial color="#d8dee8" roughness={0.52} metalness={0.12} />
      </mesh>

      <mesh position={[-4.86, 1.55, -0.8]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.2, 1.9]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
      </mesh>
      <mesh position={[-4.83, 0.62, -0.8]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.08, 0.08, 1.22]} />
        <meshStandardMaterial color="#d6dde7" roughness={0.52} metalness={0.12} />
      </mesh>
      <mesh position={[4.86, 1.55, -0.8]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[1.2, 1.9]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
      </mesh>
      <mesh position={[4.83, 0.62, -0.8]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[0.08, 0.08, 1.22]} />
        <meshStandardMaterial color="#d6dde7" roughness={0.52} metalness={0.12} />
      </mesh>

      <mesh position={[0, 0.04, 1.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.46, 0.66, 48]} />
        <meshBasicMaterial color="#63d5ff" transparent opacity={0.18 + Math.min(activeAgents, 10) * 0.02} />
      </mesh>

      <ContactShadows position={[0, -0.001, 0]} opacity={mobileOptimized ? 0.18 : 0.26} scale={18} blur={mobileOptimized ? 2.2 : 2.8} far={10} resolution={mobileOptimized ? 256 : 1024} color="#000000" />
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={0.92} maxPolarAngle={1.13} minAzimuthAngle={-0.38} maxAzimuthAngle={0.38} />
      <PerspectiveCamera makeDefault position={[8.3, 6.45, 8.95]} fov={33} />
    </>
  );
}

function HQWorldCanvasComponent({ snapshot, mobileOptimized = false }: { snapshot: OfficeSnapshot; mobileOptimized?: boolean }) {
  return (
    <Canvas
      shadows
      dpr={mobileOptimized ? [1, 1.15] : [1, 1.6]}
      className="hq-world-canvas"
      gl={{ antialias: !mobileOptimized, alpha: true, powerPreference: 'high-performance' }}
    >
      <WorldScene snapshot={snapshot} mobileOptimized={mobileOptimized} />
    </Canvas>
  );
}

export const HQWorldCanvas = memo(HQWorldCanvasComponent);












