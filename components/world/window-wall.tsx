import { RoundedBox } from '@react-three/drei';
import type { JSX } from 'react';

export function WindowWall(): JSX.Element {
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
