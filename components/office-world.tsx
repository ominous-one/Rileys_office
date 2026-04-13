'use client';

import { useMemo } from 'react';
import type { AgentSummary } from '@/lib/domain/types';
import styles from './office-world.module.css';

/* Seat positions matching the generated-office.png map layout */
interface DeskSeat {
  xPct: number;
  yPct: number;
}

const SEATS: DeskSeat[] = [
  { xPct: 18, yPct: 32 },
  { xPct: 38, yPct: 32 },
  { xPct: 62, yPct: 32 },
  { xPct: 83, yPct: 32 },
  { xPct: 42, yPct: 54 },
  { xPct: 58, yPct: 54 },
  { xPct: 42, yPct: 68 },
  { xPct: 58, yPct: 68 },
];

/* Character sprites by status */
function getAgentSprite(status: string): string {
  switch (status) {
    case 'active':  return '/sprites/characters/agent-dev-full.png';
    case 'blocked': return '/sprites/characters/agent-tech-full.png';
    default:        return '/sprites/office/Julia-Idle.png';
  }
}

function getPresenceColor(status: string): string {
  switch (status) {
    case 'active':  return '#78f7b5';
    case 'blocked': return '#ff7b7b';
    case 'idle':    return '#95d8ff';
    default:        return '#8792a8';
  }
}

/* Speech bubble */
function SpeechBubble({ text, color }: { text: string; color: string }) {
  const t = text.length > 45 ? text.slice(0, 42) + '\u2026' : text;
  return (
    <div className={styles.bubble} style={{ ['--accent' as string]: color }}>
      <span>{t}</span>
      <div className={styles.bubbleTail} />
    </div>
  );
}

/* Single agent sprite */
function AgentSprite({
  agent,
  seat,
  selected,
  onSelect,
}: {
  agent: AgentSummary;
  seat: DeskSeat;
  selected: boolean;
  onSelect: () => void;
}) {
  const color = getPresenceColor(agent.status);
  const sprite = getAgentSprite(agent.status);
  const task = agent.status === 'blocked' ? agent.blocker ?? agent.currentTask : agent.currentTask;

  return (
    <button
      type="button"
      className={`${styles.agent} ${selected ? styles.agentSel : ''} ${agent.status === 'active' ? styles.agentActive : ''}`}
      style={{ left: `${seat.xPct}%`, top: `${seat.yPct}%`, ['--c' as string]: color }}
      onClick={onSelect}
      aria-label={`${agent.name} - ${agent.status}`}
    >
      <span className={styles.ring} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={sprite} alt="" className={styles.sprite} />
      <span className={styles.label}><span className={styles.dot} />{agent.name}</span>
      {(selected || agent.status === 'active') && task ? <SpeechBubble text={task} color={color} /> : null}
    </button>
  );
}

/* Main component */
export function OfficeWorld({
  agents,
  selectedAgentId,
  onSelectAgent,
  connectionLabel,
}: {
  agents: AgentSummary[];
  selectedAgentId: string | null;
  onSelectAgent: (id: string) => void;
  connectionLabel: string;
}) {
  const seated = useMemo(() =>
    agents.slice(0, SEATS.length).map((agent, i) => ({ agent, seat: SEATS[i] })),
    [agents]
  );

  return (
    <div className={styles.world}>
      {/* Status overlay */}
      <div className={styles.status}>
        <span className={styles.title}>Riley&apos;s Office</span>
        <span className={styles.live}>LIVE</span>
        <span className={styles.conn}>{connectionLabel}</span>
        <span className={styles.count}>{agents.length} agents</span>
      </div>

      {/* Map */}
      <div className={styles.map}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/reference/office-map-pixel.png" alt="Office" className={styles.mapImg} />

        {/* Agents */}
        {seated.map(({ agent, seat }) => (
          <AgentSprite
            key={agent.id}
            agent={agent}
            seat={seat}
            selected={selectedAgentId === agent.id}
            onSelect={() => onSelectAgent(agent.id === selectedAgentId ? '' : agent.id)}
          />
        ))}
      </div>
    </div>
  );
}
