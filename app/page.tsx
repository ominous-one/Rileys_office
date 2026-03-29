import { OfficeOverview } from '@/components/office/office-overview';
import { createOfficeAdapter } from '@/lib/adapters/office-adapter';

export default async function HomePage() {
  const adapter = createOfficeAdapter();
  const snapshot = await adapter.getOfficeSnapshot();

  return <OfficeOverview snapshot={snapshot} />;
}
