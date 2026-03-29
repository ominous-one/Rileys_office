import { HQWorldExperience } from '@/components/world/hq-world-experience';
import { createOfficeAdapter } from '@/lib/adapters/office-adapter';

export default async function HomePage() {
  const adapter = createOfficeAdapter();
  const snapshot = await adapter.getOfficeSnapshot();

  return <HQWorldExperience snapshot={snapshot} />;
}
