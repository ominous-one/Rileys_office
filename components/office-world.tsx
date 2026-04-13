'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import type { AgentSummary } from '@/lib/domain/types';
import styles from './office-world.module.css';

/* Room zones (percentage-based over the map) */
interface RoomZone {
  id: string;
  name: string;
  x: number; y: number; w: number; h: number;
}

const ROOMS: RoomZone[] = [
  { id: 'command',   name: 'Command Center', x: 30, y: 4, w: 40, h: 22 },
  { id: 'bullpen',   name: 'Bullpen',        x: 5,  y: 30, w: 42, h: 30 },
  { id: 'review',    name: 'Review Room',     x: 53, y: 30, w: 42, h: 30 },
  { id: 'lobby',     name: 'Lobby',           x: 25, y: 66, w: 50, h: 30 },
];

/* Desk seat positions (percentage anchors) */
interface DeskSeat {
  roomId: string;
  xPct: number;
  yPct: number;
}

const SEATS: DeskSeat[] = [
  { roomId: 'bullpen', xPct: 14, yPct: 38 },
  { roomId: 'bullpen', xPct: 32, yPct: 42 },
  { roomId: 'review',  xPct: 66, yPct: 38 },
  { roomId: 'review',  xPct: 84, yPct: 42 },
  { roomId: 'command', xPct: 42, yPct: 14 },
  { roomId: 'command', xPct: 58, yPct: 14 },
  { roomId: 'lobby',   xPct: 42, yPct: 78 },
  { roomId: 'lobby',   xPct: 58, yPct: 78 },
];

/* Furniture sprites (decorative, positioned %) */
interface FurniturePiece {
  src: string;
  x: number; y: number;
  w: number; h: number;
  label?: string;
}

const FURNITURE: FurniturePiece[] = [
  { src: '/sprites/office/desk-with-pc.png', x: 10, y: 34, w: 11, h: 11 },
  { src: '/sprites/office/desk-with-pc.png', x: 28, y: 38, w: 11, h: 11 },
  { src: '/sprites/office/desk-with-pc.png', x: 62, y: 34, w: 11, h: 11 },
  { src: '/sprites/office/desk-with-pc.png', x: 80, y: 38, w: 11, h: 11 },
  { src: '/sprites/office/PC1.png', x: 38, y: 8, w: 8, h: 10 },
  { src: '/sprites/office/PC2.png', x: 54, y: 8, w: 8, h: 10 },
  { src: '/sprites/office/writing-table.png', x: 44, y: 72, w: 12, h: 10 },
  { src: '/sprites/office/cabinet.png',       x: 2,  y: 6,  w: 7, h: 10 },
  { src: '/sprites/office/cabinet.png',       x: 91, y: 6,  w: 7, h: 10 },
  { src: '/sprites/office/printer.png',       x: 2,  y: 56, w: 7, h: 8 },
  { src: '/sprites/office/water-cooler.png',  x: 91, y: 56, w: 5, h: 8 },
  { src: '/sprites/office/plant.png',         x: 2,  y: 28, w: 5, h: 7 },
  { src: '/sprites/office/plant.png',         x: 93, y: 28, w: 5, h: 7 },
  { src: '/sprites/office/plant.png',         x: 22, y: 66, w: 5, h: 7 },
  { src: '/sprites/office/plant.png',         x: 73, y: 66, w: 5, h: 7 },
  { src: '/sprites/office/coffee-maker.png',  x: 91, y: 72, w: 6, h: 8 },
  { src: '/sprites/office/stamping-table.png',x: 2,  y: 72, w: 8, h: 8 },
  { src: '/sprites/office/Chair.png', x: 13, y: 44, w: 5, h: 6 },
  { src: '/sprites/office/Chair.png', x: 31, y: 48, w: 5, h: 6 },
  { src: '/sprites/office/Chair.png', x: 65, y: 44, w: 5, h: 6 },
  { src: '/sprites/office/Chair.png', x: 83, y: 48, w: 5, h: 6 },
  { src: '/sprites/office/office-partitions-1.png', x: 48, y: 28, w: 4, h: 34 },
];

/* Character sprite mapping by status */
const AGENT_SPRITES: Record<string, string> = {
  active:  '/sprites/characters/agent-dev-full.png',
  idle:    '/sprites/office/Julia-Idle.png',
  blocked: '/sprites/characters/agent-tech-full.png',
  waiting: '/sprites/office/Julia_Drinking_Coffee.png',
};

