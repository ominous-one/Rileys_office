import type { JSX } from 'react';

export function WarRoomChair({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }): JSX.Element {
  return (
    <group position={position} rotation={rotation}>
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
  );
}
