import type { JSX } from 'react';

export function WarRoomTableLegs(): JSX.Element {
  return (
    <>
      {[-1.78, 1.78].map((x) =>
        [-0.56, 0.56].map((z) => (
          <mesh key={`warroom-leg-${x}-${z}`} position={[x, 0.36, z]} castShadow>
            <cylinderGeometry args={[0.045, 0.045, 0.72, 12]} />
            <meshStandardMaterial color="#596171" metalness={0.42} roughness={0.46} />
          </mesh>
        )),
      )}
    </>
  );
}
