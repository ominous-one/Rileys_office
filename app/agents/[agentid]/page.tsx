import { notFound } from 'next/navigation';
import { AgentDeskView } from '@/components/desk/agent-desk-view';
import { createOfficeAdapter } from '@/lib/adapters/office-adapter';

export default async function AgentPage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  const adapter = createOfficeAdapter();
  const desk = await adapter.getAgentDesk(agentId);

  if (!desk) {
    notFound();
  }

  return <AgentDeskView desk={desk} />;
}
