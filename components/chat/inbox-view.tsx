import { SectionCard } from '@/components/ui/section-card';
import type { Conversation } from '@/lib/domain/types';

export function InboxView({ conversations }: { conversations: Conversation[] }) {
  return (
    <main className="page-stack">
      <section className="hero-card">
        <p className="eyebrow">Inbox</p>
        <h1>Operator conversations</h1>
        <p className="lede">Direct messages and project threads with governance-aware context labels.</p>
      </section>

      <SectionCard title="Threads" eyebrow="Direct + project chat">
        <div className="list-stack">
          {conversations.map((conversation) => (
            <article key={conversation.id} className="list-card">
              <div className="row-between row-start">
                <div>
                  <strong>{conversation.title}</strong>
                  <p className="muted">{conversation.contextLabel}</p>
                </div>
                <span className="timestamp">{conversation.updatedAt}</span>
              </div>
              <p>{conversation.latestMessage}</p>
              <div className="action-row">
                {['clarify', 'prioritize', 'summarize', 'approve'].map((chip) => (
                  <button key={chip} className="action-chip" disabled={chip === 'approve'}>{chip}</button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </main>
  );
}
