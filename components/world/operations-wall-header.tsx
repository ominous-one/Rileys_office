import { ProjectSummary } from '@/lib/domain/types';
import type { JSX } from 'react';

export function OperationsWallHeader({ projects }: { projects: ProjectSummary[] }): JSX.Element {
  return (
    <>
      <mesh position={[0, 2.5, 0.09]}>
        <planeGeometry args={[1.45, 0.12]} />
        <meshBasicMaterial color="#63d5ff" transparent opacity={0.92} />
      </mesh>
      <mesh position={[0, 2.18, 0.09]}>
        <planeGeometry args={[1.02, 0.02]} />
        <meshBasicMaterial color="#f8fbff" transparent opacity={0.1} />
      </mesh>
      <mesh position={[0, 2.12, 0.09]}>
        <planeGeometry args={[0.58, 0.012]} />
        <meshBasicMaterial color="#dbeafe" transparent opacity={0.08} />
      </mesh>
      <mesh position={[0, 2.08, 0.09]}>
        <planeGeometry args={[0.28, 0.008]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
      </mesh>
      <mesh position={[0, 2.04, 0.09]}>
        <planeGeometry args={[0.14, 0.006]} />
        <meshBasicMaterial color="#dbeafe" transparent opacity={0.08} />
      </mesh>
    </>
  );
}
