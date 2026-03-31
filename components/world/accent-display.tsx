import { RoundedBox } from '@react-three/drei';
import type { JSX } from 'react';

export function AccentDisplay({ project, x, hexToRgb }: { project: { id: string; accent: string }; x: number; hexToRgb: (hex: string) => { r: number; g: number; b: number } }): JSX.Element {
  const { r, g, b } = hexToRgb(project.accent);

  return (
    <group position={[x, 0, 0]}>
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
}
