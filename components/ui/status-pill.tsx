import type { HealthState } from '@/lib/domain/types';

const labelMap: Record<HealthState, string> = {
  healthy: 'Stable',
  active: 'Live',
  blocked: 'Blocked',
  waiting: 'Queued',
  stale: 'Stale',
  degraded: 'Watch',
};

export function StatusPill({ state }: { state: HealthState }) {
  return (
    <span className={`status-pill status-pill--${state}`}>
      <span className="status-pill__dot" aria-hidden="true" />
      {labelMap[state]}
    </span>
  );
}
