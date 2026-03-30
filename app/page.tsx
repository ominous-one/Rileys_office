import { HomeIAView } from '@/components/home-ia-view';
import { createOfficeAdapter } from '@/lib/adapters/office-adapter';

export default async function HomePage() {
  const adapter = createOfficeAdapter();
  const snapshot = await adapter.getOfficeSnapshot();

  return <HomeIAView snapshot={snapshot} />;
}
