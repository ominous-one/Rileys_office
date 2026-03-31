import { WarRoomChair } from '@/components/world/war-room-chair';
import type { JSX } from 'react';

export function WarRoomTableChairRow({ chairs, z, rotation }: { chairs: number[]; z: number; rotation?: [number, number, number] }): JSX.Element {
  return (
    <>
      {chairs.map((x, index) => (
        <WarRoomChair key={`warroom-seat-${z}-${index}`} position={[x, 0, z]} rotation={rotation} />
      ))}
    </>
  );
}
