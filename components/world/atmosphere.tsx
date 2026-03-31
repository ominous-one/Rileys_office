import type { JSX } from 'react';

export function Atmosphere({ mobileOptimized }: { mobileOptimized?: boolean }): JSX.Element {
  return (
    <>
      <mesh position={[0, -0.12, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[34, 34]} />
        <meshStandardMaterial color="#b9d5ec" roughness={1} metalness={0.02} />
      </mesh>
      <mesh position={[0, -0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[8.4, 13.8, 72]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={mobileOptimized ? 0.04 : 0.06} />
      </mesh>
      <mesh position={[0, -0.105, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.8, 6.2, 64]} />
        <meshBasicMaterial color="#dbeafe" transparent opacity={mobileOptimized ? 0.05 : 0.08} />
      </mesh>
    </>
  );
}
