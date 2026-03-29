import type { GovernedAction } from '@/lib/domain/types';

export function getDefaultActions(): GovernedAction[] {
  return [
    {
      id: 'clarify',
      label: 'Clarify',
      description: 'Request clarification with project and run context attached.',
      locked: false,
      requiresApproval: false,
      sideEffectClass: 'internal_only',
    },
    {
      id: 'prioritize',
      label: 'Prioritize',
      description: 'Nudge the active workstream with a reprioritization request.',
      locked: false,
      requiresApproval: false,
      sideEffectClass: 'internal_only',
    },
    {
      id: 'approve',
      label: 'Approve',
      description: 'Approval-gated action placeholder for future governed write flows.',
      locked: true,
      requiresApproval: true,
      sideEffectClass: 'internal_only',
    },
  ];
}

export function getReadOnlyGuardMessage(): string {
  return 'Read-only mode is active until live governance metadata enables safe mutating actions.';
}
