import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import type { JSX } from 'react';

export function DeskSeat({ position, active, accent }: { position: [number, number, number]; active: boolean; accent: THREE.Color | string }): JSX.Element {
  return (
    <group position={position}>
      <mesh position={[0, 0.32, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.06, 18]} />
        <meshStandardMaterial color={active ? '#1e293c' : '#4b5563'} roughness={0.64} />
      </mesh>
      <mesh position={[0, 0.58, 0]} castShadow>
        <boxGeometry args={[0.34, 0.08, 0.34]} />
        <meshStandardMaterial color={active ? '#111827' : '#374151'} roughness={0.74} />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <planeGeometry args={[0.16, 0.12]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={active ? 0.06 : 0.02} />
      </mesh>
      <mesh position={[0, 0.82, -0.1]} castShadow>
        <boxGeometry args={[0.3, 0.34, 0.08]} />
        <meshStandardMaterial color={active ? '#111827' : '#374151'} roughness={0.74} />
      </mesh>
      <mesh position={[0, 0.87, -0.055]}>
        <planeGeometry args={[0.18, 0.14]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={active ? 0.08 : 0.03} />
      </mesh>
      <mesh position={[0, 1.04, -0.56]} castShadow>
        <boxGeometry args={[0.36, 0.26, 0.05]} />
        <meshStandardMaterial color="#dbeafe" emissive={active ? accent : '#9ca3af'} emissiveIntensity={active ? 1.18 : 0.08} roughness={0.12} metalness={0.08} />
      </mesh>
      <mesh position={[0, 1.04, -0.53]}>
        <planeGeometry args={[0.26, 0.02]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={active ? 0.12 : 0.04} />
      </mesh>
      <mesh position={[0, 1.0, -0.525]}>
        <planeGeometry args={[0.14, 0.008]} />
        <meshBasicMaterial color="#dbeafe" transparent opacity={active ? 0.08 : 0.03} />
      </mesh>
      <mesh position={[0, 0.92, -0.46]}>
        <boxGeometry args={[0.05, 0.22, 0.05]} />
        <meshStandardMaterial color="#6b7280" metalness={0.32} roughness={0.4} />
      </mesh>
    </group>
  );
}