function getAgentSprite(status: string): string {
  return AGENT_SPRITES[status] ?? AGENT_SPRITES.idle;
}

function getPresenceColor(status: string): string {
  switch (status) {
    case 'active':  return '#78f7b5';
    case 'idle':    return '#95d8ff';
    case 'blocked': return '#ff7b7b';
    default:        return '#8792a8';
  }
}

/* Speech bubble */
function SpeechBubble({ text, color }: { text: string; color: string }) {
  const truncated = text.length > 50 ? text.slice(0, 47) + '\u2026' : text;
  return (
    <div className={styles.speechBubble} style={{ ['--bubble-accent' as string]: color }}>
      <span className={styles.speechText}>{truncated}</span>
      <div className={styles.speechTail} />
    </div>
  );
}

/* Agent sprite component */
function AgentSprite({
  agent,
  seat,
  selected,
  onSelectAgent,
}: {
  agent: AgentSummary;
  seat: DeskSeat;
  selected: boolean;
  onSelectAgent: () => void;
}) {
  const color = getPresenceColor(agent.status);
  const spriteSrc = getAgentSprite(agent.status);
  const taskText = agent.status === 'blocked' ? agent.blocker ?? agent.currentTask : agent.currentTask;

  return (
    <button
      type="button"
      className={`${styles.agentSprite} ${selected ? styles.agentSelected : ''} ${agent.status === 'active' ? styles.agentWorking : ''}`}
      style={{
        left: `${seat.xPct}%`,
        top: `${seat.yPct}%`,
        ['--presence-color' as string]: color,
      }}
      onClick={onSelectAgent}
      aria-label={`${agent.name} - ${agent.status}`}
    >
      <span className={styles.presenceRing} />
      <span className={styles.spriteContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={spriteSrc}
          alt={agent.name}
          width={64}
          height={64}
          className={styles.spriteImg}
        />
      </span>
      <span className={styles.agentNameLabel}>
        <span className={styles.presenceDot} />
        {agent.name}
      </span>
      {(selected || agent.status === 'active') && taskText ? (
        <SpeechBubble text={taskText} color={color} />
      ) : null}
    </button>
  );
}

/* Room overlay */
function RoomOverlay({ room, agentCount }: { room: RoomZone; agentCount: number }) {
  return (
    <div
      className={styles.roomOverlay}
      style={{
        left: `${room.x}%`,
        top: `${room.y}%`,
        width: `${room.w}%`,
        height: `${room.h}%`,
      }}
    >
      <span className={styles.roomLabel}>{room.name}</span>
      {agentCount > 0 && <span className={styles.roomCount}>{agentCount}</span>}
    </div>
  );
}

/* Main office world export */
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
  const seatedAgents = useMemo(() => {
    return agents.slice(0, SEATS.length).map((agent, i) => ({
      agent,
      seat: SEATS[i],
    }));
  }, [agents]);

  const roomCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const { seat } of seatedAgents) {
      counts[seat.roomId] = (counts[seat.roomId] ?? 0) + 1;
    }
    return counts;
  }, [seatedAgents]);

  return (
    <div className={styles.officeWorld}>
      <div className={styles.statusBar}>
        <span className={styles.officeTitle}>Riley&apos;s Office</span>
        <span className={`${styles.statusBadge} ${styles.statusLive}`}>LIVE</span>
        <span className={styles.connectionInfo}>{connectionLabel}</span>
        <span className={styles.agentCountBadge}>{agents.length} agents</span>
      </div>
      <div className={styles.mapContainer}>
        <div className={styles.mapBackground}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/reference/office-map-pixel.png"
            alt="Office floor plan"
            className={styles.mapImage}
          />
          <div className={styles.mapDarken} />
        </div>
        {ROOMS.map((room) => (
          <RoomOverlay key={room.id} room={room} agentCount={roomCounts[room.id] ?? 0} />
        ))}
        {FURNITURE.map((piece, i) => (
          <div
            key={`furniture-${i}`}
            className={styles.furnitureSprite}
            style={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              width: `${piece.w}%`,
              height: `${piece.h}%`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={piece.src}
              alt={piece.label ?? ''}
              className={styles.pixelArt}
            />
          </div>
        ))}
        {seatedAgents.map(({ agent, seat }) => (
          <AgentSprite
            key={agent.id}
            agent={agent}
            seat={seat}
            selected={selectedAgentId === agent.id}
            onSelectAgent={() => onSelectAgent(agent.id)}
          />
        ))}
      </div>
    </div>
  );
}

