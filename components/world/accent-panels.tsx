import { ProjectSummary } from '@/lib/domain/types';
import { AccentDisplay } from '@/components/world/accent-display';
import type { JSX } from 'react';

export function AccentPanels({ projects, hexToRgb }: { projects: ProjectSummary[]; hexToRgb: (hex: string) => { r: number; g: number; b: number } }): JSX.Element {
  return (
    <group position={[0, 1.72, 4.68]}>
      {projects.slice(0, 3).map((project, index) => {
        const x = -2.35 + index * 2.35;
        return <AccentDisplay key={project.id} project={project} x={x} hexToRgb={hexToRgb} />;
      })}
    </group>
  );
}
