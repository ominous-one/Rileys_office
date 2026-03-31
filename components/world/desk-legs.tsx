import type { JSX } from 'react';

export function DeskLegs(): JSX.Element {
  return (
    <>
      {[-0.77, 0.77].map((x) =>
        [-0.3, 0.3].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.36, z]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.72, 12]} />
            <meshStandardMaterial color="#5f6470" metalness={0.44} roughness={0.44} />
          </mesh>
        )),
      )}
    </>
  );
}
