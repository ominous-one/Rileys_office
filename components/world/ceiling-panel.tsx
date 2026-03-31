import type { JSX } from 'react';

export function CeilingPanel({ size, opacity, color = '#ffffff', y }: { size: [number, number]; opacity: number; color?: string; y: number }): JSX.Element {
  return (
    <mesh position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={size} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}
