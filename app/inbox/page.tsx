import { InboxView } from '@/components/chat/inbox-view';
import { createOfficeAdapter } from '@/lib/adapters/office-adapter';

export default async function InboxPage() {
  const adapter = createOfficeAdapter();
  const snapshot = await adapter.getOfficeSnapshot();

  return <InboxView conversations={snapshot.conversations} />;
}
