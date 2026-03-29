import { ActivityPageView } from '@/components/activity/activity-page-view';
import { createOfficeAdapter } from '@/lib/adapters/office-adapter';

export default async function ActivityPage() {
  const adapter = createOfficeAdapter();
  const events = await adapter.getActivityFeed();

  return <ActivityPageView events={events} />;
}
