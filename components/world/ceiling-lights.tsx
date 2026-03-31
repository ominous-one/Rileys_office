import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import type { JSX } from 'react';

export function CeilingLights(): JSX.Element {
  const fixtures: Array<[number, number, number]> = [
    [-3.9, 4.28, 2.75],
    [0, 4.28, 2.75],
    [3.9, 4.28, 2.75],
    [-3.9, 4.28, 0.1],
    [0, 4.28, 0.1],
    [3.9, 4.28, 0.1],
    [-3.9, 4.28, -2.55],
    [0, 4.28, -2.55],
    [3.9, 4.28, -2.55]
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
