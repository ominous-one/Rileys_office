import type { HealthState } from '@/lib/domain/types';

export function StatusPill({ state }: { state: HealthState }) {
  return <span className={`status-pill status-pill--${state}`}>{state}</span>;
}
